import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getTranslator, resolveLocale, type Locale } from "@/lib/i18n";
import { extractLocale, type RouteSearchParams } from "@/lib/i18n/routing";
import { Phone } from "lucide-react";

type CareerPageSearchParams = RouteSearchParams;

type CareerPageProps = {
  searchParams?: CareerPageSearchParams;
};

const jobKeys = [
  "mechanic",
  "painter",
  "prep",
  "body",
  "machinist",
  "driver",
  "receptionist",
] as const;

export default function CareerPage({ searchParams }: CareerPageProps) {
  const currentSearchParams = searchParams ?? {};
  const explicitLocale = extractLocale(currentSearchParams);
  const locale = resolveLocale(explicitLocale);
  const t = getTranslator(locale);

  return (
    <div className="bg-white text-slate-900">
      <SiteHeader locale={locale} pathname="/about/kariera" searchParams={currentSearchParams} />
      <main className="flex flex-col">
        <section className="page-section border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Badge variant="soft" className="mb-6 w-fit">
              {t("careerPage.hero.badge")}
            </Badge>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold sm:text-5xl">{t("careerPage.hero.title")}</h1>
              <p className="text-lg text-slate-600">{t("careerPage.hero.description")}</p>
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-6 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("careerPage.sections.openPositions.title")}</h2>
              <p className="text-lg text-slate-600">{t("careerPage.sections.openPositions.description")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {jobKeys.map((key) => {
                const salaryKey = `careerPage.sections.openPositions.items.${key}.salary` as const;
                const salary = t(salaryKey);
                const hasSalary = salary !== salaryKey;

                return (
                  <Card key={key} className="h-full">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg font-semibold text-slate-900">
                        {t(`careerPage.sections.openPositions.items.${key}.title`)}
                      </CardTitle>
                      {hasSalary ? <div className="text-sm font-semibold text-emerald-600">{salary}</div> : null}
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                      <p className="mb-3">{t(`careerPage.sections.openPositions.items.${key}.summary`)}</p>
                      <div className="mb-2 font-semibold">{t(`careerPage.sections.openPositions.items.${key}.offersTitle`)}</div>
                      <p className="text-sm text-slate-600">{t(`careerPage.sections.openPositions.items.${key}.offers`)}</p>
                      <div className="mt-3 mb-1 font-semibold">{t(`careerPage.sections.openPositions.items.${key}.requirementsTitle`)}</div>
                      <p className="text-sm text-slate-600">{t(`careerPage.sections.openPositions.items.${key}.requirements`)}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold sm:text-3xl">{t("careerPage.cta.title")}</CardTitle>
                <p className="text-base text-slate-600">{t("careerPage.cta.description")}</p>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-500">{t("careerPage.cta.callTitle")}</div>
                  <Link href="tel:+420775230403" className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-emerald-600">
                    <Phone className="h-4 w-4" /> +420 775 230 403
                  </Link>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-500">{t("careerPage.cta.emailTitle")}</div>
                  <Link href="mailto:euromotorsofficial@gmail.com" className="mt-3 inline-block text-sm text-slate-600">
                    euromotorsofficial@gmail.com
                  </Link>
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
