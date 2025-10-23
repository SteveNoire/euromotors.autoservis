import cs from "./locales/cs.json";
import en from "./locales/en.json";
import de from "./locales/de.json";
import ru from "./locales/ru.json";
import uk from "./locales/uk.json";

export const locales = ["cs", "en", "de", "ru", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";

export type Dictionary = Record<string, unknown>;

const dictionaries: Record<Locale, Dictionary> = {
  cs: cs as Dictionary,
  en: en as Dictionary,
  de: de as Dictionary,
  ru: ru as Dictionary,
  uk: uk as Dictionary,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function resolveLocale(locale?: string): Locale {
  return isLocale(locale) ? (locale as Locale) : defaultLocale;
}

export function getDictionary(locale?: string): Dictionary {
  return dictionaries[resolveLocale(locale)];
}

export function getTranslator(locale?: string) {
  const dictionary = getDictionary(locale);

  return (path: string): string => {
    const segments = path.split(".");
    let result: unknown = dictionary;

    for (const segment of segments) {
      if (isRecord(result) && segment in result) {
        result = result[segment];
      } else {
        return path;
      }
    }

    return typeof result === "string" ? result : path;
  };
}
