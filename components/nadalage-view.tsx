"use client";

import { useMemo, useState } from "react";

type SupportCategory = "Stillhet" | "Tröst" | "Värdighet";

type SupportLine = {
  category: SupportCategory;
  text: string;
};

const supportLines: SupportLine[] = [
  { category: "Tröst", text: "Du är inte ett misslyckande för att du inte orkar." },
  { category: "Värdighet", text: "Du behöver inte prestera för att ha värde." },
  { category: "Värdighet", text: "En kall bedömning är inte samma sak som sanningen." },
  { category: "Värdighet", text: "Du är mer än det systemet förmår se." },
  { category: "Stillhet", text: "Det får vara nog för idag även om inget blev färdigt." },
  {
    category: "Tröst",
    text: "Det är inte fel att behöva mer tid än omgivningen förstår.",
  },
  {
    category: "Stillhet",
    text: "Du får vila utan att först bevisa att vilan är berättigad.",
  },
  {
    category: "Tröst",
    text: "Det är möjligt att vara trött och fortfarande värd omtanke.",
  },
  { category: "Värdighet", text: "Ingen process kan mäta hela dig." },
];

const categoryTexts: Record<SupportCategory, string> = {
  Stillhet:
    "En plats för kortare andetag, mindre krav och meningar som inte försöker dra dig någonstans.",
  Tröst: "Ord som håller sig nära utan att kräva något tillbaka.",
  Värdighet:
    "Påminnelser om att människovärde inte uppstår genom prestation, begriplighet eller godkännande.",
};

function randomIndex(exclude?: number) {
  if (supportLines.length <= 1) return 0;

  let next = Math.floor(Math.random() * supportLines.length);

  while (next === exclude) {
    next = Math.floor(Math.random() * supportLines.length);
  }

  return next;
}

export function NadalageView() {
  const [lineIndex, setLineIndex] = useState(0);
  const currentLine = supportLines[lineIndex];

  const groupedLines = useMemo(
    () =>
      (["Stillhet", "Tröst", "Värdighet"] as SupportCategory[]).map((category) => ({
        category,
        description: categoryTexts[category],
        lines: supportLines.filter((line) => line.category === category).slice(0, 2),
      })),
    [],
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="soften-in overflow-hidden rounded-[2rem] border border-[#d9ddd8] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(241,245,241,0.96))] shadow-[0_20px_60px_rgba(49,67,70,0.08)]">
        <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-10">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#51656b]">Nådeläge</p>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-5xl font-semibold tracking-tight text-[#203134] sm:text-6xl">
              En stilla paus utanför bedömningen.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#415258]">
              Här finns inga invändningar, inga processled och inga krav på att formulera
              dig rätt. Bara några korta ord som får vara mänskliga.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-[#d7ddd7] bg-white/88 p-6 shadow-[0_10px_35px_rgba(49,67,70,0.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#5a6c69]">
                {currentLine.category}
              </p>
              <p className="mt-4 max-w-2xl text-2xl leading-10 text-[#203134] sm:text-3xl sm:leading-[3rem]">
                {currentLine.text}
              </p>
              <button
                type="button"
                onClick={() => setLineIndex((current) => randomIndex(current))}
                className="mt-6 inline-flex flex-col items-center justify-center rounded-full border border-[#c8d2cb] bg-[#eef4ef] px-6 py-3 text-sm font-medium text-[#203134] transition hover:bg-white"
              >
                <span>Visa en ny rad</span>
                <span className="text-xs font-normal text-[#50636a]">
                  En varsam omtolkning pågår
                </span>
              </button>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-[#d7ddd7] bg-[linear-gradient(180deg,rgba(236,243,238,0.95),rgba(250,252,250,0.95))] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#5a6c69]">
              Tillfälligt andrum
            </p>
            <div className="mt-5 space-y-4">
              <p className="rounded-[1.25rem] bg-white/85 px-4 py-4 text-base leading-8 text-[#314346]">
                Du får finnas också när du inte fungerar som vanligt.
              </p>
              <p className="rounded-[1.25rem] bg-white/85 px-4 py-4 text-base leading-8 text-[#314346]">
                Det som är svårt blir inte mindre verkligt för att någon beskriver det torrt.
              </p>
              <p className="rounded-[1.25rem] bg-white/85 px-4 py-4 text-base leading-8 text-[#314346]">
                Om du behöver vila, får det vara skäl nog.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {groupedLines.map((group) => (
          <article
            key={group.category}
            className="soften-in rounded-[1.75rem] border border-[#d7ddd7] bg-white/84 p-6 shadow-[0_10px_35px_rgba(49,67,70,0.06)]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#5a6c69]">
              {group.category}
            </p>
            <p className="mt-3 text-base leading-7 text-[#415258]">{group.description}</p>
            <ul className="mt-5 space-y-3">
              {group.lines.map((line) => (
                <li
                  key={line.text}
                  className="rounded-[1.25rem] border border-[#e1e7e1] bg-[#f6f9f6] px-4 py-4 text-sm leading-7 text-[#203134]"
                >
                  {line.text}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
