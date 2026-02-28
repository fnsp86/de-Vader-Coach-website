import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { schedulePost, getScheduledPosts, deleteScheduledPost } from '@/lib/instagram-schedule';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const posts = await getScheduledPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const body = await request.json();
  const { caption, scheduledAt, title, imageUrls } = body;

  if (!scheduledAt || !imageUrls?.length) {
    return NextResponse.json({ error: 'scheduledAt en imageUrls zijn verplicht' }, { status: 400 });
  }

  const post = await schedulePost({
    type: imageUrls.length > 1 ? 'carousel' : 'single',
    title: title ?? 'Untitled',
    caption: caption ?? '',
    imageUrls,
    scheduledAt,
  });

  if (!post) {
    return NextResponse.json({ error: 'Kon post niet inplannen (Redis niet beschikbaar)' }, { status: 503 });
  }

  return NextResponse.json({ success: true, post });
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'Post ID is verplicht' }, { status: 400 });
  }

  await deleteScheduledPost(id);
  return NextResponse.json({ success: true });
}
