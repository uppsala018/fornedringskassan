import type { Metadata } from "next";

import { NormaltForekommandeArbetenPage } from "@/components/normalt-forekommande-arbeten";

export const metadata: Metadata = {
  title: "Normalt förekommande arbeten | Förnedringskassan",
  description:
    "Satirisk jobbmatchning hos den fiktiva Arbetsförnedringen för arbeten som bedömts rimliga enligt samlad bedömning.",
  openGraph: {
    title: "Normalt förekommande arbeten | Förnedringskassan",
    description:
      "Satirisk jobbmatchning hos den fiktiva Arbetsförnedringen för arbeten som bedömts rimliga enligt samlad bedömning.",
  },
  twitter: {
    title: "Normalt förekommande arbeten | Förnedringskassan",
    description:
      "Satirisk jobbmatchning hos den fiktiva Arbetsförnedringen för arbeten som bedömts rimliga enligt samlad bedömning.",
  },
};

export default function NormaltForekommandeArbetenRoute() {
  return <NormaltForekommandeArbetenPage />;
}
