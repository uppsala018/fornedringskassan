import type { MetadataRoute } from "next";

import { handlaggarnyttPosts } from "./handlaggarnytt/posts";
import { siteUrl } from "@/lib/site-url";

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
  "/pressmeddelande",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const archiveRoutes = handlaggarnyttPosts.map((post) => post.route);

  return [...routes, ...archiveRoutes].map((route) => ({
    url: siteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
