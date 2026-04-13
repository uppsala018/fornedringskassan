import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Normalt förekommande arbeten hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Överlämning till Arbetsförnedringen",
    title: "Normalt förekommande arbeten",
    description:
      "Satirisk jobbmatchning mot arbeten som bedömts rimliga enligt samlad bedömning och utvidgad verklighetsuppfattning.",
  });
}
