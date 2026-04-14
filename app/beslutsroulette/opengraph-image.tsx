import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Beslutsroulette hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Beslutsfunktion",
    title: "Beslutsroulette",
    description:
      "Ett fiktivt beslut genereras i Förnedringskassans byråkrati. Formellt, tyst och ofta redan bestämt.",
  });
}
