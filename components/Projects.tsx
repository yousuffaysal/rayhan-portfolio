'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '@/data/portfolio'
import { ease } from '@/lib/animations'

type Project = (typeof projectsData)[number]

const STICKY_OFFSET = 32
const cardAccents = ['#20b0f8', '#a78bfa', '#34d399', '#fbbf24', '#f87171']
const cardGlows   = [
  'rgba(32,176,248,0.06)',
  'rgba(167,139,250,0.06)',
  'rgba(52,211,153,0.06)',
  'rgba(251,191,36,0.06)',
  'rgba(248,113,113,0.06)',
]
const cardBorders = [
  'rgba(32,176,248,0.22)',
  'rgba(167,139,250,0.22)',
  'rgba(52,211,153,0.22)',
  'rgba(251,191,36,0.22)',
  'rgba(248,113,113,0.22)',
]

// ─── Modal ──────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, accent }: { project: Project; onClose: () => void; accent: string }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  const accentBg     = `${accent}15`
  const accentBorder = `${accent}35`

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(14px)',
        zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 28px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 56, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 0.45, ease }}
        style={{
          position: 'relative',
          width: '100%', maxWidth: 860,
          maxHeight: '92vh', overflowY: 'auto',
          borderRadius: 28,
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${accentBorder}, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '28px 28px 0 0',
          background: `linear-gradient(90deg, ${accent}, ${accent}66, transparent 70%)`,
          boxShadow: `0 0 14px ${accent}55`,
        }} />

        {/* Close btn */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--surface2)', border: '1px solid var(--border2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: 'var(--text2)', cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
        >✕</button>

        {/* Screenshot */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(200px,30vh,280px)', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={project.screenshot ?? ''}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, var(--bg2) 100%)` }} />
          <div style={{ position: 'absolute', bottom: 24, left: 28, right: 60 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {project.tags.map(t => (
                <span key={t} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '5px 14px', borderRadius: 99,
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: accent, background: accentBg, border: `1px solid ${accentBorder}`,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, display: 'inline-block', boxShadow: `0 0 5px ${accent}` }} />
                  {t}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: 'var(--text)', fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif", letterSpacing: '-0.5px' }}>
              {project.name}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 'clamp(24px,4vw,44px)' }}>
          <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.85, marginBottom: 32 }}>
            {project.fullDesc}
          </p>

          {/* Tech stack */}
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: accent, marginBottom: 14, fontFamily: "var(--font-m),'DM Mono',monospace" }}>
            Tech Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 32 }}>
            {project.tech.map((t, ti) => (
              <span key={t} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 16px', borderRadius: 12,
                fontSize: 13.5, fontWeight: 500,
                color: 'var(--text2)', background: 'var(--surface2)', border: '1px solid var(--border2)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: cardAccents[ti % cardAccents.length], display: 'inline-block', boxShadow: `0 0 7px ${cardAccents[ti % cardAccents.length]}99` }} />
                {t}
              </span>
            ))}
          </div>

          {/* Challenges */}
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: accent, marginBottom: 14, fontFamily: "var(--font-m),'DM Mono',monospace" }}>
            Challenges Faced
          </div>
          <ul style={{ paddingLeft: 0, margin: '0 0 32px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {project.challenges.map(c => (
              <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'var(--text2)', lineHeight: 1.75 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, flexShrink: 0, marginTop: 7, boxShadow: `0 0 7px ${accent}99` }} />
                {c}
              </li>
            ))}
          </ul>

          {/* CTA links */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-fill" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Live Demo
              </a>
            )}
            {project.ghClientUrl !== '#' && (
              <a href={project.ghClientUrl} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                Frontend
              </a>
            )}
            {project.ghServerUrl !== '#' && (
              <a href={project.ghServerUrl} target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 22px', borderRadius: 99,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  color: accent, background: `${accent}14`, border: `1.5px solid ${accent}40`,
                  textDecoration: 'none', transition: '0.25s',
                  fontFamily: "var(--font-b),'Instrument Sans',sans-serif",
                  letterSpacing: '0.02em',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                Backend
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const activeAccent = active ? cardAccents[active.id % cardAccents.length] : '#20b0f8'

  return (
    <>
      <section id="projects" style={{ background: 'var(--bg)', paddingBottom: '28vh' }}>
        <div style={{ padding: '0 clamp(20px, 4vw, 72px)' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 72 }}
          >
            <div className="sec-tag">Portfolio</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <h2 className="sec-h" style={{ marginBottom: 0 }}>
                Featured <span style={{ color: 'var(--accent)' }}>Projects</span>
              </h2>
              <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 380, paddingBottom: 4 }}>
                Production apps built with real users, real traffic, and real constraints.
              </p>
            </div>
          </motion.div>

          {/* Sticky card stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {projectsData.map((p, i) => {
              const accent       = cardAccents[i % cardAccents.length]
              const accentGlow   = cardGlows[i % cardGlows.length]
              const accentBorder = cardBorders[i % cardBorders.length]
              const accentBg     = `${accent}13`
              const isEven       = i % 2 === 0

              return (
                <div
                  key={p.id}
                  style={{
                    position: 'sticky',
                    top: 80 + i * STICKY_OFFSET,
                    zIndex: i + 1,
                    marginBottom: i === projectsData.length - 1 ? 0 : '48vh',
                    width: '100%',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 52 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActive(p)}
                    style={{
                      position: 'relative',
                      borderRadius: 32,
                      overflow: 'hidden',
                      background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
                      backdropFilter: 'blur(28px)',
                      border: '1px solid var(--border)',
                      boxShadow: '0 32px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      minHeight: 580,
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    className="proj-card-grid"
                    whileHover={{
                      borderColor: accentBorder,
                      boxShadow: `0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px ${accentBorder}, inset 0 1px 0 rgba(255,255,255,0.09)`,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Top accent bar */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 10,
                      background: `linear-gradient(90deg, ${accent}, ${accent}66, transparent 70%)`,
                      boxShadow: `0 0 14px ${accent}55`,
                    }} />

                    {/* Corner ambient glow */}
                    <div style={{
                      position: 'absolute', bottom: -80, right: -80,
                      width: 360, height: 360, borderRadius: '50%',
                      background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`,
                      pointerEvents: 'none', zIndex: 0,
                    }} />

                    {/* Project index ghost */}
                    <div style={{
                      position: 'absolute', bottom: 24, right: 28, zIndex: 1,
                      fontSize: 'clamp(80px, 10vw, 130px)', fontWeight: 900, lineHeight: 1,
                      color: accent, opacity: 0.04,
                      fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif",
                      letterSpacing: '-6px', userSelect: 'none', pointerEvents: 'none',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* ── Image panel ── */}
                    <div
                      style={{ position: 'relative', overflow: 'hidden', gridColumn: isEven ? 1 : 2, gridRow: 1 }}
                      className="proj-img-panel"
                    >
                      <img
                        src={p.screenshot ?? ''}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                      />
                      {/* Side fade to blend into content */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: isEven
                          ? 'linear-gradient(to right, transparent 35%, color-mix(in srgb, var(--bg) 94%, transparent) 100%)'
                          : 'linear-gradient(to left, transparent 35%, color-mix(in srgb, var(--bg) 94%, transparent) 100%)',
                      }} />
                      {/* Accent overlay shimmer */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(135deg, ${accentGlow}, transparent 60%)`,
                        mixBlendMode: 'screen',
                      }} />
                    </div>

                    {/* ── Content panel ── */}
                    <div
                      style={{
                        gridColumn: isEven ? 2 : 1, gridRow: 1,
                        padding: 'clamp(28px, 4vw, 56px)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22,
                        position: 'relative', zIndex: 2,
                      }}
                    >
                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {p.tags.map(t => (
                          <span key={t} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            padding: '5px 14px', borderRadius: 99,
                            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em',
                            color: accent, background: accentBg, border: `1px solid ${accent}30`,
                          }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, display: 'inline-block', boxShadow: `0 0 5px ${accent}` }} />
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, lineHeight: 1.1,
                        color: 'var(--text)', margin: 0, letterSpacing: '-0.5px',
                        fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif",
                      }}>
                        {p.name}
                      </h3>

                      {/* Separator */}
                      <div style={{ height: 1, background: `linear-gradient(90deg, ${accentBorder}, transparent)`, borderRadius: 99 }} />

                      {/* Description */}
                      <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.8, margin: 0 }}>
                        {p.desc}
                      </p>

                      {/* Tech pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {p.tech.slice(0, 5).map((t, ti) => (
                          <span key={t} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 14px', borderRadius: 11,
                            fontSize: 13, fontWeight: 500,
                            color: 'var(--text2)', background: 'var(--surface2)', border: '1px solid var(--border2)',
                            letterSpacing: '0.01em',
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: cardAccents[ti % cardAccents.length], display: 'inline-block', boxShadow: `0 0 6px ${cardAccents[ti % cardAccents.length]}99` }} />
                            {t}
                          </span>
                        ))}
                        {p.tech.length > 5 && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 14px', borderRadius: 11, fontSize: 13, fontWeight: 500, color: 'var(--text3)', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                            +{p.tech.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* CTA row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                        {/* View details — opens modal */}
                        <motion.button
                          whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            padding: '12px 24px', borderRadius: 14,
                            fontSize: 14, fontWeight: 700,
                            color: '#07080f', background: accent,
                            border: 'none', cursor: 'pointer',
                            boxShadow: `0 8px 28px ${accent}44`,
                            fontFamily: "var(--font-b),'Instrument Sans',sans-serif",
                            letterSpacing: '0.01em',
                          }}
                        >
                          View Details
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </motion.button>

                        {/* Frontend GitHub */}
                        {p.ghClientUrl !== '#' && (
                          <motion.a
                            href={p.ghClientUrl} target="_blank" rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 7,
                              padding: '11px 18px', borderRadius: 14,
                              fontSize: 13, fontWeight: 600,
                              color: 'var(--text2)', background: 'var(--surface2)',
                              border: '1px solid var(--border2)',
                              textDecoration: 'none', cursor: 'pointer',
                            }}
                            title="Frontend GitHub"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                            Frontend
                          </motion.a>
                        )}

                        {/* Backend GitHub */}
                        {p.ghServerUrl !== '#' && (
                          <motion.a
                            href={p.ghServerUrl} target="_blank" rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 7,
                              padding: '11px 18px', borderRadius: 14,
                              fontSize: 13, fontWeight: 600,
                              color: accent, background: accentBg,
                              border: `1px solid ${accent}40`,
                              textDecoration: 'none', cursor: 'pointer',
                            }}
                            title="Backend GitHub"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                            Backend
                          </motion.a>
                        )}
                      </div>
                    </div>

                  </motion.div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} accent={activeAccent} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .proj-card-grid {
            grid-template-columns: 1fr !important;
          }
          .proj-img-panel {
            grid-column: 1 !important;
            grid-row: 1 !important;
            height: 260px;
          }
          .proj-card-grid > div:last-of-type {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          [style*="position: sticky"] {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 28px !important;
          }
        }
        @media (max-width: 640px) {
          .proj-img-panel { height: 200px; }
        }
      `}</style>
    </>
  )
}
