export default function Loading() {
  return (
    <section
      className="mx-auto flex min-h-[40vh] max-w-4xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="loading-spinner" role="status" aria-label="Laddar sida" />
    </section>
  );
}
