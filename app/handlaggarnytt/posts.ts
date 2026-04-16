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
  {
    slug: "tillfallig-justering-av-vantan",
    title: "Tillfällig justering av väntan",
    summary:
      "Väntetiden får en ny innebörd under en period som främst påverkar hur länge samma fråga kan fortsätta vara öppen.",
    intro:
      "En tillfällig anpassning av väntans roll i ärendeflödet, så att stillheten lättare kan beskrivas som fortsatt ordnad behandling.",
    route: "/handlaggarnytt/tillfallig-justering-av-vantan",
    published: "15 april 2026",
    metadataTitle: "Tillfällig justering av väntan | Handläggarnytt",
    metadataDescription:
      "En kort notis om att väntetiden tillfälligt får en ny innebörd utan att ärendets riktning blir tydligare.",
    sections: [
      {
        heading: "Vad justeras?",
        body:
          "Väntan får nu ingå tydligare i den formella beskrivningen av ärendet, vilket gör att stillhet kan redovisas som ett steg i sig.",
      },
      {
        heading: "Hur länge?",
        body:
          "Tills vidare eller tills nästa rutin behöver samma väntan i något mer förklarande språk.",
      },
      {
        heading: "Vad märks utåt?",
        body:
          "Främst att samma ärende kan ligga kvar längre utan att det behöver låta mer stillastående än tidigare.",
      },
    ],
  },
  {
    slug: "fornyad-ordning-for-kompletterande-underlag",
    title: "Förnyad ordning för kompletterande underlag",
    summary:
      "Kompletteringar ska nu lämnas, läsas och återföras i en ny följd som främst gör nästa begäran lättare att formulera.",
    intro:
      "En översyn av hur kompletterande handlingar hanteras när de redan en gång behövts men ändå inte riktigt räckt till.",
    route: "/handlaggarnytt/fornyad-ordning-for-kompletterande-underlag",
    published: "15 april 2026",
    metadataTitle: "Förnyad ordning för kompletterande underlag | Handläggarnytt",
    metadataDescription:
      "En notis om att kompletterande underlag nu hanteras i ny ordning utan att underlaget blir mindre ofullständigt.",
    sections: [
      {
        heading: "Ny följd",
        body:
          "Inkomna handlingar får nu läsas i en ordning som bättre motsvarar den väntan som redan uppstått runt dem.",
      },
      {
        heading: "Intern effekt",
        body:
          "Handläggningen blir lättare att beskriva som pågående även när samma komplettering efterfrågas igen.",
      },
      {
        heading: "För den som lämnar in",
        body:
          "Det räcker oftast att sända in det som redan sändes in, men nu med en något tydligare rubrik.",
      },
    ],
  },
  {
    slug: "spraklig-oversyn-av-avslagsformuleringar",
    title: "Språklig översyn av avslagsformuleringar",
    summary:
      "Avslag ges en mer enhetlig ton så att samma innehåll kan låta samlat även när innebörden förblir oförändrad.",
    intro:
      "En intern genomgång av hur nej kan formuleras med bättre marginaler, lugnare rytm och samma riktning som tidigare.",
    route: "/handlaggarnytt/spraklig-oversyn-av-avslagsformuleringar",
    published: "15 april 2026",
    metadataTitle: "Språklig översyn av avslagsformuleringar | Handläggarnytt",
    metadataDescription:
      "En kort bulletin om att avslagsformuleringar ses över för att låta tydligare utan att bli mindre avslagslika.",
    sections: [
      {
        heading: "Vad ses över?",
        body:
          "Främst formuleringar som redan säger nej men som kan säga det med mindre friktion och något större självförtroende.",
      },
      {
        heading: "Varför nu?",
        body:
          "För att systemet ska låta mer samlat när det återkommer till samma slutsats i mer vårdad form.",
      },
      {
        heading: "Vad förändras inte?",
        body:
          "Innehållet i nej:et. Det förblir nej, men med bättre rytm och färre onödiga ursäkter.",
      },
    ],
  },
  {
    slug: "intern-samordning-av-omprovning-utan-andring-i-sak",
    title: "Intern samordning av omprövning utan ändring i sak",
    summary:
      "Omprövningens olika led samordnas för att samma svar ska kunna återkomma med mindre intern friktion.",
    intro:
      "En samordning av den process där ett ärende kan omprövas flera gånger utan att dess riktning behöver ändras.",
    route: "/handlaggarnytt/intern-samordning-av-omprovning-utan-andring-i-sak",
    published: "15 april 2026",
    metadataTitle: "Intern samordning av omprövning utan ändring i sak | Handläggarnytt",
    metadataDescription:
      "En notis om att omprövning utan ändring i sak nu samordnas tydligare mellan interna led.",
    sections: [
      {
        heading: "Vad samordnas?",
        body:
          "Det som redan lett till samma slutsats får nu en gemensam ordning så att nästa omgång kan låta mer strukturerad.",
      },
      {
        heading: "Hur märks det?",
        body:
          "Som en jämnare fördelning av samma beslut mellan de led som annars skulle ha beskrivit det i lite olika tonläge.",
      },
      {
        heading: "Praktisk följd",
        body:
          "Omprövning kan fortsätta ske utan att ändring i sak behöver uppstå bara för att processen blivit mer samordnad.",
      },
    ],
  },
  {
    slug: "fortydligande-om-rorelse-utan-framsteg",
    title: "Förtydligande om rörelse utan framsteg",
    summary:
      "Ärendets rörelse ska inte längre förväxlas med framsteg när förflyttningen mest består av mer läsning av samma material.",
    intro:
      "Ett klargörande om när rörelse i ett ärende är just rörelse och inte nödvändigtvis något som leder någonstans.",
    route: "/handlaggarnytt/fortydligande-om-rorelse-utan-framsteg",
    published: "15 april 2026",
    metadataTitle: "Förtydligande om rörelse utan framsteg | Handläggarnytt",
    metadataDescription:
      "En kort notis om att intern rörelse i ärenden inte alltid ska tolkas som framsteg.",
    sections: [
      {
        heading: "Vad avses?",
        body:
          "Att ett ärende kan passera fler led, få ny placering eller ny rubrik utan att dess riktning blir nämnvärt annorlunda.",
      },
      {
        heading: "Varför förtydligas detta?",
        body:
          "För att den som följer flödet inte ska behöva tro att varje förflyttning betyder mer än den faktiskt gör.",
      },
      {
        heading: "Nästa läsning",
        body:
          "Kommer troligen att bekräfta att rörelsen fortsätter, men utan att hastigheten ska misstolkas som löst problem.",
      },
    ],
  },
  {
    slug: "tillfalligt-fortydligande-av-arbetsformaga",
    title: "Tillfälligt förtydligande av arbetsförmåga",
    summary:
      "Arbetsförmågebegreppet ges en kortvarigt tydligare ram för att samma bedömning ska kunna läsas med mindre osäkerhet.",
    intro:
      "En tillfällig precisering av hur arbetsförmåga ska beskrivas när underlaget redan finns men fortfarande lämnar utrymme för tvetydighet.",
    route: "/handlaggarnytt/tillfalligt-fortydligande-av-arbetsformaga",
    published: "16 april 2026",
    metadataTitle: "Tillfälligt förtydligande av arbetsförmåga | Handläggarnytt",
    metadataDescription:
      "En kort notis om att arbetsförmågebegreppet får en tydligare ram under en begränsad period.",
    sections: [
      {
        heading: "Vad förtydligas?",
        body:
          "Hur arbetsförmåga ska läsas i förhållande till befintliga underlag, så att samma ord kan bära en något mindre diffus innebörd.",
      },
      {
        heading: "Varför nu?",
        body:
          "För att minska skillnaden mellan vad som redan bedömts och hur det efterlämnade språket fortfarande uppfattas i följande led.",
      },
      {
        heading: "Vad påverkas inte?",
        body:
          "Själva riktningen i bedömningen. Det är fortfarande samma ordning, men med något tydligare kanter.",
      },
    ],
  },
  {
    slug: "administrativ-samordning-mellan-besked-och-uppfoljning",
    title: "Administrativ samordning mellan besked och uppföljning",
    summary:
      "Besked och uppföljning läggs närmare varandra för att samma ärende ska beskrivas mer enhetligt genom hela förloppet.",
    intro:
      "En samordning av hur ett besked lämnas och hur det sedan följs upp, så att nästa läsning inte behöver uppfinna samma ordning på nytt.",
    route: "/handlaggarnytt/administrativ-samordning-mellan-besked-och-uppfoljning",
    published: "16 april 2026",
    metadataTitle: "Administrativ samordning mellan besked och uppföljning | Handläggarnytt",
    metadataDescription:
      "En notis om att besked och uppföljning nu samordnas tydligare inom samma ärendeförlopp.",
    sections: [
      {
        heading: "Vad samordnas?",
        body:
          "Formuleringen av ett besked och den efterföljande beskrivningen av hur det ska förstås i nästa led.",
      },
      {
        heading: "Syftet",
        body:
          "Att minska risken för att uppföljningen låter som om den beskriver ett annat ärende än det som just avslutats.",
      },
      {
        heading: "Praktisk följd",
        body:
          "Samma ärende kan fortsätta genom systemen med lite mindre språklig friktion och lite mer intern överensstämmelse.",
      },
    ],
  },
  {
    slug: "utokad-anvandning-av-standardiserade-formuleringar",
    title: "Utökad användning av standardiserade formuleringar",
    summary:
      "Standardiserade formuleringar får bredare användning för att samma svar ska kunna låta samlat även i skilda delar av flödet.",
    intro:
      "En utvidgning av de fasta formuleringarna i den interna textmassan, avsedd att ge fler besked samma ton utan att de behöver bli identiska på ytan.",
    route: "/handlaggarnytt/utokad-anvandning-av-standardiserade-formuleringar",
    published: "16 april 2026",
    metadataTitle: "Utökad användning av standardiserade formuleringar | Handläggarnytt",
    metadataDescription:
      "En kort bulletin om att standardiserade formuleringar nu används bredare i intern handläggning.",
    sections: [
      {
        heading: "Vad blir standardiserat?",
        body:
          "Formuleringar om mottagning, väntan och återkoppling får samma grundton oavsett vilket steg som beskriver dem.",
      },
      {
        heading: "Varför breddas det?",
        body:
          "För att den interna texten ska uppfattas som mer sammanhållen när samma ärende passerar flera led.",
      },
      {
        heading: "Vad förblir oförändrat?",
        body:
          "Själva innehållet i beskedet. Det är fortfarande samma sak, bara mer enhetligt formulerad.",
      },
    ],
  },
  {
    slug: "teknisk-justering-av-sporning-vantetid-och-status",
    title: "Teknisk justering av spårning, väntetid och status",
    summary:
      "Spårningen får en mindre teknisk justering så att status, väntetid och läge kan beskrivas med något stabilare ordning.",
    intro:
      "En liten teknisk anpassning i hur ärendestatus och väntetider återges, så att samma förflyttning inte behöver se olika ut beroende på när den läses.",
    route: "/handlaggarnytt/teknisk-justering-av-sporning-vantetid-och-status",
    published: "16 april 2026",
    metadataTitle: "Teknisk justering av spårning, väntetid och status | Handläggarnytt",
    metadataDescription:
      "En notis om en teknisk justering som stabiliserar hur spårning, väntetid och status återges.",
    sections: [
      {
        heading: "Vad justeras?",
        body:
          "Hur statusfält, väntetider och rörelse i ett ärende presenteras internt så att de läses mer konsekvent.",
      },
      {
        heading: "Varför nu?",
        body:
          "För att minska små skillnader mellan vad systemet visar och hur samma läge beskrivs i återkommande notiser.",
      },
      {
        heading: "Vad märks utåt?",
        body:
          "Att statusen ser något mer stabil ut, utan att för den skull innebära någon snabbare handläggning.",
      },
    ],
  },
];

export function getHandlaggarnyttPost(slug: string) {
  return handlaggarnyttPosts.find((post) => post.slug === slug);
}
