import type { Metadata } from "next";

import { HomepageShowcase } from "@/components/homepage-showcase";

const title = "Förnedringskassan";
const description =
  "En fiktiv satirisk parodi på byråkrati, beslut, handläggarkedjor och annan välpolerad administrativ nedkylning.";

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
