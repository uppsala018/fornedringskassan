import type { Metadata } from "next";

import { HandlaggarkedjaSimulator } from "@/components/handlaggarkedja-simulator";

const title = "Handläggarkedja | interaktiv satir om ansvar";
const description =
  "Följ ett ärende när ansvar flyttar mellan handläggare, funktioner och hänvisningar tills ingen längre äger svaret.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/handlaggarkedja",
  },
  openGraph: {
    title,
    description,
    url: "/handlaggarkedja",
  },
  twitter: {
    title,
    description,
  },
};

export default function HandlaggarkedjaPage() {
  return <HandlaggarkedjaSimulator />;
}
