export interface DripEmail {
  step: number;
  delayDays: number;
  subject: string;
  generateHtml: (context: { discountCode: string; expiresAt: string; unsubscribeUrl: string }) => string;
}

const btn = (text: string, href: string) =>
  `<a href="${href}" style="display:inline-block;padding:14px 28px;background-color:#F59E0B;color:#000;font-weight:700;font-size:14px;text-decoration:none;border-radius:12px;margin-top:16px;">${text}</a>`;

export const DRIP_SEQUENCE: DripEmail[] = [
  // ── Step 1: Dag 3 ── Beste tip
  {
    step: 1,
    delayDays: 3,
    subject: 'De krachtigste tip die ik ken als vader',
    generateHtml: () => `
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Hoi,
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Er is één ding dat ik elke vader zou willen vertellen. Het klinkt simpel, maar het veranderde alles voor mij:
      </p>
      <p style="margin:0 0 16px;font-size:17px;color:#F0F2F8;font-weight:700;line-height:1.6;">
        &ldquo;De eerste twee minuten als je thuiskomt bepalen de rest van de avond.&rdquo;
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Telefoon weg. Oogcontact. Knuffel. Twee minuten volledige aandacht voor je kind. Meer niet.
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Die twee minuten zijn krachtiger dan een heel weekend vol activiteiten. Want je kind onthoudt niet <em>wat</em> je deed, het onthoudt hoe het zich <em>voelde</em> als jij erbij was.
      </p>
      <p style="margin:0 0 8px;font-size:15px;color:#ccc;line-height:1.7;">
        Wil je het hele verhaal lezen? In dit artikel leg ik uit waarom die twee minuten zoveel impact hebben en hoe je ze kunt inzetten.
      </p>
      ${btn('Lees het artikel', 'https://devadercoach.nl/blog/aanwezig-zijn-voor-kind')}
      <p style="margin:24px 0 0;font-size:13px;color:#888;">
        Groet,<br>De Vadercoach
      </p>
    `,
  },

  // ── Step 2: Dag 7 ── Experience introductie
  {
    step: 2,
    delayDays: 7,
    subject: '22 dagen die je vaderschap veranderen',
    generateHtml: () => `
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Hoi,
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Een boek lezen over vaderschap is mooi. Maar het echte verschil zit in <strong style="color:#F0F2F8">doen</strong>. Daarom heb ik de <strong style="color:#F59E0B">Vader Experience</strong> gemaakt.
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        22 dagen. Elke dag 5 tot 10 minuten. Een herkenbaar scenario, een concrete oefening, en een reflectievraag. Zo bouw je stap voor stap 8 vaardigheden op die je vaderschap veranderen.
      </p>
      <div style="background-color:#111;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #2A2A2A;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:1px;">Dag 1 - De deur gaat open</p>
        <p style="margin:0 0 12px;font-size:14px;color:#F0F2F8;font-weight:600;">Je komt thuis na een lange dag. De deur gaat open. Wat doe je?</p>
        <p style="margin:0;font-size:13px;color:#888;">
          De meeste vaders pakken hun telefoon. Of roepen &ldquo;hoi&rdquo; terwijl ze hun jas uittrekken. Vandaag ga je iets anders proberen...
        </p>
      </div>
      <p style="margin:0 0 8px;font-size:15px;color:#ccc;line-height:1.7;">
        Benieuwd? Bekijk wat de Experience precies inhoudt.
      </p>
      ${btn('Bekijk de Experience', 'https://devadercoach.nl/experience')}
      <p style="margin:24px 0 0;font-size:13px;color:#888;">
        Groet,<br>De Vadercoach
      </p>
    `,
  },

  // ── Step 3: Dag 14 ── Korting herinnering + cursus
  {
    step: 3,
    delayDays: 14,
    subject: 'Jouw kortingscode verloopt bijna',
    generateHtml: ({ discountCode }) => `
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Hoi,
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Even een herinnering: je welkomstkorting van <strong style="color:#F59E0B">15%</strong> verloopt binnenkort. Gebruik je code voor het te laat is:
      </p>
      ${discountCode ? `
      <div style="text-align:center;margin:20px 0;">
        <span style="display:inline-block;padding:12px 24px;background-color:#F59E0B15;border:2px dashed #F59E0B;border-radius:12px;font-size:20px;font-weight:800;color:#F59E0B;letter-spacing:2px;">${discountCode}</span>
      </div>
      ` : ''}
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Als ik één cursus zou aanraden om mee te beginnen, is het <strong style="color:#F0F2F8">Emotiecoaching voor Vaders</strong>. Je leert:
      </p>
      <ul style="margin:0 0 16px;padding-left:20px;color:#ccc;font-size:14px;line-height:2;">
        <li>Hoe je emoties benoemt zonder te minimaliseren</li>
        <li>Waarom &ldquo;het is niet erg&rdquo; niet werkt (en wat wél)</li>
        <li>Concrete scripts voor boze, verdrietige en angstige kinderen</li>
      </ul>
      ${btn('Bekijk de cursus', 'https://devadercoach.nl/cursussen/emotiecoaching-voor-vaders')}
      <p style="margin:24px 0 0;font-size:13px;color:#888;">
        Groet,<br>De Vadercoach
      </p>
    `,
  },

  // ── Step 4: Dag 21 ── Persoonlijk bericht
  {
    step: 4,
    delayDays: 21,
    subject: 'Bedankt dat je er bent',
    generateHtml: () => `
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Hoi,
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Dit is de laatste mail in deze reeks en ik wil hem persoonlijk houden.
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Ik heb De Vadercoach gebouwd omdat ik geloof dat elke vader het verschil kan maken. Niet door perfect te zijn. Maar door eerlijk te zijn. Door het te proberen. Door op te staan na een slechte dag en het morgen opnieuw te doen.
      </p>
      <div style="background-color:#111;border-radius:12px;padding:20px;margin:20px 0;border-left:3px solid #F59E0B;">
        <p style="margin:0;font-size:16px;color:#F0F2F8;font-weight:600;font-style:italic;line-height:1.6;">
          &ldquo;De vader die je wilt zijn zit al in je. Hij heeft alleen oefening nodig.&rdquo;
        </p>
      </div>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Je ontvangt voortaan af en toe een maandelijkse mail met tips en inspiratie. Geen spam, beloofd.
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
        Wil je tussendoor ook inspiratie? Volg ons op Instagram, daar delen we dagelijks korte tips.
      </p>
      ${btn('Volg op Instagram', 'https://instagram.com/devadercoach.nl')}
      <p style="margin:24px 0 0;font-size:13px;color:#888;">
        Warme groet,<br>De Vadercoach
      </p>
    `,
  },
];
