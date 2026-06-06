import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Editorial notes',
    headline: 'Reading-led articles with room for context, hierarchy, and follow-through.',
    description: 'Articles should feel polished and readable, with enough structure to support long-form explanation beside the site’s document-heavy flow.',
    filterLabel: 'Filter article topics',
    secondaryNote: 'A strong reading surface helps explain, frame, and support uploaded documents.',
    chips: ['Long reads', 'Commentary', 'Reference context'],
  },
  classified: {
    eyebrow: 'Fast notices',
    headline: 'Short-form posts built for quick scanning and direct action.',
    description: 'Classified entries should surface urgency, key facts, and fast open paths without losing the premium page rhythm.',
    filterLabel: 'Filter notices',
    secondaryNote: 'Keep the detail light, the metadata visible, and the action path immediate.',
    chips: ['Fast scan', 'Short updates', 'Action first'],
  },
  sbm: {
    eyebrow: 'Saved links',
    headline: 'Reference links and useful pages arranged like a curated shelf.',
    description: 'Bookmarks should read like a practical collection of resources that support the wider document archive.',
    filterLabel: 'Filter collections',
    secondaryNote: 'This section works best when it feels selective, useful, and low-noise.',
    chips: ['Reference shelf', 'Useful links', 'Curated picks'],
  },
  profile: {
    eyebrow: 'People and sources',
    headline: 'Profiles that make contributors, sources, and organizations easier to recognize.',
    description: 'Profile pages should foreground identity, trust, and connection to the documents or posts around them.',
    filterLabel: 'Filter profiles',
    secondaryNote: 'Let identity show up clearly before supporting text takes over.',
    chips: ['Identity', 'Contributors', 'Trusted sources'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'PDF uploads presented like a polished, searchable collection.',
    description: 'This section leads the site. File cards, previews, summaries, and archive controls should all feel product-grade and easy to trust.',
    filterLabel: 'Filter document types',
    secondaryNote: 'Focus on useful summaries, strong preview cues, and open/download intent.',
    chips: ['Library', 'Preview ready', 'Download flow'],
  },
  listing: {
    eyebrow: 'Directory lane',
    headline: 'Listings that balance information density with a cleaner premium layout.',
    description: 'Businesses, services, or public entries should be easy to compare while still matching the site’s overall visual polish.',
    filterLabel: 'Filter listings',
    secondaryNote: 'Use trust cues, location context, and quick actions without crowding the page.',
    chips: ['Directory', 'Compare', 'Trust cues'],
  },
  image: {
    eyebrow: 'Visual lane',
    headline: 'Image posts that support discovery with stronger visual rhythm.',
    description: 'Image-led content should feel like a magazine gallery, using visual variety without breaking the site’s document-first identity.',
    filterLabel: 'Filter visuals',
    secondaryNote: 'Let the image speak first, then keep supporting copy concise.',
    chips: ['Gallery', 'Visual first', 'Feature art'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
