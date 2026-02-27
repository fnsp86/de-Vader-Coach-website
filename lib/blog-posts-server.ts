import { POSTS_LIST, type BlogPostMeta, type BlogPostFull, getBlogPost } from './blog-posts';
import { getAllDynamicBlogPosts, getDynamicBlogPost } from './blog-storage';

/** Server-only: includes dynamic posts from Redis */
export async function getAllBlogPostsAsync(): Promise<BlogPostMeta[]> {
  const dynamic = await getAllDynamicBlogPosts();
  const dynamicMeta: BlogPostMeta[] = dynamic
    .filter((p) => p.published)
    .map((p) => ({
      title: p.title,
      description: p.description,
      slug: p.slug,
      date: p.date,
      readTime: p.readTime,
      category: p.category,
    }));
  return [...POSTS_LIST, ...dynamicMeta].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Server-only: also checks Redis for dynamic posts */
export async function getBlogPostAsync(slug: string): Promise<BlogPostFull | undefined> {
  const staticPost = getBlogPost(slug);
  if (staticPost) return staticPost;

  const dynamic = await getDynamicBlogPost(slug);
  if (dynamic && dynamic.published) {
    return {
      title: dynamic.title,
      description: dynamic.description,
      date: dynamic.date,
      readTime: dynamic.readTime,
      category: dynamic.category,
      content: dynamic.content,
    };
  }
  return undefined;
}
