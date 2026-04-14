import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/friskforklaring",
  "/avslagsbrev",
  "/overklaga-beslut",
  "/handlaggarkedja",
  "/nadalage",
  "/fragor-och-svar",
  "/normalt-forekommande-arbeten",
  "/om",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://fornedringskassan.lol${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
