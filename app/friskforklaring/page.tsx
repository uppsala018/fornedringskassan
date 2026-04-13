import type { Metadata } from "next";

import { FriskforklaringAssessment } from "@/components/friskforklaring-assessment";

const title = "Friskförklaring | Förnedringskassan";
const description =
  "Automatisk prövning av återhämtning och arbetsförmåga i satirisk form, för dig som riskerar att bedömas fungera i teori.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function FriskforklaringPage() {
  return <FriskforklaringAssessment />;
}
