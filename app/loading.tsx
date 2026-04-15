export default function Loading() {
  return (
    <section
      className="mx-auto flex min-h-[40vh] max-w-4xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="inline-flex items-center gap-3 rounded-dossier border border-steel/20 bg-white/90 px-5 py-4 shadow-docket">
        <div className="loading-spinner" role="status" aria-label="Laddar innehåll" />
        <p className="text-sm leading-7 text-ink/76">Laddar innehåll…</p>
      </div>
    </section>
  );
}
