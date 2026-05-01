'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { skillsData } from '@/data/portfolio'
import { fadeUp, stagger } from '@/lib/animations'

function SkillCategory({ category, skills }: { category: string; skills: { name: string; pct: number }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="skill-cat glow-card"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="skill-cat-title">{category}</div>
      {skills.map((s, i) => (
        <div className="skill-bar-item" key={s.name}>
          <div className="sb-header">
            <span className="sb-name">{s.name}</span>
            <span className="sb-pct">{s.pct}%</span>
          </div>
          <div className="sb-track">
            <div
              className="sb-fill"
              style={{
                width: animate ? `${s.pct}%` : '0%',
                transitionDelay: animate ? `${i * 0.1}s` : '0s',
              }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <motion.div className="sec-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Skills
        </motion.div>
        <motion.h2 className="sec-h" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          My <span style={{ color: 'var(--accent)' }}>technical</span> toolkit
        </motion.h2>
        <motion.p className="sec-sub" variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Technologies and tools I work with daily, honed through real-world production projects.
        </motion.p>
        <motion.div className="skills-cats" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {skillsData.map((cat) => (
            <SkillCategory key={cat.category} category={cat.category} skills={cat.skills} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
