import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Beslutsroulette 99 hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Snabbförfarande",
    title: "Beslutsroulette 99",
    description:
      "Ett satiriskt beslutshjul där 0 betyder godkänd i 7 dagar och 1–99 betyder ej godkänd.",
  });
}
