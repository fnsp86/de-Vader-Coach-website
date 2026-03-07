export type GrowthPostType = 'carrousel' | 'reel' | 'verhaal' | 'quote';

export interface GrowthPost {
  id: number;
  title: string;
  type: GrowthPostType;
  month: 1 | 2 | 3;
  week: number;
  dag: string;
  /** Slide content for carrousels, concept for reels, image text for verhaal/quote */
  slides?: string[];
  /** Reel concept description */
  concept?: string;
  /** Image text for verhaal or quote posts */
  imageText?: string;
  caption: string;
  hashtags: string;
}

const POST_TYPE_LABELS: Record<GrowthPostType, string> = {
  carrousel: 'Carrousel',
  reel: 'Reel',
  verhaal: 'Verhaalpost',
  quote: 'Quote',
};

const POST_TYPE_COLORS: Record<GrowthPostType, string> = {
  carrousel: '#3B82F6',
  reel: '#EC4899',
  verhaal: '#8B5CF6',
  quote: '#F59E0B',
};

export { POST_TYPE_LABELS, POST_TYPE_COLORS };

export const GROWTH_POSTS: GrowthPost[] = [
  // ═══════════════════════════════════════════════
  // MAAND 1: Herkenning en vertrouwen (Post 1-16)
  // ═══════════════════════════════════════════════

  // Week 1
  {
    id: 1,
    title: '5 dingen die elke vader denkt maar niet hardop zegt',
    type: 'carrousel',
    month: 1,
    week: 1,
    dag: 'Dinsdag',
    slides: [
      '5 dingen die elke vader denkt maar niet hardop zegt',
      'Ik weet eigenlijk niet of ik dit goed doe',
      'Ik wil meer geduld hebben maar het lukt me niet altijd',
      'Ik ben bang dat ik op mijn eigen vader ga lijken',
      'Ik voel me soms buitengesloten als ouder',
      'Je bent niet de enige. En het feit dat je dit leest, zegt alles. Volg @devadercoach voor meer.',
    ],
    caption: `Vaderschap is niet alleen voetballen in de tuin en pannenkoeken bakken. Het is ook twijfel, onzekerheid en jezelf afvragen of je het goed genoeg doet.

Het antwoord: als je die vraag stelt, ben je al een goede vader.

Sla deze post op als je je hierin herkent. En deel hem met een vader die dit moet horen.`,
    hashtags: '#vaderschap #papa #opvoeding #eerlijkheid #devadercoach',
  },
  {
    id: 2,
    title: 'Die blik van je kind als je thuiskomt',
    type: 'reel',
    month: 1,
    week: 1,
    dag: 'Donderdag',
    concept: `Simpele video. Vader opent de voordeur. Kind rent naar hem toe. Tekst op scherm: "Maakt niet uit hoe je dag was. Dit maakt alles goed."`,
    caption: `Na een lange dag op werk. Moe. Gestrest. En dan die ogen.

Dat moment waarop alles even niet meer uitmaakt. Alleen jij en je kind.

Herkenbaar? Dubbeltik.`,
    hashtags: '#vaderzijn #thuiskomen #papamoment #gezinsleven #devadercoach',
  },
  {
    id: 3,
    title: 'De dag dat ik schreeuwde tegen mijn kind',
    type: 'verhaal',
    month: 1,
    week: 1,
    dag: 'Zaterdag',
    imageText: 'Ik schreeuwde. En ik zag de angst in zijn ogen.',
    caption: `Het was een doodgewone dinsdagavond. Moe van werk. Kind wilde niet luisteren. En toen knapte er iets.

Ik schreeuwde. Hard. En ik zag zijn onderlip trillen.

Op dat moment wist ik: dit is niet de vader die ik wil zijn.

Ik ben gaan zitten. Heb hem vastgepakt. En gezegd: "Sorry. Papa had dat niet moeten doen."

Weet je wat hij zei? "Geeft niet papa, je bent de beste papa."

Kinderen vergeven sneller dan wij onszelf vergeven. Maar dat ontslaat ons niet van de verantwoordelijkheid om te groeien.

Sindsdien werk ik elke dag aan mijn geduld. Niet perfect. Wel beter.

Herken je dit? Je bent niet alleen.`,
    hashtags: '#opvoedtips #geduld #vaderzijn #kwetsbaar #devadercoach',
  },
  {
    id: 4,
    title: 'Je hoeft geen perfecte vader te zijn',
    type: 'quote',
    month: 1,
    week: 1,
    dag: 'Zondag',
    imageText: 'Je hoeft geen perfecte vader te zijn. Je moet er alleen zijn.',
    caption: `Aanwezig zijn is de krachtigste opvoedtool die er bestaat. Niet het perfecte antwoord hebben. Niet altijd rustig blijven. Gewoon er zijn.

Sla op voor de dagen dat je twijfelt.`,
    hashtags: '#vaderschap #opvoeding #aanwezig #wijsheid #devadercoach',
  },

  // Week 2
  {
    id: 5,
    title: '4 zinnen die beter werken dan STOP DAARMEE',
    type: 'carrousel',
    month: 1,
    week: 2,
    dag: 'Dinsdag',
    slides: [
      '4 zinnen die beter werken dan STOP DAARMEE',
      'In plaats van: Stop daarmee! Probeer: Ik zie dat je boos bent. Wat is er aan de hand?',
      'In plaats van: Doe normaal! Probeer: Ik begrijp dat dit moeilijk is. Hoe kan ik helpen?',
      'In plaats van: Ga naar je kamer! Probeer: Zullen we even samen tot rust komen?',
      'In plaats van: Ik tel tot drie! Probeer: Ik wacht even tot je er klaar voor bent.',
      'Dit is niet soft. Dit is sterk. Volg @devadercoach voor meer opvoedtips.',
    ],
    caption: `"Stop daarmee" werkt op de korte termijn. Maar op de lange termijn leert je kind alleen: mijn gevoelens zijn niet welkom.

Deze vier zinnen helpen je kind zich gehoord te voelen en leren het zelf emoties te reguleren.

Moeilijk? Ja. Maar daarom ben je hier.

Deel deze post met een vader die hier iets aan heeft.`,
    hashtags: '#opvoedtips #grenzenStellen #emotiecoaching #bewustopvoeden #devadercoach',
  },
  {
    id: 6,
    title: 'Verwachting vs realiteit - ochtendroutine met kids',
    type: 'reel',
    month: 1,
    week: 2,
    dag: 'Donderdag',
    concept: `Split screen of twee clips:
Links/eerst: Vader maakt rustig ontbijt, kinderen zitten netjes aan tafel. Tekst: "Verwachting"
Rechts/daarna: Chaos. Melk omgevallen. Kind huilt. Ander kind rent rond in ondergoed. Tekst: "Realiteit"
Einde: Vader lacht en haalt schouders op. Tekst: "En toch zou ik het voor niks anders ruilen."`,
    caption: `Elke ochtend dezelfde chaos. En elke ochtend denk ik: morgen gaat het beter.

Spoiler: het gaat niet beter. Maar je wordt er wel beter in.

Tag een vader die dit herkent.`,
    hashtags: '#papaleven #ochtendroutine #gezinsleven #humor #devadercoach',
  },
  {
    id: 7,
    title: 'Mijn vader was er nooit. Ik wel.',
    type: 'verhaal',
    month: 1,
    week: 2,
    dag: 'Zaterdag',
    imageText: 'Mijn vader leerde me hoe het niet moet. Mijn kinderen leren me hoe het wel kan.',
    caption: `Ik groeide op zonder voorbeeld. Mijn vader was er niet. Niet fysiek, niet emotioneel.

Lange tijd dacht ik dat vaderschap iets was wat je vanzelf kon. Dat het in je zat. Maar alles wat ik had was een voorbeeld van hoe het niet moest.

Toen mijn eerste kind werd geboren, voelde ik twee dingen: oneindige liefde en diepe angst. Want hoe doe je iets waarvoor je nooit een voorbeeld hebt gehad?

Het antwoord: je leert het. Stap voor stap. Door te vallen en op te staan. Door sorry te zeggen als het fout gaat. Door elke dag opnieuw te kiezen om er te zijn.

Niet omdat het makkelijk is. Maar omdat je kinderen het verdienen.

Als je dit herkent, weet dan: je bent niet je vader. Jij schrijft een nieuw verhaal.`,
    hashtags: '#vaderschap #generatiepatroon #opvoeding #groei #devadercoach',
  },
  {
    id: 8,
    title: 'Kinderen onthouden niet wat je zei',
    type: 'quote',
    month: 1,
    week: 2,
    dag: 'Zondag',
    imageText: 'Je kinderen onthouden niet wat je zei. Ze onthouden hoe je ze liet voelen.',
    caption: `Over tien jaar herinnert je kind zich niet dat je moe was van werk. Het herinnert zich of papa tijd maakte om te luisteren.

Dat is het enige dat telt.`,
    hashtags: '#opvoedtips #papa #aanwezig #vaderzijn #devadercoach',
  },

  // Week 3
  {
    id: 9,
    title: 'Wat je kind hoort als jij schreeuwt',
    type: 'carrousel',
    month: 1,
    week: 3,
    dag: 'Dinsdag',
    slides: [
      'Wat je kind hoort als jij schreeuwt',
      'Jij zegt: "LUISTER NOU!" - Je kind hoort: "Ik ben niet veilig bij papa"',
      'Jij zegt: "IK HEB HET AL DRIE KEER GEZEGD!" - Je kind hoort: "Ik doe het nooit goed genoeg"',
      'Jij zegt: "IK BEN HET ZAT!" - Je kind hoort: "Papa heeft spijt van mij"',
      'Dit is niet om je schuldig te laten voelen. Dit is om je bewust te maken.',
      'Schreeuwen is menselijk. Herstellen is vaderschap. Volg @devadercoach',
    ],
    caption: `We schreeuwen allemaal weleens. Dat maakt je geen slechte vader.

Maar weten wat je kind hoort als jij schreeuwt, helpt je om de volgende keer een andere keuze te maken.

En als het toch gebeurt? Herstel. Ga naar je kind. Zeg sorry. Leg uit wat er bij jou van binnen gebeurde.

Dat is pas kracht.

Sla op en deel met een vader die hier iets aan heeft.`,
    hashtags: '#opvoeding #bewustopvoeden #emotiecoaching #vadertips #devadercoach',
  },
  {
    id: 10,
    title: '60 seconden vader zijn',
    type: 'reel',
    month: 1,
    week: 3,
    dag: 'Donderdag',
    concept: `Snelle montage van alledaagse vadermomenten:
- Schoenen strikken
- Tranen drogen
- Voorlezen
- Samen koken (knoeien)
- Kind op schouders
- Slapend kind naar bed dragen

Tekst op scherm: "Niemand vertelt je dat dit de beste momenten van je leven worden."
Muziek: rustig, emotioneel`,
    caption: `Niet de promotie. Niet de auto. Niet de vakantie.

Dit. Dit zijn de momenten waar het om gaat.

Geniet ervan. Het gaat sneller voorbij dan je denkt.`,
    hashtags: '#papamoment #gezinsleven #vaderschap #genieten #devadercoach',
  },
  {
    id: 11,
    title: 'Waarom ik de Vadercoach begon',
    type: 'verhaal',
    month: 1,
    week: 3,
    dag: 'Zaterdag',
    imageText: 'Er zijn duizend cursussen voor moeders. Voor vaders? Bijna niks.',
    caption: `Toen ik vader werd, zocht ik hulp. Tips. Een cursus. Iets.

Alles wat ik vond was gericht op moeders. Alsof vaders het vanzelf wel uitzoeken. Alsof wij geen vragen hebben, geen twijfels, geen behoefte aan groei.

Maar wij hebben die behoefte wel. We praten er alleen minder over.

Daarom begon ik De Vadercoach. Niet omdat ik alles weet. Maar omdat ik geloof dat vaders net zoveel recht hebben op goede begeleiding als moeders.

Een plek waar je kwetsbaar mag zijn. Waar je mag leren. Waar je mag groeien als vader.

Wil je meedoen? Je bent welkom. Link in bio.`,
    hashtags: '#devadercoach #vaderschap #opvoedcursus #groei #papa',
  },
  {
    id: 12,
    title: 'Een kind heeft geen perfecte vader nodig',
    type: 'quote',
    month: 1,
    week: 3,
    dag: 'Zondag',
    imageText: 'Een kind heeft geen perfecte vader nodig. Het heeft een vader nodig die het blijft proberen.',
    caption: `Perfectie bestaat niet in opvoeding. Maar doorzettingsvermogen wel.

Elke dag opnieuw kiezen om een betere vader te zijn dan gisteren. Dat is genoeg.

Tag een vader die dit moet lezen.`,
    hashtags: '#vaderschap #motivatie #opvoeding #doorgaan #devadercoach',
  },

  // Week 4
  {
    id: 13,
    title: 'De 5 liefdestalen van je kind',
    type: 'carrousel',
    month: 1,
    week: 4,
    dag: 'Dinsdag',
    slides: [
      'De 5 liefdestalen van je kind - ken jij ze?',
      '1. Fysieke aanraking - Knuffels, aaien, stoeien. Sommige kinderen laden op door aanraking.',
      '2. Woorden van bevestiging - "Ik ben trots op je." "Wat heb je dat goed gedaan." Sommige kinderen bloeien op door woorden.',
      '3. Quality time - Onverdeelde aandacht. Samen iets doen. Telefoon weg. Alleen jullie.',
      '4. Cadeautjes - Niet duur. Een gevonden steentje. Een zelfgemaakte tekening. Het gebaar telt.',
      '5. Hulpvaardigheid - Helpen met iets moeilijks. Samen opruimen. Laten zien: ik sta naast je.',
      'Ken jij de liefdestaal van je kind? Volg @devadercoach voor meer.',
    ],
    caption: `Elk kind ervaart liefde anders. Het ene kind wil een knuffel. Het andere wil dat je naast hem zit en samen bouwt.

Als je de liefdestaal van je kind kent, bereik je het hart in plaats van alleen het hoofd.

Welke liefdestaal heeft jouw kind? Vertel het in de reacties.`,
    hashtags: '#liefdestalen #opvoedtips #verbinding #vaderzijn #devadercoach',
  },
  {
    id: 14,
    title: 'Vader die sorry zegt',
    type: 'reel',
    month: 1,
    week: 4,
    dag: 'Donderdag',
    concept: `Vader zit op de grond naast zijn kind.
Tekst op scherm stap voor stap:
"Sorry dat papa boos werd."
"Dat was niet jouw schuld."
"Ik hou van je, ook als ik boos ben."
Kind knuffelt vader.
Eindtekst: "Sorry zeggen maakt je niet zwak. Het maakt je een voorbeeld."`,
    caption: `Het moeilijkste woord in opvoeding is niet "nee". Het is "sorry".

Maar het is ook het krachtigste. Want je leert je kind: fouten maken mag, als je ze maar herstelt.`,
    hashtags: '#sorry #opvoeding #voorbeeld #emotiecoaching #devadercoach',
  },
  {
    id: 15,
    title: 'Het gesprek dat alles veranderde',
    type: 'verhaal',
    month: 1,
    week: 4,
    dag: 'Zaterdag',
    imageText: 'Papa, waarom ben je altijd moe?',
    caption: `Mijn dochter van vijf vroeg het op een doordeweekse avond. Ik was net thuis van werk, telefoon in de hand, half aan het luisteren.

"Papa, waarom ben je altijd moe?"

Het voelde als een mokerslag. Want ze had gelijk. Ik was er wel. Maar ik was er niet echt.

Die avond heb ik mijn telefoon in de kast gelegd. We hebben samen een puzzel gemaakt. Ze vertelde over haar vriendinnetje op school. Over een lieveheersbeestje dat ze had gevonden.

Het kostte me 45 minuten. Maar het gaf haar het gevoel dat ze de belangrijkste persoon ter wereld was.

Sindsdien heb ik een regel: als ik thuiskom, gaat de telefoon weg. Eerste halfuur is voor hen.

Niet altijd makkelijk. Altijd de moeite waard.`,
    hashtags: '#aanwezig #telefoonweg #qualitytime #vaderzijn #devadercoach',
  },
  {
    id: 16,
    title: 'De beste vaders',
    type: 'quote',
    month: 1,
    week: 4,
    dag: 'Zondag',
    imageText: 'De beste vaders zijn niet degenen die nooit fouten maken. Het zijn degenen die van elke fout een les maken.',
    caption: `Elke dag een kans om het beter te doen. Niet perfect. Beter.

Sla op voor een dag dat je het nodig hebt.`,
    hashtags: '#vaderschap #wijsheid #opvoeding #groei #devadercoach',
  },

  // ═══════════════════════════════════════════════
  // MAAND 2: Waarde en verdieping (Post 17-32)
  // ═══════════════════════════════════════════════

  // Week 5
  {
    id: 17,
    title: 'De 4 opvoedstijlen - welke ben jij?',
    type: 'carrousel',
    month: 2,
    week: 5,
    dag: 'Dinsdag',
    slides: [
      'De 4 opvoedstijlen - welke herken jij?',
      'Autoritair - Strenge regels, weinig warmte. "Omdat ik het zeg." Kind leert: mijn mening telt niet.',
      'Permissief - Veel warmte, geen grenzen. "Doe maar wat je wilt." Kind leert: er zijn geen gevolgen.',
      'Verwaarlozend - Weinig regels, weinig warmte. Kind leert: ik ben niet belangrijk.',
      'Autoritatief - Duidelijke grenzen met warmte. "Ik begrijp je, en dit is de grens." Kind leert: ik ben veilig en gehoord.',
      'Autoritatief opvoeden is niet soft. Het is de moeilijkste en meest effectieve stijl.',
      'Wil je leren hoe? Volg @devadercoach',
    ],
    caption: `De meeste vaders schakelen onbewust tussen stijlen. Op goede dagen ben je autoritatief. Op slechte dagen val je terug op autoritair.

Bewustwording is de eerste stap. Welke stijl herken jij het meest bij jezelf?

Deel je antwoord hieronder. Geen oordeel, alleen eerlijkheid.`,
    hashtags: '#opvoedstijlen #bewustopvoeden #opvoedtips #grenzenStellen #devadercoach',
  },
  {
    id: 18,
    title: '3 vragen voor het slapengaan',
    type: 'reel',
    month: 2,
    week: 5,
    dag: 'Donderdag',
    concept: `Vader zit op de rand van het bed bij zijn kind.
Tekst op scherm, een voor een:
"Wat was het leukste van vandaag?"
"Wat was het moeilijkste?"
"Waar ben je trots op?"
Eindtekst: "3 vragen. 5 minuten. Onbetaalbaar."`,
    caption: `Deze drie vragen kosten je vijf minuten. Maar ze geven je kind het gevoel: papa luistert echt naar mij.

En je leert meer over het leven van je kind dan met "hoe was je dag?" ooit zou lukken.

Probeer het vanavond. Je zult verrast zijn.`,
    hashtags: '#slapengaan #opvoedtips #verbinding #papa #devadercoach',
  },
  {
    id: 19,
    title: 'Mijn zoon werd gepest. Dit deed ik.',
    type: 'verhaal',
    month: 2,
    week: 5,
    dag: 'Zaterdag',
    imageText: 'Papa, ze zeggen dat ik raar ben.',
    caption: `Mijn eerste reactie was woede. Ik wilde naar school bellen. Namen weten. Het oplossen.

Maar ik deed iets anders. Ik ging naast hem zitten en vroeg: "Hoe voelt dat?"

Hij vertelde. Over de opmerkingen. Over alleen staan op het schoolplein. Over het gevoel dat er iets mis was met hem.

Ik luisterde. Zonder oplossingen. Zonder "trek je er niks van aan". Gewoon luisteren.

Toen hij uitgepraat was, zei ik: "Er is niks mis met jou. En ik ga je helpen, maar eerst wil ik dat je weet dat je hier altijd over mag praten."

De les: je kind wil niet altijd dat je het oplost. Het wil eerst dat je het voelt.

Oplossen komt daarna. Verbinding komt eerst.`,
    hashtags: '#pesten #luisteren #opvoeding #verbinding #devadercoach',
  },
  {
    id: 20,
    title: 'Grenzen stellen is liefde',
    type: 'quote',
    month: 2,
    week: 5,
    dag: 'Zondag',
    imageText: 'Grenzen stellen is geen straf. Het is je kind vertellen: ik hou genoeg van je om nee te zeggen.',
    caption: `Nee zeggen voelt soms gemeen. Maar een kind zonder grenzen voelt zich onveilig.

Grenzen zijn het hek om de speeltuin. Niet om de lol te beperken, maar om veilig te kunnen spelen.`,
    hashtags: '#grenzenStellen #opvoedtips #liefde #vaderschap #devadercoach',
  },

  // Week 6
  {
    id: 21,
    title: 'Wat te doen bij een driftbui (stap voor stap)',
    type: 'carrousel',
    month: 2,
    week: 6,
    dag: 'Dinsdag',
    slides: [
      'Driftbui? Dit doe je (stap voor stap)',
      'Stap 1: Blijf kalm. Je kind is al genoeg ontregeld. Het heeft jouw rust nodig, niet jouw boosheid.',
      'Stap 2: Ga op ooghoogte. Hurk naast je kind. Dit alleen al verlaagt de spanning.',
      'Stap 3: Benoem het gevoel. "Ik zie dat je heel boos bent." Je kind voelt zich gezien.',
      'Stap 4: Wacht. Praat niet te veel. Laat het gevoel er zijn. Een driftbui duurt gemiddeld 3 minuten.',
      'Stap 5: Herstel. Als het voorbij is: knuffel. "Dat was een groot gevoel he? Ik ben er voor je."',
      'Dit is emotiecoaching. Het werkt. Volg @devadercoach voor meer.',
    ],
    caption: `Een driftbui is geen aanval op jou. Het is een kind dat overspoeld wordt door een gevoel dat het nog niet aankan.

Jouw taak is niet om de driftbui te stoppen. Jouw taak is om de veilige haven te zijn.

Moeilijk als je zelf moe bent? Absoluut. Maar elke keer dat je dit doet, bouw je aan vertrouwen.

Sla op voor de volgende keer.`,
    hashtags: '#driftbui #emotiecoaching #opvoedtips #peuter #devadercoach',
  },
  {
    id: 22,
    title: 'Dingen die mijn vader nooit zei',
    type: 'reel',
    month: 2,
    week: 6,
    dag: 'Donderdag',
    concept: `Vader kijkt in de camera. Tekst verschijnt stap voor stap:
"Mijn vader zei nooit: ik ben trots op je"
"Mijn vader zei nooit: het is oke om te huilen"
"Mijn vader zei nooit: ik hou van je"
"Ik zeg het elke dag tegen mijn kinderen"
Eindtekst: "De cyclus stopt bij jou."
Muziek: emotioneel, opbouwend`,
    caption: `Je kunt niet veranderen hoe je bent opgegroeid. Maar je kunt wel kiezen hoe je opvoedt.

Elke keer dat je zegt "ik ben trots op je" schrijf je een nieuw hoofdstuk.

De cyclus stopt bij jou.`,
    hashtags: '#generatiepatroon #vaderschap #doorbreken #opvoeding #devadercoach',
  },
  {
    id: 23,
    title: 'Ik dacht dat quality time groot moest zijn',
    type: 'verhaal',
    month: 2,
    week: 6,
    dag: 'Zaterdag',
    imageText: 'De mooiste herinnering van mijn zoon? Samen op de bank een boterham eten.',
    caption: `Ik plande uitjes. Dierentuin. Pretpark. Bioscoop. Ik dacht: quality time moet speciaal zijn.

Tot mijn zoon zei: "Papa, weet je wat ik het leukste vind? Samen op de bank zitten en niks doen."

Toen begreep ik het. Quality time gaat niet over wat je doet. Het gaat over hoe aanwezig je bent.

Samen in de auto zitten. Samen boodschappen doen. Samen stil zijn.

Het hoeft niet groots. Het moet echt zijn.`,
    hashtags: '#qualitytime #samen #aanwezig #vadertips #devadercoach',
  },
  {
    id: 24,
    title: 'Luisteren is de sterkste spier',
    type: 'quote',
    month: 2,
    week: 6,
    dag: 'Zondag',
    imageText: 'De sterkste spier van een vader is niet zijn arm. Het is zijn luisterend oor.',
    caption: `Luisteren zonder te oordelen. Zonder direct een oplossing te geven. Zonder te zeggen "het valt wel mee".

Gewoon luisteren. Dat is wat je kind nodig heeft.`,
    hashtags: '#luisteren #opvoeding #kracht #vaderzijn #devadercoach',
  },

  // Week 7
  {
    id: 25,
    title: '5 manieren om verbinding te maken in 5 minuten',
    type: 'carrousel',
    month: 2,
    week: 7,
    dag: 'Dinsdag',
    slides: [
      '5 manieren om verbinding te maken in 5 minuten',
      '1. Stel een echte vraag. Niet "hoe was school?" maar "wat was het grappigste dat er vandaag gebeurde?"',
      '2. Stoeien. Fysiek spel is hoe vaders van nature verbinden. 5 minuten stoeien is beter dan een uur naast elkaar op de bank.',
      '3. Samen een klusje doen. Afwassen, auto wassen, schuur opruimen. Schouder aan schouder werken schept een band.',
      '4. Vertel iets over vroeger. Kinderen zijn dol op verhalen over toen papa klein was. Het maakt je menselijk.',
      '5. Oogcontact en lachen. Kijk je kind aan en glimlach. Zonder reden. Het is de snelste manier om "ik zie je" te zeggen.',
      'Verbinding hoeft niet lang te duren. Het moet echt zijn. Volg @devadercoach',
    ],
    caption: `Je hebt geen hele middag nodig. Vijf minuten echte aandacht is meer waard dan een uur met je telefoon erbij.

Welke van deze vijf ga jij vanavond proberen? Laat het weten in de reacties.`,
    hashtags: '#verbinding #opvoedtips #qualitytime #vadertips #devadercoach',
  },
  {
    id: 26,
    title: 'De kracht van samen stil zijn',
    type: 'reel',
    month: 2,
    week: 7,
    dag: 'Donderdag',
    concept: `Vader en kind zitten samen buiten. Zonsondergang of in het gras. Zeggen niks. Kind leunt tegen vader aan.
Tekst op scherm: "Soms is samen stil zijn het luidste 'ik hou van je'."
Muziek: zacht, akoestisch`,
    caption: `Niet elk moment hoeft gevuld te worden met woorden.

Soms is naast iemand zitten genoeg.`,
    hashtags: '#stilte #samen #vaderschap #rust #devadercoach',
  },
  {
    id: 27,
    title: 'Wat ik leerde van mijn driejarige',
    type: 'verhaal',
    month: 2,
    week: 7,
    dag: 'Zaterdag',
    imageText: '"Papa, kijk! Een slak!" - mijn driejarige die me leerde om te vertragen',
    caption: `Ik was gehaast. Altijd gehaast. Op weg naar de auto, op weg naar het volgende ding.

En toen stopte mijn driejarige. Midden op het pad. "Papa, kijk! Een slak!"

Mijn eerste reactie: we moeten door. Maar iets in me zei: wacht even.

Ik hurkte naast haar. We keken samen naar die slak. Twee minuten lang. Ze vertelde me alles wat ze zag. De voelsprieten. Het huisje. Het slijmspoor.

In die twee minuten was er geen haast. Geen agenda. Alleen wij en een slak.

Kinderen leven in het nu. Wij leven drie stappen vooruit. Soms hebben we hen nodig om ons terug te brengen naar wat er echt toe doet.`,
    hashtags: '#mindfulness #vertragen #peuter #levenslessen #devadercoach',
  },
  {
    id: 28,
    title: 'Je kinderen kijken niet naar wat je zegt',
    type: 'quote',
    month: 2,
    week: 7,
    dag: 'Zondag',
    imageText: 'Je kinderen luisteren niet altijd naar wat je zegt. Ze kijken altijd naar wat je doet.',
    caption: `Wil je dat je kind respectvol is? Wees respectvol.
Wil je dat je kind geduldig is? Wees geduldig.
Wil je dat je kind eerlijk is? Wees eerlijk.

Jij bent het voorbeeld. Elke dag.`,
    hashtags: '#voorbeeld #opvoeding #vaderschap #doen #devadercoach',
  },

  // Week 8
  {
    id: 29,
    title: 'Zo bouw je zelfvertrouwen bij je kind',
    type: 'carrousel',
    month: 2,
    week: 8,
    dag: 'Dinsdag',
    slides: [
      'Zo bouw je zelfvertrouwen bij je kind',
      'Prijs het proces, niet het resultaat. "Wat heb je hard gewerkt!" in plaats van "Wat ben je slim!"',
      'Laat ze fouten maken. Bescherm ze niet tegen alles. Een kind dat mag vallen, leert opstaan.',
      'Geef verantwoordelijkheid. Laat ze meehelpen. Een kind dat bijdraagt voelt zich waardevol.',
      'Neem ze serieus. Hun problemen zijn niet klein omdat zij klein zijn.',
      'Wees er bij de moeilijke momenten. Niet om het op te lossen, maar om te laten zien: je kan dit, en ik sta achter je.',
      'Zelfvertrouwen bouw je niet met complimenten. Je bouwt het met vertrouwen. @devadercoach',
    ],
    caption: `Een kind dat van zichzelf mag falen, leert dat falen niet gevaarlijk is. Een kind dat gehoord wordt, leert dat zijn stem ertoe doet.

Zelfvertrouwen is niet "ik ben de beste". Het is "ik durf het te proberen".

En dat begint bij hoe jij reageert als vader.

Sla op en deel met een vader.`,
    hashtags: '#zelfvertrouwen #opvoedtips #fouten #groei #devadercoach',
  },
  {
    id: 30,
    title: 'Vader danst met zijn kind',
    type: 'reel',
    month: 2,
    week: 8,
    dag: 'Donderdag',
    concept: `Vader en kind dansen in de woonkamer. Geen choreografie, gewoon los gaan. Kind lacht hard.
Tekst op scherm: "Je hoeft geen cool te zijn. Je moet lol maken."
Muziek: vrolijk, uptempo`,
    caption: `Vergeet je waardigheid. Dans als een idioot. Maak geluiden. Doe gek.

Je kinderen onthouden niet hoe cool je was. Ze onthouden hoe hard ze met je hebben gelachen.`,
    hashtags: '#dansen #lol #papaleven #humor #devadercoach',
  },
  {
    id: 31,
    title: 'Waarom ik stopte met schermtijd als oppas',
    type: 'verhaal',
    month: 2,
    week: 8,
    dag: 'Zaterdag',
    imageText: 'De iPad is geen oppas. Het is een pauzeknop.',
    caption: `Ik geef toe: de iPad was mijn beste vriend. Kind onrustig? iPad. Ik moet koken? iPad. Beetje rust nodig? iPad.

Tot ik merkte dat mijn zoon het eerste was wat hij vroeg als hij wakker werd. Niet "goedemorgen papa". Maar "mag ik de iPad?"

Ik schrok ervan. Niet omdat schermtijd per se slecht is. Maar omdat het een automatisme was geworden. Voor ons allebei.

Nu hebben we regels. Maximaal 30 minuten. En alleen nadat we samen iets hebben gedaan. Eerst verbinden, dan scherm.

Is het moeilijker? Ja. Ben ik soms moe? Ja. Maar de ochtenden beginnen nu met een knuffel in plaats van een scherm.

Dit is geen oordeel. Elke vader doet wat hij kan. Maar als je herkent wat ik beschrijf, is dit je teken om het anders te proberen.`,
    hashtags: '#schermtijd #bewustopvoeden #iPad #vadertips #devadercoach',
  },
  {
    id: 32,
    title: 'Geduld is een spier',
    type: 'quote',
    month: 2,
    week: 8,
    dag: 'Zondag',
    imageText: 'Geduld is geen eigenschap. Het is een spier. En opvoeding is de sportschool.',
    caption: `Je wordt niet geboren met geduld. Je traint het. Elke dag. Elke driftbui. Elke keer dat je tot tien telt in plaats van te schreeuwen.

En sommige dagen train je harder dan andere. Dat is oke.`,
    hashtags: '#geduld #opvoeding #groei #training #devadercoach',
  },

  // ═══════════════════════════════════════════════
  // MAAND 3: Community en conversie (Post 33-48)
  // ═══════════════════════════════════════════════

  // Week 9
  {
    id: 33,
    title: 'De 8 vaardigheden van een bewuste vader',
    type: 'carrousel',
    month: 3,
    week: 9,
    dag: 'Dinsdag',
    slides: [
      'De 8 vaardigheden van een bewuste vader',
      '1. Zelfregulatie - Eerst jezelf kalmeren, dan pas reageren.',
      '2. Emotiecoaching - De gevoelens van je kind benoemen en begeleiden.',
      '3. Grenzen stellen - Duidelijk en warm tegelijk. Nee zeggen met liefde.',
      '4. Aanwezigheid - Echt er zijn. Telefoon weg. Ogen op je kind.',
      '5. Verbinding - De relatie is de basis. Zonder verbinding werkt niks.',
      '6. Reflectie - Terugkijken op je dag als vader. Wat ging goed? Wat kan beter?',
      '7. Herstel - Sorry zeggen als het fout gaat. Fouten repareren.',
      '8. Autonomie geven - Je kind ruimte geven om te groeien en eigen keuzes te maken.',
      'Deze 8 vaardigheden kun je leren. Stap voor stap. Met De Vadercoach app. Link in bio.',
    ],
    caption: `Dit zijn de 8 vaardigheden waar wij mee werken bij De Vadercoach. Niet als checklist die je moet afvinken, maar als kompas.

Sommige dagen lukt zelfregulatie prima. Andere dagen ben je blij als je het tot het avondeten redt zonder te schreeuwen.

Het gaat niet om perfectie. Het gaat om richting.

Wil je met deze vaardigheden aan de slag? Download de app via de link in bio.`,
    hashtags: '#opvoedvaardigheden #bewustopvoeden #vaderschap #devadercoach #opvoedtips',
  },
  {
    id: 34,
    title: 'Een week als vader in 30 seconden',
    type: 'reel',
    month: 3,
    week: 9,
    dag: 'Donderdag',
    concept: `Snelle cuts door de week:
Maandag: Wekker, moe gezicht, ontbijt maken
Dinsdag: Kind helpen met huiswerk, vader snapt het ook niet
Woensdag: Samen voetballen in de tuin
Donderdag: Kind huilt, vader troost
Vrijdag: Samen pizza maken, bloem overal
Weekend: Op de bank, kind slaapt op vaders schoot

Tekst op scherm per dag, eindigend met: "Zwaar? Ja. Het waard? Altijd."`,
    caption: `Sommige weken voel je je superheld. Andere weken voel je je nauwelijks mens.

Maar elke week ben je papa. En dat is het mooiste wat er is.

Deel deze reel met een vader die midden in zo'n week zit.`,
    hashtags: '#papaleven #weekvanpapa #gezinsleven #eerlijk #devadercoach',
  },
  {
    id: 35,
    title: 'Mijn vrouw zei: je bent nooit echt thuis',
    type: 'verhaal',
    month: 3,
    week: 9,
    dag: 'Zaterdag',
    imageText: 'Je bent er wel. Maar je bent er niet.',
    caption: `Het kwam hard aan. Want ik was er toch? Ik woonde daar. Ik at mee. Ik zat op de bank.

Maar ze had gelijk. Mijn hoofd was bij werk. Bij mijn telefoon. Bij het volgende ding. Ik was fysiek aanwezig en mentaal afwezig.

Het lastige is: je merkt het zelf niet. Je denkt dat je er bent. Maar je partner en kinderen voelen het verschil.

Wat ik veranderde:
- Telefoon in de kast als ik thuiskom
- Eerste 30 minuten: alleen gezin
- Elke avond 10 minuten echt gesprek met mijn vrouw

Klinkt simpel. Was het moeilijkste wat ik ooit heb gedaan.

Maar mijn vrouw zei vorige week: "Je bent er weer." En dat was alles.`,
    hashtags: '#aanwezig #relatie #vaderschap #mentaal #devadercoach',
  },
  {
    id: 36,
    title: 'Opvoeden is een team',
    type: 'quote',
    month: 3,
    week: 9,
    dag: 'Zondag',
    imageText: 'De beste opvoeding geef je niet alleen. Je geeft het als team.',
    caption: `Praat met je partner. Wees het eens over de grote lijnen. Steun elkaar als het moeilijk is.

Een kind dat ziet dat papa en mama samenwerken, voelt zich veilig.`,
    hashtags: '#teamwork #opvoeding #partner #samen #devadercoach',
  },

  // Week 10
  {
    id: 37,
    title: 'Red flags dat je kind aandacht nodig heeft',
    type: 'carrousel',
    month: 3,
    week: 10,
    dag: 'Dinsdag',
    slides: [
      '5 signalen dat je kind meer aandacht nodig heeft',
      '1. Het zoekt negatieve aandacht - Pesten, roepen, dingen kapotmaken. Elke aandacht is beter dan geen aandacht.',
      '2. Het is aanhankelijk - Constant vastklampen, niet alleen willen zijn. Het tankt bij omdat het leeg is.',
      '3. Het slaapt slecht - Nachtmerries, niet willen slapen, steeds uit bed komen. Onrust van overdag komt \'s nachts.',
      '4. Het trekt zich terug - Stil zijn, niet meer vertellen over school, op de kamer zitten. Terugtrekken is ook een signaal.',
      '5. Het zegt letterlijk: "je bent nooit er" - Kinderen zijn eerlijker dan volwassenen. Luister als ze dit zeggen.',
      'Herken je een van deze? Het is geen kritiek op jou als vader. Het is een uitnodiging om dichter bij te komen. @devadercoach',
    ],
    caption: `Kinderen zeggen niet: "Papa, ik heb meer quality time nodig." Ze laten het zien door hun gedrag.

Als het gedrag verandert, is dat bijna altijd een signaal. Niet om jezelf schuldig te voelen. Maar om actie te ondernemen.

Eentje herkenbaar? Deel het in de reacties.`,
    hashtags: '#signalen #kindergedrag #opvoedtips #bewustopvoeden #devadercoach',
  },
  {
    id: 38,
    title: 'Wat je kind ziet vs wat jij ziet',
    type: 'reel',
    month: 3,
    week: 10,
    dag: 'Donderdag',
    concept: `Split/vergelijking:
Wat jij ziet: "Ik ben moe, gestrest, ik doe het niet goed genoeg"
Wat je kind ziet: "De sterkste, grappigste, liefste papa van de hele wereld"

Kind rent naar vader en springt in zijn armen.
Eindtekst: "Je bent genoeg. Echt."`,
    caption: `Je bent harder voor jezelf dan je kind ooit zal zijn.

Voor hen ben je alles. Onthoud dat op de dagen dat je twijfelt.`,
    hashtags: '#genoeg #vaderzijn #liefde #perspectief #devadercoach',
  },
  {
    id: 39,
    title: 'De vader die ik wil zijn over 10 jaar',
    type: 'verhaal',
    month: 3,
    week: 10,
    dag: 'Zaterdag',
    imageText: 'Ik wil niet dat mijn kinderen zeggen: papa werkte hard. Ik wil dat ze zeggen: papa was er altijd.',
    caption: `Over tien jaar is mijn dochter een tiener. Mijn zoon bijna volwassen.

Ze zullen zich niet herinneren hoeveel ik verdiende. Welke auto ik reed. Hoe druk ik het had.

Ze zullen zich herinneren of papa luisterde als ze iets vertelden. Of papa kwam kijken bij hun wedstrijd. Of papa er was toen het moeilijk was.

Elke dag die ik nu investeer in aanwezig zijn, is een herinnering die ze later koesteren.

Dat is het soort rijkdom waar ik voor kies.

Welke vader wil jij zijn over 10 jaar?`,
    hashtags: '#toekomst #vaderschap #investeren #aanwezig #devadercoach',
  },
  {
    id: 40,
    title: 'Het gaat niet om controle',
    type: 'quote',
    month: 3,
    week: 10,
    dag: 'Zondag',
    imageText: 'Opvoeden gaat niet over controle over je kind. Het gaat over controle over jezelf.',
    caption: `De moeilijkste persoon om op te voeden in je gezin ben jij zelf.

Als jij kalm bent, is je kind kalmer. Als jij luistert, praat je kind meer. Als jij herstelt na een fout, leert je kind hetzelfde.

Het begint bij jou.`,
    hashtags: '#zelfregulatie #opvoeding #kalmte #vaderschap #devadercoach',
  },

  // Week 11
  {
    id: 41,
    title: 'De Vadercoach methode - zo werkt het',
    type: 'carrousel',
    month: 3,
    week: 11,
    dag: 'Dinsdag',
    slides: [
      'Hoe word je een bewustere vader? De Vadercoach methode.',
      'Stap 1: Bewustwording - Herken je patronen. Wat trigger jou? Wanneer verlies je je geduld? Zonder oordeel kijken naar jezelf.',
      'Stap 2: Kennis - Leer hoe je kind zich ontwikkelt. Waarom het doet wat het doet. Begrijpen maakt geduld makkelijker.',
      'Stap 3: Oefenen - Kleine stappen. Elke dag een moment bewust anders reageren. Niet alles tegelijk.',
      'Stap 4: Reflecteren - Terugkijken. Wat ging goed vandaag? Wat wil ik morgen anders? Zonder jezelf af te branden.',
      'Stap 5: Volhouden - Het is geen sprint, het is een marathon. Slechte dagen horen erbij. Steun zoeken ook.',
      'Klaar om te beginnen? Download De Vadercoach app. 22 dagen, 8 vaardigheden, jouw tempo. Link in bio.',
    ],
    caption: `Beter worden als vader is geen talent. Het is een vaardigheid. En vaardigheden kun je leren.

De Vadercoach app begeleidt je in 22 dagen door de belangrijkste opvoedvaardigheden. In je eigen tempo, op je eigen manier.

Niet omdat je een slechte vader bent. Maar omdat je een nog betere wilt worden.

Link in bio.`,
    hashtags: '#devadercoach #methode #opvoedcursus #vaderschap #groei',
  },
  {
    id: 42,
    title: 'De reactie van mijn kind toen ik sorry zei',
    type: 'reel',
    month: 3,
    week: 11,
    dag: 'Donderdag',
    concept: `Tekst-gebaseerde reel, rustig opgebouwd:
"Gisteren werd ik boos op mijn dochter"
"Ze had per ongeluk sap over mijn laptop gemorst"
"Ik schreeuwde"
"Ze rende naar haar kamer"
"Ik ging naar haar toe en zei: sorry lieverd, dat had papa niet moeten doen"
"Ze keek me aan en zei:"
"Het geeft niet papa. Jij mag ook fouten maken."
Eindtekst: "Ze was 4."`,
    caption: `Kinderen leren vergeven als ze zien dat wij fouten durven toegeven.

Sorry zeggen tegen je kind is niet zwak. Het is het sterkste wat je kunt doen.`,
    hashtags: '#sorry #vergeven #kwetsbaar #opvoeding #devadercoach',
  },
  {
    id: 43,
    title: 'Wat de Vader Experience mij bracht',
    type: 'verhaal',
    month: 3,
    week: 11,
    dag: 'Zaterdag',
    imageText: '22 dagen. 8 vaardigheden. 1 nieuwe vader.',
    caption: `Ik ging de Vader Experience in met het idee: ik wil minder schreeuwen. Simpel doel.

Maar het werd zoveel meer dan dat.

Dag 1 ging over zelfregulatie. Ik leerde dat mijn boosheid niet van mijn kind kwam, maar van mijn eigen overprikkeling. Dat was een eye-opener.

Dag 7 ging over emotiecoaching. Ik leerde dat "niet huilen" het slechtste is wat je kunt zeggen. En wat je in plaats daarvan kunt doen.

Dag 15 ging over verbinding. Ik leerde dat 10 minuten echte aandacht meer doet dan een hele dag in dezelfde ruimte zijn.

Na 22 dagen schreeuwde ik niet minder. Maar als ik schreeuwde, herstelde ik sneller. En mijn kinderen merkten het verschil.

Mijn dochter zei: "Papa is liever geworden."

Dat was alles wat ik nodig had.

Wil je het zelf ervaren? Download de app. Link in bio.`,
    hashtags: '#vaderexperience #devadercoach #22dagen #resultaat #opvoedcursus',
  },
  {
    id: 44,
    title: 'Je hoeft het niet alleen te doen',
    type: 'quote',
    month: 3,
    week: 11,
    dag: 'Zondag',
    imageText: 'Hulp vragen maakt je geen zwakke vader. Het maakt je een wijze vader.',
    caption: `We zijn opgegroeid met het idee dat mannen het zelf moeten uitzoeken. Maar opvoeding is te belangrijk om te improviseren.

Er is geen schaamte in leren. Er is kracht in groeien.

De Vadercoach is er voor je. Link in bio.`,
    hashtags: '#hulpvragen #kracht #mannen #vaderschap #devadercoach',
  },

  // Week 12
  {
    id: 45,
    title: 'Wat vaders anders doen (en waarom dat goed is)',
    type: 'carrousel',
    month: 3,
    week: 12,
    dag: 'Dinsdag',
    slides: [
      'Wat vaders anders doen (en waarom dat goed is)',
      'Vaders stoeien meer. Dat leert kinderen grenzen voelen, risico inschatten en zichzelf reguleren.',
      'Vaders laten kinderen meer risico nemen. Dat bouwt zelfvertrouwen en veerkracht.',
      'Vaders zijn directer. Dat leert kinderen omgaan met eerlijke feedback.',
      'Vaders spelen fysiek. Dat helpt bij motorische ontwikkeling en lichaamsbewustzijn.',
      'Vaders gebruiken meer humor. Dat leert kinderen relativeren en lachen om tegenslagen.',
      'Vaderschap is geen kopie van moederschap. Het is een eigen kracht. Gebruik die. @devadercoach',
    ],
    caption: `Jarenlang werden vaders vergeleken met moeders. En kwamen we tekort. Want we deden het "anders".

Maar anders is niet minder. Vaders brengen iets unieks in de opvoeding. Iets wat kinderen nodig hebben.

Wees niet de moeder die je denkt dat je moet zijn. Wees de vader die je kunt zijn.`,
    hashtags: '#vaderkracht #anders #opvoeding #stoeien #devadercoach',
  },
  {
    id: 46,
    title: 'Brief aan mijn toekomstige kind',
    type: 'reel',
    month: 3,
    week: 12,
    dag: 'Donderdag',
    concept: `Vader schrijft aan tafel. Voice-over of tekst op scherm:
"Lieve zoon,
Als je dit leest ben je misschien zelf vader.
Ik wil dat je weet:
Ik heb niet alles goed gedaan.
Maar alles wat ik deed, deed ik met liefde.
Ik hoop dat je dat hebt gevoeld.
- Papa"

Muziek: pianomuziek, emotioneel`,
    caption: `Over dertig jaar leest hij dit misschien. En ik hoop dat hij knikt en denkt: ja, dat heb ik gevoeld.

Tot die tijd: elke dag mijn best doen.`,
    hashtags: '#brief #toekomst #liefde #vaderschap #devadercoach',
  },
  {
    id: 47,
    title: 'Wat 500 vaders mij hebben geleerd',
    type: 'verhaal',
    month: 3,
    week: 12,
    dag: 'Zaterdag',
    imageText: 'Elke vader twijfelt. Dat is het bewijs dat je het serieus neemt.',
    caption: `In de afgelopen maanden heb ik met honderden vaders gesproken. Via DM's, reacties, de app.

En weet je wat me opvalt? Elke vader worstelt met dezelfde dingen:

- Geduld
- Schuldgevoel over werken
- Niet weten of ze het goed doen
- Bang zijn om op hun eigen vader te lijken
- Willen dat hun kind zich geliefd voelt

Het mooie is: het feit dat je hiermee worstelt, betekent dat je een goede vader bent. Slechte vaders stellen die vragen niet.

Dit account is voor jullie. Voor elke vader die beter wil worden zonder perfect te hoeven zijn.

Bedankt dat jullie hier zijn.`,
    hashtags: '#community #vaders #devadercoach #samentwijfelen #dankbaar',
  },
  {
    id: 48,
    title: 'Dit is pas het begin',
    type: 'quote',
    month: 3,
    week: 12,
    dag: 'Zondag',
    imageText: 'Een goede vader worden is geen bestemming. Het is een reis die elke dag opnieuw begint.',
    caption: `Drie maanden geleden begon dit account. Met een doel: vaders helpen om bewuster op te voeden.

Dit is pas het begin. Er komt meer. Meer tips, meer verhalen, meer eerlijkheid.

Zet de notificaties aan. Deel dit account met een vader die het nodig heeft. En onthoud: je bent niet alleen op deze reis.

De Vadercoach app is er voor je. Link in bio.`,
    hashtags: '#devadercoach #reis #begin #vaderschap #groei',
  },
];
