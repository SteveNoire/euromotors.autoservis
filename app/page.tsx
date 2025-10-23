import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  Phone,
  Clock,
  MapPin,
  ArrowRight,
  Wrench,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CurrentAvailability } from "@/components/current-availability";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getServices } from "@/lib/services";
import { getTranslator, resolveLocale, type Locale } from "@/lib/i18n";
import { extractLocale, type RouteSearchParams } from "@/lib/i18n/routing";

const heroHighlights = [
  {
    icon: Clock,
    labelKey: "home.hero.highlights.hours.label",
    descriptionKey: "home.hero.highlights.hours.description",
  },
  {
    icon: MapPin,
    labelKey: "home.hero.highlights.address.label",
    descriptionKey: "home.hero.highlights.address.description",
  },
  {
    icon: Phone,
    labelKey: "home.hero.highlights.phone.label",
    descriptionKey: "home.hero.highlights.phone.description",
  },
] as const;

const brandNames = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Škoda",
  "Volkswagen",
  "Porsche",
  "Jaguar",
  "Toyota",
  "Ford",
  "Kia",
];

const brandMarqueeItems = brandNames.flatMap((brand) => [
  { label: brand, id: `${brand}-primary` },
  // { label: brand, id: `${brand}-clone` },
]);

const aboutStats = [
  {
    figureKey: "home.about.stats.experience.figure",
    labelKey: "home.about.stats.experience.label",
  },
  {
    figureKey: "home.about.stats.services.figure",
    labelKey: "home.about.stats.services.label",
  },
  {
    figureKey: "home.about.stats.rating.figure",
    labelKey: "home.about.stats.rating.label",
  },
] as const;

const aboutBullets = [
  "home.about.bullets.equipment",
  "home.about.bullets.warranty",
  "home.about.bullets.detailCare",
] as const;

const qualityPoints = [
  "home.quality.points.digitalLogbook",
  "home.quality.points.premiumParts",
  "home.quality.points.pickupService",
  "home.quality.points.priceGuarantee",
] as const;

const bookingSteps = [
  {
    id: "step-contact",
    textKey: "home.quality.steps.contact",
  },
  {
    id: "step-diagnostics",
    textKey: "home.quality.steps.diagnostics",
  },
  {
    id: "step-hand-over",
    textKey: "home.quality.steps.handover",
  },
] as const;

const faqItems = [
  {
    id: "after-hours",
    questionKey: "home.faq.items.afterHours.question",
    answerKey: "home.faq.items.afterHours.answer",
  },
  {
    id: "quote-estimate",
    questionKey: "home.faq.items.quoteEstimate.question",
    answerKey: "home.faq.items.quoteEstimate.answer",
  },
  {
    id: "replacement-car",
    questionKey: "home.faq.items.replacementCar.question",
    answerKey: "home.faq.items.replacementCar.answer",
  },
  {
    id: "own-parts",
    questionKey: "home.faq.items.ownParts.question",
    answerKey: "home.faq.items.ownParts.answer",
  },
] as const;

const contactCards = [
  {
    phone: "+420 775 230 403",
    titleKey: "home.contact.cards.service.title",
    actionKey: "home.contact.cards.service.action",
  },
  {
    phone: "+420 775 328 223",
    titleKey: "home.contact.cards.bodyshop.title",
    actionKey: "home.contact.cards.bodyshop.action",
  },
] as const;

const heroImage = "/hero-background.png";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Person", "Organization"],
      "@id": "https://euromotors.cz/#person",
      name: "shopshop.cz",
    },
    {
      "@type": "WebSite",
      "@id": "https://euromotors.cz/#website",
      url: "https://euromotors.cz",
      name: "shopshop.cz",
      publisher: {
        "@id": "https://euromotors.cz/#person",
      },
      inLanguage: "cs",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://euromotors.cz/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://euromotors.cz/#webpage",
      url: "https://euromotors.cz/",
      name: "Kompletní opravy a údržba vozidel | Autoservis EURO-MOTORS",
      datePublished: "2024-03-11T12:45:46+01:00",
      dateModified: "2024-11-15T20:31:40+01:00",
      about: {
        "@id": "https://euromotors.cz/#person",
      },
      isPartOf: {
        "@id": "https://euromotors.cz/#website",
      },
      inLanguage: "cs",
    },
    {
      "@type": "Person",
      "@id": "https://euromotors.cz/author/euromotorsofficial/",
      name: "euromotorsofficial",
      url: "https://euromotors.cz/author/euromotorsofficial/",
      image: {
        "@type": "ImageObject",
        "@id": "https://secure.gravatar.com/avatar/4ca98ab863b2961f5194456c9aaaf4c0c834c1e3cb2e30c2cc4747c35c8e04c4?s=96&d=mm&r=g",
        url: "https://secure.gravatar.com/avatar/4ca98ab863b2961f5194456c9aaaf4c0c834c1e3cb2e30c2cc4747c35c8e04c4?s=96&d=mm&r=g",
        caption: "euromotorsofficial",
        inLanguage: "cs",
      },
    },
    {
      "@type": "Article",
      headline: "Kompletní opravy a údržba vozidel | Autoservis EURO-MOTORS",
      keywords: [
        "opravy a údržba vozidel",
        "autoservis",
        "autoopravna",
        "autoservis praha",
        "spolehlivý autoservis",
      ],
      datePublished: "2024-03-11T12:45:46+01:00",
      dateModified: "2024-11-15T20:31:40+01:00",
      author: {
        "@id": "https://euromotors.cz/author/euromotorsofficial/",
        name: "euromotorsofficial",
      },
      publisher: {
        "@id": "https://euromotors.cz/#person",
      },
      description:
        "V Praze 10 provádíme kompletní opravy a údržbu osobních i užitkových vozů všech značek. Zaručujeme vysokou kvalitu práce! Obraťte se na náš autoservis ještě dnes!",
      name: "Kompletní opravy a údržba vozidel | Autoservis EURO-MOTORS",
      "@id": "https://euromotors.cz/#richSnippet",
      isPartOf: {
        "@id": "https://euromotors.cz/#webpage",
      },
      inLanguage: "cs",
      mainEntityOfPage: {
        "@id": "https://euromotors.cz/#webpage",
      },
    },
  ],
} as const;
type HomeSearchParams = RouteSearchParams;

export default function Home({ searchParams }: { searchParams?: HomeSearchParams }) {
  const currentSearchParams: HomeSearchParams = searchParams ?? {};
  const explicitLocale = extractLocale(currentSearchParams);
  const locale = resolveLocale(explicitLocale);

  return (
    <>
      <Script id="euromotors-structured-data" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="bg-white text-slate-900">
        <SiteHeader locale={locale} pathname="/" searchParams={currentSearchParams} />
        <main className="flex flex-col">
          <Hero locale={locale} />
          <BrandStrip />
          <Services locale={locale} />
          <About locale={locale} />
          <Quality locale={locale} />
          <Faq locale={locale} />
          <Contact locale={locale} />
        </main>
  <SiteFooter locale={locale} />
      </div>
    </>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);

  return (
    <section
      id="hero"
      className="page-section relative overflow-hidden bg-slate-900 text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={t("home.hero.imageAlt")}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/70" aria-hidden="true" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:py-32">
        <div className="max-w-2xl space-y-6">
          <Badge className="bg-white/10 text-white backdrop-blur-sm">
            {t("home.hero.badge")}
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            {t("home.hero.heading")}
          </h1>
          <p className="text-lg text-slate-200">
            {t("home.hero.description")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="tel:+420775230403" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {t("home.hero.primaryCta")}
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#services" className="flex items-center gap-2">
                <ChevronRight className="h-5 w-5" />
                {t("home.hero.secondaryCta")}
              </Link>
            </Button>
          </div>
          <CurrentAvailability className="max-w-md" locale={locale} />
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {heroHighlights.map((item) => (
            <Card
              key={item.labelKey}
              className="border-white/10 bg-white/5 backdrop-blur"
            >
              <CardHeader className="space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-white/10 text-white">
                  <item.icon className="h-10 w-10 p-2" />
                </div>
                <CardTitle className="text-base text-white">
                  {t(item.labelKey)}
                </CardTitle>
                <CardDescription className="text-slate-200">
                  {t(item.descriptionKey)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStrip() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl overflow-hidden px-6 py-10">
        <div className="relative flex gap-12 whitespace-nowrap text-base font-semibold uppercase tracking-[0.3em] text-slate-400">
          <div className="animate-marquee flex gap-12">
            {brandMarqueeItems.map((item) => (
              <span key={item.id}>{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ locale }: { locale: Locale }) {
  const services = getServices(locale);
  const t = getTranslator(locale);
  const groups: Array<{ label: string; services: typeof services }> = [];
  const registry = new Map<string, number>();

  for (const service of services) {
    const label = service.subtitle?.trim() || t("services.fallbackGroup");
    const currentIndex = registry.get(label);

    if (currentIndex === undefined) {
      groups.push({ label, services: [service] });
      registry.set(label, groups.length - 1);
    } else {
      groups[currentIndex]?.services.push(service);
    }
  }

  return (
    <section id="services" className="page-section bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-4">
          <Badge variant="soft" className="w-fit">
            {t("services.badge")}
          </Badge>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                {t("services.headline")}
              </h2>
              <p className="text-lg text-slate-600">
                {t("services.description")}
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit">
              <Link href="tel:+420775230403" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                {t("services.cta")}
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-12 space-y-12">
          {services.length === 0 ? (
            <Card className="col-span-full border-dashed border-slate-300 text-center">
              <CardHeader className="items-center text-center">
                <CardTitle className="text-xl">{t("services.empty.title")}</CardTitle>
                <CardDescription>
                  {t("services.empty.subtitlePrefix")} <code>SERVICES_JSON</code> {t("services.empty.subtitleSuffix")}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            groups.map((group) => {
              const key = group.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              const heading = group.label.toUpperCase();

              return (
                <div key={key} className="space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-sm font-semibold tracking-[0.3em] text-emerald-600">
                      {heading}
                    </h3>
                    <span className="text-sm text-slate-500">
                      {t("services.helper")}
                    </span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {group.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <Card className="grid h-full grid-cols-[1fr_auto] items-end gap-4 border-slate-200/70 bg-white/80 p-4 shadow-none transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white">
                          <div className="flex flex-col gap-1">
                            <CardTitle className="text-base font-semibold text-slate-900">
                              {service.title}
                            </CardTitle>
                            <span className="text-sm font-medium text-slate-600">
                              {service.price}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-600">
                            {t("services.detailCta")}
                            <ChevronRight className="h-3 w-3 transition duration-200 group-hover:translate-x-1" />
                          </span>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

function About({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);

  return (
    <section
      id="about"
      className="page-section border-y border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <Badge variant="soft" className="w-fit">
              {t("home.about.badge")}
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("home.about.heading")}
            </h2>
            <p className="text-lg text-slate-600">
              {t("home.about.description")}
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {aboutStats.map((item) => (
                <div key={item.labelKey} className="rounded-3xl bg-white p-6 text-center shadow-sm">
                  <div className="text-3xl font-semibold text-slate-900">
                    {t(item.figureKey)}
                  </div>
                  <div className="text-sm uppercase tracking-wide text-slate-500">
                    {t(item.labelKey)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              {aboutBullets.map((bulletKey, index) => {
                const Icon = [Wrench, ShieldCheck, Sparkles][index] ?? Wrench;

                return (
                  <div key={bulletKey} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-emerald-500" />
                    {t(bulletKey)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900">
            <Image
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80"
              alt={t("home.about.imageAlt")}
              width={900}
              height={700}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-slate-900/70 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/40 px-6 py-5 text-sm text-white backdrop-blur">
              {t("home.about.quote")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quality({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);

  return (
    <section className="page-section bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <Badge className="bg-white/10 text-white">
              {t("home.quality.badge")}
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("home.quality.heading")}
            </h2>
            <p className="text-lg text-slate-200">
              {t("home.quality.description")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {qualityPoints.map((pointKey) => (
                <div
                  key={pointKey}
                  className="flex items-center gap-3 rounded-3xl bg-white/10 p-5 text-sm text-slate-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  {t(pointKey)}
                </div>
              ))}
            </div>
          </div>
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">{t("home.quality.cardTitle")}</CardTitle>
              <CardDescription className="text-slate-200">
                {t("home.quality.cardDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-5 text-sm text-slate-200">
                {bookingSteps.map((step, index) => (
                  <li key={step.id} className="flex gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/20 text-base font-semibold text-emerald-200">
                      0{index + 1}
                    </span>
                    <span>{t(step.textKey)}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
            <CardFooter className="border-t border-white/10">
              <Button asChild variant="secondary" className="mt-4 bg-white text-slate-900 hover:bg-slate-100">
                <Link href="tel:+420775230403" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t("home.quality.cta")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Faq({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);

  return (
    <section id="faq" className="page-section bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 flex flex-col items-start gap-4">
          <Badge variant="soft">{t("home.faq.badge")}</Badge>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            {t("home.faq.heading")}
          </h2>
          <p className="text-lg text-slate-600">
            {t("home.faq.description")}
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="rounded-3xl bg-slate-50 px-6">
              <AccordionTrigger className="py-5 text-left text-lg font-medium text-slate-800">
                {t(item.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-slate-600">
                {t(item.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);

  return (
    <section id="contact" className="page-section border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge variant="soft" className="w-fit">
              {t("home.contact.badge")}
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("home.contact.heading")}
            </h2>
            <p className="text-lg text-slate-600">
              {t("home.contact.description")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <Card key={card.phone} className="bg-white">
                  <CardHeader>
                    <CardTitle>{t(card.titleKey)}</CardTitle>
                    <CardDescription>
                      <Link href={`tel:${card.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 text-lg text-slate-700 hover:text-emerald-600">
                        <Phone className="h-4 w-4" />
                        {card.phone}
                      </Link>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`tel:${card.phone.replace(/\s+/g, "")}`}>{t(card.actionKey)}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t("home.contact.address.label")}
                </span>
                <p className="text-sm text-slate-700">
                  {t("home.contact.address.line1")}<br />
                  {t("home.contact.address.line2")}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t("home.contact.hours.label")}
                </span>
                <p className="text-sm text-slate-700">
                  {t("home.contact.hours.days")}<br />
                  {t("home.contact.hours.time")}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t("home.contact.email.label")}
                </span>
                <Link
                  href="mailto:info@euromotors.cz"
                  className="text-sm text-slate-700 hover:text-emerald-600"
                >
                  {t("home.contact.email.address")}
                </Link>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
            <iframe
              title={t("home.contact.mapTitle")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.116365719955!2d14.557463277373112!3d50.04746697152078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b941115171539%3A0x3729a6d019acd07c!2sEdisonova%208%2C%20109%2000%20Praha%2010-Petrovice!5e0!3m2!1scs!2scz!4v1729084800000!5m2!1scs!2scz"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

