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
import { locales, type Locale } from "@/lib/i18n";
import { buildLocaleHref, type RouteSearchParams } from "@/lib/i18n/routing";

const navLinks = [
  { label: "Služby", href: "/#services" },
  { label: "O nás", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#contact" },
];

const languageLabels: Record<Locale, string> = {
  cs: "Čeština",
  en: "English",
};

type SiteHeaderProps = {
  locale: Locale;
  pathname: string;
  searchParams?: RouteSearchParams;
};

export function SiteHeader({ locale, pathname, searchParams }: SiteHeaderProps) {
  const resolvedSearchParams = searchParams ?? {};

  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBar />
      <Header locale={locale} pathname={pathname} searchParams={resolvedSearchParams} />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-slate-900">EURO MOTORS</span>
          <span>2019 – {new Date().getFullYear()} © EURO MOTORS</span>
          <Link href="/gdpr" className="hover:text-emerald-600">
            Zásady ochrany osobních údajů
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-slate-500">
          <span>Při návštěvě servisu nabízíme čekací zónu s Wi-Fi a občerstvením.</span>
          <span>
            Webové stránky vytvořené společnosti {" "}
            <Link href="https://www.digitale.dev" className="hover:text-emerald-600">
              DigiTale s.r.o.
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function AnnouncementBar() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Certifikovaný autoservis EURO MOTORS
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-300" />
            Po–Pá 09:00–19:00
          </div>
          <Separator className="hidden h-4 w-px bg-white/30 md:block" decorative={true} />
          <Link
            href="tel:+420775230403"
            className="flex items-center gap-2 text-emerald-300 transition hover:text-emerald-100"
          >
            <Phone className="h-4 w-4" />
            +420 775 230 403
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

function Header({ locale, pathname, searchParams }: HeaderProps) {
  const homepageHref = buildLocaleHref("/", searchParams, locale);

  return (
    <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href={homepageHref} className="flex items-center gap-3 font-semibold">
          <Image
            src="/logo.svg"
            alt="EURO MOTORS logo"
            width={44}
            height={44}
            className="h-11 w-11"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="text-base">EURO MOTORS</span>
            <span className="text-xs text-slate-500">Autoservis Praha</span>
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
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageDropdown locale={locale} pathname={pathname} searchParams={searchParams} />
          <Badge className="bg-emerald-100 text-emerald-700">15 let praxe</Badge>
          <Button asChild size="lg">
            <Link href="tel:+420775230403" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Objednat servis
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageDropdown locale={locale} pathname={pathname} searchParams={searchParams} />
          <Button asChild variant="secondary" size="icon" aria-label="Zavolat do servisu">
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

function LanguageDropdown({ locale, pathname, searchParams }: LanguageDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 px-3 text-slate-600 hover:text-slate-900"
          aria-label="Změnit jazyk"
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{languageLabels[locale]}</span>
          <span className="text-xs font-semibold uppercase sm:hidden">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {locales.map((availableLocale) => {
          const isActive = availableLocale === locale;
          const href = buildLocaleHref(pathname, searchParams, availableLocale);
          const label = languageLabels[availableLocale] ?? availableLocale.toUpperCase();

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

