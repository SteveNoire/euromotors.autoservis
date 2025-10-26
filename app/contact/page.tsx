import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Instagram, Clock, Building2, Banknote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getTranslator, resolveLocale, type Locale } from "@/lib/i18n";
import { extractLocale, type RouteSearchParams } from "@/lib/i18n/routing";

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

const contactChannels = [
  {
    key: "address",
    icon: MapPin,
    href: "https://maps.app.goo.gl/aTiG5vhJLaQgaCVJA",
    variant: "link" as const,
  },
  {
    key: "email",
    icon: Mail,
    href: "mailto:euromotorsofficial@gmail.com",
    variant: "link" as const,
  },
  {
    key: "facebook",
    icon: Facebook,
    href: "https://www.facebook.com/euromotorsofficial",
    variant: "link" as const,
  },
  {
    key: "instagram",
    icon: Instagram,
    href: "https://www.instagram.com/euromotorscz/",
    variant: "link" as const,
  },
] as const;

const hourEntries = [
  { key: "weekdays" },
  { key: "weekend" },
] as const;

const companyEntries = [
  { key: "name" },
  { key: "registration" },
  { key: "seat" },
  { key: "ico" },
  { key: "dic" },
] as const;

const bankEntries = [
  { key: "bank" },
  { key: "account" },
  { key: "iban" },
  { key: "swift" },
] as const;

type ContactPageSearchParams = RouteSearchParams;

type ContactPageProps = {
  searchParams?: ContactPageSearchParams;
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const currentSearchParams = searchParams ?? {};
  const explicitLocale = extractLocale(currentSearchParams);
  const locale = resolveLocale(explicitLocale);
  const t = getTranslator(locale);

  return (
    <div className="bg-white text-slate-900">
      <SiteHeader locale={locale} pathname="/contact" searchParams={currentSearchParams} />
      <main className="flex flex-col">
        <section className="page-section border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Badge variant="soft" className="mb-6 w-fit">
              {t("contactPage.hero.badge")}
            </Badge>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold sm:text-5xl">{t("contactPage.hero.title")}</h1>
              <p className="text-lg text-slate-600">{t("contactPage.hero.intro")}</p>
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-10 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("contactPage.sections.phones.title")}</h2>
              <p className="text-lg text-slate-600">{t("contactPage.sections.phones.description")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {phoneEntries.map((entry) => (
                <Card key={entry.key} className="h-full">
                  <CardHeader>
                    <CardTitle>{t(`contactPage.sections.phones.items.${entry.key}.title`)}</CardTitle>
                    <CardDescription>
                      {t(`contactPage.sections.phones.items.${entry.key}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col items-start gap-3">
                    <Link
                      href={`tel:${entry.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 text-lg text-slate-700 hover:text-emerald-600"
                    >
                      <Phone className="h-4 w-4" />
                      {entry.phone}
                    </Link>
                    <Button asChild>
                      <Link href={`tel:${entry.phone.replace(/\s+/g, "")}`}>
                        {t(`contactPage.sections.phones.items.${entry.key}.action`)}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="mb-10 space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("contactPage.sections.details.title")}</h2>
              <p className="text-lg text-slate-600">{t("contactPage.sections.details.description")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;
                const valueLines = [
                  t(`contactPage.sections.details.items.${channel.key}.value`),
                  t(`contactPage.sections.details.items.${channel.key}.valueSecondary`),
                ].filter((line) => line && line !== `contactPage.sections.details.items.${channel.key}.valueSecondary`);

                return (
                  <Card key={channel.key} className="h-full">
                    <CardHeader className="flex flex-row items-start gap-3">
                      <span className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <CardTitle className="text-base font-semibold">
                          {t(`contactPage.sections.details.items.${channel.key}.label`)}
                        </CardTitle>
                        <CardDescription className="space-y-1 text-slate-600">
                          {valueLines.map((line, index) => (
                            <span key={`${channel.key}-${index}`} className="block">
                              {line}
                            </span>
                          ))}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-fit">
                        <Link href={channel.href} target="_blank" rel="noopener noreferrer">
                          {t(`contactPage.sections.details.items.${channel.key}.cta`)}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section bg-white">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
            <Card className="bg-slate-50">
              <CardHeader className="flex items-start gap-3">
                <span className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base font-semibold">
                    {t("contactPage.sections.hours.title")}
                  </CardTitle>
                  <CardDescription>{t("contactPage.sections.hours.description")}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-700">
                {hourEntries.map((entry) => (
                  <div key={entry.key}>
                    <div className="font-semibold text-slate-900">
                      {t(`contactPage.sections.hours.items.${entry.key}.label`)}
                    </div>
                    <div>{t(`contactPage.sections.hours.items.${entry.key}.value`)}</div>
                    <div className="text-xs text-slate-500">
                      {t(`contactPage.sections.hours.items.${entry.key}.note`)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardHeader className="flex items-start gap-3">
                <span className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base font-semibold">
                    {t("contactPage.sections.company.title")}
                  </CardTitle>
                  <CardDescription>{t("contactPage.sections.company.description")}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-700">
                {companyEntries.map((entry) => (
                  <div key={entry.key} className="border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {t(`contactPage.sections.company.items.${entry.key}.label`)}
                    </div>
                    <div>{t(`contactPage.sections.company.items.${entry.key}.value`)}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="page-section border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Card className="bg-white">
              <CardHeader className="flex items-start gap-3">
                <span className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                  <Banknote className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base font-semibold">
                    {t("contactPage.sections.bank.title")}
                  </CardTitle>
                  <CardDescription>{t("contactPage.sections.bank.description")}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {bankEntries.map((entry) => (
                  <div key={entry.key} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {t(`contactPage.sections.bank.items.${entry.key}.label`)}
                    </span>
                    <span className="text-sm text-slate-700">
                      {t(`contactPage.sections.bank.items.${entry.key}.value`)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
