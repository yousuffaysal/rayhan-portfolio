'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/data/portfolio'
import { fadeUp, stagger } from '@/lib/animations'

const dnaSkills = [
  { name: 'React.js',    accent: '#20b0f8', glow: 'rgba(32,176,248,0.06)',  bg: 'rgba(32,176,248,0.09)',  border: 'rgba(32,176,248,0.22)'  },
  { name: 'Next.js 15',  accent: '#a78bfa', glow: 'rgba(167,139,250,0.06)', bg: 'rgba(167,139,250,0.09)', border: 'rgba(167,139,250,0.22)' },
  { name: 'TypeScript',  accent: '#60a5fa', glow: 'rgba(96,165,250,0.06)',  bg: 'rgba(96,165,250,0.09)',  border: 'rgba(96,165,250,0.22)'  },
  { name: 'Node.js',     accent: '#34d399', glow: 'rgba(52,211,153,0.06)',  bg: 'rgba(52,211,153,0.09)',  border: 'rgba(52,211,153,0.22)'  },
  { name: 'PostgreSQL',  accent: '#fbbf24', glow: 'rgba(251,191,36,0.06)',  bg: 'rgba(251,191,36,0.09)',  border: 'rgba(251,191,36,0.22)'  },
  { name: 'Golang',      accent: '#20b0f8', glow: 'rgba(32,176,248,0.06)',  bg: 'rgba(32,176,248,0.09)',  border: 'rgba(32,176,248,0.22)'  },
  { name: 'Prisma',      accent: '#a78bfa', glow: 'rgba(167,139,250,0.06)', bg: 'rgba(167,139,250,0.09)', border: 'rgba(167,139,250,0.22)' },
  { name: 'Docker',      accent: '#34d399', glow: 'rgba(52,211,153,0.06)',  bg: 'rgba(52,211,153,0.09)',  border: 'rgba(52,211,153,0.22)'  },
]

export default function About() {
  return (
    <section id="about" className="relative w-full bg-[var(--bg)]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(32,176,248,0.03)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_0%,transparent_70%)] blur-[100px]" />
      </div>

      <div className="wrap relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col gap-12 lg:gap-16"
        >
          {/* Header */}
          <div className="max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text2)]">The Narrative</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] leading-[1.1] mb-8 font-[var(--font-d)]">
              Transforming complex <span className="text-[var(--accent)]">logic</span> into elegant <span className="italic">experiences.</span>
            </motion.h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">

            {/* Story — no card shell, just text */}
            <motion.div variants={fadeUp} className="lg:col-span-8 relative">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text)] mb-6 font-[var(--font-d)] uppercase tracking-[0.1em]">My Journey</h3>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed text-[var(--text2)] max-w-4xl">
                <p>
                  I&rsquo;m <strong className="text-[var(--text)] font-extrabold">Rayhan Ahmed</strong>, a Full-Stack Engineer and digital architect based in Dhaka.
                  My obsession with coding isn&rsquo;t just about syntax—it&rsquo;s about the thrill of building robust, scalable systems from a blank canvas.
                </p>
                <p>
                  With a background in <strong className="text-[var(--accent)] font-semibold">Statistics</strong> from NSTU, I bring a unique analytical perspective to software engineering,
                  ensuring that every application I build is not only visually stunning but technically sound and performance-optimized.
                </p>
                <p>
                  Currently, I&rsquo;m pushing the boundaries of the MERN stack and Next.js as the <strong className="text-[var(--text)] font-bold">Co-Founder of Foxmen Studio</strong>,
                  where we bridge the gap between ambitious ideas and production-ready reality.
                </p>
              </div>
            </motion.div>

            {/* Stats column */}
            <motion.div variants={fadeUp} className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5">

              {/* 2+ card */}
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(32,176,248,0.35)', boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(32,176,248,0.25), inset 0 1px 0 rgba(255,255,255,0.08)', transition: { duration: 0.28 } }}
                style={{
                  position: 'relative', overflow: 'hidden',
                  borderRadius: 28, padding: 'clamp(24px,3vw,40px)',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                  textAlign: 'center', cursor: 'default',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #20b0f8, #20b0f866, transparent 70%)', boxShadow: '0 0 12px rgba(32,176,248,0.4)' }} />
                {/* Corner glow */}
                <div style={{ position: 'absolute', bottom: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,176,248,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
                {/* Ghost label */}
                <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 'clamp(48px,6vw,72px)', fontWeight: 900, color: '#20b0f8', opacity: 0.05, fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", letterSpacing: '-3px', userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>EXP</div>
                <span style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: '#20b0f8', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", letterSpacing: '-2px', lineHeight: 1, position: 'relative', zIndex: 1 }}>2+</span>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text3)', marginTop: 10, fontFamily: "var(--font-m), 'DM Mono', monospace", position: 'relative', zIndex: 1 }}>Years of Exp.</span>
              </motion.div>

              {/* 80+ card */}
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(167,139,250,0.35)', boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(167,139,250,0.25), inset 0 1px 0 rgba(255,255,255,0.08)', transition: { duration: 0.28 } }}
                style={{
                  position: 'relative', overflow: 'hidden',
                  borderRadius: 28, padding: 'clamp(24px,3vw,40px)',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                  textAlign: 'center', cursor: 'default',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #a78bfa, #a78bfa66, transparent 70%)', boxShadow: '0 0 12px rgba(167,139,250,0.4)' }} />
                <div style={{ position: 'absolute', bottom: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 'clamp(48px,6vw,72px)', fontWeight: 900, color: '#a78bfa', opacity: 0.05, fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", letterSpacing: '-3px', userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>PRJ</div>
                <span style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: '#a78bfa', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", letterSpacing: '-2px', lineHeight: 1, position: 'relative', zIndex: 1 }}>80+</span>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text3)', marginTop: 10, fontFamily: "var(--font-m), 'DM Mono', monospace", position: 'relative', zIndex: 1 }}>Projects Done</span>
              </motion.div>

            </motion.div>

            {/* Philosophy card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: 'rgba(32,176,248,0.28)', boxShadow: '0 20px 56px rgba(0,0,0,0.25), 0 0 0 1px rgba(32,176,248,0.18), inset 0 1px 0 rgba(255,255,255,0.06)', transition: { duration: 0.28 } }}
              className="lg:col-span-5"
              style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: 28, padding: 'clamp(28px,3vw,44px)',
                background: 'var(--surface)', border: '1px solid var(--border)',
                cursor: 'default',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Top bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #20b0f8, #20b0f866, transparent 70%)', boxShadow: '0 0 12px rgba(32,176,248,0.35)' }} />
              {/* Corner glow */}
              <div style={{ position: 'absolute', bottom: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,176,248,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
              {/* Quote mark decoration */}
              <div style={{ position: 'absolute', top: 16, right: 24, fontSize: 80, fontWeight: 900, color: '#20b0f8', opacity: 0.05, fontFamily: 'Georgia, serif', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>&ldquo;</div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(32,176,248,0.09)', border: '1px solid rgba(32,176,248,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#20b0f8', boxShadow: '0 0 0 4px rgba(32,176,248,0.05)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text)', fontFamily: "var(--font-m), 'DM Mono', monospace" }}>My Philosophy</h3>
                </div>

                <div style={{ width: 3, height: '100%', background: 'linear-gradient(to bottom, #20b0f8, #20b0f844)', borderRadius: 99, position: 'absolute', left: 0, top: 0, bottom: 0, display: 'none' }} />
                <p style={{ borderLeft: '3px solid #20b0f8', paddingLeft: 20, fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.75, fontStyle: 'italic', color: 'var(--text2)' }}>
                  &ldquo;I don&rsquo;t just write code — I craft digital experiences that users love and developers respect. Clean architecture isn&rsquo;t a choice, it&rsquo;s a standard.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Technical DNA card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: 'rgba(167,139,250,0.28)', boxShadow: '0 20px 56px rgba(0,0,0,0.25), 0 0 0 1px rgba(167,139,250,0.18), inset 0 1px 0 rgba(255,255,255,0.06)', transition: { duration: 0.28 } }}
              className="lg:col-span-7"
              style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: 28, padding: 'clamp(28px,3vw,44px)',
                background: 'var(--surface)', border: '1px solid var(--border)',
                cursor: 'default',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32,
              }}
            >
              {/* Top bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #a78bfa, #a78bfa66, transparent 70%)', boxShadow: '0 0 12px rgba(167,139,250,0.35)' }} />
              {/* Corner glow */}
              <div style={{ position: 'absolute', bottom: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(167,139,250,0.09)', border: '1px solid rgba(167,139,250,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', boxShadow: '0 0 0 4px rgba(167,139,250,0.05)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text)', fontFamily: "var(--font-m), 'DM Mono', monospace" }}>Technical DNA</h3>
                </div>

                {/* Separator */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(167,139,250,0.25), transparent)', borderRadius: 99, marginBottom: 20 }} />

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {dnaSkills.map((s, i) => (
                    <motion.span
                      key={s.name}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.055 }}
                      whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '10px 18px', borderRadius: 14,
                        fontSize: 14, fontWeight: 500,
                        color: 'var(--text2)',
                        background: 'var(--surface2)',
                        border: '1px solid var(--border2)',
                        cursor: 'default',
                        letterSpacing: '0.01em',
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: s.accent, display: 'inline-block', boxShadow: `0 0 8px ${s.accent}99` }} />
                      {s.name}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                <a href="#contact" className="btn btn-fill" style={{ padding: '12px 24px', fontSize: 14 }}>Let&rsquo;s Collaborate</a>
                <a href={personalInfo.cvLink} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '12px 24px', fontSize: 14 }}>View Resume</a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
