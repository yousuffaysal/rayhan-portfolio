'use client'

import type { JSX } from 'react'
import { motion } from 'framer-motion'
import { skillsData } from '@/data/portfolio'

const Icons: Record<string, () => JSX.Element> = {
  'Languages': () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Frontend': () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 9 5 3-5 3V9z"/>
    </svg>
  ),
  'Styling & UI': () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  'Backend': () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  'Database & Auth': () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  'Tools & DevOps': () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
}

const palette = [
  { accent: '#20b0f8', bg: 'rgba(32,176,248,0.08)',  border: 'rgba(32,176,248,0.2)' },
  { accent: '#a78bfa', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
  { accent: '#34d399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
  { accent: '#fbbf24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  { accent: '#f87171', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)'  },
  { accent: '#60a5fa', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
]

function SkillCard({ category, skills, index, span }: {
  category: string
  skills: { name: string; pct: number }[]
  index: number
  span?: 'half' | 'third' | 'full'
}) {
  const p = palette[index % palette.length]
  const Icon = Icons[category] ?? Icons['Languages']
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${p.border}`, transition: { duration: 0.25 } }}
      style={{
        position: 'relative',
        borderRadius: 20,
        padding: span === 'full' ? '36px 40px' : '36px 36px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: span === 'full' ? 'row' : 'column',
        alignItems: span === 'full' ? 'flex-start' : 'stretch',
        gap: span === 'full' ? 48 : 24,
        cursor: 'default',
        height: '100%',
        boxShadow: '0 4px 32px rgba(0,0,0,0.2)',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${p.accent}, ${p.accent}44, transparent)`,
      }} />

      {/* Ghost number */}
      <div style={{
        position: 'absolute', right: span === 'full' ? 32 : 24, top: 16,
        fontSize: span === 'full' ? 120 : 96, fontWeight: 900, lineHeight: 1,
        color: 'var(--text3)',
        fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {num}
      </div>

      {/* Left part (header for full-width, top for others) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
        zIndex: 1,
        flexShrink: 0,
        ...(span === 'full' ? { width: 220 } : {}),
      }}>
        {/* Icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: p.bg, color: p.accent,
            border: `1px solid ${p.border}`,
            boxShadow: `0 0 20px ${p.bg}`,
          }}>
            <Icon />
          </div>
          <div>
            <div style={{
              fontSize: 18, fontWeight: 800, color: 'var(--text)',
              fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
              letterSpacing: '-0.3px', lineHeight: 1.2,
            }}>
              {category}
            </div>
            <div style={{
              fontSize: 11.5, fontWeight: 600, marginTop: 4,
              color: p.accent, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {skills.length} skills
            </div>
          </div>
        </div>

        {/* Divider (only vertical for full-width card) */}
          <div style={{ height: 1, background: 'var(--border2)', borderRadius: 99 }} />
      </div>

      {/* Vertical divider for full-width card */}
      {span === 'full' && (
        <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--border2)', flexShrink: 0 }} />
      )}

      {/* Pills area */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        position: 'relative',
        zIndex: 1,
        flex: 1,
        alignContent: 'flex-start',
      }}>
        {skills.map(s => (
          <span
            key={s.name}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '9px 18px', borderRadius: 10,
              fontSize: 13.5, fontWeight: 500,
              color: 'var(--text2)',
              background: 'var(--surface2)',
              border: '1px solid var(--border2)',
              letterSpacing: '0.01em',
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              flexShrink: 0, background: p.accent,
              display: 'inline-block', boxShadow: `0 0 6px ${p.accent}88`,
            }} />
            {s.name}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--bg)' }}>
      {/* Full-width container — no max-width cap */}
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56 }}
        >
          <div className="sec-tag">What I work with</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="sec-h" style={{ marginBottom: 0 }}>Technical Skills</h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 400, paddingBottom: 4 }}>
              Technologies I use daily — battle-tested on real production projects. Each skill reflects genuine hands-on experience.
            </p>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Row 1: 3 equal cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="skills-row-1">
            {skillsData.slice(0, 3).map((cat, i) => (
              <SkillCard key={cat.category} category={cat.category} skills={cat.skills} index={i} span="third" />
            ))}
          </div>

          {/* Row 2: 2 equal cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="skills-row-2">
            {skillsData.slice(3, 5).map((cat, i) => (
              <SkillCard key={cat.category} category={cat.category} skills={cat.skills} index={i + 3} span="half" />
            ))}
          </div>

          {/* Row 3: Full-width horizontal card */}
          {skillsData.slice(5).map((cat, i) => (
            <SkillCard key={cat.category} category={cat.category} skills={cat.skills} index={i + 5} span="full" />
          ))}
        </div>

        {/* ── Stat strip ── */}
        <motion.div
          style={{ display: 'flex', gap: 16, marginTop: 56, flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { num: '3+', label: 'Years building' },
            { num: '5+', label: 'Production projects' },
            { num: '15+', label: 'Technologies used' },
          ].map(s => (
            <div
              key={s.label}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 28px', borderRadius: 14,
                background: 'rgba(32,176,248,0.05)',
                border: '1px solid rgba(32,176,248,0.14)',
              }}
            >
              <span style={{
                fontSize: 26, fontWeight: 900, color: 'var(--accent)',
                fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
              }}>
                {s.num}
              </span>
              <span style={{ fontSize: 14, color: 'var(--text2)', fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-row-1 { grid-template-columns: 1fr 1fr !important }
        }
        @media (max-width: 640px) {
          .skills-row-1, .skills-row-2 { grid-template-columns: 1fr !important }
        }
      `}</style>
    </section>
  )
}

