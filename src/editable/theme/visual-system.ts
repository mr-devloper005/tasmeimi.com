import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-cloud'
  | 'premium-library'
  | 'tech-magazine'
  | 'document-salon'
  | 'soft-directory'
  | 'ink-grid'
  | 'blueprint-light'

export const visualPresets = {
  'editorial-cloud': {
    label: 'Editorial Cloud',
    mood: 'lightweight, intelligent, premium',
    fontDirection: 'bold sans display with restrained body copy',
    colors: {
      background: '#f7f8fb',
      foreground: '#10233d',
      muted: '#6f87a2',
      primary: '#0b65d8',
      accent: '#81A6C6',
      surface: '#ffffff',
    },
    shape: 'soft cards, rounded capsules, layered product-style panels',
  },
  'premium-library': {
    label: 'Premium Library',
    mood: 'dark premium reading room',
    fontDirection: 'serious editorial headings with compact utility text',
    colors: {
      background: '#10233d',
      foreground: '#f8fbff',
      muted: '#aac6db',
      primary: '#f3e3d0',
      accent: '#81A6C6',
      surface: '#173252',
    },
    shape: 'dark shelves, luminous borders, soft blue focus rings',
  },
  'tech-magazine': {
    label: 'Tech Magazine',
    mood: 'clean startup confidence',
    fontDirection: 'oversized geometric sans with lighter support copy',
    colors: {
      background: '#fbfcfe',
      foreground: '#0f2340',
      muted: '#5a7698',
      primary: '#0b65d8',
      accent: '#AACDDC',
      surface: '#ffffff',
    },
    shape: 'glass cards, grid lines, modular feature rails',
  },
  'document-salon': {
    label: 'Document Salon',
    mood: 'luxury editorial with warm paper notes',
    fontDirection: 'elegant display rhythm with balanced neutral body text',
    colors: {
      background: '#fbf7f1',
      foreground: '#1a2840',
      muted: '#6e7886',
      primary: '#0b65d8',
      accent: '#D2C4B4',
      surface: '#ffffff',
    },
    shape: 'paper cards, warm cutaways, curated feature stacks',
  },
  'soft-directory': {
    label: 'Soft Directory',
    mood: 'useful, playful, organized',
    fontDirection: 'friendly sans with bold caps labels',
    colors: {
      background: '#f6fafc',
      foreground: '#14304d',
      muted: '#5c7691',
      primary: '#0b65d8',
      accent: '#81A6C6',
      surface: '#ffffff',
    },
    shape: 'directory chips, map-like spacing, floating index cards',
  },
  'ink-grid': {
    label: 'Ink Grid',
    mood: 'bold tech and sharp layout discipline',
    fontDirection: 'compact headlines with crisp metadata tags',
    colors: {
      background: '#eef4f8',
      foreground: '#10233d',
      muted: '#60728a',
      primary: '#10233d',
      accent: '#0b65d8',
      surface: '#ffffff',
    },
    shape: 'strong grid lines, framed blocks, clear section contrast',
  },
  'blueprint-light': {
    label: 'Blueprint Light',
    mood: 'minimal product storytelling',
    fontDirection: 'sleek sans with product UI cues',
    colors: {
      background: '#f8fbfe',
      foreground: '#0f2340',
      muted: '#66829d',
      primary: '#0b65d8',
      accent: '#81A6C6',
      surface: '#ffffff',
    },
    shape: 'product demos, callout bubbles, airy diagrams',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'blueprint-light',
  radius: {
    sm: '0.9rem',
    md: '1.35rem',
    lg: '2rem',
    xl: '2.9rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-90',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle: 'text-5xl font-black tracking-[-0.08em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-4xl font-black tracking-[-0.06em] sm:text-5xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-bold uppercase tracking-[0.18em]',
  },
  surfaces: {
    glass: 'border border-white/50 bg-white/65 backdrop-blur-xl',
    paper: 'border border-[var(--editable-border)] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]',
    quiet: 'border border-[var(--editable-border)] bg-[rgba(255,255,255,0.58)]',
    dark: 'border border-white/10 bg-[#10233d] shadow-[0_24px_70px_rgba(0,0,0,0.25)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-20 lg:py-24',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
