import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Nådeläge hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Tillfälligt andrum",
    title: "Nådeläge",
    description:
      "En lugn paus utanför bedömningen, med stödjande språk om stillhet, tröst och värdighet.",
    accent: "#8aa393",
    calm: true,
  });
}
