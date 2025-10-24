import Link from "next/link";
import {
  HeartHandshake,
  GaugeCircle,
  ShieldCheck,
  CarFront,
  Truck,
  Sparkles,
  CheckCircle2,
  Phone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getTranslator, resolveLocale, type Locale } from "@/lib/i18n";
import { extractLocale, type RouteSearchParams } from "@/lib/i18n/routing";

const introParagraphKeys = ["mission", "approach", "team"] as const;

const valueItems = [
  { key: "partnership", icon: HeartHandshake },
  { key: "craftsmanship", icon: GaugeCircle },
  { key: "transparency", icon: ShieldCheck },
] as const;

const careItems = [
  { key: "replacementCar", icon: CarFront },
  { key: "pickup", icon: Truck },
  { key: "detailing", icon: Sparkles },
] as const;

const commitmentItems = [
  "communication",
  "documentation",
  "deadlines",
] as const;

const phoneEntries = [
  {
    key: "service",
    phone: "+420 775 230 403",
  },
  {
    key: "bodyshop",
    phone: "+420 775 328 223",
  },
] as const;

type AboutPageSearchParams = RouteSearchParams;

type AboutPageProps = {
  searchParams?: AboutPageSearchParams;
};

export default function AboutPage({ searchParams }: AboutPageProps) {
  const currentSearchParams = searchParams ?? {};
  const explicitLocale = extractLocale(currentSearchParams);
  const locale = resolveLocale(explicitLocale);
  const t = getTranslator(locale);

  return (
    <div className="bg-white text-slate-900">
      <SiteHeader locale={locale} pathname="/about" searchParams={currentSearchParams} />
      <main className="flex flex-col">
        <section className="page-section border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Badge variant="soft" className="mb-6 w-fit">
              {t("aboutPage.hero.badge")}
            </Badge>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold sm:text-5xl">{t("aboutPage.hero.title")}</h1>
              <p className="text-lg text-slate-600">{t("aboutPage.hero.description")}</p>
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-6 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("aboutPage.sections.introduction.title")}</h2>
              <p className="text-lg text-slate-600">{t("aboutPage.sections.introduction.subtitle")}</p>
            </div>
            <div className="space-y-5 text-slate-700">
              {introParagraphKeys.map((paragraphKey) => (
                <p key={paragraphKey} className="text-base leading-relaxed">
                  {t(`aboutPage.sections.introduction.paragraphs.${paragraphKey}`)}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-10 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("aboutPage.sections.values.title")}</h2>
              <p className="text-lg text-slate-600">{t("aboutPage.sections.values.description")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {valueItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Card key={item.key} className="h-full">
                    <CardHeader className="flex flex-col gap-3">
                      <span className="w-fit rounded-full bg-emerald-100 p-2 text-emerald-600">
                        <Icon className="h-5 w-5" />
                      </span>
                      <CardTitle className="text-base font-semibold text-slate-900">
                        {t(`aboutPage.sections.values.items.${item.key}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                      {t(`aboutPage.sections.values.items.${item.key}.description`)}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <Card className="bg-slate-50">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2xl font-semibold text-slate-900">
                    {t("aboutPage.sections.care.title")}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    {t("aboutPage.sections.care.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {careItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.key} className="flex items-start gap-3">
                        <span className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-slate-900">
                            {t(`aboutPage.sections.care.items.${item.key}.title`)}
                          </div>
                          <div className="text-sm text-slate-600">
                            {t(`aboutPage.sections.care.items.${item.key}.description`)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2xl font-semibold text-slate-900">
                    {t("aboutPage.sections.commitments.title")}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    {t("aboutPage.sections.commitments.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {commitmentItems.map((itemKey) => (
                    <div key={itemKey} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-slate-900">
                          {t(`aboutPage.sections.commitments.items.${itemKey}.title`)}
                        </div>
                        <div className="text-sm text-slate-600">
                          {t(`aboutPage.sections.commitments.items.${itemKey}.description`)}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="page-section border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold sm:text-3xl">
                  {t("aboutPage.cta.title")}
                </CardTitle>
                <CardDescription className="text-base text-slate-600">
                  {t("aboutPage.cta.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                {phoneEntries.map((entry) => (
                  <div key={entry.key} className="rounded-lg border border-slate-200 p-4">
                    <div className="text-sm font-semibold text-slate-500">
                      {t(`contactPage.sections.phones.items.${entry.key}.title`)}
                    </div>
                    <div className="text-sm text-slate-600">
                      {t(`contactPage.sections.phones.items.${entry.key}.description`)}
                    </div>
                    <Link
                      href={`tel:${entry.phone.replace(/\s+/g, "")}`}
                      className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      <Phone className="h-4 w-4" />
                      {entry.phone}
                    </Link>
                  </div>
                ))}
              </CardContent>
              <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="tel:+420775230403">{t("aboutPage.cta.primary")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">{t("aboutPage.cta.secondary")}</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
