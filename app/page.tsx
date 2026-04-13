import type { Metadata } from "next";
import Link from "next/link";

import { LogoMark } from "@/components/logo-mark";

const title = "Förnedringskassan";
const description =
  "En fiktiv institution för beslut, avslag, handläggarkedjor och annan välpolerad administrativ nedkylning.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
  },
  twitter: {
    title,
    description,
  },
};

const mainActions = [
  {
    href: "/friskforklaring",
    label: "Bli friskförklarad",
    tone: "Primär prövning",
    sublabel: "Verklighet konverteras till underlag",
  },
  {
    href: "/avslagsbrev",
    label: "Skapa avslagsbrev",
    tone: "Standardiserat avslag",
    sublabel: "Underlag avpersonifieras enligt rutin",
  },
  {
    href: "/handlaggarkedja",
    label: "Möt nästa handläggare",
    tone: "Intern vidarekoppling",
    sublabel: "Handläggarkedjan uppdateras",
  },
  {
    href: "/nadalage",
    label: "Aktivera nådeläge",
    tone: "Tillfälligt undantag",
    sublabel: "Ett oväntat förtydligande kan inträffa",
  },
];

const featureCards = [
  {
    href: "/friskforklaring",
    index: "01",
    title: "Friskförklaring under ordnade former",
    body:
      "För dig som råkat återhämta dig utan föregående samråd och nu behöver ett beslut som återställer den administrativa ordningen.",
  },
  {
    href: "/avslagsbrev",
    index: "02",
    title: "Avslagsbrev med korrekt myndig tyngd",
    body:
      "Generera ett nej som känns noggrant diariefört, omsorgsfullt formulerat och fullständigt omöjligt att invända mot.",
  },
  {
    href: "/handlaggarkedja",
    index: "03",
    title: "Handläggarkedja i realtid",
    body:
      "Se hur ditt ärende vandrar mellan enheter, semestertabeller och välmenande ansvarsförskjutning.",
  },
  {
    href: "/nadalage",
    index: "04",
    title: "Nådeläge vid administrativ nedisning",
    body:
      "När processen blivit för effektiv i sin känslokyla kan du begära ett kort undantag från den ordinarie tonaliteten.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-3 py-8 sm:px-6 lg:px-8 lg:py-14">
      <section className="bureaucratic-panel overflow-hidden rounded-dossier border border-steel/20 bg-white/84 shadow-docket">
        <div className="border-b border-steel/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(246,243,236,0.92))] px-5 py-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.34em] text-stamp">
            Satirisk parodi. Inte en myndighet. Inte Försäkringskassan.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-steel">
            Förnedringskassan är ett fiktivt serviceorgan för dig som behöver ett beslut,
            ett avslag eller en ny handläggare innan hoppet hinner återhämta sig.
          </p>
        </div>

        <div className="grid gap-8 px-5 py-7 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-steel">
              Central enhet för formellt missmod
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
              Vi prövar din mänskliga rimlighet enligt intern rutin FÖRN-01.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">
              Tonen är torr, processen är hövlig och utfallet är nästan alltid administrativt
              beklagligt. Hela idén är att kännas byråkratisk utan att likna någon verklig
              myndighet.
            </p>

            <div className="mt-6 rounded-[1.35rem] border border-stamp/20 bg-stamp/10 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-stamp">
                Satirisk disclaimer
              </p>
              <p className="mt-3 text-sm leading-7 text-ink">
                Detta är en parodi och samhällskommentar. Ingen del är officiell, ingen del
                är juridisk eller medicinsk rådgivning, och inget här ska förväxlas med en
                verklig myndighet eller dess varumärke.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {mainActions.map((action, index) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={[
                    "rounded-[1.45rem] border px-5 py-4 min-h-24 transition shadow-slip",
                    index === 0
                      ? "border-ink bg-ink text-paper hover:bg-seal"
                      : "border-steel/20 bg-paper/90 text-ink hover:border-steel/45 hover:bg-white",
                  ].join(" ")}
                >
                  <span className="block text-xs uppercase tracking-[0.28em] opacity-70">
                    {action.tone}
                  </span>
                  <span className="mt-2 block text-base font-semibold">{action.label}</span>
                  <span className="mt-2 block text-sm opacity-70">{action.sublabel}</span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-dossier border border-dashed border-steel/25 bg-paper/95 p-6">
            <div className="grid min-h-72 place-items-center rounded-[1.5rem] border border-steel/15 bg-ledger bg-[size:24px_24px] bg-center p-5 sm:p-6">
              <div className="w-full max-w-sm rounded-[1.5rem] border border-stamp/30 bg-white/92 p-5 sm:p-6 shadow-slip">
                <LogoMark className="items-start" />
                <p className="mt-5 text-sm leading-7 text-ink">
                  Ett påhittat märke med formulärblad, stämpelsigil och torr
                  självuppfattning. Avsiktligt byråkratiskt, men inte lånat från någon
                  verklig institution.
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-steel/15 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-steel">
                Visuell riktlinje
              </p>
              <p className="mt-2 text-sm leading-7 text-steel">
                Klinisk beige, pappersgrått och en dämpad stämpelton. Tillräckligt sterilt
                för att kännas byråkratiskt, men tillräckligt egenartat för att inte kunna
                misstas för en offentlig identitet.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-steel">Huvudfunktioner</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
              Verktyg för den som vill bli professionellt ifrågasatt
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-steel">
            Välj rätt kanal för ditt missöde. Samtliga tjänster är framtagna med samma
            respekt för individen som ett korrekt diariefört missförstånd.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
            className="bureaucratic-panel institution-card p-6 min-h-56 transition hover:-translate-y-0.5 hover:border-steel/40 hover:bg-white"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-steel">
                Verktyg {card.index}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-steel">{card.body}</p>
              <span className="mt-6 inline-flex text-sm font-medium text-stamp">
                Öppna tjänst
              </span>
              <span className="mt-2 block text-xs uppercase tracking-[0.24em] text-steel">
                Intern omtolkning pågår
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <article className="bureaucratic-panel overflow-hidden rounded-dossier border border-steel/20 bg-ink p-8 text-paper shadow-docket">
          <p className="text-xs uppercase tracking-[0.3em] text-paper/60">Nådeläge</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            När regelverket skaver erbjuder vi ett kort avbrott i den mekaniska värdigheten.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-paper/82">
            I vanliga fall uttrycker vi oss i fasta formuleringar, med tydlig distans och
            välkontrollerad beklagan. I nådeläge byter vi till ett språk som antyder att du
            är en människa med omständigheter, inte bara ett ärende som kom in fel vecka.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-white/12 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-paper/55">
              Språklig kontrast
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-paper/50">
                  Ordinarie ton
                </p>
                <p className="mt-3 text-sm leading-7 text-paper/78">
                  Din upplevelse har noterats men saknar för närvarande bäring på beslutets
                  utfall.
                </p>
              </div>
              <div className="rounded-2xl border border-ledger/20 bg-ledger/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-paper/50">Nådeläge</p>
                <p className="mt-3 text-sm leading-7 text-paper/92">
                  Det låter tungt. Vi ska åtminstone försöka svara som om du faktiskt
                  behöver ett svar.
                </p>
              </div>
            </div>
          </div>
        </article>

        <aside className="bureaucratic-panel institution-card p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-steel">
            Meddelande till besökare
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
            Allt här är påhittat. Känslan är däremot obehagligt bekant.
          </h2>
          <p className="mt-5 text-base leading-8 text-steel">
            Den här sidan är en satirisk parodi på byråkrati, handläggarspråk och fördröjd
            välvilja. Ingen del är officiell, och ingen verklig myndighet står bakom
            innehållet, även om formuleringarna stundvis låter som att någon med pärm har
            granskat dem.
          </p>
          <Link
            href="/om"
            className="mt-8 inline-flex rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
          >
            Läs mer om projektet
          </Link>
        </aside>
      </section>
    </div>
  );
}
