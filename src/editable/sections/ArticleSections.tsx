import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`

  return (
    <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
      <section className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 rounded-[2.5rem] border border-[var(--editable-border)] bg-white/82 p-7 shadow-[0_24px_80px_rgba(16,35,61,0.08)] lg:grid-cols-[1fr_340px] lg:p-10">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{voice.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl">{voice.headline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{voice.description}</p>
          </div>
          <form action={basePath} className="rounded-[1.9rem] border border-[var(--editable-border)] bg-[#f8fbfe] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--slot4-page-text)]/50">{voice.filterLabel}</p>
            <select name="category" defaultValue={category || 'all'} className="mt-4 h-12 w-full rounded-2xl border border-[var(--editable-border)] bg-white px-4 text-sm font-bold outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="mt-3 h-12 w-full rounded-2xl bg-[var(--slot4-page-text)] text-sm font-black text-white">Apply filters</button>
          </form>
        </div>

        <div className="mt-8 grid gap-5">
          {posts.length ? posts.map((post, index) => (
            <ArticleListCard key={post.id || post.slug} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />
          )) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-white/70 p-10 text-center">
              <h2 className="text-3xl font-black tracking-[-0.05em]">No articles found</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">Try another category or return to the full archive.</p>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
          <span className="rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
          {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article

  return (
    <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
      <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 rounded-[2.5rem] border border-[var(--editable-border)] bg-white/82 p-6 shadow-[0_24px_80px_rgba(16,35,61,0.08)] lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div className="min-w-0">
            <Link href="/article" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-black"><ChevronLeft className="h-4 w-4" /> Articles</Link>
            <p className="mt-8 text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{voice.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.08em] sm:text-5xl lg:text-7xl">{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
          </div>
          <aside className="rounded-[2rem] bg-[var(--slot4-page-text)] p-6 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/65">Reading note</p>
            <p className="mt-4 text-sm leading-7 text-white/78">{voice.secondaryNote}</p>
          </aside>
        </div>

        <div className="mt-6 rounded-[2rem] border border-[var(--editable-border)] bg-white/82 p-6 shadow-[0_24px_80px_rgba(16,35,61,0.08)] sm:p-8 lg:p-10">
          <p className="text-sm leading-8 text-[var(--slot4-muted-text)]">{post?.summary || `Article detail content for ${slug} will render through the editable detail page.`}</p>
        </div>
      </section>
    </main>
  )
}
