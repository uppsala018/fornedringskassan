import type { Metadata } from "next";

import { AvslagsbrevGenerator } from "@/components/avslagsbrev-generator";

const title = "Avslagsbrev | Förnedringskassan";
const description =
  "Generera ett satiriskt avslagsbrev i välpolerad byråkratisk svenska, med underlag, helhetsbedömning och formellt tonfall.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/avslagsbrev",
  },
  openGraph: {
    title,
    description,
    url: "/avslagsbrev",
  },
  twitter: {
    title,
    description,
  },
};

export default function AvslagsbrevPage() {
  return <AvslagsbrevGenerator />;
}
