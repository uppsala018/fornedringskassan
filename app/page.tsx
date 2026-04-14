import type { Metadata } from "next";

import { HomepageShowcase } from "@/components/homepage-showcase";

const title = "Förnedringskassan | satirisk myndighetsparodi";
const description =
  "En fiktiv svensk myndighetsparodi om blanketter, väntetider, handläggarkedjor och beslut som låter rimliga tills man läser dem noga.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
  },
  twitter: {
    title,
    description,
  },
};

export default function HomePage() {
  return <HomepageShowcase />;
}
