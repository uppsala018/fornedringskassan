import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { Arbetsformagebedomaren } from "@/components/arbetsformagebedomaren";

const title = "Arbetsförmågebedömaren | satirisk bedömning av kvarvarande förmåga";
const description =
  "Beskriv symtom, begränsningar och det som fortfarande kan observeras som förmåga. Få en fiktiv arbetsförmågebedömning i myndighetston.";

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
      intro="Beskriv det som blivit svårt och låt systemet formulera en formell bedömning av kvarvarande arbetsförmåga."
      eyebrow="Arbetsförmåga"
      showInstitutionNote={false}
    >
      <Arbetsformagebedomaren />
    </PageShell>
  );
}
