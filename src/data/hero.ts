/** One source of truth for the hero copy, shared by every hero layout in
    src/components/hero/. Swapping layouts must never mean re-typing headlines. */
export const hero = {
  eyebrow: 'Westminster · Serving California',

  /** Three-line stacked headline (split / masthead layouts). */
  lead: 'Orange County',
  accent: 'Injury & Defense',
  tail: 'Attorneys.',

  /** Single-line headline for the layouts that need one unbroken line. */
  oneLine: 'Orange County Injury & Defense Attorneys',

  sub: 'From the courtroom to the negotiating table, the Kagasoff Law Firm brings disciplined, personal advocacy to every client — across six practice areas.',
  subShort: 'Disciplined, personal advocacy across six practice areas.',

  phone: '(657) 218-4947',
  phoneHref: 'tel:6572184947',
} as const;

/** Placeholder portrait tiles for the filmstrip layout.
    Five of the six are zoomed crops of the one group photo, standing in for
    individual headshots. When real portraits are shot, replace `src` and drop
    `zoom` back to 1 — nothing else in the layout changes. */
export const heroPortraits = [
  { src: '/team.jpg', position: '4% 8%', zoom: 2.5, alt: 'Kagasoff Law Firm team member' },
  { src: '/ashley-portrait.jpg', position: '50% 16%', zoom: 1, alt: 'Ashley Kagasoff' },
  { src: '/team.jpg', position: '20% 12%', zoom: 2.5, alt: 'Kagasoff Law Firm team member' },
  { src: '/team.jpg', position: '44% 22%', zoom: 2.5, alt: 'Kagasoff Law Firm team member' },
  { src: '/team.jpg', position: '66% 22%', zoom: 2.5, alt: 'Kagasoff Law Firm team member' },
  { src: '/team.jpg', position: '96% 13%', zoom: 2.5, alt: 'Kagasoff Law Firm team member' },
];
