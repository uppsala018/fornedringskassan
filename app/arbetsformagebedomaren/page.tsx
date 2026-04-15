import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { Arbetsformagebedomaren } from "@/components/arbetsformagebedomaren";

const title = "Arbetsförmågebedömaren | satirisk tolkning av arbetsförmåga";
const description =
  "Välj ett exempel eller bygg ett eget underlag och få en fiktiv arbetsförmågebedömning som översätter kvarvarande funktion till myndighetston.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/arbetsformagebedomaren",
  },
  openGraph: {
    title,
    description,
    url: "/arbetsformagebedomaren",
  },
  twitter: {
    title,
    description,
  },
};

export default function ArbetsformagebedomarenPage() {
  return (
    <PageShell
      title="Arbetsförmågebedömaren"
      intro="Här visas hur små rester av funktion kan räknas upp till kvarvarande arbetsförmåga."
      eyebrow="Arbetsförmåga"
      showInstitutionNote={false}
    >
      <Arbetsformagebedomaren />

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          När restvärdet får ny rubrik
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Om bedömningen ändå behöver formuleras som något som låter mer anställningsbart kan
          underlaget omvandlas till en arbetsprofil. Om ämnet ligger för nära finns Nådeläge kvar
          som stilla avsteg.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/cv-generator"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Underlaget kan omformuleras som arbetsprofil
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
