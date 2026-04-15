"use client";

import { useMemo, useState } from "react";

type Tone = "neutral" | "formellt-positiv" | "orimligt-valvillig";
type Adaptation = "liten" | "måttlig" | "omfattande" | "mycket omfattande";

type FormState = {
  name: string;
  work: string;
  weakIn: string;
  limitations: string;
  potential: string;
  adaptation: Adaptation;
  tone: Tone;
};

type GeneratedCv = {
  referenceNumber: string;
  generatedOn: string;
  name: string;
  work: string;
  toneLabel: string;
  adaptationLabel: string;
  profile: string;
  competencies: string[];
  practical: string;
  conditions: string[];
  recommendedAreas: string[];
  summary: string;
  copyText: string;
};

const toneOptions: Array<{ value: Tone; label: string }> = [
  { value: "neutral", label: "Neutral" },
  { value: "formellt-positiv", label: "Formellt positiv" },
  { value: "orimligt-valvillig", label: "Orimligt välvillig" },
];

const adaptationOptions: Array<{ value: Adaptation; label: string }> = [
  { value: "liten", label: "Liten" },
  { value: "måttlig", label: "Måttlig" },
  { value: "omfattande", label: "Omfattande" },
  { value: "mycket omfattande", label: "Mycket omfattande" },
];

const initialState: FormState = {
  name: "",
  work: "",
  weakIn: "",
  limitations: "",
  potential: "",
  adaptation: "måttlig",
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

function adaptationLabel(value: Adaptation) {
  return adaptationOptions.find((option) => option.value === value)?.label ?? "Måttlig";
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

function buildCvExportSvg(generated: GeneratedCv) {
  const width = 1400;
  const contentWidth = width - 144;
  const sectionWidth = contentWidth;
  const profileLines = wrapText(generated.profile, 78);
  const practicalLines = wrapText(generated.practical, 78);
  const conditionsLines = generated.conditions.flatMap((item) => wrapText(`• ${item}`, 74));
  const competencyLines = generated.competencies.flatMap((item) => wrapText(`• ${item}`, 74));
  const recommendedLines = generated.recommendedAreas.flatMap((item) => wrapText(`• ${item}`, 74));
  const summaryLines = wrapText(generated.summary, 78);

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

  const infoLines = [
    `Dokumenttyp: Fiktiv arbetsprofil`,
    `Namn: ${generated.name}`,
    `Uppdrag: ${generated.work}`,
    `Tonläge: ${generated.toneLabel}`,
    `Anpassning: ${generated.adaptationLabel}`,
    `Ref: ${generated.referenceNumber}`,
    `Upprättad: ${generated.generatedOn}`,
  ];

  parts.push(
    `<rect width="${width}" height="1" fill="transparent" />`,
    `<rect x="0" y="0" width="${width}" height="100%" fill="#f5f0e7" />`,
    `<g transform="translate(72,72)">
      <text x="0" y="20" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="600" letter-spacing="3">CV-GENERATOR | FIKTIV ARBETSPROFIL</text>
      <text x="0" y="78" fill="#203134" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="700">${escapeXml(generated.name)}</text>
      <text x="0" y="120" fill="#415258" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="26">${escapeXml(`Uppdrag: ${generated.work} · Tonläge: ${generated.toneLabel} · Anpassning: ${generated.adaptationLabel}`)}</text>
      <g transform="translate(0,150)">
        ${infoLines
          .map(
            (text, index) =>
              `<g transform="translate(${index % 2 === 0 ? 0 : 430},${Math.floor(index / 2) * 52})">
                <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
                <text x="18" y="26" fill="#203134" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="600">${escapeXml(text)}</text>
              </g>`,
          )
          .join("")}
      </g>
    </g>`,
  );

  y = 320;

  section("Profil", profileLines);
  section("Kompetenser", competencyLines);
  section("Arbetsförmåga i praktiken", practicalLines);
  section("Särskilda förutsättningar", conditionsLines);
  section("Rekommenderade arbetsområden", recommendedLines);
  section("Sammanfattande bedömning", summaryLines, undefined, true);

  const footerY = y + 12;
  parts.push(
    `<g transform="translate(72,${footerY})">
      <text x="0" y="0" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" letter-spacing="2.8">FIKTIV ARBETSPROFIL</text>
      <text x="${sectionWidth}" y="0" text-anchor="end" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500">Skapad för delning och intern ordning</text>
    </g>`,
  );

  const height = footerY + 52 + 72;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Fiktiv arbetsprofil från CV-generatorn">
    ${parts.join("")}
  </svg>`;

  return { svg, width, height };
}

function buildCvPrintHtml(generated: GeneratedCv) {
  const list = (items: string[]) =>
    items
      .map(
        (item) =>
          `<li style="margin:0 0 8px 0; padding:0 0 0 1.1em; position:relative;"><span style="position:absolute; left:0;">•</span><span>${escapeXml(item)}</span></li>`,
      )
      .join("");

  return `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CV-generator | ${escapeXml(generated.name)}</title>
    <style>
      @page {
        size: A4;
        margin: 14mm;
      }
      :root {
        color-scheme: light;
      }
      * {
        box-sizing: border-box;
      }
      html, body {
        margin: 0;
        padding: 0;
        background: #f5f0e7;
        color: #203134;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        padding: 0;
      }
      .sheet {
        width: 100%;
        min-height: 100vh;
        padding: 0;
      }
      .eyebrow {
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-size: 11px;
        font-weight: 700;
        color: #5a6c69;
      }
      .title {
        margin: 14px 0 8px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 36px;
        line-height: 1.08;
        font-weight: 700;
      }
      .lead {
        margin: 0 0 20px;
        font-size: 15px;
        line-height: 1.7;
        color: #415258;
      }
      .meta-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: 18px;
      }
      .meta {
        border: 1px solid rgba(115, 128, 131, 0.18);
        border-radius: 16px;
        background: #ffffff;
        padding: 12px 14px;
      }
      .meta-label {
        display: block;
        margin-bottom: 4px;
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #5a6c69;
      }
      .meta-value {
        font-size: 13px;
        line-height: 1.5;
      }
      .section {
        border: 1px solid rgba(115, 128, 131, 0.18);
        border-radius: 18px;
        background: #ffffff;
        padding: 16px 18px;
        margin-bottom: 14px;
      }
      .section.dark {
        background: #101010;
        color: #f7f1e6;
      }
      .section-label {
        font-size: 10px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: inherit;
        opacity: 0.75;
      }
      .section h2 {
        margin: 8px 0 10px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 20px;
        line-height: 1.2;
      }
      .section p, .section li {
        font-size: 14px;
        line-height: 1.7;
        margin: 0;
      }
      .section ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .muted {
        color: inherit;
        opacity: 0.8;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-top: 18px;
        padding-top: 12px;
        border-top: 1px solid rgba(115, 128, 131, 0.18);
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #5a6c69;
      }
      .page-break {
        break-inside: avoid;
        page-break-inside: avoid;
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <div class="eyebrow">CV-GENERATOR | FIKTIV ARBETSPROFIL</div>
      <h1 class="title">${escapeXml(generated.name)}</h1>
      <p class="lead">Uppdrag: ${escapeXml(generated.work)} · Tonläge: ${escapeXml(generated.toneLabel)} · Anpassning: ${escapeXml(generated.adaptationLabel)}</p>

      <div class="meta-grid">
        <div class="meta">
          <span class="meta-label">Dokumenttyp</span>
          <span class="meta-value">Fiktiv arbetsprofil</span>
        </div>
        <div class="meta">
          <span class="meta-label">Referens</span>
          <span class="meta-value">${escapeXml(generated.referenceNumber)}</span>
        </div>
        <div class="meta">
          <span class="meta-label">Upprättad</span>
          <span class="meta-value">${escapeXml(generated.generatedOn)}</span>
        </div>
        <div class="meta">
          <span class="meta-label">Anpassning</span>
          <span class="meta-value">${escapeXml(generated.adaptationLabel)}</span>
        </div>
      </div>

      <section class="section page-break">
        <div class="section-label">Profil</div>
        <h2>Fiktiv arbetsprofil</h2>
        <p>${escapeXml(generated.profile)}</p>
      </section>

      <section class="section page-break">
        <div class="section-label">Kompetenser</div>
        <h2>Kompetenser</h2>
        <ul>${list(generated.competencies)}</ul>
      </section>

      <section class="section page-break">
        <div class="section-label">Arbetsförmåga i praktiken</div>
        <h2>Arbetsförmåga i praktiken</h2>
        <p>${escapeXml(generated.practical)}</p>
      </section>

      <section class="section page-break">
        <div class="section-label">Särskilda förutsättningar</div>
        <h2>Särskilda förutsättningar</h2>
        <ul>${list(generated.conditions)}</ul>
      </section>

      <section class="section page-break">
        <div class="section-label">Rekommenderade arbetsområden</div>
        <h2>Rekommenderade arbetsområden</h2>
        <ul>${list(generated.recommendedAreas)}</ul>
      </section>

      <section class="section dark page-break">
        <div class="section-label">Sammanfattande bedömning</div>
        <h2>Sammanfattande bedömning</h2>
        <p>${escapeXml(generated.summary)}</p>
      </section>

      <div class="footer">
        <span>Fiktiv arbetsprofil</span>
        <span>Skapad för delning och intern ordning</span>
      </div>
    </main>
  </body>
</html>`;
}

async function exportCvAsPdf(generated: GeneratedCv) {
  const safeReference = generated.referenceNumber.replaceAll("/", "-");
  const html = buildCvPrintHtml(generated);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, "_blank", "noopener,noreferrer,width=980,height=1200");

  if (!printWindow) {
    downloadBlob(blob, `cv-generator-${safeReference}.html`);
    return;
  }

  const finalize = () => {
    try {
      printWindow.focus();
      printWindow.print();
    } catch {
      downloadBlob(blob, `cv-generator-${safeReference}.html`);
    }
  };

  printWindow.addEventListener("load", finalize, { once: true });
  window.setTimeout(() => {
    if (!printWindow.closed) {
      finalize();
    }
  }, 600);

  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function exportCvAsPng(generated: GeneratedCv) {
  const { svg, width, height } = buildCvExportSvg(generated);
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

    downloadBlob(pngBlob, `cv-generator-${safeReference}.png`);
  } catch {
    const fallbackBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(fallbackBlob, `cv-generator-${safeReference}.svg`);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

function buildCv(formState: FormState): GeneratedCv {
  const name = cleanText(formState.name, "Ej angivet");
  const work = cleanText(formState.work, "okänt arbete");
  const weakIn = cleanText(formState.weakIn, "högt tempo och otydliga instruktioner");
  const limitations = cleanText(formState.limitations, "trötthet, varierande kapacitet och behov av återhämtning");
  const potential = cleanText(formState.potential, "förmåga att hålla i tydligt avgränsade moment");
  const seed = seedFromString(
    [name, work, weakIn, limitations, potential, formState.adaptation, formState.tone].join("|"),
  );
  const year = new Date().getFullYear();
  const referenceNumber = `CV-${String(1000 + (seed % 9000)).padStart(4, "0")}/${year}`;
  const generatedOn = formatSwedishDate(new Date());
  const selectedTone = toneLabel(formState.tone);
  const selectedAdaptation = adaptationLabel(formState.adaptation);

  const profileOpeners: Record<Tone, string[]> = {
    neutral: [
      "Profilen visar en tydlig vilja att arbeta, men under villkor som kräver låg samtidig belastning och förutsägbar ordning.",
      "Det finns en arbetsberedskap som främst fungerar i avgränsade moment och med tydliga instruktioner.",
      "Den samlade bilden är att personen kan bidra, förutsatt att tempot hålls nere och ramarna är stabila.",
    ],
    "formellt-positiv": [
      "Profilen uppvisar en förvånansvärt tydlig arbetsvilja när uppgifterna är strukturerade, avgränsade och rimligt förutsägbara.",
      "Det finns en positiv kärna av arbetsinsats som blir tydlig så snart kraven formuleras i hanterbara steg.",
      "Arbetsförmågan framträder tydligt i sammanhang där ordning, tydlighet och återhämtning tillåts samverka.",
    ],
    "orimligt-valvillig": [
      "Profilen framstår som nästan exemplariskt anpassningsbar, givet att verkligheten i övrigt gör det möjligt att arbeta runt dess begränsningar.",
      "Trots påtagliga hinder finns här en ovanligt formbar arbetsprofil som gärna läses som kapacitet i rätt belysning.",
      "Med tillräcklig vilja från omgivningen skulle denna profil kunna beskrivas som mycket arbetsnära även när omständigheterna är det motsatta.",
    ],
  };

  const competencyPool = [
    `Har god självinsikt kring när ${weakIn} snabbt blir ohållbart.`,
    `Kan arbeta i ${selectedAdaptation.toLowerCase()} anpassning när instruktioner och förväntningar är tydligt avgränsade.`,
    `Förmår omsätta ${potential} i praktisk insats när arbetet delas upp i korta steg.`,
    `Upptäcker tidigt när belastningen övergår från rimlig till formellt noterad.`,
    `Låter begränsningar bli läsbara innan de hinner bli ett större ärende.`,
  ];

  const practicalPool = [
    `För ${work} bedöms insatsen fungera bäst i korta, förberedda block där återhämtning får ligga inbyggd i ordningen.`,
    `Arbetsförmågan i praktiken blir tydlig när ${work} delas upp i små, tydliga moment och tempot hålls mätbart.`,
    `I arbetet med ${work} kan personen bidra hållbart så länge kraven inte staplas ovanpå varandra i onödig takt.`,
  ];

  const conditionPool = [
    `Påverkas av ${limitations}.`,
    `Behöver ${selectedAdaptation.toLowerCase()} grad av anpassning för att belastningen ska vara möjlig att bära.`,
    "Arbetar bäst utan onödig simultan press, oklara övergångar eller för många parallella krav.",
  ];

  const areaPoolByTone: Record<Tone, string[]> = {
    neutral: [
      `Avgränsade delar av ${work}.`,
      "Uppgifter med tydliga start- och stopppunkter.",
      "Stödfunktioner med låg simultan belastning och tydlig struktur.",
      "Arbetsmoment som kan avbrytas utan att helheten tappar riktning.",
    ],
    "formellt-positiv": [
      `Avgränsade delar av ${work} som kan utföras i jämn och förutsägbar rytm.`,
      "Roller där arbetet kan beskrivas i tydliga steg och där återhämtning är planerad.",
      "Miljöer med klar ansvarsfördelning och låg risk för onödig överbelastning.",
      "Uppgifter där en stabil ordning ger bättre utfall än hög intensitet.",
    ],
    "orimligt-valvillig": [
      `Uppgifter där liten insats kan presenteras som betydande arbetskapacitet inom ${work}.`,
      "Arbetsområden med så mycket stöd att hinder nästan kan räknas som metod.",
      "Miljöer där anpassning är så omfattande att utfallet närmar sig möjlig arbetsprestation.",
      "Roller där det mesta kan räknas som fungerande så länge rubriken låter trygg.",
    ],
  };

  const summaryByTone: Record<Tone, string[]> = {
    neutral: [
      `Bedömningen är att ${name} har arbetsmässig riktning men behöver en tydligt strukturerad och återhämtningsbar ordning för att fungera hållbart.`,
      `Profilen visar vilja till arbete, men den villjan behöver placeras i ett sammanhang där kraven är läsbara och anpassningen faktisk.`,
    ],
    "formellt-positiv": [
      `Den samlade bilden är ovanligt gynnsam för ${name}: här finns ett tydligt underlag för arbetsinsats om ${work} utformas med särskild hänsyn.`,
      `Med rätt ordning och en realistisk nivå av anpassning framträder ${name} som arbetsmässigt användbar på ett sätt som bör kunna beskrivas i positiva termer.`,
    ],
    "orimligt-valvillig": [
      `Trots betydande begränsningar framstår ${name} som nästan imponerande formbar för ${work}, särskilt i ett arbetsliv som själv verkar behöva anpassning.`,
      `Det är svårt att bortse från att ${name}, med tillräcklig välvilja från omgivningen, kan framstå som ovanligt lämpad för uppgifter som normalt kräver betydligt mer av både system och människor.`,
    ],
  };

  const competencies = [
    pick(competencyPool, seed),
    pick(competencyPool, seed + 3),
    pick(competencyPool, seed + 5),
  ];
  const practical = pick(practicalPool, seed + 1);
  const conditions = [pick(conditionPool, seed + 2), pick(conditionPool, seed + 4)];
  const recommendedAreas = [
    pick(areaPoolByTone[formState.tone], seed + 6),
    pick(areaPoolByTone[formState.tone], seed + 7),
    pick(areaPoolByTone[formState.tone], seed + 8),
  ];
  const profile = `${pick(profileOpeners[formState.tone], seed)} ${cleanText(
    formState.potential,
    "Det som kan tolkas som arbetsförmåga framträder främst i en lugn och avgränsad form.",
  )}`;
  const summary = pick(summaryByTone[formState.tone], seed + 9);

  const copyText = [
    "CV-GENERATOR | FIKTIV ARBETSPROFIL",
    "Dokumenttyp: Fiktiv arbetsprofil",
    `Namn: ${name}`,
    `Arbete: ${work}`,
    `Tonläge: ${selectedTone}`,
    `Anpassning: ${selectedAdaptation}`,
    `Referens: ${referenceNumber}`,
    `Upprättad: ${generatedOn}`,
    "",
    "Profil",
    profile,
    "",
    "Kompetenser",
    ...competencies.map((item) => `- ${item}`),
    "",
    "Arbetsförmåga i praktiken",
    practical,
    "",
    "Särskilda förutsättningar",
    ...conditions.map((item) => `- ${item}`),
    "",
    "Rekommenderade arbetsområden",
    ...recommendedAreas.map((item) => `- ${item}`),
    "",
    "Sammanfattande bedömning",
    summary,
  ].join("\n");

  return {
    referenceNumber,
    name,
    work,
    toneLabel: selectedTone,
    adaptationLabel: selectedAdaptation,
    profile,
    competencies,
    practical,
    conditions,
    recommendedAreas,
    summary,
    generatedOn,
    copyText,
  };
}

export function CvGenerator() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [generated, setGenerated] = useState<GeneratedCv | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera CV");
  const [exportLabel, setExportLabel] = useState("Exportera som bild");
  const [pdfLabel, setPdfLabel] = useState("Spara som PDF");

  const preview = useMemo(
    () => [
      ["Namn", formState.name || "Inte angivet"],
      ["Arbete", formState.work || "Inte angivet"],
      ["Det som fungerar dåligt", formState.weakIn || "Inte angivet"],
      ["Begränsningar", formState.limitations || "Inte angivet"],
      ["Kvarvarande arbetsförmåga", formState.potential || "Inte angivet"],
      ["Anpassning", adaptationLabel(formState.adaptation)],
      ["Tonläge", toneLabel(formState.tone)],
    ],
    [formState],
  );

  function generate() {
    setGenerated(buildCv(formState));
    setCopyLabel("Kopiera CV");
  }

  async function copyGenerated() {
    if (!generated) return;

    try {
      await navigator.clipboard.writeText(generated.copyText);
      setCopyLabel("Kopierat");
      window.setTimeout(() => setCopyLabel("Kopiera CV"), 1800);
    } catch {
      window.prompt("Kopiera CV-texten", generated.copyText);
    }
  }

  async function exportGenerated() {
    if (!generated) return;

    setExportLabel("Exporterar...");

    try {
      await exportCvAsPng(generated);
      setExportLabel("Bild sparad");
    } catch {
      setExportLabel("Export misslyckades");
    } finally {
      window.setTimeout(() => setExportLabel("Exportera som bild"), 1800);
    }
  }

  async function exportPdfGenerated() {
    if (!generated) return;

    setPdfLabel("Öppnar utskrift...");

    try {
      await exportCvAsPdf(generated);
      setPdfLabel("PDF klar");
    } catch {
      setPdfLabel("PDF misslyckades");
    } finally {
      window.setTimeout(() => setPdfLabel("Spara som PDF"), 1800);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Så fungerar den</p>
        <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
          Beskriv det som inte fungerar och få tillbaka ett CV med prydlig ton
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Det här är version 1: du skriver vad som inte fungerar, vad som begränsar dig och vad som
          ändå kan läsas som arbetsförmåga. Systemet omformulerar det till en fiktiv CV-text med
          bättre ordning än underlaget förtjänar.
        </p>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/72">CV-generator</p>
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
              <span className="text-sm font-medium text-ink">Namn</span>
              <input
                value={formState.name}
                onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                className="rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="För- och efternamn"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Vilket arbete gäller det?</span>
              <input
                value={formState.work}
                onChange={(event) => setFormState((current) => ({ ...current, work: event.target.value }))}
                className="rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="Till exempel: administratör, kundtjänst eller lager"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Vad fungerar du dåligt i?</span>
              <textarea
                value={formState.weakIn}
                onChange={(event) => setFormState((current) => ({ ...current, weakIn: event.target.value }))}
                className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="Korta beskrivningar av sådant som snabbt blir för mycket"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Vilka begränsningar eller symtom påverkar dig?</span>
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
              <span className="text-sm font-medium text-ink">Vad skulle ändå kunna tolkas som arbetsförmåga?</span>
              <textarea
                value={formState.potential}
                onChange={(event) => setFormState((current) => ({ ...current, potential: event.target.value }))}
                className="min-h-24 rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="Det som fortfarande kan ses som fungerande, även i liten skala"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-ink">Hur mycket anpassning krävs?</span>
                <select
                  value={formState.adaptation}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, adaptation: event.target.value as Adaptation }))
                  }
                  className="rounded-2xl border border-steel/20 bg-white/92 px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                >
                  {adaptationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

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
            </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
              >
                Generera CV
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormState(initialState);
                  setGenerated(null);
                  setCopyLabel("Kopiera CV");
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
            <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Genererat CV</p>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
              Fiktiv sammanställning av arbetsförmåga
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
            <button
              type="button"
              onClick={exportPdfGenerated}
              disabled={!generated}
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pdfLabel}
            </button>
          </div>
        </div>

        {generated ? (
          <div className="mt-6 space-y-5">
            <article className="rounded-[1.35rem] border border-steel/15 bg-ink px-5 py-4 text-paper">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.32em] text-paper/65">Dokumentinformation</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper">
                      Fiktiv arbetsprofil
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-paper/78">
                      Dokumenttyp: Fiktiv arbetsprofil
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-paper/78">
                    <span className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1.5">
                      Ref: {generated.referenceNumber}
                  </span>
                  <span className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1.5">
                    Upprättad: {generated.generatedOn}
                  </span>
                </div>
              </div>
            </article>

            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="rounded-[1.35rem] border border-steel/15 bg-paper p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Namn</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                  {generated.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink/72">
                  Uppdrag: {generated.work}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-ink/68">
                  <span className="rounded-full border border-steel/20 bg-white/92 px-3 py-1.5">
                    Tonläge: {generated.toneLabel}
                  </span>
                  <span className="rounded-full border border-steel/20 bg-white/92 px-3 py-1.5">
                    Anpassning: {generated.adaptationLabel}
                  </span>
                </div>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Profil</p>
                <p className="mt-3 text-base leading-8 text-ink/78">{generated.profile}</p>
              </article>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Kompetenser</p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-ink/78">
                  {generated.competencies.map((item) => (
                    <li key={item} className="rounded-2xl border border-steel/15 bg-paper p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Arbetsförmåga i praktiken</p>
                <p className="mt-3 text-base leading-8 text-ink/78">{generated.practical}</p>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Särskilda förutsättningar</p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-ink/78">
                  {generated.conditions.map((item) => (
                    <li key={item} className="rounded-2xl border border-steel/15 bg-paper p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[1.35rem] border border-steel/15 bg-white/95 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Rekommenderade arbetsområden</p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-ink/78">
                  {generated.recommendedAreas.map((item) => (
                    <li key={item} className="rounded-2xl border border-steel/15 bg-paper p-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="rounded-[1.35rem] border border-steel/15 bg-ink p-5 text-paper">
              <p className="text-xs uppercase tracking-[0.28em] text-paper/65">Sammanfattande bedömning</p>
              <p className="mt-3 text-base leading-8 text-paper/90">{generated.summary}</p>
            </article>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-steel/15 pt-2 text-xs uppercase tracking-[0.22em] text-ink/65">
              <span>Fiktiv arbetsprofil</span>
              <span>Skapad för delning och intern ordning</span>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-[1.35rem] border border-dashed border-steel/25 bg-paper/85 p-5 text-base leading-8 text-ink/72">
            Generera ett CV för att få en färdig, kopierbar sammanställning här.
          </div>
        )}
      </section>
    </div>
  );
}
