import { config, collection, fields } from '@keystatic/core';

// Keystatic CMS config: the editor staff use at /keystatic to write blog posts.
// Posts are saved as Markdoc files at src/content/posts/<slug>.mdoc, and the
// Astro content collection in src/content.config.ts reads them back. If you
// rename or add a field here, update the zod schema there to match.
//
// Storage:
//   - `npm run dev`  -> 'local': edits are written straight to files in this
//     repo, no login. Commit them like any other change.
//   - production     -> 'cloud': editors sign in with their email through
//     Keystatic Cloud, which saves each post as a commit to the GitHub repo.
//     That commit triggers a Cloudflare build, so the post goes live on its own.
//
// import.meta.env.PROD is true for the built site, false under `astro dev`.
export default config({
  storage: import.meta.env.PROD ? { kind: 'cloud' } : { kind: 'local' },

  // PLACEHOLDER -- the owner must replace this. Create a team + project at
  // https://keystatic.cloud, connect it to the firm's GitHub repo,
  // then paste the project id (shown as "team/project") here. Until it is real,
  // /keystatic works locally but cannot log anyone in on the live site.
  // See "Launch checklist" in README.md.
  cloud: { project: 'kagasoff/kagasoff-law' },

  ui: {
    brand: { name: 'Kagasoff Law Firm' },
  },

  collections: {
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      // The post body goes in the .mdoc file; every other field is frontmatter.
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'publishedDate'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'The headline of the post. It also becomes the web address (URL) of the post.',
            validation: { length: { min: 1, max: 120 } },
          },
        }),
        summary: fields.text({
          label: 'Summary',
          description:
            'One or two sentences that tease the post. Shown in the blog list and in Google search results.',
          multiline: true,
          validation: { length: { min: 20, max: 300 } },
        }),
        publishedDate: fields.date({
          label: 'Publish date',
          description: 'The date shown on the post. Defaults to today.',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        // Saved as /images/blog/<slug>/<file> in the frontmatter (a plain
        // string, which is what the content collection schema expects), with
        // the file itself written to public/images/blog/<slug>/.
        coverImage: fields.image({
          label: 'Cover image',
          description: 'Optional. A wide photo or graphic shown at the top of the post and in the blog list.',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        coverImageAlt: fields.text({
          label: 'Cover image description',
          description:
            'Describe the cover image in a few words, for visitors who use screen readers. Leave blank if there is no cover image.',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are saved but not shown on the website',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            // Photos dropped into the body are stored beside the cover images.
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});
