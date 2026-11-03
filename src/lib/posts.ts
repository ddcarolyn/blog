import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync } from 'node:fs';
import { CATEGORIES, type Category } from './categories';

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
 * 封面的三档尺寸（scripts/covers/make_thumbs.py 生成）：
 *   thumb 376×212 → /covers/thumbs/、mid 768×432 → /covers/mid/、full 1536×864 原图。
 * 哪档没生成就退回原图，页面不会坏。srcset 字符串顺手拼好。
 */
export interface CoverSources {
  full: string;
  thumb: string;
  mid: string;
  /** 三档都有时是完整 srcset；只有原图时为 undefined */
  srcset?: string;
}
export function coverSources(p: Post): CoverSources {
  const full = coverUrl(p);
  const variant = (folder: string) => {
    const u = full.replace(/^\/covers\//, `/covers/${folder}/`);
    return u !== full && existsSync(`public${u}`) ? u : full;
  };
  const thumb = variant('thumbs');
  const mid = variant('mid');
  const parts = [
    thumb !== full && `${thumb} 376w`,
    mid !== full && `${mid} 768w`,
    `${full} 1536w`,
  ].filter(Boolean) as string[];
  return { full, thumb, mid, srcset: parts.length > 1 ? parts.join(', ') : undefined };
}
export const coverThumbUrl = (p: Post) => coverSources(p).thumb;

export const tagUrl = (t: string) => `/tags/${encodeURIComponent(t)}/`;

export function tagCounts(posts: Post[]): [string, number][] {
  const m = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) m.set(t, (m.get(t) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh'));
}

/** 按登记表顺序给出「有文章的专栏 + 它的文章」,首页区块和侧栏都用它 */
export function postsByCategory(posts: Post[]): { category: Category; posts: Post[] }[] {
  return CATEGORIES.map((category) => ({
    category,
    posts: posts.filter((p) => p.data.category === category.slug),
  })).filter((g) => g.posts.length > 0);
}
