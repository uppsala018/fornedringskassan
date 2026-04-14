import type { Metadata } from "next";

import { AvslagsbrevGenerator } from "@/components/avslagsbrev-generator";

const title = "Avslagsbrev | satirisk myndighetssvenska";
const description =
  "Generera ett fiktivt avslagsbrev på torr myndighetssvenska, med underlag, motivering och en lagom kall avslutning.";

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
