import "server-only";

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

const ENV_KEYS = ["SERVICES_JSON", "NEXT_PUBLIC_SERVICES_JSON"] as const;

let cachedServices: Service[] | null = null;

export function getServices(): Service[] {
  if (cachedServices) {
    return cachedServices;
  }

  const rawPayload = getFirstDefinedEnvValue(ENV_KEYS);

  if (!rawPayload) {
    cachedServices = [];
    return cachedServices;
  }

  const parsed = safeParseJson(rawPayload);
  const serviceCandidates = Array.isArray(parsed)
    ? parsed
    : Array.isArray((parsed as { services?: unknown }).services)
      ? (parsed as { services: RawService[] }).services
      : [];

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

    const slugFromEnv = sanitizeString(candidate.slug);
    const baseSlug = slugFromEnv || slugify(title);
    const uniqueSlug = ensureUniqueSlug(baseSlug || `service-${index + 1}`, usedSlugs);

    normalized.push({
      title,
      subtitle,
      description,
      price,
      slug: uniqueSlug,
    });
  });

  cachedServices = normalized;
  return cachedServices;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((service) => service.slug === slug);
}

function getFirstDefinedEnvValue(keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }
  return undefined;
}

function safeParseJson(payload: string): unknown {
  try {
    return JSON.parse(payload);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to parse SERVICES_JSON payload:", error);
    }
    return [];
  }
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
