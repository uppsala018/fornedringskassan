import type { Metadata } from "next";
import Link from "next/link";

import { BeslutsrouletteGenerator } from "@/components/beslutsroulette-generator";
import { PageShell } from "@/components/page-shell";

const title = "Beslutsroulette | fiktiv beslutsmotor hos Förnedringskassan";
const description =
  "Generera ett fiktivt beslut i Förnedringskassans byråkrati. Utfallet låter formellt, men lämnar sällan större klarhet.";

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
] as const;

export default function BeslutsroulettePage() {
  return (
    <PageShell
      title="Beslutsroulette"
      intro="Välj vad ärendet gäller och låt systemet meddela ett beslut som låter formellt, men sällan förklarar något."
      eyebrow="Beslutsfunktion"
      showInstitutionNote={false}
    >
      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Så fungerar den</p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-ink/76">
          Beslutsrouletten tar emot en kort ärendebeskrivning, ser efter om kompletterande material
          finns och levererar sedan ett beslut som ser formellt ut även när utfallet redan lutar åt
          samma håll som vanligt.
        </p>
      </section>

      <BeslutsrouletteGenerator />

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          När beslutet vill ha sällskap
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
