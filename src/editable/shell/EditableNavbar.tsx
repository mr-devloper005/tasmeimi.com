'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      ...SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 6).map((task) => ({ label: task.label, href: task.route })),
      { label: 'Contact', href: '/contact' },
    ],
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/92 backdrop-blur-2xl">
      <div className="border-b border-[var(--editable-border)] bg-[linear-gradient(90deg,#8f1ed7,#c318b9,#f15b6c)] text-white">
        <div className="mx-auto flex min-h-12 max-w-[var(--editable-container)] items-center justify-center gap-2 px-4 text-center text-sm font-bold sm:px-6 lg:px-8">
          <span className="truncate">{globalContent.nav.announcement}</span>
          <Link href={globalContent.nav.announcementCta.href} className="inline-flex shrink-0 items-center gap-1 underline underline-offset-4">
            {globalContent.nav.announcementCta.label} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex min-h-[86px] max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="text-[2.15rem] font-black tracking-[-0.12em] text-[#0b65d8]">tas</span>
          <span className="hidden text-sm font-black uppercase tracking-[0.22em] text-[var(--slot4-page-text)]/55 sm:block">meimi</span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {navItems.slice(1, 7).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold transition ${active ? 'text-[var(--slot4-accent-fill)]' : 'text-[var(--slot4-page-text)]/72 hover:text-[var(--slot4-page-text)]'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="hidden xl:block">
          <label className="flex w-[250px] items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[rgba(247,248,251,0.9)] px-4 py-3">
            <Search className="h-4 w-4 text-[var(--slot4-page-text)]/45" />
            <input name="q" type="search" placeholder="Search PDFs or topics" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-current/35" />
          </label>
        </form>

        <div className="ml-auto hidden items-center gap-3 sm:flex">
          {session ? (
            <>
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(11,101,216,0.2)]">
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button type="button" onClick={logout} className="rounded-full bg-[#f1f5f9] px-4 py-3 text-sm font-black text-[var(--slot4-page-text)]">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full bg-[#f4f5f7] px-5 py-3 text-sm font-black text-[var(--slot4-page-text)]">
                <span className="inline-flex items-center gap-2"><LogIn className="h-4 w-4" /> Log in</span>
              </Link>
              <Link href="/signup" className="rounded-full bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(11,101,216,0.2)]">
                <span className="inline-flex items-center gap-2"><UserPlus className="h-4 w-4" /> Get started</span>
              </Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[var(--editable-border)] p-3 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-5 lg:hidden">
          <form action="/search" className="mb-4">
            <label className="flex items-center gap-2 rounded-[1.4rem] border border-[var(--editable-border)] bg-[rgba(247,248,251,0.9)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--slot4-page-text)]/45" />
              <input name="q" type="search" placeholder="Search PDFs or topics" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none" />
            </label>
          </form>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-[1.3rem] border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="rounded-[1.3rem] bg-[var(--slot4-accent-fill)] px-4 py-3 text-sm font-black text-white">
                  Create
                </Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-[1.3rem] border border-[var(--editable-border)] px-4 py-3 text-left text-sm font-black">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-[1.3rem] border border-[var(--editable-border)] px-4 py-3 text-sm font-black">
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-[1.3rem] bg-[var(--slot4-accent-fill)] px-4 py-3 text-sm font-black text-white">
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
