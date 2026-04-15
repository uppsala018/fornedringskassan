"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tone = "neutral" | "sakligt-hoppfull" | "institutionellt-uppmuntrande";

type FormState = {
  weakIn: string;
  limitations: string;
  sometimesWorks: string;
  observedCapacity: string;
  restFrequency: string;
  declineClarity: string;
  tone: Tone;
};

type GeneratedAssessment = {
  referenceNumber: string;
  generatedOn: string;
  toneLabel: string;
  bedomningsunderlag: string;
  observeradFormaga: string[];
  begransningar: string[];
  currentOrder: string;
  normallyPossible: string[];
  summary: string;
  copyText: string;
};

const toneOptions: Array<{ value: Tone; label: string }> = [
  { value: "neutral", label: "Neutral" },
  { value: "sakligt-hoppfull", label: "Sakligt hoppfull" },
  { value: "institutionellt-uppmuntrande", label: "Institutionellt uppmuntrande" },
];

const initialState: FormState = {
  weakIn: "",
  limitations: "",
  sometimesWorks: "",
  observedCapacity: "",
  restFrequency: "",
  declineClarity: "",
  tone: "neutral",
};

function cleanText(value: string, fallback = "") {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed || fallback;
}

function seedFromString(value: string) {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pick<T>(items: readonly T[], seed: number) {
  return items[seed % items.length];
}

function toneLabel(value: Tone) {
  return toneOptions.find((option) => option.value === value)?.label ?? "Neutral";
}

function formatSwedishDate(date: Date) {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function buildAssessment(formState: FormState): GeneratedAssessment {
  const weakIn = cleanText(formState.weakIn, "orkar inte längre i högt tempo och otydliga övergångar");
  const limitations = cleanText(
    formState.limitations,
    "trötthet, smärta, hjärndimma och behov av tät återhämtning",
  );
  const sometimesWorks = cleanText(formState.sometimesWorks, "korta, förutsägbara moment under låg belastning");
  const observedCapacity = cleanText(
    formState.observedCapacity,
    "förmåga att hålla ihop tydligt avgränsade uppgifter under lugna förutsättningar",
  );
  const restFrequency = cleanText(formState.restFrequency, "behöver vila flera gånger per dag");
  const declineClarity = cleanText(formState.declineClarity, "försämringen är tydlig och har vuxit över tid");
  const seed = seedFromString(
    [weakIn, limitations, sometimesWorks, observedCapacity, restFrequency, declineClarity, formState.tone].join("|"),
  );
  const year = new Date().getFullYear();
  const referenceNumber = `AFB-${String(2000 + (seed % 7000)).padStart(4, "0")}/${year}`;
  const generatedOn = formatSwedishDate(new Date());
  const selectedTone = toneLabel(formState.tone);

  const introByTone: Record<Tone, string[]> = {
    neutral: [
      "Den samlade bilden visar att det fortfarande finns vissa iakttagbara funktioner, men under villkor som kräver låg belastning och tydlig ordning.",
      "Underlaget pekar på en kvarvarande men begränsad förmåga som främst framträder när arbetsmomenten hålls korta och förutsägbara.",
      "Bedömningen utgår från att förmåga fortfarande kan observeras, men bara i en form som snabbt tappar hållbarhet utan återhämtning.",
    ],
    "sakligt-hoppfull": [
      "Det finns fortfarande en försiktigt iakttagbar förmåga, särskilt där uppgifterna är tydliga och omgivningen inte kräver mer än kroppen rimligen lämnar ifrån sig.",
      "Underlaget ger stöd för att viss arbetsförmåga fortfarande kan observeras när tempot är lågt och anpassningen faktisk.",
      "Trots tydliga begränsningar framträder en kvarvarande funktion som kan tas till vara i mycket avgränsade former.",
    ],
    "institutionellt-uppmuntrande": [
      "Den institutionella läsningen talar för att kvarvarande förmåga fortfarande kan anses tillräcklig för vissa former av ordnad insats.",
      "Det finns skäl att beskriva situationen som fortsatt möjlig att bearbeta inom en ram där anpassning, vila och förutsägbarhet räknas som bärande delar.",
      "Även om belastningen är påtaglig kvarstår en kapacitet som med rätt tonfall kan framstå som användbar.",
    ],
  };

  const capacityPool = [
    `Möjligheten att fullfölja ${sometimesWorks} under korta pass och med tydliga avslut.`,
    `Förmågan att hålla ihop ${observedCapacity} när förväntningarna inte växlar för snabbt.`,
    `Iakttagbar arbetsförmåga i miljöer som ger utrymme för lugn rytm, liten simultan belastning och planerad återhämtning.`,
    `Förmåga att bidra i avgränsade delar av ett uppdrag så länge övergångarna får ske utan press.`,
  ];

  const limitationPool = [
    `Påverkas av ${limitations}.`,
    `Det som orkar mest riskerar att falla bort när ${weakIn} möter högre krav än väntat.`,
    `Behöver tydliga vilopunkter eftersom ${restFrequency}.`,
    `Försämringen över tid beskrivs som ${declineClarity}.`,
  ];

  const currentOrderPool = [
    `Arbetsförmåga i nuvarande ordning bedöms kunna kvarstå i små, ordnade delar och främst där belastningen går att styra.`,
    `Nuvarande ordning tillåter viss insats, men bara när kraven ligger under den nivå där trötthet och begränsning tar över dokumentet.`,
    `I nuvarande ordning framträder arbetsförmåga främst som ett restvärde som blir tydligt först när tempot sänks och återhämtning planeras.`,
  ];

  const possibilityPool = [
    `Normalt förekommande möjligheter kan fortfarande övervägas i ${sometimesWorks}, men endast om de delas upp i tydliga steg.`,
    `Det som normalt förekommer blir möjligt främst i arbeten med låg samtidig belastning, tydlig struktur och återkommande pauser.`,
    `Möjligheterna begränsas till sådant som kan utföras i korta, förberedda moment där varje övergång redan är förklarad.`,
    `Förutsättningarna pekar mot enklare uppgifter som inte kräver lång uthållighet eller växlande tempo.`,
  ];

  const summaryByTone: Record<Tone, string[]> = {
    neutral: [
      `Den sammantagna bedömningen är att det finns kvarvarande arbetsförmåga, men endast i en ordning där ${restFrequency} och där uppgifterna hålls avgränsade.`,
      `Underlaget ger stöd för att viss arbetsförmåga kan anses föreligga, om kraven anpassas till de begränsningar som redan är tydligt beskrivna.`,
    ],
    "sakligt-hoppfull": [
      `Den samlade bilden är att ${observedCapacity} fortfarande kan tas till vara, förutsatt att arbetet läggs upp med låg belastning och tydlig struktur.`,
      `Bedömningen lämnar utrymme för fortsatt arbetsförmåga i nuvarande ordning, men bara inom ramar där återhämtning och anpassning är reella delar av upplägget.`,
    ],
    "institutionellt-uppmuntrande": [
      `Den institutionella slutsatsen är att kvarvarande arbetsförmåga fortsatt bör kunna användas, förutsatt att sammanhanget utformas efter det som faktiskt orkas.`,
      `Det finns tillräckligt med iakttagbar funktion för att en fortsatt arbetsförmåga ska kunna beskrivas i ordnade och uppmuntrande termer, om än med tydliga begränsningar.`,
    ],
  };

  const bedomningsunderlag = `${weakIn}. ${limitations}. ${restFrequency}. ${declineClarity}.`;
  const observeradFormaga = [
    pick(capacityPool, seed),
    `Det som fungerar bara ibland kan fortfarande ses i ${sometimesWorks}.`,
    `Kvarvarande förmåga visar sig främst genom ${observedCapacity}.`,
  ];
  const begransningar = [
    pick(limitationPool, seed + 2),
    pick(limitationPool, seed + 4),
  ];
  const currentOrder = pick(currentOrderPool, seed + 6);
  const normallyPossible = [
    pick(possibilityPool, seed + 8),
    pick(possibilityPool, seed + 10),
    pick(possibilityPool, seed + 12),
  ];
  const summary = pick(summaryByTone[formState.tone], seed + 14);

  const copyText = [
    "ARBETSFÖRMÅGEBEDÖMARE | FIKTIV BEDÖMNING",
    `Referens: ${referenceNumber}`,
    `Upprättad: ${generatedOn}`,
    `Tonläge: ${selectedTone}`,
    "",
    "Bedömningsunderlag",
    bedomningsunderlag,
    "",
    "Observerad förmåga",
    ...observeradFormaga.map((item) => `- ${item}`),
    "",
    "Begränsningar",
    ...begransningar.map((item) => `- ${item}`),
    "",
    "Arbetsförmåga i nuvarande ordning",
    currentOrder,
    "",
    "Normalt förekommande möjligheter",
    ...normallyPossible.map((item) => `- ${item}`),
    "",
    "Sammanfattande bedömning",
    summary,
  ].join("\n");

  return {
    referenceNumber,
    generatedOn,
    toneLabel: selectedTone,
    bedomningsunderlag,
    observeradFormaga,
    begransningar,
    currentOrder,
    normallyPossible,
    summary,
    copyText,
  };
}

export function Arbetsformagebedomaren() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [generated, setGenerated] = useState<GeneratedAssessment | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera bedömning");

  const preview = useMemo(
    () => [
      ["Vad orkar du inte längre?", formState.weakIn || "Inte angivet"],
      ["Symtom / begränsningar", formState.limitations || "Inte angivet"],
      ["Fungerar bara ibland", formState.sometimesWorks || "Inte angivet"],
      ["Viss förmåga", formState.observedCapacity || "Inte angivet"],
      ["Vila / återhämtning", formState.restFrequency || "Inte angivet"],
      ["Försämring över tid", formState.declineClarity || "Inte angivet"],
      ["Tonläge", toneLabel(formState.tone)],
    ],
    [formState],
  );

  function generate() {
    setGenerated(buildAssessment(formState));
    setCopyLabel("Kopiera bedömning");
  }

  async function copyGenerated() {
    if (!generated) return;

    try {
      await navigator.clipboard.writeText(generated.copyText);
      setCopyLabel("Kopierat");
      window.setTimeout(() => setCopyLabel("Kopiera bedömning"), 1800);
    } catch {
      window.prompt("Kopiera bedömningstexten", generated.copyText);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Så fungerar den</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Beskriv det som blivit svårt och få tillbaka en formell bedömning
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Det här är version 1: du skriver vad som inte längre fungerar, vad som bara fungerar ibland
          och vad som fortfarande går att iaktta. Systemet formulerar sedan ett institutionellt svar
          om kvarvarande arbetsförmåga i nuvarande ordning.
        </p>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Arbetsförmågebedömaren</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Fyll i underlaget
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              generate();
            }}
          >
            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Vad orkar du inte längre?</span>
              <textarea
                value={formState.weakIn}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, weakIn: event.target.value }))
                }
                className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="Till exempel: längre pass, snabba växlingar eller tunga lyft"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Vilka symtom eller begränsningar påverkar dig?</span>
              <textarea
                value={formState.limitations}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, limitations: event.target.value }))
                }
                className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="Trötthet, smärta, oro, hjärndimma eller annat som påverkar hållbarheten"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Vad fungerar bara ibland?</span>
              <textarea
                value={formState.sometimesWorks}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, sometimesWorks: event.target.value }))
                }
                className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="Korta moment, lugna rutiner eller annat som går i stunder"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Vad kan fortfarande observeras som viss förmåga?</span>
              <textarea
                value={formState.observedCapacity}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, observedCapacity: event.target.value }))
                }
                className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="Det som ännu går att göra utan att hela systemet måste sluta sig"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-ink">Hur ofta behöver du vila eller återhämta dig?</span>
                <input
                  value={formState.restFrequency}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, restFrequency: event.target.value }))
                  }
                  className="rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                  placeholder="Till exempel: flera gånger per dag"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-ink">Hur tydlig är försämringen över tid?</span>
                <input
                  value={formState.declineClarity}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, declineClarity: event.target.value }))
                  }
                  className="rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                  placeholder="Till exempel: tydlig och ökande"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Tonläge</span>
              <select
                value={formState.tone}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, tone: event.target.value as Tone }))
                }
                className="rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              >
                {toneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
              >
                Generera bedömning
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormState(initialState);
                  setGenerated(null);
                  setCopyLabel("Kopiera bedömning");
                }}
                className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-white/92 px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
              >
                Rensa formulär
              </button>
            </div>
          </form>

          <aside className="rounded-[1.5rem] border border-steel/20 bg-white/88 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Förhandsvisning</p>
            <div className="mt-4 space-y-3">
              {preview.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-steel/15 bg-paper p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-ink/68">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-ink">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Genererat beslut</p>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
              Fiktiv bedömning av kvarvarande arbetsförmåga
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-steel/20 bg-paper px-4 py-2 text-sm text-ink">
              {generated ? generated.referenceNumber : "Referens skapas vid generering"}
            </span>
            <button
              type="button"
              onClick={copyGenerated}
              disabled={!generated}
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copyLabel}
            </button>
          </div>
        </div>

        {generated ? (
          <div className="mt-6 space-y-5">
            <article className="rounded-[1.35rem] border border-steel/15 bg-ink px-5 py-4 text-paper">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.32em] text-paper/65">Bedömningsutfärdare</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper">
                    Arbetsförmågebedömaren
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-paper/78">
                  <span className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1.5">
                    Ref: {generated.referenceNumber}
                  </span>
                  <span className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1.5">
                    Upprättad: {generated.generatedOn}
                  </span>
                  <span className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1.5">
                    Tonläge: {generated.toneLabel}
                  </span>
                </div>
              </div>
            </article>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-[1.35rem] border border-steel/15 bg-paper p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Bedömningsunderlag</p>
                <p className="mt-3 text-base leading-8 text-ink/78">{generated.bedomningsunderlag}</p>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Observerad förmåga</p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-ink/78">
                  {generated.observeradFormaga.map((item) => (
                    <li key={item} className="rounded-2xl border border-steel/15 bg-paper p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Begränsningar</p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-ink/78">
                  {generated.begransningar.map((item) => (
                    <li key={item} className="rounded-2xl border border-steel/15 bg-paper p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Arbetsförmåga i nuvarande ordning</p>
                <p className="mt-3 text-base leading-8 text-ink/78">{generated.currentOrder}</p>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5 lg:col-span-2">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Normalt förekommande möjligheter</p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-ink/78 md:grid md:grid-cols-3 md:gap-3 md:space-y-0">
                  {generated.normallyPossible.map((item) => (
                    <li key={item} className="rounded-2xl border border-steel/15 bg-paper p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-ink p-5 text-paper lg:col-span-2">
                <p className="text-xs uppercase tracking-[0.28em] text-paper/65">Sammanfattande bedömning</p>
                <p className="mt-3 text-base leading-8 text-paper/90">{generated.summary}</p>
              </article>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.35rem] border border-steel/15 bg-paper px-5 py-4">
              <p className="text-sm leading-7 text-ink/76">
                Vill du gå vidare kan underlaget även omformuleras som arbetsprofil.
              </p>
              <Link
                href="/cv-generator"
                className="inline-flex min-h-11 items-center rounded-full border border-steel/20 bg-white/92 px-5 py-2.5 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
              >
                Till CV-generator
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-[1.35rem] border border-dashed border-steel/25 bg-paper/85 p-5 text-base leading-8 text-ink/72">
            Generera en bedömning för att få en färdig, kopierbar sammanställning här.
          </div>
        )}
      </section>
    </div>
  );
}
