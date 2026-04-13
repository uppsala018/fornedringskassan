"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoMark } from "@/components/logo-mark";
import { SatireBadge } from "@/components/satire-badge";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-steel/20 bg-paper/94 backdrop-blur">
      <div className="mx-auto max-w-6xl px-3 py-3 sm:px-5 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="rounded-[1.4rem] border border-stamp/20 bg-[linear-gradient(90deg,rgba(255,255,255,0.9),rgba(247,244,238,0.9))] px-4 py-3 shadow-slip">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-xs uppercase tracking-[0.34em] text-steel">
                Satirisk parodi, inte myndighet
              </p>
              <SatireBadge />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" aria-label="Gå till startsidan" className="min-w-0">
              <LogoMark compact showTagline={false} />
            </Link>
            <div className="hidden lg:block">
              <p className="text-xs uppercase tracking-[0.28em] text-steel">
                Fiktiv institutionell yta
              </p>
            </div>
          </div>

          <nav aria-label="Huvudnavigering" className="overflow-x-auto pb-1">
            <ul className="flex min-w-max flex-wrap gap-2 md:min-w-0">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "inline-flex min-h-11 items-center rounded-[0.9rem] border px-4 py-3 text-sm transition-colors",
                        isActive
                          ? "border-ink bg-ink text-paper shadow-slip"
                          : "border-steel/20 bg-white/75 text-ink hover:border-steel/45 hover:bg-white",
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
