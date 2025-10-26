import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getTranslator, resolveLocale, type Locale } from "@/lib/i18n";
import { extractLocale, type RouteSearchParams } from "@/lib/i18n/routing";

const sectionKeys = [
  "introduction",
  "contract",
  "pricing",
  "delivery",
  "withdrawal",
  "defects",
  "privacy",
  "communication",
  "disputes",
  "supervision",
  "conclusion",
] as const;

type TermsPageSearchParams = RouteSearchParams;

type TermsPageProps = {
  searchParams?: TermsPageSearchParams;
};

export default function TermsPage({ searchParams }: TermsPageProps) {
  const currentSearchParams = searchParams ?? {};
  const explicitLocale = extractLocale(currentSearchParams);
  const locale = resolveLocale(explicitLocale);
  const t = getTranslator(locale);

  return (
    <div className="bg-white text-slate-900">
      <SiteHeader locale={locale} pathname="/vseobecne-obchodni-podminky" searchParams={currentSearchParams} />
      <main className="flex flex-col">
        <section className="page-section border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Badge variant="soft" className="mb-6 w-fit">
              {t("termsPage.hero.badge")}
            </Badge>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold sm:text-5xl">{t("termsPage.hero.title")}</h1>
              <p className="text-lg text-slate-600">{t("termsPage.hero.description")}</p>
              <p className="text-sm text-slate-500">{t("termsPage.meta.effectiveDate")}</p>
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl space-y-10 px-6 py-16 sm:py-20">
            {sectionKeys.map((key) => {
              const title = t(`termsPage.sections.${key}.title` as const);
              const body = t(`termsPage.sections.${key}.body` as const);
              const list = t(`termsPage.sections.${key}.list` as const);
              const listTitle = t(`termsPage.sections.${key}.listTitle` as const);

              const paragraphs = splitIntoParagraphs(body);
              const listItems = splitIntoList(list);
              const showList = listItems.length > 0 && list !== `termsPage.sections.${key}.list`;
              const listHeading = listTitle !== `termsPage.sections.${key}.listTitle` ? listTitle : undefined;

              return (
                <article key={key} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
                  <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                    {paragraphs.map((paragraph) => (
                      <p key={`${key}-paragraph-${paragraph}`}>{paragraph}</p>
                    ))}
                    {showList ? (
                      <div className="space-y-2">
                        {listHeading ? <div className="font-semibold text-slate-900">{listHeading}</div> : null}
                        <ul className="list-disc space-y-2 pl-5">
                          {listItems.map((item) => (
                            <li key={`${key}-item-${item}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="page-section border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold sm:text-3xl">{t("termsPage.cta.title")}</CardTitle>
                <p className="text-base text-slate-600">{t("termsPage.cta.description")}</p>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t("termsPage.cta.phoneLabel")}
                  </div>
                  <Link href="tel:+420775230403" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <Phone className="h-4 w-4" /> +420 775 230 403
                  </Link>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t("termsPage.cta.emailLabel")}
                  </div>
                  <Link href="mailto:euromotorsofficial@gmail.com" className="mt-2 inline-flex items-center gap-2 text-sm text-slate-700">
                    <Mail className="h-4 w-4" /> euromotorsofficial@gmail.com
                  </Link>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t("termsPage.cta.addressLabel")}
                  </div>
                  <div className="mt-2 flex items-start gap-2 text-sm text-slate-700">
                    <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                    <span>{t("termsPage.cta.addressValue")}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{t("termsPage.cta.note")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

function splitIntoParagraphs(value: string) {
  if (!value || value.startsWith("termsPage")) {
    return [];
  }

  return value
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function splitIntoList(value: string) {
  if (!value || value.startsWith("termsPage")) {
    return [];
  }

  return value
    .split("\n")
    .map((item) => item.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
}
