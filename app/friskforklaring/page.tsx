import type { Metadata } from "next";

import { FriskforklaringAssessment } from "@/components/friskforklaring-assessment";

const title = "Friskförklaring | satirisk prövning av arbetsförmåga";
const description =
  "Svara på några kontrollerande frågor och låt ett fiktivt system avgöra om din återhämtning råkar se alltför funktionell ut.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/friskforklaring",
  },
  openGraph: {
    title,
    description,
    url: "/friskforklaring",
  },
  twitter: {
    title,
    description,
  },
};

export default function FriskforklaringPage() {
  return <FriskforklaringAssessment />;
}
