import type { Metadata } from "next";

import { NormaltForekommandeArbetenPage } from "@/components/normalt-forekommande-arbeten";

export const metadata: Metadata = {
  title: "Normalt förekommande arbeten | Förnedringskassan",
  description:
    "Satirisk jobbmatchning hos den fiktiva Arbetsförnedringen för arbeten som bedömts rimliga enligt samlad bedömning.",
  alternates: {
    canonical: "/normalt-forekommande-arbeten",
  },
  openGraph: {
    title: "Normalt förekommande arbeten | Förnedringskassan",
    description:
      "Satirisk jobbmatchning hos den fiktiva Arbetsförnedringen för arbeten som bedömts rimliga enligt samlad bedömning.",
    url: "/normalt-forekommande-arbeten",
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
