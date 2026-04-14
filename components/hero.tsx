import Link from "next/link";

type HeroProps = {
  title: string;
  intro: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function Hero({
  title,
  intro,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: HeroProps) {
  return (
    <section className="bureaucratic-panel overflow-hidden rounded-dossier border border-steel/20 bg-white/80 shadow-docket">
      <div className="grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.4fr_0.8fr] lg:px-10 lg:py-12">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-ink/72">
            Systematiserad misstro sedan oklar tidpunkt
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/76">
            {intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-ink/90"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
        <aside className="rounded-dossier border border-dashed border-steel/30 bg-paper p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">
            Plats för satirisk logotyp
          </p>
          <div className="mt-5 grid min-h-52 place-items-center rounded-[1.25rem] border border-steel/20 bg-grid bg-[size:22px_22px] bg-center">
            <div className="rounded-full border border-stamp/40 bg-white/80 px-5 py-3 text-center text-sm font-medium text-ink shadow-sm">
              Original logoplats
              <br />
              Symbol, stämpel eller sigill
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-ink/76">
            Visuell riktning: blankettbeige, granskningsgrått och en diskret stämpelton. Kliniskt, men inte trovärdigt nog för att misstas för en riktig institution.
          </p>
        </aside>
      </div>
    </section>
  );
}
