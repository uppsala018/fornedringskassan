import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Arbetsförmågebedömaren hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Arbetsförmåga",
    title: "Arbetsförmågebedömaren",
    description:
      "Ett satiriskt verktyg som omformulerar begränsningar, symtom och kvarvarande funktion till en formaliserad bedömning.",
  });
}
