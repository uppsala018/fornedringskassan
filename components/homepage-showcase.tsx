"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { LogoMark } from "@/components/logo-mark";

const mainActions = [
  {
    href: "/friskforklaring",
    label: "Bli friskförklarad",
    tone: "Primär prövning",
    sublabel: "Verklighet konverteras till underlag",
  },
  {
    href: "/avslagsbrev",
    label: "Skapa avslagsbrev",
    tone: "Standardiserat avslag",
    sublabel: "Underlag avpersonifieras enligt rutin",
  },
  {
    href: "/handlaggarkedja",
    label: "Möt nästa handläggare",
    tone: "Intern vidarekoppling",
    sublabel: "Handläggarkedjan uppdateras",
  },
  {
    href: "/nadalage",
    label: "Aktivera nådeläge",
    tone: "Tillfälligt undantag",
    sublabel: "Ett oväntat förtydligande kan inträffa",
  },
];

const featureCards = [
  {
    href: "/friskforklaring",
    index: "01",
    title: "Friskförklaring under ordnade former",
    body:
      "För dig som råkat återhämta dig utan föregående samråd och nu behöver ett beslut som återställer den administrativa ordningen.",
  },
  {
    href: "/avslagsbrev",
    index: "02",
    title: "Avslagsbrev med korrekt myndig tyngd",
    body:
      "Generera ett nej som känns noggrant diariefört, omsorgsfullt formulerat och fullständigt omöjligt att invända mot.",
  },
  {
    href: "/handlaggarkedja",
    index: "03",
    title: "Handläggarkedja i realtid",
    body:
      "Se hur ditt ärende vandrar mellan enheter, semestertabeller och välmenande ansvarsförskjutning.",
  },
  {
    href: "/nadalage",
    index: "04",
    title: "Nådeläge vid administrativ nedisning",
    body:
      "När processen blivit för effektiv i sin känslokyla kan du begära ett kort avbrott från den ordinarie tonaliteten.",
  },
];

const bubbles = [
  "Intern omtolkning pågår…",
  "Jag tror att det är en metafor…",
  "Komplettering behövs.",
  "Verklighet konverteras till underlag.",
  "Ett oväntat förtydligande har inträffat.",
];

const stampVariants = ["AVSLAG", "AVSLAG – men med känsla", "GODKÄNT (skämtar bara)"];

const progressStages = [
  {
    value: 3,
    text: "Administrativ förskjutning: 3 %",
    note: "Ärendet öppnas, granskas och placeras försiktigt i vänteläge.",
  },
  {
    value: 12,
    text: "Administrativ förskjutning: 12 %",
    note: "Din tydlighet har registrerats och skickats vidare till en lugnare funktion.",
  },
  {
    value: 27,
    text: "Administrativ förskjutning: 27 %",
    note: "Verklighet konverteras till underlag. Det går långsamt, men med vana.",
  },
  {
    value: 48,
    text: "Administrativ förskjutning: 48 %",
    note: "Du har nu väntat längre än genomsnittet för liknande abstraktioner.",
  },
  {
    value: 71,
    text: "Administrativ förskjutning: 71 %",
    note: "Komplettering har begärts av en process som ännu inte fått dina uppgifter.",
  },
  {
    value: 100,
    text: "Administrativ förskjutning: 100 %",
    note: "Ett slutligt, hövligt och djupt tveksamt besked är nu redo.",
  },
];

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildDecision(question: string) {
  const inquiry = question.trim() || "oklart önskemål";
  const openings = [
    "Tack för din översända begäran.",
    "Vi har tagit del av ditt ärende med den allvarliga lätthet som uppgiften kräver.",
    "Din fråga har mottagits, diarieförts och betraktats från ett säkert avstånd.",
  ];
  const assessments = [
    "Efter samlad helhetsbedömning konstateras att din önskan är rimlig i teorin men administrativt olämplig i praktiken.",
    "Underlaget bedöms som tillräckligt för att väcka förtroende, men inte tillräckligt för att förändra utfallet.",
    "Handläggningen har visat att frågan är begriplig, vilket tyvärr inte hjälper i beslutsskedet.",
  ];
  const conclusions = [
    "Du hänvisas därför till fortsatt väntan, komplettering eller annan funktion som ännu inte har öppnat.",
    "Ärendet avslås med den vänliga precision som endast ett fiktivt system kan uppbåda.",
    "Beslutet blir att systemet fortsätter som vanligt och att din rimlighet får ligga kvar i kö.",
  ];
  const supplements = [
    "Omprövning kan begäras efter att verkligheten hunnit ikapp formuläret.",
    "Ytterligare handlingar kan komma att efterfrågas i ett senare skede av samma skede.",
    "Ett mer detaljerat svar kan erhållas efter att nästa handläggare har sagt samma sak på annat sätt.",
  ];

  return [
    `${pickRandom(openings)} Ärendet avser: "${inquiry}".`,
    pickRandom(assessments),
    pickRandom(supplements),
    pickRandom(conclusions),
    "Detta beslut är satiriskt, fiktivt och fullt möjligt att kopiera som text.",
  ].join(" ");
}

export function HomepageShowcase() {
  const caseRef = useRef<HTMLDivElement | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const typingTimerRef = useRef<number | null>(null);

  const [stampIndex, setStampIndex] = useState(0);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [caseOpen, setCaseOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("Administrativ förskjutning: 0 %");
  const [statusLine, setStatusLine] = useState("Din tydlighet har registrerats.");
  const [generatedDecision, setGeneratedDecision] = useState("");
  const [typedDecision, setTypedDecision] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "done">("idle");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBubbleIndex((current) => (current + 1) % bubbles.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!generatedDecision) {
      setTypedDecision("");
      return;
    }

    let index = 0;
    setTypedDecision("");

    typingTimerRef.current = window.setInterval(() => {
      index += 1;
      setTypedDecision(generatedDecision.slice(0, index));

      if (index >= generatedDecision.length && typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    }, 14);

    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [generatedDecision]);

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
      }
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  const cycleStamp = () => {
    setStampIndex((current) => (current + 1) % stampVariants.length);
  };

  const openCase = () => {
    setCaseOpen(true);
    setCopyState("idle");
    setGeneratedDecision("");
    setTypedDecision("");
    setProgress(0);
    setProgressText("Administrativ förskjutning: 3 %");
    setStatusLine("Ärendet öppnas i ett lugnt men bestämt tempo.");

    window.setTimeout(() => {
      caseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const submitCase = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setStatusLine("Komplettering behövs.");
      return;
    }

    setCopyState("idle");
    setGeneratedDecision("");
    setTypedDecision("");
    setProgress(3);
    setProgressText("Administrativ förskjutning: 3 %");
    setStatusLine("Ärendet har mottagits och förskjutits in i ordnad väntan.");

    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
    }

    let stage = 0;
    progressTimerRef.current = window.setInterval(() => {
      const step = progressStages[stage];
      if (!step) {
        if (progressTimerRef.current) {
          window.clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
        }
        setProgress(100);
        setProgressText("Administrativ förskjutning: 100 %");
        setStatusLine("Ett oväntat förtydligande har inträffat.");
        window.setTimeout(() => {
          setGeneratedDecision(buildDecision(trimmedQuestion));
        }, 450);
        return;
      }

      setProgress(step.value);
      setProgressText(step.text);
      setStatusLine(step.note);
      stage += 1;
    }, 850);
  };

  const copyDecision = async () => {
    if (!typedDecision) {
      return;
    }

    await navigator.clipboard.writeText(typedDecision);
    setCopyState("done");
    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  const downloadDecision = () => {
    if (!typedDecision) {
      return;
    }

    const blob = new Blob([typedDecision], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fornedringskassan-beslut.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 py-7 sm:px-6 lg:px-8 lg:py-14">
      <section className="bureaucratic-panel overflow-hidden rounded-dossier border border-steel/20 bg-white/84 shadow-docket">
        <div className="relative border-b border-steel/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(234,226,214,0.94))] px-4 py-4 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs uppercase tracking-[0.34em] text-stamp">
                  Satirisk parodi. Inte en myndighet. Inte Försäkringskassan.
                </p>
                <span className="inline-flex rounded-full border border-[#c8102e]/20 bg-[#c8102e]/8 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-stamp">
                  Fiktiv signal
                </span>
              </div>
              <p className="max-w-4xl text-sm leading-7 text-steel">
                Förnedringskassan är ett fiktivt serviceorgan för dig som behöver ett beslut,
                ett avslag eller en ny handläggare innan hoppet hinner återhämta sig.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={cycleStamp}
                className="inline-flex min-h-11 items-center rounded-full border border-stamp/30 bg-stamp/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stamp transition hover:-translate-y-0.5 hover:bg-stamp/15"
              >
                Byt stämpel
              </button>
              <span className="status-chip">{bubbles[bubbleIndex]}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:px-10 lg:py-10">
          <div className="relative">
            <div className="inline-flex max-w-full flex-wrap rounded-full border border-stamp/20 bg-stamp/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-stamp sm:tracking-[0.3em]">
              Central enhet för formellt missmod
            </div>

            <div className="relative mt-6">
              <div className="absolute -top-4 right-0 hidden rotate-[-9deg] sm:block">
                <button
                  type="button"
                  onClick={cycleStamp}
                  className="stamp-drop rounded-[1.35rem] border-4 border-stamp/80 bg-[#c8102e] px-5 py-3 text-sm font-black uppercase tracking-[0.24em] text-white shadow-[0_18px_40px_rgba(200,16,46,0.25)] ring-1 ring-stamp/20 transition hover:scale-[1.02]"
                >
                  {stampVariants[stampIndex]}
                </button>
              </div>

              <p className="text-sm uppercase tracking-[0.34em] text-steel">Ärendets framsida</p>
              <h1 className="mt-4 max-w-4xl font-display text-[2.85rem] font-semibold leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                <span className="block text-sm font-semibold uppercase tracking-[0.35em] text-stamp">
                  #
                </span>
                Förnedringskassan
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-steel sm:text-lg sm:leading-8">
                Vi prövar din mänskliga rimlighet enligt intern rutin FÖRN-01.
              </p>

              <div className="mt-6 rounded-[1.35rem] border border-stamp/20 bg-stamp/10 p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-stamp">
                  Satirisk disclaimer
                </p>
                <p className="mt-3 text-sm leading-7 text-ink">
                  Detta är en parodi och samhällskommentar. Ingen del är officiell, ingen del
                  är juridisk eller medicinsk rådgivning, och inget här ska förväxlas med en
                  verklig myndighet eller dess varumärke.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={openCase}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#c8102e] bg-[#c8102e] px-6 py-3 text-sm font-semibold text-white shadow-slip transition hover:-translate-y-0.5 hover:bg-[#ad0d27] sm:w-auto"
                >
                  Starta mitt fiktiva ärende
                </button>
                <span className="inline-flex min-h-12 items-center justify-center rounded-full border border-steel/20 bg-paper px-5 py-3 text-center text-sm text-steel">
                  Din tydlighet har registrerats.
                </span>
              </div>

              <div className="mt-4 inline-flex max-w-full rounded-full border border-[#ffcc00]/50 bg-[#ffcc00]/18 px-4 py-2 text-center text-xs uppercase tracking-[0.22em] text-ink sm:tracking-[0.28em]">
                Intern omtolkning pågår…
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2">
              {mainActions.map((action, index) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={[
                    "group paper-shuffle-hover relative overflow-hidden rounded-[1.45rem] border px-4 py-4 min-h-24 transition shadow-slip sm:px-5",
                    index === 0
                      ? "border-ink bg-ink text-paper hover:bg-seal"
                      : "border-steel/20 bg-paper/90 text-ink hover:border-steel/45 hover:bg-white",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute right-3 top-3 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] opacity-0 transition group-hover:opacity-100 sm:tracking-[0.24em]",
                      index === 0
                        ? "border-white/20 bg-white/10 text-paper"
                        : "border-stamp/25 bg-stamp/8 text-stamp",
                    ].join(" ")}
                  >
                    Intern omtolkning pågår…
                  </span>
                  <span className="block text-xs uppercase tracking-[0.28em] opacity-70">
                    {action.tone}
                  </span>
                  <span className="mt-2 block text-base font-semibold">{action.label}</span>
                  <span className="mt-2 block text-sm opacity-70">{action.sublabel}</span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-dossier border border-dashed border-steel/25 bg-paper/95 p-6">
            <div className="absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-stamp/30 to-transparent" />
            <div className="grid min-h-72 place-items-center rounded-[1.5rem] border border-steel/15 bg-ledger bg-[size:24px_24px] bg-center p-5 sm:p-6">
              <div className="w-full max-w-sm rounded-[1.5rem] border border-stamp/30 bg-white/92 p-5 shadow-slip sm:p-6">
                <LogoMark className="items-start" />
              <p className="mt-5 text-sm leading-7 text-ink">
                Ett påhittat märke med formulärblad, stämpelsigil och torr självuppfattning.
                Avsiktligt byråkratiskt, men inte lånat från någon verklig institution.
              </p>
              </div>
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-steel/15 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-steel">
                Visuell riktlinje
              </p>
              <p className="mt-2 text-sm leading-7 text-steel">
                Klinisk beige, pappersgrått och en dämpad stämpelton. Tillräckligt sterilt för
                att kännas byråkratiskt, men tillräckligt egenartat för att inte kunna misstas
                för en offentlig identitet.
              </p>
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-stamp/20 bg-stamp/10 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-stamp">Handläggarbubblan</p>
              <p className="mt-2 text-sm leading-7 text-ink">{bubbles[bubbleIndex]}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-steel">Huvudfunktioner</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
              Verktyg för den som vill bli professionellt ifrågasatt
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-steel">
            Välj rätt kanal för ditt missöde. Samtliga tjänster är framtagna med samma
            respekt för individen som ett korrekt diariefört missförstånd.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bureaucratic-panel institution-card group relative min-h-56 overflow-hidden p-6 transition hover:-translate-y-0.5 hover:border-steel/40 hover:bg-white"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(200,16,46,0.04),transparent_40%,rgba(255,204,0,0.08))] opacity-0 transition group-hover:opacity-100" />
              <p className="relative text-xs uppercase tracking-[0.3em] text-steel">
                Verktyg {card.index}
              </p>
              <h3 className="relative mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                {card.title}
              </h3>
              <p className="relative mt-4 text-base leading-7 text-steel">{card.body}</p>
              <span className="relative mt-6 inline-flex text-sm font-medium text-stamp">
                Öppna tjänst
              </span>
              <span className="relative mt-2 block text-xs uppercase tracking-[0.24em] text-steel">
                Intern omtolkning pågår
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        ref={caseRef}
        className={[
          "mt-12 scroll-mt-24 bureaucratic-panel transition",
          caseOpen ? "rise-fade" : "",
        ].join(" ")}
      >
        <div className="overflow-hidden rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(31,42,45,0.96),rgba(23,31,33,0.98))] p-4 text-paper shadow-docket sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-paper/55">
                Starta mitt fiktiva ärende
              </p>
              <h2 className="mt-3 font-display text-[2rem] font-semibold tracking-tight sm:text-5xl">
                Vad vill du bli förnedrad för idag?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-paper/78 sm:text-base">
                Skriv en kort fråga så låter vi den passera genom den administrativa
                förskjutningen, där allt blir tydligare och samtidigt mindre användbart.
              </p>
            </div>
            <div className="status-chip max-w-full justify-center border-white/10 bg-white/8 text-center text-paper">
              {progressText}
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.92fr]">
            <form
              onSubmit={submitCase}
              className="rounded-[1.4rem] border border-white/10 bg-paper p-4 text-ink shadow-slip sm:p-6"
            >
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-steel sm:text-sm sm:tracking-[0.24em]">
                  Kort fråga
                </span>
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Vad vill du bli förnedrad för idag?"
                  className="mt-3 min-h-32 w-full rounded-[1.1rem] border border-steel/20 bg-white px-4 py-3 text-base leading-7 text-ink shadow-sm outline-none transition placeholder:text-steel/45 focus:border-stamp/45 focus:ring-2 focus:ring-stamp/10"
                />
              </label>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Beslut",
                  "Avslag",
                  "Otydlighet",
                  "Nåd",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-steel/15 bg-[#f6f2eb] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-steel sm:text-xs sm:tracking-[0.24em]"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-7 text-steel">
                {statusLine}
              </p>

              <button
                type="submit"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#c8102e] bg-[#c8102e] px-6 py-3 text-sm font-semibold text-white shadow-slip transition hover:-translate-y-0.5 hover:bg-[#ad0d27] sm:w-auto"
              >
                Skicka till handläggning
              </button>
            </form>

            <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4 shadow-slip sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-paper/55 sm:text-xs sm:tracking-[0.3em]">
                  Administrativ förskjutning
                </p>
                <span className="status-chip shrink-0 border-white/10 bg-white/8 text-paper">
                  {progress} %
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#00cc66] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-4 text-sm leading-7 text-paper/80">{statusLine}</p>

              <div className="mt-5 rounded-[1.3rem] border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-paper/55">
                  Beslutstext
                </p>
                <p className="typewriter-caret mt-3 min-h-28 whitespace-pre-line text-sm leading-7 text-paper/92 sm:min-h-32">
                  {typedDecision || "Beslut kommer att skrivas ut här i långsam takt."}
                </p>

                <div className="mt-4 grid gap-2 sm:flex sm:flex-wrap">
                  <button
                    type="button"
                    onClick={copyDecision}
                    disabled={!typedDecision}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-paper transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {copyState === "done" ? "Kopierat" : "Kopiera text"}
                  </button>
                  <button
                    type="button"
                    onClick={downloadDecision}
                    disabled={!typedDecision}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-paper transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Ladda ner som text
                  </button>
                  <button
                    type="button"
                    onClick={cycleStamp}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ffcc00]/35 bg-[#ffcc00]/12 px-4 py-2 text-sm font-medium text-paper transition hover:bg-[#ffcc00]/18"
                  >
                    Byt stämpeltext
                  </button>
                </div>

                <div className="mt-4 inline-flex max-w-full rounded-full border border-[#ffcc00]/30 bg-[#ffcc00]/10 px-4 py-2 text-center text-[10px] uppercase tracking-[0.18em] text-paper/80 sm:text-xs sm:tracking-[0.24em]">
                  {stampVariants[stampIndex]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <article className="bureaucratic-panel overflow-hidden rounded-dossier border border-steel/20 bg-ink p-8 text-paper shadow-docket">
          <p className="text-xs uppercase tracking-[0.3em] text-paper/60">Nådeläge</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            När regelverket skaver erbjuder vi ett kort avbrott i den mekaniska värdigheten.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-paper/82">
            I vanliga fall uttrycker vi oss i fasta formuleringar, med tydlig distans och
            välkontrollerad beklagan. I nådeläge byter vi till ett språk som antyder att du
            är en människa med omständigheter, inte bara ett ärende som kom in fel vecka.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-white/12 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-paper/55">
              Språklig kontrast
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-paper/50">
                  Ordinarie ton
                </p>
                <p className="mt-3 text-sm leading-7 text-paper/78">
                  Din upplevelse har noterats men saknar för närvarande bäring på beslutets
                  utfall.
                </p>
              </div>
              <div className="rounded-2xl border border-ledger/20 bg-ledger/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-paper/50">Nådeläge</p>
                <p className="mt-3 text-sm leading-7 text-paper/92">
                  Det låter tungt. Vi ska åtminstone försöka svara som om du faktiskt behöver
                  ett svar.
                </p>
              </div>
            </div>
          </div>
        </article>

        <aside className="bureaucratic-panel institution-card p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-steel">
            Meddelande till besökare
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
            Allt här är påhittat. Känslan är däremot obehagligt bekant.
          </h2>
          <p className="mt-5 text-base leading-8 text-steel">
            Den här sidan är en satirisk parodi på byråkrati, handläggarspråk och fördröjd
            välvilja. Ingen del är officiell, och ingen verklig myndighet står bakom
            innehållet, även om formuleringarna stundvis låter som att någon med pärm har
            granskat dem.
          </p>
          <Link
            href="/om"
            className="mt-8 inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
          >
            Läs mer om projektet
          </Link>
        </aside>
      </section>
    </div>
  );
}
