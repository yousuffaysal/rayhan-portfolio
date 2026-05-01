'use client'

import { motion } from 'framer-motion'
import { fadeUp, fadeRight, drawLine, ease } from '@/lib/animations'
import { educationData } from '@/data/portfolio'

const dotColors = ['', 'purple', 'muted']
const statusColors: Record<string, string> = {
  'In Progress': '',
  'Completed': 'completed',
  'Ongoing': 'ongoing',
}

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <motion.div className="sec-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Education
        </motion.div>
        <motion.h2 className="sec-h" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Academic <span style={{ color: 'var(--accent)' }}>journey</span>
        </motion.h2>
        <motion.p className="sec-sub" variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Building knowledge through formal education and continuous self-improvement.
        </motion.p>

        <div className="edu-timeline">
          {/* animated vertical line */}
          <motion.div
            className="edu-timeline-line"
            variants={drawLine}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          />

          {educationData.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="edu-milestone"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
            >
              {/* dot column */}
              <div className="edu-dot-col">
                <motion.div
                  className={`edu-dot ${dotColors[i] || ''}`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.2 + 0.3 }}
                />
              </div>

              {/* content */}
              <motion.div
                className="edu-content"
                variants={fadeRight}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <div className={`edu-status ${statusColors[edu.status] || ''}`}>
                  <span>●</span>
                  {edu.status}
                </div>
                <div className="edu-year-badge">{edu.year}</div>
                <div className="edu-degree-title">{edu.degree}</div>
                <div className="edu-school-name">{edu.school}</div>
                <div className="edu-detail-text">{edu.detail}</div>
                {edu.pill && <span className="edu-pill">{edu.pill}</span>}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
