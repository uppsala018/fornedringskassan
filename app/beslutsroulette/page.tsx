import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { Beslutsroulette } from "@/components/beslutsroulette99";

const title = "Beslutsroulette | ordnad slump i myndighetston";
const description =
  "Snurra ett fiktivt beslutshjul där 0 ger tillfälligt bifall i 7 dagar och 1–99 ger ej godkänd. En satirisk snabbprövning hos Förnedringskassan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/beslutsroulette",
  },
  openGraph: {
    title,
    description,
    url: "/beslutsroulette",
  },
  twitter: {
    title,
    description,
  },
};

const relatedLinks = [
  { href: "/overklaga-beslut", label: "Överklaga beslut" },
  { href: "/spora-ditt-arende", label: "Spåra ditt ärende" },
  { href: "/avslagsbrev", label: "Avslagsbrev" },
  { href: "/fragor-och-svar", label: "Frågor och svar" },
  { href: "/om", label: "Om projektet" },
  { href: "/nadalage", label: "Nådeläge" },
] as const;

export default function BeslutsroulettePage() {
  return (
    <PageShell
      title="Beslutsroulette"
      intro="Om en full granskning inte hinns med kan ärendet avgöras i ordnad slump. 0 betyder godkänd i 7 dagar. 1–99 betyder ej godkänd."
      eyebrow="Beslutsfunktion"
      showInstitutionNote={false}
    >
      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Ogenomskinlig logik</p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-ink/76">
          Beslutsrouletten tar emot en kort ärendebeskrivning, ser efter om kompletterande material
          finns och levererar sedan ett beslut som ser formellt ut även när det i praktiken redan
          lutar åt samma håll som vanligt.
        </p>
      </section>

      <Beslutsroulette />

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          När samma svar vill ha sällskap
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Om du vill se hur beslutsrouletten hänger ihop med resten av sajten finns här de närmaste
          funktionerna och förklaringsytorna.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {relatedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
