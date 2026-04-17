"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { DocumentActions } from "@/components/document-actions";

type Tone = "neutral" | "sakligt-hoppfull" | "institutionellt-uppmuntrande";
type Mode = "examples" | "custom";

type ExampleScenario = {
  id: string;
  title: string;
  text: string;
  residualInterpretation: string;
  tonedDown: string;
  assumedAdaptation: string;
  observableRest: string;
};

type CustomState = {
  residualInterpretation: string;
  tonedDown: string;
  assumedAdaptation: string;
  observableRest: string;
};

type GeneratedAssessment = {
  referenceNumber: string;
  generatedOn: string;
  modeLabel: string;
  scenarioLabel: string;
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

const exampleScenarios: ExampleScenario[] = [
  {
    id: "vila-flera-ganger",
    title: "Vila flera gånger per dag",
    text: "Behöver vila flera gånger per dag men kan ändå ibland genomföra korta, tydligt avgränsade moment som systemet gärna läser som verksam förmåga.",
    residualInterpretation: "de korta, tydligt avgränsade momenten kan lyftas fram som kvarvarande förmåga",
    tonedDown: "den återkommande vilan och den begränsade hållbarheten över dagen",
    assumedAdaptation: "belastningen hålls låg och övergångarna blir få",
    observableRest: "förmåga att slutföra små uppgifter i lugn ordning",
  },
  {
    id: "tilltagande-tratthet",
    title: "Tilltagande trötthet och värk",
    text: "Har tilltagande trötthet och värk men kan fortfarande utföra enklare uppgifter i lugn miljö under begränsad tid, vilket bedömningen gärna förstorar till fortsatt förmåga.",
    residualInterpretation: "de enklare uppgifterna i lugn miljö räcker för att tala om viss funktion",
    tonedDown: "den begränsade tiden och behovet av återhämtning mellan momenten",
    assumedAdaptation: "uppgifterna delas upp i korta block med planerade pauser",
    observableRest: "förmåga att arbeta i små steg när tempot sänks",
  },
  {
    id: "vardagliga-aktiviteter",
    title: "Vardagliga aktiviteter i korta stunder",
    text: "Klarar vissa vardagliga aktiviteter i korta stunder, vilket i underlaget kan få större betydelse än helhetsbilden när små restvärden får tolkningsföreträde.",
    residualInterpretation: "de korta stunderna kan lyftas fram som ett positivt restvärde",
    tonedDown: "helhetsbilden av trötthet, återhämtning och otydlig uthållighet",
    assumedAdaptation: "det som ska bedömas får göras kort, avgränsat och utan störningar",
    observableRest: "förmåga att hålla ihop ett mindre moment när omgivningen hjälper till",
  },
  {
    id: "tydlig-forsamring",
    title: "Tydlig försämring över tid",
    text: "Har tydlig försämring över tid men uppvisar fortfarande viss observerbar förmåga i små, förberedda steg som lätt kan användas som slutsatsens kärna.",
    residualInterpretation: "de små, förberedda stegen kan ges större vikt än den tydliga försämringen",
    tonedDown: "den långsamma försämringen och den ökande anpassningskostnaden",
    assumedAdaptation: "uppgifterna följer redan förberedda steg och kräver minsta möjliga skifte",
    observableRest: "förmåga att genomföra små steg när allt redan är ordnat i förväg",
  },
];

const initialCustom: CustomState = {
  residualInterpretation: "",
  tonedDown: "",
  assumedAdaptation: "",
  observableRest: "",
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

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(text: string, maxLength: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    if (!current) {
      current = word;
      return;
    }

    if ((current + " " + word).length <= maxLength) {
      current += ` ${word}`;
      return;
    }

    lines.push(current);
    current = word;
  });

  if (current) {
    lines.push(current);
  }

  return lines.length > 0 ? lines : [text.trim()];
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildAssessmentExportSvg(generated: GeneratedAssessment) {
  const width = 1400;
  const contentWidth = width - 144;
  const sectionWidth = contentWidth;
  const underlagLines = wrapText(generated.bedomningsunderlag, 76);
  const observeradLines = generated.observeradFormaga.flatMap((item) => wrapText(`• ${item}`, 72));
  const begransningLines = generated.begransningar.flatMap((item) => wrapText(`• ${item}`, 72));
  const normallyPossibleLines = generated.normallyPossible.flatMap((item) => wrapText(`• ${item}`, 72));
  const currentOrderLines = wrapText(generated.currentOrder, 76);
  const summaryLines = wrapText(generated.summary, 76);

  let y = 72;
  const parts: string[] = [];
  const line = (x: number, yPosition: number, text: string, size: number, weight = 400, fill = "#203134") =>
    `<text x="${x}" y="${yPosition}" fill="${fill}" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="${size}" font-weight="${weight}">${escapeXml(text)}</text>`;

  const section = (title: string, linesContent: string[], heightHint?: number, dark = false) => {
    const lineHeight = dark ? 30 : 28;
    const topPadding = 28;
    const titleGap = 34;
    const blockHeight = heightHint ?? topPadding + titleGap + linesContent.length * lineHeight + 24;
    const background = dark ? "#101010" : "#f7f3ea";
    const border = dark ? "rgba(255,255,255,0.12)" : "rgba(115,128,131,0.18)";
    const bodyFill = dark ? "#f7f1e6" : "#203134";
    const mutedFill = dark ? "rgba(247,241,230,0.72)" : "#5c6d71";
    parts.push(
      `<g transform="translate(72,${y})">
        <rect width="${sectionWidth}" height="${blockHeight}" rx="26" fill="${background}" stroke="${border}" />
        ${line(28, 36, title, 18, 700, mutedFill)}
        ${linesContent
          .map((text, index) => line(28, 72 + index * lineHeight, text, 26, 400, bodyFill))
          .join("")}
      </g>`,
    );
    y += blockHeight + 24;
  };

  parts.push(
    `<rect x="0" y="0" width="${width}" height="100%" fill="#f5f0e7" />`,
    `<g transform="translate(72,72)">
      <text x="0" y="20" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="600" letter-spacing="3">ARBETSFÖRMÅGEBEDÖMAREN | FIKTIV BEDÖMNING</text>
      <text x="0" y="78" fill="#203134" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="700">${escapeXml(generated.scenarioLabel)}</text>
      <text x="0" y="120" fill="#415258" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="26">${escapeXml(`Referens: ${generated.referenceNumber} · Tonläge: ${generated.toneLabel} · Modus: ${generated.modeLabel}`)}</text>
      <g transform="translate(0,150)">
        <g transform="translate(0,0)">
          <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
          ${line(18, 26, "Dokumenttyp", 16, 700, "#5a6c69")}
          ${line(160, 26, "Fiktiv arbetsförmågebedömning", 16, 400, "#203134")}
        </g>
        <g transform="translate(430,0)">
          <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
          ${line(18, 26, "Upprättad", 16, 700, "#5a6c69")}
          ${line(118, 26, generated.generatedOn, 16, 400, "#203134")}
        </g>
        <g transform="translate(0,52)">
          <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
          ${line(18, 26, "Anpassning", 16, 700, "#5a6c69")}
          ${line(150, 26, generated.modeLabel, 16, 400, "#203134")}
        </g>
        <g transform="translate(430,52)">
          <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
          ${line(18, 26, "Ref", 16, 700, "#5a6c69")}
          ${line(80, 26, generated.referenceNumber, 16, 400, "#203134")}
        </g>
      </g>
    </g>`,
  );

  y = 320;

  section("Bedömningsunderlag", underlagLines);
  section("Observerad förmåga", observeradLines);
  section("Begränsningar", begransningLines);
  section("Arbetsförmåga i nuvarande ordning", currentOrderLines);
  section("Normalt förekommande möjligheter", normallyPossibleLines);
  section("Sammanfattande bedömning", summaryLines, undefined, true);

  const footerY = y + 12;
  parts.push(
    `<g transform="translate(72,${footerY})">
      <text x="0" y="0" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" letter-spacing="2.8">FIKTIV ARBETSFÖRMÅGEBEDÖMNING</text>
      <text x="${sectionWidth}" y="0" text-anchor="end" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500">Skapad för delning och intern ordning</text>
    </g>`,
  );

  const height = footerY + 52 + 72;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Fiktiv arbetsförmågebedömning">
    ${parts.join("")}
  </svg>`;

  return { svg, width, height };
}

async function exportAssessmentAsPng(generated: GeneratedAssessment) {
  const { svg, width, height } = buildAssessmentExportSvg(generated);
  const safeReference = generated.referenceNumber.replaceAll("/", "-");
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = svgUrl;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas context saknas.");
    }

    context.fillStyle = "#f5f0e7";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

    if (!pngBlob) {
      throw new Error("PNG-export misslyckades.");
    }

    downloadBlob(pngBlob, `arbetsformagebedomaren-${safeReference}.png`);
  } catch {
    const fallbackBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(fallbackBlob, `arbetsformagebedomaren-${safeReference}.svg`);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

function buildAssessment(input: {
  mode: Mode;
  scenario: ExampleScenario;
  custom: CustomState;
  tone: Tone;
}): GeneratedAssessment {
  const currentYear = new Date().getFullYear();
  const generatedOn = formatSwedishDate(new Date());
  const tone = toneLabel(input.tone);
  const source =
    input.mode === "examples"
      ? {
          label: input.scenario.title,
          text: input.scenario.text,
          residualInterpretation: input.scenario.residualInterpretation,
          tonedDown: input.scenario.tonedDown,
          assumedAdaptation: input.scenario.assumedAdaptation,
          observableRest: input.scenario.observableRest,
        }
      : {
          label: "Eget underlag",
          text: `${cleanText(input.custom.residualInterpretation, "Bedömningslogiken utgår från ett begränsat restvärde som ges större vikt än helheten.")}.`,
          residualInterpretation: cleanText(
            input.custom.residualInterpretation,
            "ett begränsat restvärde som ges större vikt än helheten",
          ),
          tonedDown: cleanText(
            input.custom.tonedDown,
            "det som riskerar att tonas ned när formuleringen görs jämnare",
          ),
          assumedAdaptation: cleanText(
            input.custom.assumedAdaptation,
            "anpassning som förutsätts utan att beskrivas fullt ut",
          ),
          observableRest: cleanText(
            input.custom.observableRest,
            "en liten men iakttagbar rest av funktion",
          ),
        };

  const seed = seedFromString(
    [source.label, source.text, source.residualInterpretation, source.tonedDown, source.assumedAdaptation, source.observableRest, input.tone].join(
      "|",
    ),
  );
  const referenceNumber = `AFB-${String(2000 + (seed % 7000)).padStart(4, "0")}/${currentYear}`;

  const bedomningsunderlag = [
    source.text,
    `Bedömningslogiken väljer att läsa detta som att ${source.residualInterpretation}.`,
    `Det som tenderar att tonas ned är ${source.tonedDown}.`,
  ].join(" ");

  const observeradFormaga = [
    `Det systemet faktiskt väljer att notera är ${source.observableRest}.`,
    `Kvarvarande förmåga framträder när underlaget hålls kort, ordnat och lätt att omformulera.`,
    `Exemplet räcker för att visa hur även liten funktion får större betydelse än helhetsläget.`,
  ];

  const begransningar = [
    `Det som behöver beskrivas men inte får för stor plats är ${source.tonedDown}.`,
    `Den del av bilden som inte bär en förenklad slutsats måste fortfarande finnas med i bakgrunden.`,
  ];

  const currentOrderPool: Record<Tone, string[]> = {
    neutral: [
      "Arbetsförmåga i nuvarande ordning bedöms kunna formuleras genom att små iakttagelser får väga tyngre än det som är svårt att bära.",
      "I nuvarande ordning blir möjligheten att arbeta mest synlig när systemet får sätta rubriken före helheten.",
    ],
    "sakligt-hoppfull": [
      "Arbetsförmåga i nuvarande ordning kan fortsatt beskrivas, förutsatt att det som orkar stannar i ett lugnt och förutsägbart format.",
      "I nuvarande ordning finns fortfarande en möjlig arbetslinje, men bara där bedömningen låter återhämtning och anpassning räknas som reella delar.",
    ],
    "institutionellt-uppmuntrande": [
      "Arbetsförmåga i nuvarande ordning framstår som möjlig att bekräfta när systemet tillåts läsa restvärdet som en faktisk tillgång.",
      "Den institutionella läsningen gör det möjligt att tala om fortsatt arbetsförmåga, även när den i praktiken är mycket begränsad.",
    ],
  };

  const normallyPossiblePool: Record<Tone, string[]> = {
    neutral: [
      "Uppgifter som kan delas upp i tydliga steg och göras utan lång samtidig belastning.",
      "Arbeten där återhämtning redan är inritad i ordningen och inte behöver motiveras i efterhand.",
      "Moment som kan avslutas innan trötthet och variation hinner bli ett hinder för helheten.",
    ],
    "sakligt-hoppfull": [
      "Uppgifter som kan fördelas på små, tydliga block med redan planerade pauser.",
      "Arbeten där låg belastning och tydlig struktur gör att det som orkas också får synas.",
      "Moment som kan genomföras i lugn miljö och med rimlig anpassning från början.",
    ],
    "institutionellt-uppmuntrande": [
      "Arbeten där även små steg får räknas som betydelsefulla delar av en fortsatt arbetsförmåga.",
      "Uppgifter som låter systemet beskriva återhämtning som en funktionell del av arbetet.",
      "Moment där anpassningen är så tydlig att bedömningen kan fortsätta låta trygg trots begränsningen.",
    ],
  };

  const summaryPool: Record<Tone, string[]> = {
    neutral: [
      "Den sammantagna bedömningen är att det finns kvarvarande arbetsförmåga, men bara i en ordning där små iakttagelser får väga tyngre än den svårare helheten.",
      "Bedömningen visar att arbetsförmåga kan anges i nuvarande ordning, men endast om helheten får beskrivas mer försiktigt än vanligt.",
    ],
    "sakligt-hoppfull": [
      "Den samlade bilden är att kvarvarande arbetsförmåga fortfarande kan tas till vara, förutsatt att sammanhanget byggs runt det som faktiskt går att bära.",
      "Underlaget lämnar utrymme för fortsatt arbetsförmåga i nuvarande ordning, så länge anpassning och återhämtning är verkliga villkor och inte bara ord.",
    ],
    "institutionellt-uppmuntrande": [
      "Den institutionella slutsatsen är att den kvarvarande funktionen fortsatt bör kunna beskrivas som arbetsförmåga, när systemet väljer rätt tonfall.",
      "Det finns tillräckligt med iakttagbar funktion för att en fortsatt arbetsförmåga ska kunna formuleras i ordnade och uppmuntrande termer.",
    ],
  };

  const currentOrder = pick(currentOrderPool[input.tone], seed + 3);
  const normallyPossible = [
    pick(normallyPossiblePool[input.tone], seed + 5),
    pick(normallyPossiblePool[input.tone], seed + 7),
    pick(normallyPossiblePool[input.tone], seed + 9),
  ];
  const summary = pick(summaryPool[input.tone], seed + 11);

  const copyText = [
    "ARBETSFÖRMÅGEBEDÖMARE | FIKTIV BEDÖMNING",
    "Dokumenttyp: Fiktiv arbetsförmågebedömning",
    `Referens: ${referenceNumber}`,
    `Upprättad: ${generatedOn}`,
    `Modus: ${input.mode === "examples" ? "Exempelbaserat" : "Eget underlag"}`,
    `Tonläge: ${tone}`,
    `Underlag: ${source.label}`,
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
    "",
    "Fiktiv arbetsförmågebedömning",
    "Skapad för delning och intern ordning",
  ].join("\n");

  return {
    referenceNumber,
    generatedOn,
    modeLabel: input.mode === "examples" ? "Exempelbaserat" : "Eget underlag",
    scenarioLabel: source.label,
    toneLabel: tone,
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
  const [mode, setMode] = useState<Mode>("examples");
  const [selectedExampleId, setSelectedExampleId] = useState(exampleScenarios[0].id);
  const [custom, setCustom] = useState<CustomState>(initialCustom);
  const [tone, setTone] = useState<Tone>("neutral");
  const [generated, setGenerated] = useState<GeneratedAssessment | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera bedömning");
  const [exportLabel, setExportLabel] = useState("Exportera som bild");

  const selectedExample = exampleScenarios.find((item) => item.id === selectedExampleId) ?? exampleScenarios[0];

  const preview = useMemo(
    () => [
      ["Modus", mode === "examples" ? "Exempelbaserat" : "Eget underlag"],
      ["Underlag", mode === "examples" ? selectedExample.title : custom.residualInterpretation || "Inte angivet"],
      [
        "Tolkad rest",
        mode === "examples"
          ? selectedExample.residualInterpretation
          : custom.residualInterpretation || "Inte angivet",
      ],
      [
        "Nedtonas som",
        mode === "examples" ? selectedExample.tonedDown : custom.tonedDown || "Inte angivet",
      ],
      [
        "Anpassning",
        mode === "examples" ? selectedExample.assumedAdaptation : custom.assumedAdaptation || "Inte angivet",
      ],
      ["Tonläge", toneLabel(tone)],
    ],
    [custom, mode, selectedExample, tone],
  );

  function generate() {
    setGenerated(
      buildAssessment({
        mode,
        scenario: selectedExample,
        custom,
        tone,
      }),
    );
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

  async function exportGenerated() {
    if (!generated) return;

    setExportLabel("Exporterar...");

    try {
      await exportAssessmentAsPng(generated);
      setExportLabel("Bild sparad");
    } catch {
      setExportLabel("Export misslyckades");
    } finally {
      window.setTimeout(() => setExportLabel("Exportera som bild"), 1800);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Så fungerar den</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Beskriv hur systemet läser kvarvarande förmåga
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Den här sidan driver med hur bedömningar kan översätta det som är svårt till kvarvarande
          arbetsförmåga. Om ämnet ligger för nära går det bra att hoppa över funktionen och välja
          <Link href="/nadalage" className="ml-1 underline decoration-steel/35 underline-offset-4">
            Nådeläge
          </Link>
          .
        </p>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Arbetsförmågebedömaren</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Välj en läsning av underlaget
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Standardläget utgår från exempel. Om du vill undersöka bedömningslogik mer direkt finns
          ett eget underlag längre ned, formulerat utan att be dig om något personligt i onödan.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setMode("examples")}
            className={`inline-flex min-h-11 items-center rounded-full px-5 py-2.5 text-sm font-medium transition ${
              mode === "examples"
                ? "bg-ink text-paper"
                : "border border-steel/25 bg-white/92 text-ink hover:border-steel/45 hover:bg-white"
            }`}
          >
            Exempelbaserat
          </button>
          <button
            type="button"
            onClick={() => setMode("custom")}
            className={`inline-flex min-h-11 items-center rounded-full px-5 py-2.5 text-sm font-medium transition ${
              mode === "custom"
                ? "bg-ink text-paper"
                : "border border-steel/25 bg-white/92 text-ink hover:border-steel/45 hover:bg-white"
            }`}
          >
            Eget underlag
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            {mode === "examples" ? (
              <section className="rounded-[1.4rem] border border-steel/15 bg-white/88 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Exempelbaserat underlag</p>
                <p className="mt-3 text-sm leading-7 text-ink/76">
                  Välj ett exempel som visar hur systemet gärna läser små restvärden som mer betydelsefulla
                  än helheten.
                </p>
                <div className="mt-5 grid gap-4">
                  {exampleScenarios.map((scenario) => {
                    const active = scenario.id === selectedExampleId;

                    return (
                      <button
                        key={scenario.id}
                        type="button"
                        onClick={() => setSelectedExampleId(scenario.id)}
                        className={`rounded-[1.35rem] border p-5 text-left transition ${
                          active
                            ? "border-ink bg-paper shadow-docket"
                            : "border-steel/15 bg-white/92 hover:border-steel/35 hover:bg-paper/90"
                        }`}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                              {scenario.title}
                            </h3>
                            <span className="rounded-full border border-steel/15 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-ink/70">
                              Exempel
                            </span>
                          </div>
                          <p className="text-base leading-7 text-ink/78">{scenario.text}</p>
                          <p className="text-sm leading-7 text-ink/64">
                            Systemet kan läsa detta som: {scenario.residualInterpretation}.
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ) : (
              <section className="rounded-[1.4rem] border border-steel/15 bg-white/88 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Eget underlag</p>
                <p className="mt-3 text-sm leading-7 text-ink/76">
                  Här formuleras underlaget som en läsning av bedömningslogik, inte som en begäran om
                  personlig redogörelse.
                </p>

                <div className="mt-5 space-y-4">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-ink">
                      Vilken del av underlaget riskerar att tolkas som kvarvarande förmåga?
                    </span>
                    <textarea
                      value={custom.residualInterpretation}
                      onChange={(event) =>
                        setCustom((current) => ({ ...current, residualInterpretation: event.target.value }))
                      }
                      className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                      placeholder="Till exempel: ett litet restvärde av funktion i tydligt avgränsade moment"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-ink">
                      Vad i situationen tenderar att tonas ned när bedömningen formuleras?
                    </span>
                    <textarea
                      value={custom.tonedDown}
                      onChange={(event) =>
                        setCustom((current) => ({ ...current, tonedDown: event.target.value }))
                      }
                      className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                      placeholder="Till exempel: att återhämtning krävs ofta och att helheten är skör"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-ink">
                      Vilken typ av anpassning förutsätts utan att beskrivas fullt ut?
                    </span>
                    <textarea
                      value={custom.assumedAdaptation}
                      onChange={(event) =>
                        setCustom((current) => ({ ...current, assumedAdaptation: event.target.value }))
                      }
                      className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                      placeholder="Till exempel: låg belastning, få skiften och tydliga pauser"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-ink">
                      Vilken observerbar rest kan komma att väga tyngre än helhetsbilden?
                    </span>
                    <textarea
                      value={custom.observableRest}
                      onChange={(event) =>
                        setCustom((current) => ({ ...current, observableRest: event.target.value }))
                      }
                      className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                      placeholder="Till exempel: kortvarig koncentration i lugn miljö"
                    />
                  </label>
                </div>
              </section>
            )}

            <section className="rounded-[1.4rem] border border-steel/15 bg-white/88 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Tonläge</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {toneOptions.map((option) => {
                  const active = tone === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTone(option.value)}
                      className={`rounded-[1.25rem] border p-4 text-left transition ${
                        active
                          ? "border-ink bg-paper shadow-docket"
                          : "border-steel/15 bg-white/92 hover:border-steel/35 hover:bg-paper/90"
                      }`}
                    >
                      <p className="text-sm font-semibold text-ink">{option.label}</p>
                      <p className="mt-2 text-sm leading-6 text-ink/68">
                        {option.value === "neutral"
                          ? "Håller texten torr och konsekvent."
                          : option.value === "sakligt-hoppfull"
                            ? "Låter läget vara svårt men läsbart."
                            : "Låter systemet tala nästan vänligt om det svåra."}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={generate}
                className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
              >
                Generera bedömning
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("examples");
                  setSelectedExampleId(exampleScenarios[0].id);
                  setCustom(initialCustom);
                  setTone("neutral");
                  setGenerated(null);
                  setCopyLabel("Kopiera bedömning");
                }}
                className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-white/92 px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
              >
                Återställ
              </button>
            </div>
          </div>

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
            <button
              type="button"
              onClick={exportGenerated}
              disabled={!generated}
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {exportLabel}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <DocumentActions
            title={generated ? "Arbetsförmågebedömaren" : "Arbetsförmågebedömaren"}
            text={generated ? generated.copyText : ""}
            pdfFilename={`arbetsformagebedomaren-${generated ? generated.referenceNumber.toLowerCase() : "utkast"}.pdf`}
            sharePath="/arbetsformagebedomaren"
            shareTitle={generated ? generated.referenceNumber : "Arbetsförmågebedömaren"}
            buttonLabel="Beslutshandling"
          />
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
                  <p className="mt-2 text-sm leading-6 text-paper/78">
                    Dokumenttyp: Fiktiv arbetsförmågebedömning
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-paper/78">
                  <span className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1.5">
                    Ref: {generated.referenceNumber}
                  </span>
                  <span className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1.5">
                    Upprättad: {generated.generatedOn}
                  </span>
                  <span className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1.5">
                    Modus: {generated.modeLabel}
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

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-steel/15 pt-2 text-xs uppercase tracking-[0.22em] text-ink/65">
              <span>Fiktiv arbetsförmågebedömning</span>
              <span>Skapad för delning och intern ordning</span>
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
