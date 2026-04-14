import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { ReleaseShareButton } from "@/components/release-share-button";

const title = "Förnedringskassan | Elektrisk Revy";
const description =
  'Lyssna på "Förnedringskassan" av Elektrisk Revy direkt på sidan, med lokal uppspelning, HyperFollow och plats för fler lyssningslänkar.';
const pageUrl = "https://fornedringskassan.lol/musik/fornedringskassan";
const hyperfollowUrl =
  "https://distrokid.com/hyperfollow/elektriskrevy/frnedringskassan";
const audioSrc = "/audio/fornedringskassan.mp3";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/musik/fornedringskassan",
  },
  openGraph: {
    title,
    description,
    url: "/musik/fornedringskassan",
  },
  twitter: {
    title,
    description,
  },
};

export default function MusikFornedringskassanPage() {
  return (
    <PageShell
      title="Förnedringskassan"
      intro="Elektrisk Revy · en singel om en myndighetston som låter ordnad även när den inte hjälper."
      eyebrow="Musik"
      showInstitutionNote={false}
    >
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Releaseinformation</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-steel/15 bg-white/88 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/68">Artist</p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Elektrisk Revy
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-steel/15 bg-white/88 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/68">Titel</p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Förnedringskassan
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-ink/76">
            En rak releasesida för låten, med lokal uppspelning på sidan och en utgång till
            DistroKid HyperFollow för fler lyssningsvägar när de behövs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ReleaseShareButton title={title} url={pageUrl} />
            <Link
              href={hyperfollowUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
            >
              Lyssna via HyperFollow
            </Link>
          </div>
        </article>

        <aside className="rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,#f8f4ec_0%,#edf1ee_100%)] p-6 sm:p-8">
          <div className="flex h-full min-h-[360px] flex-col justify-between rounded-[1.5rem] border border-steel/15 bg-white/78 p-5 shadow-[0_18px_40px_rgba(29,42,45,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-ink/68">Omslagsyta</p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                  Elektrisk Revy
                </p>
              </div>
              <div className="rounded-full border border-steel/20 bg-paper px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-ink/72">
                Singel
              </div>
            </div>

            <div className="relative my-6 flex flex-1 items-center justify-center overflow-hidden rounded-[1.25rem] border border-steel/15 bg-[radial-gradient(circle_at_top,#faf7f0_0%,#e8ece8_100%)]">
              <div className="absolute inset-x-6 top-8 h-px bg-[#d8caa4]/70" />
              <div className="absolute inset-x-10 top-16 h-px bg-[#d8caa4]/50" />
              <div className="absolute inset-x-12 bottom-20 h-1 rounded-full bg-[#617377]/45" />
              <div className="absolute inset-x-14 bottom-14 h-1 rounded-full bg-[#617377]/30" />
              <div className="absolute bottom-10 right-10 h-20 w-20 rounded-full bg-[#1d2a2d] shadow-[0_10px_24px_rgba(29,42,45,0.25)]" />
              <div className="absolute bottom-16 right-18 h-4 w-4 rounded-full bg-[#f7f4ee]" />
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.34em] text-ink/68">Förnedringskassan</p>
                <p className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink">
                  Elektrisk Revy
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-ink/72">
              En ren plats för omslag eller Spotify-embed när nästa version av releasen ska
              presenteras här.
            </p>
          </div>
        </aside>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Lyssna direkt på sidan</p>
        <div className="mt-4 rounded-[1.35rem] border border-steel/15 bg-paper p-4 sm:p-5">
          <audio controls preload="metadata" className="w-full" aria-label="Spela Förnedringskassan av Elektrisk Revy">
            <source src={audioSrc} type="audio/mpeg" />
            Din webbläsare stöder inte ljuduppspelning.
          </audio>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Ljudfilen spelas lokalt på sidan tills fler plattformar läggs till.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Lyssna på fler plattformar</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Samlade lyssningsvägar tills vidare
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            HyperFollow samlar den här utgåvan på ett ställe tills Spotify, Apple Music eller andra
            tjänster läggs till. Sidan är byggd för att kunna växa utan att strukturen behöver göras
            om.
          </p>
          <div className="mt-6">
            <Link
              href={hyperfollowUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
            >
              Öppna DistroKid HyperFollow
            </Link>
          </div>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Framtida embeds</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Reserverad yta för streaming och extra länkar
          </h2>
          <div className="mt-4 rounded-[1.25rem] border border-dashed border-steel/25 bg-paper/80 p-5">
            <div className="grid gap-3 text-sm leading-7 text-ink/74">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-steel/15 bg-white/88 px-4 py-3">
                <span>Spotify embed</span>
                <span className="uppercase tracking-[0.22em] text-ink/60">Plats förberedd</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-steel/15 bg-white/88 px-4 py-3">
                <span>Apple Music</span>
                <span className="uppercase tracking-[0.22em] text-ink/60">Plats förberedd</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-steel/15 bg-white/88 px-4 py-3">
                <span>YouTube Music</span>
                <span className="uppercase tracking-[0.22em] text-ink/60">Plats förberedd</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-base leading-8 text-ink/76">
            När fler plattformar finns att lägga till kan den här ytan fyllas på utan att sidan
            behöver byggas om.
          </p>
        </article>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Om utgåvan</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          En låt som hör till samma värld som resten av sajten
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Förnedringskassan är en verklig låt av Elektrisk Revy, kopplad till samma universum som
          webbplatsen. Den här sidan är byggd som en fristående releasesida med plats för lyssning,
          delning och framtida streaminglänkar.
        </p>
      </section>
    </PageShell>
  );
}
