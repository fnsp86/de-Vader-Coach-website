import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Privacyverklaring van De Vadercoach. Hoe wij omgaan met je gegevens.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
        Privacyverklaring
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text3)' }}>Laatst bijgewerkt: 28 februari 2026</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
        <p>
          De Vadercoach (&quot;wij&quot;, &quot;ons&quot;, &quot;onze&quot;) respecteert jouw privacy en verwerkt
          persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR)
          en de Nederlandse Uitvoeringswet AVG. In deze verklaring leggen wij uit welke gegevens wij
          verzamelen, waarom, en hoe wij daarmee omgaan.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>1. Verantwoordelijke</h2>
        <p>
          De Vadercoach is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven
          in deze privacyverklaring. Voor vragen over privacy kun je contact opnemen via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>2. Welke gegevens verzamelen wij?</h2>
        <p>Wij verzamelen uitsluitend de gegevens die nodig zijn om onze producten en diensten te leveren:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>E-mailadres</strong> - bij het downloaden van de gratis snelgids of bij een aankoop.</li>
          <li><strong style={{ color: 'var(--text)' }}>Betaalgegevens</strong> - worden verwerkt door onze betaalprovider Mollie B.V. Wij slaan zelf geen betaalgegevens op zoals creditcardnummers of bankrekeningnummers.</li>
          <li><strong style={{ color: 'var(--text)' }}>Kortingscode en gebruiksstatus</strong> - bij aanmelding voor de nieuwsbrief kun je een persoonlijke kortingscode ontvangen. Wij bewaren welke code aan je is gekoppeld en of deze is gebruikt.</li>
          <li><strong style={{ color: 'var(--text)' }}>Nieuwsbriefstatus</strong> - wij houden bij in welke fase van de automatische mailreeks je zit en of je bent uitgeschreven.</li>
          <li><strong style={{ color: 'var(--text)' }}>Geanonimiseerde gebruiksgegevens</strong> - paginabezoeken op de website worden anoniem bijgehouden voor statistische doeleinden. Deze gegevens zijn niet herleidbaar tot een persoon.</li>
        </ul>
        <p>
          Wij verzamelen <strong style={{ color: 'var(--text)' }}>geen</strong> namen, adressen, telefoonnummers
          of andere persoonsgegevens buiten het bovenstaande.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>3. Waarvoor gebruiken wij je gegevens?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Het leveren van gekochte producten (PDF-cursussen, Vader Experience) via downloadlinks.</li>
          <li>Het versturen van de gratis snelgids na aanmelding.</li>
          <li>Het versturen van een welkomstmail met een persoonlijke kortingscode.</li>
          <li>Het versturen van een automatische mailreeks met tips over vaderschap (4 mails over 21 dagen).</li>
          <li>Het versturen van een maandelijkse nieuwsbrief met inspiratie en tips.</li>
          <li>Het verwerken van betalingen via Mollie.</li>
          <li>Het toepassen en valideren van kortingscodes bij aankopen.</li>
          <li>Het verbeteren van onze website en producten op basis van geanonimiseerde statistieken.</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>4. Nieuwsbrief en e-mailcommunicatie</h2>
        <p>
          Bij het downloaden van de gratis snelgids word je aangemeld voor onze nieuwsbrief. Dit wordt
          duidelijk vermeld bij het invullen van je e-mailadres. Je ontvangt vervolgens:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Een welkomstmail met de snelgids en een persoonlijke kortingscode.</li>
          <li>Een reeks van 4 automatische e-mails met tips over vaderschap, verspreid over 21 dagen.</li>
          <li>Daarna een maandelijkse nieuwsbrief met inspiratie, tips en af en toe een aanbieding.</li>
        </ul>
        <p>
          Elke e-mail bevat een uitschrijflink waarmee je je direct en permanent kunt afmelden. Na uitschrijving
          ontvang je geen verdere e-mails van ons. Wij delen je e-mailadres nooit met derden voor commerciele
          doeleinden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>5. Derde partijen</h2>
        <p>Wij maken gebruik van de volgende externe dienstverleners:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Mollie B.V.</strong> - voor het verwerken van betalingen. Mollie verwerkt je betaalgegevens conform hun eigen privacybeleid.</li>
          <li><strong style={{ color: 'var(--text)' }}>Resend</strong> - voor het versturen van e-mails (nieuwsbrieven, welkomstmails, automatische reeks). Resend verwerkt je e-mailadres uitsluitend voor het afleveren van onze berichten.</li>
          <li><strong style={{ color: 'var(--text)' }}>Vercel</strong> - voor het hosten van onze website.</li>
          <li><strong style={{ color: 'var(--text)' }}>Upstash (Redis)</strong> - voor het opslaan van e-mailadressen, nieuwsbriefstatus en kortingscodes. Data wordt versleuteld opgeslagen.</li>
        </ul>
        <p>
          Wij sluiten met deze partijen, waar van toepassing, verwerkersovereenkomsten af. Wij verkopen
          of delen je persoonsgegevens niet met derden voor hun eigen doeleinden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>6. Cookies</h2>
        <p>
          Onze website maakt gebruik van functionele cookies die nodig zijn voor het correct functioneren
          van de website. Wij gebruiken geen tracking cookies of cookies van derden voor advertentiedoeleinden.
          Geanonimiseerde websitestatistieken worden verzameld zonder gebruik van cookies.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>7. Bewaartermijn</h2>
        <p>
          Wij bewaren je gegevens zolang je bent aangemeld voor onze nieuwsbrief of zolang dit nodig is
          voor het leveren van gekochte producten. Bij uitschrijving van de nieuwsbrief wordt je e-mailadres
          binnen 30 dagen uit onze systemen verwijderd. Gegevens die wij wettelijk verplicht zijn te bewaren
          (zoals factuurgegevens) worden bewaard conform de wettelijke bewaartermijn.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>8. Beveiliging</h2>
        <p>
          Wij nemen passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen
          tegen ongeautoriseerde toegang, verlies of misbruik. Alle gegevens worden versleuteld verzonden
          (HTTPS) en opgeslagen bij gecertificeerde dienstverleners.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>9. Je rechten</h2>
        <p>Op grond van de AVG heb je de volgende rechten:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Inzage</strong> - je mag opvragen welke gegevens wij van je hebben.</li>
          <li><strong style={{ color: 'var(--text)' }}>Correctie</strong> - je mag onjuiste gegevens laten aanpassen.</li>
          <li><strong style={{ color: 'var(--text)' }}>Verwijdering</strong> - je mag vragen om verwijdering van je gegevens.</li>
          <li><strong style={{ color: 'var(--text)' }}>Bezwaar</strong> - je mag bezwaar maken tegen de verwerking van je gegevens.</li>
          <li><strong style={{ color: 'var(--text)' }}>Overdraagbaarheid</strong> - je mag vragen om je gegevens in een gangbaar formaat te ontvangen.</li>
        </ul>
        <p>
          Je kunt deze rechten uitoefenen door een e-mail te sturen naar{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
          Wij reageren binnen 30 dagen op je verzoek. Je hebt ook het recht om een klacht in te dienen bij de
          Autoriteit Persoonsgegevens.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>10. Wijzigingen</h2>
        <p>
          Wij behouden het recht om deze privacyverklaring te wijzigen. De meest actuele versie is altijd
          beschikbaar op deze pagina. Bij wezenlijke wijzigingen informeren wij je via e-mail of een melding
          op de website.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>11. Contact</h2>
        <p>
          Vragen over dit privacybeleid? Neem contact op via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
        </p>
      </div>
    </div>
  );
}
