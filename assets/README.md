# Unused source assets

Not deployed. Astro only ships `public/` and `src/`.

- `hero.jpg` (3.9 MB) — the old homepage hero. The redesign replaced it with
  `ashley-portrait.jpg`, leaving this unreferenced but still shipping to every
  deploy, where it was ~87% of total output size. Moved here rather than
  deleted: it is real client photography and may be wanted again. To use it,
  move it back to `public/` and compress it first.
