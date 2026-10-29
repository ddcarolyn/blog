import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../../lib/posts';

// 构建时为每篇没有自定义 cover 的文章生成一张 16:9 的文字封面，
// 首页 / 标签页的列表行卡用它当缩略图（对应 Wayne 站的 /covers/*.webp）。

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return posts
    .filter((p) => !p.data.cover)
    .map((p) => ({
      params: { slug: p.slug },
      props: {
        title: p.data.title,
        category: p.data.category ?? p.data.tags[0] ?? '',
      },
    }));
}

const PALETTES = [
  { bg: '#F3E9D8', fg: '#2B2118', accent: '#B0834A' },
  { bg: '#E3ECE6', fg: '#1F2A24', accent: '#4F7D63' },
  { bg: '#E5E8F1', fg: '#1F2335', accent: '#4B5B9C' },
  { bg: '#F2E2DE', fg: '#2E1F1D', accent: '#B2563F' },
  { bg: '#EBE5F2', fg: '#251F2E', accent: '#6E4FA0' },
  { bg: '#E9EDE0', fg: '#262B1E', accent: '#77883F' },
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 以一个 CJK 字宽为 1 估算字符宽度
function charWidth(ch: string): number {
  const code = ch.codePointAt(0) ?? 0;
  if (code > 0x2e7f) return 1; // CJK、全角标点
  if (ch === ' ') return 0.3;
  if (/[A-Z]/.test(ch)) return 0.68;
  if (/[a-z0-9]/.test(ch)) return 0.55;
  return 0.45; // 半角标点
}

function wrap(text: string, maxUnits: number, maxLines: number): string[] {
  const lines: string[] = [];
  let cur = '';
  let curW = 0;
  const chars = Array.from(text.trim());
  for (const ch of chars) {
    const w = charWidth(ch);
    if (curW + w > maxUnits && cur) {
      lines.push(cur);
      cur = '';
      curW = 0;
      if (ch === ' ') continue;
    }
    cur += ch;
    curW += w;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    const last = Array.from(kept[maxLines - 1]);
    kept[maxLines - 1] = last.slice(0, Math.max(1, last.length - 1)).join('') + '…';
    return kept;
  }
  return lines;
}

export const GET: APIRoute = ({ props }) => {
  const { title, category } = props as { title: string; category: string };
  const pal = PALETTES[hash(category || title) % PALETTES.length];

  const W = 752;
  const H = 424;
  const PAD = 56;
  // 缩略图只有 188px 宽，字要够大：最多两行、每行约 11 个汉字
  const fontSize = 56;
  const lineH = Math.round(fontSize * 1.3);
  const lines = wrap(title, (W - PAD * 2) / fontSize, 2);
  const blockH = lines.length * lineH;
  const firstBaseline = Math.round((H - blockH) / 2 + fontSize * 0.82) + 10;

  const tspans = lines
    .map(
      (l, i) =>
        `<tspan x="${PAD}" y="${firstBaseline + i * lineH}">${esc(l)}</tspan>`
    )
    .join('');

  const font =
    "system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Segoe UI', sans-serif";

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">
  <rect width="${W}" height="${H}" fill="${pal.bg}"/>
  <circle cx="${W - 40}" cy="${H + 60}" r="230" fill="${pal.accent}" opacity="0.14"/>
  <circle cx="${W - 150}" cy="${H - 20}" r="90" fill="${pal.accent}" opacity="0.18"/>
  <rect x="${PAD}" y="${PAD + 4}" width="28" height="4" fill="${pal.accent}"/>
  ${
    category
      ? `<text x="${PAD + 40}" y="${PAD + 13}" font-family="${font}" font-size="22" font-weight="600" letter-spacing="2" fill="${pal.accent}">${esc(category.toUpperCase())}</text>`
      : ''
  }
  <text font-family="${font}" font-size="${fontSize}" font-weight="700" fill="${pal.fg}">${tspans}</text>
  <text x="${PAD}" y="${H - 44}" font-family="${font}" font-size="20" fill="${pal.fg}" opacity="0.55">ddcarolyn.com</text>
</svg>
`;

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
