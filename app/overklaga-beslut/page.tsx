import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { OverklagaBeslutGenerator } from "@/components/overklaga-beslut-generator";

const title = "Överklaga beslut | satirisk omprövning";
const description =
  "Överklaga ett beslut i Förnedringskassans fiktiva byråkrati. Ärendet prövas igen, i ny ordning och med samma artiga avstånd.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/overklaga-beslut",
  },
  openGraph: {
    title,
    description,
    url: "/overklaga-beslut",
  },
  twitter: {
    title,
    description,
  },
};

const steps = [
  [
    "1. Beslutet anges",
    "Du anger vilket beslut som ska överklagas och vilket ärende som helst bör vara vagt nog för att kräva ett nytt formulär.",
  ],
  [
    "2. Underlaget tas emot",
    "Överklagandet registreras, diarieförs och placeras i samma ordning som det beslut som redan hann bli färdigt.",
  ],
  [
    "3. Ny prövning följer",
    "Ärendet går vidare för prövning av det som redan prövats, nu med något annan rubrik och ungefär samma slutsatsrisk.",
  ],
] as const;

const relatedLinks = [
  { href: "/avslagsbrev", label: "Avslagsbrev" },
  { href: "/spora-ditt-arende", label: "Spåra ditt ärende" },
  { href: "/handlaggarkedja", label: "Handläggarkedja" },
  { href: "/fragor-och-svar", label: "Frågor och svar" },
  { href: "/om", label: "Om projektet" },
] as const;

export default function OverklagaBeslutPage() {
  return (
    <PageShell
      title="Överklaga beslut"
      intro="Här prövas samma beslut igen, med fler led, längre väntan och i praktiken samma risk för oförändrat resultat."
      eyebrow="Överklagande"
      showInstitutionNote={false}
    >
      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Så prövas samma sak igen</p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-ink/76">
          Ett överklagande kan lämnas, läsas och prövas igen. Det är formellt möjligt, praktiskt
          välbekant och i många fall samma beslut i ny kostym.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map(([stepTitle, body]) => (
            <article
              key={stepTitle}
              className="rounded-[1.35rem] border border-steel/15 bg-white/88 p-5"
            >
              <h2 className="text-balance font-display text-xl font-semibold tracking-tight text-ink">
                {stepTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink/76">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <OverklagaBeslutGenerator />

      <section className="grid gap-6 md:grid-cols-2">
        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Vem får överklaga?</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Den som fått beslutet, och helst läst det noggrant
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Överklagandet är öppet för den som fått ett beslut och fortfarande anser att samma
            ärende bör förstås en gång till. Den som inte fått beslutet kan i regel ändå ha åsikter,
            men de diarieförs senare.
          </p>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Hur ett överklagande inkommer</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Skriftligt, tydligt och med rätt sorts tålamod
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Överklagandet tas emot som text, formulär eller annan ordnad begäran. Muntliga
            invändningar kan noteras, men de brukar få vänta tills de hunnit bli skriftliga i
            efterhand.
          </p>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Kompletterande underlag</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Nya intyg, samma osäkerhet
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Om ytterligare handlingar finns kan de lämnas in. Det förbättrar inte nödvändigtvis
            utgången, men det ger ärendet mer papper att hålla sig till.
          </p>
        </article>

        <article className="institution-card p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Handläggningstid</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Längre än den första prövningen, men med samma möblering
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Tiden för handläggning beror på tillgången till led, läsning och samma uppdelning av
            ansvar som redan gjort ärendet långsamt från början. En ny genomgång får gärna ta sin
            tid. Det brukar den också göra.
          </p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-dossier border border-steel/20 bg-paper p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Prövning av tidigare prövning</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            När samma beslut läses om med ny hållning
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Det som prövas är inte bara innehållet utan också hur föregående prövning valde att
            beskriva det. Ärendet får därför röra sig tillbaka genom en redan upplyst korridor och
            hoppas på ett annorlunda slut genom bättre tonfall.
          </p>
        </article>

        <article className="rounded-dossier border border-steel/20 bg-paper p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Möjliga utfall</p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
            Ett ändrat beslut, ett förtydligat avslag eller ett svar som räknas som omtanke
          </h2>
          <ul className="mt-5 space-y-3 text-base leading-7 text-ink/76">
            <li>Beslutet ändras och det tidigare avslaget blir en formell missuppfattning.</li>
            <li>Beslutet står fast, men nu med tydligare rubrik och jämnare marginaler.</li>
            <li>Ärendet återförs för ytterligare komplettering, vilket också är ett slags utfall.</li>
          </ul>
        </article>
      </section>

      <section className="institution-card p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Slutpunkt</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          När ett beslut står fast trots ny förståelse
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Det händer när prövningen bekräftar att beslutet redan var förberett för att bestå.
          Då får du ett nytt besked om att det gamla beskedet fortfarande gäller, nu med mer
          formell förståelse för varför det låter som det gör.
        </p>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          När samma beslut vill ha sällskap
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Om du vill se hur överklagandet leder vidare finns här de närmaste funktionerna och
          förklaringsytorna.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {relatedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
