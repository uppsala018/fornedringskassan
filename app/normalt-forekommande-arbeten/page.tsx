import type { Metadata } from "next";

import { NormaltForekommandeArbetenPage } from "@/components/normalt-forekommande-arbeten";

export const metadata: Metadata = {
  title: "Normalt förekommande arbeten | satirisk jobbmatchning",
  description:
    "En absurd jobbmotor för arbeten som bedöms som rimliga enligt samlad bedömning, kategorier och en välvilligt osäker arbetslinje.",
  alternates: {
    canonical: "/normalt-forekommande-arbeten",
  },
  openGraph: {
    title: "Normalt förekommande arbeten | satirisk jobbmatchning",
    description:
      "En absurd jobbmotor för arbeten som bedöms som rimliga enligt samlad bedömning, kategorier och en välvilligt osäker arbetslinje.",
    url: "/normalt-forekommande-arbeten",
  },
  twitter: {
    title: "Normalt förekommande arbeten | satirisk jobbmatchning",
    description:
      "En absurd jobbmotor för arbeten som bedöms som rimliga enligt samlad bedömning, kategorier och en välvilligt osäker arbetslinje.",
  },
};

export default function NormaltForekommandeArbetenRoute() {
  return <NormaltForekommandeArbetenPage />;
}
