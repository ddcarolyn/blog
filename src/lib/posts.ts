import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const SITE = {
  name: 'ddcarolyn',
  author: 'Carolyn',
  tagline: 'Carolyn 的出海笔记',
  email: 'gracerosedd@gmail.com',
  url: 'https://ddcarolyn.com',
};

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;

export const postUrl = (p: Post) => `/posts/${p.slug}/`;

export const coverUrl = (p: Post) => p.data.cover ?? `/covers/${p.slug}.svg`;

export const tagUrl = (t: string) => `/tags/${encodeURIComponent(t)}/`;

export function tagCounts(posts: Post[]): [string, number][] {
  const m = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) m.set(t, (m.get(t) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh'));
}
