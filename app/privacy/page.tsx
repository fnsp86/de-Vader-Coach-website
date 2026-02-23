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
      <p className="text-sm mb-8" style={{ color: 'var(--text3)' }}>Laatst bijgewerkt: 23 februari 2026</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
        <p>
          De Vadercoach (&quot;wij&quot;, &quot;ons&quot;, &quot;onze&quot;) respecteert jouw privacy en verwerkt
          persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR)
          en de Nederlandse Uitvoeringswet AVG.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>1. Verantwoordelijke</h2>
        <p>De Vadercoach is verantwoordelijk voor de verwerking van persoonsgegevens. E-mail: privacy@devadercoach.nl</p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>2. Welke gegevens verzamelen wij?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>E-mailadres (bij registratie en aankoop)</li>
          <li>Naam (bij registratie)</li>
          <li>Betaalgegevens (verwerkt door Mollie, niet door ons opgeslagen)</li>
          <li>Gebruiksgegevens van de app en website (geanonimiseerd)</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>3. Waarvoor gebruiken wij je gegevens?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Het leveren van gekochte cursussen (PDF download links)</li>
          <li>Het bijhouden van je account en voortgang in de app</li>
          <li>Het versturen van nieuwsbrieven en updates (met uitschrijfmogelijkheid)</li>
          <li>Het verbeteren van onze diensten</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>4. Nieuwsbrieven en commerciële berichten</h2>
        <p>
          Bij het aanmaken van een account of een aankoop stem je in met het ontvangen van nieuwsbrieven,
          updates en aanbiedingen van De Vadercoach (soft opt-in op basis van de Telecommunicatiewet).
          Elke e-mail bevat een uitschrijflink. Wij delen je gegevens nooit met derden voor commerciële doeleinden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>5. Bewaartermijn</h2>
        <p>
          Wij bewaren je gegevens zolang je account actief is. Bij verwijdering van je account worden
          alle persoonlijke gegevens binnen 30 dagen gewist.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>6. Je rechten</h2>
        <p>Je hebt recht op inzage, correctie en verwijdering van je gegevens. Neem contact op via privacy@devadercoach.nl.</p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>7. Contact</h2>
        <p>
          Vragen over dit privacybeleid? Neem contact op via{' '}
          <a href="mailto:privacy@devadercoach.nl" className="text-amber-400 hover:underline">privacy@devadercoach.nl</a>.
        </p>
      </div>
    </div>
  );
}
