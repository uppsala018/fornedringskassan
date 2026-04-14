import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Nådeläge, en stilla paus för vila och värdighet";

export default function Image() {
  return createOgImage({
    eyebrow: "En stilla paus",
    title: "Nådeläge",
    description:
      "En lugn paus för vila, tröst och värdighet, bortom bedömning och krav.",
    accent: "#8aa393",
    calm: true,
  });
}
