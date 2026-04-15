"use client";

type PunchlineStripProps = {
  eyebrow: string;
  punchline: string;
  note?: string;
  className?: string;
};

export function PunchlineStrip({
  eyebrow,
  punchline,
  note,
  className = "",
}: PunchlineStripProps) {
  return (
    <section className={`rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8 ${className}`}>
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-ink/72">{eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            {punchline}
          </h2>
        </div>
        {note ? <p className="max-w-3xl text-base leading-8 text-ink/76">{note}</p> : null}
      </div>
    </section>
  );
}
