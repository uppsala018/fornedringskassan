import type { Metadata } from "next";

import { NadalageView } from "@/components/nadalage-view";

const title = "Nådeläge | Förnedringskassan";
const description =
  "En lugn paus utanför den satiriska byråkratin, med korta stödjande rader om stillhet, tröst och värdighet.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/nadalage",
  },
  openGraph: {
    title,
    description,
    url: "/nadalage",
  },
  twitter: {
    title,
    description,
  },
};

export default function NadalagePage() {
  return <NadalageView />;
}
