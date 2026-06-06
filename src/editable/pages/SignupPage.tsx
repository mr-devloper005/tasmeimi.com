import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, FileText, LayoutGrid, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-text)] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#aacddc]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-2xl text-5xl font-black leading-[0.94] tracking-[-0.08em] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">{pagesContent.auth.signup.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.08] p-5">
                <FileText className="h-5 w-5 text-[#f3e3d0]" />
                <h3 className="mt-4 text-lg font-black">Save drafts</h3>
                <p className="mt-2 text-sm leading-7 text-white/65">Build document posts before they are ready to publish.</p>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.08] p-5">
                <LayoutGrid className="h-5 w-5 text-[#aacddc]" />
                <h3 className="mt-4 text-lg font-black">Organize content</h3>
                <p className="mt-2 text-sm leading-7 text-white/65">Work across PDFs, articles, visuals, and support pages.</p>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.08] p-5">
                <Sparkles className="h-5 w-5 text-[#81A6C6]" />
                <h3 className="mt-4 text-lg font-black">Publish cleaner</h3>
                <p className="mt-2 text-sm leading-7 text-white/65">Keep every upload inside a more polished reading experience.</p>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/55">Inside your workspace</p>
              <div className="mt-4 grid gap-3">
                {['Create local account access', 'Save drafts and post details', 'Return later and continue publishing'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold text-white/74">
                    <CheckCircle2 className="h-4 w-4 text-[#aacddc]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.08] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/65">Already have an account? <Link href="/login" className="font-black text-white underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
