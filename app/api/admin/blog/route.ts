import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import {
  saveBlogPost,
  getAllDynamicBlogPosts,
  getDynamicBlogPost,
  deleteDynamicBlogPost,
  type DynamicBlogPost,
} from '@/lib/blog-storage';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  const slug = request.nextUrl.searchParams.get('slug');

  if (slug) {
    const post = await getDynamicBlogPost(slug);
    return NextResponse.json({ post });
  }

  const posts = await getAllDynamicBlogPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  const post: DynamicBlogPost = await request.json();

  if (!post.slug || !post.title || !post.content) {
    return NextResponse.json({ error: 'Titel, slug en inhoud zijn verplicht' }, { status: 400 });
  }

  if (!post.createdAt) {
    post.createdAt = new Date().toISOString();
  }
  post.updatedAt = new Date().toISOString();

  await saveBlogPost(post);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  const { slug } = await request.json();
  if (!slug) return NextResponse.json({ error: 'Slug is verplicht' }, { status: 400 });

  await deleteDynamicBlogPost(slug);
  return NextResponse.json({ success: true });
}
