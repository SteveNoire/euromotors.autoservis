import Link from "next/link";
import { Info, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getTranslator, resolveLocale, type Locale } from "@/lib/i18n";
import { extractLocale, type RouteSearchParams } from "@/lib/i18n/routing";

const laborGroups = [
  { key: "mechanical", itemKeys: ["passenger", "suv", "vans", "customerParts"] },
  { key: "electrical", itemKeys: ["hourly"] },
  { key: "paint", itemKeys: ["hourly"] },
  { key: "bodywork", itemKeys: ["hourly"] },
  {
    key: "airConditioning",
    itemKeys: [
      "leakTest",
      "refill",
      "refrigerantR134a",
      "refrigerantHfo",
      "compressorOil",
      "uvDye",
      "disinfection",
    ],
  },
] as const;

const serviceItemKeys = [
  "inspection",
  "suspensionDiagnostics",
  "computerDiagnostics",
  "faultMemory",
  "serviceReset",
  "injectorCoding",
  "ecuReset",
  "geometry",
  "brakeDiagnostics",
  "brakeFluid",
  "brakePads",
  "discsAndPads",
  "brakeShoes",
  "parkingBrakeLinings",
  "towbarInstall",
  "shockReplacement",
  "subframe",
  "transmission",
  "headGasket",
  "timing",
  "clutch",
  "oilChange",
  "fuelFilter",
  "airFilter",
  "cabinFilter",
  "sparkPlug",
  "glowPlug",
  "headlightRestoration",
  "windscreenReplacement",
  "rearGlassReplacement",
  "sideGlassReplacement",
  "headlightAim",
  "acDiagnostics",
] as const;

const tyrePassengerGroups = [
  {
    key: "fullChange",
    variantKeys: [
      { key: "alu", sizeKeys: ["13_14", "15_16", "17_18", "19_20", "21_22", "23_24"] },
      { key: "steel", sizeKeys: ["13_14", "15_16", "17_18"] },
    ],
  },
  {
    key: "swapOnly",
    variantKeys: [
      { key: "alu", sizeKeys: ["13_14", "15_16", "17_18", "19_20", "21_22", "23_24"] },
      { key: "steel", sizeKeys: ["13_14", "15_16", "17_18"] },
    ],
  },
] as const;

const tyreUtilityGroups = [
  {
    key: "fullChange",
    variantKeys: [
      { key: "alu", sizeKeys: ["13_14", "15_16", "17_18", "19_20", "21_22", "23_24"] },
      { key: "steel", sizeKeys: ["13_14", "15_16", "17_18"] },
    ],
  },
  {
    key: "swapOnly",
    variantKeys: [
      { key: "alu", sizeKeys: ["13_14", "15_16", "17_18", "19_20", "21_22", "23_24"] },
      { key: "steel", sizeKeys: ["13_14", "15_16", "17_18"] },
    ],
  },
] as const;

const tyreExtraItems = ["geometry", "puncture"] as const;

const otherServiceItems = ["technicalInspection", "ownershipTransfer", "insuranceClaim", "purchaseAssistance"] as const;

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

type PricingPageSearchParams = RouteSearchParams;

type PricingPageProps = {
  searchParams?: PricingPageSearchParams;
};

export default function PricingPage({ searchParams }: PricingPageProps) {
  const currentSearchParams = searchParams ?? {};
  const explicitLocale = extractLocale(currentSearchParams);
  const locale = resolveLocale(explicitLocale);
  const t = getTranslator(locale);

  const heroNotes = [t("pricingPage.hero.notePrimary"), t("pricingPage.hero.noteSecondary")].filter(
    (note) => note && !note.startsWith("pricingPage."),
  );

  return (
    <div className="bg-white text-slate-900">
      <SiteHeader locale={locale} pathname="/pricing" searchParams={currentSearchParams} />
      <main className="flex flex-col">
        <section className="page-section border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Badge variant="soft" className="mb-6 w-fit">
              {t("pricingPage.hero.badge")}
            </Badge>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold sm:text-5xl">{t("pricingPage.hero.title")}</h1>
              <p className="text-lg text-slate-600">{t("pricingPage.hero.description")}</p>
            </div>
            <div className="mt-8 rounded-lg border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-900">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <Info className="h-4 w-4" />
                {t("pricingPage.hero.disclaimerHeading")}
              </div>
              <ul className="space-y-2">
                {heroNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-10 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("pricingPage.sections.labor.title")}</h2>
              <p className="text-lg text-slate-600">{t("pricingPage.sections.labor.description")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {laborGroups.map((group) => (
                <Card key={group.key} className="h-full">
                  <CardHeader>
                    <CardTitle>{t(`pricingPage.sections.labor.groups.${group.key}.title`)}</CardTitle>
                    <CardDescription>{t(`pricingPage.sections.labor.groups.${group.key}.note`)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-slate-700">
                    {group.itemKeys.map((itemKey, index) => (
                      <div
                        key={itemKey}
                        className={`flex items-center justify-between gap-3 ${index !== group.itemKeys.length - 1 ? "border-b border-slate-200 pb-3" : ""}`}
                      >
                        <span>{t(`pricingPage.sections.labor.groups.${group.key}.items.${itemKey}.label`)}</span>
                        <span className="font-semibold text-slate-900">
                          {t(`pricingPage.sections.labor.groups.${group.key}.items.${itemKey}.value`)}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-8 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("pricingPage.sections.services.title")}</h2>
              <p className="text-lg text-slate-600">{t("pricingPage.sections.services.description")}</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{t("pricingPage.sections.services.cardTitle")}</CardTitle>
                <CardDescription>{t("pricingPage.sections.services.note")}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
                {serviceItemKeys.map((itemKey) => (
                  <div key={itemKey} className="flex justify-between gap-3">
                    <span>{t(`pricingPage.sections.services.items.${itemKey}.label`)}</span>
                    <span className="font-semibold text-slate-900">
                      {t(`pricingPage.sections.services.items.${itemKey}.value`)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-10 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("pricingPage.sections.tyresPassenger.title")}</h2>
              <p className="text-lg text-slate-600">{t("pricingPage.sections.tyresPassenger.description")}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {tyrePassengerGroups.map((group) => (
                <Card key={group.key} className="h-full">
                  <CardHeader>
                    <CardTitle>{t(`pricingPage.sections.tyresPassenger.groups.${group.key}.title`)}</CardTitle>
                    <CardDescription>{t(`pricingPage.sections.tyresPassenger.groups.${group.key}.note`)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm text-slate-700">
                    {group.variantKeys.map((variant) => (
                      <div key={variant.key}>
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {t(`pricingPage.sections.tyresPassenger.groups.${group.key}.variants.${variant.key}.title`) }
                        </div>
                        <div className="space-y-2">
                          {variant.sizeKeys.map((sizeKey) => (
                            <div key={sizeKey} className="flex justify-between gap-3 border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                              <span>
                                {t(
                                  `pricingPage.sections.tyresPassenger.groups.${group.key}.variants.${variant.key}.items.${sizeKey}.label`,
                                )}
                              </span>
                              <span className="font-semibold text-slate-900">
                                {t(
                                  `pricingPage.sections.tyresPassenger.groups.${group.key}.variants.${variant.key}.items.${sizeKey}.value`,
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-10 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("pricingPage.sections.tyresUtility.title")}</h2>
              <p className="text-lg text-slate-600">{t("pricingPage.sections.tyresUtility.description")}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {tyreUtilityGroups.map((group) => (
                <Card key={group.key} className="h-full">
                  <CardHeader>
                    <CardTitle>{t(`pricingPage.sections.tyresUtility.groups.${group.key}.title`)}</CardTitle>
                    <CardDescription>{t(`pricingPage.sections.tyresUtility.groups.${group.key}.note`)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm text-slate-700">
                    {group.variantKeys.map((variant) => (
                      <div key={variant.key}>
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {t(`pricingPage.sections.tyresUtility.groups.${group.key}.variants.${variant.key}.title`) }
                        </div>
                        <div className="space-y-2">
                          {variant.sizeKeys.map((sizeKey) => (
                            <div key={sizeKey} className="flex justify-between gap-3 border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                              <span>
                                {t(
                                  `pricingPage.sections.tyresUtility.groups.${group.key}.variants.${variant.key}.items.${sizeKey}.label`,
                                )}
                              </span>
                              <span className="font-semibold text-slate-900">
                                {t(
                                  `pricingPage.sections.tyresUtility.groups.${group.key}.variants.${variant.key}.items.${sizeKey}.value`,
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>{t("pricingPage.sections.tyreExtras.title")}</CardTitle>
                  <CardDescription>{t("pricingPage.sections.tyreExtras.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-700">
                  {tyreExtraItems.map((itemKey) => (
                    <div key={itemKey} className="flex items-center justify-between gap-3">
                      <span>{t(`pricingPage.sections.tyreExtras.items.${itemKey}.label`)}</span>
                      <span className="font-semibold text-slate-900">
                        {t(`pricingPage.sections.tyreExtras.items.${itemKey}.value`)}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("pricingPage.sections.otherServices.title")}</CardTitle>
                  <CardDescription>{t("pricingPage.sections.otherServices.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-700">
                  {otherServiceItems.map((itemKey) => (
                    <div key={itemKey} className="flex items-center justify-between gap-3">
                      <span>{t(`pricingPage.sections.otherServices.items.${itemKey}.label`)}</span>
                      <span className="font-semibold text-slate-900">
                        {t(`pricingPage.sections.otherServices.items.${itemKey}.value`)}
                      </span>
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
                  {t("pricingPage.cta.title")}
                </CardTitle>
                <CardDescription className="text-base text-slate-600">
                  {t("pricingPage.cta.description")}
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
              <CardFooter className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="tel:+420775230403">{t("pricingPage.cta.primary")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">{t("pricingPage.cta.secondary")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
