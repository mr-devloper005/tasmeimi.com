import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { CompactIndexCard, DocumentCard, EditorialFeatureCard, getEditableExcerpt, getEditablePostImage, ImageFirstCard, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function Surface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[2rem] border border-[var(--editable-border)] bg-white/80 shadow-[0_24px_80px_rgba(16,35,61,0.08)] backdrop-blur ${className}`}>{children}</div>
}

function HeroMockup({ lead, secondary, primaryTask, primaryRoute }: { lead?: SitePost; secondary?: SitePost[]; primaryTask: TaskKey; primaryRoute: string }) {
  return (
    <div className="relative min-h-[420px] lg:min-h-[620px]">
      <div className="absolute left-[8%] top-[10%] h-40 w-40 rounded-[2.2rem] border border-[#f0d4ef] bg-white/40" />
      <div className="absolute right-[8%] top-[18%] h-28 w-52 rounded-[2rem] border border-[#c5dcf4] bg-white/35" />
      <div className="absolute left-[12%] top-[24%] h-[52%] w-[62%] rounded-[2.4rem] border border-[var(--editable-border)] bg-white shadow-[0_28px_100px_rgba(16,35,61,0.12)]">
        <div className="flex items-center gap-3 border-b border-[var(--editable-border)] px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[#0b65d8] text-lg font-black text-white">T</div>
          <div className="flex-1 rounded-full border border-[var(--editable-border)] bg-[#f7f9fc] px-4 py-3 text-sm font-semibold text-[var(--slot4-muted-text)]">
            Search documents, titles, or subjects
          </div>
        </div>
        <div className="grid gap-4 p-5 lg:grid-cols-[220px_1fr]">
          <div className="rounded-[1.6rem] bg-[#0b65d8] p-4 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Library</p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-[1rem] bg-white/10 p-3 text-sm font-bold">All files</div>
              <div className="rounded-[1rem] bg-white/10 p-3 text-sm font-bold">Featured PDFs</div>
              <div className="rounded-[1rem] bg-white/10 p-3 text-sm font-bold">Collections</div>
              <div className="rounded-[1rem] bg-white/10 p-3 text-sm font-bold">Saved notes</div>
            </div>
          </div>
          <div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[lead, ...(secondary || []).slice(0, 2)].filter(Boolean).map((post, index) => (
                <Link
                  key={`${post?.id || post?.slug}-${index}`}
                  href={post ? postHref(primaryTask, post, primaryRoute) : primaryRoute}
                  className="block rounded-[1.4rem] border border-[var(--editable-border)] bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,35,61,0.12)]"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-[var(--slot4-media-bg)]">
                    <img src={getEditablePostImage(post)} alt={post?.title || ''} className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm font-black leading-5 text-[var(--slot4-page-text)]">{post?.title || 'Featured file'}</p>
                </Link>
              ))}
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-[var(--editable-border)] bg-[#fbfdff] p-4">
              <p className="text-sm font-black text-[var(--slot4-page-text)]">How can we surface the right document faster?</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#edc4ff] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#c044d5]">Library assistant</span>
                <span className="rounded-full bg-[var(--slot4-accent-fill)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">Share ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[8%] left-[2%] rounded-[1.5rem] border border-[var(--editable-border)] bg-white px-4 py-3 shadow-[0_20px_50px_rgba(16,35,61,0.12)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]/55">Workflow</p>
        <p className="mt-1 text-sm font-bold text-[var(--slot4-page-text)]">Upload, annotate, publish.</p>
      </div>
      <div className="absolute right-[3%] top-[56%] rounded-full bg-[#f09e34] px-4 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(240,158,52,0.34)]">
        Live collection
      </div>
    </div>
  )
}

function SplitFeature({ title, body, cta, posts, primaryTask, primaryRoute, reverse = false }: { title: string; body: string; cta: string; posts: SitePost[]; primaryTask: TaskKey; primaryRoute: string; reverse?: boolean }) {
  const [hero, sideA, sideB] = posts
  return (
    <section className={dc.shell.sectionY}>
      <div className={`mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <h2 className={dc.type.sectionTitle}>{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-9 text-[var(--slot4-muted-text)]">{body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={dc.button.primary}>{cta}</Link>
            <Link href="/search" className="inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-accent-fill)]">Watch the flow <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="relative">
          <Surface className="p-6">
            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <Link
                href={hero ? postHref(primaryTask, hero, primaryRoute) : primaryRoute}
                className="block rounded-[1.8rem] border border-[var(--editable-border)] bg-[#fbfdff] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,35,61,0.12)]"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[1.3rem] bg-[var(--slot4-media-bg)]">
                  <img src={getEditablePostImage(hero)} alt={hero?.title || ''} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{hero?.title || 'Featured document'}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(hero, 120)}</p>
              </Link>
              <div className="grid gap-4">
                {[sideA, sideB].filter(Boolean).map((post, index) => (
                  <Link
                    key={`${post?.id || post?.slug}-${index}`}
                    href={post ? postHref(primaryTask, post, primaryRoute) : primaryRoute}
                    className="block rounded-[1.4rem] border border-[var(--editable-border)] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,35,61,0.12)]"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">{index === 0 ? 'Assist' : 'Extract'}</p>
                    <h4 className="mt-2 text-lg font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post?.title || 'Secondary note'}</h4>
                    <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 72)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Surface>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title
  const [lead, ...rest] = posts
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,250,253,0.96))]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.home.hero.badge}</p>
            <h1 className="mt-6 max-w-xl text-5xl font-black leading-[0.9] tracking-[-0.09em] text-[var(--slot4-page-text)] sm:text-6xl lg:text-[6.2rem]">
              {heroTitle[0]} <span className="bg-[linear-gradient(90deg,#e2a93d,#cc66d7,#2d93ff)] bg-clip-text text-transparent">{heroTitle[1]}</span> {heroTitle[2]}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={primaryRoute} className={dc.button.primary}>Get started <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className={dc.button.secondary}>Contact us</Link>
            </div>
          </div>
          <HeroMockup lead={lead} secondary={rest} primaryTask={primaryTask} primaryRoute={primaryRoute} />
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 10)
  if (!railPosts.length) return null
  return (
    <section className="border-t border-[var(--editable-border)] bg-white/55">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-center text-base font-medium text-[var(--slot4-muted-text)] sm:text-lg">
            Built for teams, independent uploaders, and readers who want documents to feel easier to browse.
          </p>
          <Link href={primaryRoute} className="text-sm font-black text-[var(--slot4-accent-fill)]">See all {taskLabel(primaryTask).toLowerCase()}</Link>
        </div>
        <div className="mt-8">
          <div className={dc.layout.rail}>
            {railPosts.map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const [featured, ...rest] = posts
  if (!featured) return null
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <EditorialFeatureCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} />
        
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts)
  const working = (categoryPosts.length ? categoryPosts : posts).slice(0, 12)
  const docPosts = working.slice(0, 3)
  const galleryPosts = working.slice(3, 6)
  const indexPosts = working.slice(6, 12)

  return (
    <>
      <SplitFeature
        title="Collaborate around documents with less friction."
        body="Uploaders and readers need more than a file link. They need summaries, context, and a layout that makes each resource feel trustworthy at a glance."
        cta="Explore collaboration"
        posts={docPosts}
        primaryTask={primaryTask}
        primaryRoute={primaryRoute}
      />

      <SplitFeature
        title="Extract the useful part faster."
        body="The strongest document pages surface the headline, the supporting preview, and the related resources without making people work through clutter first."
        cta="Open the archive"
        posts={working.slice(2, 5)}
        primaryTask={primaryTask}
        primaryRoute={primaryRoute}
        reverse
      />

      <section className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">Discover by format</p>
            <h2 className={dc.type.sectionTitle}>A homepage that feels alive, not repeated.</h2>
            <p className="mt-5 max-w-lg text-lg leading-9 text-[var(--slot4-muted-text)]">
              Different cards help different posts. Documents can feel structured, image posts can stay visual, and editorial notes can breathe.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {docPosts.map((post) => <DocumentCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
            {galleryPosts.map((post) => <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {indexPosts.map((post, index) => <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index + 1} />)}
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,255,255,0.84))]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Surface className="overflow-hidden p-8 sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]"><Sparkles className="h-4 w-4" /> {pagesContent.home.cta.badge}</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.07em] text-[var(--slot4-page-text)] sm:text-5xl">{pagesContent.home.cta.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.home.cta.description}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={pagesContent.home.cta.primaryCta.href} className={dc.button.primary}><FileText className="h-4 w-4" /> {pagesContent.home.cta.primaryCta.label}</Link>
              <Link href={pagesContent.home.cta.secondaryCta.href} className={dc.button.secondary}>{pagesContent.home.cta.secondaryCta.label}</Link>
            </div>
          </div>
        </Surface>
      </div>
    </section>
  )
}
