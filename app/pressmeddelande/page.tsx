import type { Metadata } from "next";
import Link from "next/link";

import { DocumentActions } from "@/components/document-actions";
import { PageShell } from "@/components/page-shell";
import { siteUrl } from "@/lib/site-url";

const title = "Pressmeddelande | Förnedringskassan";
const description =
  "En pressvänlig översikt av Förnedringskassan som satiriskt projekt om myndighetsspråk, väntan, avslag och hur människor reduceras i systemets logik.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pressmeddelande",
  },
  openGraph: {
    title,
    description,
    url: "/pressmeddelande",
    type: "article",
    images: [siteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteUrl("/opengraph-image")],
  },
};

export default function PressmeddelandePage() {
  const pageText = [
    title,
    description,
    "Kort om projektet: fiktiv myndighetsparodi om hur språk, processer och distans kan få system att låta ordnade.",
    "Vad sidan innehåller: om projektet, varför det finns, en satirisk avgränsning och länkar vidare till fler delar.",
  ].join("\n\n");

  return (
    <PageShell
      title="Pressmeddelande"
      intro="Förnedringskassan är ett satiriskt projekt om hur myndighetsspråk, administrativa flöden och formella besked kan göra människor mindre synliga än systemet de hamnar i."
      eyebrow="Press"
      showInstitutionNote={false}
    >
      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Kort om projektet</p>
        <p className="mt-4 max-w-4xl text-base leading-8 text-ink/76">
          Vi är kreativa själar med ett genuint behov av att belysa samhälleliga svagheter på ett
          humoristiskt och ansvarsfullt sätt. I det här projektet riktar vi blicken mot
          sjukas utförsäkringar, arbetsmarknadsbedömningar, administrativ logik, myndighetsspråk,
          avslag, omprövningar, väntan och de sätt på vilka människor kan reduceras i systemets
          språk.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Vad Förnedringskassan är</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            En satirisk webbplats om administrativt språk
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Förnedringskassan är en fiktiv svensk myndighetsparodi. Sajten använder formulär,
            processer, notiser och beslutston för att visa hur institutionellt språk kan låta
            ordnat samtidigt som det flyttar fokus bort från människan.
          </p>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Varför projektet finns</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            För att göra språkets skav synligt
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Vi vill belysa hur byråkratiska system kan beskriva sjukdom, arbetsförmåga och
            omprövning på ett sätt som blir tekniskt tydligt men mänskligt avlägset. Satiren
            riktar sig mot logiken, tonen och avståndet i systemen, inte mot personer i svåra
            situationer.
          </p>
        </article>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vad sajten innehåller</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          En samling verktyg, texter och notiser i samma tonläge
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-ink/76">
          Sajten består av en huvudvy, förklarande sidor, verktyg för olika administrativa
          situationer, Handläggarnytt med korta interna notiser och en musikdel med den satiriska
          utgåvan Förnedringskassan. Allt är byggt för att vara läsbart, indexerbart och
          konsekvent i samma fiktiva värld.
        </p>
      </section>

      <section className="rounded-dossier border border-stamp/20 bg-stamp/10 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Satirisk avgränsning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Detta är inte en verklig myndighet
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-ink/76">
          Förnedringskassan är helt fiktiv. Sidan är inte kopplad till någon verklig myndighet,
          offentlig aktör eller beslutsfunktion, och den ska inte användas som underlag för
          juridiska, medicinska eller andra verkliga beslut. Den är satirexempel, inte verksamhet.
        </p>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Mer att läsa</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Några delar som förklarar projektet vidare
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/om"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Om projektet
          </Link>
          <Link
            href="/handlaggarnytt"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Handläggarnytt
          </Link>
          <Link
            href="/musik/fornedringskassan"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Musik: Förnedringskassan
          </Link>
          <Link
            href="/fragor-och-svar"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
          Frågor och svar
          </Link>
        </div>
      </section>

      <div className="pt-2">
        <DocumentActions
          title="Pressmeddelande"
          text={pageText}
          pdfFilename="pressmeddelande-fornedringskassan.pdf"
          sharePath="/pressmeddelande"
          shareTitle="Pressmeddelande"
          buttonLabel="Sidhandling"
        />
      </div>
    </PageShell>
  );
}
