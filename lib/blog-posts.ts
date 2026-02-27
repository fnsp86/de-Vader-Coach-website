export interface BlogPostMeta {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: number;
  category: string;
}

export interface BlogPostFull {
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  content: string;
}

export const POSTS_LIST: BlogPostMeta[] = [
  {
    title: 'De Twee Minuten Die Alles Veranderden',
    description: 'Een vader legt zijn telefoon neer. Zijn dochter kijkt op. En er gebeurt iets dat hij niet had verwacht.',
    slug: 'aanwezig-zijn-voor-kind',
    date: '2026-02-20',
    readTime: 3,
    category: 'Aanwezigheid',
  },
  {
    title: 'Afgelopen Zaterdag in de Albert Heijn',
    description: 'Mijn zoon lag krijsend op de grond bij de kassa. Iedereen keek. Dit is wat ik leerde.',
    slug: 'driftbuien-begrijpen',
    date: '2026-02-15',
    readTime: 3,
    category: 'Emotiecoaching',
  },
  {
    title: 'Ik Heb Het Al Drie Keer Gezegd',
    description: 'Waarom je kind niet luistert als je het voor de vierde keer zegt. (Hint: het ligt niet aan je kind.)',
    slug: 'grenzen-zonder-schreeuwen',
    date: '2026-02-10',
    readTime: 3,
    category: 'Grenzen',
  },
  {
    title: 'Vanmorgen Was Ik Die Vader',
    description: 'Ik schreeuwde om een beker melk. Mijn dochter keek me aan. En ik zag het.',
    slug: 'herstellen-na-fout',
    date: '2026-02-05',
    readTime: 3,
    category: 'Herstel',
  },
  {
    title: 'De Omgegooid Beker',
    description: 'Je overleeft een werkdag van acht uur zonder je stem te verheffen. Maar een beker melk? Dat is de druppel.',
    slug: 'waarom-je-kind-je-triggers',
    date: '2026-01-28',
    readTime: 3,
    category: 'Zelfregulatie',
  },
  {
    title: 'De Jas Met De Rits',
    description: 'Mijn dochter wil haar jas zelf dichtritsen. Het duurt. Het duurt lang. Mijn handen jeuken.',
    slug: 'loslaten-zonder-angst',
    date: '2026-01-20',
    readTime: 3,
    category: 'Autonomie',
  },
  {
    title: 'Het Gesprek Dat Niet Aan Tafel Gebeurde',
    description: 'Mijn zoon praat niet met mij. Behalve in de auto. Om kwart over tien. In het donker.',
    slug: 'praten-met-je-tiener',
    date: '2026-01-12',
    readTime: 3,
    category: 'Verbinding',
  },
  {
    title: 'Ik Lijk Mijn Vader Wel',
    description: 'Je hoort jezelf schreeuwen en denkt: dit is niet wie ik wil zijn. Maar het is wie je bent op de automatische piloot.',
    slug: 'reflecteren-als-vader',
    date: '2026-01-05',
    readTime: 3,
    category: 'Reflectie',
  },
  {
    title: 'Hij Keek Me Recht Aan En Deed Het Toch',
    description: 'Je kind hoort je wel, maar luistert niet. Dat verschil veranderde alles voor mij als vader.',
    slug: 'kind-luistert-niet',
    date: '2026-02-25',
    readTime: 3,
    category: 'Grenzen',
  },
  {
    title: 'Drie Jaar Oud En De Baas Van Het Hele Huis',
    description: 'Mijn peuter krijste alsof de wereld verging. Over een banaan. Dit is wat ik leerde over dat kleine brein.',
    slug: 'peuter-driftbui-wat-doen',
    date: '2026-02-22',
    readTime: 3,
    category: 'Emotiecoaching',
  },
  {
    title: 'De Stem Die Zegt Dat Je Het Niet Goed Genoeg Doet',
    description: 'Schuldgevoel als vader. Het zit er altijd. Na het schreeuwen. Na het werken. Na alles. Maar klopt het wel?',
    slug: 'schuldgevoel-als-vader',
    date: '2026-02-18',
    readTime: 3,
    category: 'Herstel',
  },
  {
    title: 'Ik Had Niks Meer Over',
    description: 'Opvoeden op een leeg reservoir. Als vader alles geven tot er niks meer is. Herkenbaar?',
    slug: 'vader-burn-out-opvoeding',
    date: '2026-02-14',
    readTime: 3,
    category: 'Zelfregulatie',
  },
  {
    title: 'Het Moment Dat Ik Mijn Telefoon In De Lade Legde',
    description: 'Quality time hoeft geen uitje te zijn. Soms is het vijf minuten op de grond met je volle aandacht.',
    slug: 'quality-time-kind',
    date: '2026-02-11',
    readTime: 3,
    category: 'Aanwezigheid',
  },
  {
    title: 'Er Zit Een Monster Onder Mijn Bed',
    description: 'Mijn zoon is bang in het donker. Elke avond weer. Ik zei dat er niks was. Dat hielp niet.',
    slug: 'kind-bang-in-donker',
    date: '2026-02-08',
    readTime: 3,
    category: 'Emotiecoaching',
  },
  {
    title: 'De Zondag Dat Ik Hem Terugbracht',
    description: 'Vader zijn na een scheiding. De autodeur die dichtslaat. Het stille huis. En toch een goede vader zijn.',
    slug: 'scheiden-en-vader-zijn',
    date: '2026-02-04',
    readTime: 3,
    category: 'Verbinding',
  },
  {
    title: 'De Telefoon Die Nooit Uitgaat',
    description: 'Mijn puber zit de hele dag op zijn telefoon. Ik zei: leg neer. Het werd ruzie. Er is een betere manier.',
    slug: 'puber-telefoon-verslaving',
    date: '2026-01-30',
    readTime: 3,
    category: 'Grenzen',
  },
  {
    title: 'De Eerste Nacht Met Drie',
    description: 'Vader worden. Iedereen feliciteert je. Niemand vertelt je dat je je soms verloren voelt. Dit is wat mij hielp.',
    slug: 'nieuwe-baby-als-vader',
    date: '2026-01-25',
    readTime: 3,
    category: 'Aanwezigheid',
  },
  {
    title: 'Het Telefoontje Van School',
    description: 'Je kind slaat op school. Je schrikt. Je schaamt je. Maar er zit iets achter dat gedrag. Dit is mijn verhaal.',
    slug: 'kind-slaat-andere-kinderen',
    date: '2026-01-22',
    readTime: 3,
    category: 'Emotiecoaching',
  },
  {
    title: 'Ik Was Niet Boos Om De Lego',
    description: 'Je schreeuwt tegen je kind en weet: dit gaat niet over wat er net gebeurde. Waar komt die boosheid vandaan?',
    slug: 'vader-eigen-emoties',
    date: '2026-01-17',
    readTime: 3,
    category: 'Zelfregulatie',
  },
  {
    title: 'Iedere Avond Hetzelfde Gevecht',
    description: 'Huiswerk. Elke avond strijd. Elke avond ruzie. Ik ontdekte dat het niet over het huiswerk ging.',
    slug: 'huiswerk-strijd',
    date: '2026-01-14',
    readTime: 3,
    category: 'Grenzen',
  },
  {
    title: 'Mama, Mijn Buik Doet Zeer',
    description: 'Je kind wil niet naar school. Elke ochtend strijd. Is het aanstellen? Of is er iets anders aan de hand?',
    slug: 'kind-wil-niet-naar-school',
    date: '2026-01-10',
    readTime: 3,
    category: 'Autonomie',
  },
  {
    title: 'Jij Bent Mijn Vader Niet',
    description: 'Stiefvader worden. Die ene zin die alles samenvat. En wat ik leerde over de rol die niemand je uitlegt.',
    slug: 'stiefvader-tips',
    date: '2026-01-07',
    readTime: 3,
    category: 'Verbinding',
  },
  {
    title: 'Elke Zondag Hetzelfde Afscheid',
    description: 'Weekendvader. Twee dagen per week. De uitdaging om in beperkte tijd een echte band te bouwen.',
    slug: 'vader-kind-weekendvader',
    date: '2026-01-03',
    readTime: 3,
    category: 'Verbinding',
  },
];

export function getAllBlogPosts(): BlogPostMeta[] {
  return POSTS_LIST;
}

export function getBlogPost(slug: string): BlogPostFull | undefined {
  return POSTS[slug];
}

const POSTS: Record<string, BlogPostFull> = {
  'aanwezig-zijn-voor-kind': {
    title: 'De Twee Minuten Die Alles Veranderden',
    description: 'Een vader legt zijn telefoon neer. Zijn dochter kijkt op. En er gebeurt iets dat hij niet had verwacht.',
    date: '2026-02-20',
    readTime: 3,
    category: 'Aanwezigheid',
    content: `
## De telefoon lag op tafel

Gisteren zat ik op de bank. Mijn dochter van zes vertelde over school. Ik knikte. Ik zei "ja, leuk!" op de juiste momenten. Maar mijn ogen waren op mijn scherm.

Op een gegeven moment stopte ze met praten. Ik keek op. Ze keek me aan. Niet boos. Niet verdrietig. Gewoon... wachtend.

Ik legde mijn telefoon weg. Draaide me naar haar toe. "Vertel nog eens. Wie was dat ook alweer?"

Haar ogen lichtten op alsof ik een cadeautje gaf.

## Twintig seconden

Dat is alles wat het kostte. Geen uren. Geen speciaal uitje. Geen groot gebaar. Twintig seconden bewust kiezen om er te zijn.

Onderzoekers noemen het "attentional shift" - het moment waarop je je aandacht verplaatst van waar het toevallig is, naar waar het ertoe doet. Het klinkt vanzelfsprekend. Maar tel eens hoe vaak je kind praat terwijl jij ergens anders bent met je hoofd.

## Halfaanwezig is erger dan afwezig

Dat is misschien het meest confronterende inzicht dat ik tegenkwam. Kinderen reageren heftiger op een ouder die er half is, dan op een ouder die er even niet is. Halfaanwezigheid stuurt een boodschap: jij bent niet interessant genoeg voor mijn volledige aandacht.

Niet omdat je een slechte vader bent. Maar omdat je brein, net als dat van iedereen, gewend is geraakt aan constante prikkels. Je telefoon is ontworpen om je aandacht te vangen. Je kind niet.

## Het experiment

Ik ga het een week proberen. Elke dag een moment kiezen - het hoeft niet lang te zijn - waarin ik er helemaal ben. Telefoon weg. Ogen op haar. Luisteren alsof het de eerste keer is.

Ik ben benieuwd wat er verandert. Niet bij haar. Bij mij.

---

*Meer lezen over aanwezigheid? In de cursus Aanwezig Vaderschap duiken we dieper in wat er gebeurt als je kind merkt dat je er echt bent - en wat je kunt doen om dat vaker te laten gebeuren.*
    `,
  },
  'driftbuien-begrijpen': {
    title: 'Afgelopen Zaterdag in de Albert Heijn',
    description: 'Mijn zoon lag krijsend op de grond bij de kassa. Iedereen keek. Dit is wat ik leerde.',
    date: '2026-02-15',
    readTime: 3,
    category: 'Emotiecoaching',
    content: `
## Gang 7, tussen de koekjes en het brood

Mijn zoon van vier wilde een pakje koekjes. Ik zei nee. Hij zei het nog een keer. Ik zei weer nee. En toen ging hij naar de grond alsof iemand de stekker eruit trok.

Volledig. Volume op tien. Armen, benen, snot, tranen.

Een vrouw keek me aan met die blik. Je weet welke. Die blik die zegt: "Kun je je kind niet even..."

## Wat ik vroeger deed

Twee jaar geleden had ik een van deze drie dingen gedaan:

1. Toegeven. ("Oke, eentje dan." = rust, maar dan weet hij: schreeuwen werkt.)
2. Dreigen. ("Als je niet stopt, gaan we weg." = misschien rust, maar hij leert niks.)
3. Negeren en doorlopen. ("Hij houdt vanzelf op." = klopt, maar wat voelt hij ondertussen?)

## Wat ik nu deed

Ik ging op mijn hurken zitten. Midden in gang 7. Terwijl mensen om ons heen liepen. Ik zei iets. Iets simpels. En het veranderde de situatie.

## Wat ik sindsdien weet

Een driftbui is geen gedragsprobleem. Het is een brein dat overbelast is. Letterlijk. Het deel dat nadenkt en remt is bij een vierjarige nog nauwelijks ontwikkeld. Wat wel werkt, is het alarmsysteem. En dat staat op volle sterkte aan.

Straffen op dat moment is zoiets als iemand uitleggen hoe een brandblusser werkt terwijl het huis in brand staat. Eerst moet het vuur uit.

De vraag is alleen: hoe?

---

*In de cursus Emotiecoaching voor Vaders leer je precies wat er in het brein van je kind gebeurt tijdens een driftbui, en hoe je het kunt kalmeren in plaats van escaleren. Het is minder ingewikkeld dan je denkt - en effectiever dan je hoopt.*
    `,
  },
  'grenzen-zonder-schreeuwen': {
    title: 'Ik Heb Het Al Drie Keer Gezegd',
    description: 'Waarom je kind niet luistert als je het voor de vierde keer zegt. (Hint: het ligt niet aan je kind.)',
    date: '2026-02-10',
    readTime: 3,
    category: 'Grenzen',
    content: `
## Het getal is altijd drie

Eerste keer: rustig. Vriendelijk zelfs. "Kom je aan tafel?"

Tweede keer: iets luider. Iets minder vriendelijk. "Ik zei: kom aan tafel."

Derde keer: de stem die je niet herkent als de jouwe. "KOM. NU. AAN. TAFEL."

En dan luistert je kind. Niet omdat je het drie keer hebt gezegd. Maar omdat je kind heeft geleerd dat de eerste twee keer niet tellen.

## Een ongemakkelijke waarheid

Je kind is niet het probleem. Je patroon is het probleem.

Je kind heeft geleerd: papa meent het pas als hij schreeuwt. Dus bij de eerste keer denkt het: dat is de "preview-papa". Bij de tweede: "oke, het wordt serieuzer." Bij de derde: "ah, nu meent hij het."

Jij traint je kind onbewust om pas bij schreeuwen te luisteren.

## Wat als je het omdraait?

Stel je voor dat je kind de eerste keer al weet: papa meent het. Niet omdat je strenger bent. Niet omdat je dreigt. Maar omdat je iets anders doet.

## Streng is niet hetzelfde als hard

Dat is de fout die de meeste vaders maken. Ze denken dat grenzen stellen betekent: harder zijn. Meer volume. Meer dreiging.

Maar de vaders die het beste grenzen stellen, zijn vaak de rustigste in de kamer.

Het verschil tussen streng en hard? Eentje bouwt vertrouwen op. De ander breekt het af.

---

*Hoe je grenzen stelt die je kind de eerste keer serieus neemt - zonder te schreeuwen, dreigen of eindeloos te herhalen? Dat leer je in de cursus Grenzen Stellen met Liefde.*
    `,
  },
  'herstellen-na-fout': {
    title: 'Vanmorgen Was Ik Die Vader',
    description: 'Ik schreeuwde om een beker melk. Mijn dochter keek me aan. En ik zag het.',
    date: '2026-02-05',
    readTime: 3,
    category: 'Herstel',
    content: `
## Het was maar een beker melk

Ze morste. Weer. Derde keer deze week. En ik hoorde mezelf zeggen: "KUN JE NIET EENS NORMAAL DRINKEN?"

De stilte daarna was oorverdovend.

Mijn dochter van zeven keek me aan. Niet boos. Niet huilend. Erger. Ze keek alsof ze heel even niet zeker wist of ze veilig was.

## Zeventig procent

Onderzoekers ontdekten iets dat me enorm geruststelde. Zelfs bij de beste ouder-kind relaties klopt de afstemming maar in 30% van de gevallen. De overige 70% is misafstemming.

Zeventig procent. Dat is niet falen. Dat is normaal.

Het verschil tussen een sterke band en een zwakke band zit niet in het voorkomen van die momenten. Het zit in wat je erna doet.

## Wat ik deed

Ik ging terug naar haar kamer. Ik ging op mijn hurken zitten. En ik zei iets.

Ze knuffelde me. En zei: "Het geeft niet papa. Het was maar melk."

Ze vergaf me sneller dan ik mezelf vergaf.

---

*Herstellen na een fout is een vaardigheid. In de cursus Herstel na Conflict leer je hoe je terugkomt na een breuk - op een manier die de band sterker maakt dan daarvoor.*
    `,
  },
  'waarom-je-kind-je-triggers': {
    title: 'De Omgegooid Beker',
    description: 'Je overleeft een werkdag van acht uur zonder je stem te verheffen. Maar een beker melk? Dat is de druppel.',
    date: '2026-01-28',
    readTime: 3,
    category: 'Zelfregulatie',
    content: `
## Op werk ben je een held

Je hebt een collega die je halverwege een zin onderbreekt. Een manager die om vijf uur een "urgent" verzoek stuurt. En jij? Jij blijft rustig.

Dan kom je thuis. Je zoon van vier gooit zijn beker melk om. En jij ontploft.

## De onzichtbare rugzak

Je draagt iets mee. De patronen uit je eigen jeugd. De stemmen die je als kind hoorde.

Je brein heeft dat opgeslagen. Niet als herinnering, maar als alarm. En wanneer je eigen kind morst, gaat dat alarm af. Niet om de melk. Om iets van lang geleden.

## Het window

Er is een concept dat "window of tolerance" heet. Het beschrijft de zone waarbinnen je goed functioneert. Buiten die zone ga je in de overdrive of in de shutdown.

Na een werkdag is je window smaller. Die beker melk was niet de oorzaak. Het was de druppel in een emmer die al vol zat.

---

*In de cursus Zelfregulatie als Vader leer je wat er in je zenuwstelsel gebeurt op het moment dat je de controle verliest - en hoe je het kunt opvangen voordat het escaleert.*
    `,
  },
  'loslaten-zonder-angst': {
    title: 'De Jas Met De Rits',
    description: 'Mijn dochter wil haar jas zelf dichtritsen. Het duurt. Het duurt lang. Mijn handen jeuken.',
    date: '2026-01-20',
    readTime: 3,
    category: 'Autonomie',
    content: `
## Twee minuten en drieendertig seconden

Zo lang deed mijn dochter van vier erover om haar jas dicht te ritsen. Ik heb het geteld.

Ze worstelde. Het lukte niet. Het lukte bijna. Het lukte weer niet. En toen: klik.

Ze keek naar me op. Stralend. "IK DID HET ZELF!"

## De paradox

Het gekke aan opvoeden is dat je beschermingsinstinct soms precies het tegenovergestelde doet van wat je kind nodig heeft. Je wilt ze behoeden voor frustratie. Maar frustratie is de brandstof van groei.

De moeilijkste verschuiving in het vaderschap is die van beschermer naar coach. Van "ik doe het voor je" naar "ik geloof dat jij het kunt."

## De jas

Die jas was maar een jas. Maar dat moment was meer dan een rits.

Twee minuten en drieendertig seconden. Dat is de prijs van zelfvertrouwen.

---

*De cursus Autonomie en Loslaten helpt je om de balans te vinden tussen beschermen en loslaten - voor elke leeftijd.*
    `,
  },
  'praten-met-je-tiener': {
    title: 'Het Gesprek Dat Niet Aan Tafel Gebeurde',
    description: 'Mijn zoon praat niet met mij. Behalve in de auto. Om kwart over tien. In het donker.',
    date: '2026-01-12',
    readTime: 3,
    category: 'Verbinding',
    content: `
## "Hoe was school?" "Goed."

Drie jaar lang was dat ons gesprek. Mijn zoon van veertien en ik. Elke dag hetzelfde script.

## De autorit

Het gebeurde op een dinsdagavond. Ik haalde hem op van voetbaltraining. Halfelf. Donker. Radio stond zacht aan.

Ik stelde geen vraag. Ik reed gewoon. Vijf minuten stilte. Toen begon ik over iets dat mij was overkomen op werk.

"Wat zei hij dan?"

Tien minuten later wist ik meer over zijn leven dan in de afgelopen drie maanden.

## Wat ik nu doe

Ik plan geen gesprekken meer. Ik creeer momenten. En soms zegt hij niks. En soms zegt hij alles.

Het enige wat ik doe is: er zijn. Naast hem. Zonder agenda.

---

*In de cursus Verbinding met je Tiener ontdek je waarom bepaalde settings werken en andere niet.*
    `,
  },
  'reflecteren-als-vader': {
    title: 'Ik Lijk Mijn Vader Wel',
    description: 'Je hoort jezelf schreeuwen en denkt: dit is niet wie ik wil zijn. Maar het is wie je bent op de automatische piloot.',
    date: '2026-01-05',
    readTime: 3,
    category: 'Reflectie',
    content: `
## Die stem

Het was een donderdagavond. Mijn zoon wilde niet naar bed. Ik opende mijn mond en hoorde een stem die niet van mij was.

Het was de stem van mijn vader.

## De automatische piloot

De meeste vaders functioneren op automatische piloot. Je kind doet iets, jij reageert. Snel. Instinctief. En vaak op precies dezelfde manier als je zelf bent opgevoed.

## De rugzak

Iedereen heeft er een. Onzichtbaar, maar altijd mee. De vader die nooit in zijn rugzak kijkt, geeft alles ongesorteerd door aan zijn kind.

## De vraag die alles verandert

Het sterkste voorspellende vermogen voor goed ouderschap is hoe goed je begrijpt waarom je doet wat je doet.

De vader die snapt waarom hij boos wordt, is al aan het veranderen.

---

*In de cursus Reflectief Vaderschap leer je de patronen uit je eigen opvoeding herkennen en bewust kiezen wat je wel en niet doorgeeft.*
    `,
  },
  'kind-luistert-niet': {
    title: 'Hij Keek Me Recht Aan En Deed Het Toch',
    description: 'Je kind hoort je wel, maar luistert niet. Dat verschil veranderde alles voor mij als vader.',
    date: '2026-02-25',
    readTime: 3,
    category: 'Grenzen',
    content: `
## Ik stond in de deuropening

Mijn zoon van zes zat op de grond. Lego. Overal. Ik had net gezegd: "Ruim je Lego op, we gaan eten."

Hij keek me aan. Recht in mijn ogen. En ging gewoon door met bouwen.

## De tien-keer-test

Op een dinsdag hield ik bij hoe vaak ik iets zei dat hij niet deed. Tien keer. Tien keer op een avond.

Ik was de hele avond aan het zenden. En hij had de ontvanger uitgezet.

## Het probleem was niet zijn oren

Als een kind je niet hoort, is de oplossing: harder praten. Maar als een kind je wel hoort en niet luistert, dan is de vraag: waarom neemt hij jou niet serieus?

Er is iets wat onderzoekers "instructiemoeheid" noemen. Het punt waarop een kind zoveel opdrachten krijgt dat het brein stopt met reageren.

---

*In de cursus Grenzen Stellen met Liefde leer je waarom je kind niet luistert bij de eerste keer - en hoe je dat kunt veranderen zonder harder te praten.*
    `,
  },
  'peuter-driftbui-wat-doen': {
    title: 'Drie Jaar Oud En De Baas Van Het Hele Huis',
    description: 'Mijn peuter krijste alsof de wereld verging. Over een banaan. Dit is wat ik leerde over dat kleine brein.',
    date: '2026-02-22',
    readTime: 3,
    category: 'Emotiecoaching',
    content: `
## De banaan was verkeerd

Niet de verkeerde banaan. Dezelfde banaan. Maar ik had hem gepeld. En zij wilde hem zelf pellen.

"IK WIL HEM HEEL! MAAK HEM HEEL!"

## Wat er van binnen gebeurt

Een peuterbrein is als een auto met een gaspedaal en geen rem. Het deel dat emoties voelt werkt prima. Het deel dat emoties remt is nog een bouwput.

Redeneren met een peuter midden in een driftbui is zoiets als uitleggen hoe de motor werkt tegen iemand die net uit een achtbaan stapt.

## De banaan daarna

Ik ging naast haar zitten op de keukenvloer. Binnen twee minuten zat ze op mijn schoot. Met een gepelde banaan. Etend. Alsof er niks was gebeurd.

---

*In de cursus Emotiecoaching voor Vaders leer je wat er in het peuterbrein gebeurt tijdens een driftbui en hoe je de kalmte terug brengt.*
    `,
  },
  'schuldgevoel-als-vader': {
    title: 'De Stem Die Zegt Dat Je Het Niet Goed Genoeg Doet',
    description: 'Schuldgevoel als vader. Het zit er altijd. Na het schreeuwen. Na het werken. Na alles. Maar klopt het wel?',
    date: '2026-02-18',
    readTime: 3,
    category: 'Herstel',
    content: `
## Maandagochtend, half acht

Mijn dochter stond bij de deur. "Papa, ga je vandaag weer zo laat werken?"

Ik zei: "Nee schat, vandaag niet."

Ik werkte tot half zeven.

## Het lijstje wordt nooit korter

Het rare aan schuldgevoel als vader is dat het er altijd is. Als je werkt, voel je je schuldig. Als je thuis bent, voel je je schuldig. Er is altijd een versie van jou die het beter doet.

## De valkuil

Schuldgevoel voelt productief. Maar schuldgevoel is geen bewijs van betrokkenheid. Het is een signaal dat je jezelf beoordeelt met een maatstaf die niet klopt.

---

*In de cursus Herstel na Conflict leer je hoe je omgaat met schuldgevoel en hoe je de maatstaf verschuift van perfectie naar verbinding.*
    `,
  },
  'vader-burn-out-opvoeding': {
    title: 'Ik Had Niks Meer Over',
    description: 'Opvoeden op een leeg reservoir. Als vader alles geven tot er niks meer is. Herkenbaar?',
    date: '2026-02-14',
    readTime: 3,
    category: 'Zelfregulatie',
    content: `
## Het moment dat ik het wist

Mijn zoon vroeg of ik mee wilde spelen. Lego. Op de grond. Iets wat ik normaal leuk vind.

En ik voelde niks. Geen zin. Geen energie. Gewoon... leeg.

## De checklist

Moe. Altijd moe. Slaap hielp niet. Weekend hielp niet.

Er is een verschil tussen moe zijn en op zijn. Onderzoekers noemen het "parental burnout" en het treft meer vaders dan je denkt. Juist de vaders die alles willen geven.

## Wat ik moest leren

Je past iets kunt geven als er iets in de tank zit.

---

*In de cursus Zelfregulatie als Vader leer je de signalen van overbelasting herkennen en hoe je je zenuwstelsel weer in balans brengt.*
    `,
  },
  'quality-time-kind': {
    title: 'Het Moment Dat Ik Mijn Telefoon In De Lade Legde',
    description: 'Quality time hoeft geen uitje te zijn. Soms is het vijf minuten op de grond met je volle aandacht.',
    date: '2026-02-11',
    readTime: 3,
    category: 'Aanwezigheid',
    content: `
## Dierentuin, speeltuin, pretpark

Ik was de vader van de uitjes. Tot mijn vrouw iets zei: "Hij wil niet nog een uitje. Hij wil gewoon dat je op de grond gaat zitten."

## Op de grond

Die zaterdag ging ik naast mijn zoon zitten. Met zijn dinosaurussen. Telefoon in de lade.

Na twintig minuten keek hij me aan en zei: "Dit is de leukste dag."

We hadden niks gedaan.

## De mythe van kwaliteitstijd

Kinderen meten quality time niet in activiteiten. Ze meten het in aandacht.

---

*In de cursus Aanwezig Vaderschap leer je waarom twintig minuten volle aandacht meer doet dan een hele dag half aanwezig zijn.*
    `,
  },
  'kind-bang-in-donker': {
    title: 'Er Zit Een Monster Onder Mijn Bed',
    description: 'Mijn zoon is bang in het donker. Elke avond weer. Ik zei dat er niks was. Dat hielp niet.',
    date: '2026-02-08',
    readTime: 3,
    category: 'Emotiecoaching',
    content: `
## Elke avond hetzelfde

"Papa, ik durf niet." Mijn zoon van vijf is bang in het donker.

Ik zei: "Er zijn geen monsters. Er is niks om bang voor te zijn."

Logisch. Kloppend. En totaal nutteloos.

Want zijn brein hoorde: wat jij voelt klopt niet. Jouw angst is niet echt.

## Het brein in het donker

Angst bij kinderen werkt anders dan bij volwassenen. De verbeelding is sterker dan de logica.

Zeggen dat er niks is, is zoiets als tegen iemand met hoogtevrees zeggen: "Je staat op een brug, er kan niks gebeuren."

---

*In de cursus Emotiecoaching voor Vaders leer je hoe je omgaat met angst, verdriet en boosheid bij je kind.*
    `,
  },
  'scheiden-en-vader-zijn': {
    title: 'De Zondag Dat Ik Hem Terugbracht',
    description: 'Vader zijn na een scheiding. De autodeur die dichtslaat. Het stille huis. En toch een goede vader zijn.',
    date: '2026-02-04',
    readTime: 3,
    category: 'Verbinding',
    content: `
## De oprit

Ik zette hem af. Hij rende naar binnen zonder om te kijken. De stilte op de terugweg was het ergste.

## Halve vader

Zo voelde het. Doordeweeks miste ik de gewone dingen. En in het weekend voelde het alsof ik het moest goedmaken.

## Wat ik leerde

De band met je kind hangt niet af van het aantal dagen. Het hangt af van de kwaliteit van de momenten.

---

*In de cursus Verbinding met je Tiener ontdek je hoe je een sterke band opbouwt - ook als je niet elke dag samen bent.*
    `,
  },
  'puber-telefoon-verslaving': {
    title: 'De Telefoon Die Nooit Uitgaat',
    description: 'Mijn puber zit de hele dag op zijn telefoon. Ik zei: leg neer. Het werd ruzie. Er is een betere manier.',
    date: '2026-01-30',
    readTime: 3,
    category: 'Grenzen',
    content: `
## Half elf op een schoolavond

Het blauwe licht van zijn scherm in het donker. "Telefoon uit." Niks. Tien minuten later: hetzelfde scherm.

## Wat ik verkeerd begreep

De telefoon is niet het probleem. De telefoon is de plek waar zijn sociale leven zich afspeelt. Voor hem is die telefoon de toegang tot alles wat voor hem belangrijk is.

## De andere aanpak

Er is een verschil tussen grenzen opleggen en grenzen samen vormgeven.

---

*In de cursus Grenzen Stellen met Liefde leer je hoe je grenzen stelt die je tiener serieus neemt - zonder machtstrijd.*
    `,
  },
  'nieuwe-baby-als-vader': {
    title: 'De Eerste Nacht Met Drie',
    description: 'Vader worden. Iedereen feliciteert je. Niemand vertelt je dat je je soms verloren voelt. Dit is wat mij hielp.',
    date: '2026-01-25',
    readTime: 3,
    category: 'Aanwezigheid',
    content: `
## Half vier 's nachts

Ze sliep eindelijk. De baby, bedoel ik. En ik zat in de woonkamer met een gevoel waar ik geen naam voor had.

Het was niet verdriet. Het was niet angst. Een soort verdwaaldheid.

## Het geheim dat niemand vertelt

Het bleek dat het normaal is. De band tussen vader en kind komt niet altijd als een bliksemschicht. Het groeit langzaam. Door doen. Door er zijn.

---

*In de cursus Aanwezig Vaderschap leer je hoe je vanaf het begin een band opbouwt met je kind.*
    `,
  },
  'kind-slaat-andere-kinderen': {
    title: 'Het Telefoontje Van School',
    description: 'Je kind slaat op school. Je schrikt. Je schaamt je. Maar er zit iets achter dat gedrag. Dit is mijn verhaal.',
    date: '2026-01-22',
    readTime: 3,
    category: 'Emotiecoaching',
    content: `
## Dinsdag, kwart over twee

"Uw zoon heeft een ander kind geslagen op het schoolplein."

Eerst schaamte. Toen boosheid. In de auto repeteerde ik mijn toespraak.

## De gang

Hij zat op een stoel. Klein. Ik vroeg: "Wat gebeurde er?"

En toen kwamen de tranen. Om iets wat al weken speelde.

## Gedrag is communicatie

Slaan is niet oke. Maar slaan is altijd de buitenkant van iets. Kinderen die slaan doen dat omdat ze iets voelen dat te groot is voor hun lichaam.

---

*In de cursus Emotiecoaching voor Vaders leer je het gedrag van je kind lezen als communicatie.*
    `,
  },
  'vader-eigen-emoties': {
    title: 'Ik Was Niet Boos Om De Lego',
    description: 'Je schreeuwt tegen je kind en weet: dit gaat niet over wat er net gebeurde. Waar komt die boosheid vandaan?',
    date: '2026-01-17',
    readTime: 3,
    category: 'Zelfregulatie',
    content: `
## Tien blokjes op de trap

Ik trapte op Lego. Op sokken. Ik schreeuwde. Vol volume. Tegen een kind van vijf.

Later die avond: waar ging dat over? Niet de Lego. Die dag op werk was zwaar geweest. De boosheid ingeslikt. En 's avonds, op de trap, kwam het eruit.

## Het patroon

Slechte dag op werk: kort lontje thuis. Mijn kinderen kregen niet mijn boosheid over hen. Ze kregen mijn boosheid over al het andere.

## De ontdekking

Psychologen noemen het "displaced anger". De oplossing begint tussen het moment dat je de Lego voelt en het moment dat je mond opengaat. Die paar seconden - dat is waar alles verandert. En het is trainbaar.

---

*In de cursus Zelfregulatie als Vader leer je je eigen triggers herkennen en hoe je die paar cruciale seconden gebruikt om anders te reageren.*
    `,
  },
  'huiswerk-strijd': {
    title: 'Iedere Avond Hetzelfde Gevecht',
    description: 'Huiswerk. Elke avond strijd. Elke avond ruzie. Ik ontdekte dat het niet over het huiswerk ging.',
    date: '2026-01-14',
    readTime: 3,
    category: 'Grenzen',
    content: `
## Kwart over vijf

De tas ligt in de gang. Mijn dochter van tien zit op de bank. YouTube.

Om zeven uur zitten we samen aan tafel. Zij huilend. Ik gefrustreerd. Allebei boos over iets wat niet over sommen gaat.

## Het inzicht

Waar gaat de ruzie echt over? Controle. Ik wilde controle over wanneer zij haar huiswerk maakte. Zij wilde controle over haar eigen tijd.

Het huiswerk was het slagveld. Maar de oorlog ging ergens anders over.

---

*In de cursus Grenzen Stellen met Liefde leer je hoe je duidelijke verwachtingen stelt zonder machtstrijd.*
    `,
  },
  'kind-wil-niet-naar-school': {
    title: 'Mama, Mijn Buik Doet Zeer',
    description: 'Je kind wil niet naar school. Elke ochtend strijd. Is het aanstellen? Of is er iets anders aan de hand?',
    date: '2026-01-10',
    readTime: 3,
    category: 'Autonomie',
    content: `
## Maandag, dinsdag, woensdag

Drie ochtenden achter elkaar. "Mijn buik doet zeer."

De eerste dag geloofde ik hem. De tweede dag twijfelde ik. De derde dag: "Je moet gewoon naar school."

## Wat ik niet zag

In plaats van "Is je buik echt zeer?" vroeg ik: "Wat gebeurt er op school?"

Een verhaal over een jongen. Over pauzes alleen. De buikpijn was echt. Maar de oorzaak zat niet in zijn buik.

## Het lichaam praat

Kinderen hebben niet altijd woorden voor wat ze voelen. Maar hun lichaam praat wel.

---

*In de cursus Autonomie en Loslaten leer je hoe je je kind helpt omgaan met moeilijke situaties.*
    `,
  },
  'stiefvader-tips': {
    title: 'Jij Bent Mijn Vader Niet',
    description: 'Stiefvader worden. Die ene zin die alles samenvat. En wat ik leerde over de rol die niemand je uitlegt.',
    date: '2026-01-07',
    readTime: 3,
    category: 'Verbinding',
    content: `
## De eerste keer dat ze het zei

"Jij bent mijn vader niet."

Negen jaar oud. Aan tafel. De tafel was stil.

## De rol zonder handleiding

Je bent geen vader. Maar je doet vaderdingen. En zij laat je dat weten.

## Wat ik leerde

Verbinding begint niet bij autoriteit. Het begint bij vertrouwen. Vertrouwen bouw je door aanwezig te zijn zonder iets te eisen.

De band met een stiefkind groeit niet door je rol te claimen. Het groeit door geduld en aanwezigheid.

---

*In de cursus Verbinding met je Tiener leer je hoe je een band opbouwt die niet afhankelijk is van je officiele rol.*
    `,
  },
  'vader-kind-weekendvader': {
    title: 'Elke Zondag Hetzelfde Afscheid',
    description: 'Weekendvader. Twee dagen per week. De uitdaging om in beperkte tijd een echte band te bouwen.',
    date: '2026-01-03',
    readTime: 3,
    category: 'Verbinding',
    content: `
## De koffer

Klein. Roze. Met een eenhoorn erop. Twee dagen. Dat is wat ik heb.

## De compensatiereflex

Speeltuin, bioscoop, ijsje, zwemmen. Een weekend als een vakantiefolder.

Op een zondagavond zei ze: "Papa, volgende keer wil ik gewoon thuisblijven."

## Gewoon thuisblijven

De zaterdag erna deden we niks. Het was de beste zaterdag in maanden.

Kinderen willen geen entertainment. Ze willen nabijheid. Twee dagen echte aanwezigheid is meer waard dan zeven dagen half.

---

*In de cursus Verbinding met je Tiener ontdek je hoe je echte verbindingsmomenten creert - ook met beperkte tijd.*
    `,
  },
};
