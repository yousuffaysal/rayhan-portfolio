'use client'

import { useState, useEffect } from 'react'
import { projectsData } from '@/data/portfolio'

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
    <div className="modal-bg open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div
          className="modal-hero"
          style={{ background: project.bg }}
        >
          <span style={{ fontSize: 52, position: 'relative', zIndex: 2 }}>{project.emoji}</span>
        </div>
        <div className="modal-body">
          <div className="modal-tags">
            {project.tags.map((t) => (
              <span className="proj-tag" key={t}>{t}</span>
            ))}
          </div>
          <div className="modal-title">{project.name}</div>
          <div className="modal-desc">{project.fullDesc}</div>
          <div className="modal-section-title">Tech Stack</div>
          <div className="modal-tech-chips">
            {project.tech.map((t) => (
              <span className="modal-tech-chip" key={t}>{t}</span>
            ))}
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
            <a href={project.liveUrl} className="btn btn-fill btn-sm">Live Demo ↗</a>
            <a href={project.ghUrl} className="btn btn-ghost btn-sm">GitHub →</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <section id="projects">
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 0, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="sec-tag rv">Featured Work</div>
              <h2 className="sec-h rv d1">
                Projects that <span style={{ color: 'var(--accent)' }}>matter</span>
              </h2>
            </div>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm rv" style={{ marginBottom: 14 }}>
              All Projects →
            </a>
          </div>
          <div className="proj-grid">
            {projectsData.map((p, i) => (
              <div
                key={p.id}
                className={`proj-card rv d${Math.min(i + 1, 4)}${p.wide ? ' wide' : ''}`}
                onClick={() => setActive(p)}
              >
                <div className="proj-thumb">
                  <div className="proj-thumb-bg" style={{ background: p.bg }}>
                    <span className="proj-thumb-icon">{p.emoji}</span>
                    <div className="proj-thumb-label">{p.name.toLowerCase()} — screenshot</div>
                  </div>
                  <div className="proj-hover">
                    <button className="btn btn-fill btn-sm">View Details</button>
                    <a
                      href={p.ghUrl}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </>
  )
}
