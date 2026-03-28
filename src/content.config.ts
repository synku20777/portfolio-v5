import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    role: z.string().optional(),
    client: z.string().optional(),
    duration: z.string().optional(),
    tools: z.string().optional(),
    year: z.string().optional(),
    heroImage: z.string(),
    thumbnailImage: z.string().optional(),
    outcomes: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    order: z.number().default(0),
    ogImage: z.string().optional(),
    bentoSpan: z.string().optional(),
  }),
});

export const collections = { blog, caseStudies };
