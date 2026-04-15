"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoMark } from "@/components/logo-mark";
import { navItems } from "@/lib/site";

type HeaderFrame = {
  eyebrow: string;
  subtitle: string;
  helper: string;
};

const headerFrames: Record<string, HeaderFrame> = {
  "/nadalage": {
    eyebrow: "Nådeläge",
    subtitle: "En stilla paus för vila och värdighet",
    helper: "En lugn väg bort från bedömning",
  },
  "/arbetsformagebedomaren": {
    eyebrow: "Arbetsförmåga",
    subtitle: "Kvarvarande funktion",
    helper: "Fiktiv bedömning i egen ordning",
  },
  "/cv-generator": {
    eyebrow: "Arbetsprofil",
    subtitle: "Omformad arbetsbarhet",
    helper: "Satirisk CV-yta",
  },
  "/overklaga-beslut": {
    eyebrow: "Överklagande",
    subtitle: "Samma beslut, ny läsning",
    helper: "Prövning i ny ordning",
  },
  "/spora-ditt-arende": {
    eyebrow: "Ärendespårning",
    subtitle: "Rörelse utan besked",
    helper: "Aktiv status utan slutpunkt",
  },
  "/handlaggarnytt": {
    eyebrow: "Intern bulletin",
    subtitle: "Systemets egen bulletin",
    helper: "Arkiv för rutin som förklarar sig själv",
  },
  "/musik/fornedringskassan": {
    eyebrow: "Musik",
    subtitle: "Förnedringskassan · Elektrisk Revy",
    helper: "En publicerad utgåva",
  },
};

export function SiteHeader() {
  const pathname = usePathname();
  const frame = headerFrames[pathname ?? ""];

  return (
    <header className="border-b border-steel/20 bg-[linear-gradient(180deg,rgba(245,240,231,0.98),rgba(239,234,224,0.94))] backdrop-blur">
      <div className="mx-auto max-w-6xl px-3 py-3 sm:px-5 lg:px-8 lg:py-4">
        <div className="flex flex-col gap-2.5">
          {frame ? (
            <div className="rounded-[1.25rem] border border-stamp/20 bg-[linear-gradient(90deg,rgba(255,255,255,0.9),rgba(244,238,229,0.95))] px-4 py-2.5 shadow-slip">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-ink/75">
                    {frame.eyebrow}
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink/65">
                    {frame.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" aria-label="Gå till startsidan" className="min-w-0">
              <LogoMark compact showTagline={false} />
            </Link>
            {frame ? (
              <div className="hidden lg:block">
                <p className="text-[11px] uppercase tracking-[0.26em] text-ink/68">{frame.helper}</p>
              </div>
            ) : null}
          </div>

          <nav aria-label="Huvudnavigering" className="pb-1">
            <ul className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "inline-flex min-h-10 items-center rounded-full border px-4 py-2.5 text-sm transition-all",
                        isActive
                          ? "border-ink bg-ink text-paper shadow-slip"
                          : "border-steel/20 bg-white/82 text-ink hover:-translate-y-0.5 hover:border-steel/45 hover:bg-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
