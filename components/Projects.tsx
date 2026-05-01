'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '@/data/portfolio'
import { ease } from '@/lib/animations'

type Project = (typeof projectsData)[number]

// ─── External link icon ─────────────────────────────────────────────────────
function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

// ─── Modal ──────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-bg"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.45, ease }}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Screenshot hero in modal */}
        <div style={{ position: 'relative', width: '100%', height: 260, overflow: 'hidden', flexShrink: 0 }}>
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt={`${project.name} preview`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: project.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 56 }}>{project.emoji}</span>
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,12,20,0.95) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 28, right: 28 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {project.tags.map(t => (
                <span key={t} className="proj-tag">{t}</span>
              ))}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", lineHeight: 1.2 }}>
              {project.name}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-desc">{project.fullDesc}</div>
          <div className="modal-section-title">Tech Stack</div>
          <div className="modal-tech-chips">
            {project.tech.map(t => <span className="modal-tech-chip" key={t}>{t}</span>)}
          </div>
          <div className="modal-section-title">Challenges Faced</div>
          <ul className="modal-list">
            {project.challenges.map(c => <li key={c}>{c}</li>)}
          </ul>
          <div className="modal-section-title">Future Improvements</div>
          <ul className="modal-list">
            {project.future.map(f => <li key={f}>{f}</li>)}
          </ul>
          <div className="modal-links">
            {project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-fill btn-sm">
                Live Demo ↗
              </a>
            )}
            {project.ghClientUrl !== '#' && (
              <a href={project.ghClientUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                GitHub (Client) →
              </a>
            )}
            {project.ghServerUrl !== '#' && (
              <a href={project.ghServerUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                GitHub (Server) →
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────
function ProjectCard({ p, index, onClick }: { p: Project; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(32,176,248,0.2)' : '0 6px 24px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Screenshot banner ── */}
      <div style={{ position: 'relative', width: '100%', height: p.wide ? 340 : 220, overflow: 'hidden', flexShrink: 0 }}>
        {p.screenshot ? (
          <img
            src={p.screenshot}
            alt={`${p.name} preview`}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              display: 'block',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 52 }}>{p.emoji}</span>
          </div>
        )}

        {/* Gradient overlay over screenshot */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(8,10,18,0.88) 100%)' }} />

        {/* Hover overlay with CTA */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8,10,18,0.65)',
          backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}>
          <button
            style={{
              padding: '10px 22px', borderRadius: 10, fontSize: 13.5, fontWeight: 700,
              background: 'var(--accent)', color: '#000', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            View Details
          </button>
          <a
            href={p.liveUrl !== '#' ? p.liveUrl : p.ghClientUrl}
            target="_blank" rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '10px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 700,
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              textDecoration: 'none',
            }}
          >
            <ExternalIcon /> Live
          </a>
          {p.ghClientUrl !== '#' && (
            <a
              href={p.ghClientUrl}
              target="_blank" rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '10px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 700,
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                textDecoration: 'none',
              }}
            >
              <GithubIcon /> Code
            </a>
          )}
        </div>

        {/* Featured badge */}
        {p.tags.includes('Featured') && (
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '4px 12px', borderRadius: 99,
            fontSize: 10.5, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'var(--accent)', color: '#000',
          }}>
            ★ Featured
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '22px 24px 26px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.tags.filter(t => t !== 'Featured').map(t => (
            <span
              key={t}
              style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99,
                color: 'rgba(32,176,248,0.9)',
                background: 'rgba(32,176,248,0.08)',
                border: '1px solid rgba(32,176,248,0.15)',
                letterSpacing: '0.04em',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <div style={{
          fontSize: 17, fontWeight: 800, color: 'rgba(255,255,255,0.93)',
          fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
          letterSpacing: '-0.2px', lineHeight: 1.25,
        }}>
          {p.name}
        </div>

        {/* Desc */}
        <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.7, margin: 0, flex: 1 }}>
          {p.desc}
        </p>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {p.tech.slice(0, 3).map(t => (
              <span key={t} style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{t}</span>
            ))}
            {p.tech.length > 3 && (
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>+{p.tech.length - 3}</span>
            )}
          </div>
          <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            View details →
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  const featured = projectsData.filter(p => p.wide)
  const rest = projectsData.filter(p => !p.wide)

  return (
    <>
      <section id="projects" style={{ background: 'var(--bg)' }}>
        <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 56 }}
          >
            <div>
              <div className="sec-tag">Featured Work</div>
              <h2 className="sec-h" style={{ marginBottom: 0 }}>
                Projects that <span style={{ color: 'var(--accent)' }}>matter</span>
              </h2>
            </div>
            <a
              href="https://github.com/Rayhan-50"
              target="_blank" rel="noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ marginBottom: 8 }}
            >
              All on GitHub →
            </a>
          </motion.div>

          {/* ── Featured (wide) card — full-width banner ── */}
          {featured.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              {featured.map((p, i) => (
                <ProjectCard key={p.id} p={p} index={i} onClick={() => setActive(p)} />
              ))}
            </div>
          )}

          {/* ── 2×2 grid for the rest ── */}
          <div
            style={{ display: 'grid', gap: 20 }}
            className="proj-rest-grid"
          >
            {rest.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i + featured.length} onClick={() => setActive(p)} />
            ))}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>

      <style>{`
        .proj-rest-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 768px) {
          .proj-rest-grid { grid-template-columns: 1fr }
        }
      `}</style>
    </>
  )
}
