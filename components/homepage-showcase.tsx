"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

import { LogoMark } from "@/components/logo-mark";

const actions = [
  ["/friskforklaring", "Bli friskförklarad", "Primär prövning", "Verklighet konverteras till underlag"],
  ["/avslagsbrev", "Skapa avslagsbrev", "Standardiserat avslag", "Underlag avpersonifieras enligt rutin"],
  ["/handlaggarkedja", "Möt nästa handläggare", "Intern vidarekoppling", "Handläggarkedjan uppdateras"],
  ["/nadalage", "Aktivera nådeläge", "Tillfälligt undantag", "Ett oväntat förtydligande kan diarieföras."],
] as const;

const cards = [
  ["01", "Friskförklaring under ordnade former", "För dig som råkat återhämta dig utan föregående samråd och nu behöver ett beslut som återställer den administrativa ordningen."],
  ["02", "Avslagsbrev med korrekt myndig tyngd", "Generera ett nej som känns noggrant diariefört, omsorgsfullt formulerat och fullständigt omöjligt att invända mot."],
  ["03", "Handläggarkedja i realtid", "Se hur ditt ärende vandrar mellan enheter, semestertabeller och välmenande ansvarsförskjutning."],
  ["04", "Nådeläge vid administrativ nedisning", "När processen blivit för effektiv i sin känslokyla kan du begära ett kort avbrott från den ordinarie tonaliteten."],
] as const;

const bubbles = ["Intern omtolkning pågår…", "Du har nu väntat längre än genomsnittet.", "Verklighet konverteras till underlag.", "Handläggaren tar kaffe."];
const comments = ["Komplettering behövs.", "Tolkar om internt...", "Detta är inte mitt bord.", "Din tydlighet har diarieförts."];
const diary = [
  ["08:14", "Samlad bedömning startade i korridoren innan någon hunnit sitta ned."],
  ["10:02", "Ett tydligt ärende blev till tre interna tolkningar och en paus för kaffe."],
  ["13:27", "Beslutet såg människonära ut tills processen tog över rubriken."],
];
const stamps = ["AVSLAG", "INTERN OMTOLKNING", "UNDER ÖVERSYN", "VIDAREBEFORDRAT"];
const steps = [
  [3, "Administrativ förskjutning: 3 %", "Ärendet öppnas. Ingen behöver känna sig trygg ännu."],
  [12, "Administrativ förskjutning: 12 %", "Du har nu väntat längre än genomsnittet."],
  [24, "Administrativ förskjutning: 24 %", "Handläggaren tar kaffe."],
  [35, "Administrativ förskjutning: 35 %", "Verklighet konverteras till underlag."],
  [47, "Administrativ förskjutning: 47 %", "Ett personligt, absurt beslut är nu nästan färdigstämplat."],
] as const;

type Note = { id: string; text: string; style: CSSProperties };
type ShareTarget =
  | {
      label: string;
      description: string;
      kind: "link";
      buildHref: (url: string, text: string) => string;
    }
  | {
      label: string;
      description: string;
      kind: "copy";
      buildCopyText: (url: string, text: string) => string;
    }
  | {
      label: string;
      description: string;
      kind: "system";
    };

const r = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];
const notes = (): Note[] =>
  Array.from({ length: 3 }, (_, i) => ({
    id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
    text: r(bubbles),
    style: Math.random() > 0.5 ? { top: `${18 + i * 18}%`, left: `${8 + Math.random() * 16}%` } : { top: `${18 + i * 18}%`, right: `${8 + Math.random() * 16}%` },
  }));

const shareTargets: ShareTarget[] = [
  {
    label: "X",
    description: "Kort text och länk i ett klassiskt myndighetsflöde.",
    kind: "link",
    buildHref: (url, text) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    label: "Facebook",
    description: "Delar länken i ditt vanliga flöde.",
    kind: "link",
    buildHref: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "Messenger",
    description: "Öppnar Messenger om appen eller webbtjänsten finns tillgänglig.",
    kind: "link",
    buildHref: (url) => `fb-messenger://share/?link=${encodeURIComponent(url)}`,
  },
  {
    label: "WhatsApp",
    description: "Fungerar bra för snabb spridning i samtalstrådar.",
    kind: "link",
    buildHref: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
  },
  {
    label: "Telegram",
    description: "Öppnar Telegram med färdig länk och text.",
    kind: "link",
    buildHref: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    label: "LinkedIn",
    description: "Delar i ett mer professionellt flöde.",
    kind: "link",
    buildHref: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "Pinterest",
    description: "Delar bäst som länk med kort beskrivning.",
    kind: "link",
    buildHref: (url, text) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
  },
  {
    label: "Reddit",
    description: "Öppnar ett inläggsfönster med länk och rubrik.",
    kind: "link",
    buildHref: (url, text) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
  },
  {
    label: "Instagram",
    description: "Ingen direkt webblänk. Kopierar en caption som du kan klistra in i appen.",
    kind: "copy",
    buildCopyText: (url, text) => `${text}\n\n${url}\n#Förnedringskassan #Satir`,
  },
  {
    label: "E-post",
    description: "Skapar ett färdigt meddelande i din e-postklient.",
    kind: "link",
    buildHref: (url, text) =>
      `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
  },
  {
    label: "Dela via enhetsmeny",
    description: "Visar operativsystemets egna delningsruta när den finns.",
    kind: "system",
  },
];

const decision = (q: string) =>
  [
    `Tack för din översända begäran. Ärendet avser: "${q.trim() || "oklart önskemål"}".`,
    r([
      "Efter samlad helhetsbedömning konstateras att din önskan är rimlig i teorin men administrativt olämplig i praktiken.",
      "Underlaget bedöms som tillräckligt för att väcka förtroende, men inte tillräckligt för att förändra utfallet.",
      "Du har nu väntat längre än genomsnittet, vilket i denna process räknas som ett kvalitetsbevis.",
    ]),
    r([
      "Omprövning kan begäras efter att verkligheten hunnit ikapp formuläret.",
      "Ytterligare handlingar kan komma att efterfrågas i ett senare skede av samma skede.",
      "Ett mer detaljerat svar kan erhållas efter att nästa handläggare har sagt samma sak på annat sätt.",
    ]),
    r([
      "Du hänvisas därför till fortsatt väntan, komplettering eller en annan funktion som ännu inte har vaknat.",
      "Ärendet avslås med den vänliga precision som endast ett fiktivt system kan uppbåda.",
      "Beslutet blir att systemet fortsätter som vanligt och att din rimlighet får ligga kvar i kö.",
    ]),
    "Detta beslut är satiriskt, fiktivt och fullt möjligt att kopiera som text.",
  ].join(" ");

export function HomepageShowcase() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const progTimer = useRef<number | null>(null);
  const typeTimer = useRef<number | null>(null);
  const [stamp, setStamp] = useState(0);
  const [bubble, setBubble] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [hoverText, setHoverText] = useState("");
  const [n, setN] = useState<Note[]>(() => notes());
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [p, setP] = useState(0);
  const [pText, setPText] = useState("Administrativ förskjutning: 0 %");
  const [status, setStatus] = useState("Din tydlighet har diarieförts.");
  const [full, setFull] = useState("");
  const [typed, setTyped] = useState("");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const t1 = window.setInterval(() => setBubble((v) => (v + 1) % bubbles.length), 4200);
    const t2 = window.setInterval(() => setN(notes()), 6200);
    return () => {
      window.clearInterval(t1);
      window.clearInterval(t2);
    };
  }, []);

  useEffect(() => {
    if (!full) {
      setTyped("");
      return;
    }
    let i = 0;
    typeTimer.current = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length && typeTimer.current) {
        window.clearInterval(typeTimer.current);
        typeTimer.current = null;
      }
    }, 14);
    return () => {
      if (typeTimer.current) {
        window.clearInterval(typeTimer.current);
      }
    };
  }, [full]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => () => {
    progTimer.current && window.clearInterval(progTimer.current);
    typeTimer.current && window.clearInterval(typeTimer.current);
  }, []);

  const start = () => {
    setOpen(true);
    setCopied(false);
    setLinkCopied(false);
    setFull("");
    setTyped("");
    setQ("");
    setP(3);
    setPText("Administrativ förskjutning: 3 %");
    setStatus("Ärendet öppnas i ett lugnt men bestämt tempo.");
  };

  const advanceStamp = () => {
    setStamp((v) => (v + 1) % stamps.length);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!q.trim()) return setStatus("Komplettering behövs.");
    setFull("");
    setTyped("");
    setP(3);
    setPText("Administrativ förskjutning: 3 %");
    setStatus("Ärendet har mottagits och förskjutits in i ordnad väntan.");
    progTimer.current && window.clearInterval(progTimer.current);
    let i = 0;
    progTimer.current = window.setInterval(() => {
      const s = steps[i];
      if (!s) {
        progTimer.current && window.clearInterval(progTimer.current);
        progTimer.current = null;
        setP(47);
        setPText("Administrativ förskjutning: 47 %");
        setStatus("Ett oväntat förtydligande har diarieförts.");
        window.setTimeout(() => setFull(decision(q)), 350);
        return;
      }
      setP(s[0]); setPText(s[1]); setStatus(s[2]); i += 1;
    }, 800);
  };

  const copyDecision = async () => {
    if (!typed) return;
    await navigator.clipboard.writeText(typed);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const downloadDecision = () => {
    if (!typed) return;
    const blob = new Blob([typed], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fornedringskassan-beslut.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 1400);
  };

  const shareText = typed || full || "Jag fick ett beslut från Förnedringskassan.";

  const copyShareCaption = async () => {
    const caption = `${shareText}\n\n${window.location.href}`;
    await navigator.clipboard.writeText(caption);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1400);
  };

  const shareViaSystem = async () => {
    if (typeof navigator === "undefined" || !("share" in navigator)) {
      await copyShareCaption();
      return;
    }

    await navigator.share({
      title: "Förnedringskassan",
      text: shareText,
      url: window.location.href,
    });
  };

  const openShareTarget = async (target: ShareTarget) => {
    const url = window.location.href;

    if (target.kind === "link") {
      window.open(target.buildHref(url, shareText), "_blank", "noopener,noreferrer");
      return;
    }

    if (target.kind === "copy") {
      await navigator.clipboard.writeText(target.buildCopyText(url, shareText));
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 1400);
      return;
    }

    await shareViaSystem();
  };

  return (
    <div className="mx-auto max-w-6xl px-2 py-7 sm:px-6 lg:px-8 lg:py-14">
      <section className="bureaucratic-panel relative overflow-hidden rounded-dossier border border-steel/20 bg-white/88 shadow-docket">
        <div className="relative border-b border-steel/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(234,226,214,0.94))] px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[10px] uppercase tracking-[0.28em] text-stamp sm:text-xs">Byråkratisk satir i digital form</p>
                <span className="inline-flex rounded-full border border-[#c8102e]/20 bg-[#c8102e]/8 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-stamp sm:px-3 sm:text-[10px]">Fiktiv signal</span>
              </div>
              <p className="max-w-3xl text-[12px] leading-5 text-ink/76 sm:text-[13px] sm:leading-6">
                En digital parodi på system, blanketter och den sortens lugna nedkylning som bara kan komma från
                ordnade rutiner.
              </p>
            </div>
            <button type="button" onClick={advanceStamp} className="inline-flex min-h-10 items-center rounded-full border border-stamp/30 bg-stamp/10 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stamp transition hover:-translate-y-0.5 hover:bg-stamp/15">Byt stämpel</button>
          </div>
        </div>

        <div className="space-y-6 px-3 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="relative">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden min-[1600px]:block">
              {n.map((note) => (
                <div
                  key={note.id}
                  className="bubble-pop absolute max-w-[125px] rounded-full border border-stamp/15 bg-white/92 px-2.5 py-2 text-[8px] uppercase tracking-[0.1em] leading-[1.35] text-stamp shadow-sm"
                  style={note.style}
                >
                  {note.text}
                </div>
              ))}
            </div>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <header className="relative mt-1 flex w-full flex-col items-center gap-4 sm:gap-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-stamp sm:text-xs">
                Satirisk parodi. Inte en myndighet. Inte Försäkringskassan.
              </p>
              <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Välkommen till Förnedringskassan – Din guide i byråkratins labyrint
              </h1>
              <p className="max-w-2xl text-[13px] leading-6 text-ink/76 sm:text-[15px] sm:leading-7">
                Förnedringskassan är ett fiktivt serviceorgan för dig som behöver ett beslut, ett avslag eller en ny
                handläggare innan hoppet hinner återhämta sig.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex rounded-full border border-[#c8102e]/20 bg-[#c8102e]/8 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-stamp sm:px-3 sm:text-[10px]">
                  Fiktiv signal
                </span>
                <span className="inline-flex rounded-full border border-steel/20 bg-paper/92 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-ink/72 sm:text-[10px]">
                  Administrativ labyrint
                </span>
              </div>
            </header>
            <div className="mt-2">
              <button
                type="button"
                onClick={advanceStamp}
                className="stamp-drop inline-flex rotate-[-8deg] rounded-[1.1rem] border-[4px] border-stamp/80 bg-[#c8102e] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-[0_18px_32px_rgba(200,16,46,0.24)] ring-1 ring-stamp/20 transition hover:scale-[1.02] active:scale-[0.99] sm:px-5 sm:py-3 sm:text-xs"
              >
                {stamps[stamp]}
              </button>
            </div>
            <div className="mt-5 max-w-2xl rounded-[1.2rem] border border-stamp/20 bg-stamp/10 p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <p className="text-[9px] uppercase tracking-[0.18em] text-stamp sm:text-[10px]">Satirisk disclaimer</p>
                <span className="inline-flex rounded-full border border-[#ffcc00]/35 bg-[#ffcc00]/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink">Fiktiv signal</span>
              </div>
              <p className="mt-2.5 text-[12px] leading-5 text-ink sm:text-[13px] sm:leading-6">
                  Detta är en parodi och samhällskommentar. Ingen del är officiell, ingen del är juridisk eller medicinsk rådgivning, och inget här ska förväxlas med en verklig myndighet eller dess varumärke.
              </p>
            </div>
            <div className="mt-6 flex w-full flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center">
              <button onClick={start} className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-[#c8102e] bg-[#c8102e] px-6 py-3 text-[13px] font-black uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_rgba(200,16,46,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ad0d27] sm:w-auto sm:px-7 sm:py-3.5 sm:text-sm">
                  Starta mitt fiktiva ärende
                </button>
                <span className="inline-flex min-h-12 items-center justify-center rounded-full border border-steel/20 bg-paper/92 px-4 py-3 text-center text-[13px] text-ink/76 sm:px-5 sm:text-sm">
                  Din tydlighet har diarieförts.
                </span>
              </div>
              <div className="mt-3 inline-flex max-w-full rounded-full border border-[#ffcc00]/50 bg-[#ffcc00]/18 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-ink sm:px-4 sm:text-xs sm:tracking-[0.22em]">
                {bubbles[bubble]}
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2">
              {actions.map(([href, label, tone, sublabel], i) => (
                <Link
                  key={href}
                  href={href}
                  onMouseEnter={() => {
                    setHover(i);
                    setHoverText(r(comments));
                  }}
                  onMouseLeave={() => setHover(null)}
                  className={`paper-shuffle-hover relative min-h-28 overflow-hidden rounded-[1.45rem] border px-4 py-4 text-left transition-all duration-200 shadow-slip sm:px-5 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(29,42,45,0.16)] ${i === 0 ? "border-ink bg-ink text-paper hover:bg-seal" : "border-steel/20 bg-paper/92 text-ink hover:border-steel/45 hover:bg-white"}`}
                >
                  <span className="block text-[10px] uppercase tracking-[0.22em] opacity-70">{tone}</span>
                  <span className="mt-2 block text-sm font-semibold sm:text-base">{label}</span>
                  <span className="mt-1.5 block text-[13px] leading-5 opacity-70 sm:text-sm">{sublabel}</span>
                  {hover === i ? <span className={`bubble-pop absolute bottom-3 right-3 rounded-full border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] shadow-sm ${i === 0 ? "border-white/15 bg-white/10 text-paper" : "border-stamp/20 bg-white/92 text-stamp"}`}>{hoverText}</span> : null}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.25rem] border border-stamp/30 bg-paper/95 p-4 shadow-slip">
              <LogoMark compact showTagline={false} className="items-start" />
              <p className="mt-4 text-[12px] leading-5 text-ink sm:text-[13px] sm:leading-6">
                Ett påhittat märke med formulärblad, stämpelsigil och torr självuppfattning. Avsiktligt byråkratiskt, men inte lånat från någon verklig institution.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-steel/15 bg-white/86 p-4 shadow-slip">
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink/72 sm:text-xs">Visuell riktlinje</p>
              <p className="mt-2 text-[12px] leading-5 text-ink/76 sm:text-[13px] sm:leading-6">
                Klinisk beige, pappersgrått och en dämpad stämpelton. Tillräckligt sterilt för att kännas byråkratiskt, men tillräckligt egenartat för att inte kunna misstas för en offentlig identitet.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-stamp/20 bg-stamp/10 p-4 shadow-slip">
              <p className="text-[9px] uppercase tracking-[0.18em] text-stamp sm:text-[10px]">Handläggarbubblan</p>
              <p className="mt-2 text-sm leading-7 text-ink">{bubbles[bubble]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-sm uppercase tracking-[0.32em] text-ink/72">Huvudfunktioner</p><h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink">Verktyg för den som vill bli professionellt ifrågasatt</h2></div>
          <p className="max-w-2xl text-base leading-7 text-ink/76">Välj rätt kanal för ditt missöde. Samtliga tjänster är framtagna med samma respekt för individen som ett korrekt diariefört missförstånd.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(([idx, title, body], i) => (
            <Link key={title} href={actions[i][0]} className="bureaucratic-panel institution-card group relative min-h-56 overflow-hidden p-6 transition hover:-translate-y-1 hover:border-steel/40 hover:bg-white hover:shadow-[0_22px_48px_rgba(29,42,45,0.12)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(200,16,46,0.04),transparent_40%,rgba(255,204,0,0.08))] opacity-0 transition group-hover:opacity-100" />
              <p className="relative text-xs uppercase tracking-[0.3em] text-ink/72">Verktyg {idx}</p>
              <h3 className="relative mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{title}</h3>
              <p className="relative mt-4 text-base leading-7 text-ink/76">{body}</p>
              <span className="relative mt-6 inline-flex text-sm font-medium text-stamp">Öppna tjänst</span>
              <span className="relative mt-2 block text-xs uppercase tracking-[0.24em] text-ink/72">Intern omtolkning pågår</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <article className="bureaucratic-panel rounded-dossier border border-steel/20 bg-white/90 p-7 shadow-slip">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Handläggarens dagbok</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink">Små anteckningar från ett stort missförstånd</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {diary.map(([time, text]) => <div key={time} className="rounded-[1.25rem] border border-steel/15 bg-paper/92 p-4"><p className="text-xs uppercase tracking-[0.26em] text-stamp">{time}</p><p className="mt-3 text-sm leading-7 text-ink/76">{text}</p></div>)}
          </div>
        </article>
        <aside className="bureaucratic-panel rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,243,233,0.96))] p-7 shadow-slip">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Dela beslut</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink">Sprid missförståndet med stil</h2>
          <p className="mt-4 text-sm leading-7 text-ink/76">Välj plattform i en delningsruta, eller kopiera länken direkt. Instagram får en färdig caption, övriga tjänster öppnas med en förifylld länk när det går.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={copyUrl} className="inline-flex min-h-11 items-center justify-center rounded-full border border-steel/20 bg-paper px-5 py-3 text-sm font-medium text-ink transition hover:border-steel/45 hover:bg-white">{linkCopied ? "Länk kopierad" : "Kopiera länk"}</button>
            <button onClick={() => setShareOpen(true)} className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#c8102e] bg-[#c8102e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ad0d27]">Välj socialt nätverk</button>
          </div>
          <div className="mt-5 rounded-[1.25rem] border border-stamp/20 bg-stamp/10 p-4 text-sm leading-7 text-ink">Färdig text: <span className="font-medium">“Ett administrativt helt rimligt nej.”</span></div>
        </aside>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <article className="bureaucratic-panel overflow-hidden rounded-dossier border border-steel/20 bg-ink p-8 text-paper shadow-docket">
          <p className="text-xs uppercase tracking-[0.3em] text-paper/60">Nådeläge</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight">När regelverket skaver erbjuder vi ett kort avbrott i den mekaniska värdigheten.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-paper/82">I vanliga fall uttrycker vi oss i fasta formuleringar, med tydlig distans och välkontrollerad beklagan. I nådeläge byter vi till ett språk som antyder att du är en människa med omständigheter, inte bara ett ärende som kom in fel vecka.</p>
        </article>
        <aside className="bureaucratic-panel institution-card p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">Meddelande till besökare</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ink">Allt här är påhittat. Känslan är däremot obehagligt bekant.</h2>
          <p className="mt-5 text-base leading-8 text-ink/76">Den här sidan är en satirisk parodi på byråkrati, handläggarspråk och fördröjd välvilja. Ingen del är officiell, och ingen verklig myndighet står bakom innehållet, även om formuleringarna stundvis låter som att någon med pärm har granskat dem.</p>
          <Link href="/om" className="mt-8 inline-flex min-h-12 items-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white">Läs mer om projektet</Link>
        </aside>
      </section>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(29,42,45,0.68)] px-2 py-2 backdrop-blur-sm sm:px-3 sm:py-4" onClick={() => setOpen(false)} role="presentation">
          <div ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="case-modal-title" className="bureaucratic-panel relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(31,42,45,0.98),rgba(23,31,33,0.99))] p-3 text-paper shadow-[0_32px_80px_rgba(0,0,0,0.35)] sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.34em] text-paper/55">Starta mitt fiktiva ärende</p>
                <h2 id="case-modal-title" className="mt-3 text-balance font-display text-[2.15rem] font-semibold leading-tight tracking-tight sm:text-5xl">Vad vill du bli förnedrad för idag?</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-paper/78 sm:text-base">Skriv en kort fråga så låter vi den passera genom den administrativa förskjutningen, där allt blir tydligare och samtidigt mindre användbart.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="status-chip border-white/10 bg-white/8 text-paper">{pText}</span>
                <button onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-paper transition hover:bg-white/12">Stäng</button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.92fr]">
              <form onSubmit={submit} className="rounded-[1.4rem] border border-white/10 bg-paper p-4 text-ink shadow-slip sm:p-6">
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-ink/72 sm:text-sm sm:tracking-[0.24em]">Kort fråga</span>
                  <textarea value={q} onChange={(e) => setQ(e.target.value)} placeholder="Vad vill du bli förnedrad för idag?" className="mt-3 min-h-32 w-full rounded-[1.1rem] border border-steel/20 bg-white px-4 py-3 text-base leading-7 text-ink shadow-sm outline-none transition placeholder:text-ink/45 focus:border-stamp/45 focus:ring-2 focus:ring-stamp/10" />
                </label>
                  <div className="mt-4 flex flex-wrap gap-2">{["Beslut", "Avslag", "Otydlighet", "Nåd"].map((c) => <span key={c} className="rounded-full border border-steel/15 bg-[#f6f2eb] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink/72 sm:text-xs sm:tracking-[0.24em]">{c}</span>)}</div>
                <p className="mt-4 text-sm leading-7 text-ink/76">{status}</p>
                <button type="submit" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#c8102e] bg-[#c8102e] px-6 py-3 text-sm font-semibold text-white shadow-slip transition hover:-translate-y-0.5 hover:bg-[#ad0d27] sm:w-auto sm:px-7 sm:py-4">Skicka till handläggning</button>
              </form>

              <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4 shadow-slip sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-paper/55 sm:text-xs sm:tracking-[0.3em]">Administrativ förskjutning</p>
                  <span className="status-chip shrink-0 border-white/10 bg-white/8 text-paper">{p} %</span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#00cc66] transition-all duration-500" style={{ width: `${p}%` }} /></div>
                <p className="mt-4 text-sm leading-7 text-paper/80">{status}</p>
                <div className="mt-5 rounded-[1.3rem] border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-paper/55">Beslutstext</p>
                  <p className="typewriter-caret mt-3 min-h-28 whitespace-pre-line text-sm leading-7 text-paper/92 sm:min-h-32">{typed || "Beslut kommer att skrivas ut här i långsam takt."}</p>
                  <div className="mt-4 grid gap-2 sm:flex sm:flex-wrap">
                    <button type="button" onClick={copyDecision} disabled={!typed} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-paper transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50">{copied ? "Kopierat" : "Kopiera beslut"}</button>
                    <button type="button" onClick={downloadDecision} disabled={!typed} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-paper transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50">Ladda ner som PDF</button>
                  </div>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-paper/55">Textexport i PDF-klädsel</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button type="button" onClick={() => setShareOpen(true)} className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#c8102e] bg-[#c8102e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#ad0d27]">Välj socialt nätverk</button>
                    <button type="button" onClick={copyUrl} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-paper transition hover:bg-white/15">{linkCopied ? "Länk kopierad" : "Kopiera länk"}</button>
                  </div>
                  <div className="mt-4 inline-flex max-w-full rounded-full border border-[#ffcc00]/30 bg-[#ffcc00]/10 px-4 py-2 text-center text-[10px] uppercase tracking-[0.18em] text-paper/80 sm:text-xs sm:tracking-[0.24em]">{stamps[stamp]}</div>
                  <button type="button" onClick={advanceStamp} className="mt-4 inline-flex min-h-11 items-center rounded-full border border-[#ffcc00]/35 bg-[#ffcc00]/12 px-4 py-2 text-sm font-medium text-paper transition hover:bg-[#ffcc00]/18">Byt stämpeltext</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {shareOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(29,42,45,0.68)] px-2 py-2 backdrop-blur-sm sm:px-3 sm:py-4"
          onClick={() => setShareOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
            className="bureaucratic-panel relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(31,42,45,0.98),rgba(23,31,33,0.99))] p-3 text-paper shadow-[0_32px_80px_rgba(0,0,0,0.35)] sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.34em] text-paper/55">Delningsruta</p>
                <h2 id="share-modal-title" className="mt-3 text-balance font-display text-[2.15rem] font-semibold leading-tight tracking-tight sm:text-5xl">
                  Välj vart du vill dela beslutet
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-paper/78 sm:text-base">
                  Här finns de vanligaste sociala vägarna. Instagram får en caption att klistra in, Messenger och andra appar öppnas när webbläsaren tillåter det.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="status-chip border-white/10 bg-white/8 text-paper">{shareText.slice(0, 42)}</span>
                <button onClick={() => setShareOpen(false)} className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-paper transition hover:bg-white/12">Stäng</button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shareTargets.map((target) => (
                <button
                  key={target.label}
                  type="button"
                  onClick={() => void openShareTarget(target)}
                  className="rounded-[1.35rem] border border-white/10 bg-white/8 p-4 text-left transition hover:-translate-y-0.5 hover:bg-white/12"
                >
                  <p className="text-sm font-semibold text-paper">{target.label}</p>
                  <p className="mt-2 text-sm leading-6 text-paper/76">{target.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => void copyShareCaption()}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-paper transition hover:bg-white/15"
              >
                {shareCopied ? "Kopierat" : "Kopiera caption"}
              </button>
              <button
                type="button"
                onClick={() => void shareViaSystem()}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#c8102e] bg-[#c8102e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ad0d27]"
              >
                Dela via enhetsmenyn
              </button>
              <button
                type="button"
                onClick={copyUrl}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-paper transition hover:bg-white/15"
              >
                {linkCopied ? "Länk kopierad" : "Kopiera länk"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}
