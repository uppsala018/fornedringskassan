import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { ReleaseShareButton } from "@/components/release-share-button";
import { PunchlineStrip } from "@/components/punchline-strip";

const title = "Förnedringskassan | Elektrisk Revy";
const description =
  'Lyssna på "Förnedringskassan" av Elektrisk Revy direkt på sidan. En satirisk singel med omslag, lokal uppspelning, HyperFollow och plats för fler lyssningslänkar.';
const pageUrl = "https://fornedringskassan.vercel.app/musik/fornedringskassan";
const hyperfollowUrl =
  "https://distrokid.com/hyperfollow/elektriskrevy/frnedringskassan";
const audioSrc = "/audio/fornedringskassan.mp3";
const coverSrc = "/images/fornedringskassan-cover.png";

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
      intro="Elektrisk Revy · en satirisk singel om myndighetsspråk, avslag och en offentlighet som låter ordnad även när den inte hjälper."
      eyebrow="Musik"
      showInstitutionNote={false}
    >
      <PunchlineStrip
        eyebrow="Lyssning"
        punchline="En satirlåt i institutionell förpackning"
      />

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Om låten</p>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.25rem] border border-steel/15 bg-white/88 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/68">Artist</p>
              <p className="mt-2 whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                Elektrisk Revy
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-steel/15 bg-white/88 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/68">Titel</p>
              <p className="mt-2 whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
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
                <p className="text-xs uppercase tracking-[0.3em] text-ink/68">Omslag</p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                  Elektrisk Revy
                </p>
              </div>
              <div className="rounded-full border border-steel/20 bg-paper px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-ink/72">
                Singel
              </div>
            </div>

            <div className="relative my-6 flex flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] border border-steel/15 bg-[linear-gradient(180deg,#f6f1e8_0%,#e8ece8_100%)] p-3 sm:p-4">
              <div className="relative aspect-square w-full max-w-[410px] overflow-hidden rounded-[1.4rem] border border-steel/15 bg-white shadow-[0_12px_30px_rgba(29,42,45,0.12)]">
                <Image
                  src={coverSrc}
                  alt="Omslag för Förnedringskassan av Elektrisk Revy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 410px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <p className="text-sm leading-7 text-ink/72">
              Omslaget används här som del av releasepresentationen och kan återanvändas på fler
              plattformar senare.
            </p>
          </div>
        </aside>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Lyssna direkt</p>
        <div className="mt-4 rounded-[1.35rem] border border-steel/15 bg-paper p-4 sm:p-5">
          <audio controls preload="metadata" className="w-full" aria-label="Spela Förnedringskassan av Elektrisk Revy">
            <source src={audioSrc} type="audio/mpeg" />
            Din webbläsare stöder inte ljuduppspelning.
          </audio>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Ljudfilen spelas lokalt på sidan. HyperFollow finns där för den som vill gå vidare till
          fler lyssningsvägar utan att lämna utgåvan.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Vad den driver med</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Språk som låter ordnat även när det flyttar på ansvar
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Låten driver med myndighetsspråk som låter neutralt, men ändå gör väntan längre,
            besluten kallare och ansvaret mer avlägset än det först verkar.
          </p>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Det är den sortens satir som känns igen på tonen snarare än på skämtet: allt låter
            ordnat, men ordningen hjälper sällan den som befinner sig i den.
          </p>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Lyssna och dela</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            HyperFollow tills vidare
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            HyperFollow samlar den här utgåvan på ett ställe tills Spotify, Apple Music eller andra
            tjänster läggs till. Delningsknappen högre upp och länken här nere gör det lätt att
            skicka vidare releasen i samma anda.
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
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Framtida streaming</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Reserverad yta för Spotify och andra länkar
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
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Om projektkopplingen</p>
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
