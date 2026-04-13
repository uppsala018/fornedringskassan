import type { Metadata } from "next";

import { HandlaggarkedjaSimulator } from "@/components/handlaggarkedja-simulator";

const title = "Handläggarkedja | Förnedringskassan";
const description =
  "En satirisk simulering av hur ansvar förskjuts mellan allt fler handläggare, funktioner och systemiska hänvisningar.";

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

export default function HandlaggarkedjaPage() {
  return <HandlaggarkedjaSimulator />;
}
