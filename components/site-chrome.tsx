import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, ShieldCheck, Languages, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { locales, getTranslator, type Locale } from "@/lib/i18n";
import { buildLocaleHref, type RouteSearchParams } from "@/lib/i18n/routing";

const navLinks = [
  { labelKey: "chrome.header.nav.services", href: "/#services" },
  { labelKey: "chrome.header.nav.about", href: "/#about" },
  { labelKey: "chrome.header.nav.faq", href: "/#faq" },
  { labelKey: "chrome.header.nav.contact", href: "/#contact" },
] as const;

const languageLabelKeys: Record<Locale, string> = {
  cs: "chrome.header.languages.cs",
  en: "chrome.header.languages.en",
  ru: "chrome.header.languages.ru",
  uk: "chrome.header.languages.uk",
};

type Translator = ReturnType<typeof getTranslator>;

type SiteHeaderProps = {
  locale: Locale;
  pathname: string;
  searchParams?: RouteSearchParams;
};

export function SiteHeader({ locale, pathname, searchParams }: SiteHeaderProps) {
  const resolvedSearchParams = searchParams ?? {};
  const t = getTranslator(locale);

  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBar t={t} />
      <Header locale={locale} pathname={pathname} searchParams={resolvedSearchParams} t={t} />
    </div>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-slate-900">{t("chrome.footer.brand")}</span>
          <span>{t("chrome.footer.copy").replace("{year}", currentYear)}</span>
          <Link href="/gdpr" className="hover:text-emerald-600">
            {t("chrome.footer.privacy")}
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-slate-500">
          <span>{t("chrome.footer.waitingArea")}</span>
          <span>
            {t("chrome.footer.credits.prefix")} {" "}
            <Link href="https://www.digitale.dev" className="hover:text-emerald-600">
              {t("chrome.footer.credits.name")}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function AnnouncementBar({ t }: { t: Translator }) {
  return (
    <div className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          {t("chrome.announcement.certified")}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-300" />
            {t("chrome.announcement.hours")}
          </div>
          <Separator className="hidden h-4 w-px bg-white/30 md:block" decorative={true} />
          <Link
            href="tel:+420775230403"
            className="flex items-center gap-2 text-emerald-300 transition hover:text-emerald-100"
          >
            <Phone className="h-4 w-4" />
            {t("chrome.announcement.phone")}
          </Link>
        </div>
      </div>
    </div>
  );
}

type HeaderProps = {
  locale: Locale;
  pathname: string;
  searchParams: RouteSearchParams;
};

function Header({ locale, pathname, searchParams, t }: HeaderProps & { t: Translator }) {
  const homepageHref = buildLocaleHref("/", searchParams, locale);

  return (
    <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href={homepageHref} className="flex items-center gap-3 font-semibold">
          <Image
            src="/logo.svg"
            alt={t("chrome.header.logoAlt")}
            width={44}
            height={44}
            className="h-11 w-11"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="text-base">EURO MOTORS</span>
            <span className="text-xs text-slate-500">{t("chrome.header.tagline")}</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => {
            const target = formatLocalizedTarget(link.href, locale, searchParams);

            return (
              <Link
                key={link.href}
                href={target}
                className="text-slate-600 transition hover:text-slate-900"
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageDropdown
            locale={locale}
            pathname={pathname}
            searchParams={searchParams}
            t={t}
          />
          <Badge className="bg-emerald-100 text-emerald-700">{t("chrome.header.badge")}</Badge>
          <Button asChild size="lg">
            <Link href="tel:+420775230403" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {t("chrome.header.cta")}
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageDropdown
            locale={locale}
            pathname={pathname}
            searchParams={searchParams}
            t={t}
          />
          <Button asChild variant="secondary" size="icon" aria-label={t("chrome.header.callAria")}>
            <Link href="tel:+420775230403">
              <Phone className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

type LanguageDropdownProps = {
  locale: Locale;
  pathname: string;
  searchParams: RouteSearchParams;
};

function LanguageDropdown({ locale, pathname, searchParams, t }: LanguageDropdownProps & { t: Translator }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 px-3 text-slate-600 hover:text-slate-900"
          aria-label={t("chrome.header.languageSwitcherAria")}
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{t(languageLabelKeys[locale])}</span>
          <span className="text-xs font-semibold uppercase sm:hidden">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {locales.map((availableLocale) => {
          const isActive = availableLocale === locale;
          const href = buildLocaleHref(pathname, searchParams, availableLocale);
          const label = t(languageLabelKeys[availableLocale]) ?? availableLocale.toUpperCase();

          return (
            <DropdownMenuItem key={availableLocale} asChild>
              <Link
                href={href}
                className="flex items-center justify-between gap-3 text-slate-700"
                aria-current={isActive ? "page" : undefined}
              >
                <span className={isActive ? "font-semibold text-slate-900" : undefined}>{label}</span>
                {isActive ? <Check className="h-4 w-4 text-emerald-600" /> : null}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function formatLocalizedTarget(target: string, locale: Locale, searchParams: RouteSearchParams) {
  const [rawPath, rawHash] = target.split("#");
  const pathname = rawPath && rawPath.length > 0 ? rawPath : "/";
  const localizedPath = buildLocaleHref(pathname, searchParams, locale);

  return rawHash ? `${localizedPath}#${rawHash}` : localizedPath;
}

