"use client";

import { useMemo, useState } from "react";

type MatterType = "beslut" | "omprovning" | "komplettering" | "ovrigt";

type TrackingResult = {
  diaryNumber: string;
  status: string;
  note: string;
  timeline: string[];
  nextStep: string;
  shareText: string;
};

const initialMatterType: MatterType = "beslut";

const matterOptions: Array<{ value: MatterType; label: string }> = [
  { value: "beslut", label: "Beslut" },
  { value: "omprovning", label: "Omprövning" },
  { value: "komplettering", label: "Komplettering" },
  { value: "ovrigt", label: "Övrigt" },
];

const statuses = [
  "Ärendet har mottagits",
  "Ärendet är registrerat",
  "Ärendet väntar på intern förflyttning",
  "Ärendet har överlämnats till annan funktion",
  "Ärendet inväntar tidigare underlag",
  "Ärendet handläggs i utökad ordning",
  "Ärendet har återförts för förnyad inledande bedömning",
  "Ärendet är fortfarande under behandling utan avvikelse från tidigare riktning",
];

const notesByMatter: Record<MatterType, string[]> = {
  beslut: [
    "Beslutet har registrerats och placerats i ordnad väntan.",
    "Ärendet har kopplats till föregående bedömning utan att något ännu skiljer sig åt.",
    "Den senaste läsningen bekräftar att beslutet är känt, inte nödvändigtvis förklarat.",
  ],
  omprovning: [
    "Omprövning har initierats och hänvisats till samma material som tidigare.",
    "Ärendet har behandlats i sin helhet och förts vidare med lägre grad av överraskning.",
    "Tidigare ställningstagande har lästs om, vilket främst har förbättrat formuleringarna.",
  ],
  komplettering: [
    "Kompletterande uppgifter har tagits emot och lagts till i den befintliga ordningen.",
    "Det som saknades har noterats som väntat och därmed blivit ytterligare ett led.",
    "Underlaget har bedömts som mottaget men inte som avslutande.",
  ],
  ovrigt: [
    "Ärendet ligger i den kategori där precision blir till en flexibel fråga om rutin.",
    "Det finns rörelse i systemet, men den har ännu inte lett till ökad klarhet.",
    "Funktionen som nu hanterar ärendet har bekräftat mottagande utan att ange riktning.",
  ],
};

const nextSteps = [
  "Nästa förväntade icke-steg är intern vidarefördelning.",
  "Nästa synbara rörelse väntas bli ytterligare en läsning av redan läst material.",
  "Ärendet kan komma att byta funktion utan att byta innehåll.",
  "Vid fortsatt oförändrade förutsättningar förväntas ny väntan med uppdaterad rubrik.",
];

function seedFromString(value: string) {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pick<T>(items: readonly T[], seed: number) {
  return items[seed % items.length];
}

function buildResult(reference: string, matter: MatterType): TrackingResult {
  const normalized = reference.trim().toUpperCase() || "OKÄND";
  const seed = seedFromString(normalized) + matter.length * 13;
  const drift = Math.floor(Math.random() * 11);

  const baseStatuses = [
    pick(statuses, seed + drift),
    pick(statuses, seed + 3 + drift),
    pick(statuses, seed + 5 + drift),
  ];

  const timeline = Array.from(new Set(baseStatuses));
  const diaryNumber = `ÄRE-${String(seed % 9000).padStart(4, "0")}/${new Date().getFullYear()}`;
  const note = pick(notesByMatter[matter], seed + 1 + drift);
  const status = pick(statuses, seed + 2 + drift);
  const nextStep = pick(nextSteps, seed + 4 + drift);

  return {
    diaryNumber,
    status,
    note: `${note} Referens: ${normalized}.`,
    timeline,
    nextStep,
    shareText: `${status}. ${note} ${nextStep}`,
  };
}

export function SporaDittArendeTracker() {
  const [reference, setReference] = useState("");
  const [matterType, setMatterType] = useState<MatterType>(initialMatterType);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera status");

  const summary = useMemo(
    () => [
      ["Diarienummer", reference.trim() || "Inte angivet"],
      ["Ärendetyp", matterOptions.find((option) => option.value === matterType)?.label ?? "Beslut"],
    ],
    [reference, matterType],
  );

  function generate() {
    setResult(buildResult(reference, matterType));
    setCopyLabel("Kopiera status");
  }

  async function copyStatus() {
    if (!result) return;

    await navigator.clipboard.writeText(
      `${result.diaryNumber}\n${result.status}\n${result.note}\n${result.timeline.join("\n")}\n${result.nextStep}`,
    );
    setCopyLabel("Kopierat");
  }

  return (
    <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Spårning</p>
      <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
        Följ ett ärende genom systemets stilla rörelse
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
        Ange ett diarienummer eller referensnummer och välj vad ärendet gäller. Då visas en
        spårning som ser aktiv ut, uppdateras som om den betydde något och förklarar väldigt lite.
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
            <span className="text-sm font-medium text-ink">Diarienummer eller referensnummer</span>
            <input
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              placeholder="Till exempel ÄRE-2048/2026"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-ink">Vad gäller ärendet?</span>
            <select
              value={matterType}
              onChange={(event) => setMatterType(event.target.value as MatterType)}
              className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
            >
              {matterOptions.map((option) => (
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
              Spåra ärende
            </button>
            <button
              type="button"
              onClick={() => {
                setReference("");
                setMatterType(initialMatterType);
                setResult(null);
                setCopyLabel("Kopiera status");
              }}
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
            >
              Rensa
            </button>
          </div>
        </form>

        <aside className="rounded-[1.5rem] border border-steel/20 bg-paper/92 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Uppgifter som läses</p>
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
            <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Spårningsresultat</p>
            <p className="mt-2 text-sm leading-7 text-ink/76">
              {result ? "Ärendet följs i systemet med uppdaterad status." : "Inget ärende valt ännu."}
            </p>
          </div>
          <span className="rounded-full border border-steel/20 bg-paper px-4 py-2 text-sm text-ink">
            {result ? result.diaryNumber : "Diarienummer skapas vid spårning"}
          </span>
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-steel/15 bg-paper p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
            {result ? result.status : "Väntar på referens"}
          </p>
          <p className="mt-4 text-base leading-8 text-ink/76">
            {result
              ? result.note
              : "Ange ett diarienummer för att se hur ärendet rör sig genom den administrativa ordningen."}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {(result ? result.timeline : ["Ärendet har mottagits", "Ärendet är registrerat", "Ärendet väntar på intern förflyttning"]).map(
              (item) => (
                <div key={item} className="rounded-2xl border border-steel/15 bg-white/88 p-4">
                  <p className="text-sm leading-7 text-ink">{item}</p>
                </div>
              ),
            )}
          </div>
          <p className="mt-5 text-sm leading-7 text-ink/76">
            {result ? result.nextStep : "Nästa förväntade icke-steg visas när ärendet har lästs."}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={generate}
            className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
          >
            Uppdatera spårning
          </button>
          <button
            type="button"
            onClick={copyStatus}
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
          >
            {copyLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
