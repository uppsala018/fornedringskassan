"use client";

import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

import { PageShell } from "@/components/page-shell";
import { statusMicrocopy } from "@/lib/microcopy";

type AnswerValue = "ja" | "nej" | "otydligt";

type FormState = {
  lasaMening: AnswerValue;
  sms72h: AnswerValue;
  koppgrepp: AnswerValue;
  oroForsorjning: AnswerValue;
  restDigTrotsMotvilja: AnswerValue;
};

type Decision = {
  rubric: string;
  status: string;
  body: string;
  motivation: string;
  diaryNumber: string;
  reviewWindow: string;
};

const initialState: FormState = {
  lasaMening: "ja",
  sms72h: "otydligt",
  koppgrepp: "ja",
  oroForsorjning: "ja",
  restDigTrotsMotvilja: "ja",
};

const questions = [
  {
    key: "lasaMening",
    prompt: "Kan du läsa denna mening?",
    hint: "Läsförmåga betraktas i detta formulär som ett möjligt tecken på otillbörlig funktionalitet.",
  },
  {
    key: "sms72h",
    prompt: "Har du svarat på ett sms de senaste 72 timmarna?",
    hint: "Digital responsförmåga kan tolkas som latent arbetskapacitet eller social panik. Båda är administrativt användbara.",
  },
  {
    key: "koppgrepp",
    prompt: "Kan du hålla i en kopp?",
    hint: "Grepp om dryckeskärl är inte avgörande, men inger hos beslutsstödet en olämplig känsla av stabilitet.",
  },
  {
    key: "oroForsorjning",
    prompt: "Kan du uppleva oro inför din försörjning?",
    hint: "Ekonomisk oro räknas inte som hinder men dokumenteras gärna som personligt engagemang.",
  },
  {
    key: "restDigTrotsMotvilja",
    prompt: "Har du någon gång rest dig upp trots motvilja?",
    hint: "All vertikal ambition registreras som tänkbar tillgång för arbetslinjen.",
  },
] as const satisfies ReadonlyArray<{
  key: keyof FormState;
  prompt: string;
  hint: string;
}>;

const rubrics = [
  "Automatiskt preliminärt beslut om återställd duglighet",
  "Maskinellt ställningstagande rörande antagen arbetsförmåga",
  "Formellt meddelande om administrativt tillfrisknande",
];

const statuses = [
  "Bedöms tillgänglig för strukturerad återanvändning i arbetslivet.",
  "Anspråk på nedsatt förmåga lämnas utan fullt systemstöd.",
  "Du förefaller i tillräcklig mån fungera för vidare prövning mot verkligheten.",
];

const bodyFragments = [
  "Efter genomgång av dina svar, våra interna antaganden och ett datoriserat ögonbrynshöjande finner systemet att du uppvisar flera tecken på vardaglig användbarhet.",
  "Vid en samlad maskinell bedömning framstår din situation som för mänsklig för att enkelt passa i vår modell för varaktig oförmåga.",
  "Formuläret ger stöd för att du, trots egna invändningar, fortfarande kan uppträda med viss samhällelig funktion under ogynnsamma omständigheter.",
  "Då du visat spår av läsförmåga, kopphantering eller annan civiliserad aktivitet har den automatiska bedömningen försiktigt börjat hoppas på dig igen.",
];

const motivations = [
  "Det har särskilt beaktats att oro inför försörjning inte utesluter arbetsförmåga utan snarare visar att du förstått samhällskontraktets tonfall.",
  "Att du vid något tillfälle rest dig upp trots motvilja anses tala för en kvarvarande, om än ovälkommen, rörelse mot plikt.",
  "Särskild vikt har lagts vid att svar på sms kan utgöra förstadium till mötesbokning, vilket i sin tur närmar sig verksamhet.",
  "Förmåga att hålla i en kopp betraktas inte isolerat som avgörande, men sammantaget bidrar den till ett olyckligt intryck av sammanhållning.",
];

const reviewWindows = [
  "Omprövning kan begäras inom 14 dagar eller så snart du återfått tillräcklig energi för att bli missförstådd igen.",
  "Begäran om omprövning bör lämnas in skyndsamt, helst innan beslutets tonfall hunnit sätta sig permanent i kroppen.",
  "Omprövning medges inom skälig tid, definierad av oss som ett intervall mellan omgående och obestämt senare.",
];

function choiceLabel(value: AnswerValue) {
  if (value === "ja") return "Ja";
  if (value === "nej") return "Nej";
  return "Otydligt";
}

function randomItem(items: string[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildDecision(formState: FormState): Decision {
  const yesCount = Object.values(formState).filter((value) => value === "ja").length;
  const unclearCount = Object.values(formState).filter((value) => value === "otydligt").length;

  const severityNote =
    yesCount >= 4
      ? "Dina egna uppgifter ger sammantaget intryck av en person som beklagligt nog fortfarande kan orientera sig i tillvaron."
      : yesCount <= 1
        ? "Det begränsade antalet tydliga funktionsmarkörer har noterats, men systemet vill inte lova för mycket åt det mänskliga hållet."
        : "Underlaget är blandat, vilket passar vårt beslutsstöd utmärkt eftersom osäkerhet ofta kan omvandlas till slutsats.";

  const uncertaintyNote =
    unclearCount > 0
      ? "Flera svar har dessutom bedömts som otydliga, vilket i vår verksamhet inte hindrar beslut utan snarare förfinar dess abstraktionsnivå."
      : "Svarsmaterialet var ovanligt tydligt, vilket har hanterats med sedvanlig försiktighet och viss misstro.";

  return {
    rubric: randomItem(rubrics),
    status: randomItem(statuses),
    body: `${randomItem(bodyFragments)} ${severityNote} ${uncertaintyNote}`,
    motivation: randomItem(motivations),
    diaryNumber: `FRI-${Math.floor(1000 + Math.random() * 9000)}/${new Date().getFullYear()}`,
    reviewWindow: randomItem(reviewWindows),
  };
}

export function FriskforklaringAssessment() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [decision, setDecision] = useState<Decision | null>(null);
  const submittedAnswers = useMemo(
    () =>
      questions.map((question) => ({
        prompt: question.prompt,
        value: choiceLabel(formState[question.key]),
      })),
    [formState],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDecision(buildDecision(formState));
  }

  return (
    <PageShell
      title="Friskförklaring"
      intro="Automatisk bedömning av återhämtning och arbetsförmåga för dig som misstänker att systemet snart kommer att kalla din överlevnad för förbättrad funktion."
    >
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <form
          onSubmit={handleSubmit}
          className="bureaucratic-panel rise-fade overflow-hidden rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,243,236,0.94))] p-6 shadow-slip"
        >
          <div className="flex flex-col gap-3 border-b border-steel/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-stamp">
                Automatisk prövning
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
                Självskattning av misstänkt funktion
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-steel">
              Satirisk formulärmodul. Inga verkliga beslut fattas, även om tonen antyder
              annat.
            </p>
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-stamp/20 bg-stamp/10 p-4">
            <p className="text-sm leading-6 text-steel">{statusMicrocopy.helperDecision}</p>
          </div>

          <div className="mt-6 space-y-5">
            {questions.map((question, index) => (
              <fieldset
                key={question.key}
                className="rounded-[1.35rem] border border-steel/15 bg-white/80 p-5 transition hover:border-steel/30"
              >
                <legend className="px-1 text-sm uppercase tracking-[0.28em] text-steel">
                  Fråga {index + 1}
                </legend>
                <p className="mt-3 text-lg font-medium leading-7 text-ink">
                  {question.prompt}
                </p>
                <p className="mt-2 text-sm leading-6 text-steel">{question.hint}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {(["ja", "nej", "otydligt"] as const).map((value) => {
                    const checked = formState[question.key] === value;

                    return (
                      <label
                        key={value}
                        className={[
                          "flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition",
                          checked
                            ? "border-ink bg-ink text-paper shadow-slip"
                            : "border-steel/20 bg-paper/80 text-ink hover:border-steel/45 hover:bg-white",
                        ].join(" ")}
                      >
                        <span>{choiceLabel(value)}</span>
                        <input
                          type="radio"
                          name={question.key}
                          value={value}
                          checked={checked}
                          onChange={() =>
                            setFormState((current) => ({
                              ...current,
                              [question.key]: value,
                            }))
                          }
                          className="sr-only"
                        />
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex flex-col items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
            >
              <span>Fatta automatiskt beslut</span>
              <span className="text-xs font-normal text-paper/70">
                Intern omtolkning pågår
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFormState(initialState);
                setDecision(null);
              }}
              className="inline-flex flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
            >
              <span>Rensa egen uppfattning</span>
              <span className="text-xs font-normal text-steel">
                Underlaget återställs till administrativ nollpunkt
              </span>
            </button>
          </div>
        </form>

        <aside className="bureaucratic-panel rise-fade rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(240,235,228,0.92),rgba(250,248,244,0.92))] p-6 shadow-slip">
          <p className="text-xs uppercase tracking-[0.3em] text-steel">Tolkningsstöd</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
            Så här misstolkar vi underlaget
          </h2>
          <ul className="mt-5 space-y-4 text-base leading-7 text-steel">
            <li>Läsförmåga kan uppfattas som förstadium till e-posthantering.</li>
            <li>
              Oro inför försörjning räknas inte som belastning, snarare som motivation med
              mörka ringar under ögonen.
            </li>
            <li>
              Förmåga att hålla i kopp anses inte avgörande, men inger stabilitetsvibbar som
              beslutsstödet finner provocerande lovande.
            </li>
            <li>
              Alla otydliga svar kan vid behov omvandlas till tydliga slutsatser av
              administrativ art.
            </li>
          </ul>
          <div className="mt-6 rounded-[1.35rem] border border-steel/15 bg-white/80 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-steel">Statusrad</p>
            <p className="mt-3 text-sm leading-7 text-steel">
              Verklighet konverteras till underlag. Tydlighet sorteras efter administrativ
              användbarhet.
            </p>
          </div>
        </aside>
      </section>

      {decision ? (
        <section className="bureaucratic-panel rise-fade overflow-hidden rounded-dossier border border-steel/20 bg-white/92 shadow-docket">
          <div className="border-b border-steel/20 bg-gradient-to-r from-ink to-seal px-6 py-5 text-paper sm:px-8">
            <p className="text-xs uppercase tracking-[0.34em] text-paper/65">
              Beslutshandling
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  {decision.rubric}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-paper/75">
                  Fiktivt beslutsmeddelande i satirisk form. Inte ett riktigt intyg, trots
                  dokumenterad självsäkerhet.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm">
                <p>Diarienummer: {decision.diaryNumber}</p>
                <p>Beslutsdatum: {new Date().toLocaleDateString("sv-SE")}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
            <article>
              <p className="text-xs uppercase tracking-[0.28em] text-steel">
                Formellt ställningstagande
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                {decision.status}
              </h3>
              <p className="mt-5 text-base leading-8 text-steel">{decision.body}</p>

              <div className="mt-6 rounded-[1.35rem] border border-stamp/20 bg-stamp/10 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-steel">
                  Särskild motivering
                </p>
                <p className="mt-3 text-base leading-8 text-ink">{decision.motivation}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setDecision(buildDecision(formState))}
                  className="inline-flex flex-col items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
                >
                  <span>Begär omprövning</span>
                  <span className="text-xs font-normal text-paper/70">
                    Ett oväntat förtydligande har inträffat
                  </span>
                </button>
                <Link
                  href="/normalt-forekommande-arbeten"
                  className="inline-flex flex-col items-center justify-center rounded-full border border-steel/25 bg-white px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-paper"
                >
                  <span>Se normalt förekommande arbeten</span>
                  <span className="text-xs font-normal text-steel">
                    Ärendet överförs till Arbetsförnedringen
                  </span>
                </Link>
                <Link
                  href="/nadalage"
                  className="inline-flex flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
                >
                  <span>Aktivera nådeläge</span>
                  <span className="text-xs font-normal text-steel">
                    Tillfällig mänsklighet initieras
                  </span>
                </Link>
              </div>
            </article>

            <aside className="rounded-[1.5rem] border border-steel/15 bg-paper/90 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-steel">
                Sammanfattning av underlag
              </p>
              <dl className="mt-4 space-y-4">
                {submittedAnswers.map((answer) => (
                  <div
                    key={answer.prompt}
                    className="rounded-2xl border border-steel/15 bg-white/80 p-4"
                  >
                    <dt className="text-sm leading-6 text-steel">{answer.prompt}</dt>
                    <dd className="mt-2 text-base font-medium text-ink">{answer.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-7 text-steel">{decision.reviewWindow}</p>
            </aside>
          </div>
        </section>
      ) : (
        <section className="rise-fade rounded-dossier border border-dashed border-steel/25 bg-paper/80 p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-steel">Tomt beslutsläge</p>
          <p className="mt-3 text-base leading-7 text-steel">
            {statusMicrocopy.emptyDecision}
          </p>
        </section>
      )}
    </PageShell>
  );
}
