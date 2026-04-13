import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Handläggarkedja hos Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Intern vidarekoppling",
    title: "Handläggarkedja",
    description:
      "En satirisk simulering av hur ansvar förskjuts mellan handläggare, process och systemisk ordning.",
  });
}
