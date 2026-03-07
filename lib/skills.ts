import { SKILL_COLORS } from './courses';

export interface SkillFAQ {
  question: string;
  answer: string;
}

export interface Skill {
  slug: string;
  name: string;
  color: string;
  tagline: string;
  description: string;
  icon: string;
  /** Extended content sections for the skill page (rendered as H2 + paragraph pairs) */
  sections?: { heading: string; body: string }[];
  /** FAQ items for schema markup and on-page content */
  faq?: SkillFAQ[];
}

export const SKILLS: Skill[] = [
  {
    slug: 'aanwezigheid',
    name: 'Aanwezigheid',
    color: SKILL_COLORS.Aanwezigheid,
    tagline: 'Echt aanwezig zijn voor je kind',
    description:
      'Twee minuten echte aandacht doet meer dan een uur half aanwezig zijn. Aanwezigheid gaat niet over hoeveel tijd je hebt, maar over de kwaliteit van je aandacht. Leer hoe je in een druk leven toch de vader kunt zijn die er echt is.',
    icon: 'Eye',
    sections: [
      {
        heading: 'Waarom aanwezigheid de basis is van goed vaderschap',
        body: 'Onderzoek van John Bowlby en Mary Ainsworth laat zien dat kinderen een veilige hechting ontwikkelen wanneer hun ouders beschikbaar en responsief zijn. Voor vaders betekent dit niet dat je elk moment van de dag fysiek aanwezig moet zijn. Het gaat om de kwaliteit van de momenten die je deelt. Wanneer je kind tegen je praat en je legt je telefoon neer, maak je oogcontact en luister je echt, dan voelt je kind: ik ben belangrijk. Dat gevoel vormt de basis van zelfvertrouwen.',
      },
      {
        heading: 'Hoe oefen je aanwezigheid als drukke vader?',
        body: 'Begin klein. Kies een vast moment per dag waarop je volledig beschikbaar bent voor je kind. Dat kan tijdens het avondeten zijn, bij het voorlezen, of tijdens een wandeling. Leg je telefoon in een andere kamer. Stel geen vragen over school of huiswerk, maar volg waar je kind naartoe gaat. Als je kind wil spelen, speel mee. Als het stil is, wees dan ook stil. Aanwezigheid betekent niet dat je iets moet doen. Het betekent dat je er bent, zonder agenda.',
      },
      {
        heading: 'De wetenschap achter aandacht en kinderontwikkeling',
        body: 'Neurowetenschappelijk onderzoek toont aan dat wanneer een ouder echt aandacht geeft, het brein van het kind oxytocine vrijmaakt. Dit hormoon versterkt de band en geeft een gevoel van veiligheid. Kinderen die regelmatig deze ervaring hebben, ontwikkelen een sterker werkgeheugen, betere emotieregulatie en meer veerkracht bij tegenslag. Het zijn niet de grote uitstapjes die het verschil maken, maar de dagelijkse kleine momenten van echte verbinding.',
      },
    ],
    faq: [
      {
        question: 'Hoeveel quality time heeft mijn kind per dag nodig?',
        answer: 'Onderzoek wijst uit dat 15 tot 20 minuten onverdeelde aandacht per dag al een groot verschil maakt. Het gaat niet om de hoeveelheid tijd, maar om de kwaliteit. Een vader die tien minuten echt luistert, doet meer voor de hechting dan een die uren in dezelfde kamer zit maar afgeleid is door zijn telefoon.',
      },
      {
        question: 'Hoe kan ik aanwezig zijn als ik lange werkdagen maak?',
        answer: 'Focus op de overgangsmomenten: het moment dat je thuiskomt en het moment voor het slapengaan. Maak er een ritueel van. Bijvoorbeeld: als je thuiskomt, ga je eerst vijf minuten op de grond zitten met je kind voordat je iets anders doet. Consistentie is belangrijker dan duur.',
      },
      {
        question: 'Mijn kind wil niet praten als ik er ben. Wat doe ik fout?',
        answer: 'Waarschijnlijk niets. Veel kinderen, vooral tieners, praten niet op commando. De truc is om beschikbaar te zijn zonder druk. Doe iets samen: autorijden, koken, wandelen. Tijdens zijdelingse activiteiten ontstaan de beste gesprekken vanzelf, omdat er geen oogcontact-druk is.',
      },
    ],
  },
  {
    slug: 'emotiecoaching',
    name: 'Emotiecoaching',
    color: SKILL_COLORS.Emotiecoaching,
    tagline: 'De emoties van je kind begeleiden',
    description:
      'Wanneer je kind boos, bang of verdrietig is, heb je als vader een unieke kans. Niet om de emotie weg te nemen, maar om je kind te leren dat alle gevoelens welkom zijn. Emotiecoaching is de vaardigheid die de basis legt voor emotionele intelligentie.',
    icon: 'Heart',
    sections: [
      {
        heading: 'Wat is emotiecoaching precies?',
        body: 'Emotiecoaching is een benadering ontwikkeld door psycholoog John Gottman. Het idee is eenvoudig: in plaats van emoties te negeren, af te straffen of weg te redeneren, help je je kind om ze te herkennen, te benoemen en ermee om te gaan. Als vader ben je daarin een rolmodel. Wanneer jij laat zien dat boosheid, verdriet en angst normale gevoelens zijn, leert je kind dat het veilig is om te voelen.',
      },
      {
        heading: 'De vijf stappen van emotiecoaching',
        body: 'Gottman beschrijft vijf stappen: (1) Merk de emotie op voordat deze escaleert. (2) Zie het emotionele moment als kans voor verbinding. (3) Luister met empathie en bevestig het gevoel. (4) Help je kind de emotie te benoemen met woorden. (5) Stel samen grenzen en los het probleem op. Dit klinkt simpel, maar in de hitte van het moment vergeet je het snel. Oefening maakt het tot een tweede natuur.',
      },
      {
        heading: 'Waarom vaders een unieke rol spelen bij emotiecoaching',
        body: 'Uit onderzoek van het Gottman Institute blijkt dat vaders die emotiecoaching toepassen een bijzonder sterk effect hebben op de emotionele ontwikkeling van hun kinderen. Kinderen met emotioneel beschikbare vaders scoren hoger op sociaal-emotionele vaardigheden, hebben minder gedragsproblemen en presteren beter op school. Dit komt doordat vaders vaak een andere speelstijl hebben: ruwer, fysieker, grenzen verleggend. Juist in die context leren kinderen om sterke emoties te reguleren.',
      },
    ],
    faq: [
      {
        question: 'Hoe reageer ik als mijn kind een driftbui heeft?',
        answer: 'Blijf kalm en ga op ooghoogte van je kind zitten. Benoem wat je ziet: "Ik zie dat je heel boos bent." Probeer niet te redeneren of af te leiden - dat werkt niet midden in een driftbui. Wacht tot de storm wat gaat liggen, bied troost aan, en bespreek pas daarna wat er gebeurde. Je kind kan niet leren als het nog in de emotie zit.',
      },
      {
        question: 'Mag ik als vader ook mijn emoties tonen?',
        answer: 'Absoluut. Sterker nog: het is belangrijk. Wanneer jij zegt "Ik merk dat ik gefrustreerd raak, ik ga even diep ademhalen", leer je je kind twee dingen tegelijk: dat emoties normaal zijn, en dat je er iets mee kunt doen. Vermijd wel om je kind verantwoordelijk te maken voor jouw emoties.',
      },
      {
        question: 'Vanaf welke leeftijd kun je beginnen met emotiecoaching?',
        answer: 'Vanaf het eerste jaar. Bij baby\'s en peuters gaat het vooral om het spiegelen van emoties en het benoemen van wat je ziet. "Je schrikt van dat harde geluid, he?" Naarmate je kind ouder wordt, kun je steeds meer de vijf stappen van Gottman toepassen. Het is nooit te vroeg of te laat om te beginnen.',
      },
    ],
  },
  {
    slug: 'zelfregulatie',
    name: 'Zelfregulatie',
    color: SKILL_COLORS.Zelfregulatie,
    tagline: 'Kalm blijven als het moeilijk wordt',
    description:
      'Je kunt je kind pas helpen reguleren als je jezelf kunt reguleren. Zelfregulatie gaat over het begrijpen van je eigen stressreacties, het herkennen van je triggers, en het bewust kiezen hoe je reageert in plaats van automatisch te exploderen.',
    icon: 'Waves',
    sections: [
      {
        heading: 'Waarom kalm blijven zo moeilijk is als vader',
        body: 'Wanneer je kind voor de vijfde keer niet luistert, activeert je brein het stresssysteem. Je amygdala schiet in de vecht-of-vluchtmodus en je prefrontale cortex, het deel dat rationeel nadenkt, wordt tijdelijk uitgeschakeld. Dit is een biologische reactie, geen karakterfout. Het goede nieuws: je kunt dit systeem trainen. Hoe vaker je bewust kiest om niet te reageren vanuit automatisme, hoe sterker de verbinding wordt tussen je emotionele en rationele brein.',
      },
      {
        heading: 'Praktische technieken voor zelfregulatie',
        body: 'De effectiefste techniek is de STOP-methode: Stop wat je doet, Trek je even terug (of neem een adempauze), Observeer wat je voelt in je lichaam, en Pas dan bewust je reactie aan. Andere technieken zijn de 4-7-8 ademhaling (4 tellen inademen, 7 tellen vasthouden, 8 tellen uitademen), lichaamsscanning (waar voel je de spanning?), en het herkennen van je persoonlijke waarschuwingssignalen zoals een strakke kaak of gebalde vuisten.',
      },
      {
        heading: 'Het effect van een kalme vader op kinderen',
        body: 'Kinderen reguleren hun emoties door co-regulatie: ze lenen de rust van hun ouders. Wanneer jij kalm blijft terwijl je kind dat niet is, bied je een emotioneel anker. Onderzoek van Dan Siegel laat zien dat kinderen met ouders die goed zelfreguleren, zelf ook betere emotieregulatie ontwikkelen. Je hoeft niet perfect te zijn. Het gaat erom dat je vaker wel dan niet de bewuste keuze maakt.',
      },
    ],
    faq: [
      {
        question: 'Hoe stop ik met schreeuwen tegen mijn kind?',
        answer: 'Herken je triggers voordat je explodeert. De meeste ouders schreeuwen niet uit het niets, er gaat een opbouw aan vooraf. Let op lichamelijke signalen: spanning in je schouders, snellere ademhaling, een warm hoofd. Zodra je die herkent, geef jezelf toestemming om even weg te lopen. Zeg: "Ik merk dat ik boos word. Ik ga even ademhalen en dan praten we verder." Dit is geen zwakte, maar kracht.',
      },
      {
        question: 'Is het slecht als mijn kind mij boos ziet?',
        answer: 'Boosheid tonen is niet per se slecht. Het is zelfs leerzaam als je kind ziet hoe jij met boosheid omgaat. Het wordt schadelijk wanneer je de controle verliest: schreeuwen, dreigen, dingen gooien. Het verschil zit in regulatie. "Ik ben boos omdat de afspraak niet is nagekomen" is gezonde communicatie. Ongecontroleerd uitbarsten is dat niet.',
      },
      {
        question: 'Kan ik zelfregulatie leren als ik altijd al een kort lontje heb?',
        answer: 'Ja. Zelfregulatie is een vaardigheid, geen aangeboren eigenschap. Net als een spier kun je hem trainen. Begin met kleine situaties: het verkeer, een lange rij in de supermarkt. Oefen daar bewust met ademhaling en het herkaderen van de situatie. Hoe meer je oefent in lage-stress situaties, hoe beter je het kunt toepassen wanneer het er thuis toe doet.',
      },
    ],
  },
  {
    slug: 'grenzen',
    name: 'Grenzen',
    color: SKILL_COLORS.Grenzen,
    tagline: 'Grenzen stellen met warmte',
    description:
      'Grenzen zijn geen straf. Ze zijn de structuur waarbinnen je kind veilig kan groeien. De kunst is om duidelijk en consequent te zijn zonder de verbinding te verliezen. Grenzen stellen met liefde is een van de moeilijkste en belangrijkste vaardigheden van het vaderschap.',
    icon: 'Shield',
    sections: [
      {
        heading: 'Het verschil tussen grenzen en straffen',
        body: 'Veel vaders verwarren grenzen stellen met straffen. Maar er is een wezenlijk verschil. Een straf is een reactie achteraf die bedoeld is om ongewenst gedrag te ontmoedigen, vaak door iets onaangenaams toe te voegen. Een grens is een duidelijke verwachting vooraf die je kind helpt te begrijpen wat wel en niet kan. "Als je je speelgoed niet opruimt, mag je vanavond niet op de iPad" is een logisch gevolg. "Omdat je stout was, krijg je geen toetje" is een straf zonder verband. Logische gevolgen leren. Willekeurige straffen beschadigen de relatie.',
      },
      {
        heading: 'Autoritatief opvoeden: het bewezen midden',
        body: 'Ontwikkelingspsycholoog Diana Baumrind beschreef vier opvoedstijlen. De autoritatieve stijl, met hoge warmte en duidelijke structuur, levert de beste uitkomsten op. Kinderen van autoritatieve ouders zijn zelfstandiger, sociaal vaardiger en presteren beter op school. Als vader betekent dit: wees duidelijk over wat je verwacht, leg uit waarom, en handhaaf consequent. Maar doe het altijd vanuit verbinding, niet vanuit macht.',
      },
      {
        heading: 'Grenzen per leeftijd: wat kun je verwachten?',
        body: 'Bij peuters (1-3 jaar) werken korte, duidelijke instructies met afleiding. Bij kleuters (3-6 jaar) kun je eenvoudige keuzes aanbieden: "Wil je eerst je tanden poetsen of eerst je pyjama aan?" Bij basisschoolkinderen (6-12 jaar) kun je samen regels opstellen en logische gevolgen afspreken. Bij tieners (12+) verschuift de rol van grenzen stellen naar samen onderhandelen. De grens wordt een afspraak, en je kind krijgt meer eigen verantwoordelijkheid.',
      },
    ],
    faq: [
      {
        question: 'Mijn kind luistert niet, wat doe ik fout?',
        answer: 'Vaak ligt het niet aan je kind maar aan hoe de boodschap wordt gebracht. Geef instructies op ooghoogte, in korte zinnen, en wacht tot je kind je aankijkt. Vermijd vragen als je een instructie bedoelt: niet "Wil je je schoenen aandoen?" maar "Het is tijd om je schoenen aan te doen." Herhalen werkt averechts. Geef de instructie een keer, wacht, en help dan fysiek als het nodig is.',
      },
      {
        question: 'Hoe blijf ik consequent zonder streng te worden?',
        answer: 'Consequent zijn betekent niet hard zijn. Het betekent dat je doet wat je zegt. Als je hebt gezegd dat het speelgoed opgeruimd moet worden voor het eten, houd je daaraan vast. Maar je kunt daarbij helpen, aanmoedigen en geduldig zijn. Consequentie gaat over voorspelbaarheid, niet over straffen. Je kind leert: papa meent wat hij zegt, en dat voelt veilig.',
      },
      {
        question: 'Mijn partner en ik zijn het niet eens over grenzen. Hoe lossen we dat op?',
        answer: 'Bespreek de grote lijnen op een rustig moment, niet in het bijzijn van je kind. Het hoeft niet exact hetzelfde te zijn, maar de basisregels moeten overeenkomen. Kinderen kunnen prima omgaan met kleine verschillen tussen ouders, maar inconsistentie over de grote dingen (slaaptijden, schermtijd, omgangsvormen) is verwarrend. Zoek samen de drie tot vijf regels die voor jullie het belangrijkst zijn.',
      },
    ],
  },
  {
    slug: 'autonomie',
    name: 'Autonomie',
    color: SKILL_COLORS.Autonomie,
    tagline: 'Loslaten zodat je kind kan groeien',
    description:
      'Elke keer dat je iets voor je kind doet wat het zelf kan, ontneem je een leerkans. Autonomie gaat over het vinden van de balans tussen beschermen en loslaten, tussen helpen en vertrouwen dat je kind het zelf kan.',
    icon: 'Sprout',
    sections: [
      {
        heading: 'Waarom loslaten zo lastig is voor vaders',
        body: 'Als vader wil je je kind beschermen. Dat is een diep biologisch instinct. Maar overbescherming heeft een keerzijde: kinderen die nooit mogen falen, leren niet omgaan met tegenslag. Psycholoog Lev Vygotsky noemde dit de "zone van naaste ontwikkeling" - het gebied tussen wat een kind al kan en wat het bijna kan. Daar vindt groei plaats. Jouw rol als vader is niet om obstakels weg te nemen, maar om dichtbij te zijn terwijl je kind ze zelf overwint.',
      },
      {
        heading: 'Autonomie stimuleren per leeftijd',
        body: 'Bij peuters begint het met keuzes: "Wil je de rode of de blauwe beker?" Bij kleuters laat je ze zelf problemen oplossen: "Hoe denk jij dat je die toren steviger kunt maken?" Bij schoolkinderen geef je verantwoordelijkheid: eigen huiswerk plannen, zelf naar een vriendje fietsen. Bij tieners verschuift je rol naar adviseur: je deelt je mening als erom gevraagd wordt, maar laat de beslissing bij hen. Elke leeftijdsfase vraagt om meer vertrouwen en minder controle.',
      },
      {
        heading: 'Het verschil tussen loslaten en verwaarlozen',
        body: 'Loslaten is niet hetzelfde als je niet interesseren. Het is juist het tegenovergestelde: je bent betrokken genoeg om te zien dat je kind iets zelf kan, en moedig genoeg om een stap terug te doen. Je blijft beschikbaar, je blijft geinteresseerd, maar je neemt het niet over. Een kind dat weet dat papa er is als het echt nodig is, maar dat hij vertrouwen heeft in zijn kind, groeit op met een stevig zelfbeeld.',
      },
    ],
    faq: [
      {
        question: 'Hoe weet ik wanneer ik moet helpen en wanneer niet?',
        answer: 'Kijk of je kind gefrustreerd raakt of overweldigd. Frustratie is productief: het betekent dat je kind aan het leren is. Overweldiging is dat niet: dan slaat de stress toe en leert je kind niets meer. Bij frustratie kun je aanmoedigen: "Ik zie dat het lastig is, probeer het nog een keer." Bij overweldiging bied je hulp aan: "Zal ik je laten zien hoe het kan?"',
      },
      {
        question: 'Mijn kind wil alles zelf doen maar het lukt nog niet. Wat doe ik?',
        answer: 'Dat is een goed teken. Het betekent dat je kind intrinsiek gemotiveerd is. Geef de tijd en ruimte om te oefenen, ook als het langer duurt of rommelig is. Een driejarige die zelf zijn boterham smeert maakt een puinhoop, maar leert een vaardigheid. Bied alleen hulp aan als erom gevraagd wordt, of als de veiligheid in het geding is.',
      },
      {
        question: 'Hoe stimuleer ik zelfstandigheid bij een onzeker kind?',
        answer: 'Begin met heel kleine stappen en vier elk succes. Een onzeker kind heeft bevestiging nodig dat het kan. Geef taken waarvan je weet dat ze lukken, en bouw langzaam op. Vermijd zinnen als "Dat kun je toch wel?" - die vergroten de onzekerheid. Zeg liever: "Ik weet dat dit spannend is. Ik ben hier als je me nodig hebt." Zo bouw je vertrouwen op zonder te pushen.',
      },
    ],
  },
  {
    slug: 'herstel',
    name: 'Herstel',
    color: SKILL_COLORS.Herstel,
    tagline: 'Herstellen na fouten en conflicten',
    description:
      'Perfecte ouders bestaan niet. Wat wel bestaat zijn ouders die na een fout terugkomen, sorry zeggen, en de relatie herstellen. Onderzoek laat zien dat het niet de conflicten zijn die schade aanrichten, maar het ontbreken van herstel.',
    icon: 'RefreshCw',
    sections: [
      {
        heading: 'Waarom herstel belangrijker is dan perfectie',
        body: 'Ontwikkelingspsycholoog Ed Tronick ontdekte het "still face experiment": wanneer een ouder tijdelijk niet reageert op een baby, raakt het kind van streek. Maar zodra de ouder weer responsief wordt, herstelt het kind snel. Tronick noemt dit "rupture and repair" - breuk en herstel. Hij concludeerde dat het niet de afwezigheid van breuken is die een veilige hechting creert, maar de aanwezigheid van herstel. Dit geldt voor alle leeftijden.',
      },
      {
        heading: 'Hoe zeg je sorry als vader?',
        body: 'Een goed excuus heeft drie onderdelen: erkenning, verantwoordelijkheid en herstel. "Ik schreeuwde net tegen je (erkenning). Dat had ik niet moeten doen, dat was niet oké (verantwoordelijkheid). Ik ga de volgende keer eerst even ademhalen (herstel)." Vermijd "maar": "Sorry dat ik schreeuwde, maar jij luisterde niet" is geen excuus. Het is een beschuldiging in een excuus-jasje. Houd het bij jezelf.',
      },
      {
        heading: 'Het effect van herstel op je kind',
        body: 'Wanneer je als vader na een conflict terugkomt en de relatie herstelt, leert je kind drie dingen. Ten eerste: relaties kunnen tegen een stootje. Ten tweede: fouten maken is menselijk en herstelbaar. Ten derde: het is sterk om je kwetsbaar op te stellen. Kinderen die opgroeien met ouders die herstellen, worden volwassenen die dat ook kunnen in hun eigen relaties.',
      },
    ],
    faq: [
      {
        question: 'Hoe snel moet ik sorry zeggen na een conflict?',
        answer: 'Zo snel als je oprecht kunt zijn. Wacht niet dagen, maar forceer het ook niet als je nog boos bent. Een onoprecht excuus doet meer kwaad dan goed. Een goede vuistregel: zodra je weer rustig bent en kunt reflecteren op wat er gebeurde, ga terug naar je kind. Bij jonge kinderen is dat liefst binnen een uur. Bij tieners kan het soms een avond duren.',
      },
      {
        question: 'Verlies ik gezag als ik sorry zeg tegen mijn kind?',
        answer: 'Nee, juist het tegenovergestelde. Kinderen die zien dat hun vader verantwoordelijkheid neemt voor zijn fouten, krijgen meer respect voor hem. Niet minder. Gezag dat gebaseerd is op "ik heb altijd gelijk" is broos. Gezag dat gebaseerd is op eerlijkheid en integriteit is stevig. Je kind leert: papa is sterk genoeg om toe te geven dat hij fout zat.',
      },
      {
        question: 'Wat als mijn kind mijn excuus niet accepteert?',
        answer: 'Geef je kind de ruimte. Soms heeft een kind meer tijd nodig om te verwerken. Accepteer dat, zonder druk. Zeg: "Ik begrijp dat je nog boos bent. Ik ben hier als je wilt praten." Probeer het niet recht te praten of je kind te overtuigen. Laat je excuus staan en geef het de tijd. De meeste kinderen komen vanzelf terug als ze merken dat je het meent.',
      },
    ],
  },
  {
    slug: 'verbinding',
    name: 'Verbinding',
    color: SKILL_COLORS.Verbinding,
    tagline: 'De band met je kind versterken',
    description:
      'Verbinding is het fundament van alles. Een kind dat zich verbonden voelt met zijn vader luistert beter, deelt meer, en durft meer. Verbinding is geen luxe, het is de basis waarop alle andere vaardigheden bouwen.',
    icon: 'Handshake',
    sections: [
      {
        heading: 'Hechting en de rol van de vader',
        body: 'John Bowlby\'s hechtingstheorie beschrijft hoe kinderen een veilige basis nodig hebben om de wereld te verkennen. Lange tijd werd gedacht dat alleen moeders die basis bieden. Maar modern onderzoek laat zien dat vaders een even belangrijke hechtingsfiguur zijn, vaak met een andere dynamiek. Waar moeders vaker troost bieden bij verdriet, stimuleren vaders vaker exploratie en risiconemen. Beide vormen van verbinding zijn essentieel voor een gezonde ontwikkeling.',
      },
      {
        heading: 'Verbinding opbouwen door samen te doen',
        body: 'De sterkste band bouw je niet op door erover te praten, maar door samen dingen te doen. Kook samen, repareer iets, maak een wandeling, speel een bordspel. Activiteiten creeren gedeelde ervaringen en herinneringen. Voor jonge kinderen is samen spelen de taal van verbinding. Voor tieners is samen iets doen, zonder dat je er iets van moet leren, de manier om de relatie te onderhouden. Het gaat niet om de activiteit zelf, maar om de boodschap: ik wil tijd met je doorbrengen.',
      },
      {
        heading: 'Verbinding met je tiener behouden',
        body: 'De puberteit is de fase waarin veel vader-kindrelaties onder druk komen te staan. Je tiener trekt zich terug, reageert kort of lijkt niet geinteresseerd in jou. Dit is normaal ontwikkelingsgedrag, geen afwijzing. De sleutel is om beschikbaar te blijven zonder opdringerig te zijn. Toon interesse in hun wereld zonder te oordelen. Stel open vragen. En accepteer dat verbinding er bij een tiener anders uitziet dan bij een kleuter. Een tiener die naast je op de bank zit en niets zegt, is op zijn manier verbonden.',
      },
    ],
    faq: [
      {
        question: 'Hoe bouw ik een betere band op met mijn kind?',
        answer: 'Begin met dagelijkse micro-momenten: een knuffel bij het opstaan, een vraag over hun dag tijdens het eten, vijf minuten samen iets doen dat zij kiezen. Verbinding groeit niet door grote gebaren maar door consistente kleine momenten. Plan ook regelmatig een-op-een tijd als je meerdere kinderen hebt. Elk kind heeft momenten nodig waarin het jouw volledige aandacht heeft.',
      },
      {
        question: 'Mijn tiener wil niets meer met mij doen. Is onze band kapot?',
        answer: 'Waarschijnlijk niet. Tieners hebben de ontwikkelingstaak om zich los te maken van hun ouders en een eigen identiteit te vormen. Dat voelt voor jou als afwijzing, maar het is gezonde groei. Blijf uitnodigen zonder te dwingen. "Ik ga morgen mountainbiken, je mag mee als je wilt" werkt beter dan "We gaan morgen samen mountainbiken." Respecteer hun nee, en ze komen vaker met ja.',
      },
      {
        question: 'Telt samen gamen of tv kijken ook als quality time?',
        answer: 'Ja, als het een gedeelde ervaring is. Samen een serie kijken en erover praten is verbinding. Samen gamen en elkaar helpen of uitdagen is verbinding. Het wordt pas problematisch als jullie naast elkaar zitten maar elk op een eigen scherm bezig zijn. De vraag is niet welke activiteit je doet, maar of je het samen beleeft.',
      },
    ],
  },
  {
    slug: 'reflectie',
    name: 'Reflectie',
    color: SKILL_COLORS.Reflectie,
    tagline: 'Leren van je eigen patronen',
    description:
      'De manier waarop jij bent opgevoed, beïnvloedt hoe jij opvoedt. Reflectie is de vaardigheid om je eigen patronen te herkennen, te begrijpen waar ze vandaan komen, en bewust te kiezen welke je wilt doorgeven en welke je wilt doorbreken.',
    icon: 'Brain',
    sections: [
      {
        heading: 'Intergenerationele patronen doorbreken',
        body: 'Elke vader draagt de opvoeding van zijn eigen ouders met zich mee. Soms bewust, vaak onbewust. De manier waarop jouw vader reageerde op je emoties, grenzen stelde, of juist afwezig was, heeft een stempel op jou gedrukt. Reflectie begint met het herkennen van die patronen. Niet om je ouders de schuld te geven, maar om bewust te kiezen: wat wil ik meenemen, en wat wil ik anders doen? Psycholoog Peter Fonagy noemt dit "mentaliseren" - het vermogen om je eigen gedrag en dat van anderen te begrijpen vanuit onderliggende gedachten en gevoelens.',
      },
      {
        heading: 'Praktische reflectie-oefeningen voor vaders',
        body: 'Een effectieve methode is het bijhouden van een kort dagboek. Schrijf aan het eind van de dag een moment op waarop je trots was als vader, en een moment waarop je anders had willen reageren. Vraag jezelf af: wat voelde ik op dat moment? Waar kwam die reactie vandaan? Herken ik dit patroon? Een andere oefening: wanneer je merkt dat je automatisch reageert op je kind, druk dan op de pauzeknop en vraag jezelf af: is dit mijn reactie, of die van mijn eigen vader?',
      },
      {
        heading: 'Reflectief functioneren en de wetenschap',
        body: 'Peter Fonagy\'s onderzoek aan University College London toont aan dat ouders met een hoog reflectief vermogen, het vermogen om na te denken over hun eigen en andermans innerlijke wereld, kinderen opvoeden met veiligere hechting. Het mooie is dat reflectief functioneren trainbaar is. Je hoeft geen therapeut te zijn om eraan te werken. Het begint met nieuwsgierigheid naar jezelf: waarom reageer ik zo? Wat raakt me hieraan? Wat heeft mijn kind eigenlijk nodig in dit moment?',
      },
    ],
    faq: [
      {
        question: 'Hoe voorkom ik dat ik dezelfde fouten maak als mijn ouders?',
        answer: 'Door bewust te worden van de patronen. Dat klinkt simpel, maar het is de krachtigste stap. Schrijf op welke opvoedgewoonten van je ouders je wilt behouden en welke je wilt veranderen. Bespreek dit met je partner. En wees mild voor jezelf: het feit dat je erover nadenkt, betekent dat je al bezig bent met verandering. Perfectie is niet het doel. Bewustzijn wel.',
      },
      {
        question: 'Is het normaal dat ik soms precies klink als mijn vader?',
        answer: 'Heel normaal. Onder stress valt iedereen terug op aangeleerde patronen. Dat is geen falen, dat is je brein dat een snelkoppeling neemt. Het verschil is dat jij het nu herkent. Op het moment dat je denkt "ik klink net als mijn vader", heb je een keuze. Je kunt op de pauzeknop drukken en bewust iets anders doen. Elke keer dat je dat doet, maak je het nieuwe patroon sterker.',
      },
      {
        question: 'Moet ik naar therapie als ik over mijn opvoeding wil reflecteren?',
        answer: 'Niet per se, maar het kan helpen. Als je merkt dat bepaalde patronen diep zitten en je ze niet op eigen kracht kunt doorbreken, is professionele begeleiding waardevol. Maar veel reflectie kun je zelf doen: door te schrijven, door erover te praten met je partner of andere vaders, door boeken te lezen over opvoeding en hechtingstheorie. Therapie is geen zwakte, maar ook geen vereiste. Begin waar je je comfortabel voelt.',
      },
    ],
  },
];

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function getAllSkills(): Skill[] {
  return SKILLS;
}
