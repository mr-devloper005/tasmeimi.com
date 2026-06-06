import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline,
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    announcement: 'Fresh document sessions, uploads, and share-ready pages are live now.',
    announcementCta: { label: 'Explore library', href: '/pdf' },
    tagline: 'Curated PDF publishing and document discovery',
    primaryLinks: [
      { label: 'PDFs', href: '/pdf' },
      { label: 'Articles', href: '/article' },
      { label: 'Images', href: '/image' },
      { label: 'Profiles', href: '/profile' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Get started', href: '/signup' },
      secondary: { label: 'Log in', href: '/login' },
    },
  },
  footer: {
    tagline: 'A polished surface for document sharing, browsing, and discovery.',
    description: 'TASMEIMI.com organizes PDF uploads, editorial notes, resource pages, and supporting content into one premium library experience.',
    columns: [
      
      {
        title: 'Publish',
        links: [
          { label: 'Create post', href: '/create' },
          { label: 'Contact', href: '/contact' },
          { label: 'About', href: '/about' },
        ],
      },
    ],
    bottomNote: 'Designed for calm sharing, quicker scanning, and better reading.',
  },
  commonLabels: {
    readMore: 'Open page',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
