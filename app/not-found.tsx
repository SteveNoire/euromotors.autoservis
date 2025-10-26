import Link from "next/link";
import { ArrowLeft, Home, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getTranslator, resolveLocale, type Locale } from "@/lib/i18n";
import { extractLocale, type RouteSearchParams } from "@/lib/i18n/routing";

type NotFoundPageProps = {
  searchParams?: RouteSearchParams;
};

export default function NotFoundPage({ searchParams }: NotFoundPageProps) {
  const currentSearchParams = searchParams ?? {};
  const explicitLocale = extractLocale(currentSearchParams);
  const locale = resolveLocale(explicitLocale);
  const t = getTranslator(locale);

  return (
    <div className="bg-white text-slate-900">
      <SiteHeader locale={locale} pathname="/404" searchParams={currentSearchParams} />
      <main className="flex flex-col">
        <section className="page-section bg-linear-to-b from-slate-50 to-white">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-32">
            <div className="mb-8 inline-flex items-center justify-center rounded-full bg-red-50 p-6">
              <Wrench className="h-12 w-12 text-red-500" />
            </div>
            
            <Badge variant="soft" className="mb-6 bg-red-50 text-red-700">
              {t("notFoundPage.badge")}
            </Badge>
            
            <h1 className="mb-6 text-5xl font-bold text-slate-900 sm:text-6xl">
              {t("notFoundPage.title")}
            </h1>
            
            <p className="mb-8 text-lg text-slate-600 sm:text-xl">
              {t("notFoundPage.description")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/">
                  <Home className="h-5 w-5" />
                  {t("notFoundPage.homeButton")}
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="h-5 w-5" />
                  {t("notFoundPage.backButton")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="page-section bg-slate-50">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="text-center">
              <h2 className="mb-8 text-2xl font-semibold text-slate-900">
                {t("notFoundPage.suggestions.title")}
              </h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-emerald-50 p-3">
                      <Wrench className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900">
                      {t("notFoundPage.suggestions.services.title")}
                    </h3>
                    <p className="mb-4 text-sm text-slate-600">
                      {t("notFoundPage.suggestions.services.description")}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/#services">
                        {t("notFoundPage.suggestions.services.button")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-50 p-3">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900">
                      {t("notFoundPage.suggestions.pricing.title")}
                    </h3>
                    <p className="mb-4 text-sm text-slate-600">
                      {t("notFoundPage.suggestions.pricing.description")}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/pricing">
                        {t("notFoundPage.suggestions.pricing.button")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-purple-50 p-3">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25c0-1.372-.465-2.637-1.246-3.598.28-.235.546-.479.796-.728A18.26 18.26 0 0022.5 9.75c0-8.284-6.716-15-15-15S7.5 1.466 7.5 9.75c0 2.047.408 4.002 1.146 5.796.74.179 1.448.463 2.104.842z" />
                      </svg>
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900">
                      {t("notFoundPage.suggestions.contact.title")}
                    </h3>
                    <p className="mb-4 text-sm text-slate-600">
                      {t("notFoundPage.suggestions.contact.description")}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/contact">
                        {t("notFoundPage.suggestions.contact.button")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}