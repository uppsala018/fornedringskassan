import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://fornedringskassan.lol/sitemap.xml",
    host: "https://fornedringskassan.lol",
  };
}
