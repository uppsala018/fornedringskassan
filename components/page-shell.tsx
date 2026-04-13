import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export function PageShell({ title, intro, children }: PageShellProps) {
  return (
    <section className="mx-auto max-w-5xl px-3 py-9 sm:px-6 lg:px-8 lg:py-16">
      <div className="bureaucratic-panel overflow-hidden rounded-dossier border border-steel/20 bg-white/84 shadow-docket">
        <div className="border-b border-steel/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(246,243,236,0.9))] px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.34em] text-steel">Ärendetyp</p>
              <h1 className="mt-4 break-words text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl break-words text-lg leading-8 text-steel">{intro}</p>
            </div>
            <div className="rounded-[1.4rem] border border-steel/15 bg-paper/90 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-steel">
                Institutionell notis
              </p>
              <p className="mt-3 break-words text-sm leading-7 text-steel">
                Denna vy tillhör en fiktiv satirisk tjänst. Formulär, beslut och
                överlämningar är påhittade, även när de låter välbekanta.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-8 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">{children}</div>
      </div>
    </section>
  );
}
