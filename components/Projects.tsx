'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '@/data/portfolio'
import { fadeUp, scaleIn, stagger, ease } from '@/lib/animations'

type Project = (typeof projectsData)[number]

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.5, ease }}
      >
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-hero" style={{ background: project.bg }}>
          <span style={{ fontSize: 52, position: 'relative', zIndex: 2 }}>{project.emoji}</span>
        </div>
        <div className="modal-body">
          <div className="modal-tags">
            {project.tags.map((t) => <span className="proj-tag" key={t}>{t}</span>)}
          </div>
          <div className="modal-title">{project.name}</div>
          <div className="modal-desc">{project.fullDesc}</div>

          <div className="modal-section-title">Tech Stack</div>
          <div className="modal-tech-chips">
            {project.tech.map((t) => <span className="modal-tech-chip" key={t}>{t}</span>)}
          </div>

          <div className="modal-section-title">Challenges Faced</div>
          <ul className="modal-list">
            {project.challenges.map((c) => <li key={c}>{c}</li>)}
          </ul>

          <div className="modal-section-title">Future Improvements</div>
          <ul className="modal-list">
            {project.future.map((f) => <li key={f}>{f}</li>)}
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

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <section id="projects">
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <motion.div className="sec-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                Featured Work
              </motion.div>
              <motion.h2 className="sec-h" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                Projects that <span style={{ color: 'var(--accent)' }}>matter</span>
              </motion.h2>
            </div>
            <motion.a
              href="https://github.com/Rayhan-50"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ marginBottom: 14 }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              All Projects →
            </motion.a>
          </div>

          <motion.div
            className="proj-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {projectsData.map((p, i) => (
              <motion.div
                key={p.id}
                className={`proj-card${p.wide ? ' wide' : ''}`}
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -10, transition: { duration: 0.35, ease } }}
                onClick={() => setActive(p)}
              >
                <div className="proj-thumb">
                  <div className="proj-thumb-bg" style={{ background: p.bg }}>
                    <span className="proj-thumb-icon">{p.emoji}</span>
                    <div className="proj-thumb-label">{p.name.toLowerCase()}</div>
                  </div>
                  <div className="proj-hover">
                    <button className="btn btn-fill btn-sm">View Details</button>
                    <a
                      href={p.ghClientUrl !== '#' ? p.ghClientUrl : p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
                <div className="proj-body">
                  <div className="proj-tags">
                    {p.tags.map((t) => <span className="proj-tag" key={t}>{t}</span>)}
                  </div>
                  <div className="proj-name">{p.name}</div>
                  <div className="proj-desc">{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  )
}
