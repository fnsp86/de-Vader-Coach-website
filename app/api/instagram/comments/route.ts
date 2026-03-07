import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import {
  getComments,
  updateComment,
  generateReply,
  postCommentReply,
  getAutoReplyMode,
  setAutoReplyMode,
  processNewComments,
  type AutoReplyMode,
} from '@/lib/instagram-comments';

// GET: Fetch comments + status
export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  if (action === 'refresh') {
    // Poll Instagram for new comments
    const result = await processNewComments();
    return NextResponse.json({ success: true, ...result });
  }

  if (action === 'settings') {
    const mode = await getAutoReplyMode();
    return NextResponse.json({ mode });
  }

  const status = searchParams.get('status') as 'pending' | 'approved' | 'replied' | 'skipped' | undefined;
  const limit = Number(searchParams.get('limit') ?? 50);
  const comments = await getComments(limit, status || undefined);
  return NextResponse.json({ comments });
}

// POST: Actions on comments
export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { action, commentId, replyText: customReply } = await request.json();

  // Update settings
  if (action === 'set-mode') {
    const mode = customReply as AutoReplyMode;
    if (!['auto', 'review', 'off'].includes(mode)) {
      return NextResponse.json({ error: 'Ongeldige modus' }, { status: 400 });
    }
    await setAutoReplyMode(mode);
    return NextResponse.json({ success: true, mode });
  }

  // Regenerate reply with AI
  if (action === 'regenerate' && commentId) {
    const { getCommentById } = await import('@/lib/instagram-comments');
    const comment = await getCommentById(commentId);
    if (!comment) return NextResponse.json({ error: 'Comment niet gevonden' }, { status: 404 });

    const newReply = await generateReply(comment.text);
    await updateComment(commentId, { replyText: newReply });
    return NextResponse.json({ success: true, replyText: newReply });
  }

  // Approve and send reply
  if (action === 'approve' && commentId) {
    const { getCommentById } = await import('@/lib/instagram-comments');
    const comment = await getCommentById(commentId);
    if (!comment) return NextResponse.json({ error: 'Comment niet gevonden' }, { status: 404 });

    const text = customReply || comment.replyText;
    if (!text) return NextResponse.json({ error: 'Geen reply tekst' }, { status: 400 });

    const result = await postCommentReply(commentId, text);
    if (result.success) {
      await updateComment(commentId, {
        status: 'replied',
        replyText: text,
        replyId: result.replyId,
        repliedAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, replyId: result.replyId });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  }

  // Skip comment
  if (action === 'skip' && commentId) {
    await updateComment(commentId, { status: 'skipped' });
    return NextResponse.json({ success: true });
  }

  // Edit reply text (without posting)
  if (action === 'edit' && commentId && customReply) {
    await updateComment(commentId, { replyText: customReply });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Ongeldige actie' }, { status: 400 });
}
