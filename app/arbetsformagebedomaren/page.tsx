import type { Metadata } from "next";

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
      intro="Den här sidan driver med hur system kan läsa små rester av funktion som kvarvarande arbetsförmåga."
      eyebrow="Arbetsförmåga"
      showInstitutionNote={false}
    >
      <Arbetsformagebedomaren />
    </PageShell>
  );
}
