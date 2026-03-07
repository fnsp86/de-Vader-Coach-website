import { NextRequest, NextResponse } from 'next/server';
import {
  storeComment,
  generateReply,
  postCommentReply,
  getAutoReplyMode,
  type CommentEntry,
} from '@/lib/instagram-comments';

// Instagram Webhook verification (GET)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken && challenge) {
    console.log('[Webhook] Verificatie geslaagd');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verificatie mislukt' }, { status: 403 });
}

// Instagram Webhook events (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Instagram sends comment events
    if (body.object !== 'instagram') {
      return NextResponse.json({ received: true });
    }

    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.field === 'comments') {
          const value = change.value;

          // Skip if this is our own reply
          if (value.from?.id === process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID) continue;

          const comment: CommentEntry = {
            id: value.id,
            postId: value.media?.id ?? '',
            username: value.from?.username ?? 'onbekend',
            text: value.text ?? '',
            timestamp: new Date().toISOString(),
            status: 'pending',
          };

          // Generate AI reply
          try {
            const replyText = await generateReply(comment.text);
            comment.replyText = replyText;

            const mode = await getAutoReplyMode();
            if (mode === 'auto') {
              const result = await postCommentReply(comment.id, replyText);
              if (result.success) {
                comment.status = 'replied';
                comment.replyId = result.replyId;
                comment.repliedAt = new Date().toISOString();
              }
            }
          } catch (e) {
            console.error('[Webhook] Reply generatie mislukt:', e);
          }

          await storeComment(comment);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error('[Webhook] Fout:', e);
    return NextResponse.json({ received: true }); // Always return 200 to Instagram
  }
}
