import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

const title = "Om projektet | Förnedringskassan";
const description =
  "Information om Förnedringskassan som satiriskt projekt, samhällskommentar och fiktiv institution utan koppling till någon myndighet.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/om",
  },
  openGraph: {
    title,
    description,
    url: "/om",
  },
  twitter: {
    title,
    description,
  },
};

export default function OmPage() {
  return (
    <PageShell
      title="Om projektet"
      intro="Förnedringskassan är ett satiriskt projekt och en form av samhällskommentar om hur byråkratiska system kan upplevas när språk, process och ansvar glider bort från människan."
    >
      <section className="rounded-dossier border border-stamp/20 bg-stamp/10 p-6">
        <p className="text-xs uppercase tracking-[0.34em] text-ink/72">
          Tydlig disclaimer
        </p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
          Förnedringskassan är inte en verklig myndighet
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-ink/76">
          Den här webbplatsen är ett satiriskt och fiktivt projekt. Den är skapad som
          samhällskommentar och ska inte tolkas som officiell information, rådgivning eller
          representation av Försäkringskassan, någon annan myndighet eller någon verklig
          offentlig verksamhet.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="institution-card p-6">
          <h2 className="text-balance font-display text-2xl font-semibold text-ink">Vad detta är</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-ink/76">
            <p>
              Webbplatsen är satir och social kommentar. Den är fiktiv och skapad för att
              gestalta en viss typ av institutionaliserat språk och tänkande.
            </p>
            <p>
              Förnedringskassan är inte kopplad till Försäkringskassan eller någon annan
              myndighet, offentlig aktör eller officiell verksamhet.
            </p>
          </div>
        </article>

        <article className="institution-card p-6">
          <h2 className="text-balance font-display text-2xl font-semibold text-ink">Vad detta inte är</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-ink/76">
            <p>
              Innehållet är inte juridisk rådgivning, inte medicinsk rådgivning och inte
              officiell information.
            </p>
            <p>
              Sidan ska inte användas som underlag för beslut, bedömningar eller vägledning i
              verkliga ärenden.
            </p>
          </div>
        </article>
      </section>

      <section className="institution-card p-8">
        <p className="text-sm uppercase tracking-[0.32em] text-ink/72">Syfte</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
          Vad satiren riktar in sig på
        </h2>
        <ul className="mt-6 space-y-4 text-base leading-8 text-ink/76">
          <li>Byråkrati som upplevs större än människan den är till för.</li>
          <li>Avhumaniserande språk som gör erfarenheter till tekniska avvikelser.</li>
          <li>Ansvarsförskjutning där beslut finns, men ansvariga blir svåra att hitta.</li>
          <li>Absurd administrativ logik där form ibland väger tyngre än verklighet.</li>
        </ul>
      </section>

      <section className="rounded-dossier border border-steel/20 bg-paper p-8">
        <h2 className="text-balance font-display text-2xl font-semibold text-ink">Vem satiren gäller</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/76">
          Satiren är riktad mot system, språkbruk och maktlös byråkratisk logik. Den är
          inte riktad mot sjuka personer, utsatta människor eller någon som befinner sig i
          en svår situation.
        </p>
      </section>
    </PageShell>
  );
}
