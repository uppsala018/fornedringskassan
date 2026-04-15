import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { SporaDittArendeTracker } from "@/components/spora-ditt-arende-tracker";

const title = "Spåra ditt ärende | fiktiv ärendestatus hos Förnedringskassan";
const description =
  "Spåra ett fiktivt ärende genom Förnedringskassans byråkrati. Statusen rör sig, men klarheten gör det sällan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/spora-ditt-arende",
  },
  openGraph: {
    title,
    description,
    url: "/spora-ditt-arende",
  },
  twitter: {
    title,
    description,
  },
};

export default function SporaDittArendePage() {
  return (
    <PageShell
      title="Spåra ditt ärende"
      intro="Ange ett diarienummer och följ ett ärende som rör sig utan att bli klarare."
      eyebrow="Ärendespårning"
      showInstitutionNote={false}
    >
      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Rörelse utan besked</p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-ink/76">
          Spårningen visar en löpande status, några interna förflyttningar och ett nästa icke-steg
          som låter lovande tills man ser närmare på det. Resultatet är aktivt nog att kännas
          pågående, men begränsat nog att lämna samma fråga öppen.
        </p>
      </section>

      <SporaDittArendeTracker />

      <section className="grid gap-6 md:grid-cols-2">
        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Vad spåras?</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Ett ärende som rör sig mellan mottagning, förflyttning och väntan
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Det som spåras är ett fiktivt ärende i den ordning där varje status kan kännas tydlig
            i stunden men ändå lämna samma fråga öppen när man läser den en gång till.
          </p>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Vad syns?</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Något händer, men saken går inte nödvändigtvis framåt
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Statusen bekräftar att ärendet är aktivt, registrerat och vid behov förflyttat. Det
            betyder inte alltid att det blivit klarare, bara att det fortfarande räknas som i rörelse.
          </p>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Historik utan avslut</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Tidigare milstolpar som fortfarande inte blev avslut
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Varje spårning visar också en kort intern rörelsehistorik. Den fungerar som minne,
            men främst som bekräftelse på att ärendet redan hunnit runt flera gånger.
          </p>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Nästa steg</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Ett kommande icke-steg i ordnad följd
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Den förväntade fortsättningen är vanligtvis ännu en intern förflyttning, ytterligare
            väntan eller en ny läsning av samma material i något annorlunda tonläge.
          </p>
        </article>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Om nästa rörelse vill avgöras snabbare
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Om ärendet redan ser färdigt ut att föras vidare kan snabbförfarandet i Beslutsroulette
          användas som nästa ordnade osäkerhet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/beslutsroulette"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Beslutsroulette
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
