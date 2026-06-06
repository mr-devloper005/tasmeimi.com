import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f8fb',
  '--slot4-page-text': '#10233d',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': 'rgba(255,255,255,0.82)',
  '--slot4-muted-text': '#4f6785',
  '--slot4-soft-muted-text': '#6f87a2',
  '--slot4-accent': '#2d93ff',
  '--slot4-accent-fill': '#0b65d8',
  '--slot4-accent-soft': '#d9edf6',
  '--slot4-dark-bg': '#10233d',
  '--slot4-dark-text': '#f7fbff',
  '--slot4-media-bg': '#e8eef4',
  '--slot4-cream': '#f3e3d0',
  '--slot4-warm': '#fdf8f1',
  '--slot4-lavender': '#eef5fb',
  '--slot4-gray': '#f5f7fa',
  '--slot4-body-gradient': 'radial-gradient(circle at top left, rgba(129,166,198,0.16), transparent 26%), radial-gradient(circle at top right, rgba(243,227,208,0.85), transparent 24%), linear-gradient(180deg, #fbfcfe 0%, #f5f8fb 45%, #f8fafc 100%)',
  '--editable-border': 'rgba(16,35,61,0.1)',
  '--editable-container': '1280px',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent-fill)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/14',
  shadow: 'shadow-[0_24px_80px_rgba(16,35,61,0.08)]',
  shadowStrong: 'shadow-[0_30px_120px_rgba(16,35,61,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(16,35,61,0.06),rgba(16,35,61,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[240px] shrink-0 snap-start sm:w-[280px]',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle: 'text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-6xl lg:text-[5.8rem]',
    sectionTitle: 'text-4xl font-black leading-[0.95] tracking-[-0.07em] sm:text-5xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.panelBg} ${editablePalette.shadow}`,
    soft: `rounded-[1.75rem] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-full ${editablePalette.accentBg} px-7 py-3.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(11,101,216,0.22)]`,
    secondary: `inline-flex items-center justify-center rounded-full border ${editablePalette.border} bg-white px-7 py-3.5 text-sm font-black ${editablePalette.pageText} transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent-fill)]`,
    accent: `inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#81A6C6,#0b65d8)] px-7 py-3.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.6rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/5]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,35,61,0.16)]',
    fade: 'transition duration-300 hover:opacity-90',
  },
} as const

export const aiLayoutRules = [
  'Keep the whole redesign inside src/editable and preserve existing route/data contracts.',
  'Use the homepage sections file for major front-page composition changes.',
  'Prefer premium editorial spacing, airy grids, and contrast-rich typography.',
  'Vary card shapes and orientations across sections instead of repeating one template.',
  'Keep missing images, summaries, and categories safe with graceful fallbacks.',
] as const
