type InfoCardProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function InfoCard({ eyebrow, title, body }: InfoCardProps) {
  return (
    <article className="bureaucratic-panel rounded-dossier border border-steel/20 bg-white/75 p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.28em] text-steel">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-4 text-base leading-7 text-steel">{body}</p>
    </article>
  );
}
