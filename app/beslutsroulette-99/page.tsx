import type { Metadata } from "next";

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
      intro="Om en full granskning inte hinns med kan ärendet avgöras i ordnad slump. 0 betyder godkänd i 7 dagar. 1–99 betyder ej godkänd."
      eyebrow="Snabbförfarande"
      showInstitutionNote={false}
    >
      <Beslutsroulette99 />
    </PageShell>
  );
}
