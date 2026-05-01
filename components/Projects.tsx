'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '@/data/portfolio'
import { ease } from '@/lib/animations'

type Project = (typeof projectsData)[number]

const STICKY_OFFSET = 32 // How much of the previous card remains visible
const CARD_HEIGHT = 640   // Increased height for all cards

// ─── Modal ──────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div className="modal" initial={{ opacity: 0, y: 60, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }} transition={{ duration: 0.45, ease }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ position: 'relative', width: '100%', height: 260, overflow: 'hidden', flexShrink: 0 }}>
          <img src={project.screenshot ?? ''} alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, var(--bg) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 28, right: 28 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {project.tags.map(t => <span className="proj-tag" key={t}>{t}</span>)}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif" }}>{project.name}</div>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-desc" style={{ fontSize: 16, lineHeight: 1.8 }}>{project.fullDesc}</div>
          <div className="modal-section-title">Tech Stack</div>
          <div className="modal-tech-chips">{project.tech.map(t => <span className="modal-tech-chip" key={t}>{t}</span>)}</div>
          <div className="modal-section-title">Challenges Faced</div>
          <ul className="modal-list">{project.challenges.map(c => <li key={c}>{c}</li>)}</ul>
          <div className="modal-links">
            {project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-fill">Live Demo ↗</a>}
            {project.ghClientUrl !== '#' && <a href={project.ghClientUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub →</a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <section id="projects" style={{ background: 'var(--bg)', paddingBottom: '30vh' }}>
        <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 80, marginTop: 60 }}
          >
            <div className="sec-tag">Portfolio</div>
            <h2 className="sec-h">Featured <span style={{ color: 'var(--accent)' }}>Projects</span></h2>
          </motion.div>

          {/* Cards Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {projectsData.map((p, i) => {
              const accents = ['#20b0f8', '#a78bfa', '#34d399', '#fbbf24', '#f87171']
              const accent = accents[i % accents.length]
              const isEven = i % 2 === 0

              return (
                <div
                  key={p.id}
                  style={{
                    position: 'sticky',
                    top: 80 + (i * STICKY_OFFSET),
                    zIndex: i + 1,
                    marginBottom: i === projectsData.length - 1 ? 0 : '50vh', 
                    width: '100%',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActive(p)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      height: CARD_HEIGHT,
                      background: 'color-mix(in srgb, var(--bg) 95%, transparent)',
                      backdropFilter: 'blur(24px)',
                      borderRadius: 32,
                      border: '1px solid var(--border)',
                      boxShadow: '0 30px 100px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Image Section */}
                    <div style={{ position: 'relative', overflow: 'hidden', order: isEven ? 0 : 1 }}>
                      <img 
                        src={p.screenshot ?? ''} 
                        alt={p.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
                      />
                      <div style={{ 
                        position: 'absolute', inset: 0, 
                        background: isEven 
                          ? 'linear-gradient(to right, transparent 30%, var(--bg) 100%)' 
                          : 'linear-gradient(to left, transparent 30%, var(--bg) 100%)' 
                      }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, order: isEven ? 1 : 0 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {p.tags.map(t => (
                          <span key={t} style={{ fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 99, color: accent, background: `${accent}15`, border: `1px solid ${accent}30`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)', fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif", lineHeight: 1.1, margin: 0 }}>{p.name}</h3>
                      <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {p.tech.slice(0, 5).map(t => (
                          <span key={t} style={{ fontSize: 13, color: 'var(--text3)', background: 'var(--surface2)', padding: '6px 14px', borderRadius: 10, border: '1px solid var(--border2)' }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <button className="btn btn-fill" style={{ background: accent, color: '#000', fontWeight: 800, padding: '14px 32px', borderRadius: 14 }}>View Details →</button>
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
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          [style*="height: 560px"] { height: auto !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="position: sticky"] { position: relative !important; top: 0 !important; margin-bottom: 40px !important; }
        }
      `}</style>
    </>
  )
}
