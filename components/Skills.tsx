'use client'

import type { JSX } from 'react'
import { motion } from 'framer-motion'
import { skillsData } from '@/data/portfolio'

const Icons: Record<string, () => JSX.Element> = {
  'Languages': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Frontend': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 9 5 3-5 3V9z"/>
    </svg>
  ),
  'Styling & UI': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  'Backend': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  'Database & Auth': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  'Tools & DevOps': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
}

const palette = [
  { accent: '#20b0f8', bg: 'rgba(32,176,248,0.09)',  border: 'rgba(32,176,248,0.22)', glow: 'rgba(32,176,248,0.06)' },
  { accent: '#a78bfa', bg: 'rgba(167,139,250,0.09)', border: 'rgba(167,139,250,0.22)', glow: 'rgba(167,139,250,0.06)' },
  { accent: '#34d399', bg: 'rgba(52,211,153,0.09)',  border: 'rgba(52,211,153,0.22)',  glow: 'rgba(52,211,153,0.06)'  },
  { accent: '#fbbf24', bg: 'rgba(251,191,36,0.09)',  border: 'rgba(251,191,36,0.22)',  glow: 'rgba(251,191,36,0.06)'  },
  { accent: '#f87171', bg: 'rgba(248,113,113,0.09)', border: 'rgba(248,113,113,0.22)', glow: 'rgba(248,113,113,0.06)' },
  { accent: '#60a5fa', bg: 'rgba(96,165,250,0.09)',  border: 'rgba(96,165,250,0.22)',  glow: 'rgba(96,165,250,0.06)'  },
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -6,
        borderColor: p.border,
        boxShadow: `0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px ${p.border}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        transition: { duration: 0.28 },
      }}
      style={{
        position: 'relative',
        borderRadius: 28,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        height: '100%',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      className={span === 'full' ? 'lg:!flex-row lg:items-start' : ''}
    >
      {/* Top accent bar — thicker with glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${p.accent}, ${p.accent}66, transparent 70%)`,
        boxShadow: `0 0 12px ${p.accent}55`,
      }} />

      {/* Corner ambient glow */}
      <div style={{
        position: 'absolute', bottom: -60, right: -60,
        width: 260, height: 260, borderRadius: '50%',
        background: `radial-gradient(circle, ${p.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Ghost number — dramatic */}
      <div style={{
        position: 'absolute', right: 28, top: 20,
        fontSize: 'clamp(72px, 9vw, 110px)',
        fontWeight: 900,
        lineHeight: 1,
        color: p.accent,
        opacity: 0.05,
        userSelect: 'none',
        pointerEvents: 'none',
        fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
        letterSpacing: '-4px',
      }}>
        {num}
      </div>

      {/* ── Card content — padded inner shell ── */}
      <div style={{
        padding: 'clamp(28px, 4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        flex: 1,
      }}
        className={span === 'full' ? 'lg:flex-row lg:gap-14 lg:items-start' : ''}
      >
        {/* Header block */}
        <div className={`flex flex-col gap-5 relative z-10 flex-shrink-0 ${span === 'full' ? 'lg:w-[240px]' : ''}`}>
          {/* Icon + title */}
          <div className="flex items-start gap-5">
            {/* Icon box */}
            <div style={{
              width: 60, height: 60, borderRadius: 18, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: p.bg, color: p.accent,
              border: `1px solid ${p.border}`,
              boxShadow: `0 0 0 6px ${p.glow}, 0 8px 24px ${p.bg}`,
            }}>
              <Icon />
            </div>
            <div style={{ paddingTop: 4 }}>
              <div style={{
                fontSize: 'clamp(16px, 2vw, 21px)',
                fontWeight: 800,
                color: 'var(--text)',
                letterSpacing: '-0.4px',
                lineHeight: 1.2,
                fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
              }}>
                {category}
              </div>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                marginTop: 6,
                color: p.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontFamily: "var(--font-m), 'DM Mono', monospace",
              }}>
                {skills.length} technologies
              </div>
            </div>
          </div>

          {/* Separator */}
          <div style={{
            height: 1,
            background: `linear-gradient(90deg, ${p.border}, transparent)`,
            borderRadius: 99,
          }} />

          {/* Category descriptor */}
          <p style={{
            fontSize: 13,
            color: 'var(--text3)',
            lineHeight: 1.7,
            fontStyle: 'italic',
          }}>
            {categoryDesc[category] ?? 'Core tools in my stack.'}
          </p>
        </div>

        {/* Vertical divider for full-width — desktop only */}
        {span === 'full' && (
          <div className="hidden lg:block flex-shrink-0" style={{
            width: 1,
            alignSelf: 'stretch',
            background: `linear-gradient(to bottom, transparent, ${p.border}, transparent)`,
          }} />
        )}

        {/* Pills grid */}
        <div className="flex flex-wrap gap-3 relative z-10 flex-1" style={{ alignContent: 'flex-start' }}>
          {skills.map((s, si) => (
            <motion.span
              key={s.name}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 + si * 0.05 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 18px',
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text2)',
                background: 'var(--surface2)',
                border: '1px solid var(--border2)',
                cursor: 'default',
                transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s',
                letterSpacing: '0.01em',
              }}
              className="skill-pill"
              data-accent={p.accent}
            >
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                flexShrink: 0, background: p.accent,
                display: 'inline-block',
                boxShadow: `0 0 8px ${p.accent}99`,
              }} />
              {s.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const categoryDesc: Record<string, string> = {
  'Languages':      'The foundations — typed, expressive, and performant.',
  'Frontend':       'Building fast, interactive UIs users love.',
  'Styling & UI':   'Pixel-perfect design systems and animations.',
  'Backend':        'Scalable APIs and server-side architecture.',
  'Database & Auth': 'Data modeling, queries, and secure auth flows.',
  'Tools & DevOps': 'Ship confidently with modern tooling.',
}

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--bg)' }}>
      <div style={{ padding: '0 clamp(20px, 4vw, 72px)' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2vw, 22px)' }}>

          {/* Row 1 — 3 equal cards */}
          <div className="skills-row-3">
            {skillsData.slice(0, 3).map((cat, i) => (
              <SkillCard key={cat.category} category={cat.category} skills={cat.skills} index={i} span="third" />
            ))}
          </div>

          {/* Row 2 — 2 half cards */}
          <div className="skills-row-2">
            {skillsData.slice(3, 5).map((cat, i) => (
              <SkillCard key={cat.category} category={cat.category} skills={cat.skills} index={i + 3} span="half" />
            ))}
          </div>

          {/* Row 3 — full-width */}
          {skillsData.slice(5).map((cat, i) => (
            <SkillCard key={cat.category} category={cat.category} skills={cat.skills} index={i + 5} span="full" />
          ))}
        </div>

        {/* ── Stat strip ── */}
        <motion.div
          style={{ display: 'flex', gap: 12, marginTop: 64, flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { num: '3+',  label: 'Years building' },
            { num: '5+',  label: 'Production projects' },
            { num: '15+', label: 'Technologies used' },
          ].map(s => (
            <div
              key={s.label}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 32px', borderRadius: 16,
                background: 'rgba(32,176,248,0.05)',
                border: '1px solid rgba(32,176,248,0.14)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <span style={{
                fontSize: 30, fontWeight: 900, color: 'var(--accent)',
                fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
                letterSpacing: '-1px',
              }}>
                {s.num}
              </span>
              <span style={{ fontSize: 14, color: 'var(--text2)', fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        .skills-row-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 2vw, 22px);
        }
        .skills-row-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(14px, 2vw, 22px);
        }
        @media (max-width: 960px) {
          .skills-row-3 { grid-template-columns: 1fr 1fr }
        }
        @media (max-width: 640px) {
          .skills-row-3, .skills-row-2 { grid-template-columns: 1fr }
        }
        .skill-pill:hover {
          border-color: var(--border2);
          box-shadow: 0 0 0 1px var(--border2);
        }
      `}</style>
    </section>
  )
}
