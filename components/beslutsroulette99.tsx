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

export function Beslutsroulette99() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [number, setNumber] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [decision, setDecision] = useState<RouletteDecision | null>(null);
  const [copyLabel, setCopyLabel] = useState("Kopiera beslut");
  const audioContextRef = useRef<AudioContext | null>(null);
  const tickTimerRef = useRef<number | null>(null);
  const stopTimerRef = useRef<number | null>(null);

  const wheelSegments = useMemo(() => {
    return wheelNumbers.map((value) => {
      const angle = (value / 100) * 360;
      return {
        value,
        angle,
        color: value === 0 ? "#2d7d46" : value % 2 === 0 ? "#141414" : "#0d0d0d",
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
    const diaryNumber = `BR99-${String(1000 + (seed % 9000)).padStart(4, "0")}/${new Date().getFullYear()}`;
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
      `Utfall: ${resultNumber} – ${catalog.outcomeLabel}`,
      `Diarienummer: ${diaryNumber}`,
      "",
      `Kort motivering: ${motivation}`,
      `Eventuell giltighetstid: ${validity}`,
      `Nästa steg: ${nextStep}`,
      "",
      "Intern rörelse:",
      ...timeline.map((item) => `- ${item}`),
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            spin();
          }}
          className="space-y-4"
        >
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
              type="submit"
              disabled={isSpinning}
              className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSpinning ? "Snurrar..." : "Snurra beslutshjulet"}
            </button>
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
              }}
              className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-white/92 px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
            >
              Rensa formulär
            </button>
          </div>
        </form>

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
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.86fr]">
        <section className="rounded-[1.6rem] border border-steel/20 bg-white/90 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Roulettehjul</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                Beslutsroulette 99
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
                  "radial-gradient(circle at center, rgba(255,255,255,0.05) 0 46%, rgba(0,0,0,0.12) 46% 47%, transparent 47% 100%), repeating-conic-gradient(from -90deg, rgba(247,244,236,0.08) 0deg 0.35deg, transparent 0.35deg 3.6deg), conic-gradient(from -90deg, " +
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
            </div>
            <span
              className={`rounded-full border px-4 py-2 text-sm ${
                decision && decision.kind === "godkand"
                  ? "border-emerald-700/20 bg-emerald-50 text-emerald-900"
                  : "border-steel/20 bg-paper text-ink"
              }`}
            >
              {decision ? `Utfall ${decision.number}` : "Utfall väntar"}
            </span>
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

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={spin}
                  className="inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white"
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
