import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Överklaga beslut hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Överklagande",
    title: "Överklaga beslut",
    description: "En ny prövning av ett redan prövat beslut, med samma ordning och något längre väg.",
  });
}
