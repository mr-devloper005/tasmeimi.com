import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { buildPostUrl, fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { DocumentCard, getEditableExcerpt, getEditablePostImage, getEditableCategory, ImageFirstCard } from '@/editable/cards/PostCards'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; badge: string; summary: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 lg:grid-cols-2', badge: 'Read', summary: 'Editorial layouts that keep long-form posts readable and easy to scan.' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', badge: 'Business', summary: 'Directory-style cards with location, service context, and trust cues.' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', badge: 'Notice', summary: 'Fast, practical posts that surface urgency and clear next steps.' },
  image: { icon: Camera, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', badge: 'Visual', summary: 'Image-led browsing with stronger rhythm and lighter support copy.' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', badge: 'Saved', summary: 'Curated resource cards designed for quick scanning and return visits.' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', badge: 'PDF', summary: 'Document cards that prioritize file context, preview intent, and trust.' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', badge: 'Profile', summary: 'Identity-led cards that keep people, brands, and sources recognizable.' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': preset.colors.background, '--archive-text': preset.colors.foreground, '--archive-surface': preset.colors.surface, '--archive-accent': preset.colors.accent } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const featured = posts[0]
  const spotlight = posts.slice(1, 4)

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 rounded-[2.7rem] border border-[var(--editable-border)] bg-white/82 p-6 shadow-[0_24px_80px_rgba(16,35,61,0.08)] backdrop-blur lg:grid-cols-[1.02fr_0.98fr] lg:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--archive-accent)]"><Icon className="h-4 w-4" /> {voice.eyebrow}</div>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl">{voice.headline}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{voice.description}</p>
              <div className="mt-6 rounded-[1.6rem] border border-[var(--editable-border)] bg-[#f8fbfe] p-4 text-sm font-semibold leading-7 text-[var(--slot4-muted-text)]">{deck.summary}</div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={basePath} className="rounded-full bg-[var(--archive-text)] px-5 py-3 text-sm font-black text-white">Browse all</Link>
                <Link href="/search" className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Search archive</Link>
              </div>
            </div>

            <div className="grid gap-5">
              <form action={basePath} className="rounded-[1.9rem] border border-[var(--editable-border)] bg-[#f8fbfe] p-5">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-page-text)]/45"><Filter className="h-4 w-4" /> Filter</div>
                <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-2xl border border-[var(--editable-border)] bg-white px-4 text-sm font-bold outline-none">
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                <button className="mt-3 h-12 w-full rounded-2xl bg-[var(--archive-text)] text-sm font-black text-white">Apply</button>
                <p className="mt-3 text-xs font-bold text-[var(--slot4-muted-text)]">Showing: {categoryLabel}</p>
              </form>

              {featured ? (
                <Link href={`${basePath}/${featured.slug}` || buildPostUrl(task, featured.slug)} className="group overflow-hidden rounded-[1.9rem] border border-[var(--editable-border)] bg-[var(--archive-text)] text-white shadow-[0_18px_60px_rgba(16,35,61,0.14)]">
                  <div className="grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative min-h-[220px] bg-black/20">
                      <img src={getEditablePostImage(featured)} alt={featured.title} className="absolute inset-0 h-full w-full object-cover opacity-76 transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/68">Featured {deck.badge}</p>
                      <h2 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.05em]">{featured.title}</h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/72">{getEditableExcerpt(featured, 120)}</p>
                    </div>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        {!!spotlight.length && (
          <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-3">
              {spotlight.map((post, index) => (
                <Link key={post.id || post.slug} href={`${basePath}/${post.slug}` || buildPostUrl(task, post.slug)} className="rounded-[1.7rem] border border-[var(--editable-border)] bg-white/82 p-5 shadow-[0_18px_50px_rgba(16,35,61,0.06)] transition duration-300 hover:-translate-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{deck.badge} {index + 1}</p>
                  <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 95)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-white/70 p-10 text-center">
              <Search className="mx-auto h-8 w-8 opacity-45" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-full bg-[var(--archive-text)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageFirstCard post={post} href={href} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <DocumentCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[0_18px_50px_rgba(16,35,61,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(16,35,61,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">{getEditableCategory(post)}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getEditablePostImage(post)
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_18px_50px_rgba(16,35,61,0.08)] transition duration-300 hover:-translate-y-1 sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[var(--slot4-media-bg)] ring-1 ring-[var(--editable-border)]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 opacity-45" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--slot4-page-text)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[var(--editable-border)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 130)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold text-[var(--slot4-muted-text)] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[0_18px_50px_rgba(16,35,61,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--slot4-page-text)] p-5 text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.07em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold text-white/75">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 140)}</p>
        </div>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.7rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_18px_50px_rgba(16,35,61,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--slot4-page-text)] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-75">{getEditableExcerpt(post, 130)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getEditablePostImage(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 text-center shadow-[0_18px_50px_rgba(16,35,61,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-media-bg)] ring-1 ring-[var(--editable-border)]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 opacity-45" />}
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
    </Link>
  )
}
