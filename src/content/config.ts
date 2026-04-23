import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const shares = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    title: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, shares };
