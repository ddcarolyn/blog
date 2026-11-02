import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync } from 'node:fs';

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

/**
 * 列表用的小图：public/covers/thumbs/<文件名>（376×212，scripts/covers/make_thumbs.py 生成）。
 * 没生成过就退回原图，页面不会坏。
 */
export function coverThumbUrl(p: Post): string {
  const full = coverUrl(p);
  const thumb = full.replace(/^\/covers\//, '/covers/thumbs/');
  if (thumb === full) return full;
  return existsSync(`public${thumb}`) ? thumb : full;
}

export const tagUrl = (t: string) => `/tags/${encodeURIComponent(t)}/`;

export function tagCounts(posts: Post[]): [string, number][] {
  const m = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) m.set(t, (m.get(t) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh'));
}
