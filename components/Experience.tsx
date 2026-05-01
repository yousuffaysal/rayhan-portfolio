'use client'

import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight } from '@/lib/animations'
import { experienceData } from '@/data/portfolio'

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <motion.div className="sec-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Experience
        </motion.div>
        <motion.h2 className="sec-h" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Where I&rsquo;ve <span style={{ color: 'var(--accent)' }}>worked</span>
        </motion.h2>
        <div className="exp-list">
          {experienceData.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="exp-item"
              variants={i % 2 === 0 ? fadeLeft : fadeRight}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="exp-meta">
                <div className="exp-year">{exp.year}</div>
                <div className="exp-company">{exp.company}</div>
                <span className={`exp-badge ${exp.badgeType}`}>{exp.badge}</span>
              </div>
              <div>
                <div className="exp-role">{exp.role}</div>
                <div className="exp-desc">
                  <ul>
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
