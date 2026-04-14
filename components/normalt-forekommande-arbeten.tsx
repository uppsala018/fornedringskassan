"use client";

import { useMemo, useState } from "react";

import { PageShell } from "@/components/page-shell";
import {
  globalApplyOutcomes,
  jobCategories,
  jobs,
  type JobCategory,
  type JobRecord,
} from "@/lib/normala-jobb";

type FilterCategory = "Alla" | JobCategory;

function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function absurdityLabel(level: number) {
  if (level >= 9) return "Systemiskt högprioriterad";
  if (level >= 7) return "Utvidgat matchningsläge";
  if (level >= 5) return "Administrativt tänkbar";
  return "Formellt prövbar";
}

function pickOutcome(job: JobRecord) {
  const outcomePool = [...job.applyOutcomes, ...globalApplyOutcomes];
  return outcomePool[Math.floor(Math.random() * outcomePool.length)];
}

const wrappedJobTitles: Record<string, string> = {
  "Vindparkeringsassistent": "Vindparkerings\nassistent",
  "Symbolisk projektmedarbetare": "Symbolisk\nprojektmedarbetare",
  "Existentiell lagerinventerare": "Existentiell\nlagerinventerare",
  "Biträdande tomhetskonsult": "Biträdande\ntomhetskonsult",
  "Dörröppnare med utökad serviceprofil": "Dörröppnare med\nutökad serviceprofil",
  "Handväskebärare åt samhällsviktig person": "Handväskebärare åt\nsamhällsviktig person",
  "Särskild handläggare för normalt förekommande arbete":
    "Särskild handläggare\nför normalt förekommande arbete",
  "Privat dörrknackningsföreträdare": "Privat\ndörrknackningsföreträdare",
  "Förvarningsmottagare av obehagliga besked": "Förvarningsmottagare\nav obehagliga besked",
  "Ansiktsuttrycksjusterare inför pressbild": "Ansiktsuttrycksjusterare\ninför pressbild",
  "Personlig skobytarkoordinator": "Personlig\nskobytarkoordinator",
};

function formatJobTitle(title: string) {
  return wrappedJobTitles[title] ?? title;
}

function renderJobTitle(title: string) {
  if (title === "Vindparkeringsassistent") {
    return (
      <>
        <span className="block">Vindparkerings</span>
        <span className="block">assistent</span>
      </>
    );
  }

  if (title === "Förvarningsmottagare av obehagliga besked") {
    return (
      <>
        <span className="block">Förvarnings</span>
        <span className="block">mottagare av</span>
        <span className="block">obehagliga besked</span>
      </>
    );
  }

  return <span className="whitespace-pre-line break-words">{formatJobTitle(title)}</span>;
}

export function NormaltForekommandeArbetenPage() {
  const [category, setCategory] = useState<FilterCategory>("Alla");
  const [seed, setSeed] = useState(0);
  const [outcomesById, setOutcomesById] = useState<Record<string, string>>({});

  const categories: FilterCategory[] = ["Alla", ...jobCategories];

  const visibleJobs = useMemo(() => {
    const filteredJobs =
      category === "Alla" ? jobs : jobs.filter((job) => job.category === category);

    return shuffle(filteredJobs).slice(0, 9);
  }, [category, seed]);

  function handleApply(job: JobRecord) {
    setOutcomesById((current) => ({
      ...current,
      [job.id]: pickOutcome(job),
    }));
  }

  return (
    <PageShell
      title="Normalt förekommande arbeten"
      intro="Du har nu, efter samlad bedömning, överförts till Arbetsförnedringen för fortsatt matchning mot arbeten som anses rimliga i den mån rimlighet kan upprätthållas av tillräckligt många interna funktioner."
    >
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="bureaucratic-panel rise-fade overflow-hidden rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(239,243,247,0.94))] p-6 shadow-slip">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">
            Överlämning till ny funktion
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
            Arbetsförnedringen har tagit emot ärendet
          </h2>
          <p className="mt-4 text-base leading-8 text-ink/76">
            Efter att du administrativt friskförklarats har din fortsatta
            försörjningsvärdighet överförts till en separat satirisk funktion för
            arbetsmatchning, intern omtolkning och kontrollerad verklighetsförskjutning.
          </p>

          <div className="mt-5 rounded-[1.35rem] border border-steel/15 bg-white/86 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-ink/72">
              Samlad bedömning
            </p>
            <p className="mt-3 text-sm leading-7 text-ink/76">
              Följande arbeten bedöms som rimliga enligt samlad bedömning, tillgängligt
              underlag och en tillfälligt utvidgad uppfattning om vad som normalt kan anses
              förekomma.
            </p>
          </div>
        </article>

        <aside className="bureaucratic-panel rise-fade rounded-dossier border border-steel/20 bg-[linear-gradient(180deg,rgba(235,239,244,0.92),rgba(255,255,255,0.92))] p-6 shadow-slip">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/72">
            Filtrering av möjligheter
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
            Kategorisera din nya rimlighet
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink/76">
            Urvalet kan avgränsas efter hur teoretiskt, symboliskt eller administrativt
            oförankrat arbetet bedöms vara.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((item) => {
              const isActive = item === category;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={[
                    "min-h-12 rounded-2xl border px-4 py-3 text-sm transition",
                    isActive
                    ? "border-ink bg-ink text-paper shadow-slip"
                      : "border-steel/20 bg-white/90 text-ink hover:border-steel/45 hover:bg-white",
                  ].join(" ")}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setSeed((current) => current + 1)}
            className="mt-5 inline-flex min-h-12 flex-col items-center justify-center rounded-full border border-steel/25 bg-paper px-6 py-3 text-sm font-medium text-ink transition hover:border-steel/50 hover:bg-white"
          >
            <span>Omfördela urval</span>
            <span className="text-xs font-normal text-ink/72">
              Handläggarkedjan uppdateras
            </span>
          </button>
        </aside>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleJobs.map((job) => (
          <article
            key={job.id}
            className="bureaucratic-panel rise-fade rounded-dossier border border-steel/20 bg-white/90 p-6 shadow-slip"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="status-chip">{job.category}</span>
              <span className="status-chip bg-paper/92 text-ink/76">{job.location}</span>
            </div>

            <h3 className="mt-4 max-w-full text-balance font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
              {renderJobTitle(job.title)}
            </h3>
            <p className="mt-4 break-words text-base leading-7 text-ink/76">{job.description}</p>

            <dl className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-steel/15 bg-paper/88 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-ink/72">
                  Anställningsform
                </dt>
                <dd className="mt-2 break-words text-sm font-medium text-ink">{job.employmentType}</dd>
              </div>
              <div className="rounded-2xl border border-steel/15 bg-paper/88 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-ink/72">
                  Ersättningsmodell
                </dt>
                <dd className="mt-2 break-words text-sm font-medium text-ink">{job.compensation}</dd>
              </div>
              <div className="rounded-2xl border border-steel/15 bg-paper/88 p-4">
                <dt className="text-xs uppercase tracking-[0.24em] text-ink/72">
                  Bedömd rimlighet
                </dt>
                <dd className="mt-2 break-words text-sm font-medium text-ink">
                  {absurdityLabel(job.absurdityLevel)} ({job.absurdityLevel}/10)
                </dd>
              </div>
            </dl>

            <div className="mt-5 grid gap-4">
              <div className="rounded-[1.25rem] border border-steel/15 bg-white/88 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-ink/72">
                  Arbetsuppgifter i urval
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/76">
                  {job.duties.slice(0, 2).map((duty) => (
                    <li key={duty} className="break-words">
                      {duty}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.25rem] border border-steel/15 bg-white/88 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-ink/72">Grundkrav</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/76">
                  {job.requirements.slice(0, 2).map((requirement) => (
                    <li key={requirement} className="break-words">
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleApply(job)}
              className="mt-6 inline-flex flex-col items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-seal"
            >
              <span>Anmäl intresse</span>
              <span className="text-xs font-normal text-paper/84">
                Verklighet konverteras till matchning
              </span>
            </button>

            <div className="mt-4 min-h-20 rounded-[1.25rem] border border-dashed border-steel/20 bg-white/84 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink/72">Utfall</p>
              <p className="mt-2 text-sm leading-7 text-ink">
                {outcomesById[job.id] ??
                  "Ingen ansökan registrerad ännu. Tjänsten hålls tills vidare öppen i teorin och stängd i praktiken."}
              </p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
