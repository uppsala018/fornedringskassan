"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PageShell } from "@/components/page-shell";
import { statusMicrocopy } from "@/lib/microcopy";

type PromptAction =
  | "StĂ¤ll fĂ¶ljdfrĂĄga"
  | "IfrĂĄgasĂ¤tt beslut"
  | "Vem har bestĂ¤mt detta?"
  | "BegĂ¤r tydlighet";

type HandlerStage = {
  title: string;
  department: string;
  posture: string;
  responseByAction: Record<PromptAction, string>;
};

const actions: PromptAction[] = [
  "StĂ¤ll fĂ¶ljdfrĂĄga",
  "IfrĂĄgasĂ¤tt beslut",
  "Vem har bestĂ¤mt detta?",
  "BegĂ¤r tydlighet",
];

const stages: HandlerStage[] = [
  {
    title: "HandlĂ¤ggare 1, Ă¤rendesamordnare",
    department: "FĂ¶rsta mottagningsytan",
    posture:
      "VĂ¤nlig, tillgĂ¤nglig och fortfarande i kontakt med grundlĂ¤ggande ansvarskĂ¤nsla.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "Tack fĂ¶r din fĂ¶ljdfrĂĄga. Jag ska fĂ¶rsĂ¶ka hjĂ¤lpa dig utifrĂĄn det som finns i Ă¤rendet, Ă¤ven om vissa delar redan nu verkar vilja tillhĂ¶ra nĂĄgon annan funktion.",
      "IfrĂĄgasĂ¤tt beslut":
        "Jag fĂ¶rstĂĄr att beslutet vĂ¤cker frĂĄgor. Min roll hĂ¤r Ă¤r att fĂ¶rklara det som gĂĄr att fĂ¶rklara innan Ă¤rendet fĂ¶rs vidare till en mer specialiserad nivĂĄ av tvekan.",
      "Vem har bestĂ¤mt detta?":
        "Beslutet har fattats i linje med vĂĄr ordinarie process. Jag kan just nu inte sĂ¤ga mer Ă¤n att det inte kĂ¤nns som att det helt ligger hos mig.",
      "BegĂ¤r tydlighet":
        "Jag ska vara sĂĄ tydlig jag kan: det finns ett beslut, ett underlag och redan nu en antydan om att nĂ¤sta steg sannolikt blir intern Ă¶verlĂ¤mning.",
    },
  },
  {
    title: "HandlĂ¤ggare 2, intern utredare",
    department: "Enheten fĂ¶r fĂ¶rdjupad genomgĂĄng",
    posture: "Artig, noggrann och mĂ¤rkbart mindre benĂ¤gen att sĂ¤ga jag.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "Din frĂĄga har noterats och satts i relation till befintlig dokumentation. Det kan dock finnas skĂ¤l att lĂĄta Ă¤rendet belysas i en annan intern ordning innan nĂĄgot nĂ¤rmare sĂ¤gs.",
      "IfrĂĄgasĂ¤tt beslut":
        "Synpunkten fĂ¶rstĂĄs. Det bĂ¶r samtidigt framhĂĄllas att nuvarande stĂ¤llningstagande inte ensamt vilar pĂĄ en enskild bedĂ¶mning utan pĂĄ ett processuellt sammanhang.",
      "Vem har bestĂ¤mt detta?":
        "FrĂĄgan om beslutsfattande Ă¤r begriplig men svĂĄr att knyta till en namngiven funktion, eftersom bedĂ¶mningen vuxit fram genom flera samverkande led.",
      "BegĂ¤r tydlighet":
        "Tydlighet efterstrĂ¤vas, men vissa frĂĄgor blir fĂ¶rst begripliga efter intern fĂ¶rĂ¤dling och eventuellt ytterligare fĂ¶rflyttning inom kedjan.",
    },
  },
  {
    title: "HandlĂ¤ggare 3, omprĂ¶vningskoordinator",
    department: "Samordnad intern Ă¶versyn",
    posture:
      "Formell, vĂ¤lvillig och snabbt glidande mot ansvar som substantiv istĂ¤llet fĂ¶r person.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "FĂ¶ljdfrĂĄgan har Ă¶verfĂ¶rts till rĂ¤tt granskningsnivĂĄ. I detta skede Ă¤r uppdraget frĂ¤mst att samordna, inte att Ă¤ga innehĂĄllet i den samordning som sker.",
      "IfrĂĄgasĂ¤tt beslut":
        "InvĂ¤ndningen har uppmĂ¤rksammats. Det Ă¤r dock viktigt att skilja mellan upplevd orimlighet och sĂĄdan orimlighet som processmĂ¤ssigt kan tas om hand.",
      "Vem har bestĂ¤mt detta?":
        "Det fĂ¶religger ingen helt enkel enskild beslutsbĂ¤rare. Ă„rendet har passerat flera bedĂ¶mningspunkter och bĂ¤r dĂ¤rfĂ¶r ett mer kollektivt ansvarslĂ¶st uttryck.",
      "BegĂ¤r tydlighet":
        "Ytterligare tydlighet kan mĂ¶jligen uppstĂĄ efter att Ă¤rendet speglats mot vĂĄra interna omprĂ¶vningsrutiner, vilka i sig krĂ¤ver viss oklarhet fĂ¶r att fungera.",
    },
  },
  {
    title: "HandlĂ¤ggare 4, tillĂ¤mpningsspecialist",
    department: "Avdelningen fĂ¶r regelmĂ¤ssig tolkning",
    posture:
      "Skarpt formell och mĂ¤rkbart tryggare i ordet tillĂ¤mpning Ă¤n i ordet hjĂ¤lp.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "Det efterfrĂĄgade fĂ¶rtydligandet behĂ¶ver fĂ¶rstĂĄs mot bakgrund av hur regelverket tillĂ¤mpas, snarare Ă¤n hur enskilda funktioner spontant skulle ha uttryckt sig.",
      "IfrĂĄgasĂ¤tt beslut":
        "Beslutet kan sjĂ¤lvfallet ifrĂĄgasĂ¤ttas. Det bĂ¶r samtidigt erinras om att tillĂ¤mpning inte nĂ¶dvĂ¤ndigtvis sammanfaller med intuitiv rimlighet.",
      "Vem har bestĂ¤mt detta?":
        "I strikt mening Ă¤r det inte en frĂĄga om vem utan om hur tillĂ¤mpliga bestĂ¤mmelser lĂ¶pande givits verkan inom Ă¤rendets ramar.",
      "BegĂ¤r tydlighet":
        "Den tydlighet som kan lĂ¤mnas Ă¤r att bedĂ¶mningen inte ska lĂ¤sas personligt utan normativt, vilket av erfarenhet ofta upplevs som mindre hjĂ¤lpsamt men mer korrekt.",
    },
  },
  {
    title: "HandlĂ¤ggare 5, samordnande bedĂ¶mningsresurs",
    department: "Resursnod fĂ¶r intern kvalitetssĂ¤kring",
    posture:
      "NĂ¤stan helt avpersonifierad, med stark tro pĂĄ flĂ¶den, noder och styrande dokument.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "Det som efterfrĂĄgas ligger numera inom ramen fĂ¶r ett samordnat bedĂ¶mningsflĂ¶de. Enskild ĂĄterkoppling skulle dĂ¤rfĂ¶r riskera att ge ett alltfĂ¶r mĂ¤nskligt intryck.",
      "IfrĂĄgasĂ¤tt beslut":
        "Ett ifrĂĄgasĂ¤ttande har registrerats som synpunkt pĂĄ processutfall. NĂĄgot personligt stĂ¤llningstagande aktualiseras emellertid inte i denna resursfunktion.",
      "Vem har bestĂ¤mt detta?":
        "BedĂ¶mningen ska fĂ¶rstĂĄs som resultatet av en kvalitetssĂ¤krad kedja dĂ¤r ansvar fĂ¶rdelats sĂĄ jĂ¤mnt att det blivit svĂĄrt att lokalisera.",
      "BegĂ¤r tydlighet":
        "Tydlighet tillhandahĂĄlls hĂ¤r frĂ¤mst i frĂĄga om procedur, inte i frĂĄga om trĂ¶st eller individuellt begriplig orsakskedja.",
    },
  },
  {
    title: "HandlĂ¤ggare 6, senior processfĂ¶retrĂ¤dare",
    department: "Processledande stĂ¶dfunktion",
    posture:
      "Mycket hĂ¶vlig, mycket abstrakt och tydligt skyddad av ordet process.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "Det bĂ¶r framhĂĄllas att ytterligare frĂĄgor inte nĂ¶dvĂ¤ndigtvis genererar ytterligare svar, utan i fĂ¶rsta hand utgĂ¶r underlag fĂ¶r fortsatt processuell behandling.",
      "IfrĂĄgasĂ¤tt beslut":
        "Att beslutet ifrĂĄgasĂ¤tts Ă¤r i sig fĂ¶renligt med ordningen. SjĂ¤lva beslutets bĂ¤ring pĂĄverkas dock inte av att ordningen iakttas av den enskilde.",
      "Vem har bestĂ¤mt detta?":
        "PĂĄ denna nivĂĄ Ă¤r frĂĄgan om personligt beslutsfattande mindre relevant Ă¤n frĂĄgan om korrekt processfĂ¶rankring, vilken bedĂ¶ms fĂ¶religga.",
      "BegĂ¤r tydlighet":
        "Det som kan tydliggĂ¶ras Ă¤r att prĂ¶vningen fĂ¶ljer intern ordning. Mer individualiserad tydlighet skulle riskera att skapa fĂ¶rvĂ¤ntningar om pĂĄverkan.",
    },
  },
  {
    title: "HandlĂ¤ggare 7, rĂ¤ttslig orienterare",
    department: "RĂ¤ttsligt nĂ¤rliggande samrĂĄd",
    posture:
      "Torr, juridiskt fĂ¤rgad och nĂ¤stan helt fri frĂĄn mellanmĂ¤nsklig restprodukt.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "Fortsatta frĂĄgor fĂĄr bedĂ¶mas i ljuset av gĂ¤llande bestĂ¤mmelser och myndighetens tolkningsutrymme, snarare Ă¤n i relation till tidigare kontaktpersoners uttryckssĂ¤tt.",
      "IfrĂĄgasĂ¤tt beslut":
        "Det stĂĄr dig fritt att ifrĂĄgasĂ¤tta beslutet. PrĂ¶vningen sker dock mot norm, fĂ¶rfattning och etablerad intern hĂĄllning, inte mot graden av begriplighet i det enskilda beskedet.",
      "Vem har bestĂ¤mt detta?":
        "Beslutets uppkomst ska inte reduceras till individnivĂĄ. Det vilar pĂĄ rĂ¤ttslig grund, intern mandatkedja och den sorts ansvar som helst upptrĂ¤der i opersonlig form.",
      "BegĂ¤r tydlighet":
        "BegĂ¤ran om tydlighet har fĂ¶rstĂĄtts. Av rĂ¤ttssĂ¤kerhetsskĂ¤l lĂ¤mnas dock fĂ¶retrĂ¤de ĂĄt precision i form framfĂ¶r vĂ¤rme i innehĂĄll.",
    },
  },
  {
    title: "HandlĂ¤ggare 8, normtillĂ¤mpande granskningslĂ¤nk",
    department: "Mandatburen slutberedning",
    posture:
      "NĂ¤stan fullstĂ¤ndigt upplĂ¶st i mandat, styrning och hĂ¤nvisning till Ă¶verordnad ordning.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "Den fortsatta kommunikationen mĂĄste fĂ¶rstĂĄs som en del av myndighetsutĂ¶vningens sammanhĂĄllna kedja, dĂ¤r den enskildes behov av samtal inte alltid sammanfaller med systemets uppdrag.",
      "IfrĂĄgasĂ¤tt beslut":
        "FrĂĄgor om rimlighet har ingen sjĂ¤lvstĂ¤ndig bĂ¤ring utanfĂ¶r den rĂ¤ttsliga och mandatmĂ¤ssiga struktur inom vilken bedĂ¶mningen verkstĂ¤llts.",
      "Vem har bestĂ¤mt detta?":
        "Det har inte bestĂ¤mts av nĂĄgon i vardaglig mening. Utfallet fĂ¶ljer av norm, styrsignal, intern beredning och det utrymme som lĂ¤mnats fĂ¶r opersonlig konsekvens.",
      "BegĂ¤r tydlighet":
        "Det enda fullt tydliga Ă¤r att ansvar hĂ¤r fĂ¶rstĂĄs systemiskt. Personlig fĂ¶rklaring skulle ge en missvisande bild av hur beslut i praktiken bĂ¤rs utan bĂ¤rare.",
    },
  },
  {
    title: "HandlĂ¤ggare 9, mandatfĂ¶rvaltande tillĂ¤mpningsfunktion",
    department: "Slutlig hĂ¤nvisning till lag, regering och system",
    posture: "FullstĂ¤ndigt institutionaliserad. Ingen person kvar, endast ordning.",
    responseByAction: {
      "StĂ¤ll fĂ¶ljdfrĂĄga":
        "Ytterligare frĂĄgor hĂ¤nfĂ¶rs i detta skede till gĂ¤llande lagstiftning, regeringsuppdrag och myndighetens sammanhĂĄllna systemansvar. NĂĄgon personlig komplettering aktualiseras dĂ¤rfĂ¶r inte.",
      "IfrĂĄgasĂ¤tt beslut":
        "Det aktuella utfallet Ă¤r inte att fĂ¶rstĂĄ som en individs hĂĄllning utan som en konsekvens av fĂ¶rfattning, mandat och den ordning staten fĂ¶rutsatt att myndigheten ska upprĂ¤tthĂĄlla.",
      "Vem har bestĂ¤mt detta?":
        "Det Ă¤r ytterst lagstiftaren som angett ramen, regeringen som formulerat uppdraget och systemet som burit verkstĂ¤lligheten. NĂĄgon enskild handlĂ¤ggare stĂĄr dĂ¤rfĂ¶r inte till fĂ¶rfogande som ansvarig gestalt.",
      "BegĂ¤r tydlighet":
        "Tydlighet lĂ¤mnas hĂ¤rmed i den utstrĂ¤ckning rĂ¤ttslig precision medger: ansvaret Ă¤r normativt, mandatburet och systemfĂ¶rdelat. Det Ă¤r dĂ¤rmed ocksĂĄ praktiskt svĂĄrgripbart.",
    },
  },
];

export function HandlaggarkedjaSimulator() {
  const [stageIndex, setStageIndex] = useState(0);
  const [lastAction, setLastAction] = useState<PromptAction | null>(null);
  const [history, setHistory] = useState<Array<{ stage: number; action: PromptAction }>>([]);

  const stage = stages[stageIndex];
  const response = lastAction ? stage.responseByAction[lastAction] : null;
  const canAdvance = stageIndex < stages.length - 1;
  const stageCount = stages.length;
  const progress = (stageIndex + 1) / stageCount;
  const markerLeft = `calc(${Math.min(progress * 100, 100)}% - 0.75rem)`;
  const markerLabel = stageIndex === stageCount - 1 ? "Slut" : `Steg ${stageIndex + 1}`;

  const progressSegments = stages.map((_, index) => {
    const isActive = index <= stageIndex;
    const isCurrent = index === stageIndex;
    const isComplete = index < stageIndex;

    if (!isActive) {
      return "bg-white/12";
    }

    if (stageIndex === stageCount - 1) {
      return "bg-[#00cc66] barometer-segment-complete";
    }

    if (index === 0) {
      return `bg-[#c8102e] ${isCurrent ? "barometer-segment-active" : isComplete ? "barometer-segment-complete" : ""}`;
    }

    if (index === 1) {
      return `bg-[#d44a24] ${isCurrent ? "barometer-segment-active" : isComplete ? "barometer-segment-complete" : ""}`;
    }

    if (index === 2) {
      return `bg-[#de6f1d] ${isCurrent ? "barometer-segment-active" : isComplete ? "barometer-segment-complete" : ""}`;
    }

    if (index === 3) {
      return `bg-[#e88a17] ${isCurrent ? "barometer-segment-active" : isComplete ? "barometer-segment-complete" : ""}`;
    }

    if (index === 4) {
      return `bg-[#f0a10f] ${isCurrent ? "barometer-segment-active" : isComplete ? "barometer-segment-complete" : ""}`;
    }

    if (index === 5) {
      return `bg-[#b8bf2f] ${isCurrent ? "barometer-segment-active" : isComplete ? "barometer-segment-complete" : ""}`;
    }

    if (index === 6) {
      return `bg-[#7ec845] ${isCurrent ? "barometer-segment-active" : isComplete ? "barometer-segment-complete" : ""}`;
    }

    return `bg-[#00cc66] ${isCurrent ? "barometer-segment-active" : "barometer-segment-complete"}`;
  });

  const nextHint = useMemo(() => {
    if (!canAdvance) {
      return "Ă„rendet har nu nĂĄtt en nivĂĄ dĂ¤r ingen lĂ¤ngre talar som person. Vidare kontakt fĂ¶rvĂ¤ntas ske direkt med ordningen som sĂĄdan.";
    }

    return "Vid nĂ¤sta kontakt fĂ¶rs Ă¤rendet vidare till ytterligare funktion med hĂ¶gre formalitetsgrad och lĂ¤gre kĂ¤nsla av Ă¤garskap.";
  }, [canAdvance]);

  function handleAction(action: PromptAction) {
    setLastAction(action);
    setHistory((current) => [...current, { stage: stageIndex + 1, action }]);
    if (stageIndex < stages.length - 1) {
      setStageIndex((current) => current + 1);
    }
  }

  function reset() {
    setStageIndex(0);
    setLastAction(null);
    setHistory([]);
  }

  return (
    <PageShell
      title="HandlĂ¤ggarkedja"
      intro="En interaktiv simulering av hur ansvar gradvis lĂ¶ses upp i artighet, process och hĂ¤nvisningar till nĂĄgot stĂ¶rre Ă¤n mĂ¤nniskan framfĂ¶r dig."
    >
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <article className="bureaucratic-panel rise-fade overflow-hidden rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(239,242,241,0.94))] p-5 shadow-slip sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 border-b border-steel/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/72">
                Aktiv kontaktpunkt
              </p>
              <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
                {stage.title}
              </h2>
            </div>
            <div className="max-w-full rounded-2xl border border-steel/20 bg-paper/94 px-4 py-3 text-sm text-ink shadow-slip sm:px-5 sm:py-4 lg:max-w-[18rem]">
              HandlĂ¤ggare {stageIndex + 1} av {stages.length}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
                Barometer
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
                {Math.round(progress * 100)} %
              </p>
            </div>
            <div className="relative pt-6">
              <div
                className={`barometer-marker absolute top-0 z-10 flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-slip ${
                  stageIndex === stageCount - 1
                    ? "barometer-marker-final border-[#00cc66]/40 bg-[#00cc66] text-paper"
                    : "border-[#c8102e]/30 bg-white text-ink"
                }`}
                style={{ left: markerLeft }}
              >
                <span className="barometer-marker-dot h-2.5 w-2.5 rounded-full bg-current" />
                <span>{markerLabel}</span>
              </div>
              <div className="grid h-3 grid-cols-9 overflow-hidden rounded-full border border-steel/15 bg-white/72">
                {progressSegments.map((segmentClass, index) => (
                  <div
                    key={`${segmentClass}-${index}`}
                    className={`barometer-segment ${segmentClass} transition-all duration-500`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm leading-7 text-ink/76">
              Första steget är rött, sedan glider kedjan gradvis mot orange och först i slutet blir den grön.
            </p>
            {stageIndex === stageCount - 1 ? (
              <p className="text-xs uppercase tracking-[0.3em] text-[#00a95c]">
                Level complete. Beslutet har ännu inte fattats.
              </p>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[1.35rem] border border-steel/15 bg-paper/94 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Funktion</p>
              <p className="mt-2 text-lg font-medium text-ink">{stage.department}</p>
              <p className="mt-4 text-sm leading-7 text-ink/76">{stage.posture}</p>
            </div>
            <div className="rounded-[1.35rem] border border-steel/15 bg-white/88 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
                Aktuell ĂĄterkoppling
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/76">
                {statusMicrocopy.helperChain}
              </p>
              <p className="mt-4 text-base leading-8 text-ink">
                {response ??
                  "Du har nu nĂĄtt en ny handlĂ¤ggare. StĂ¤ll en frĂĄga eller invĂ¤ndning fĂ¶r att se hur ansvaret fĂ¶rfinas och fĂ¶rs vidare."}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.35rem] border border-steel/15 bg-white/82 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
              NĂ¤sta fĂ¶rskjutning
            </p>
            <p className="mt-3 text-sm leading-7 text-ink/76">{nextHint}</p>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
              VĂ¤lj nĂ¤sta kontaktfĂ¶rsĂ¶k
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {actions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => handleAction(action)}
                  className="inline-flex flex-col items-center justify-center rounded-2xl border border-steel/20 bg-paper/92 px-4 py-4 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-steel/45 hover:bg-white"
                >
                  <span>{action}</span>
                  <span className="text-xs font-normal text-ink/72">
                    HandlĂ¤ggarkedjan uppdateras
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex flex-col items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
            >
              <span>BĂ¶rja om frĂĄn HandlĂ¤ggare 1</span>
              <span className="text-xs font-normal text-paper/84">
                Ansvar ĂĄterfĂ¶rs till fĂ¶rsta synliga person
              </span>
            </button>
            <Link
              href="/nadalage"
              className="inline-flex flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
            >
              <span>VĂ¤xla till nĂĄdelĂ¤ge</span>
              <span className="text-xs font-normal text-ink/72">
                Ett ovĂ¤ntat fĂ¶rtydligande har diariefĂ¶rts
              </span>
            </Link>
          </div>
        </article>

        <aside className="bureaucratic-panel rise-fade rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(235,240,239,0.94),rgba(255,255,255,0.96))] p-6 shadow-slip">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">
            FĂ¶rskjutning av ansvar
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
            FrĂĄn person till process till system
          </h2>
          <div className="mt-5 space-y-4">
            {history.length === 0 ? (
              <p className="rounded-2xl border border-steel/15 bg-white/86 p-4 text-sm leading-7 text-ink/76">
                {statusMicrocopy.emptyChain}
              </p>
            ) : (
              history.map((entry, index) => (
                <div
                  key={`${entry.stage}-${index}`}
                  className="rise-fade rounded-2xl border border-steel/15 bg-white/88 p-4 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-ink/72">
                    Ă–verlĂ¤mning {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">
                    Efter "{entry.action}" fĂ¶rdes Ă¤rendet vidare frĂĄn handlĂ¤ggare{" "}
                    {entry.stage}.
                  </p>
                </div>
              ))
            )}
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

