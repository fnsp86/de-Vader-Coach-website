import Redis from 'ioredis';
import OpenAI from 'openai';
import { getInstagramToken } from './instagram-token';

// ─── Redis ───────────────────────────────────────────────────────
let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
  return redis;
}

// ─── Types ───────────────────────────────────────────────────────
export interface CommentEntry {
  id: string;
  postId: string;
  username: string;
  text: string;
  timestamp: string;
  replyText?: string;
  replyId?: string;
  repliedAt?: string;
  status: 'pending' | 'approved' | 'replied' | 'skipped';
}

export type AutoReplyMode = 'auto' | 'review' | 'off';

// ─── Settings ────────────────────────────────────────────────────
export async function getAutoReplyMode(): Promise<AutoReplyMode> {
  const r = getRedis();
  if (!r) return 'review';
  const val = await r.get('ig:comment-mode');
  if (val === 'auto' || val === 'review' || val === 'off') return val;
  return 'review'; // default: review before posting
}

export async function setAutoReplyMode(mode: AutoReplyMode): Promise<void> {
  const r = getRedis();
  if (!r) return;
  await r.set('ig:comment-mode', mode);
}

// ─── Comment Storage ─────────────────────────────────────────────
const COMMENTS_KEY = 'ig:comments';
const MAX_COMMENTS = 500;

export async function storeComment(comment: CommentEntry): Promise<void> {
  const r = getRedis();
  if (!r) return;
  // Use sorted set with timestamp as score for ordering
  await r.zadd(COMMENTS_KEY, Date.parse(comment.timestamp), JSON.stringify(comment));
  // Trim old entries
  const count = await r.zcard(COMMENTS_KEY);
  if (count > MAX_COMMENTS) {
    await r.zremrangebyrank(COMMENTS_KEY, 0, count - MAX_COMMENTS - 1);
  }
}

export async function updateComment(commentId: string, updates: Partial<CommentEntry>): Promise<void> {
  const r = getRedis();
  if (!r) return;
  const all = await r.zrange(COMMENTS_KEY, 0, -1, 'WITHSCORES');
  for (let i = 0; i < all.length; i += 2) {
    const entry: CommentEntry = JSON.parse(all[i]);
    if (entry.id === commentId) {
      const score = Number(all[i + 1]);
      const updated = { ...entry, ...updates };
      await r.zrem(COMMENTS_KEY, all[i]);
      await r.zadd(COMMENTS_KEY, score, JSON.stringify(updated));
      return;
    }
  }
}

export async function getComments(limit = 50, status?: CommentEntry['status']): Promise<CommentEntry[]> {
  const r = getRedis();
  if (!r) return [];
  const raw = await r.zrevrange(COMMENTS_KEY, 0, limit * 2 - 1); // fetch extra for filtering
  const comments: CommentEntry[] = raw.map((s) => JSON.parse(s));
  if (status) return comments.filter((c) => c.status === status).slice(0, limit);
  return comments.slice(0, limit);
}

export async function getCommentById(commentId: string): Promise<CommentEntry | null> {
  const r = getRedis();
  if (!r) return null;
  const all = await r.zrange(COMMENTS_KEY, 0, -1);
  for (const raw of all) {
    const entry: CommentEntry = JSON.parse(raw);
    if (entry.id === commentId) return entry;
  }
  return null;
}

// ─── AI Reply Generation ─────────────────────────────────────────
const SYSTEM_PROMPT = `Je bent De Vadercoach (@devadercoach) op Instagram. Je helpt vaders om bewuster op te voeden.

Stijl:
- Warm, persoonlijk en direct
- Kort (max 2-3 zinnen voor een comment-reply)
- Geen emoji's tenzij het echt past (max 1)
- Nooit neerbuigend of belerend
- Erken het gevoel of de ervaring van de persoon
- Moedig aan zonder cliche's
- Als iemand een persoonlijke ervaring deelt, toon empathie
- Als iemand een vraag stelt, geef een kort maar waardevol antwoord
- Verwijs naar de bio/app alleen als het echt relevant is
- Schrijf in het Nederlands
- Geen hashtags in replies
- Begin NIET met "Hoi" of "Hey" - val direct in met inhoud

Voorbeelden van goede replies:
- "Herkenbaar. Dat moment van stilstaan en echt luisteren maakt meer verschil dan je denkt."
- "Wat mooi dat je dit deelt. Het feit dat je hierover nadenkt laat al zien wat voor vader je bent."
- "Goed punt. Geduld is inderdaad geen eigenschap maar iets dat je elke dag opnieuw oefent."
- "Dank je. En onthoud: slechte dagen horen erbij. Het gaat om de richting, niet om perfectie."`;

export async function generateReply(
  commentText: string,
  postCaption?: string,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY niet geconfigureerd');

  const openai = new OpenAI({ apiKey });

  const userMessage = postCaption
    ? `Post caption: "${postCaption.slice(0, 300)}"\n\nComment van @gebruiker: "${commentText}"\n\nSchrijf een reply.`
    : `Comment van @gebruiker: "${commentText}"\n\nSchrijf een reply.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content?.trim() ?? '';
}

// ─── Instagram Graph API ─────────────────────────────────────────

/**
 * Resolve the Instagram Business Account ID.
 * Tries INSTAGRAM_BUSINESS_ACCOUNT_ID env var first,
 * then queries the Facebook Page for its linked IG account.
 */
async function resolveInstagramAccountId(token: string): Promise<string | null> {
  const envId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (envId) return envId;

  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!pageId) return null;

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${pageId}?fields=instagram_business_account&access_token=${encodeURIComponent(token)}`,
  );
  const data = await res.json();
  return data.instagram_business_account?.id || null;
}

export async function fetchRecentComments(): Promise<{ comments: CommentEntry[]; error?: string }> {
  const token = await getInstagramToken();
  if (!token) return { comments: [], error: 'Geen Instagram token geconfigureerd. Ga naar Tokens om er een in te stellen.' };

  const accountId = await resolveInstagramAccountId(token);
  if (!accountId) return { comments: [], error: 'Geen Instagram Business Account ID gevonden. Controleer INSTAGRAM_BUSINESS_ACCOUNT_ID of FACEBOOK_PAGE_ID.' };

  // Get recent media
  const mediaRes = await fetch(
    `https://graph.facebook.com/v21.0/${accountId}/media?fields=id,caption,timestamp&limit=10&access_token=${encodeURIComponent(token)}`,
  );
  const mediaData = await mediaRes.json();
  if (mediaData.error) {
    return { comments: [], error: `Instagram API fout bij media ophalen: ${mediaData.error.message}` };
  }
  if (!mediaData.data?.length) return { comments: [], error: 'Geen posts gevonden op dit account.' };

  const comments: CommentEntry[] = [];
  const existingIds = new Set<string>();

  // Load existing comment IDs to avoid duplicates
  const existing = await getComments(200);
  for (const c of existing) existingIds.add(c.id);

  // Fetch comments for each post
  for (const post of mediaData.data) {
    const commentsRes = await fetch(
      `https://graph.facebook.com/v21.0/${post.id}/comments?fields=id,text,username,timestamp&limit=50&access_token=${encodeURIComponent(token)}`,
    );
    const commentsData = await commentsRes.json();
    if (commentsData.error || !commentsData.data) continue;

    for (const c of commentsData.data) {
      if (existingIds.has(c.id)) continue;

      comments.push({
        id: c.id,
        postId: post.id,
        username: c.username || c.from?.username || 'onbekend',
        text: c.text,
        timestamp: c.timestamp,
        status: 'pending',
      });
    }
  }

  return { comments };
}

export async function postCommentReply(commentId: string, replyText: string): Promise<{ success: boolean; replyId?: string; error?: string }> {
  const token = await getInstagramToken();
  if (!token) return { success: false, error: 'Geen Instagram token' };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${commentId}/replies`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: replyText,
          access_token: token,
        }),
      },
    );
    const data = await res.json();

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    return { success: true, replyId: data.id };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Onbekende fout' };
  }
}

// ─── Main Process ────────────────────────────────────────────────
export async function processNewComments(): Promise<{
  fetched: number;
  replied: number;
  queued: number;
  error?: string;
}> {
  const mode = await getAutoReplyMode();
  if (mode === 'off') return { fetched: 0, replied: 0, queued: 0 };

  // Fetch new comments
  const result = await fetchRecentComments();
  if (result.error) return { fetched: 0, replied: 0, queued: 0, error: result.error };
  const newComments = result.comments;

  let replied = 0;
  let queued = 0;

  for (const comment of newComments) {
    // Generate AI reply
    try {
      const replyText = await generateReply(comment.text);
      comment.replyText = replyText;

      if (mode === 'auto') {
        // Post immediately
        const result = await postCommentReply(comment.id, replyText);
        if (result.success) {
          comment.status = 'replied';
          comment.replyId = result.replyId;
          comment.repliedAt = new Date().toISOString();
          replied++;
        } else {
          comment.status = 'pending';
          queued++;
        }
      } else {
        // Queue for review
        comment.status = 'pending';
        queued++;
      }
    } catch {
      comment.status = 'pending';
      queued++;
    }

    await storeComment(comment);
  }

  return { fetched: newComments.length, replied, queued };
}
