import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

import { getHandlaggarnyttPost, handlaggarnyttPosts } from "../posts";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return handlaggarnyttPosts.map((post) => ({ slug: post.slug }));
}

export default function Image({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = getHandlaggarnyttPost(params.slug);

  return createOgImage({
    eyebrow: "Intern bulletin",
    title: post?.title ?? "Handläggarnytt",
    description: post?.summary ?? "Korta notiser om väntan, omprövning och andra justeringar i Förnedringskassans ärendeflöde.",
  });
}
