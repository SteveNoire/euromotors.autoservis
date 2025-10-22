import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { label: "Služby", href: "#services" },
  { label: "O nás", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#contact" },
];

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBar />
      <Header />
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

function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-semibold">
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Badge className="bg-emerald-100 text-emerald-700">15 let praxe</Badge>
          <Button asChild size="lg">
            <Link href="tel:+420775230403" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Objednat servis
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
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
