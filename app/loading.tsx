import { statusMicrocopy } from "@/lib/microcopy";

export default function Loading() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="bureaucratic-panel rise-fade rounded-dossier border border-steel/20 bg-white/88 p-8 shadow-docket">
        <p className="text-sm uppercase tracking-[0.32em] text-steel">Laddar ärendevy</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {statusMicrocopy.loadingTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-steel">
          {statusMicrocopy.loadingBody}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-stamp" />
          <div className="h-3 w-3 animate-pulse rounded-full bg-steel [animation-delay:150ms]" />
          <div className="h-3 w-3 animate-pulse rounded-full bg-ledger [animation-delay:300ms]" />
        </div>
      </div>
    </section>
  );
}
