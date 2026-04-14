import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Spåra ditt ärende hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Ärendespårning",
    title: "Spåra ditt ärende",
    description: "En fiktiv spårning av ett ärende som rör sig genom Förnedringskassan utan att bli tydligare.",
  });
}
