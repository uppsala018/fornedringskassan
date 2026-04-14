import type { Metadata } from "next";

import { NadalageView } from "@/components/nadalage-view";

const title = "Nådeläge | stilla paus från myndighetstonen";
const description =
  "En kort, satirisk andningspaus med stillhet, tröst och värdighet för stunder då byråkratin behöver få tystna en stund.";

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
