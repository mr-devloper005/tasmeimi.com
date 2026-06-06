'use client'

import { Building2, FileText, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: FileText, title: 'Document launches', body: 'Help with new PDF collections, summaries, and archive presentation.' },
  { icon: Building2, title: 'Publishing support', body: 'Questions about submission flow, organization, or keeping resources easy to browse.' },
  { icon: Phone, title: 'Partnership requests', body: 'Discuss collaborations, placements, or bulk publishing ideas.' },
  { icon: MapPin, title: 'Collection planning', body: 'Shape category lanes, resource shelves, or section-level organization.' },
  { icon: Sparkles, title: 'Site improvements', body: 'Share feedback about navigation, reading flow, or archive quality.' },
  { icon: Mail, title: 'General inquiries', body: 'Reach out about anything else and we will route it cleanly.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.08em] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {lanes.map((lane, index) => (
                <div key={lane.title} className={`rounded-[1.8rem] border border-[var(--editable-border)] p-5 shadow-[0_18px_60px_rgba(16,35,61,0.06)] ${index === 1 || index === 4 ? 'bg-[var(--slot4-page-text)] text-white' : 'bg-white/80'}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-4 text-xl font-black tracking-[-0.05em]">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${index === 1 || index === 4 ? 'text-white/72' : 'text-[var(--slot4-muted-text)]'}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-[var(--editable-border)] bg-white/84 p-7 shadow-[0_24px_80px_rgba(16,35,61,0.08)] lg:p-10">
            <h2 className="text-3xl font-black tracking-[-0.06em]">{pagesContent.contact.formTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">Tell us what you are publishing, updating, or planning. Short notes are fine.</p>
            <div className="mt-6">
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
