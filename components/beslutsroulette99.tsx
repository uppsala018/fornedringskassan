"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type ReviewSpeed = "ingen" | "kort" | "oklart" | "tillracklig";
type SupportState = "ja" | "nej" | "osakert";
type DecisionKind = "godkand" | "avslag" | "omprovning" | "komplettering" | "uppskjuten" | "kvarstar";

type FormState = {
  matter: string;
  reviewSpeed: ReviewSpeed;
  support: SupportState;
};

type RouletteDecision = {
  number: number;
  diaryNumber: string;
  kind: DecisionKind;
  outcomeLabel: string;
  heading: string;
  motivation: string;
  validity: string;
  nextStep: string;
  timeline: string[];
  copyText: string;
};

const initialState: FormState = {
  matter: "",
  reviewSpeed: "ingen",
  support: "ja",
};

const reviewSpeedOptions: Array<{ value: ReviewSpeed; label: string; detail: string }> = [
  { value: "ingen", label: "Ingen", detail: "Avgörs i ordnad slump." },
  { value: "kort", label: "Kort", detail: "Få minuter, mycket säkerhet." },
  { value: "oklart", label: "Oklart", detail: "Tiden finns men inte läsningen." },
  { value: "tillracklig", label: "Tillräcklig", detail: "Man skulle kunna läsa, men hjulet går snabbare." },
];

const supportOptions: Array<{ value: SupportState; label: string }> = [
  { value: "ja", label: "Ja" },
  { value: "nej", label: "Nej" },
  { value: "osakert", label: "Osäkert" },
];

const wheelNumbers = Array.from({ length: 100 }, (_, index) => index);

const kindCatalog: Record<
  DecisionKind,
  {
    heading: string;
    outcomeLabel: string;
    motivation: string[];
    validity: string[];
    nextStep: string[];
    timeline: string[][];
  }
> = {
  godkand: {
    heading: "Tillfälligt bifall under fortsatt administrativ osäkerhet",
    outcomeLabel: "Godkänd",
    motivation: [
      "Ärendet avgjordes i ordnad slump enligt gällande snabbförfarande.",
      "Utfallet föll denna gång på det enda gröna fältet, men bara som ett tillfälligt undantag.",
      "Rörelsen stannade på det gröna fältet och noterades därför som bifall i ordnad osäkerhet.",
    ],
    validity: [
      "Godkänd i 7 dagar.",
      "Giltighetstid: 7 dagar.",
      "Bifallet gäller tillfälligt under fortsatt administrativ osäkerhet.",
    ],
    nextStep: [
      "Beslutet omprövas efter 7 dagar utan föregående lättnad.",
      "Nästa steg är ny prövning när samma osäkerhet hunnit bli etablerad.",
      "Efter giltighetstiden kan ärendet återföras för ny ordnad slump.",
    ],
    timeline: [
      [
        "Ärendet har mottagits i rutinen för snabbförfarande",
        "Roulettens givna ordning har bekräftats",
        "Utfallet har knutits till tillfälligt bifall",
      ],
      [
        "Ärendet har lagts i turordning för ordnad slump",
        "Rörelsen har följts tills grönt fält uppstod",
        "Beslutet har antecknats som tillfälligt godkänt",
      ],
    ],
  },
  avslag: {
    heading: "Ej godkänd i första rundan",
    outcomeLabel: "Ej godkänd",
    motivation: [
      "Utfallet medger inte bifall i denna omgång.",
      "Ärendet föll på svart fält och behandlas därför som ej godkänt.",
      "Snabbförfarandet landade på en riktning som redan låg nära den vanliga ordningen.",
    ],
    validity: [
      "Ingen giltighetstid.",
      "Gäller tills vidare i väntan på samma slutsats i ny form.",
      "Utfallet är inte tidsbegränsat; det är bara fast.",
    ],
    nextStep: [
      "Ärendet kan återkomma när någon har mer tid än beslutet.",
      "Ny läsning kan ske när underlaget har blivit mindre bekvämt att inte ändra på.",
      "Nästa steg är fortsatt ordnad väntan utan ändrad riktning.",
    ],
    timeline: [
      [
        "Ärendet har mottagits i snabbförfarandet",
        "Roulettens svarta fält har tagit över prövningen",
        "Beslutet har registrerats som ej godkänt",
      ],
      [
        "Ärendet har förts in i ordnad slump",
        "Färdig riktning har valts före läsning",
        "Utfallet har antecknats som avslag",
      ],
    ],
  },
  omprovning: {
    heading: "Ej godkänd efter omprövning i samma riktning",
    outcomeLabel: "Ej godkänd",
    motivation: [
      "Ärendet omprövades, men den nya läsningen stannade i samma svarta ordning.",
      "Det som såg ut som rörelse blev i praktiken samma svar i mer justerad form.",
      "Den formella omprövningen förändrade rubriken, inte riktningen.",
    ],
    validity: [
      "Ingen giltighetstid.",
      "Beslutet står fast tills någon annan får samma uppgift i bättre tid.",
      "Omprövningen gav ny formulering men inget nytt bifall.",
    ],
    nextStep: [
      "Nästa steg är ytterligare en genomgång av redan genomgången ordning.",
      "Ärendet kan återupptas när samma underlag behöver beskrivas mer enhetligt.",
      "Fortsatt osäkerhet lämnas till nästa rundgång i systemet.",
    ],
    timeline: [
      [
        "Ärendet har återförts för ny läsning",
        "Underlaget har passerat intern funktion utan ändrad slutsats",
        "Omprövningen har diarieförts som oförändrat utfall",
      ],
      [
        "Ärendet har lagts i tur för ny genomgång",
        "Den omprövade riktningen har varit densamma",
        "Beslutet har stått kvar i justerad form",
      ],
    ],
  },
  komplettering: {
    heading: "Ej godkänd – underlaget återförs",
    outcomeLabel: "Ej godkänd",
    motivation: [
      "Roulettens utfall leder till återföring för komplettering innan saken anses färdig att inte godkännas på rätt sätt.",
      "Det som saknas har bedömts som viktigare än det som finns, vilket i detta system räcker för att pausa allt annat.",
      "Ärendet behöver mer papper innan någon kan låtsas ha sett helheten.",
    ],
    validity: [
      "Ingen giltighetstid.",
      "Gäller tills kompletteringen dyker upp eller väntan får ny rubrik.",
      "Tillfällig paus i väntan på underlag som skulle ha behövts redan innan hjulet snurrade.",
    ],
    nextStep: [
      "Nästa steg är fortsatt väntan på det som ännu inte hunnit bli tydligt.",
      "Underlaget återkommer när nästa funktion beslutar att det behövs mer av samma sak.",
      "Ärendet går vidare till ny ordnad väntan i förbättrad ton.",
    ],
    timeline: [
      [
        "Ärendet har noterats som ofullständigt",
        "Underlaget har förts till kompletteringsspåret",
        "Prövningen har stannat i vänteläge",
      ],
      [
        "Ärendet har lagts på återföring",
        "Ytterligare handlingar har efterfrågats av samma anledning som tidigare",
        "Handläggningen har fortsatt som fördröjd ordning",
      ],
    ],
  },
  uppskjuten: {
    heading: "Ej godkänd i uppskjuten ordning",
    outcomeLabel: "Ej godkänd",
    motivation: [
      "Beslutet kunde inte förklaras mer än att det uppsköts tills vidare.",
      "Systemet har valt att förlänga osäkerheten i stället för att lindra den.",
      "Prövningen har gått vidare genom fördröjning snarare än slutsats.",
    ],
    validity: [
      "Ingen giltighetstid.",
      "Gäller i väntan på att väntan får en ny placering.",
      "Uppskjutandet gäller tills nästa ordnade osäkerhet blir tillgänglig.",
    ],
    nextStep: [
      "Nästa steg är fortsatt väntan med mer formellt språk.",
      "Ärendet kan tas upp igen när samma led blivit mindre upptagna av att inte läsa.",
      "Fortsatt osäkerhet gäller tills hjulet får en ny tjänstgöring.",
    ],
    timeline: [
      [
        "Ärendet har mottagits i huvudflödet",
        "Prövningen har lagts i viloläge för ordnad fördröjning",
        "Beslutet har markerats som uppskjutet",
      ],
      [
        "Ärendet har placerats i väntans ordning",
        "Ingen ändring har kunnat motiveras i tid",
        "Handläggningen har fortsatt i uppskjuten form",
      ],
    ],
  },
  kvarstar: {
    heading: "Ej godkänd – beslutet kvarstår",
    outcomeLabel: "Ej godkänd",
    motivation: [
      "Roulettens svarta fält bekräftade att samma beslut fortfarande är det mest bekväma beslutet.",
      "Det tidigare utfallet återkom i ny form och fick därmed fortsätta vara samma svar.",
      "Beslutet stod kvar, nu med ännu mer formell säkerhet än tidigare.",
    ],
    validity: [
      "Ingen giltighetstid.",
      "Gäller tills vidare och gärna även därefter.",
      "Det kvarstående beslutet har ingen planerad utgång.",
    ],
    nextStep: [
      "Nästa steg är att samma riktning ges ytterligare en jämn rubrik.",
      "Ärendet kan återkomma när det behöver bekräftas att det fortfarande inte blev annorlunda.",
      "Fortsatt osäkerhet har redan fått en plats i nästa led.",
    ],
    timeline: [
      [
        "Ärendet har lästs om i ordnad ritual",
        "Det tidigare beslutet har fått stå kvar",
        "Slutpunkten har antecknats som oförändrad",
      ],
      [
        "Ärendet har förts genom snabbförfarande",
        "Utgången har återvänt till samma håll",
        "Beslutet har bekräftats som kvarstående",
      ],
    ],
  },
};

function seedFromString(value: string) {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pick<T>(items: readonly T[], seed: number) {
  return items[seed % items.length];
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

function buildDecisionExportSvg(decision: RouletteDecision) {
  const width = 1400;
  const contentWidth = width - 144;
  const sectionWidth = contentWidth;
  const motivationLines = wrapText(decision.motivation, 76);
  const validityLines = wrapText(decision.validity, 76);
  const nextStepLines = wrapText(decision.nextStep, 76);
  const timelineLines = decision.timeline;

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
      <text x="0" y="20" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="600" letter-spacing="3">BESLUTSROULETTE | FIKTIV BESLUTSSAMMANSTÄLLNING</text>
      <text x="0" y="78" fill="#203134" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="700">${escapeXml(`Utfall ${decision.number}`)}</text>
      <text x="0" y="120" fill="#415258" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="26">${escapeXml(`${decision.heading} · ${decision.outcomeLabel}`)}</text>
      <g transform="translate(0,150)">
        <g transform="translate(0,0)">
          <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
          ${line(18, 26, "Diarienummer", 16, 700, "#5a6c69")}
          ${line(156, 26, decision.diaryNumber, 16, 400, "#203134")}
        </g>
        <g transform="translate(430,0)">
          <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
          ${line(18, 26, "Giltighetstid", 16, 700, "#5a6c69")}
          ${line(150, 26, decision.validity, 16, 400, "#203134")}
        </g>
        <g transform="translate(0,52)">
          <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
          ${line(18, 26, "Utfall", 16, 700, "#5a6c69")}
          ${line(96, 26, `${decision.number === 0 ? "Godkänd" : "Ej godkänd"}`, 16, 400, "#203134")}
        </g>
        <g transform="translate(430,52)">
          <rect width="390" height="40" rx="20" fill="#ffffff" stroke="rgba(115,128,131,0.18)" />
          ${line(18, 26, "Nästa steg", 16, 700, "#5a6c69")}
          ${line(124, 26, decision.nextStep, 16, 400, "#203134")}
        </g>
      </g>
    </g>`,
  );

  y = 320;

  section("Kort motivering", motivationLines);
  section("Intern rörelse", timelineLines, undefined);
  section("Eventuell giltighetstid", validityLines);
  section("Nästa steg eller fortsatt osäkerhet", nextStepLines);

  const footerY = y + 12;
  parts.push(
    `<g transform="translate(72,${footerY})">
      <text x="0" y="0" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" letter-spacing="2.8">FIKTIV BESLUTSSAMMANSTÄLLNING</text>
      <text x="${sectionWidth}" y="0" text-anchor="end" fill="#5a6c69" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500">Skapad för delning och intern ordning</text>
    </g>`,
  );

  const height = footerY + 52 + 72;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Fiktiv beslutssammanställning">
    ${parts.join("")}
  </svg>`;

  return { svg, width, height };
}

async function exportDecisionAsPng(decision: RouletteDecision) {
  const { svg, width, height } = buildDecisionExportSvg(decision);
  const safeDiary = decision.diaryNumber.replaceAll("/", "-");
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

    downloadBlob(pngBlob, `beslutsroulette-${safeDiary}.png`);
  } catch {
    const fallbackBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(fallbackBlob, `beslutsroulette-${safeDiary}.svg`);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

function getDecisionKind(number: number): DecisionKind {
  if (number === 0) return "godkand";
  if (number < 20) return "avslag";
  if (number < 40) return "omprovning";
  if (number < 60) return "komplettering";
  if (number < 80) return "uppskjuten";
  return "kvarstar";
}

function getWheelRotation(targetNumber: number) {
  const step = 360 / 100;
  const center = targetNumber * step + step / 2;
  return (360 - center) % 360;
}

function playTone(
  context: AudioContext,
  frequency: number,
  duration: number,
  gainValue: number,
  type: OscillatorType = "triangle",
) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = 0;

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  const now = context.currentTime;
  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(gainValue, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

export function Beslutsroulette() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [number, setNumber] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [decision, setDecision] = useState<RouletteDecision | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera beslut");
  const [exportLabel, setExportLabel] = useState("Exportera som bild");
  const audioContextRef = useRef<AudioContext | null>(null);
  const tickTimerRef = useRef<number | null>(null);
  const stopTimerRef = useRef<number | null>(null);

  const wheelSegments = useMemo(() => {
    return wheelNumbers.map((value) => {
      const angle = (value / 100) * 360;
      return {
        value,
        angle,
        color: value === 0 ? "#2d7d46" : "#101010",
      };
    });
  }, []);

  const selectedSupportLabel = supportOptions.find((option) => option.value === formState.support)?.label ?? "Ja";
  const selectedReviewLabel = reviewSpeedOptions.find((option) => option.value === formState.reviewSpeed)?.label ?? "Ingen";

  const preview = useMemo(
    () => [
      ["Ärende", formState.matter || "Inte angivet"],
      ["Granskningsläge", selectedReviewLabel],
      ["Underlag", selectedSupportLabel],
    ],
    [formState.matter, selectedReviewLabel, selectedSupportLabel],
  );

  function ensureAudioContext() {
    if (typeof window === "undefined") return null;
    if (!audioContextRef.current) {
      const AudioContextCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return null;
      audioContextRef.current = new AudioContextCtor();
    }
    return audioContextRef.current;
  }

  function stopTicking() {
    if (tickTimerRef.current) {
      window.clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }
    if (stopTimerRef.current) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  }

  function buildDecision(resultNumber: number): RouletteDecision {
    const kind = getDecisionKind(resultNumber);
    const catalog = kindCatalog[kind];
    const seed = seedFromString([
      formState.matter,
      formState.reviewSpeed,
      formState.support,
      String(resultNumber),
      String(rotation),
    ].join("|"));
    const diaryNumber = `BR-${String(1000 + (seed % 9000)).padStart(4, "0")}/${new Date().getFullYear()}`;
    const supportText =
      formState.support === "ja"
        ? "Kompletterande material har bifogats."
        : formState.support === "nej"
          ? "Inget kompletterande material har bifogats."
          : "Kompletterande material har inte kunnat styrkas fullt ut.";
    const reviewText =
      formState.reviewSpeed === "ingen"
        ? "Granskningstid: ingen."
        : formState.reviewSpeed === "kort"
          ? "Granskningstid: kort."
          : formState.reviewSpeed === "oklart"
            ? "Granskningstid: oklar."
            : "Granskningstid: tillräcklig, men inte använd i praktiken.";

    const motivation = `${pick(catalog.motivation, seed + 1)} Ärendet gäller: ${formState.matter || "inte angivet"}. ${supportText} ${reviewText}`;
    const validity = pick(catalog.validity, seed + 3);
    const nextStep = pick(catalog.nextStep, seed + 5);
    const timeline = pick(catalog.timeline, seed + 7).slice(0, 3);
    const copyText = [
      `${catalog.heading}`,
      "Dokumenttyp: Fiktiv beslutssammanställning",
      `Utfall: ${resultNumber} – ${catalog.outcomeLabel}`,
      `Diarienummer: ${diaryNumber}`,
      "",
      `Kort motivering: ${motivation}`,
      `Eventuell giltighetstid: ${validity}`,
      `Nästa steg: ${nextStep}`,
      "",
      "Intern rörelse:",
      ...timeline.map((item) => `- ${item}`),
      "",
      "Fiktiv beslutssammanställning",
      "Skapad för delning och intern ordning",
    ].join("\n");

    return {
      number: resultNumber,
      diaryNumber,
      kind,
      outcomeLabel: catalog.outcomeLabel,
      heading: catalog.heading,
      motivation,
      validity,
      nextStep,
      timeline,
      copyText,
    };
  }

  async function spin() {
    if (isSpinning) return;

    stopTicking();
    const audioContext = ensureAudioContext();
    if (audioContext) {
      await audioContext.resume();
    }

    const resultNumber = Math.floor(Math.random() * 100);
    const targetRotation = rotation + 5 * 360 + getWheelRotation(resultNumber);

    setIsSpinning(true);
    setDecision(null);
    setNumber(null);
    setCopyLabel("Kopiera beslut");
    setRotation(targetRotation);

    if (audioContext) {
      tickTimerRef.current = window.setInterval(() => {
        playTone(audioContext, 920 + Math.random() * 130, 0.04, 0.025, "square");
      }, 125);
      stopTimerRef.current = window.setTimeout(() => {
        stopTicking();
        playTone(audioContext, resultNumber === 0 ? 560 : 180, 0.18, 0.035, "triangle");
      }, 4300);
    }

    window.setTimeout(() => {
      stopTicking();
      const nextDecision = buildDecision(resultNumber);
      setNumber(resultNumber);
      setDecision(nextDecision);
      setIsSpinning(false);
    }, 4500);
  }

  async function copyDecision() {
    if (!decision) return;

    try {
      await navigator.clipboard.writeText(decision.copyText);
      setCopyLabel("Kopierat");
      window.setTimeout(() => setCopyLabel("Kopiera beslut"), 1800);
    } catch {
      window.prompt("Kopiera beslutstexten", decision.copyText);
    }
  }

  async function exportDecision() {
    if (!decision) return;

    setExportLabel("Exporterar...");

    try {
      await exportDecisionAsPng(decision);
      setExportLabel("Bild sparad");
    } catch {
      setExportLabel("Export misslyckades");
    } finally {
      window.setTimeout(() => setExportLabel("Exportera som bild"), 1800);
    }
  }

  const wheelCenterLabel = decision
    ? number === 0
      ? "Godkänd"
      : "Ej godkänd"
    : isSpinning
      ? "Snurrar"
      : "Beslut";
  const wheelCenterNumber = number !== null ? String(number) : "–";

  return (
    <section className="rounded-dossier border border-steel/20 bg-white/90 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/72">Snabbförfarande</p>
      <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink">
        Generera ett beslut genom ordnad slump
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
        När en full genomgång inte hinns med kan ärendet avgöras i ett beslutshjul. 0 är godkänd.
        1 till 99 är ej godkänd.
      </p>

      <form
        id="roulette-control-form"
          onSubmit={(event) => {
            event.preventDefault();
            spin();
          }}
        className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="space-y-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-ink">Vad gäller ärendet?</span>
            <input
              value={formState.matter}
              onChange={(event) => setFormState((current) => ({ ...current, matter: event.target.value }))}
              className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              placeholder="Till exempel: ersättning, återkrav eller väntan"
            />
            <span className="text-xs leading-6 text-ink/68">Exempel: ersättning, återkrav eller väntan.</span>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-ink">Hur mycket tid finns för granskning?</span>
              <select
                value={formState.reviewSpeed}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    reviewSpeed: event.target.value as ReviewSpeed,
                  }))
                }
                className="rounded-2xl border border-steel/20 bg-paper px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
              >
                {reviewSpeedOptions.map((option) => (
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

          <div className="rounded-[1.4rem] border border-steel/15 bg-white/88 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Kodförklaring</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-steel/15 bg-paper p-4">
                <p className="text-sm font-semibold text-ink">0</p>
                <p className="mt-1 text-sm leading-6 text-ink/76">Grön. Godkänd i 7 dagar.</p>
              </div>
              <div className="rounded-2xl border border-steel/15 bg-paper p-4">
                <p className="text-sm font-semibold text-ink">1–99</p>
                <p className="mt-1 text-sm leading-6 text-ink/76">Svart. Ej godkänd.</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink/72">
              Om du hellre vill lämna sidan finns en lugnare väg via{" "}
              <Link href="/nadalage" className="underline decoration-steel/35 underline-offset-4">
                Nådeläge
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                stopTicking();
                setFormState(initialState);
                setNumber(null);
                setDecision(null);
                setRotation(0);
                setIsSpinning(false);
                setCopyLabel("Kopiera beslut");
                setExportLabel("Exportera som bild");
              }}
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-white/92 px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
            >
              Rensa formulär
            </button>
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-steel/20 bg-paper/92 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Förhandsvisning</p>
          <dl className="mt-4 space-y-3">
            {preview.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-steel/15 bg-white/88 p-4">
                <dt className="text-sm leading-6 text-ink/72">{label}</dt>
                <dd className="mt-2 text-sm font-medium leading-6 text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </form>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.86fr]">
        <section className="rounded-[1.6rem] border border-steel/20 bg-white/90 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Roulettehjul</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Beslutsroulette
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-ink/68">
              <span className="rounded-full border border-steel/15 bg-paper px-3 py-1.5">0 = Godkänd</span>
              <span className="rounded-full border border-steel/15 bg-paper px-3 py-1.5">1–99 = Ej godkänd</span>
            </div>
          </div>

          <div className="relative mx-auto mt-6 aspect-square w-full max-w-[560px]">
            <div
              className="absolute inset-0 rounded-full border border-steel/20 shadow-docket transition-transform duration-[4600ms] ease-[cubic-bezier(0.12,0.82,0.18,1)]"
              style={{
                transform: `rotate(${rotation}deg)`,
                backgroundImage:
                  "radial-gradient(circle at center, rgba(255,255,255,0.05) 0 46%, rgba(0,0,0,0.12) 46% 47%, transparent 47% 100%), repeating-conic-gradient(from -90deg, rgba(255,255,255,0.72) 0deg 0.14deg, transparent 0.14deg 3.6deg), repeating-conic-gradient(from -90deg, rgba(247,244,236,0.05) 0deg 0.12deg, transparent 0.12deg 3.6deg), conic-gradient(from -90deg, " +
                  wheelSegments.map((segment) => `${segment.color} ${segment.angle}deg ${segment.angle + 3.6}deg`).join(", ") +
                  ")",
              }}
            >
              <div className="absolute inset-[8%] rounded-full border border-paper/15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),rgba(15,15,15,0.24))]">
                <div className="absolute inset-[18%] rounded-full border border-paper/12 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                {wheelSegments.map((segment) => {
                  const isZero = segment.value === 0;
                  const labelColor = isZero ? "#d8efe0" : "#f3eee4";
                  return (
                    <span
                      key={segment.value}
                      className="absolute left-1/2 top-1/2 select-none text-[10px] font-semibold leading-none tracking-tight"
                      style={{
                        color: labelColor,
                        transform: `translate(-50%, -50%) rotate(${segment.angle + 1.8}deg) translateY(-clamp(128px, 33vw, 206px)) rotate(-${segment.angle + 1.8}deg)`,
                        textShadow: "0 1px 2px rgba(0,0,0,0.55)",
                      }}
                    >
                      {segment.value}
                    </span>
                  );
                })}

                <div
                  className={`absolute left-1/2 top-1/2 flex h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/12 text-center shadow-docket transition-transform duration-300 ${
                    isSpinning ? "scale-[1.03]" : "scale-100"
                  }`}
                  style={{
                    background:
                      number === 0
                        ? "linear-gradient(180deg, rgba(45,125,70,0.95), rgba(28,82,46,0.98))"
                        : "linear-gradient(180deg, rgba(19,19,19,0.96), rgba(8,8,8,0.98))",
                  }}
                >
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.3em] text-paper/70">{wheelCenterLabel}</p>
                    <p className="mt-2 text-5xl font-semibold tracking-tight text-paper">{wheelCenterNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
              <div className="mx-auto h-0 w-0 border-b-[24px] border-l-[16px] border-r-[16px] border-b-ink border-l-transparent border-r-transparent" />
              <div className="mx-auto mt-[-4px] h-5 w-5 rounded-full border border-paper/25 bg-paper shadow-[0_2px_10px_rgba(0,0,0,0.25)]" />
            </div>
          </div>

          <button
            type="submit"
            form="roulette-control-form"
            disabled={isSpinning}
            className="mx-auto mt-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#f3d7d7]/30 bg-[#8f1f1f] text-[11px] font-semibold uppercase tracking-[0.24em] text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_24px_rgba(0,0,0,0.28)] transition hover:bg-[#a22626] active:translate-y-[1px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_6px_16px_rgba(0,0,0,0.24)] disabled:cursor-not-allowed disabled:opacity-65"
          >
            {isSpinning ? "Snurrar" : "Snurra"}
          </button>

          <p className="mt-5 text-center text-sm leading-7 text-ink/72">
            Hjulet snurrar i myndighetston. 0 är grönt. Resten är svart.
          </p>
        </section>

        <section className="rounded-[1.6rem] border border-steel/20 bg-white/90 p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Beslutsresultat</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                {decision ? decision.heading : "Resultatet visas här"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/72">
                Dokumenttyp: Fiktiv beslutssammanställning
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-4 py-2 text-sm ${
                  decision && decision.kind === "godkand"
                    ? "border-emerald-700/20 bg-emerald-50 text-emerald-900"
                    : "border-steel/20 bg-paper text-ink"
                }`}
              >
                {decision ? `Utfall ${decision.number}` : "Utfall väntar"}
              </span>
              <button
                type="button"
                onClick={copyDecision}
                disabled={!decision}
                className="inline-flex min-h-11 items-center rounded-full border border-steel/25 bg-paper px-5 py-2.5 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copyLabel}
              </button>
              <button
                type="button"
                onClick={exportDecision}
                disabled={!decision}
                className="inline-flex min-h-11 items-center rounded-full border border-steel/25 bg-paper px-5 py-2.5 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {exportLabel}
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-[1.35rem] border border-steel/15 bg-paper p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Kort motivering</p>
            <p className="mt-3 text-base leading-8 text-ink/76">
              {decision ? decision.motivation : "Ärendet avgörs i ordnad slump enligt gällande snabbförfarande."}
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-steel/15 bg-white/88 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-ink/68">Diarienummer</p>
                <p className="mt-2 text-sm leading-7 text-ink">{decision ? decision.diaryNumber : "Skapas vid generering"}</p>
              </div>
              <div className="rounded-2xl border border-steel/15 bg-white/88 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-ink/68">Eventuell giltighetstid</p>
                <p className="mt-2 text-sm leading-7 text-ink">{decision ? decision.validity : "Ingen ännu"}</p>
              </div>
              <div className="rounded-2xl border border-steel/15 bg-white/88 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-ink/68">Nästa steg eller fortsatt osäkerhet</p>
                <p className="mt-2 text-sm leading-7 text-ink">
                  {decision ? decision.nextStep : "Nästa steg visas efter att hjulet fått bestämma i stället för genomgång."}
                </p>
              </div>
            </div>
          </div>

          {decision ? (
            <div className="mt-5 space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                {decision.timeline.map((item, index) => (
                  <div key={`${item}-${index}`} className="rounded-2xl border border-steel/15 bg-paper p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-ink/68">Intern rörelse {index + 1}</p>
                    <p className="mt-2 text-sm leading-7 text-ink">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.35rem] border border-steel/15 bg-paper px-5 py-4">
                <p className="text-sm leading-7 text-ink/76">
                  Vill du jämföra mot nästa rundgång kan du snurra hjulet igen.
                </p>
                <button
                  type="button"
                  onClick={spin}
                  className="inline-flex min-h-11 items-center rounded-full border border-steel/20 bg-white/92 px-5 py-2.5 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
                >
                  Generera på nytt
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-[1.35rem] border border-dashed border-steel/25 bg-paper/85 p-5 text-base leading-8 text-ink/72">
              Här visas den formella sammanfattningen när roulettehjulet har avgjort ärendet.
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
