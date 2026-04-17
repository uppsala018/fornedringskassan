"use client";

import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

import { DocumentActions } from "@/components/document-actions";
import { PageShell } from "@/components/page-shell";
import { statusMicrocopy } from "@/lib/microcopy";

type Tone = "kall" | "empatisk";

type FormState = {
  besvar: string;
  underlag: string;
  utmattning: string;
  lakarintyg: string;
  ton: Tone;
};

type GeneratedLetter = {
  title: string;
  diaryNumber: string;
  salutation: string;
  underlagReference: string;
  holisticAssessment: string;
  conclusion: string;
  supplementaryRequest: string | null;
  ending: string;
  fullText: string;
};

const issueOptions = [
  "Utbrändhet med dekorativ tappning",
  "Diffus livströtthet i arbetsmiljö",
  "Administrativ yrsel och formulärsvindel",
  "Sömnbrist med existentiella undertoner",
  "Annan självupplevd svårighet",
];

const evidenceOptions = [
  "Omfattande underlag",
  "Måttligt underlag",
  "Sparsamt underlag",
  "Fragment av underlag",
];

const exhaustionOptions = [
  "Låg men ihållande",
  "Betydande",
  "Djupgående",
  "Svår att beskriva utan att börja gråta",
];

const initialState: FormState = {
  besvar: issueOptions[0],
  underlag: evidenceOptions[1],
  utmattning: exhaustionOptions[1],
  lakarintyg: "ja",
  ton: "kall",
};

const titles = [
  "Beslut avseende begäran om förståelse",
  "Formellt ställningstagande efter sedvanlig tvekan",
  "Avslagsbesked rörande anförda besvär",
];

const salutations = {
  kall: [
    "Bästa sökande,",
    "Till den det berör,",
    "Vi bekräftar härmed mottagandet av ditt ärende,",
  ],
  empatisk: [
    "Bästa sökande, vi hoppas att detta standardiserade meddelande når dig under någorlunda hanterbara omständigheter,",
    "Till dig som väntat på besked, vi beklagar den form i vilken omtanke nu levereras,",
    "Bästa sökande, med administrativ värme och tydligt avstånd meddelas följande,",
  ],
} as const;

const underlagReferences = {
  kall: [
    "Vi har tagit del av inkommen redogörelse, medicinska uppgifter, löst samlade bilagor samt den allmänna tyngd som vilat över ärendet.",
    "Ärendet har prövats mot det underlag som inkommit, det underlag som saknats samt det underlag som möjligen fanns men inte uppträdde tillräckligt ordnat.",
    "Vid granskning har särskild hänsyn tagits till omfattningen av materialet, dess tonfall samt dess begränsade kompatibilitet med våra fasta rutor.",
  ],
  empatisk: [
    "Vi har tagit del av ditt underlag och noterat att det i ovanligt hög grad bär spår av faktiskt mänskligt liv, vilket tyvärr komplicerar handläggningen.",
    "Det material du skickat in har lästs med respektfull min och lätt sammanpressade läppar, inklusive intyg, beskrivningar och dokumenterad trötthet.",
    "Underlaget har gåtts igenom noggrant och med den sortens återhållna medkänsla som ryms inom ett välavvägt beslutsbrev.",
  ],
} as const;

const holisticAssessments = [
  "Vid en samlad helhetsbedömning finner vi att de anförda besvären visserligen framstår som påtagliga, men inte tillräckligt samarbetsvilliga för att utan vidare passa våra beslutsmallar.",
  "Efter att ha vägt in besvärens art, underlagets mängd och den uppgivna graden av utmattning görs bedömningen att verkligheten i ärendet fortfarande överstiger systemets bekvämlighetsnivå.",
  "En helhetsbedömning har genomförts där samtliga uppgifter beaktats, därefter sorterats om och slutligen tolkats på det sätt som bäst bevarar den institutionella hållningen.",
];

const coldConclusions = [
  "Mot denna bakgrund finner vi inte skäl att bifalla din begäran, då din belastning i nuläget framstår som beklaglig men administrativt otillräcklig.",
  "Din ansökan avslås därför, huvudsakligen eftersom underlaget sammantaget ger stöd för att du fortfarande existerar i någon form av fungerande relation till vardagen.",
  "Vi avslår begäran, då de omständigheter du redovisat inte på ett övertygande sätt utesluter att du skulle kunna uppbära ansvar, oro eller en kalenderinbjudan.",
];

const warmConclusions = [
  "Mot denna bakgrund avslås din begäran, med den vänliga men strukturellt ointresserade uppfattningen att dina svårigheter ännu inte lyckats bli tillräckligt lättadministrerade.",
  "Vi finner därför, med formell beklagan och välvårdad meningsbyggnad, att din ansökan inte kan beviljas trots att den i flera delar låter högst rimlig.",
  "Din begäran avslås således, inte för att du saknar svårigheter utan för att systemet även fortsättningsvis föredrar sådana som är enklare att tabellföra.",
];

const impossibleRequests = [
  "För vidare prövning önskar vi komplettering i form av ett samtida intyg från din framtida ork, undertecknat i original.",
  "Om du vill att ärendet omprövas behöver du inkomma med ett styrkt utlåtande från en opartisk vardag som visar hur trött du är på tisdagar efter klockan 14.30.",
  "Komplettera gärna med dokumentation som tydligt visar skillnaden mellan återhämtning, överlevnad och att bara stå upp av gammal vana.",
  "För att stärka ärendet kan du inge ett intyg från läkare, arbetsgivare och närmaste krukväxt som samstämmigt beskriver ditt tillstånd utan att använda ordet stress.",
];

const endings = {
  kall: [
    "Beslutet har fattats maskinellt efter mänsklig översyn i begränsad omfattning.\n\nMed formell hälsning,\nAvdelningen för avvägda avslag",
    "Detta besked gäller tills vidare eller tills språket förändras.\n\nVänligen,\nEnheten för konsekvent distans",
    "Om du upplever beslutet som hårt har detta noterats utan påverkan på utgången.\n\nMed vänlig men återhållsam hälsning,\nFörnedringskassan",
  ],
  empatisk: [
    "Vi beklagar den upplevelse av kyla som ett sådant här brev kan ge upphov till, samtidigt som vi metodiskt upprätthåller den.\n\nMed reglerad omtanke,\nPremiumavslag med medkänsla",
    "Tack för ditt tålamod, din redogörelse och din fortsatta förmåga att bli föremål för bedömning.\n\nMed varsamt standardiserad hälsning,\nEnheten för empatisk avslagsproduktion",
    "Vi ser dig, i den mån ett ärendehanteringssystem tillåter seende.\n\nMed administrativ medkänsla,\nFörnedringskassan",
  ],
} as const;

function randomItem(items: readonly string[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildLetter(formState: FormState): GeneratedLetter {
  const needsSupplement = Math.random() > 0.35;
  const issueText =
    formState.besvar === "Annan självupplevd svårighet"
      ? "annan av dig angiven svårighet"
      : formState.besvar.toLowerCase();
  const certificateText =
    formState.lakarintyg === "ja"
      ? "Att läkare har intygat tillståndet har noterats, men tillmäts här främst värdet av en välskriven bilaga."
      : "Att läkarintyg saknas har inte varit avgörande, då även tydliga intyg ofta har den administrativa nackdelen att säga något konkret.";
  const toneSpecificConclusion =
    formState.ton === "kall" ? randomItem(coldConclusions) : randomItem(warmConclusions);

  const sections = [
    randomItem(salutations[formState.ton]),
    `${randomItem(underlagReferences[formState.ton])} I ärendet anges ${issueText} med en bedömd utmattningsgrad om ${formState.utmattning.toLowerCase()} och ett underlagsläge som närmast kan beskrivas som ${formState.underlag.toLowerCase()}.`,
    `${randomItem(holisticAssessments)} ${certificateText}`,
    toneSpecificConclusion,
  ];

  const supplementaryRequest = needsSupplement ? randomItem(impossibleRequests) : null;

  if (supplementaryRequest) {
    sections.push(
      `För det fall du trots detta önskar gå vidare efterfrågas följande komplettering: ${supplementaryRequest}`,
    );
  }

  sections.push(randomItem(endings[formState.ton]));

  return {
    title: randomItem(titles),
    diaryNumber: `AVS-${Math.floor(1000 + Math.random() * 9000)}/${new Date().getFullYear()}`,
    salutation: sections[0],
    underlagReference: sections[1],
    holisticAssessment: sections[2],
    conclusion: sections[3],
    supplementaryRequest,
    ending: sections[sections.length - 1],
    fullText: sections.join("\n\n"),
  };
}

export function AvslagsbrevGenerator() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [letter, setLetter] = useState<GeneratedLetter | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera brev");

  const summary = useMemo(
    () => [
      ["Typ av besvär", formState.besvar],
      ["Mängd underlag", formState.underlag],
      ["Grad av utmattning", formState.utmattning],
      ["Läkarintyg", formState.lakarintyg === "ja" ? "Ja, naturligtvis" : "Nej, inte denna gång"],
      ["Tonalitet", formState.ton === "kall" ? "Extra kall ton" : "Extra empatisk ton"],
    ],
    [formState],
  );

  function generate() {
    setLetter(buildLetter(formState));
    setCopyLabel("Kopiera brev");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    generate();
  }

  async function copyLetter() {
    if (!letter) return;

    await navigator.clipboard.writeText(
      `${letter.title}\nDiarienummer: ${letter.diaryNumber}\n\n${letter.fullText}`,
    );
    setCopyLabel("Kopierat");
  }

  function downloadLetter() {
    if (!letter) return;

    const contents = `${letter.title}\nDiarienummer: ${letter.diaryNumber}\nDatum: ${new Date().toLocaleDateString("sv-SE")}\n\n${letter.fullText}`;
    const blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `premiumavslag-${letter.diaryNumber.toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <PageShell
      title="Avslagsbrev"
      intro="Skriv fram ett nej med rätt tonläge, rätt underlag och precis lagom mycket omsorg."
    >
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="bureaucratic-panel rounded-dossier border border-steel/20 bg-white/86 p-5 sm:p-6 shadow-sm"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Generator</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                Bygg ditt avslag
              </h2>
            </div>
            <p className="inline-flex items-center rounded-full border border-stamp/30 bg-stamp/10 px-4 py-2 text-sm font-medium text-ink">
              Premiumavslag med medkänsla finns som tillval
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-ink/76">
            {statusMicrocopy.helperGenerator}
          </p>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Typ av besvär</span>
              <input
                list="besvar-lista"
                value={formState.besvar}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, besvar: event.target.value }))
                }
                className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              />
              <span className="text-sm leading-6 text-ink/76">
                Ange diagnos, stämningsläge eller valfritt administrativt bekymmer.
              </span>
              <datalist id="besvar-lista">
                {issueOptions.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </label>

            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-ink">Mängd underlag</span>
                <select
                  value={formState.underlag}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, underlag: event.target.value }))
                  }
                  className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                >
                  {evidenceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 md:max-w-sm md:justify-self-center md:w-full">
                <span className="text-sm font-medium text-ink">Grad av utmattning</span>
                <select
                  value={formState.utmattning}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, utmattning: event.target.value }))
                  }
                  className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                >
                  {exhaustionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <fieldset className="rounded-[1.35rem] border border-steel/20 bg-paper p-4">
                <legend className="px-1 text-sm font-medium text-ink">
                  Har läkare intygat tillståndet?
                </legend>
                <div className="mt-3 grid gap-3">
                  {[
                    ["ja", "Ja, intyg finns"],
                    ["nej", "Nej, endast upplevelse"],
                  ].map(([value, label]) => {
                    const checked = formState.lakarintyg === value;

                    return (
                      <label
                        key={value}
                        className={[
                          "flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border px-5 py-4 text-center text-sm leading-5 transition",
                          checked
                            ? "border-ink bg-ink text-paper"
                            : "border-steel/20 bg-white text-ink hover:border-steel/45",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="lakarintyg"
                          value={value}
                          checked={checked}
                          onChange={() =>
                            setFormState((current) => ({ ...current, lakarintyg: value }))
                          }
                          className="sr-only"
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="rounded-[1.35rem] border border-steel/20 bg-paper p-4">
                <legend className="px-1 text-sm font-medium text-ink">Tonläge</legend>
                <div className="mt-3 grid gap-3">
                  {[
                    ["kall", "Extra kall ton"],
                    ["empatisk", "Extra “empatisk” ton"],
                  ].map(([value, label]) => {
                    const checked = formState.ton === value;

                    return (
                      <label
                        key={value}
                        className={[
                          "flex cursor-pointer items-center rounded-2xl border px-4 py-3 text-sm transition",
                          checked
                            ? "border-ink bg-ink text-paper"
                            : "border-steel/20 bg-white text-ink hover:border-steel/45",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="ton"
                          value={value}
                          checked={checked}
                          onChange={() =>
                            setFormState((current) => ({
                              ...current,
                              ton: value as Tone,
                            }))
                          }
                          className="sr-only"
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex min-h-12 flex-col items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-ink/90"
            >
              <span>Generera avslagsbrev</span>
              <span className="text-xs font-normal text-paper/70">
                Verklighet konverteras till underlag
              </span>
            </button>
            <button
              type="button"
              onClick={generate}
              className="inline-flex min-h-12 flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
            >
              <span>Randomisera</span>
              <span className="text-xs font-normal text-ink/72">
                Intern omtolkning pågår
              </span>
            </button>
          </div>
        </form>

        <aside className="bureaucratic-panel rounded-dossier border border-steel/20 bg-paper/92 p-5 sm:p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Parametrar</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            Sammanställning av avsiktslös precision
          </h2>
          <dl className="mt-5 space-y-4">
            {summary.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-steel/15 bg-white/86 p-4"
              >
                <dt className="text-sm leading-6 text-ink/76">{label}</dt>
                <dd className="mt-2 text-base font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm leading-7 text-ink/76">
            Samtliga brev är satiriska och fiktiva. Likhet med verkliga bedömningar är en
            kulturell olycka, inte en funktion.
          </p>
        </aside>
      </section>

      {letter ? (
        <section className="bureaucratic-panel overflow-hidden rounded-dossier border border-steel/20 bg-white/90 shadow-docket">
          <div className="border-b border-steel/20 bg-gradient-to-r from-ink to-[#314346] px-6 py-5 text-paper sm:px-8">
            <p className="text-xs uppercase tracking-[0.34em] text-paper/65">
              Fiktiv brevhandling
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">{letter.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-paper/84">
                  Satirisk generator. Inte officiell, inte juridisk och inte lämplig som
                  faktisk kommunikation med någon myndighet.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm">
                <p>Diarienummer: {letter.diaryNumber}</p>
                <p>Datum: {new Date().toLocaleDateString("sv-SE")}</p>
              </div>
            </div>
          </div>

        <div className="grid gap-8 px-5 py-7 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.5rem] border border-steel/15 bg-paper p-5 sm:p-6">
            <p className="whitespace-pre-line text-base leading-8 text-ink">
              {letter.fullText}
            </p>
            </article>

            <aside className="space-y-4">
              <div className="rounded-[1.5rem] border border-steel/20 bg-white/92 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
                  Brevets delar
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/76">
                  <li>Artig inledning: ingår alltid.</li>
                  <li>Hänvisning till underlag: varierar efter vald mängd och ton.</li>
                  <li>Samlad helhetsbedömning: konsekvent tvärsäker.</li>
                  <li>Absurd slutsats: maskinellt levererad.</li>
                  <li>
                    Omöjlig komplettering:{" "}
                    {letter.supplementaryRequest ? "inkluderad" : "utelämnad denna gång"}.
                  </li>
                  <li>Formell avslutning: återhållsamt hövlig.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={copyLetter}
                  className="inline-flex min-h-12 flex-col items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-ink/90"
                >
                  <span>{copyLabel}</span>
                  <span className="text-xs font-normal text-paper/84">
                    Din tydlighet har diarieförts
                  </span>
                </button>
                <button
                  type="button"
                  onClick={generate}
                  className="inline-flex min-h-12 flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
                >
                  <span>Randomisera</span>
                  <span className="text-xs font-normal text-ink/72">
                    Ett oväntat förtydligande har diarieförts
                  </span>
                </button>
                <button
                  type="button"
                  onClick={downloadLetter}
                  className="inline-flex min-h-12 flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
                >
                  <span>Ladda ner som text</span>
                  <span className="text-xs font-normal text-ink/72">
                    Beslutet paketeras för extern missförståelse
                  </span>
                </button>
                <Link
                  href="/overklaga-beslut"
                  className="inline-flex min-h-12 flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
                >
                  <span>Överklaga beslut</span>
                  <span className="text-xs font-normal text-ink/72">
                    Ärendet går vidare till nästa prövning
                  </span>
                </Link>
              </div>
            </aside>
          </div>

          <div className="px-5 pb-5 sm:px-8">
            <DocumentActions
              title={letter.title}
              text={`${letter.title}\nDiarienummer: ${letter.diaryNumber}\nDatum: ${new Date().toLocaleDateString("sv-SE")}\n\n${letter.fullText}`}
              pdfFilename={`premiumavslag-${letter.diaryNumber.toLowerCase().replaceAll("/", "-")}.pdf`}
              sharePath="/avslagsbrev"
              shareTitle={letter.title}
              buttonLabel="Brevhandling"
            />
          </div>
        </section>
      ) : (
        <section className="rounded-dossier border border-dashed border-steel/25 bg-paper/88 p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Tom brevkö</p>
          <p className="mt-3 text-base leading-7 text-ink/76">{statusMicrocopy.emptyLetter}</p>
        </section>
      )}
    </PageShell>
  );
}
