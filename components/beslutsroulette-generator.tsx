"use client";

import { useMemo, useState } from "react";

type MatterType = "beslut" | "omprovning" | "komplettering" | "ovrigt";
type SupportState = "ja" | "nej" | "osakert";
type DecisionKind = "avslag" | "omprovning" | "komplettering" | "uppskjuten" | "kvarstar";

type FormState = {
  matter: string;
  matterType: MatterType;
  support: SupportState;
};

type GeneratedDecision = {
  diaryNumber: string;
  heading: string;
  lead: string;
  decision: string;
  closing: string;
  timeline: string[];
  nextStep: string;
  copyText: string;
};

const initialState: FormState = {
  matter: "",
  matterType: "beslut",
  support: "ja",
};

const matterOptions: Array<{ value: MatterType; label: string }> = [
  { value: "beslut", label: "Beslut" },
  { value: "omprovning", label: "Omprövning" },
  { value: "komplettering", label: "Komplettering" },
  { value: "ovrigt", label: "Övrigt" },
];

const supportOptions: Array<{ value: SupportState; label: string }> = [
  { value: "ja", label: "Ja" },
  { value: "nej", label: "Nej" },
  { value: "osakert", label: "Osäkert" },
];

const kindPools: Record<SupportState, DecisionKind[]> = {
  ja: ["omprovning", "kvarstar", "uppskjuten", "komplettering", "avslag"],
  nej: ["avslag", "uppskjuten", "komplettering", "kvarstar", "omprovning"],
  osakert: ["uppskjuten", "kvarstar", "omprovning", "komplettering", "avslag"],
};

const matterOffsets: Record<MatterType, number> = {
  beslut: 0,
  omprovning: 2,
  komplettering: 4,
  ovrigt: 6,
};

const decisionCatalog: Record<
  DecisionKind,
  {
    heading: string;
    leads: string[];
    decisions: string[];
    closings: string[];
    timelines: string[][];
    nextSteps: string[];
  }
> = {
  avslag: {
    heading: "Avslag i nuvarande ordning",
    leads: [
      "Ärendet har mottagits och prövats i den ordning som redan står till buds.",
      "Det som anförts har lästs och förts till samma slutsats som tidigare.",
      "Underlaget har genomgått sedvanlig genomgång utan att den fasta riktningen rubbats.",
    ],
    decisions: [
      "Det tidigare beslutet står därför fast.",
      "Beslutet lämnas oförändrat.",
      "Utfallet blir detsamma som före förfrågan.",
    ],
    closings: [
      "Detta utgör det aktuella läget tills vidare.",
      "Ärendet betraktas därmed som fortsatt avgjort.",
      "Formuleringen är uppdaterad; sakläget är detsamma.",
    ],
    timelines: [
      [
        "Ärendet har mottagits i registraturen",
        "Ärendet har diarieförts och placerats i ordnad väntan",
        "Ärendet har lästs i sammanhållen ordning",
      ],
      [
        "Ärendet har förts vidare till intern läsning",
        "Ärendet har återförts för ny inledande bedömning",
        "Ärendet har registrerats och knutits till tidigare beslut",
      ],
    ],
    nextSteps: [
      "Nästa förväntade icke-steg är ytterligare läsning av redan läst material.",
      "Nästa förväntade icke-steg är intern vidarefördelning utan ändrad riktning.",
      "Nästa förväntade icke-steg är att beslutet återkommer i ny rubrik.",
    ],
  },
  omprovning: {
    heading: "Omprövning utan ändring",
    leads: [
      "Ärendet har omprövats i sin helhet och lästs om med fortsatt formell omsorg.",
      "Nya uppgifter har beaktats inom ramen för redan fastställd bedömning.",
      "Omprövningen har genomförts utan att riktningen i sak behövt justeras.",
    ],
    decisions: [
      "Den tidigare bedömningen kvarstår.",
      "Beslutet kvarstår efter förnyad läsning.",
      "Samma beslut gäller alltjämt.",
    ],
    closings: [
      "Den språkliga precisionen har förbättrats; utgången har inte gjort det.",
      "Ärendet har fått en tydligare rubrik men samma slutsats.",
      "Prövningen är avslutad i ordnad form och med oförändrad riktning.",
    ],
    timelines: [
      [
        "Ärendet har återförts för ny inledande bedömning",
        "Ärendet har överlämnats till annan funktion",
        "Ärendet har lästs om i justerad ordning",
      ],
      [
        "Ärendet har registrerats och placerats i ordnad väntan",
        "Ärendet har förts vidare till intern läsning",
        "Ärendet inväntar tidigare underlag",
      ],
    ],
    nextSteps: [
      "Nästa förväntade icke-steg är en ny genomgång av samma underlag.",
      "Nästa förväntade icke-steg är fortsatt läsning med uppdaterad rubrik.",
      "Nästa förväntade icke-steg är att tidigare bedömning upprepas i ny form.",
    ],
  },
  komplettering: {
    heading: "Återföring för komplettering",
    leads: [
      "Underlaget bedöms som mottaget men ännu inte tillräckligt avslutande.",
      "Ärendet återförs för komplettering innan fortsatt sakprövning kan fortsätta.",
      "Det som saknas har noterats som väntat och därför blivit ytterligare ett led.",
    ],
    decisions: [
      "Ärendet återförs för komplettering.",
      "Ytterligare handlingar begärs in innan saken anses redo för ny läsning.",
      "Bedömningen pausas tills kompletterande material kan registreras.",
    ],
    closings: [
      "Detta är inte ett avbrott, endast en ny ordnad väntan.",
      "Formuleringen förtydligar processen utan att avsluta den.",
      "Den administrativa rörelsen fortsätter i samma riktning som väntan.",
    ],
    timelines: [
      [
        "Ärendet inväntar kompletterande underlag",
        "Ärendet har diarieförts och placerats i ordnad väntan",
        "Ärendet har förts vidare till intern läsning",
      ],
      [
        "Ärendet har överlämnats till annan funktion",
        "Ärendet har återförts för ny inledande bedömning",
        "Ärendet har mottagits i registraturen",
      ],
    ],
    nextSteps: [
      "Nästa förväntade icke-steg är att kompletteringen begärs i mer formell ordning.",
      "Nästa förväntade icke-steg är att underlaget noteras och väntar på ytterligare underlag.",
      "Nästa förväntade icke-steg är fortsatt läsning av det som ännu saknas.",
    ],
  },
  uppskjuten: {
    heading: "Uppskjuten bedömning",
    leads: [
      "Bedömningen skjuts upp i väntan på ytterligare läsning.",
      "Ärendet har registrerats men anses ännu inte moget för klarhet.",
      "Systemet har valt att bevara rörelsen utan att förbruka slutsatsen för tidigt.",
    ],
    decisions: [
      "Ärendet förblir aktivt under väntan.",
      "Bedömningen ställs tills vidare i viloläge.",
      "Det fortsatta beslutet får vänta på en ny ordning av samma material.",
    ],
    closings: [
      "Detta är inte stillastående, endast stilla fördröjning.",
      "Nuvarande läge lämnar utrymme för fortsatt väntan i formell ton.",
      "Ärendet har inte avslutats, bara fördelats över mer tid.",
    ],
    timelines: [
      [
        "Ärendet har mottagits i huvudflödet",
        "Ärendet har lagts tillfälligt åt sidan i avvaktan på led",
        "Ärendet har förts vidare till intern läsning",
      ],
      [
        "Ärendet har registrerats och placerats i ordnad väntan",
        "Ärendet inväntar tidigare underlag",
        "Ärendet har återförts för förnyad inledande bedömning",
      ],
    ],
    nextSteps: [
      "Nästa förväntade icke-steg är fortsatt väntan med uppdaterad rubrik.",
      "Nästa förväntade icke-steg är en ny läsning som ännu inte behöver bli tydlig.",
      "Nästa förväntade icke-steg är intern vidarefördelning när led blir tillgängligt.",
    ],
  },
  kvarstar: {
    heading: "Beslut kvarstår i ny formulering",
    leads: [
      "Beslutet kvarstår efter ny läsning och justerad formulering.",
      "Den språkliga ytan har förtydligats; sakläget har inte förändrats.",
      "Ärendet har tagits igenom på nytt och landat i samma riktning med bättre marginaler.",
    ],
    decisions: [
      "Det tidigare beslutet står kvar.",
      "Utfallet är detsamma, nu i något mer ordnad form.",
      "Beslutet ligger fast men har fått en ny och jämnare formulering.",
    ],
    closings: [
      "Det praktiska resultatet är oförändrat.",
      "Omprövningen har främst förfinat ordningen kring samma svar.",
      "Den nya formuleringen förändrar inte sakens riktning.",
    ],
    timelines: [
      [
        "Ärendet har registrerats och knutits till tidigare beslut",
        "Ärendet har lästs om med justerad rubrik",
        "Ärendet har förts vidare till intern läsning",
      ],
      [
        "Ärendet har återförts för ny inledande bedömning",
        "Ärendet har mottagits i registraturen",
        "Ärendet har diarieförts och placerats i ordnad väntan",
      ],
    ],
    nextSteps: [
      "Nästa förväntade icke-steg är att beslutet återkommer i samma riktning men med ny rubrik.",
      "Nästa förväntade icke-steg är ytterligare förtydligande utan ändrat resultat.",
      "Nästa förväntade icke-steg är ny läsning av redan preciserad ståndpunkt.",
    ],
  },
};

function seedFromString(value: string) {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pick<T>(items: readonly T[], seed: number) {
  return items[seed % items.length];
}

function buildDecision(formState: FormState): GeneratedDecision {
  const matter = formState.matter.trim() || "OKÄND";
  const normalized = matter.toUpperCase();
  const seed = seedFromString([normalized, formState.matterType, formState.support].join("|"));
  const drift = Math.floor(Math.random() * 19);
  const choice = pick(kindPools[formState.support], seed + drift + matterOffsets[formState.matterType]);
  const catalog = decisionCatalog[choice];
  const heading = catalog.heading;
  const lead = pick(catalog.leads, seed + drift + 1);
  const decision = pick(catalog.decisions, seed + drift + 3);
  const closing = pick(catalog.closings, seed + drift + 5);
  const timeline = pick(catalog.timelines, seed + drift).slice(0, 3);
  const nextStep = pick(catalog.nextSteps, seed + drift + 7);
  const diaryNumber = `BR-${String((seed % 9000) + 1000).padStart(4, "0")}/${new Date().getFullYear()}`;

  return {
    diaryNumber,
    heading,
    lead: `${lead} Ärendet gäller: ${matter}.`,
    decision,
    closing,
    timeline,
    nextStep,
    copyText: [
      `${heading}`,
      `Diarienummer: ${diaryNumber}`,
      "",
      lead,
      `${decision}`,
      `${closing}`,
      "",
      "Intern rörelse:",
      ...timeline.map((item) => `- ${item}`),
      "",
      nextStep,
    ].join("\n"),
  };
}

export function BeslutsrouletteGenerator() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [decision, setDecision] = useState<GeneratedDecision | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera beslut");

  const summary = useMemo(
    () => [
      ["Ärende", formState.matter || "Inte angivet"],
      ["Ärendetyp", matterOptions.find((option) => option.value === formState.matterType)?.label ?? "Beslut"],
      [
        "Kompletterande material",
        supportOptions.find((option) => option.value === formState.support)?.label ?? "Ja",
      ],
    ],
    [formState],
  );

  function generate() {
    setDecision(buildDecision(formState));
    setCopyLabel("Kopiera beslut");
  }

  async function copyDecision() {
    if (!decision) return;

    await navigator.clipboard.writeText(decision.copyText);
    setCopyLabel("Kopierat");
  }

  return (
    <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Beslutsmotor</p>
      <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
        Generera ett beslut som låter färdigt innan det förstås
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
        Ange vad ärendet gäller, markera om underlag finns och låt systemet meddela ett beslut som
        ser formellt ut även när innehållet är absurt förutsägbart.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            generate();
          }}
          className="space-y-4"
        >
          <label className="grid gap-2">
            <span className="text-sm font-medium text-ink">Vad gäller ärendet?</span>
            <input
              value={formState.matter}
              onChange={(event) =>
                setFormState((current) => ({ ...current, matter: event.target.value }))
              }
              className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              placeholder="Till exempel: förlängd handläggning, avslag på ersättning eller återkrav"
            />
            <span className="text-xs leading-6 text-ink/68">
              Exempel: förlängd handläggning, avslag på ersättning eller återkrav.
            </span>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Ärendetyp</span>
              <select
                value={formState.matterType}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    matterType: event.target.value as MatterType,
                  }))
                }
                className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              >
                {matterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Finns kompletterande material?</span>
              <select
                value={formState.support}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    support: event.target.value as SupportState,
                  }))
                }
                className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              >
                {supportOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
            >
              Generera beslut
            </button>
            <button
              type="button"
              onClick={() => {
                setFormState(initialState);
                setDecision(null);
                setCopyLabel("Kopiera beslut");
              }}
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
            >
              Rensa formulär
            </button>
          </div>
        </form>

        <aside className="rounded-[1.5rem] border border-steel/20 bg-paper/92 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Uppgifter i ärendet</p>
          <dl className="mt-4 space-y-3">
            {summary.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-steel/15 bg-white/88 p-4">
                <dt className="text-sm leading-6 text-ink/72">{label}</dt>
                <dd className="mt-2 text-sm font-medium leading-6 text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-steel/20 bg-white/90 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Genererat beslut</p>
            <p className="mt-2 text-sm leading-7 text-ink/76">
              Omprövning genomförd utan att sakläget behövde förklaras närmare
            </p>
          </div>
          <span className="rounded-full border border-steel/20 bg-paper px-4 py-2 text-sm text-ink">
            {decision ? decision.diaryNumber : "Diarienummer skapas vid generering"}
          </span>
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-steel/15 bg-paper p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
            {decision ? decision.heading : "Beslut kommer att visas här"}
          </p>
          <p className="mt-4 text-base leading-8 text-ink/76">
            {decision ? decision.lead : "Formellt beslut väntar på uppgifter om ärendet."}
          </p>
          <p className="mt-4 text-base leading-8 text-ink">
            {decision
              ? `${decision.decision} ${decision.closing}`
              : "Beslutet står tills vidare i vänteläge, i avvaktan på att routern ska ange en riktning som redan känns bekant."}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {(decision
              ? decision.timeline
              : [
                  "Ärendet har mottagits i registraturen",
                  "Ärendet har diarieförts och placerats i ordnad väntan",
                  "Ärendet har lästs i sammanhållen ordning",
                ]
            ).map((item, index) => (
              <div key={`${item}-${index}`} className="rounded-2xl border border-steel/15 bg-white/88 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-ink/68">
                  Intern rörelse {index + 1}
                </p>
                <p className="mt-2 text-sm leading-7 text-ink">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-ink/76">
            {decision
              ? decision.nextStep
              : "Nästa förväntade icke-steg visas när ett ärende har matats in och förts genom systemet."}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={generate}
            className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
          >
            Generera på nytt
          </button>
          <button
            type="button"
            onClick={copyDecision}
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
          >
            {copyLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
