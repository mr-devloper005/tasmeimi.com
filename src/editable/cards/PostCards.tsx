import Link from 'next/link'
import { ArrowRight, Clock3, Download, FileText, Image as ImageIcon } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const hero = typeof content.image === 'string' ? content.image : ''
  const featured = typeof content.featuredImage === 'string' ? content.featuredImage : ''
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || hero || featured || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured document' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="grid min-h-[420px] gap-6 p-4 sm:p-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div className={`${dc.media.frame} min-h-[320px] lg:min-h-[420px]`}>
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,61,0.02),rgba(16,35,61,0.64))]" />
          <div className="absolute left-5 top-5 rounded-full bg-white/88 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--slot4-page-text)]">
            {label}
          </div>
          <div className="absolute bottom-5 left-5 rounded-[1.4rem] border border-white/25 bg-black/55 px-4 py-3 text-white backdrop-blur">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Live preview</p>
            <p className="mt-1 text-sm font-bold">Open detail and continue reading</p>
          </div>
        </div>
        <div className="rounded-[1.9rem] border border-[var(--editable-border)] bg-[rgba(247,251,255,0.86)] p-6">
          <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
          <h3 className="mt-4 text-3xl font-black leading-[0.95] tracking-[-0.07em] text-[var(--slot4-page-text)] sm:text-4xl">{post.title}</h3>
          <p className="mt-5 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-sm font-black text-white">
            Open page <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-[1.9rem] border ${pal.border} bg-white shadow-[0_18px_48px_rgba(16,35,61,0.08)] ${dc.motion.lift}`}>
      <div className="relative aspect-[5/6] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(16,35,61,0.82)_100%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/68">{getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
        </div>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 rounded-[1.55rem] border ${pal.border} bg-white p-5 shadow-[0_14px_32px_rgba(16,35,61,0.06)] ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-black text-[var(--slot4-page-text)]">{index + 1}</span>
        <div className="min-w-0">
          <p className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] ${pal.accentText}`}><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden rounded-[2rem] border ${pal.border} bg-white p-4 shadow-[0_18px_50px_rgba(16,35,61,0.08)] ${dc.motion.lift} sm:grid-cols-[240px_minmax(0,1fr)]`}>
      <div className="relative aspect-[16/12] overflow-hidden rounded-[1.5rem] bg-[var(--slot4-media-bg)] sm:min-h-[220px] sm:aspect-auto">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 self-center p-2 sm:py-4 sm:pr-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">Read {String(index + 1).padStart(2, '0')}</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</span>
        </div>
        <h2 className="mt-4 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)] sm:text-[2rem]">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">Open article <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export function DocumentCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group block rounded-[1.9rem] border ${pal.border} bg-white p-6 shadow-[0_18px_50px_rgba(16,35,61,0.08)] ${dc.motion.lift}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.5rem] bg-[var(--slot4-page-text)] p-5 text-white"><FileText className="h-7 w-7" /></div>
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">{getEditableCategory(post)}</span>
      </div>
      <h3 className="mt-8 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 160)}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-accent-fill)]">View document <Download className="h-4 w-4" /></span>
    </Link>
  )
}

export function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden rounded-[1.95rem] border ${pal.border} bg-white shadow-[0_18px_50px_rgba(16,35,61,0.08)] ${dc.motion.lift}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
          <ImageIcon className="h-3.5 w-3.5" /> Visual
        </div>
        <h3 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
      </div>
    </Link>
  )
}
