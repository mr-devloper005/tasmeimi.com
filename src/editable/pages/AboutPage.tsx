import { SITE_CONFIG } from '@/lib/site-config'
import Link from 'next/link'
import { ArrowRight, FileText, Layers3, ShieldCheck } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] px-4 py-14 text-[var(--slot4-page-text)] sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-[var(--editable-container)]">
          <div className="grid gap-8 rounded-[2.7rem] border border-[var(--editable-border)] bg-white/82 p-8 shadow-[0_24px_80px_rgba(16,35,61,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <article>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.08em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              <div className="mt-8 space-y-4 text-sm leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/pdf" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-black text-white">
                  Browse PDFs <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-black text-[var(--slot4-page-text)]">
                  Create account
                </Link>
              </div>
            </article>

            <div className="grid gap-4">
              <div className="rounded-[2rem] bg-[var(--slot4-page-text)] p-6 text-white shadow-[0_24px_60px_rgba(16,35,61,0.18)]">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/62">What the site is built for</p>
                <div className="mt-5 grid gap-4">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-1 h-5 w-5 text-[#aacddc]" />
                    <div>
                      <h2 className="text-lg font-black">Document-led publishing</h2>
                      <p className="mt-1 text-sm leading-7 text-white/72">Public PDFs, structured notes, and resource pages with cleaner presentation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Layers3 className="mt-1 h-5 w-5 text-[#f3e3d0]" />
                    <div>
                      <h2 className="text-lg font-black">Organized discovery</h2>
                      <p className="mt-1 text-sm leading-7 text-white/72">Multiple content types arranged so browsing still feels intentional and easy.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 text-[#81A6C6]" />
                    <div>
                      <h2 className="text-lg font-black">Trusted reading flow</h2>
                      <p className="mt-1 text-sm leading-7 text-white/72">Visitors can preview, compare, and open content without the usual archive clutter.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {pagesContent.about.values.map((value) => (
                  <div key={value.title} className="rounded-[1.8rem] border border-[var(--editable-border)] bg-white/76 p-6 shadow-[0_18px_60px_rgba(16,35,61,0.06)]">
                    <h2 className="text-2xl font-black tracking-[-0.05em]">{value.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
