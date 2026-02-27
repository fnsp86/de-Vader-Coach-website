export interface Testimonial {
  name: string;
  role: string;
  text: string;
  skill: string;
  color: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mark',
    role: 'Vader van 2 zoons (6 en 9)',
    text: 'Na het lezen van de cursus Zelfregulatie merk ik dat ik minder snel ontplof. Mijn vrouw zag het verschil al na een week.',
    skill: 'Zelfregulatie',
    color: '#34D399',
  },
  {
    name: 'Thomas',
    role: 'Vader van een dochter (4)',
    text: 'Die snelgids was een eye-opener. Ik wist niet dat er zoveel wetenschap bestond over vaderschap. Nu doe ik de Experience.',
    skill: 'Aanwezigheid',
    color: '#667eea',
  },
  {
    name: 'Jeroen',
    role: 'Vader van 3 kinderen',
    text: 'De Experience heeft me geleerd om na een fout niet in schuldgevoel te blijven hangen, maar het gewoon te herstellen. Mijn kinderen reageren daar heel goed op.',
    skill: 'Herstel',
    color: '#FB923C',
  },
  {
    name: 'Dennis',
    role: 'Vader van een tiener (14)',
    text: 'Ik dacht dat de verbinding met mijn zoon voorbij was. De cursus Verbinding gaf me concrete tools. We praten nu weer.',
    skill: 'Verbinding',
    color: '#60A5FA',
  },
  {
    name: 'Robert',
    role: 'Vader van tweeling (7)',
    text: 'Eindelijk iets dat specifiek voor vaders is. Geen oordeel, geen vingerwijzen. Gewoon eerlijke tips die werken.',
    skill: 'Grenzen',
    color: '#FBBF24',
  },
];

export const FAQ_CURSUSSEN = [
  {
    q: 'In welk formaat zijn de cursussen?',
    a: 'Alle cursussen zijn professioneel vormgegeven PDF-bestanden die je kunt lezen op je telefoon, tablet of computer. Je kunt ze ook printen.',
  },
  {
    q: 'Hoe ontvang ik de cursus na betaling?',
    a: 'Direct na betaling ontvang je een downloadlink per e-mail. De PDF is meteen beschikbaar — je kunt direct beginnen.',
  },
  {
    q: 'Kan ik de cursus delen met mijn partner?',
    a: 'De cursus is bedoeld voor persoonlijk gebruik. Je mag de inhoud uiteraard bespreken met je partner — dat moedigen we zelfs aan.',
  },
  {
    q: 'Wat als ik niet tevreden ben?',
    a: 'We bieden een 30 dagen niet-goed-geld-terug garantie. Geen vragen, geen gedoe. Mail naar info@devadercoach.nl.',
  },
  {
    q: 'Moet ik alle cursussen doen?',
    a: 'Nee, elke cursus staat op zichzelf. Begin met de vaardigheid waar jij het meeste moeite mee hebt. De snelgids helpt je kiezen.',
  },
  {
    q: 'Is dit wetenschappelijk onderbouwd?',
    a: 'Ja. Elke cursus is gebaseerd op bewezen methoden uit de hechtingstheorie (Bowlby), emotiecoaching (Gottman), zelfdeterminatietheorie (Deci & Ryan) en reflectief functioneren (Fonagy).',
  },
];

export const FAQ_EXPERIENCE = [
  {
    q: 'Hoe werkt de Experience precies?',
    a: '22 dagen lang krijg je elke dag een herkenbaar vader-scenario, een concrete actie om te oefenen, en een reflectievraag. Elke dag duurt 5-10 minuten.',
  },
  {
    q: 'Kan ik pauzeren en later verder gaan?',
    a: 'Ja, je gaat in je eigen tempo. Er is geen deadline. Je kunt de Experience spreiden over weken of maanden als dat beter past.',
  },
  {
    q: 'Hoe lang heb ik toegang?',
    a: 'Levenslang. Na aankoop kun je de Experience zo vaak herhalen als je wilt. Er is geen abonnement.',
  },
  {
    q: 'Is de Experience hetzelfde als de cursussen?',
    a: 'Nee. De Experience is een 22-daagse praktijkroute door alle 8 vaardigheden. De cursussen gaan dieper in op één vaardigheid per stuk. Ze vullen elkaar perfect aan.',
  },
  {
    q: 'Wat als ik niet tevreden ben?',
    a: '30 dagen niet-goed-geld-terug garantie. Geen vragen. Mail naar info@devadercoach.nl.',
  },
];
