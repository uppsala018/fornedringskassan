import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Avslagsbrev hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Formellt ställningstagande",
    title: "Avslagsbrev",
    description:
      "Ett satiriskt beslutsbrev med helhetsbedömning, underlagshänvisning och korrekt avvägd kyla.",
  });
}
