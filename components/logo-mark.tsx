type LogoMarkProps = {
  compact?: boolean;
  showTagline?: boolean;
  className?: string;
};

export function LogoMark({
  compact = false,
  showTagline = true,
  className = "",
}: LogoMarkProps) {
  const symbolSize = compact ? "h-12 w-12" : "h-20 w-20";
  const titleSize = compact ? "text-lg" : "text-3xl";
  const wrapperGap = compact ? "gap-3" : "gap-5";

  return (
    <div className={`flex items-center ${wrapperGap} ${className}`.trim()}>
      <div
        aria-hidden="true"
        className={`relative ${symbolSize} shrink-0 overflow-hidden rounded-[1.6rem] border border-steel/25 bg-paper shadow-sm`}
      >
        <svg
          viewBox="0 0 96 96"
          className="h-full w-full"
          role="img"
          aria-label="Fiktiv logotyp för Förnedringskassan"
        >
          <rect x="0.5" y="0.5" width="95" height="95" rx="26" fill="#f6f3ec" />
          <rect x="15" y="12" width="48" height="60" rx="12" fill="#ffffff" stroke="#617377" strokeWidth="2.5" />
          <path d="M63 12v20c0 5.523-4.477 10-10 10H33" fill="none" stroke="#617377" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 16l13 13" stroke="#617377" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="25" y="31" width="26" height="4" rx="2" fill="#617377" opacity="0.75" />
          <rect x="25" y="41" width="19" height="4" rx="2" fill="#617377" opacity="0.55" />
          <rect x="25" y="51" width="22" height="4" rx="2" fill="#617377" opacity="0.4" />
          <circle cx="67" cy="65" r="17" fill="#1d2a2d" />
          <circle cx="67" cy="65" r="12.5" fill="none" stroke="#f6f3ec" strokeWidth="1.8" strokeDasharray="2.5 3" />
          <path d="M61 65h12M67 59v12" stroke="#f6f3ec" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M57 79l4-6 6 5 6-5 4 6" fill="#9e5440" opacity="0.9" />
        </svg>
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.3em] text-steel">Fiktiv bedömningsinstans</p>
        <p className={`mt-1 font-display font-semibold tracking-tight text-ink ${titleSize}`}>
          Förnedringskassan
        </p>
        {showTagline ? (
          <p className="mt-1 text-sm leading-6 text-steel">
            Professionell misstro sedan okänt datum
          </p>
        ) : null}
      </div>
    </div>
  );
}
