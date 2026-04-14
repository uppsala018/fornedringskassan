"use client";

import { useMemo, useState } from "react";

type FormState = {
  matter: string;
  understanding: string;
  attachment: "ja" | "nej" | "osakert";
  reconsiderations: string;
};

type GeneratedOutcome = {
  diaryNumber: string;
  header: string;
  note: string;
  body: string;
  ending: string;
  fullText: string;
};

const initialState: FormState = {
  matter: "",
  understanding: "",
  attachment: "ja",
  reconsiderations: "0",
};

const headers = [
  "Omprövning genomförd utan ändring i sak",
  "Överklagandet har mottagits och behandlats",
  "Beslutet kvarstår efter ny läsning",
  "Formell prövning avslutad med oförändrat resultat",
];

const notes = [
  "Ärendet har prövats i sin helhet och återförts till samma utgång.",
  "Nya uppgifter har beaktats inom ramen för redan fastställd bedömning.",
  "Överklagandet har mottagits, diarieförts och lästs med sedvanlig omsorg.",
  "Den tidigare bedömningen kvarstår efter sammanhållen genomgång.",
];

const bodies = [
  "Det som anförts visar på en fortsatt förståelig önskan om ändring, men förändrar inte den materiella bedömningen.",
  "De kompletterande uppgifterna har lästs, förtecknats och vägts in utan att det påverkar slutsatsen i sak.",
  "Ärendet har omprövats i sin helhet. Den språkliga precisionen har förbättrats; utgången har inte gjort det.",
  "Vi konstaterar att överklagandet är tydligt, men att tydlighet i sig inte ändrar vad beslutet redan har bestämt sig för.",
];

const endings = [
  "Det tidigare beslutet står därför fast.",
  "Beslutet lämnas oförändrat.",
  "Samma beslut gäller alltjämt.",
  "Ärendet kan prövas på nytt vid framtida oförändrade förutsättningar.",
];

function randomItem(items: readonly string[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildOutcome(formState: FormState): GeneratedOutcome {
  const reconsiderations = Number(formState.reconsiderations || "0");
  const attachmentText =
    formState.attachment === "ja"
      ? "Kompletterande underlag har bifogats."
      : formState.attachment === "osakert"
        ? "Kompletterande underlag har inte kunnat styrkas fullt ut."
        : "Inget kompletterande underlag har bifogats.";

  const reconsiderationText =
    reconsiderations <= 0
      ? "Ärendet har nu omprövats för första gången."
      : reconsiderations === 1
        ? "Ärendet har redan omprövats en gång tidigare och har därför prövats igen."
        : `Ärendet har redan omprövats ${reconsiderations} gånger och har därför fått ännu en formell genomgång.`;

  const body = `${randomItem(bodies)} ${attachmentText} ${reconsiderationText}`;
  const header = randomItem(headers);
  const note = randomItem(notes);
  const ending = randomItem(endings);

  return {
    diaryNumber: `ÖKB-${Math.floor(1000 + Math.random() * 9000)}/${new Date().getFullYear()}`,
    header,
    note,
    body,
    ending,
    fullText: [header, note, body, ending].join("\n\n"),
  };
}

export function OverklagaBeslutGenerator() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [outcome, setOutcome] = useState<GeneratedOutcome | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera beslut");

  const summary = useMemo(
    () => [
      ["Vad gäller överklagandet?", formState.matter || "Inte angivet"],
      ["Vad vill du att myndigheten ska förstå?", formState.understanding || "Inte angivet"],
      [
        "Har du bifogat kompletterande underlag?",
        formState.attachment === "ja"
          ? "Ja"
          : formState.attachment === "nej"
            ? "Nej"
            : "Osäkert",
      ],
      ["Hur många gånger har ärendet redan omprövats?", formState.reconsiderations || "0"],
    ],
    [formState],
  );

  function generate() {
    setOutcome(buildOutcome(formState));
    setCopyLabel("Kopiera beslut");
  }

  async function copyOutcome() {
    if (!outcome) return;

    await navigator.clipboard.writeText(`${outcome.header}\nDiarienummer: ${outcome.diaryNumber}\n\n${outcome.fullText}`);
    setCopyLabel("Kopierat");
  }

  return (
    <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Testa ett överklagande</p>
      <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
        Generera ett nytt besked om samma beslut
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
        Skriv in en kort överklagan och få tillbaka ett formellt svar. Språket kan bli mer omsorgsfullt,
        men utgången är vanligen densamma.
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
            <span className="text-sm font-medium text-ink">Vad gäller överklagandet?</span>
            <input
              value={formState.matter}
              onChange={(event) =>
                setFormState((current) => ({ ...current, matter: event.target.value }))
              }
              className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              placeholder="Kort beskrivning av beslutet"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-ink">Vad vill du att myndigheten ska förstå?</span>
            <textarea
              value={formState.understanding}
              onChange={(event) =>
                setFormState((current) => ({ ...current, understanding: event.target.value }))
              }
              className="min-h-28 rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              placeholder="Kort och tydlig förklaring"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Har du bifogat kompletterande underlag?</span>
              <select
                value={formState.attachment}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    attachment: event.target.value as FormState["attachment"],
                  }))
                }
                className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              >
                <option value="ja">Ja</option>
                <option value="nej">Nej</option>
                <option value="osakert">Osäkert</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Hur många gånger har ärendet redan omprövats?</span>
              <input
                type="number"
                min="0"
                value={formState.reconsiderations}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    reconsiderations: event.target.value,
                  }))
                }
                className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              />
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
                setOutcome(null);
                setCopyLabel("Kopiera beslut");
              }}
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
            >
              Rensa formulär
            </button>
          </div>
        </form>

        <aside className="rounded-[1.5rem] border border-steel/20 bg-paper/92 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Förhandsvisning</p>
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
              Omprövning genomförd utan ändring i sak
            </p>
          </div>
          <span className="rounded-full border border-steel/20 bg-paper px-4 py-2 text-sm text-ink">
            {outcome ? outcome.diaryNumber : "Diarienummer skapas vid generering"}
          </span>
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-steel/15 bg-paper p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
            {outcome ? outcome.header : "Beslut kommer att visas här"}
          </p>
          <p className="mt-4 text-base leading-8 text-ink/76">
            {outcome ? outcome.note : "Formell prövning väntar på ditt underlag."}
          </p>
          <p className="mt-4 whitespace-pre-line text-base leading-8 text-ink">
            {outcome
              ? `${outcome.body}\n\n${outcome.ending}`
              : "Det tidigare beslutet står tills vidare fast, i väntan på att ett överklagande ska ange sig självt."}
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
            onClick={copyOutcome}
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
          >
            {copyLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
