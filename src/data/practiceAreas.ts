export interface ProcessStep {
  title: string;
  body: string;
}

export interface PracticeArea {
  slug: string;
  name: string;
  /** one-line summary used in the home-page index list */
  short: string;
  /** hero sub-headline on the practice page */
  blurb: string;
  /** intro paragraphs for the practice page body */
  overview: string[];
  /** heading for the bulleted list of matter types */
  casesHeading: string;
  cases: string[];
}

/** Shared "what to expect" process — applies across every practice area. */
export const process: ProcessStep[] = [
  {
    title: 'Free consultation',
    body: "We listen to what happened and tell you honestly where you stand and how we can help.",
  },
  {
    title: 'Strategy & preparation',
    body: 'We gather the facts, records, and evidence and build a clear, documented case from the outset.',
  },
  {
    title: 'Negotiation or hearing',
    body: 'We press for the best resolution available — and never settle for less to simply close a file.',
  },
  {
    title: 'Resolution, or trial',
    body: "When a fair outcome isn't on the table, we're prepared to advocate for you in court.",
  },
];

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'personal-injury',
    name: 'Personal Injury',
    short: 'Accidents, premises liability, and dog bites.',
    blurb:
      "When someone else's negligence turns your life upside down, we pursue the full recovery you're owed — and handle the insurers so you can focus on healing.",
    overview: [
      'A serious injury brings medical bills, lost income, and pressure from insurance adjusters whose job is to pay you as little as possible. Our role is to level that field — to build a clear, documented case for everything you have lost and to negotiate, or litigate, from a position of strength.',
      'We take the time to understand the full impact of your injury, coordinate with medical providers, and keep you informed at every step.',
    ],
    casesHeading: 'Cases we handle',
    cases: [
      'Automobile & motorcycle accidents',
      'Slip, trip & fall injuries',
      'Pedestrian & bicycle collisions',
      'Dog bites & animal attacks',
      'Premises liability',
      'Wrongful death',
    ],
  },
  {
    slug: 'criminal-defense',
    name: 'Criminal Defense',
    short: 'Misdemeanors and felonies, defended at every stage.',
    blurb:
      'From misdemeanors to felonies, we defend your rights at every stage — with the perspective of an attorney who has worked both sides of the courtroom.',
    overview: [
      'Having served as a law clerk for both the Orange County District Attorney and Public Defender before fifteen years in private defense, Ashley Kagasoff brings a rare, dual perspective to every criminal matter — an understanding of exactly how the prosecution builds, and breaks down, a case.',
      'We move quickly to protect your rights, scrutinize the evidence against you, and pursue the strongest possible outcome — from dismissal and reduced charges to acquittal at trial.',
    ],
    casesHeading: 'Charges we defend',
    cases: [
      'DUI & traffic offenses',
      'Drug offenses',
      'Theft & property crimes',
      'Domestic violence',
      'Assault & violent offenses',
      'Probation violations',
    ],
  },
  {
    slug: 'professional-license-defense',
    name: 'Professional License Defense',
    short: 'Representation before California licensing boards.',
    blurb:
      'Your license is your livelihood. We defend professionals through investigations, accusations, and hearings before California licensing boards.',
    overview: [
      'A complaint or accusation can put years of training and a career at risk. We represent licensed professionals at every phase — from the first investigative inquiry through formal accusations and administrative hearings.',
      'Ashley has appeared before licensing authorities across the state and understands what each board expects and how to present the strongest defense of your record and reputation.',
    ],
    casesHeading: 'Boards we appear before',
    cases: [
      'Medical Board of California',
      'Board of Registered Nursing',
      'Dental Board of California',
      'Bureau of Real Estate',
      "Contractors State License Board",
      'State Bar & Teacher Credentialing',
    ],
  },
  {
    slug: 'family-law',
    name: 'Family Law',
    short: 'Divorce, custody, and high-conflict disputes.',
    blurb:
      'Compassionate, results-focused representation through divorce, custody, and high-conflict family disputes.',
    overview: [
      'Family matters are personal, and they are rarely simple. We combine steady, practical guidance with firm advocacy — working toward resolution where possible and standing ready to litigate when your interests demand it.',
      'Ashley has a record of resolving high-conflict disputes and protecting clients and their children through difficult transitions.',
    ],
    casesHeading: 'Matters we handle',
    cases: [
      'Divorce & dissolution',
      'Child custody & visitation',
      'Child & spousal support',
      'Property & asset division',
      'Modifications & enforcement',
      'High-conflict disputes',
    ],
  },
  {
    slug: 'restraining-orders',
    name: 'Restraining Orders',
    short: 'Decisive protection and defense at hearing.',
    blurb:
      "Whether you need protection or you've been wrongly accused, we act quickly and represent you through the hearing.",
    overview: [
      'Restraining order proceedings move fast and carry lasting consequences. Whether you are seeking protection or defending against an order, prompt, prepared representation matters.',
      'Ashley has obtained dismissals of domestic violence restraining orders after hearing and represents clients on both sides of these urgent matters.',
    ],
    casesHeading: 'How we help',
    cases: [
      'Domestic violence restraining orders',
      'Civil harassment orders',
      'Defense at hearing',
      'Emergency protective orders',
      'Modifications',
      'Renewals & appeals',
    ],
  },
  {
    slug: 'employment',
    name: 'Employment',
    short: 'Workplace disputes and wrongful treatment.',
    blurb:
      'Standing up for employees facing wrongful treatment, harassment, and unpaid wages at work.',
    overview: [
      'The workplace is where livelihoods are made — and where rights are too often violated. We represent employees against employers who cross the line, pursuing accountability and the compensation our clients are owed.',
      'We evaluate your situation candidly and pursue resolution efficiently, through negotiation or litigation.',
    ],
    casesHeading: 'Claims we pursue',
    cases: [
      'Wrongful termination',
      'Workplace harassment',
      'Discrimination',
      'Retaliation',
      'Wage & hour disputes',
      'Unpaid wages',
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    short: 'Property transactions and disputes.',
    blurb:
      'Clear-eyed guidance and advocacy for property transactions and the disputes that can follow them.',
    overview: [
      'Real estate matters carry significant financial stakes and unforgiving deadlines. We help clients navigate transactions and resolve disputes with attention to the detail that protects your investment.',
      'From contract review to litigation, we provide practical advice grounded in your goals.',
    ],
    casesHeading: 'Matters we handle',
    cases: [
      'Purchase & sale disputes',
      'Landlord–tenant matters',
      'Boundary & title issues',
      'Contract review',
      'Non-disclosure claims',
      'Property litigation',
    ],
  },
];
