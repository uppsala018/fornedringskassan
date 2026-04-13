"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoMark } from "@/components/logo-mark";
import { SatireBadge } from "@/components/satire-badge";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-steel/20 bg-paper/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" aria-label="Gå till startsidan" className="min-w-0">
              <LogoMark compact showTagline={false} />
            </Link>
            <div className="lg:flex lg:justify-end">
              <SatireBadge />
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
                        "inline-flex rounded-full border px-4 py-2.5 text-sm transition-colors",
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
