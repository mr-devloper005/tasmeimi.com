'use client'

import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'

export function EditableShareUrlButton({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    if (!currentUrl) return

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentUrl)
      } else {
        const input = document.createElement('input')
        input.value = currentUrl
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2.5 text-sm font-black text-[var(--slot4-page-text)] transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent-fill)] ${className}`}
      aria-label="Copy page URL"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}
