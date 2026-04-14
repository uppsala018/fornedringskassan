import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Förnedringskassan av Elektrisk Revy";

export default function Image() {
  return createOgImage({
    eyebrow: "Musik",
    title: "Förnedringskassan",
    description:
      "Elektrisk Revy på en dedikerad releasesida med lokal uppspelning, HyperFollow och plats för fler lyssningslänkar.",
  });
}
