'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  return (
    <footer className="border-t border-[var(--editable-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.92))]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2.4rem] border border-[var(--editable-border)] bg-[rgba(255,255,255,0.85)] p-8 shadow-[0_24px_80px_rgba(16,35,61,0.08)] lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <p className="text-[2rem] font-black tracking-[-0.1em] text-[#0b65d8]">tasmeimi</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/pdf" className="rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-black text-white">Browse PDFs</Link>
              <Link href="/create" className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black text-[var(--slot4-page-text)]">Create post</Link>
            </div>
          </div>

          
          {globalContent.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-page-text)]/45">{column.title}</h3>
              <div className="mt-4 grid gap-2">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm font-bold text-[var(--slot4-page-text)]/72 transition hover:text-[var(--slot4-page-text)]">
                    {link.label}
                  </Link>
                ))}
                {session ? <button type="button" onClick={logout} className="text-left text-sm font-bold text-[var(--slot4-page-text)]/72 transition hover:text-[var(--slot4-page-text)]">Log out</button> : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--slot4-page-text)]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{globalContent.footer.bottomNote}</p>
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
