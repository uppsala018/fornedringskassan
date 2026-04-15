import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "CV-generator hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Arbetsprofil",
    title: "CV-generator",
    description:
      "Ett satiriskt verktyg som skriver om begränsningar, trötthet och symtom till en formell arbetsprofil.",
  });
}
