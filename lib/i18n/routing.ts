import { defaultLocale, type Locale } from "./index";

export type RouteSearchParams = Record<string, string | string[] | undefined>;

export function extractLocale(searchParams?: RouteSearchParams): string | undefined {
  if (!searchParams) {
    return undefined;
  }

  const raw = searchParams.lang ?? searchParams.locale;

  if (raw === undefined) {
    return undefined;
  }

  if (Array.isArray(raw)) {
    return raw[0];
  }

  return raw;
}

export function buildLocaleHref(pathname: string, searchParams: RouteSearchParams, targetLocale: Locale) {
  const params = new URLSearchParams();
  let localeKey: "lang" | "locale" | undefined;

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) {
      continue;
    }

    if (key === "lang" || key === "locale") {
      localeKey = key as "lang" | "locale";
      continue;
    }

    if (Array.isArray(value)) {
      for (const entry of value) {
        params.append(key, entry);
      }
    } else {
      params.set(key, value);
    }
  }

  const key = localeKey ?? "lang";

  if (targetLocale !== defaultLocale) {
    params.set(key, targetLocale);
  }

  const query = params.toString();
  return query.length > 0 ? `${pathname}?${query}` : pathname;
}
