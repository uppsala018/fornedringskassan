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
    title: "FĂ¶rĂ¤ndrad handlĂ¤ggningsordning",
    summary:
      "Ă„renden ska frĂĄn och med nu fĂ¶ras vidare i en ny ordning som frĂ¤mst gĂ¶r nĂ¤sta steg lĂ¤ttare att beskriva.",
    intro:
      "En justering i den ordning dĂ¤r Ă¤renden lĂ¤ses, flyttas och fĂĄr vĂ¤nta vidare tills deras tur ĂĄter blivit begriplig.",
    route: "/handlaggarnytt/forandrad-handlaggningsordning",
    published: "14 april 2026",
    metadataTitle: "FĂ¶rĂ¤ndrad handlĂ¤ggningsordning | HandlĂ¤ggarnytt",
    metadataDescription:
      "En kort notis om att Ă¤renden nu fĂ¶rs vidare i ny ordning utan att den administrativa riktningen blir tydligare.",
    sections: [
      {
        heading: "Vad Ă¤ndras?",
        body:
          "Ă„renden flyttas nu genom fler led innan de anses redo fĂ¶r samma slags genomgĂĄng som tidigare. Ordningen Ă¤r ny; slutsatsen Ă¤r inte det.",
      },
      {
        heading: "VarfĂ¶r nu?",
        body:
          "FĂ¶r att handlĂ¤ggningen ska framstĂĄ som samlad Ă¤ven nĂ¤r den i praktiken fortsĂ¤tter i flera mindre versioner av samma vĂ¤ntan.",
      },
      {
        heading: "Praktisk fĂ¶ljd",
        body:
          "De som redan lĂ¤mnat in nĂĄgot behĂ¶ver inte Ă¤ndra sin beskrivning. De behĂ¶ver bara vĂ¤nja sig vid att den lĂ¤ses i en annan fĂ¶ljd.",
      },
    ],
  },
  {
    slug: "fortydligande-om-vantan",
    title: "FĂ¶rtydligande om vĂ¤ntan",
    summary:
      "VĂ¤ntan ska nu fĂ¶rstĂĄs som en aktiv del av handlĂ¤ggningen, fĂ¶rutsatt att den Ă¤r ordnad, diariefĂ¶rd och fortsatt vĂ¤ntande.",
    intro:
      "Ett klargĂ¶rande om att stillhet i Ă¤renden sĂ¤llan Ă¤r stillhet i egentlig mening, bara rĂ¶relse med lĂ¤ngre mellanrum.",
    route: "/handlaggarnytt/fortydligande-om-vantan",
    published: "14 april 2026",
    metadataTitle: "FĂ¶rtydligande om vĂ¤ntan | HandlĂ¤ggarnytt",
    metadataDescription:
      "En notis om att vĂ¤ntan rĂ¤knas som en aktiv del av handlĂ¤ggningen nĂ¤r den Ă¤r ordnad nog att beskrivas sĂĄ.",
    sections: [
      {
        heading: "NĂ¤r vĂ¤ntan blir behandling",
        body:
          "Om ett Ă¤rende ligger stilla men Ă¤ndĂĄ rĂ¶r sig genom registrering, markering och intern lĂ¤sning, betraktas det som fortsatt handlagt i den form som vĂ¤ntan medger.",
      },
      {
        heading: "Vad det betyder fĂ¶r dig",
        body:
          "Att nĂĄgot Ă¤nnu inte har hĂ¤nt behĂ¶ver inte innebĂ¤ra att det inte bearbetas. Det kan lika gĂ¤rna innebĂ¤ra att bearbetningen Ă¤nnu inte har hunnit likna ett svar.",
      },
      {
        heading: "NĂ¤sta lĂ¤ge",
        body:
          "NĂ¤r nĂ¤sta uppdatering kommer Ă¤r det vanligt att den endast bekrĂ¤ftar att vĂ¤ntan fortsatt har rĂ¤tt ordning.",
      },
    ],
  },
  {
    slug: "intern-oversyn-av-tidigare-bedomningar",
    title: "Intern Ă¶versyn av tidigare bedĂ¶mningar",
    summary:
      "Tidigare stĂ¤llningstaganden gĂĄr nu igenom Ă¤nnu en lĂ¤sning fĂ¶r att sĂ¤kerstĂ¤lla samma slutsats med bĂ¤ttre ordval.",
    intro:
      "En Ă¶versyn av det som redan bedĂ¶mts, fĂ¶r att se om precisionen kan fĂ¶rbĂ¤ttras utan att riktningen behĂ¶ver rĂ¶ra sig.",
    route: "/handlaggarnytt/intern-oversyn-av-tidigare-bedomningar",
    published: "14 april 2026",
    metadataTitle: "Intern Ă¶versyn av tidigare bedĂ¶mningar | HandlĂ¤ggarnytt",
    metadataDescription:
      "En kort bulletin om att tidigare bedĂ¶mningar lĂ¤ses om fĂ¶r att fĂĄ tydligare formulering, inte nĂ¶dvĂ¤ndigtvis annan utgĂĄng.",
    sections: [
      {
        heading: "Vad ses Ă¶ver?",
        body:
          "BedĂ¶mningar som redan Ă¤r formulerade men fortfarande kan sĂ¤gas tydligare fĂĄr nu en ny intern lĂ¤sning, mest fĂ¶r att se om samma svar kan lĂĄta mer genomarbetat.",
      },
      {
        heading: "Vad pĂĄverkas?",
        body:
          "FrĂ¤mst sĂ¤ttet beslutet beskrivs pĂĄ. SjĂ¤lva bedĂ¶mningen fĂ¶rblir i regel lika tydlig som fĂ¶re Ă¶versynen, bara mer redigerad.",
      },
      {
        heading: "Vad mĂ¤rks utĂĄt?",
        body:
          "Att Ă¤rendet ser mer bearbetat ut. Det Ă¤r ibland det nĂ¤rmaste en fĂ¶rĂ¤ndring som handlĂ¤ggning kan komma utan att byta mening.",
      },
    ],
  },
  {
    slug: "tillfallig-justering-av-vantan",
    title: "TillfĂ¤llig justering av vĂ¤ntan",
    summary:
      "VĂ¤ntetiden fĂĄr en ny innebĂ¶rd under en period som frĂ¤mst pĂĄverkar hur lĂ¤nge samma frĂĄga kan fortsĂ¤tta vara Ă¶ppen.",
    intro:
      "En tillfĂ¤llig anpassning av vĂ¤ntans roll i Ă¤rendeflĂ¶det, sĂĄ att stillheten lĂ¤ttare kan beskrivas som fortsatt ordnad behandling.",
    route: "/handlaggarnytt/tillfallig-justering-av-vantan",
    published: "15 april 2026",
    metadataTitle: "TillfĂ¤llig justering av vĂ¤ntan | HandlĂ¤ggarnytt",
    metadataDescription:
      "En kort notis om att vĂ¤ntetiden tillfĂ¤lligt fĂĄr en ny innebĂ¶rd utan att Ă¤rendets riktning blir tydligare.",
    sections: [
      {
        heading: "Vad justeras?",
        body:
          "VĂ¤ntan fĂĄr nu ingĂĄ tydligare i den formella beskrivningen av Ă¤rendet, vilket gĂ¶r att stillhet kan redovisas som ett steg i sig.",
      },
      {
        heading: "Hur lĂ¤nge?",
        body:
          "Tills vidare eller tills nĂ¤sta rutin behĂ¶ver samma vĂ¤ntan i nĂĄgot mer fĂ¶rklarande sprĂĄk.",
      },
      {
        heading: "Vad mĂ¤rks utĂĄt?",
        body:
          "FrĂ¤mst att samma Ă¤rende kan ligga kvar lĂ¤ngre utan att det behĂ¶ver lĂĄta mer stillastĂĄende Ă¤n tidigare.",
      },
    ],
  },
  {
    slug: "fornyad-ordning-for-kompletterande-underlag",
    title: "FĂ¶rnyad ordning fĂ¶r kompletterande underlag",
    summary:
      "Kompletteringar ska nu lĂ¤mnas, lĂ¤sas och ĂĄterfĂ¶ras i en ny fĂ¶ljd som frĂ¤mst gĂ¶r nĂ¤sta begĂ¤ran lĂ¤ttare att formulera.",
    intro:
      "En Ă¶versyn av hur kompletterande handlingar hanteras nĂ¤r de redan en gĂĄng behĂ¶vts men Ă¤ndĂĄ inte riktigt rĂ¤ckt till.",
    route: "/handlaggarnytt/fornyad-ordning-for-kompletterande-underlag",
    published: "15 april 2026",
    metadataTitle: "FĂ¶rnyad ordning fĂ¶r kompletterande underlag | HandlĂ¤ggarnytt",
    metadataDescription:
      "En notis om att kompletterande underlag nu hanteras i ny ordning utan att underlaget blir mindre ofullstĂ¤ndigt.",
    sections: [
      {
        heading: "Ny fĂ¶ljd",
        body:
          "Inkomna handlingar fĂĄr nu lĂ¤sas i en ordning som bĂ¤ttre motsvarar den vĂ¤ntan som redan uppstĂĄtt runt dem.",
      },
      {
        heading: "Intern effekt",
        body:
          "HandlĂ¤ggningen blir lĂ¤ttare att beskriva som pĂĄgĂĄende Ă¤ven nĂ¤r samma komplettering efterfrĂĄgas igen.",
      },
      {
        heading: "FĂ¶r den som lĂ¤mnar in",
        body:
          "Det rĂ¤cker oftast att sĂ¤nda in det som redan sĂ¤ndes in, men nu med en nĂĄgot tydligare rubrik.",
      },
    ],
  },
  {
    slug: "spraklig-oversyn-av-avslagsformuleringar",
    title: "SprĂĄklig Ă¶versyn av avslagsformuleringar",
    summary:
      "Avslag ges en mer enhetlig ton sĂĄ att samma innehĂĄll kan lĂĄta samlat Ă¤ven nĂ¤r innebĂ¶rden fĂ¶rblir ofĂ¶rĂ¤ndrad.",
    intro:
      "En intern genomgĂĄng av hur nej kan formuleras med bĂ¤ttre marginaler, lugnare rytm och samma riktning som tidigare.",
    route: "/handlaggarnytt/spraklig-oversyn-av-avslagsformuleringar",
    published: "15 april 2026",
    metadataTitle: "SprĂĄklig Ă¶versyn av avslagsformuleringar | HandlĂ¤ggarnytt",
    metadataDescription:
      "En kort bulletin om att avslagsformuleringar ses Ă¶ver fĂ¶r att lĂĄta tydligare utan att bli mindre avslagslika.",
    sections: [
      {
        heading: "Vad ses Ă¶ver?",
        body:
          "FrĂ¤mst formuleringar som redan sĂ¤ger nej men som kan sĂ¤ga det med mindre friktion och nĂĄgot stĂ¶rre sjĂ¤lvfĂ¶rtroende.",
      },
      {
        heading: "VarfĂ¶r nu?",
        body:
          "FĂ¶r att systemet ska lĂĄta mer samlat nĂ¤r det ĂĄterkommer till samma slutsats i mer vĂĄrdad form.",
      },
      {
        heading: "Vad fĂ¶rĂ¤ndras inte?",
        body:
          "InnehĂĄllet i nej:et. Det fĂ¶rblir nej, men med bĂ¤ttre rytm och fĂ¤rre onĂ¶diga ursĂ¤kter.",
      },
    ],
  },
  {
    slug: "intern-samordning-av-omprovning-utan-andring-i-sak",
    title: "Intern samordning av omprĂ¶vning utan Ă¤ndring i sak",
    summary:
      "OmprĂ¶vningens olika led samordnas fĂ¶r att samma svar ska kunna ĂĄterkomma med mindre intern friktion.",
    intro:
      "En samordning av den process dĂ¤r ett Ă¤rende kan omprĂ¶vas flera gĂĄnger utan att dess riktning behĂ¶ver Ă¤ndras.",
    route: "/handlaggarnytt/intern-samordning-av-omprovning-utan-andring-i-sak",
    published: "15 april 2026",
    metadataTitle: "Intern samordning av omprĂ¶vning utan Ă¤ndring i sak | HandlĂ¤ggarnytt",
    metadataDescription:
      "En notis om att omprĂ¶vning utan Ă¤ndring i sak nu samordnas tydligare mellan interna led.",
    sections: [
      {
        heading: "Vad samordnas?",
        body:
          "Det som redan lett till samma slutsats fĂĄr nu en gemensam ordning sĂĄ att nĂ¤sta omgĂĄng kan lĂĄta mer strukturerad.",
      },
      {
        heading: "Hur mĂ¤rks det?",
        body:
          "Som en jĂ¤mnare fĂ¶rdelning av samma beslut mellan de led som annars skulle ha beskrivit det i lite olika tonlĂ¤ge.",
      },
      {
        heading: "Praktisk fĂ¶ljd",
        body:
          "OmprĂ¶vning kan fortsĂ¤tta ske utan att Ă¤ndring i sak behĂ¶ver uppstĂĄ bara fĂ¶r att processen blivit mer samordnad.",
      },
    ],
  },
  {
    slug: "fortydligande-om-rorelse-utan-framsteg",
    title: "FĂ¶rtydligande om rĂ¶relse utan framsteg",
    summary:
      "Ă„rendets rĂ¶relse ska inte lĂ¤ngre fĂ¶rvĂ¤xlas med framsteg nĂ¤r fĂ¶rflyttningen mest bestĂĄr av mer lĂ¤sning av samma material.",
    intro:
      "Ett klargĂ¶rande om nĂ¤r rĂ¶relse i ett Ă¤rende Ă¤r just rĂ¶relse och inte nĂ¶dvĂ¤ndigtvis nĂĄgot som leder nĂĄgonstans.",
    route: "/handlaggarnytt/fortydligande-om-rorelse-utan-framsteg",
    published: "15 april 2026",
    metadataTitle: "FĂ¶rtydligande om rĂ¶relse utan framsteg | HandlĂ¤ggarnytt",
    metadataDescription:
      "En kort notis om att intern rĂ¶relse i Ă¤renden inte alltid ska tolkas som framsteg.",
    sections: [
      {
        heading: "Vad avses?",
        body:
          "Att ett Ă¤rende kan passera fler led, fĂĄ ny placering eller ny rubrik utan att dess riktning blir nĂ¤mnvĂ¤rt annorlunda.",
      },
      {
        heading: "VarfĂ¶r fĂ¶rtydligas detta?",
        body:
          "FĂ¶r att den som fĂ¶ljer flĂ¶det inte ska behĂ¶va tro att varje fĂ¶rflyttning betyder mer Ă¤n den faktiskt gĂ¶r.",
      },
      {
        heading: "NĂ¤sta lĂ¤sning",
        body:
          "Kommer troligen att bekrĂ¤fta att rĂ¶relsen fortsĂ¤tter, men utan att hastigheten ska misstolkas som lĂ¶st problem.",
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
