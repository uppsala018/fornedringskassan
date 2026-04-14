import { statusMicrocopy } from "@/lib/microcopy";

export default function Loading() {
  return (
    <section
      className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="bureaucratic-panel rise-fade rounded-dossier border border-steel/20 bg-white/90 p-8 shadow-docket">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Laddar ärendevy</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {statusMicrocopy.loadingTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/82">
          {statusMicrocopy.loadingBody}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div
            className="loading-spinner"
            role="status"
            aria-label="Administrativ förskjutning pågår"
          />
          <div className="space-y-1">
            <p className="text-sm font-medium text-ink">Ditt tålamod har diarieförts.</p>
            <p className="text-sm leading-7 text-ink/76">
              Var god invänta administrativ förskjutning. Ingen åtgärd krävs, men den kan pågå.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
