import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/friskforklaring",
  "/avslagsbrev",
  "/overklaga-beslut",
  "/beslutsroulette",
  "/cv-generator",
  "/arbetsformagebedomaren",
  "/handlaggarnytt",
  "/musik/fornedringskassan",
  "/spora-ditt-arende",
  "/handlaggarkedja",
  "/nadalage",
  "/fragor-och-svar",
  "/normalt-forekommande-arbeten",
  "/om",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://fornedringskassan.vercel.app${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
