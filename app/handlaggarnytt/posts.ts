export type HandlaggarnyttPost = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  route: string;
  published: string;
  metadataTitle: string;
  metadataDescription: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export const handlaggarnyttPosts: HandlaggarnyttPost[] = [
  {
    slug: "forandrad-handlaggningsordning",
    title: "Förändrad handläggningsordning",
    summary:
      "Ärenden ska från och med nu föras vidare i en ny ordning som främst gör nästa steg lättare att beskriva.",
    intro:
      "En justering i den ordning där ärenden läses, flyttas och får vänta vidare tills deras tur åter blivit begriplig.",
    route: "/handlaggarnytt/forandrad-handlaggningsordning",
    published: "14 april 2026",
    metadataTitle: "Förändrad handläggningsordning | Handläggarnytt",
    metadataDescription:
      "En kort notis om att ärenden nu förs vidare i ny ordning utan att den administrativa riktningen blir tydligare.",
    sections: [
      {
        heading: "Vad ändras?",
        body:
          "Ärenden flyttas nu genom fler led innan de anses redo för samma slags genomgång som tidigare. Ordningen är ny; slutsatsen är inte det.",
      },
      {
        heading: "Varför nu?",
        body:
          "För att handläggningen ska framstå som samlad även när den i praktiken fortsätter i flera mindre versioner av samma väntan.",
      },
      {
        heading: "Praktisk följd",
        body:
          "De som redan lämnat in något behöver inte ändra sin beskrivning. De behöver bara vänja sig vid att den läses i en annan följd.",
      },
    ],
  },
  {
    slug: "fortydligande-om-vantan",
    title: "Förtydligande om väntan",
    summary:
      "Väntan ska nu förstås som en aktiv del av handläggningen, förutsatt att den är ordnad, diarieförd och fortsatt väntande.",
    intro:
      "Ett klargörande om att stillhet i ärenden sällan är stillhet i egentlig mening, bara rörelse med längre mellanrum.",
    route: "/handlaggarnytt/fortydligande-om-vantan",
    published: "14 april 2026",
    metadataTitle: "Förtydligande om väntan | Handläggarnytt",
    metadataDescription:
      "En notis om att väntan räknas som en aktiv del av handläggningen när den är ordnad nog att beskrivas så.",
    sections: [
      {
        heading: "När väntan blir behandling",
        body:
          "Om ett ärende ligger stilla men ändå rör sig genom registrering, markering och intern läsning, betraktas det som fortsatt handlagt i den form som väntan medger.",
      },
      {
        heading: "Vad det betyder för dig",
        body:
          "Att något ännu inte har hänt behöver inte innebära att det inte bearbetas. Det kan lika gärna innebära att bearbetningen ännu inte har hunnit likna ett svar.",
      },
      {
        heading: "Nästa läge",
        body:
          "När nästa uppdatering kommer är det vanligt att den endast bekräftar att väntan fortsatt har rätt ordning.",
      },
    ],
  },
  {
    slug: "intern-oversyn-av-tidigare-bedomningar",
    title: "Intern översyn av tidigare bedömningar",
    summary:
      "Tidigare ställningstaganden går nu igenom ännu en läsning för att säkerställa samma slutsats med bättre ordval.",
    intro:
      "En översyn av det som redan bedömts, för att se om precisionen kan förbättras utan att riktningen behöver röra sig.",
    route: "/handlaggarnytt/intern-oversyn-av-tidigare-bedomningar",
    published: "14 april 2026",
    metadataTitle: "Intern översyn av tidigare bedömningar | Handläggarnytt",
    metadataDescription:
      "En kort bulletin om att tidigare bedömningar läses om för att få tydligare formulering, inte nödvändigtvis annan utgång.",
    sections: [
      {
        heading: "Vad ses över?",
        body:
          "Bedömningar som redan är formulerade men fortfarande kan sägas tydligare får nu en ny intern läsning, mest för att se om samma svar kan låta mer genomarbetat.",
      },
      {
        heading: "Vad påverkas?",
        body:
          "Främst sättet beslutet beskrivs på. Själva bedömningen förblir i regel lika tydlig som före översynen, bara mer redigerad.",
      },
      {
        heading: "Vad märks utåt?",
        body:
          "Att ärendet ser mer bearbetat ut. Det är ibland det närmaste en förändring som handläggning kan komma utan att byta mening.",
      },
    ],
  },
];

export function getHandlaggarnyttPost(slug: string) {
  return handlaggarnyttPosts.find((post) => post.slug === slug);
}
