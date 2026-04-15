import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { Beslutsroulette99 } from "@/components/beslutsroulette99";

const title = "Beslutsroulette 99 | ordnad slump i myndighetston";
const description =
  "Snurra ett fiktivt beslutshjul där 0 ger tillfälligt bifall i 7 dagar och 1–99 ger ej godkänd. En satirisk snabbprövning hos Förnedringskassan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/beslutsroulette-99",
  },
  openGraph: {
    title,
    description,
    url: "/beslutsroulette-99",
  },
  twitter: {
    title,
    description,
  },
};

export default function Beslutsroulette99Page() {
  return (
    <PageShell
      title="Beslutsroulette 99"
      intro="Om en full granskning inte hinns med får slumpen samma formella status som ett beslut."
      eyebrow="Snabbförfarande"
      showInstitutionNote={false}
    >
      <Beslutsroulette99 />

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          När slumpen behöver ett efterspel
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Om utfallet behöver läsas om i mer ordnad form finns överklagande och Nådeläge kvar som de
          närmaste alternativen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/overklaga-beslut"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Överklaga beslut
          </Link>
          <Link
            href="/nadalage"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Nådeläge
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
