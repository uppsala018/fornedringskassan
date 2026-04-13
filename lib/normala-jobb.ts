export type JobCategory =
  | "Fysiskt möjliga i teori"
  | "Administrativt obegripliga"
  | "Symboliska tjänster"
  | "Säsongsbaserad overklighet";

export type JobRecord = {
  id: string;
  title: string;
  category: JobCategory;
  location: string;
  employmentType: string;
  compensation: string;
  description: string;
  duties: string[];
  requirements: string[];
  absurdityLevel: number;
  applyOutcomes: string[];
};

export const jobCategories: JobCategory[] = [
  "Fysiskt möjliga i teori",
  "Administrativt obegripliga",
  "Symboliska tjänster",
  "Säsongsbaserad overklighet",
];

export const globalApplyOutcomes = [
  "Tjänsten är tillsatt sedan innan den utlystes.",
  "Du bedöms överkvalificerat otillräcklig.",
  "Tjänsten var endast teoretiskt tillgänglig.",
  "Din ansökan har skickats vidare till annan funktion.",
  "Arbetsgivaren efterfrågar tidigare erfarenhet av liknande overklighet.",
  "Rekryteringen har pausats i väntan på fortsatt oklarhet.",
  "Tjänsten har omvandlats till praktik i efterhand.",
  "Din profil matchar rollen på ett sätt som ännu inte kan styrkas.",
  "Arbetsgivaren söker någon med dokumenterad erfarenhet av att inte ifrågasätta.",
  "Ansökan mottagen. Verkligheten inväntas.",
];

export const jobs: JobRecord[] = [
  {
    id: "job-001",
    title: "Stolsvärmare",
    category: "Fysiskt möjliga i teori",
    location: "Stockholm",
    employmentType: "Behovsanställning",
    compensation: "Timlön enligt sittgrad",
    description:
      "Hålla sittplats varm åt chef, beslutsfattare eller annan person med begränsad tålamodskapacitet.",
    duties: [
      "Förvärma kontorsstol inför möten",
      "Säkerställa jämn sitskomfort",
      "Lämna platsen med kort varsel vid chefsankomst",
    ],
    requirements: [
      "God värmehållningsförmåga",
      "Diskret uppträdande",
      "Förmåga att inte ställa följdfrågor",
    ],
    absurdityLevel: 7,
    applyOutcomes: [
      "Tjänsten är tillsatt sedan stolen redan blivit varm.",
      "Din sittprofil matchar rollen, men arbetsgivaren önskar högre grundvärme.",
      "Tjänsten har övergått till extern upphandling.",
    ],
  },
  {
    id: "job-002",
    title: "Sängvärmare",
    category: "Fysiskt möjliga i teori",
    location: "Uppsala",
    employmentType: "Nattbaserad visstid",
    compensation: "Fast nattillägg samt värmeersättning",
    description:
      "Förvärma sängmiljö åt uppdragsgivare med förhöjda komfortkrav och låg tålighet för initial kyla.",
    duties: [
      "Upprätthålla tillfällig madrassvärme",
      "Lämna sängplats vid signal eller förutbestämd tidpunkt",
      "Föra enkel värmelogg vid behov",
    ],
    requirements: ["God kroppsvärme", "Punktlighet", "Viss integritetsmässig töjbarhet"],
    absurdityLevel: 9,
    applyOutcomes: [
      "Arbetsgivaren har redan somnat kallt men bestämt.",
      "Tjänsten kräver tidigare dokumenterad erfarenhet av diskret uppvärmning.",
      "Din ansökan har skickats till annan funktion med sängnära ansvar.",
    ],
  },
  {
    id: "job-003",
    title: "Paraplyhållare",
    category: "Symboliska tjänster",
    location: "Göteborg",
    employmentType: "Timanställning vid nederbörd",
    compensation: "Rörlig ersättning beroende på regnintensitet",
    description:
      "Hålla paraply över uppdragsgivare som av principiella skäl inte bär sitt eget väderskydd.",
    duties: [
      "Följa uppdragsgivare i lätt till måttlig nederbörd",
      "Justera vinkel efter vindriktning och självbild",
      "Förbli utanför fotografiskt fokus",
    ],
    requirements: ["Stabil handled", "God balans", "Låg synlighetsambition"],
    absurdityLevel: 6,
    applyOutcomes: [
      "Arbetsgivaren har valt regn som ledarskapsstrategi.",
      "Tjänsten kvarstår men paraplyet har omklassificerats.",
      "Du bedöms kunna hålla paraply i teori men saknar dokumenterad skuggerfarenhet.",
    ],
  },
  {
    id: "job-004",
    title: "Köplatsvärd",
    category: "Administrativt obegripliga",
    location: "Malmö",
    employmentType: "Deltid",
    compensation: "Per väntad kvart",
    description:
      "Stå i kö åt uppdragsgivare med begränsad köuthållighet eller utökad självbetydelse.",
    duties: [
      "Representera annan person i fysisk kömiljö",
      "Hålla plats med låg konfliktintensitet",
      "Överlämna köposition vid rätt ögonblick",
    ],
    requirements: ["God benkapacitet", "Tyst konflikthantering", "Förmåga att stå still med riktning"],
    absurdityLevel: 5,
    applyOutcomes: [
      "Kön har digitaliserats och tjänsten blivit symbolisk.",
      "Din väntprofil är lovande men otillräckligt styrkt.",
      "Tjänsten är tillsatt av någon som kom före via kontakter.",
    ],
  },
  {
    id: "job-005",
    title: "Reservfikaansvarig",
    category: "Symboliska tjänster",
    location: "Västerås",
    employmentType: "Behov",
    compensation: "Kaffeersättning samt smultillägg",
    description:
      "Säkerställa att oanvänd fika finns tillgänglig för möten som riskerar att inte bli av.",
    duties: [
      "Placera ut strategiskt overksam fika",
      "Byta ut torra kakor mot nya torra kakor",
      "Rapportera fikans outnyttjade potential",
    ],
    requirements: [
      "Grundläggande brickvana",
      "Tålighet mot passivitet",
      "Förmåga att se mening i bullar utan mottagare",
    ],
    absurdityLevel: 6,
    applyOutcomes: [
      "Mötet ställdes in men fikabehovet kvarstår principiellt.",
      "Tjänsten har ersatts av självserverande osäkerhet.",
      "Din ansökan mottagen. Kaffe inväntas.",
    ],
  },
  {
    id: "job-006",
    title: "Symbolisk projektmedarbetare",
    category: "Symboliska tjänster",
    location: "Hybrid",
    employmentType: "Projektanställning",
    compensation: "Symbolisk",
    description:
      "Förekomma i interna sammanställningar och bidra till känslan av förstärkt kapacitet.",
    duties: [
      "Vara upptagen i dokument",
      "Delta i möten utan ansvar",
      "Bekräfta projektets existens genom närvaro",
    ],
    requirements: [
      "Grundläggande kalenderkompatibilitet",
      "Förmåga att låta relevant i förbifarten",
      "Stabil namnrad i presentationsmaterial",
    ],
    absurdityLevel: 8,
    applyOutcomes: [
      "Tjänsten finns redan i organisationsschemat och behöver inte bemannas i verkligheten.",
      "Du bedöms lämplig men för konkret.",
      "Projektet har gått in i förlängd förberedelsefas.",
    ],
  },
  {
    id: "job-007",
    title: "Tystnadskoordinator",
    category: "Administrativt obegripliga",
    location: "Örebro",
    employmentType: "Tills vidare",
    compensation: "Individuell lönesättning utan samtalsutrymme",
    description:
      "Säkerställa att rätt typ av tystnad upprätthålls i offentliga väntrum och administrativa miljöer.",
    duties: [
      "Kvalitetssäkra tystnadens karaktär",
      "Dämpa onödigt mänsklig stämning",
      "Samordna blickar utan ord",
    ],
    requirements: ["Tyst pondus", "God känsla för stillastående", "Erfarenhet av socialt vakuum meriterande"],
    absurdityLevel: 7,
    applyOutcomes: [
      "Arbetsgivaren efterfrågar ännu tystare profil.",
      "Tjänsten har hanterats utan ord och är därmed tillsatt.",
      "Din ljudnivå kunde inte godtas.",
    ],
  },
  {
    id: "job-008",
    title: "Molnjusterare",
    category: "Säsongsbaserad overklighet",
    location: "Mellansverige",
    employmentType: "Väderberoende visstid",
    compensation: "Fast lön vid klar himmel",
    description:
      "Bidra till jämn molnfördelning över utvalda områden med låg himmelsbalans.",
    duties: [
      "Övervaka molnens allmänna hållning",
      "Lämna vädermässiga synpunkter",
      "Rapportera ojämn gråskala",
    ],
    requirements: ["Horisontvana", "Tålamod vid långsam luftomfördelning", "Dokumenterad blick uppåt"],
    absurdityLevel: 9,
    applyOutcomes: [
      "Molnläget är redan justerat av annan funktion.",
      "Du saknar certifiering för lågtrycksnära bedömning.",
      "Tjänsten kvarstår i teorin.",
    ],
  },
  {
    id: "job-009",
    title: "Vindparkeringsassistent",
    category: "Säsongsbaserad overklighet",
    location: "Kalmar",
    employmentType: "Beredskap",
    compensation: "Rörlig ersättning beroende på luftflöde",
    description:
      "Hjälpa vinden att hitta lämpliga platser att passera genom utan att störa helhetsintrycket.",
    duties: [
      "Identifiera vindmässigt lämpliga zoner",
      "Mildra byars sociala framtoning",
      "Registrera tillfälliga luftköer",
    ],
    requirements: ["God orienteringsförmåga", "Stabil hållning i dragiga miljöer", "Viss förståelse för luftens behov"],
    absurdityLevel: 10,
    applyOutcomes: [
      "Vinden har redan gått vidare.",
      "Tjänsten har blåst inne men kvarstår administrativt.",
      "Din profil matchar rollen endast i medvind.",
    ],
  },
  {
    id: "job-010",
    title: "Asfaltsviskare",
    category: "Fysiskt möjliga i teori",
    location: "Linköping",
    employmentType: "Fältbaserad deltid",
    compensation: "Milersättning samt symbolisk slitagetillägg",
    description:
      "Kommunicera lågmält med vägbanor i behov av strukturell bekräftelse.",
    duties: [
      "Identifiera känsliga partier i asfalten",
      "Förmedla uppmuntrande ord till sprickbildning",
      "Rapportera vägbanans mottaglighet",
    ],
    requirements: [
      "God knäledsnärvaro",
      "Tålighet mot offentlig insyn",
      "Förmåga att tala utan förväntan om svar",
    ],
    absurdityLevel: 8,
    applyOutcomes: [
      "Arbetsgivaren önskar sökande med erfarenhet av liknande underlag.",
      "Tjänsten har flyttats till grusvägsenheten.",
      "Din ansökan bedöms vara spricknära men ej bärande.",
    ],
  },
  {
    id: "job-011",
    title: "Existentiell lagerinventerare",
    category: "Administrativt obegripliga",
    location: "Jönköping",
    employmentType: "Tills vidare i osäker omfattning",
    compensation: "Enligt förekomst",
    description:
      "Inventera sådant som möjligen finns men som ännu inte har lokaliserats i meningsfull form.",
    duties: [
      "Räkna osäkra tillgångar",
      "Katalogisera frånvarande objekt",
      "Upprätta lagerlista över eventuellt innehåll",
    ],
    requirements: ["Hög tolerans för tomma hyllor", "God abstraktionsförmåga", "Förmåga att dokumentera tvekan med ordning"],
    absurdityLevel: 9,
    applyOutcomes: [
      "Lagret kunde inte styrkas men behovet kvarstår.",
      "Du bedöms ha rätt inställning men för fast verklighetsförankring.",
      "Tjänsten har lagts på obestämd hylla.",
    ],
  },
  {
    id: "job-012",
    title: "Snösorterare",
    category: "Säsongsbaserad overklighet",
    location: "Sundsvall",
    employmentType: "Säsongsanställning",
    compensation: "Per godkänd snöenhet",
    description:
      "Klassificera snö efter karaktär, temperaturmässig hållning och allmän avsikt.",
    duties: [
      "Dela in snö i administrativa kategorier",
      "Säkerställa att blandad snö hålls åtskild",
      "Rapportera oklar nederbörd till ansvarig funktion",
    ],
    requirements: ["Kyla utan bitterhet", "Noggrann hand med frusna ämnen", "Grundläggande vitt sinne"],
    absurdityLevel: 8,
    applyOutcomes: [
      "Säsongen har smält men rekryteringen fortsätter.",
      "Du saknar erfarenhet av lös och beslutsmässig snö.",
      "Tjänsten återkommer när vädret beslutat sig.",
    ],
  },
  {
    id: "job-013",
    title: "Regnlogistiker",
    category: "Säsongsbaserad overklighet",
    location: "Borås",
    employmentType: "Konsultuppdrag",
    compensation: "Oklart vid uppehåll",
    description:
      "Planera nederbördens ankomst till områden med dokumenterad torrhet eller låg stämning.",
    duties: [
      "Förbereda regnmässiga ankomstrutter",
      "Samordna droppfördelning",
      "Informera marken om kommande utveckling",
    ],
    requirements: ["God planeringsförmåga", "Hydrologisk intuition", "Punktlighet under lågtryck"],
    absurdityLevel: 8,
    applyOutcomes: [
      "Nederbörden har outsourcats.",
      "Din ansökan bedöms lovande men för solig.",
      "Tjänsten kvarstår i lätt duggform.",
    ],
  },
  {
    id: "job-014",
    title: "Biträdande tomhetskonsult",
    category: "Symboliska tjänster",
    location: "Karlstad",
    employmentType: "Interimistisk",
    compensation: "Enligt erfarenhet av frånvaro",
    description:
      "Kvalitetssäkra innehållslösa dokument, möten utan riktning och organisatoriska mellanrum.",
    duties: [
      "Utvärdera graden av tomhet",
      "Föreslå förbättrad frånvaro av innehåll",
      "Skapa rapporter som inte stör vakuumet",
    ],
    requirements: [
      "Dokumenterad känsla för intet",
      "Förmåga att tala länge utan att lämna spår",
      "Konsultmässig hållning",
    ],
    absurdityLevel: 9,
    applyOutcomes: [
      "Tjänsten har absorberats av befintlig tomhet.",
      "Arbetsgivaren önskar större erfarenhet av innehållslös tydlighet.",
      "Din ansökan är intressant men för konkret.",
    ],
  },
  {
    id: "job-015",
    title: "Skuggtekniker",
    category: "Fysiskt möjliga i teori",
    location: "Visby",
    employmentType: "Säsongsvis",
    compensation: "Skuggbundet arvode",
    description:
      "Optimera skuggors placering under soliga dagar i offentlig och halvprivat miljö.",
    duties: [
      "Identifiera skuggbehov hos känsliga ytor",
      "Bidra till jämn mörkerfördelning",
      "Samverka med ljus på låg konfliktnivå",
    ],
    requirements: [
      "God känsla för kontrast",
      "Förmåga att arbeta i tyst närvaro",
      "Erfarenhet av ljusnära arbetsmiljö meriterande",
    ],
    absurdityLevel: 7,
    applyOutcomes: [
      "Sökande med längre erfarenhet av eftermiddagsljus prioriteras.",
      "Tjänsten har försvunnit tillfälligt bakom moln.",
      "Din profil bedöms halvskuggig men inte fullt användbar.",
    ],
  },
  {
    id: "job-016",
    title: "Pappersriktare",
    category: "Fysiskt möjliga i teori",
    location: "Eskilstuna",
    employmentType: "Kontorsnära visstid",
    compensation: "Per uträtad handling",
    description:
      "Återställa dokument till korrekt planhet efter felaktig hantering, oro eller administrativ påverkan.",
    duties: [
      "Rikta skrynkliga handlingar",
      "Mildra visuella spår av frustration",
      "Förbättra dokumentens yttre trovärdighet",
    ],
    requirements: ["Lugn hand", "Tålighet mot papper", "Respekt för form över innehåll"],
    absurdityLevel: 5,
    applyOutcomes: [
      "Tjänsten har digitaliserats utan att problemen försvunnit.",
      "Du saknar styrkt erfarenhet av korrekt planhet.",
      "Din ansökan har vikts fel.",
    ],
  },
  {
    id: "job-017",
    title: "Ljusknappsoperatör",
    category: "Fysiskt möjliga i teori",
    location: "Norrköping",
    employmentType: "Deltid",
    compensation: "Per genomförd tändning",
    description:
      "Ansvara för strategisk av- och påslagning av ljus i lokaler där andra helst inte vill resa sig.",
    duties: [
      "Tända och släcka enligt behov",
      "Avläsa rummets mörkerberedskap",
      "Dokumentera knapptryck i enkel logg",
    ],
    requirements: ["Förmåga att nå väggnära funktioner", "God tajming", "Låg prestige"],
    absurdityLevel: 4,
    applyOutcomes: [
      "Tjänsten tillsatt av närmast stående person.",
      "Arbetsgivaren önskar längre erfarenhet av belysningsnära beslut.",
      "Din knappkompetens kunde inte styrkas.",
    ],
  },
  {
    id: "job-018",
    title: "Dörröppnare med utökad serviceprofil",
    category: "Fysiskt möjliga i teori",
    location: "Stockholm",
    employmentType: "Behov",
    compensation: "Per öppnad passage",
    description:
      "Öppna dörrar åt uppdragsgivare med låg handlingsmarginal eller hög självuppfattning.",
    duties: [
      "Förhandsbedöma dörrars öppningsbehov",
      "Utföra diskret passageassistans",
      "Bibehålla korrekt respektavstånd",
    ],
    requirements: ["Grundläggande handstyrka", "Servicekänsla", "Förmåga att agera utan att synas"],
    absurdityLevel: 5,
    applyOutcomes: [
      "Dörren stod redan öppen och tjänsten drogs tillbaka.",
      "Din profil är lovande men arbetsgivaren söker mer undergiven framtoning.",
      "Ansökan vidarebefordrad till portnära funktion.",
    ],
  },
  {
    id: "job-019",
    title: "Smörgåsförtestare",
    category: "Symboliska tjänster",
    location: "Lund",
    employmentType: "Timbaserad provsmakning",
    compensation: "Per verifierad tugga",
    description:
      "Förhandsgranska smörgåsar åt uppdragsgivare med utökad försiktighet eller reducerat förtroende för bröd.",
    duties: [
      "Utföra symbolisk eller faktisk första tugga",
      "Rapportera textur, trygghet och allmän tuggbärighet",
      "Säkerställa att smörgåsen är socialt användbar",
    ],
    requirements: ["Tuggvana", "Diskret omdömesförmåga", "Viss motståndskraft mot pålägg"],
    absurdityLevel: 7,
    applyOutcomes: [
      "Arbetsgivaren har övergått till soppa.",
      "Tjänsten kräver tidigare erfarenhet av lågmäld förtuggning.",
      "Din ansökan mottagen. Smörgås inväntas.",
    ],
  },
  {
    id: "job-020",
    title: "Sucksamordnare",
    category: "Administrativt obegripliga",
    location: "Gävle",
    employmentType: "Tills vidare",
    compensation: "Schablonersättning per tungt andetag",
    description:
      "Samordna suckar, lågmäld uppgivenhet och korrekt känsloflöde i administrativa miljöer.",
    duties: [
      "Kalibrera stämning i väntrum",
      "Upprätthålla jämn nivå av institutionell trötthet",
      "Mildra överdriven optimism",
    ],
    requirements: [
      "God andningsteknik",
      "Känsla för kollektiv uppgivenhet",
      "Förmåga att sucka utan att störa processen",
    ],
    absurdityLevel: 8,
    applyOutcomes: [
      "Tjänsten är tillsatt av intern suckresurs.",
      "Din känsloprofil bedöms för hoppfull.",
      "Ansökan mottagen med tung andning.",
    ],
  },
  {
    id: "job-021",
    title: "Handväskebärare åt samhällsviktig person",
    category: "Fysiskt möjliga i teori",
    location: "Stockholm",
    employmentType: "Visstid",
    compensation: "Fast lön med axeltillägg",
    description:
      "Bära väska åt person vars händer bedömts för upptagna för egen bärförmåga.",
    duties: [
      "Förflytta handväska i lämpligt avstånd",
      "Anpassa gångtempo efter statusnivå",
      "Undvika alltför jämlik framtoning",
    ],
    requirements: ["God axeluthållighet", "Låg egen agenda", "Förmåga att gå bakom med precision"],
    absurdityLevel: 6,
    applyOutcomes: [
      "Arbetsgivaren bär nu symboliskt sin egen börda.",
      "Tjänsten kräver tidigare erfarenhet av följsam underordning.",
      "Din hållning bedömdes för självständig.",
    ],
  },
  {
    id: "job-022",
    title: "Kudduppfluffare",
    category: "Fysiskt möjliga i teori",
    location: "Falun",
    employmentType: "Deltid med kvällsinslag",
    compensation: "Per återställd volymenhet",
    description:
      "Återföra kuddar till socialt acceptabel fluffighet inför vila, möten eller offentligt intryck.",
    duties: [
      "Bedöma fluffnivå",
      "Utföra manuell uppvolymisering",
      "Dokumentera resultat i enkel kuddlogg",
    ],
    requirements: [
      "God handkoordination",
      "Estetisk känsla för mjukhet",
      "Förmåga att se potential i hoptryckt material",
    ],
    absurdityLevel: 5,
    applyOutcomes: [
      "Tjänsten har omvandlats till konsultstöd vid plattare behov.",
      "Din fluffkompetens är lovande men otillräckligt dokumenterad.",
      "Arbetsgivaren har valt hårdare linje.",
    ],
  },
  {
    id: "job-023",
    title: "Privat applådstartare",
    category: "Symboliska tjänster",
    location: "Göteborg",
    employmentType: "Evenemangsbaserad behovsanställning",
    compensation: "Per initierad applådvåg",
    description:
      "Diskret inleda applåder åt uppdragsgivare vars prestationer inte självklart utlöser gensvar.",
    duties: [
      "Läsa av publikens tvekan",
      "Sätta rätt klappnivå",
      "Normalisera uppskattning på kommando",
    ],
    requirements: [
      "Taktkänsla",
      "Socialt mod med låg synlighet",
      "Förmåga att applådera övertygande utan personlig övertygelse",
    ],
    absurdityLevel: 7,
    applyOutcomes: [
      "Publiken uteblev men behovet kvarstår principiellt.",
      "Tjänsten kräver tidigare erfarenhet av strategiskt jubel.",
      "Din applådprofil bedömdes för ärlig.",
    ],
  },
  {
    id: "job-024",
    title: "Personlig skobytarkoordinator",
    category: "Fysiskt möjliga i teori",
    location: "Malmö",
    employmentType: "Behov",
    compensation: "Per korrekt genomfört skobyte",
    description:
      "Assistera uppdragsgivare vid växling mellan inne- och uteskor utan onödig böjning från dennes sida.",
    duties: [
      "Placera fram skor i rätt ordning",
      "Samordna övergång mellan golvzoner",
      "Mildra kontakt med snören",
    ],
    requirements: ["God ordningsförmåga", "Praktisk rörlighet", "Förståelse för fotnära integritet"],
    absurdityLevel: 6,
    applyOutcomes: [
      "Tjänsten har tillfälligt övertagits av slip-in-lösning.",
      "Arbetsgivaren söker längre erfarenhet av underordnad skologistik.",
      "Din ansökan bedömdes knytbar men ej bindande.",
    ],
  },
  {
    id: "job-025",
    title: "Förvarningsmottagare av obehagliga besked",
    category: "Administrativt obegripliga",
    location: "Umeå",
    employmentType: "Konsultuppdrag",
    compensation: "Fast arvode per absorberat besked",
    description:
      "Ta emot preliminärt negativa besked åt uppdragsgivare med begränsad tålighet för direkt motgång.",
    duties: [
      "Mottaga och filtrera dåliga nyheter",
      "Mildra tonfall innan vidarebefordran",
      "Skapa känslomässig buffert",
    ],
    requirements: ["Emotionell stötdämpning", "Låg dramatisk profil", "Förmåga att höra nej utan att bli nej"],
    absurdityLevel: 8,
    applyOutcomes: [
      "Tjänsten drogs tillbaka efter att beskedet blivit ännu sämre.",
      "Din profil är stark men saknar dokumenterad motgångsabsorbering.",
      "Ansökan mottagen. Obehag inväntas.",
    ],
  },
  {
    id: "job-026",
    title: "Morgontrötthetsbiträde",
    category: "Fysiskt möjliga i teori",
    location: "Stockholm",
    employmentType: "Tidiga timmar",
    compensation: "Morgonpåslag kan förekomma",
    description:
      "Utföra enklare första-30-minutersuppgifter åt uppdragsgivare som ännu inte uppnått mänsklig status för dagen.",
    duties: [
      "Öppna gardiner vid behov",
      "Bekräfta klockans existens",
      "Mildra övergång från säng till ansvar",
    ],
    requirements: ["Punktlighet i gryningsnära miljö", "Låg samtalsnivå", "Förmåga att verka utan att irritera"],
    absurdityLevel: 7,
    applyOutcomes: [
      "Arbetsgivaren sov vidare men tackar för intresse.",
      "Tjänsten kräver tidigare erfarenhet av lågmäld morgonservice.",
      "Din ansökan har vidarebefordrats före uppvaknande.",
    ],
  },
  {
    id: "job-027",
    title: "Ansiktsuttrycksjusterare inför pressbild",
    category: "Symboliska tjänster",
    location: "Stockholm",
    employmentType: "Uppdragsbaserad",
    compensation: "Per korrigerat uttryck",
    description:
      "Bidra till lämplig ansiktsframtoning hos uppdragsgivare inför fotografering, uttalanden eller kontrollerad medkänsla.",
    duties: [
      "Föreslå trovärdig blick",
      "Mildra överlägsen munhållning",
      "Kalibrera ansiktsnivå mellan fast och varm",
    ],
    requirements: [
      "God människokännedom",
      "Tålamod inför yttre förvaltning",
      "Diskret estetisk styrning",
    ],
    absurdityLevel: 7,
    applyOutcomes: [
      "Tjänsten tillsatt av intern medieträning.",
      "Du bedöms kunna justera uttryck men saknar förankring i offentlig glans.",
      "Ansökan mottagen med neutral min.",
    ],
  },
  {
    id: "job-028",
    title: "Privat dörrknackningsföreträdare",
    category: "Fysiskt möjliga i teori",
    location: "Helsingborg",
    employmentType: "Behovsanställning",
    compensation: "Per korrekt genomförd knackning",
    description:
      "Knacka på åt uppdragsgivare som av skäl relaterade till självbild, rädsla eller lathet önskar mellanled vid entré.",
    duties: [
      "Utföra första kontakten med dörryta",
      "Anpassa knackningsstyrka efter social nivå",
      "Ta det initiala obehaget",
    ],
    requirements: ["Handprecision", "God timing", "Förmåga att vänta på annan persons välkomstgrad"],
    absurdityLevel: 6,
    applyOutcomes: [
      "Dörren öppnades aldrig men tjänsten anses genomförd.",
      "Din knackningsprofil var tydlig men för mänsklig.",
      "Tjänsten övergår till ringklocksenheten.",
    ],
  },
  {
    id: "job-029",
    title: "Pendlingsersättare",
    category: "Administrativt obegripliga",
    location: "Mälardalen",
    employmentType: "Visstid",
    compensation: "Resebaserad",
    description:
      "Genomföra pendling åt uppdragsgivare i syfte att denne ska anses ha varit där mentalt.",
    duties: [
      "Sitta på tåg med representativ hållning",
      "Anlända i någon annans ställe",
      "Bära kollektivtrafikal trötthet med trovärdighet",
    ],
    requirements: ["SL-kompatibilitet", "God sittuthållighet", "Förmåga att resa utan att personligen vinna på det"],
    absurdityLevel: 9,
    applyOutcomes: [
      "Arbetsgivaren har övergått till distansillusion.",
      "Din resvana är relevant men otillräckligt delegerbar.",
      "Tjänsten är tillsatt av annan kropp.",
    ],
  },
  {
    id: "job-030",
    title: "Särskild handläggare för normalt förekommande arbete",
    category: "Administrativt obegripliga",
    location: "Arbetsförnedringen, central funktion",
    employmentType: "Tills vidare",
    compensation: "Konkurrenskraftig i princip",
    description:
      "Identifiera arbeten som i teorin borde finnas och matcha dem mot personer som redan bedömts passa i teori.",
    duties: [
      "Formulera rimlighet där sådan saknas",
      "Samordna teoretiska tjänster med praktisk frånvaro",
      "Stärka arbetslinjens narrativa självförtroende",
    ],
    requirements: ["Hög abstraktionsförmåga", "Tålighet mot konkreta invändningar", "Förmåga att tala länge om möjlighet"],
    absurdityLevel: 10,
    applyOutcomes: [
      "Tjänsten har redan tillsatts av systemet självt.",
      "Du bedöms lämplig men för verklighetsnära.",
      "Ansökan mottagen. Rimlighet inväntas.",
    ],
  },
];
