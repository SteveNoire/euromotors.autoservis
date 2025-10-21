import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInstagramPosts } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Novinky & Instagram | EURO MOTORS",
  description:
    "Sledujte aktuality z autoservisu EURO MOTORS. Prohlédněte si nejnovější příspěvky z našeho Instagramu @euromotorscz.",
};

export default async function BlogPage() {
  const { posts, error } = await getInstagramPosts();

  return (
    <div className="bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 sm:py-24">
          <Badge variant="soft" className="w-fit">
            Blog & Sociální sítě
          </Badge>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Zůstaňte v obraze s EURO MOTORS
            </h1>
            <p className="text-lg text-slate-600">
              Představujeme reálné ukázky naší práce, tipy pro péči o vozidlo a zákulisí servisu.
              Sledujte náš Instagram @euromotorscz přímo tady na blogu.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="font-medium">Instagram feed</span>
            <span aria-hidden="true">•</span>
            <span>Aktualizujeme několikrát týdně</span>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="flex h-full flex-col overflow-hidden">
                  <Link
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-square"
                  >
                    <Image
                      src={post.mediaUrl}
                      alt={post.alt ?? "Instagram příspěvek společnosti EURO MOTORS"}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      Instagram
                    </span>
                  </Link>
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg">{post.captionPreview}</CardTitle>
                    <CardDescription>
                      {new Intl.DateTimeFormat("cs-CZ", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(post.timestamp))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-slate-600">
                      {post.caption
                        ? post.caption
                        : "Navštivte náš Instagram profil pro kompletní popisek a další fotografie."}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t border-slate-100">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={post.permalink} target="_blank" rel="noopener noreferrer">
                        Zobrazit na Instagramu
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-sm text-slate-600">
              <p className="text-base font-medium text-slate-800">
                Instagram příspěvky se právě nepodařilo načíst.
              </p>
              {error ? (
                <>
                  <p>
                    Zkontrolujte nastavení přístupu k Instagram Graph API. Zadejte hodnotu
                    <code className="mx-1 rounded bg-white px-2 py-1 font-semibold text-slate-800">
                      INSTAGRAM_ACCESS_TOKEN
                    </code>
                    do prostředí aplikace a akci opakujte.
                  </p>
                  <p>
                    Technický detail:
                    <span className="ml-1 font-medium text-slate-800">{error}</span>
                  </p>
                </>
              ) : (
                <p>
                  Sledujte nás na Instagramu
                  <Link
                    href="https://www.instagram.com/euromotorscz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 font-semibold text-emerald-600 hover:underline"
                  >
                    @euromotorscz
                  </Link>
                  .
                </p>
              )}
              <Button asChild>
                <Link href="https://www.instagram.com/euromotorscz/" target="_blank" rel="noopener noreferrer">
                  Přejít na Instagram
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
