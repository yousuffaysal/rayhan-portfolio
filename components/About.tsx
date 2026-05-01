'use client'

import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, stagger, scaleIn } from '@/lib/animations'

const tags = [
  { label: 'Full-Stack Dev', hl: true },
  { label: 'React', hl: true },
  { label: 'Node.js', hl: true },
  { label: 'PostgreSQL', hl: true },
  { label: 'Golang', hl: false },
  { label: 'Open Source', hl: false },
  { label: 'Dhaka, BD 🇧🇩', hl: false },
]

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <motion.div className="sec-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          About Me
        </motion.div>
        <motion.h2 className="sec-h" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Passionate developer,<br />
          <span style={{ color: 'var(--accent)' }}>lifelong learner</span>
        </motion.h2>

        <div className="about-grid">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="about-quote">
              &ldquo;I don&rsquo;t just write code — I craft experiences that users love and developers respect.&rdquo;
            </div>
            <motion.div className="about-tags" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {tags.map((t, i) => (
                <motion.span key={t.label} className={`about-tag${t.hl ? ' hl' : ''}`} variants={scaleIn} custom={i}>
                  {t.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="about-right" variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p>
              Hey! I&rsquo;m <strong>Rayhan Ahmed</strong>, a full-stack web developer based in Dhaka, Bangladesh.
              My journey with coding started when I discovered I could build anything in a browser — that
              feeling of creating something from nothing hooked me instantly.
            </p>
            <p>
              I specialize in building <strong>fast, scalable web applications</strong> using React, Next.js,
              and Node.js. I also work with <strong>Golang</strong> and <strong>PostgreSQL</strong> for robust
              backend systems. I love the intersection of clean engineering and thoughtful design.
            </p>
            <p>
              Currently co-founding <strong>Foxmen Studio</strong>, a development agency where I lead system
              design, build scalable architectures, and deliver production-ready applications for real-world
              clients across multiple domains.
            </p>
            <p>
              Open to <strong>freelance projects</strong>, full-time roles, and interesting collaborations.
              Let&rsquo;s build something great together.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-fill btn-sm">Let&rsquo;s Talk</a>
              <a href="/Rayhan-CV.pdf" download className="btn btn-ghost btn-sm">Download CV</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
