import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Friskförklaring hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Automatisk prövning",
    title: "Friskförklaring",
    description:
      "Satirisk bedömning av återhämtning och arbetsförmåga för dig som riskerar att fungera i teori.",
  });
}
