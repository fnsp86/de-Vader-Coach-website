import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Privacyverklaring van De Vadercoach. Hoe wij omgaan met je gegevens conform de AVG/GDPR.',
  alternates: {
    canonical: 'https://devadercoach.nl/privacy',
  },
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
          verzamelen, waarom, op welke grondslag, en hoe wij daarmee omgaan.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>1. Verantwoordelijke</h2>
        <p>De Vadercoach is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>E-mail: <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a></li>
          <li>Website: devadercoach.nl</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>2. Welke gegevens verzamelen wij?</h2>
        <p>Wij verzamelen uitsluitend de gegevens die nodig zijn om onze producten en diensten te leveren:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>E-mailadres</strong> &ndash; bij het downloaden van de gratis snelgids, bij een aankoop, of bij contact via het contactformulier.</li>
          <li><strong style={{ color: 'var(--text)' }}>Betaalgegevens</strong> &ndash; worden verwerkt door onze betaalprovider Mollie B.V. Wij slaan zelf geen betaalgegevens op zoals creditcardnummers of bankrekeningnummers.</li>
          <li><strong style={{ color: 'var(--text)' }}>Kortingscode en gebruiksstatus</strong> &ndash; bij aanmelding voor de nieuwsbrief kun je een persoonlijke kortingscode ontvangen. Wij bewaren welke code aan je is gekoppeld en of deze is gebruikt.</li>
          <li><strong style={{ color: 'var(--text)' }}>Nieuwsbriefstatus</strong> &ndash; wij houden bij in welke fase van de automatische mailreeks je zit en of je bent uitgeschreven.</li>
          <li><strong style={{ color: 'var(--text)' }}>Geanonimiseerde gebruiksgegevens</strong> &ndash; paginabezoeken op de website worden anoniem bijgehouden voor statistische doeleinden. Deze gegevens zijn niet herleidbaar tot een persoon.</li>
        </ul>
        <p>
          Wij verzamelen <strong style={{ color: 'var(--text)' }}>geen</strong> namen, adressen, telefoonnummers
          of andere persoonsgegevens buiten het bovenstaande, tenzij je deze zelf verstrekt via het contactformulier.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>3. Grondslagen voor verwerking</h2>
        <p>Wij verwerken persoonsgegevens op basis van de volgende wettelijke grondslagen (AVG artikel 6):</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Uitvoering van een overeenkomst</strong> (art. 6 lid 1 sub b) &ndash; voor het leveren van gekochte digitale producten en het verwerken van betalingen.</li>
          <li><strong style={{ color: 'var(--text)' }}>Toestemming</strong> (art. 6 lid 1 sub a) &ndash; voor het versturen van de nieuwsbrief, automatische mailreeks en marketingcommunicatie. Je kunt je toestemming op elk moment intrekken via de uitschrijflink.</li>
          <li><strong style={{ color: 'var(--text)' }}>Gerechtvaardigd belang</strong> (art. 6 lid 1 sub f) &ndash; voor het verbeteren van onze website op basis van geanonimiseerde statistieken en het voorkomen van fraude.</li>
          <li><strong style={{ color: 'var(--text)' }}>Wettelijke verplichting</strong> (art. 6 lid 1 sub c) &ndash; voor het bewaren van factuurgegevens conform de fiscale bewaarplicht.</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>4. Waarvoor gebruiken wij je gegevens?</h2>
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

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>5. Nieuwsbrief en e-mailcommunicatie</h2>
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

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>6. Affiliate links en aanbevelingen</h2>
        <p>
          Onze website bevat aanbevelingen voor externe producten (boeken, tools) via affiliate links.
          Wanneer je via zo&apos;n link een aankoop doet, ontvangen wij een kleine commissie van de
          verkoper (bijv. bol.com). Dit brengt geen extra kosten voor jou mee.
        </p>
        <p>
          Wij plaatsen zelf geen tracking cookies voor affiliate doeleinden. De externe webshop kan wel
          eigen cookies plaatsen wanneer je hun website bezoekt. Hiervoor geldt het privacybeleid van de
          betreffende webshop.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>7. Derde partijen en verwerkers</h2>
        <p>Wij maken gebruik van de volgende externe dienstverleners (verwerkers):</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Mollie B.V.</strong> (Nederland) &ndash; verwerking van betalingen. Mollie verwerkt je betaalgegevens conform hun eigen privacybeleid en is gecertificeerd als PCI DSS Level 1 Service Provider.</li>
          <li><strong style={{ color: 'var(--text)' }}>Resend</strong> (VS) &ndash; verzending van e-mails (nieuwsbrieven, welkomstmails, automatische reeks). Resend verwerkt je e-mailadres uitsluitend voor het afleveren van onze berichten.</li>
          <li><strong style={{ color: 'var(--text)' }}>Vercel Inc.</strong> (VS) &ndash; hosting van onze website. Vercel verwerkt verkeersgegevens voor het serveren van pagina&apos;s.</li>
          <li><strong style={{ color: 'var(--text)' }}>Upstash</strong> (EU) &ndash; opslag van e-mailadressen, nieuwsbriefstatus en kortingscodes via een versleutelde Redis-database.</li>
        </ul>
        <p>
          Voor verwerkers buiten de EU (Resend, Vercel) is de doorgifte gebaseerd op de Standard Contractual
          Clauses (SCC&apos;s) van de Europese Commissie, of op een adequaatheidsbesluit. Wij sluiten met alle
          verwerkers, waar van toepassing, verwerkersovereenkomsten af. Wij verkopen of delen je persoonsgegevens
          niet met derden voor hun eigen doeleinden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>8. Cookies</h2>
        <p>Onze website maakt onderscheid tussen de volgende soorten cookies:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Strikt noodzakelijke cookies</strong> &ndash; voor het correct functioneren van de website (bijv. themavoorkeur, sessie). Deze vereisen geen toestemming.</li>
          <li><strong style={{ color: 'var(--text)' }}>Analytische cookies</strong> &ndash; geanonimiseerde websitestatistieken. Deze zijn niet herleidbaar tot een persoon.</li>
        </ul>
        <p>
          Wij gebruiken <strong style={{ color: 'var(--text)' }}>geen</strong> tracking cookies, advertentiecookies
          of cookies van derden voor advertentiedoeleinden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>9. Bewaartermijnen</h2>
        <p>Wij hanteren de volgende bewaartermijnen:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Nieuwsbriefgegevens</strong> &ndash; tot je je uitschrijft. Na uitschrijving wordt je e-mailadres binnen 30 dagen uit onze systemen verwijderd.</li>
          <li><strong style={{ color: 'var(--text)' }}>Aankoopgegevens</strong> &ndash; zolang nodig voor het leveren van toegang tot gekochte producten, met een minimum van 7 jaar voor factuurgegevens (fiscale bewaarplicht).</li>
          <li><strong style={{ color: 'var(--text)' }}>Kortingscodes</strong> &ndash; maximaal 1 jaar na verloopdatum.</li>
          <li><strong style={{ color: 'var(--text)' }}>Contactformulierberichten</strong> &ndash; maximaal 1 jaar na afhandeling.</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>10. Beveiliging</h2>
        <p>
          Wij nemen passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen
          tegen ongeautoriseerde toegang, verlies of misbruik:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Alle communicatie verloopt via versleutelde verbindingen (HTTPS/TLS).</li>
          <li>Gegevens worden opgeslagen bij gecertificeerde dienstverleners met ISO 27001 of vergelijkbare certificering.</li>
          <li>Toegang tot persoonsgegevens is beperkt tot geautoriseerde personen.</li>
          <li>Wij slaan geen wachtwoorden of betaalgegevens op in onze eigen systemen.</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>11. Minderjarigen</h2>
        <p>
          Onze producten en diensten zijn gericht op volwassenen (ouders/vaders). Wij verzamelen niet
          bewust persoonsgegevens van personen jonger dan 16 jaar. Als je vermoedt dat wij gegevens van
          een minderjarige hebben verzameld, neem dan contact met ons op zodat wij deze kunnen verwijderen.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>12. Je rechten</h2>
        <p>Op grond van de AVG heb je de volgende rechten:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Recht op inzage</strong> (art. 15) &ndash; je mag opvragen welke gegevens wij van je hebben.</li>
          <li><strong style={{ color: 'var(--text)' }}>Recht op rectificatie</strong> (art. 16) &ndash; je mag onjuiste gegevens laten aanpassen.</li>
          <li><strong style={{ color: 'var(--text)' }}>Recht op verwijdering</strong> (art. 17) &ndash; je mag vragen om verwijdering van je gegevens (&quot;recht op vergetelheid&quot;).</li>
          <li><strong style={{ color: 'var(--text)' }}>Recht op beperking</strong> (art. 18) &ndash; je mag vragen om beperking van de verwerking.</li>
          <li><strong style={{ color: 'var(--text)' }}>Recht op bezwaar</strong> (art. 21) &ndash; je mag bezwaar maken tegen de verwerking op basis van gerechtvaardigd belang.</li>
          <li><strong style={{ color: 'var(--text)' }}>Recht op overdraagbaarheid</strong> (art. 20) &ndash; je mag vragen om je gegevens in een gangbaar, machineleesbaar formaat te ontvangen.</li>
          <li><strong style={{ color: 'var(--text)' }}>Recht om toestemming in te trekken</strong> (art. 7) &ndash; je kunt je toestemming voor de nieuwsbrief op elk moment intrekken via de uitschrijflink.</li>
        </ul>
        <p>
          Je kunt deze rechten uitoefenen door een e-mail te sturen naar{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
          Wij reageren binnen 30 dagen op je verzoek. Wij kunnen je vragen om je identiteit te verifieren
          voordat wij je verzoek in behandeling nemen.
        </p>
        <p>
          Je hebt ook het recht om een klacht in te dienen bij de{' '}
          <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
            Autoriteit Persoonsgegevens
          </a>{' '}
          (autoriteitpersoonsgegevens.nl).
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>13. Wijzigingen</h2>
        <p>
          Wij behouden het recht om deze privacyverklaring te wijzigen. De meest actuele versie is altijd
          beschikbaar op deze pagina met de bijbehorende datum. Bij wezenlijke wijzigingen informeren wij je
          via e-mail of een melding op de website.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>14. Contact</h2>
        <p>
          Vragen over dit privacybeleid? Neem contact op via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
        </p>
      </div>
    </div>
  );
}
