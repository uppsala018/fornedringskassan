export function SiteFooter() {
  return (
    <footer className="border-t border-steel/20 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-3 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-paper/78">
            Fiktiv byrå för inre utmattning
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-paper/88">
            Förnedringskassan är satir och ska inte förväxlas med någon verklig
            myndighet, rådgivningstjänst eller formellt beslutsorgan.
          </p>
        </div>
        <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-paper/72">Driftstatus</p>
          <p className="mt-3 text-sm leading-7 text-paper/84">
            Handläggningstid för svar: 6 till 18 verksamhetsliv. Intern omtolkning
            kan förekomma utan föregående förståelse.
          </p>
        </div>
      </div>
    </footer>
  );
}
