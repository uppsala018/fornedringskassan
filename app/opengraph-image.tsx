import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Förnedringskassan, fiktiv satirisk bedömningsinstans";

export default function Image() {
  return createOgImage({
    eyebrow: "Central enhet för formellt missmod",
    title: "Förnedringskassan",
    description:
      "En fiktiv institution för beslut, avslag, handläggarkedjor och annan välpolerad administrativ nedkylning.",
  });
}
