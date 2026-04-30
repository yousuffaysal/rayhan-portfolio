'use client'

import { useEffect, useRef, useState } from 'react'
import { skillsData } from '@/data/portfolio'

function SkillCategory({ category, skills }: { category: string; skills: { name: string; pct: number }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="skill-cat rv" ref={ref}>
      <div className="skill-cat-title">{category}</div>
      {skills.map((s) => (
        <div className="skill-bar-item" key={s.name}>
          <div className="sb-header">
            <span className="sb-name">{s.name}</span>
            <span className="sb-pct">{s.pct}%</span>
          </div>
          <div className="sb-track">
            <div
              className="sb-fill"
              style={{ width: animate ? `${s.pct}%` : '0%' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-tag rv">Skills</div>
        <h2 className="sec-h rv d1">
          My <span style={{ color: 'var(--accent)' }}>technical</span> toolkit
        </h2>
        <p className="sec-sub rv d2">
          Technologies and tools I work with daily, honed through real-world projects.
        </p>
        <div className="skills-cats">
          {skillsData.map((cat) => (
            <SkillCategory key={cat.category} category={cat.category} skills={cat.skills} />
          ))}
        </div>
      </div>
    </section>
  )
}
