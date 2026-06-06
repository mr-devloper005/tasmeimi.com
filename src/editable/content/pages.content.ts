import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'PDF uploads, document discovery, and polished reading surfaces',
      description: 'Browse shared PDFs, supporting articles, and resource-led posts through a premium document-first experience.',
      openGraphTitle: 'TASMEIMI document library',
      openGraphDescription: 'A premium destination for PDF uploads, helpful notes, and clean document discovery.',
      keywords: ['pdf upload', 'document library', 'share pdf', 'pdf reading', 'resource archive'],
    },
    hero: {
      badge: '',
      title: ['PDF uploads', 'meet a cleaner', 'reading experience.'],
      description: 'Share documents, browse useful resources, and move through supporting content with the polish of a product site and the clarity of an editorial archive.',
      primaryCta: { label: 'Browse PDFs', href: '/pdf' },
      secondaryCta: { label: 'Search archive', href: '/search' },
      searchPlaceholder: 'Search PDFs, topics, titles, or categories',
    },
    intro: {
      badge: 'Why it works',
      title: 'Documents deserve more than a plain file wall.',
      paragraphs: [
        'A stronger document surface helps readers understand what they are opening before they commit to a long download or a deeper read.',
        'That means clearer previews, more useful summaries, and page layouts that can support PDFs alongside notes, images, and linked resources.',
        'The result is a site that feels curated, fast to scan, and easier to trust across every section.',
      ],
      sideBadge: 'What changes',
      sidePoints: [
        'PDF-first homepage hierarchy with stronger product-style framing.',
        'Multiple card types so files, images, and editorial posts do not all look identical.',
        'Cleaner archive browsing with premium spacing, chips, and pagination.',
        'Detail pages that stay safe even when summaries or media are missing.',
      ],
      primaryLink: { label: 'Open the library', href: '/pdf' },
      secondaryLink: { label: 'Search the archive', href: '/search' },
    },
    cta: {
      badge: 'Ready to publish',
      title: 'Bring your documents, updates, and reference pages into one organized library.',
      description: 'Whether you are sharing a single PDF or building a full resource collection, the site stays clean, fast, and easy to browse.',
      primaryCta: { label: 'Start with PDFs', href: '/pdf' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the library',
    title: 'Built for people who publish PDFs, document sets, and supporting notes in public.',
    description: `${slot4BrandConfig.siteName} is designed for shareable PDFs, public resources, and support content that should feel organized, readable, and worth revisiting.`,
    paragraphs: [
      'The goal is simple: make documents easier to discover, easier to understand, and easier to open with confidence.',
      'PDFs, short updates, image-led posts, and profile pages can all live together here without turning the site into a cluttered archive.',
      'That means stronger hierarchy, better pacing, and cleaner page structure around every upload.',
    ],
    values: [
      {
        title: 'Clear document browsing',
        description: 'Important files should feel browsable, not buried. Every section helps visitors scan faster and choose what to open next.',
      },
      {
        title: 'Better context around every file',
        description: 'Summaries, supporting notes, and related content help each document feel more useful than a standalone download link.',
      },
      {
        title: 'Consistent public presentation',
        description: 'Different post types still work together through shared patterns, safe fallbacks, and a calmer reading experience.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help with a document launch, archive update, or publishing workflow?',
    description: 'Send a note about uploads, collections, partnerships, or site support. We keep the form simple and route requests cleanly.',
    formTitle: 'Send a request',
  },
  search: {
    metadata: {
      title: 'Search the archive',
      description: 'Search documents, articles, profiles, and supporting resources across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find the right page before the scroll gets long.',
      description: 'Look across PDFs, articles, profiles, listings, and saved resources using keywords, categories, or content type filters.',
      placeholder: 'Search by title, topic, category, or keyword',
    },
    resultsTitle: 'Recently indexed content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and save a new post draft for the site.',
    },
    locked: {
      badge: 'Member workspace',
      title: 'Sign in to open the publishing desk.',
      description: 'Use your account to draft document pages, supporting posts, and other share-ready entries.',
    },
    hero: {
      badge: 'Publishing desk',
      title: 'Build a clean post around every upload.',
      description: 'Choose the content type, add context, and save a polished draft with summary, media, and body copy.',
    },
    formTitle: 'Post details',
    submitLabel: 'Save draft',
    successTitle: 'Draft saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for TASMEIMI.com.',
      badge: 'Member login',
      title: 'Return to your document workspace.',
      description: 'Log in to manage drafts, browse faster, and keep publishing tools close at hand.',
      formTitle: 'Log in',
      submitLabel: 'Continue',
      noAccount: 'These details did not match an account. Create one first, then try again.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for TASMEIMI.com.',
      badge: 'Create access',
      title: 'Create your account and step into the publishing workspace.',
      description: 'Open a account to save drafts, organize document posts, and publish with a cleaner workflow.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Log in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article detail',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing detail',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image detail',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
