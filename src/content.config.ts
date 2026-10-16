import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts written in the Keystatic CMS (see keystatic.config.ts). Each post
// is a Markdoc file, src/content/posts/<slug>.mdoc, and the filename is the
// URL slug. Keep this schema in sync with the fields in keystatic.config.ts.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    // 1-2 sentence teaser for listings and the meta description.
    summary: z.string(),
    // Keystatic writes YYYY-MM-DD; coerce so it becomes a real Date.
    publishedDate: z.coerce.date(),
    // Public path like /images/blog/<slug>/coverImage.jpg (served from public/).
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    // Drafts are saved but left off the site.
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
