import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  type BlogPost = CollectionEntry<'blog'>;

  const posts: BlogPost[] = await getCollection('blog');
  return rss({
    title: 'Nest Blog',
    description: 'Thoughts on UX design, frontend development, and creative process.',
    site: context.site!,
    items: posts
      .filter(p => !p.data.draft)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map(post => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}/`,
      })),
  });
}
