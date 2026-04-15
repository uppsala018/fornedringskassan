import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { PunchlineStrip } from "@/components/punchline-strip";

const title = "Frågor och svar | Förnedringskassan";
const description =
  "Svar på vanliga frågor om Förnedringskassan, det fiktiva satiriska projektet om myndighetsspråk, processer och vad sidan är eller inte är.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/fragor-och-svar",
  },
  openGraph: {
    title,
    description,
    url: "/fragor-och-svar",
  },
  twitter: {
    title,
    description,
  },
};

const faqs = [
  {
    question: "Vad är Förnedringskassan?",
    answer:
      "En fiktiv svensk myndighetsparodi. Den använder blanketter, processer och beslutsflöden för att driva med hur institutionsspråk kan låta när det talar för sig självt.",
  },
  {
    question: "Är detta Försäkringskassan?",
    answer:
      "Nej. Det är en satirisk webbplats med eget innehåll och egen ton. Namnlikheten är en del av poängen, inte ett släktskap.",
  },
  {
    question: "Är sidan kopplad till någon riktig myndighet?",
    answer:
      "Nej. Sidan är inte officiell och har ingen koppling till någon verklig myndighet, offentlig aktör eller beslutsfunktion.",
  },
  {
    question: "Vad menas med att detta är satir?",
    answer:
      "Att den driver med system, språk och arbetssätt genom att låta dem framstå som mer ordnade än de egentligen är.",
  },
  {
    question: "Vad riktar sig satiren mot?",
    answer:
      "Mot byråkratiskt språk, ansvarsförskjutning, överordnade processer och den sorts institutionell distans som gör människor till ärenden.",
  },
  {
    question: "Är detta juridisk eller medicinsk rådgivning?",
    answer:
      "Nej. Texten är satirisk och ska inte användas som grund för juridiska, medicinska eller andra verkliga beslut.",
  },
  {
    question: "Varför använder sidan ett namn som liknar Försäkringskassan?",
    answer:
      "För att spegla hur myndighetston kan kännas igen utan att vara densamma. Likheten är ett satiriskt grepp, inte en anspråkshandling.",
  },
  {
    question: "Vad menas med normalt förekommande arbeten här?",
    answer:
      "Det är en absurd jobbmatchningsvy där arbeten sorteras som om rimlighet vore ett administrativt filter med alldeles för stort självförtroende.",
  },
  {
    question: "Är innehållet påhittat?",
    answer:
      "Ja. Hela sajten är fiktiv, även när formuleringarna låter misstänkt bekanta.",
  },
  {
    question: "Kan innehållet delas?",
    answer:
      "Ja. Innehållet är avsett att kunna delas, kopieras och skickas vidare som ett stycke satirisk myndighetsprosa.",
  },
] as const;

export default function FAQPage() {
  return (
    <PageShell
      title="Frågor och svar"
      intro="Här svarar projektet på sig självt med samma lugn som resten av sajten."
      eyebrow="Vanliga frågor"
      showInstitutionNote={false}
    >
      <PunchlineStrip
        eyebrow="FAQ"
        punchline="Standardiserade svar på redan ordnade frågor"
      />

      <section className="institution-card p-6 sm:p-8">
        <p className="max-w-3xl text-base leading-8 text-ink/76">
          Den här sidan samlar korta svar om projektets fiktiva ram och den institutionella
          logik som håller ihop resten av sajten.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {faqs.map((item) => (
          <article key={item.question} className="institution-card p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Fråga</p>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
              {item.question}
            </h2>
            <p className="mt-4 text-base leading-8 text-ink/76">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Vidare hänvisning</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Se också de delar som förklarar sig bäst
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Om du vill se hur svaren växer fram i praktiken finns här de närmaste interna
          funktionerna och startsidan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/om"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Om projektet
          </Link>
          <Link
            href="/handlaggarkedja"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Handläggarkedja
          </Link>
          <Link
            href="/avslagsbrev"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Avslagsbrev
          </Link>
          <Link
            href="/friskforklaring"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Friskförklaring
          </Link>
          <Link
            href="/handlaggarnytt"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Handläggarnytt
          </Link>
          <Link
            href="/"
            className="rounded-full border border-steel/20 bg-white/90 px-4 py-2 text-sm text-ink transition hover:border-steel/45 hover:bg-white"
          >
            Till startsidan
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
