import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Förnedringskassan",
    short_name: "Förnedringskassan",
    description:
      "En fiktiv och satirisk myndighetsparodi om blanketter, väntetider och välpolerad hopplöshet.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#1d2a2d",
    lang: "sv-SE",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
