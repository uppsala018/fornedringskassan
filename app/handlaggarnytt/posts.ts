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
    title: "TillfĂ¤lligt fĂ¶rtydligande av arbetsfĂ¶rmĂĄga",
    summary:
      "ArbetsfĂ¶rmĂĄgebegreppet ges en kortvarigt tydligare ram fĂ¶r att samma bedĂ¶mning ska kunna lĂ¤sas med mindre osĂ¤kerhet.",
    intro:
      "En tillfĂ¤llig precisering av hur arbetsfĂ¶rmĂĄga ska beskrivas nĂ¤r underlaget redan finns men fortfarande lĂ¤mnar utrymme fĂ¶r tvetydighet.",
    route: "/handlaggarnytt/tillfalligt-fortydligande-av-arbetsformaga",
    published: "16 april 2026",
    metadataTitle: "TillfĂ¤lligt fĂ¶rtydligande av arbetsfĂ¶rmĂĄga | HandlĂ¤ggarnytt",
    metadataDescription:
      "En kort notis om att arbetsfĂ¶rmĂĄgebegreppet fĂĄr en tydligare ram under en begrĂ¤nsad period.",
    sections: [
      {
        heading: "Vad fĂ¶rtydligas?",
        body:
          "Hur arbetsfĂ¶rmĂĄga ska lĂ¤sas i fĂ¶rhĂĄllande till befintliga underlag, sĂĄ att samma ord kan bĂ¤ra en nĂĄgot mindre diffus innebĂ¶rd.",
      },
      {
        heading: "VarfĂ¶r nu?",
        body:
          "FĂ¶r att minska skillnaden mellan vad som redan bedĂ¶mts och hur det efterlĂ¤mnade sprĂĄket fortfarande uppfattas i fĂ¶ljande led.",
      },
      {
        heading: "Vad pĂĄverkas inte?",
        body:
          "SjĂ¤lva riktningen i bedĂ¶mningen. Det Ă¤r fortfarande samma ordning, men med nĂĄgot tydligare kanter.",
      },
    ],
  },
  {
    slug: "administrativ-samordning-mellan-besked-och-uppfoljning",
    title: "Administrativ samordning mellan besked och uppfĂ¶ljning",
    summary:
      "Besked och uppfĂ¶ljning lĂ¤ggs nĂ¤rmare varandra fĂ¶r att samma Ă¤rende ska beskrivas mer enhetligt genom hela fĂ¶rloppet.",
    intro:
      "En samordning av hur ett besked lĂ¤mnas och hur det sedan fĂ¶ljs upp, sĂĄ att nĂ¤sta lĂ¤sning inte behĂ¶ver uppfinna samma ordning pĂĄ nytt.",
    route: "/handlaggarnytt/administrativ-samordning-mellan-besked-och-uppfoljning",
    published: "16 april 2026",
    metadataTitle: "Administrativ samordning mellan besked och uppfĂ¶ljning | HandlĂ¤ggarnytt",
    metadataDescription:
      "En notis om att besked och uppfĂ¶ljning nu samordnas tydligare inom samma Ă¤rendefĂ¶rlopp.",
    sections: [
      {
        heading: "Vad samordnas?",
        body:
          "Formuleringen av ett besked och den efterfĂ¶ljande beskrivningen av hur det ska fĂ¶rstĂĄs i nĂ¤sta led.",
      },
      {
        heading: "Syftet",
        body:
          "Att minska risken fĂ¶r att uppfĂ¶ljningen lĂĄter som om den beskriver ett annat Ă¤rende Ă¤n det som just avslutats.",
      },
      {
        heading: "Praktisk fĂ¶ljd",
        body:
          "Samma Ă¤rende kan fortsĂ¤tta genom systemen med lite mindre sprĂĄklig friktion och lite mer intern Ă¶verensstĂ¤mmelse.",
      },
    ],
  },
  {
    slug: "utokad-anvandning-av-standardiserade-formuleringar",
    title: "UtĂ¶kad anvĂ¤ndning av standardiserade formuleringar",
    summary:
      "Standardiserade formuleringar fĂĄr bredare anvĂ¤ndning fĂ¶r att samma svar ska kunna lĂĄta samlat Ă¤ven i skilda delar av flĂ¶det.",
    intro:
      "En utvidgning av de fasta formuleringarna i den interna textmassan, avsedd att ge fler besked samma ton utan att de behĂ¶ver bli identiska pĂĄ ytan.",
    route: "/handlaggarnytt/utokad-anvandning-av-standardiserade-formuleringar",
    published: "16 april 2026",
    metadataTitle: "UtĂ¶kad anvĂ¤ndning av standardiserade formuleringar | HandlĂ¤ggarnytt",
    metadataDescription:
      "En kort bulletin om att standardiserade formuleringar nu anvĂ¤nds bredare i intern handlĂ¤ggning.",
    sections: [
      {
        heading: "Vad blir standardiserat?",
        body:
          "Formuleringar om mottagning, vĂ¤ntan och ĂĄterkoppling fĂĄr samma grundton oavsett vilket steg som beskriver dem.",
      },
      {
        heading: "VarfĂ¶r breddas det?",
        body:
          "FĂ¶r att den interna texten ska uppfattas som mer sammanhĂĄllen nĂ¤r samma Ă¤rende passerar flera led.",
      },
      {
        heading: "Vad fĂ¶rblir ofĂ¶rĂ¤ndrat?",
        body:
          "SjĂ¤lva innehĂĄllet i beskedet. Det Ă¤r fortfarande samma sak, bara mer enhetligt formulerad.",
      },
    ],
  },
  {
    slug: "teknisk-justering-av-sporning-vantetid-och-status",
    title: "Teknisk justering av spĂĄrning, vĂ¤ntetid och status",
    summary:
      "SpĂĄrningen fĂĄr en mindre teknisk justering sĂĄ att status, vĂ¤ntetid och lĂ¤ge kan beskrivas med nĂĄgot stabilare ordning.",
    intro:
      "En liten teknisk anpassning i hur Ă¤rendestatus och vĂ¤ntetider ĂĄterges, sĂĄ att samma fĂ¶rflyttning inte behĂ¶ver se olika ut beroende pĂĄ nĂ¤r den lĂ¤ses.",
    route: "/handlaggarnytt/teknisk-justering-av-sporning-vantetid-och-status",
    published: "16 april 2026",
    metadataTitle: "Teknisk justering av spĂĄrning, vĂ¤ntetid och status | HandlĂ¤ggarnytt",
    metadataDescription:
      "En notis om en teknisk justering som stabiliserar hur spĂĄrning, vĂ¤ntetid och status ĂĄterges.",
    sections: [
      {
        heading: "Vad justeras?",
        body:
          "Hur statusfĂ¤lt, vĂ¤ntetider och rĂ¶relse i ett Ă¤rende presenteras internt sĂĄ att de lĂ¤ses mer konsekvent.",
      },
      {
        heading: "VarfĂ¶r nu?",
        body:
          "FĂ¶r att minska smĂĄ skillnader mellan vad systemet visar och hur samma lĂ¤ge beskrivs i ĂĄterkommande notiser.",
      },
      {
        heading: "Vad mĂ¤rks utĂĄt?",
        body:
          "Att statusen ser nĂĄgot mer stabil ut, utan att fĂ¶r den skull innebĂ¤ra nĂĄgon snabbare handlĂ¤ggning.",
      },
    ],
  },
];

export function getHandlaggarnyttPost(slug: string) {
  return handlaggarnyttPosts.find((post) => post.slug === slug);
}
