"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PageShell } from "@/components/page-shell";
import { statusMicrocopy } from "@/lib/microcopy";

type PromptAction =
  | "Ställ följdfråga"
  | "Ifrågasätt beslut"
  | "Vem har bestämt detta?"
  | "Begär tydlighet";

type HandlerStage = {
  title: string;
  department: string;
  posture: string;
  responseByAction: Record<PromptAction, string>;
};

const actions: PromptAction[] = [
  "Ställ följdfråga",
  "Ifrågasätt beslut",
  "Vem har bestämt detta?",
  "Begär tydlighet",
];

const stages: HandlerStage[] = [
  {
    title: "Handläggare 1, ärendesamordnare",
    department: "Första mottagningsytan",
    posture:
      "Vänlig, tillgänglig och fortfarande i kontakt med grundläggande ansvarskänsla.",
    responseByAction: {
      "Ställ följdfråga":
        "Tack för din följdfråga. Jag ska försöka hjälpa dig utifrån det som finns i ärendet, även om vissa delar redan nu verkar vilja tillhöra någon annan funktion.",
      "Ifrågasätt beslut":
        "Jag förstår att beslutet väcker frågor. Min roll här är att förklara det som går att förklara innan ärendet förs vidare till en mer specialiserad nivå av tvekan.",
      "Vem har bestämt detta?":
        "Beslutet har fattats i linje med vår ordinarie process. Jag kan just nu inte säga mer än att det inte känns som att det helt ligger hos mig.",
      "Begär tydlighet":
        "Jag ska vara så tydlig jag kan: det finns ett beslut, ett underlag och redan nu en antydan om att nästa steg sannolikt blir intern överlämning.",
    },
  },
  {
    title: "Handläggare 2, intern utredare",
    department: "Enheten för fördjupad genomgång",
    posture: "Artig, noggrann och märkbart mindre benägen att säga jag.",
    responseByAction: {
      "Ställ följdfråga":
        "Din fråga har noterats och satts i relation till befintlig dokumentation. Det kan dock finnas skäl att låta ärendet belysas i en annan intern ordning innan något närmare sägs.",
      "Ifrågasätt beslut":
        "Synpunkten förstås. Det bör samtidigt framhållas att nuvarande ställningstagande inte ensamt vilar på en enskild bedömning utan på ett processuellt sammanhang.",
      "Vem har bestämt detta?":
        "Frågan om beslutsfattande är begriplig men svår att knyta till en namngiven funktion, eftersom bedömningen vuxit fram genom flera samverkande led.",
      "Begär tydlighet":
        "Tydlighet eftersträvas, men vissa frågor blir först begripliga efter intern förädling och eventuellt ytterligare förflyttning inom kedjan.",
    },
  },
  {
    title: "Handläggare 3, omprövningskoordinator",
    department: "Samordnad intern översyn",
    posture:
      "Formell, välvillig och snabbt glidande mot ansvar som substantiv istället för person.",
    responseByAction: {
      "Ställ följdfråga":
        "Följdfrågan har överförts till rätt granskningsnivå. I detta skede är uppdraget främst att samordna, inte att äga innehållet i den samordning som sker.",
      "Ifrågasätt beslut":
        "Invändningen har uppmärksammats. Det är dock viktigt att skilja mellan upplevd orimlighet och sådan orimlighet som processmässigt kan tas om hand.",
      "Vem har bestämt detta?":
        "Det föreligger ingen helt enkel enskild beslutsbärare. Ärendet har passerat flera bedömningspunkter och bär därför ett mer kollektivt ansvarslöst uttryck.",
      "Begär tydlighet":
        "Ytterligare tydlighet kan möjligen uppstå efter att ärendet speglats mot våra interna omprövningsrutiner, vilka i sig kräver viss oklarhet för att fungera.",
    },
  },
  {
    title: "Handläggare 4, tillämpningsspecialist",
    department: "Avdelningen för regelmässig tolkning",
    posture:
      "Skarpt formell och märkbart tryggare i ordet tillämpning än i ordet hjälp.",
    responseByAction: {
      "Ställ följdfråga":
        "Det efterfrågade förtydligandet behöver förstås mot bakgrund av hur regelverket tillämpas, snarare än hur enskilda funktioner spontant skulle ha uttryckt sig.",
      "Ifrågasätt beslut":
        "Beslutet kan självfallet ifrågasättas. Det bör samtidigt erinras om att tillämpning inte nödvändigtvis sammanfaller med intuitiv rimlighet.",
      "Vem har bestämt detta?":
        "I strikt mening är det inte en fråga om vem utan om hur tillämpliga bestämmelser löpande givits verkan inom ärendets ramar.",
      "Begär tydlighet":
        "Den tydlighet som kan lämnas är att bedömningen inte ska läsas personligt utan normativt, vilket av erfarenhet ofta upplevs som mindre hjälpsamt men mer korrekt.",
    },
  },
  {
    title: "Handläggare 5, samordnande bedömningsresurs",
    department: "Resursnod för intern kvalitetssäkring",
    posture:
      "Nästan helt avpersonifierad, med stark tro på flöden, noder och styrande dokument.",
    responseByAction: {
      "Ställ följdfråga":
        "Det som efterfrågas ligger numera inom ramen för ett samordnat bedömningsflöde. Enskild återkoppling skulle därför riskera att ge ett alltför mänskligt intryck.",
      "Ifrågasätt beslut":
        "Ett ifrågasättande har registrerats som synpunkt på processutfall. Något personligt ställningstagande aktualiseras emellertid inte i denna resursfunktion.",
      "Vem har bestämt detta?":
        "Bedömningen ska förstås som resultatet av en kvalitetssäkrad kedja där ansvar fördelats så jämnt att det blivit svårt att lokalisera.",
      "Begär tydlighet":
        "Tydlighet tillhandahålls här främst i fråga om procedur, inte i fråga om tröst eller individuellt begriplig orsakskedja.",
    },
  },
  {
    title: "Handläggare 6, senior processföreträdare",
    department: "Processledande stödfunktion",
    posture:
      "Mycket hövlig, mycket abstrakt och tydligt skyddad av ordet process.",
    responseByAction: {
      "Ställ följdfråga":
        "Det bör framhållas att ytterligare frågor inte nödvändigtvis genererar ytterligare svar, utan i första hand utgör underlag för fortsatt processuell behandling.",
      "Ifrågasätt beslut":
        "Att beslutet ifrågasätts är i sig förenligt med ordningen. Själva beslutets bäring påverkas dock inte av att ordningen iakttas av den enskilde.",
      "Vem har bestämt detta?":
        "På denna nivå är frågan om personligt beslutsfattande mindre relevant än frågan om korrekt processförankring, vilken bedöms föreligga.",
      "Begär tydlighet":
        "Det som kan tydliggöras är att prövningen följer intern ordning. Mer individualiserad tydlighet skulle riskera att skapa förväntningar om påverkan.",
    },
  },
  {
    title: "Handläggare 7, rättslig orienterare",
    department: "Rättsligt närliggande samråd",
    posture:
      "Torr, juridiskt färgad och nästan helt fri från mellanmänsklig restprodukt.",
    responseByAction: {
      "Ställ följdfråga":
        "Fortsatta frågor får bedömas i ljuset av gällande bestämmelser och myndighetens tolkningsutrymme, snarare än i relation till tidigare kontaktpersoners uttryckssätt.",
      "Ifrågasätt beslut":
        "Det står dig fritt att ifrågasätta beslutet. Prövningen sker dock mot norm, författning och etablerad intern hållning, inte mot graden av begriplighet i det enskilda beskedet.",
      "Vem har bestämt detta?":
        "Beslutets uppkomst ska inte reduceras till individnivå. Det vilar på rättslig grund, intern mandatkedja och den sorts ansvar som helst uppträder i opersonlig form.",
      "Begär tydlighet":
        "Begäran om tydlighet har förståtts. Av rättssäkerhetsskäl lämnas dock företräde åt precision i form framför värme i innehåll.",
    },
  },
  {
    title: "Handläggare 8, normtillämpande granskningslänk",
    department: "Mandatburen slutberedning",
    posture:
      "Nästan fullständigt upplöst i mandat, styrning och hänvisning till överordnad ordning.",
    responseByAction: {
      "Ställ följdfråga":
        "Den fortsatta kommunikationen måste förstås som en del av myndighetsutövningens sammanhållna kedja, där den enskildes behov av samtal inte alltid sammanfaller med systemets uppdrag.",
      "Ifrågasätt beslut":
        "Frågor om rimlighet har ingen självständig bäring utanför den rättsliga och mandatmässiga struktur inom vilken bedömningen verkställts.",
      "Vem har bestämt detta?":
        "Det har inte bestämts av någon i vardaglig mening. Utfallet följer av norm, styrsignal, intern beredning och det utrymme som lämnats för opersonlig konsekvens.",
      "Begär tydlighet":
        "Det enda fullt tydliga är att ansvar här förstås systemiskt. Personlig förklaring skulle ge en missvisande bild av hur beslut i praktiken bärs utan bärare.",
    },
  },
  {
    title: "Handläggare 9, mandatförvaltande tillämpningsfunktion",
    department: "Slutlig hänvisning till lag, regering och system",
    posture: "Fullständigt institutionaliserad. Ingen person kvar, endast ordning.",
    responseByAction: {
      "Ställ följdfråga":
        "Ytterligare frågor hänförs i detta skede till gällande lagstiftning, regeringsuppdrag och myndighetens sammanhållna systemansvar. Någon personlig komplettering aktualiseras därför inte.",
      "Ifrågasätt beslut":
        "Det aktuella utfallet är inte att förstå som en individs hållning utan som en konsekvens av författning, mandat och den ordning staten förutsatt att myndigheten ska upprätthålla.",
      "Vem har bestämt detta?":
        "Det är ytterst lagstiftaren som angett ramen, regeringen som formulerat uppdraget och systemet som burit verkställigheten. Någon enskild handläggare står därför inte till förfogande som ansvarig gestalt.",
      "Begär tydlighet":
        "Tydlighet lämnas härmed i den utsträckning rättslig precision medger: ansvaret är normativt, mandatburet och systemfördelat. Det är därmed också praktiskt svårgripbart.",
    },
  },
];

export function HandlaggarkedjaSimulator() {
  const [stageIndex, setStageIndex] = useState(0);
  const [lastAction, setLastAction] = useState<PromptAction | null>(null);
  const [history, setHistory] = useState<Array<{ stage: number; action: PromptAction }>>([]);

  const stage = stages[stageIndex];
  const response = lastAction ? stage.responseByAction[lastAction] : null;
  const stageCount = stages.length;
  const canAdvance = stageIndex < stageCount - 1;
  const progress = (stageIndex + 1) / stageCount;
  const progressSegments = stages.map((_, index) => {
    if (index < stageIndex) {
      return "bg-[#d44a24]";
    }

    if (index === stageIndex) {
      return stageIndex === stageCount - 1 ? "bg-[#00cc66]" : "bg-[#c8102e]";
    }

    return "bg-white/16";
  });

  const nextHint = useMemo(() => {
    if (!canAdvance) {
      return "Ärendet har nu nått en nivå där ingen längre talar som person. Vidare kontakt förväntas ske direkt med ordningen som sådan.";
    }

    return "Vid nästa kontakt förs ärendet vidare till ytterligare funktion med högre formalitetsgrad och lägre känsla av ägarskap.";
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
      title="Handläggarkedja"
      intro="En interaktiv simulering av hur ansvar gradvis löses upp i artighet, process och hänvisningar till något större än människan framför dig."
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
          </div>

          <div className="mt-6 rounded-[1.35rem] border border-steel/15 bg-white/82 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Barometer</p>
              <p className="text-xs uppercase tracking-[0.28em] text-ink/72">{Math.round(progress * 100)} %</p>
            </div>
            <div className="mt-3 grid h-3 grid-cols-9 overflow-hidden rounded-full border border-steel/15 bg-white/72">
              {progressSegments.map((segmentClass, index) => (
                <div
                  key={`${segmentClass}-${index}`}
                  className={`transition-colors duration-300 ${segmentClass}`}
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-7 text-ink/76">
              Rött i början, sedan mer orange, och grönt först när hela kedjan har passerat.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[1.35rem] border border-steel/15 bg-paper/94 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/72">Funktion</p>
              <p className="mt-2 text-lg font-medium text-ink">{stage.department}</p>
              <p className="mt-4 text-sm leading-7 text-ink/76">{stage.posture}</p>
            </div>
            <div className="rounded-[1.35rem] border border-steel/15 bg-white/88 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
                Aktuell återkoppling
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/76">
                {statusMicrocopy.helperChain}
              </p>
              <p className="mt-4 text-base leading-8 text-ink">
                {response ??
                  "Du har nu nått en ny handläggare. Ställ en fråga eller invändning för att se hur ansvaret förfinas och förs vidare."}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.35rem] border border-steel/15 bg-white/82 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
              Nästa förskjutning
            </p>
            <p className="mt-3 text-sm leading-7 text-ink/76">{nextHint}</p>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
              Välj nästa kontaktförsök
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
                    Handläggarkedjan uppdateras
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
              <span>Börja om från Handläggare 1</span>
              <span className="text-xs font-normal text-paper/84">
                Ansvar återförs till första synliga person
              </span>
            </button>
            <Link
              href="/nadalage"
              className="inline-flex flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
            >
              <span>Växla till nådeläge</span>
              <span className="text-xs font-normal text-ink/72">
                Ett oväntat förtydligande har diarieförts
              </span>
            </Link>
          </div>
        </article>

        <aside className="bureaucratic-panel rise-fade rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(235,240,239,0.94),rgba(255,255,255,0.96))] p-6 shadow-slip">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">
            Förskjutning av ansvar
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
            Från person till process till system
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
                    Överlämning {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">
                    Efter "{entry.action}" fördes ärendet vidare från handläggare{" "}
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
