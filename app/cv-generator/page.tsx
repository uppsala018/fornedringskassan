import type { Metadata } from "next";

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
      intro="Beskriv det som inte fungerar i arbetslivet och låt systemet skriva om det till ett CV som låter mer anställningsbart än underlaget borde göra."
      eyebrow="Arbetsprofil"
      showInstitutionNote={false}
    >
      <CvGenerator />
    </PageShell>
  );
}
