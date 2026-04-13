import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Om projektet Förnedringskassan";

export default function Image() {
  return createOgImage({
    eyebrow: "Institutionell notis",
    title: "Om projektet",
    description:
      "Information om Förnedringskassan som satiriskt projekt, samhällskommentar och fiktiv institution.",
  });
}
