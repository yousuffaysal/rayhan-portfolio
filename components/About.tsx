'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/data/portfolio'
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
    <section id="about" className="relative w-full py-24 md:py-32 overflow-hidden border-t border-[var(--border)] bg-[var(--bg2)]" style={{ padding: '120px 0' }}>
      
      {/* Full-width creative background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Abstract glowing orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(32,176,248,0.06)_0%,transparent_60%)] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,transparent_60%)] transform -translate-x-1/3 translate-y-1/3" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]" />
      </div>

      <div className="wrap relative z-10 flex flex-col gap-16 lg:gap-20">
        
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <motion.div className="sec-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              About Me
            </motion.div>
            <motion.h2 className="sec-h max-w-3xl mb-0" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Passionate developer,<br />
              <span style={{ color: 'var(--accent)' }}>lifelong learner</span>
            </motion.h2>
          </div>
          
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="hidden md:block text-right">
            <div className="font-[var(--font-m)] text-[11px] text-[var(--text3)] uppercase tracking-[0.15em] leading-relaxed">
              Based in<br/>
              <span className="text-[var(--accent)] font-semibold">Dhaka, Bangladesh</span>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (Quote & Skills) */}
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quote Card */}
            <div className="p-8 md:p-10 rounded-[24px] bg-[var(--bg)] border border-[var(--border)] relative overflow-hidden group hover:border-[rgba(32,176,248,0.3)] transition-colors duration-500 shadow-xl">
               <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-dim)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               <div className="relative z-10">
                 <div className="text-5xl text-[var(--accent)] mb-2 font-[var(--font-d)] leading-none">&ldquo;</div>
                 <p className="font-[var(--font-d)] font-bold text-[var(--text)] text-2xl md:text-[28px] leading-[1.3] mb-0 tracking-tight">
                   I don&rsquo;t just write code — I craft experiences that users love and developers respect.
                 </p>
               </div>
            </div>

            {/* Tags Card */}
            <div className="p-8 md:p-10 rounded-[24px] bg-[var(--surface)] border border-[var(--border)] shadow-xl">
              <h3 className="font-[var(--font-m)] text-[11px] font-semibold text-[var(--text3)] uppercase tracking-[0.1em] mb-5 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[var(--border2)]" />
                Core Toolkit
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {tags.map((t, i) => (
                  <span 
                    key={t.label} 
                    className={`px-4 py-2 rounded-full text-[12.5px] font-semibold border ${
                      t.hl 
                        ? 'bg-[var(--accent-dim)] border-[rgba(32,176,248,0.25)] text-[var(--accent)]' 
                        : 'bg-[var(--bg)] border-[var(--border2)] text-[var(--text2)]'
                    } transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]`}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column (Bio) */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-7 h-full">
            <div className="p-8 md:p-12 rounded-[24px] bg-[var(--bg)] border border-[var(--border)] shadow-2xl relative h-full flex flex-col justify-center overflow-hidden">
              {/* Decorative blur in corner */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--accent)] rounded-full blur-[100px] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[var(--purple)] rounded-full blur-[100px] opacity-[0.07] pointer-events-none" />
              
              <div className="relative z-10 space-y-6 text-[15.5px] leading-[1.85] text-[var(--text2)]">
                <p>
                  Hey! I&rsquo;m <strong className="text-[var(--text)] font-semibold">Rayhan Ahmed</strong>, a full-stack web developer based in Dhaka, Bangladesh.
                  My journey with coding started when I discovered I could build anything in a browser — that
                  feeling of creating something from nothing hooked me instantly.
                </p>
                <p>
                  I specialize in building <strong className="text-[var(--text)] font-semibold">fast, scalable web applications</strong> using React, Next.js,
                  and Node.js. I also work with <strong className="text-[var(--text)] font-semibold">Golang</strong> and <strong className="text-[var(--text)] font-semibold">PostgreSQL</strong> for robust
                  backend systems. I love the intersection of clean engineering and thoughtful design.
                </p>
                <p>
                  Currently co-founding <strong className="text-[var(--text)] font-semibold">Foxmen Studio</strong>, a development agency where I lead system
                  design, build scalable architectures, and deliver production-ready applications for real-world
                  clients across multiple domains.
                </p>
                <p className="pb-6">
                  Open to <strong className="text-[var(--text)] font-semibold">freelance projects</strong>, full-time roles, and interesting collaborations.
                  Let&rsquo;s build something great together.
                </p>

                <div className="flex flex-wrap gap-4 pt-6 border-t border-[var(--border)]">
                  <a href="#contact" className="btn btn-fill">Let&rsquo;s Talk</a>
                  <a href={personalInfo.cvLink} target="_blank" rel="noreferrer" className="btn btn-ghost">Download CV</a>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
