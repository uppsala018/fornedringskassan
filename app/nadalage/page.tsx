import type { Metadata } from "next";

import { NadalageView } from "@/components/nadalage-view";

const title = "Nådeläge | en stilla paus för vila och värdighet";
const description =
  "En stilla paus för vila, tröst och värdighet, för stunder då du vill slippa bedömning, förklaring och krav.";

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
