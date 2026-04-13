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
        className={`relative ${symbolSize} shrink-0 overflow-hidden rounded-[1.75rem] border border-steel/25 bg-paper shadow-sm`}
      >
        <svg
          viewBox="0 0 96 96"
          className="h-full w-full"
          role="img"
          aria-label="Fiktiv satirisk emblem för Förnedringskassan"
        >
          <rect x="0.5" y="0.5" width="95" height="95" rx="30" fill="#f7f4ee" />
          <path
            d="M14 66h68l-8 12H22z"
            fill="#1d2a2d"
            opacity="0.14"
          />
          <path
            d="M20 18h44l12 12v38H20z"
            fill="#ffffff"
            stroke="#617377"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M64 18v12h12"
            fill="none"
            stroke="#617377"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 18l12 12"
            stroke="#617377"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect x="28" y="34" width="24" height="4" rx="2" fill="#617377" opacity="0.82" />
          <rect x="28" y="45" width="31" height="4" rx="2" fill="#617377" opacity="0.55" />
          <rect x="28" y="56" width="18" height="4" rx="2" fill="#617377" opacity="0.38" />
          <path
            d="M56 52c0-7 5.5-12.5 12.5-12.5S81 45 81 52s-5.5 12.5-12.5 12.5S56 59 56 52Z"
            fill="#9e5440"
            opacity="0.95"
          />
          <path
            d="M60 52h17M68.5 44v16"
            stroke="#f7f4ee"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M24 73h28"
            stroke="#9e5440"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.3em] text-steel">
          Fiktiv bedömningsinstans
        </p>
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
