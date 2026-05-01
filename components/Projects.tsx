'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '@/data/portfolio'
import { ease } from '@/lib/animations'

type Project = (typeof projectsData)[number]

// ─── Modal ──────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div className="modal" initial={{ opacity: 0, y: 60, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.96 }} transition={{ duration: 0.45, ease }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {/* Hero image */}
        <div style={{ position: 'relative', width: '100%', height: 260, overflow: 'hidden', flexShrink: 0 }}>
          <img src={project.screenshot ?? ''} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(10,12,20,0.96) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 28, right: 28 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {project.tags.map(t => <span className="proj-tag" key={t}>{t}</span>)}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif", lineHeight: 1.2 }}>{project.name}</div>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-desc">{project.fullDesc}</div>
          <div className="modal-section-title">Tech Stack</div>
          <div className="modal-tech-chips">{project.tech.map(t => <span className="modal-tech-chip" key={t}>{t}</span>)}</div>
          <div className="modal-section-title">Challenges Faced</div>
          <ul className="modal-list">{project.challenges.map(c => <li key={c}>{c}</li>)}</ul>
          <div className="modal-section-title">Future Improvements</div>
          <ul className="modal-list">{project.future.map(f => <li key={f}>{f}</li>)}</ul>
          <div className="modal-links">
            {project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-fill btn-sm">Live Demo ↗</a>}
            {project.ghClientUrl !== '#' && <a href={project.ghClientUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">GitHub (Client) →</a>}
            {project.ghServerUrl !== '#' && <a href={project.ghServerUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">GitHub (Server) →</a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Row Card ────────────────────────────────────────────────────────────────
function ProjectRow({ p, index, onView }: { p: Project; index: number; onView: () => void }) {
  const isEven = index % 2 === 0
  const accentColors = ['#20b0f8', '#a78bfa', '#34d399', '#fbbf24', '#f87171']
  const accent = accentColors[index % accentColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        borderRadius: 24,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 48px rgba(0,0,0,0.25)',
        direction: isEven ? 'ltr' : 'rtl',  // alternates image side
      }}
    >
      {/* ── Image side ── */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 340,
          direction: 'ltr',
        }}
      >
        <img
          src={p.screenshot ?? ''}
          alt={`${p.name} preview`}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {/* Gradient on the side that blends into the description */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isEven
            ? 'linear-gradient(to right, transparent 60%, rgba(8,10,18,0.85) 100%)'
            : 'linear-gradient(to left, transparent 60%, rgba(8,10,18,0.85) 100%)',
        }} />
        {/* Top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)` }} />
        {/* Featured badge */}
        {p.tags.includes('Featured') && (
          <div style={{
            position: 'absolute', top: 16, left: 16,
            padding: '4px 14px', borderRadius: 99,
            fontSize: 10.5, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
            background: accent, color: '#000',
          }}>★ Featured</div>
        )}
        {/* Project number */}
        <div style={{
          position: 'absolute', bottom: 16, right: 20,
          fontSize: 64, fontWeight: 900, lineHeight: 1,
          color: 'rgba(255,255,255,0.06)',
          fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif",
          userSelect: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* ── Description side ── */}
      <div style={{
        padding: '48px 52px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
        direction: 'ltr',
        position: 'relative',
      }}>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {p.tags.filter(t => t !== 'Featured').map(t => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 99,
              color: accent, background: `${accent}18`, border: `1px solid ${accent}33`,
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>{t}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 26, fontWeight: 800, color: 'rgba(255,255,255,0.95)',
          fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif",
          letterSpacing: '-0.5px', lineHeight: 1.2, margin: 0,
        }}>
          {p.name}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, margin: 0 }}>
          {p.desc}
        </p>

        {/* Tech stack row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {p.tech.slice(0, 5).map(t => (
            <span key={t} style={{
              fontSize: 12, fontWeight: 500, padding: '4px 12px', borderRadius: 8,
              color: 'rgba(255,255,255,0.55)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}>{t}</span>
          ))}
          {p.tech.length > 5 && (
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', paddingTop: 4 }}>+{p.tech.length - 5} more</span>
          )}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <button
            onClick={onView}
            style={{
              padding: '12px 28px', borderRadius: 12, fontSize: 14, fontWeight: 700,
              background: accent, color: '#000', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}
          >
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {p.liveUrl !== '#' && (
            <a
              href={p.liveUrl} target="_blank" rel="noreferrer"
              style={{
                padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600,
                background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.12)',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Site
            </a>
          )}

          {p.ghClientUrl !== '#' && (
            <a
              href={p.ghClientUrl} target="_blank" rel="noreferrer"
              style={{
                padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600,
                background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.12)',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <section id="projects" style={{ background: 'var(--bg2)' }}>
        <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 64 }}
          >
            <div>
              <div className="sec-tag">Featured Work</div>
              <h2 className="sec-h" style={{ marginBottom: 0 }}>Projects that <span style={{ color: 'var(--accent)' }}>matter</span></h2>
            </div>
            <a href="https://github.com/Rayhan-50" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ marginBottom: 8 }}>
              All on GitHub →
            </a>
          </motion.div>

          {/* Row-wise project list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {projectsData.map((p, i) => (
              <ProjectRow key={p.id} p={p} index={i} onView={() => setActive(p)} />
            ))}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          [data-proj-row] { grid-template-columns: 1fr !important; direction: ltr !important }
        }
      `}</style>
    </>
  )
}
