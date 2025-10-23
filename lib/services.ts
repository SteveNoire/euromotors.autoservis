import "server-only";

import { getDictionary, resolveLocale, type Dictionary } from "@/lib/i18n";

export type RawService = {
  title?: unknown;
  subtitle?: unknown;
  description?: unknown;
  price?: unknown;
  slug?: unknown;
};

export type Service = {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  slug: string;
};

const servicesCache = new Map<string, Service[]>();

export function getServices(locale?: string): Service[] {
  const resolvedLocale = resolveLocale(locale);
  const cached = servicesCache.get(resolvedLocale);

  if (cached) {
    return cached;
  }

  const dictionary = getDictionary(resolvedLocale);
  const serviceCandidates = extractServiceCandidates(dictionary);

  const normalized: Service[] = [];
  const usedSlugs = new Set<string>();

  serviceCandidates.forEach((candidate, index) => {
    if (!candidate || typeof candidate !== "object") {
      return;
    }

    const title = sanitizeString(candidate.title);
    const subtitle = sanitizeString(candidate.subtitle);
    const description = sanitizeString(candidate.description);
    const price = sanitizeString(candidate.price);

    if (!title || !description || !price) {
      return;
    }

    const slugFromDictionary = sanitizeString(candidate.slug);
    const baseSlug = slugFromDictionary || slugify(title);
    const uniqueSlug = ensureUniqueSlug(baseSlug || `service-${index + 1}`, usedSlugs);

    normalized.push({
      title,
      subtitle,
      description,
      price,
      slug: uniqueSlug,
    });
  });

  servicesCache.set(resolvedLocale, normalized);
  return normalized;
}

export function getServiceBySlug(slug: string, locale?: string): Service | undefined {
  return getServices(locale).find((service) => service.slug === slug);
}

function extractServiceCandidates(dictionary: Dictionary): RawService[] {
  const servicesSection = dictionary.services;

  if (!isRecord(servicesSection)) {
    return [];
  }

  const items = servicesSection.items;
  return Array.isArray(items) ? (items as RawService[]) : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeString(input: unknown): string {
  if (typeof input === "number" && Number.isFinite(input)) {
    return String(input);
  }

  if (typeof input === "string") {
    return input.trim();
  }

  return "";
}

function slugify(value: string): string {
  const normalized = value.normalize("NFKD");
  let ascii = "";

  for (let index = 0; index < normalized.length; index += 1) {
    const charCode = normalized.charCodeAt(index);
    if (charCode >= 0x300 && charCode <= 0x36f) {
      continue;
    }
    ascii += normalized[index];
  }

  return ascii
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureUniqueSlug(baseSlug: string, registry: Set<string>): string {
  let candidate = baseSlug || "service";
  let suffix = 1;

  while (registry.has(candidate)) {
    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }

  registry.add(candidate);
  return candidate;
}
