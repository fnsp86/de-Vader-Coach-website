import { getAllBlogPosts } from './blog-posts';
import { getAllCourses } from './courses';
import { EXPERIENCE_DAYS } from './experience';
import { getRedis, getSubscribers, sendEmail, wrapInEmailTemplate, getUnsubscribeUrl, logAutomation } from './newsletter';

// ── Quotes pool (subset from DailyQuote) ─────────────

const QUOTES = [
  'Je kind onthoudt niet wat je zei. Het onthoudt hoe het zich voelde als jij erbij was.',
  'De beste vaders zijn niet degenen die nooit fouten maken. Het zijn degenen die het herstellen.',
  'Kalm blijven is geen zwakte. Het is de moeilijkste vorm van kracht die een vader kan tonen.',
  'Een grens stellen met liefde is een cadeautje voor later.',
  'Je hoeft je kind niet te repareren. Soms is er zijn al genoeg.',
  'Loslaten is niet opgeven. Het is vertrouwen dat je kind meer kan dan je denkt.',
  'De mooiste gesprekken met je tiener beginnen als jij stopt met praten.',
  'Vijf minuten echt aandacht is meer waard dan een uur op de bank met je telefoon.',
  'De moed om sorry te zeggen tegen je kind is de grootste les die je kunt geven.',
  'Verbinding is geen activiteit. Het is een houding.',
  'De vader die je wilt zijn zit al in je. Hij heeft alleen oefening nodig.',
  'Jezelf begrijpen is de eerste stap naar je kind begrijpen.',
];

// ── Content rotation ─────────────────────────────────

type ContentBlock =
  | { type: 'blog'; title: string; description: string; url: string }
  | { type: 'experience'; dayNum: number; title: string; subtitle: string }
  | { type: 'course'; title: string; description: string; url: string };

function getContentPool(): ContentBlock[] {
  const pool: ContentBlock[] = [];

  for (const post of getAllBlogPosts()) {
    pool.push({
      type: 'blog',
      title: post.title,
      description: post.description,
      url: `https://devadercoach.nl/blog/${post.slug}`,
    });
  }

  for (const day of EXPERIENCE_DAYS) {
    pool.push({
      type: 'experience',
      dayNum: day.dag,
      title: day.title,
      subtitle: day.subtitle,
    });
  }

  for (const { slug, title, description } of getAllCourses()) {
    pool.push({
      type: 'course',
      title,
      description,
      url: `https://devadercoach.nl/cursussen/${slug}`,
    });
  }

  return pool;
}

// ── HTML generation ──────────────────────────────────

function generateMonthlyNewsletter(contentIndex: number): { subject: string; html: string } {
  const quote = QUOTES[contentIndex % QUOTES.length];
  const pool = getContentPool();
  const item = pool[contentIndex % pool.length];

  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  const now = new Date();
  const monthName = months[now.getMonth()];

  const subject = `Vadercoach ${monthName}: je maandelijkse inspiratie`;

  let contentHtml = '';

  if (item.type === 'blog') {
    contentHtml = `
      <div style="background-color:#111;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #2A2A2A;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:1px;">Artikel</p>
        <p style="margin:0 0 8px;font-size:16px;color:#F0F2F8;font-weight:600;">${item.title}</p>
        <p style="margin:0 0 12px;font-size:14px;color:#999;line-height:1.6;">${item.description}</p>
        <a href="${item.url}" style="display:inline-block;padding:10px 20px;background-color:#F59E0B;color:#000;font-weight:700;font-size:13px;text-decoration:none;border-radius:10px;">Lees het artikel</a>
      </div>`;
  } else if (item.type === 'experience') {
    contentHtml = `
      <div style="background-color:#111;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #2A2A2A;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:1px;">Vader Experience — Dag ${item.dayNum}</p>
        <p style="margin:0 0 8px;font-size:16px;color:#F0F2F8;font-weight:600;">${item.title}</p>
        <p style="margin:0 0 12px;font-size:14px;color:#999;line-height:1.6;">${item.subtitle}</p>
        <a href="https://devadercoach.nl/experience" style="display:inline-block;padding:10px 20px;background-color:#F59E0B;color:#000;font-weight:700;font-size:13px;text-decoration:none;border-radius:10px;">Bekijk de Experience</a>
      </div>`;
  } else {
    contentHtml = `
      <div style="background-color:#111;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #2A2A2A;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:1px;">Cursus</p>
        <p style="margin:0 0 8px;font-size:16px;color:#F0F2F8;font-weight:600;">${item.title}</p>
        <p style="margin:0 0 12px;font-size:14px;color:#999;line-height:1.6;">${item.description}</p>
        <a href="${item.url}" style="display:inline-block;padding:10px 20px;background-color:#F59E0B;color:#000;font-weight:700;font-size:13px;text-decoration:none;border-radius:10px;">Bekijk de cursus</a>
      </div>`;
  }

  const html = `
    <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
      Hoi,
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
      Hier is je maandelijkse portie vaderinspiratie. Eén quote, één tip — meer heb je niet nodig.
    </p>
    <div style="background-color:#111;border-radius:12px;padding:20px;margin:20px 0;border-left:3px solid #F59E0B;">
      <p style="margin:0;font-size:16px;color:#F0F2F8;font-weight:600;font-style:italic;line-height:1.6;">
        &ldquo;${quote}&rdquo;
      </p>
    </div>
    ${contentHtml}
    <p style="margin:20px 0 0;font-size:15px;color:#ccc;line-height:1.7;">
      Blijf oefenen. Elke dag een klein beetje beter.
    </p>
    <p style="margin:16px 0 0;font-size:13px;color:#888;">
      Groet,<br>De Vadercoach
    </p>
  `;

  return { subject, html };
}

// ── Send to all subscribers ──────────────────────────

export async function processMonthlyNewsletter(): Promise<{ sent: number; failed: number; skipped: boolean }> {
  const r = getRedis();
  if (!r) return { sent: 0, failed: 0, skipped: true };

  // Check if already sent this month
  const lastSent = await r.get('nl:monthly:lastSent');
  if (lastSent) {
    const lastDate = new Date(lastSent);
    const now = new Date();
    if (lastDate.getMonth() === now.getMonth() && lastDate.getFullYear() === now.getFullYear()) {
      return { sent: 0, failed: 0, skipped: true };
    }
  }

  // Get and increment content index (rotates through all content)
  const rawIndex = await r.get('nl:monthly:contentIndex');
  const contentIndex = rawIndex ? parseInt(rawIndex, 10) : 0;
  await r.set('nl:monthly:contentIndex', String(contentIndex + 1));

  const { subject, html } = generateMonthlyNewsletter(contentIndex);

  const subscribers = await getSubscribers();
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < subscribers.length; i += 10) {
    const batch = subscribers.slice(i, i + 10);
    const promises = batch.map(async (sub) => {
      try {
        const unsubUrl = sub.unsubToken ? getUnsubscribeUrl(sub.unsubToken) : '';
        const fullHtml = wrapInEmailTemplate(html, 'Je maandelijkse dosis vaderinspiratie', unsubUrl);
        await sendEmail(sub.email, subject, fullHtml, unsubUrl);
        sent++;
      } catch {
        failed++;
      }
    });
    await Promise.all(promises);
  }

  await r.set('nl:monthly:lastSent', new Date().toISOString());

  await logAutomation({
    type: 'monthly',
    subject: `${subject} (${sent} verzonden)`,
    sentAt: new Date().toISOString(),
    success: failed === 0,
    error: failed > 0 ? `${failed} mislukt` : undefined,
  });

  return { sent, failed, skipped: false };
}
