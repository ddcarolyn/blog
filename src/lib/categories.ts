/**
 * 专栏(category)登记表。加一个专栏 = 在这里加一行,文章 frontmatter 写 `category: <slug>`。
 * 首页区块、tab、专栏页、文章页标签、SVG 兜底封面的配色都从这里取。
 * 顺序 = 首页区块顺序。没有文章的专栏不会出现在页面上。
 */
export interface Category {
  slug: string;
  name: string;
  /** 小字英文副标,给专栏页和卡片一点气口 */
  en: string;
  /** 一句话说明,专栏页头部和首页区块标题下用 */
  blurb: string;
  /** 浅色模式强调色 */
  accent: string;
  /** 深色模式强调色(在深底上要亮一档) */
  accentDark: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'work',
    name: '出海实战',
    en: 'Field Notes',
    blurb: '独立站运营、Shopify、跨境电商里真实踩过的坑,和爬出来的办法。',
    accent: '#c2562f',
    accentDark: '#ef8a63',
  },
  {
    slug: 'ai',
    name: 'AI 工作流',
    en: 'AI Lab',
    blurb: '把 AI 当研究助手:调研、自动化、工具实验,过程原样公开。',
    accent: '#6b4fbb',
    accentDark: '#b39ffb',
  },
  {
    slug: 'build',
    name: '建站手记',
    en: 'Build Log',
    blurb: 'Cloudflare、飞书登录、Pages……把一个想法做成能跑的页面。',
    accent: '#2a6f97',
    accentDark: '#6dbde8',
  },
  {
    slug: 'growth',
    name: '学习提升',
    en: 'Growth',
    blurb: '注意力、长任务、成就感:知识工作者怎么管好自己。',
    accent: '#3f7d4f',
    accentDark: '#86d49a',
  },
  {
    slug: 'books',
    name: '书架',
    en: 'Bookshelf',
    blurb: '读后感与书摘。推理小说的专属讨论区,也会从这里长出来。',
    accent: '#9a6b1f',
    accentDark: '#e6bc5f',
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

export const getCategory = (slug?: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);

export const categoryUrl = (c: Category | string) =>
  `/c/${typeof c === 'string' ? c : c.slug}/`;
