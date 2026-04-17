import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocumentActions } from "@/components/document-actions";
import { PageShell } from "@/components/page-shell";
import { jsonLd } from "@/lib/json-ld";
import { siteUrl } from "@/lib/site-url";

import { getHandlaggarnyttPost, handlaggarnyttPosts } from "../posts";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return handlaggarnyttPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getHandlaggarnyttPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metadataTitle,
    description: post.metadataDescription,
    alternates: {
      canonical: post.route,
    },
    openGraph: {
      title: post.metadataTitle,
      description: post.metadataDescription,
      url: post.route,
    },
    twitter: {
      title: post.metadataTitle,
      description: post.metadataDescription,
    },
  };
}

export default async function HandlaggarnyttPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getHandlaggarnyttPost(slug);

  if (!post) {
    notFound();
  }

  const pageText = [
    post.title,
    post.published,
    post.summary,
    ...post.sections.map((section) => `${section.heading}\n${section.body}`),
  ].join("\n\n");

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metadataTitle,
    description: post.metadataDescription,
    inLanguage: "sv-SE",
    url: siteUrl(post.route),
    mainEntityOfPage: siteUrl(post.route),
    publisher: {
      "@type": "Organization",
      name: "Förnedringskassan",
    },
  };

  return (
    <PageShell
      title={post.title}
      intro={post.intro}
      eyebrow="Handläggarnytt"
      showInstitutionNote={false}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(postJsonLd) }}
      />
      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-steel/20 bg-white/88 px-4 py-2 text-sm text-ink/76">
            Publicerad {post.published}
          </span>
          <span className="rounded-full border border-steel/20 bg-white/88 px-4 py-2 text-sm text-ink/76">
            {post.route}
          </span>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-8 text-ink/76">
          {post.summary}
        </p>

        <div className="mt-6 space-y-5">
          {post.sections.map((section) => (
            <article key={section.heading} className="rounded-[1.35rem] border border-steel/15 bg-white/88 p-5">
              <h2 className="text-balance font-display text-xl font-semibold tracking-tight text-ink">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-8 text-ink/76">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Fler delar av samma ordning
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/handlaggarnytt"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Till arkivet
          </Link>
          <Link
            href="/spora-ditt-arende"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Spåra ditt ärende
          </Link>
          <Link
            href="/beslutsroulette"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
          Beslutsroulette
          </Link>
        </div>
      </section>

      <div className="pt-2">
        <DocumentActions
          title={post.title}
          text={pageText}
          pdfFilename={`${post.slug}.pdf`}
          sharePath={post.route}
          shareTitle={post.title}
          buttonLabel="Notishandling"
        />
      </div>
    </PageShell>
  );
}
