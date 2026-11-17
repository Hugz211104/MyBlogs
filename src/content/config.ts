import { defineCollection, z } from 'astro:content';

const tipsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    project: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    summary: z.string().min(1),
    draft: z.boolean().optional().default(false),
  }),
});

const buildsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    game: z.string().min(1),
    role: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    summary: z.string().min(1),
    draft: z.boolean().optional().default(false),
  }),
});

const toolsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    version: z.string().min(1),
    os: z.array(z.string().min(1)).min(1),
    youtube_id: z.string().min(1),
    drive_url: z.string().url(),
    sha256: z
      .string()
      .regex(/^[a-fA-F0-9]{64}$/, 'sha256 must be a valid 64-character hex string'),
    summary: z.string().min(1),
    filename: z.string().min(1).optional(),
    github_release_url: z.string().url().optional(),
    tags: z.array(z.string().min(1)).optional().default(['Tool']),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  tips: tipsCollection,
  builds: buildsCollection,
  tools: toolsCollection,
};
