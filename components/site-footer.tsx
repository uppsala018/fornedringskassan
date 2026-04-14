"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const isNadalage = pathname === "/nadalage";

  return (
    <footer className="border-t border-steel/20 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-3 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-paper/78">
            {isNadalage ? "Nådeläge" : "Fiktiv byrå för inre utmattning"}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-paper/88">
            {isNadalage
              ? "Den här sidan är en stilla paus inom samma webbplats. Här finns inget att bedöma just nu."
              : "Förnedringskassan är satir och ska inte förväxlas med någon verklig myndighet, rådgivningstjänst eller formellt beslutsorgan."}
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-paper/72">
              {isNadalage ? "Vägledning" : "Driftstatus"}
            </p>
            <p className="mt-3 text-sm leading-7 text-paper/84">
              {isNadalage
                ? "Om du vill fortsätta finns startsidan, Om projektet och Frågor och svar kvar ovanför."
                : "Handläggningstid för svar: 6 till 18 verksamhetsliv. Intern omtolkning kan förekomma utan föregående förståelse."}
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-paper/72">
              {isNadalage ? "Tyst väg" : "Vägledning"}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link href="/nadalage" className="text-paper/90 transition hover:text-white">
                Nådeläge
              </Link>
              <Link href="/musik/fornedringskassan" className="text-paper/90 transition hover:text-white">
                Musik: Förnedringskassan
              </Link>
              <Link href="/om" className="text-paper/90 transition hover:text-white">
                Om projektet
              </Link>
              <Link href="/fragor-och-svar" className="text-paper/90 transition hover:text-white">
                Frågor och svar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
