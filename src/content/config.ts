import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    // 可选：自定义封面图路径（放 public/ 下，如 /covers/xxx.webp）。
    // 不填时自动用 /covers/<slug>.svg（构建时按标题生成）。
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
