import type { Metadata } from "next";
import Link from "next/link";

import { CvGenerator } from "@/components/cv-generator";
import { PageShell } from "@/components/page-shell";

const title = "CV-generator | satirisk arbetsprofil hos Förnedringskassan";
const description =
  "Skriv in vad du inte fungerar i och få ett fiktivt CV där trötthet, begränsningar och symtom omformuleras till en prydlig arbetsprofil.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/cv-generator",
  },
  openGraph: {
    title,
    description,
    url: "/cv-generator",
  },
  twitter: {
    title,
    description,
  },
};

export default function CvGeneratorPage() {
  return (
    <PageShell
      title="CV-generator"
      intro="Beskriv det som inte fungerar och låt systemet skriva om det till arbetsbarhet med bättre rubrik än underlaget förtjänar."
      eyebrow="Arbetsprofil"
      showInstitutionNote={false}
    >
      <CvGenerator />

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          När profilen behöver prövas i nästa ordning
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          När en arbetsprofil ändå ska få ett formellt efterspel kan den fortsätta till ett
          överklagande. Om ämnet ligger för nära finns Nådeläge kvar som stilla avbrott.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/overklaga-beslut"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Profilen kan prövas vidare i överklagande
          </Link>
          <Link
            href="/nadalage"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Om ämnet ligger för nära finns Nådeläge
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
