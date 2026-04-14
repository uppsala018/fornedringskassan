import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Handläggarnytt hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Intern bulletin",
    title: "Handläggarnytt",
    description:
      "Korta notiser om väntan, omprövning och andra justeringar i Förnedringskassans ärendeflöde.",
  });
}
