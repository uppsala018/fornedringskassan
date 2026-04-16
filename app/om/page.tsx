import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";

const title = "Om Förnedringskassan | satirisk parodi på myndighetsspråk";
const description =
  "Förnedringskassan är ett fiktivt satiriskt projekt om myndighetsspråk, administrativa processer och den distans som uppstår när systemet blir större än människan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/om",
  },
  openGraph: {
    title,
    description,
    url: "/om",
  },
  twitter: {
    title,
    description,
  },
};

export default function OmPage() {
  return (
    <PageShell
      title="Om Förnedringskassan"
      intro="Förnedringskassan är ett satiriskt projekt om myndighetsspråk som gör process viktigare än innehåll och människor till ärenden."
    >
      <section className="rounded-dossier border border-stamp/20 bg-stamp/10 p-6">
        <p className="text-xs uppercase tracking-[0.34em] text-ink/72">
          Tydlig disclaimer
        </p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
          Inte en verklig myndighet
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-ink/76">
          Den här webbplatsen är ett fiktivt och satiriskt projekt. Den ska inte tolkas som
          officiell information, rådgivning eller någon form av representation av
          Försäkringskassan, någon annan myndighet eller någon verklig offentlig verksamhet.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="institution-card p-6">
          <h2 className="text-balance font-display text-2xl font-semibold text-ink">
            Vad detta är
          </h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-ink/76">
            <p>
              Webbplatsen är satir och språkgranskning i fiktiv myndighetsform.
              Den gestaltar hur institutionaliserat språk kan göra process till innehåll och
              människor till ärenden.
            </p>
          </div>
        </article>

        <article className="institution-card p-6">
          <h2 className="text-balance font-display text-2xl font-semibold text-ink">
            Vad detta inte är
          </h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-ink/76">
            <p>
              Innehållet är inte juridisk rådgivning, inte medicinsk rådgivning och inte
              officiell information.
            </p>
            <p>
              Sidan ska inte användas som underlag för beslut, bedömningar eller vägledning i
              verkliga ärenden.
            </p>
          </div>
        </article>
      </section>

      <section className="institution-card p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Syfte</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
          Vad språksatiren riktar in sig på
        </h2>
        <ul className="mt-6 space-y-4 text-base leading-8 text-ink/76">
          <li>Språk som gör en mänsklig situation till en administrativ rad i marginalen.</li>
          <li>Processer som låter neutrala men ändå flyttar bort ansvar från där det märks.</li>
          <li>Bedömningar där formulär, tonfall och ordning får större tyngd än verkligheten.</li>
          <li>Myndighetslogik som blir tydlig först när den redan hunnit bli obehaglig.</li>
        </ul>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-8">
        <h2 className="text-balance font-display text-2xl font-semibold text-ink">
          Vem satiren inte gäller
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Satiren är riktad mot system, språkbruk och maktlös byråkratisk logik. Den är inte
          riktad mot sjuka personer, utsatta människor eller någon som befinner sig i en
          svår situation.
        </p>
      </section>

      <section className="institution-card p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Se funktionerna i praktiken
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Om du vill se hur satiren fungerar i olika delar av sajten kan du gå vidare till
          handläggarkedjan, avslagsbrevet, låten Förnedringskassan, friskförklaringen,
          nådeläget eller någon av de andra interna funktionerna.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/handlaggarkedja"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Handläggarkedja
          </Link>
          <Link
            href="/avslagsbrev"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Avslagsbrev
          </Link>
          <Link
            href="/friskforklaring"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Friskförklaring
          </Link>
          <Link
            href="/nadalage"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Nådeläge
          </Link>
          <Link
            href="/normalt-forekommande-arbeten"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Normalt förekommande arbeten
          </Link>
          <Link
            href="/handlaggarnytt"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Handläggarnytt
          </Link>
          <Link
            href="/pressmeddelande"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Pressmeddelande
          </Link>
          <Link
            href="/musik/fornedringskassan"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Musik: Förnedringskassan
          </Link>
          <Link
            href="/"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Till startsidan
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
