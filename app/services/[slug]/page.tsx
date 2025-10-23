import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getServiceBySlug, getServices } from "@/lib/services";
import { getTranslator, resolveLocale } from "@/lib/i18n";
import { buildLocaleHref, extractLocale, type RouteSearchParams } from "@/lib/i18n/routing";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: RouteSearchParams;
};

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params, searchParams }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentSearchParams = searchParams ?? {};
  const locale = resolveLocale(extractLocale(currentSearchParams));
  const service = getServiceBySlug(slug, locale);
  const t = getTranslator(locale);

  if (!service) {
    return {
      title: t("serviceDetail.notFoundTitle"),
      description: t("serviceDetail.notFoundDescription"),
    };
  }

  return {
    title: `${service.title} | EURO MOTORS`,
    description: service.subtitle || service.description,
    alternates: {
      canonical: buildLocaleHref(`/services/${service.slug}`, currentSearchParams, locale),
    },
  };
}

export default async function ServiceDetailPage({ params, searchParams }: ServicePageProps) {
  const { slug } = await params;
  const currentSearchParams = searchParams ?? {};
  const locale = resolveLocale(extractLocale(currentSearchParams));
  const service = getServiceBySlug(slug, locale);
  const t = getTranslator(locale);

  if (!service) {
    notFound();
  }

  const homeHref = buildLocaleHref("/", currentSearchParams, locale);
  const servicesHref = `${homeHref}#services`;
  const contactHref = `${homeHref}#contact`;

  const headerPathname = `/services/${slug}`;

  const descriptionParagraphs = service.description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  const paragraphRegistry = new Map<string, number>();
  const paragraphEntries = descriptionParagraphs.map((paragraph) => {
    const registryKey = paragraph.toLowerCase();
    const occurrence = paragraphRegistry.get(registryKey) ?? 0;
    paragraphRegistry.set(registryKey, occurrence + 1);

    const normalizedKey = normalizeKey(registryKey);

    const suffix = occurrence > 0 ? `-${occurrence}` : "";
    const id = `${normalizedKey || "odstavec"}${suffix}`;

    return { id, text: paragraph };
  });

  return (
    <div className="bg-white text-slate-900">
      <SiteHeader locale={locale} pathname={headerPathname} searchParams={currentSearchParams} />
      <main className="flex flex-col">
        <section className="page-section border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Link
              href={servicesHref}
              className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("serviceDetail.back")}
            </Link>
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="soft" className="w-fit">
                  {t("serviceDetail.badge")}
                </Badge>
                <h1 className="text-4xl font-semibold sm:text-5xl">
                  {service.title}
                </h1>
                {service.subtitle ? (
                  <p className="text-lg text-slate-600">{service.subtitle}</p>
                ) : null}
              </div>
              <Card className="border-emerald-500/30 bg-white shadow-lg shadow-emerald-500/5">
                <CardHeader className="gap-4">
                  <CardTitle className="text-2xl">{t("serviceDetail.priceHeading")}</CardTitle>
                  <p className="text-3xl font-semibold text-slate-900">{service.price}</p>
                </CardHeader>
                <CardContent className="space-y-4 text-base leading-relaxed text-slate-700">
                  {paragraphEntries.length > 0 ? (
                    paragraphEntries.map((entry) => (
                      <p key={entry.id}>{entry.text}</p>
                    ))
                  ) : (
                    <p>{service.description}</p>
                  )}
                </CardContent>
              </Card>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link href="tel:+420775230403" className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    {t("serviceDetail.primaryCta")}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={contactHref}>{t("serviceDetail.secondaryCta")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function normalizeKey(value: string): string {
  const normalized = value.normalize("NFKD");
  let ascii = "";

  for (let index = 0; index < normalized.length; index += 1) {
    const charCode = normalized.charCodeAt(index);
    if (charCode >= 0x300 && charCode <= 0x36f) {
      continue;
    }
    ascii += normalized[index];
  }

  return ascii.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
