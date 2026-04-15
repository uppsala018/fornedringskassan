import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { handlaggarnyttPosts } from "./posts";

const title = "Handläggarnytt | officiella notiser från Förnedringskassan";
const description =
  "Handläggarnytt samlar korta notiser om väntan, omprövning och andra justeringar i Förnedringskassans ärendeflöde.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/handlaggarnytt",
  },
  openGraph: {
    title,
    description,
    url: "/handlaggarnytt",
  },
  twitter: {
    title,
    description,
  },
};

export default function HandlaggarnyttPage() {
  const posts = [...handlaggarnyttPosts].reverse();

  return (
    <PageShell
      title="Handläggarnytt"
      intro="Korta notiser där systemet förklarar sina egna justeringar som rutin och ordning."
      eyebrow="Intern bulletin"
      showInstitutionNote={false}
    >
      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Systemets egen bulletin</p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-ink/76">
          Här samlas korta meddelanden om sådant som förändras precis lagom mycket för att kunna
          beskrivas som rutin. Varje notis visar hur systemet kan skriva om sina egna rörelser till
          ordnad rutin, och kommer att uppdateras i samma ordning som resten av sajten gärna pratar
          om ordning.
        </p>
      </section>

      <section className="grid gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="institution-card p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Notis</p>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
              {post.title}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-ink/65">{post.published}</p>
            <p className="mt-4 text-base leading-8 text-ink/76">{post.summary}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={post.route}
                className="inline-flex min-h-10 items-center rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition hover:bg-seal"
              >
                Läs notisen
              </Link>
              <span className="rounded-full border border-steel/20 bg-white/88 px-4 py-2 text-sm text-ink/76">
                {post.route}
              </span>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
