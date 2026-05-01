'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    year: '2024 — Present',
    company: 'Foxmen Studio',
    url: 'https://foxmen.studio',
    logo: 'https://ik.imagekit.io/2lax2ytm2/Logo%20Profile%20(1).png',
    badge: 'Full-time',
    badgeType: 'full',
    role: 'Co-Founder & Full Stack Developer',
    tagline: 'Building digital products that matter.',
    location: 'Dhaka, Bangladesh · Remote',
    accent: '#20b0f8',
    accentBg: 'rgba(32,176,248,0.08)',
    accentBorder: 'rgba(32,176,248,0.2)',
    accentGlow: 'rgba(32,176,248,0.06)',
    stats: [
      { num: '5+',   label: 'Products launched' },
      { num: '8+',   label: 'Clients served' },
      { num: '100%', label: 'On-time delivery' },
    ],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Firebase', 'TypeScript', 'Tailwind'],
    bullets: [
      { icon: '⚡', text: 'Co-founded a development agency delivering full-stack applications for real-world clients across multiple industries.' },
      { icon: '🏗️', text: 'Led system design and architecture for scalable frontend and backend systems — from schema to deployment.' },
      { icon: '🔌', text: 'Built production REST APIs with auth, file handling, payments, and third-party integrations.' },
      { icon: '🚀', text: 'Shipped BIRSTBD, Noorvia, SkillBridge and more — all production-ready with real users and traffic.' },
    ],
  },
  {
    year: '2025',
    company: 'Sailors Agency',
    url: null,
    logo: 'https://ik.imagekit.io/2lax2ytm2/10001%20(1).jpeg',
    badge: 'Part-time',
    badgeType: 'part',
    role: 'Full Stack Developer',
    tagline: 'Contracted for Leson Paw education platform.',
    location: 'Remote',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.08)',
    accentBorder: 'rgba(167,139,250,0.22)',
    accentGlow: 'rgba(167,139,250,0.06)',
    stats: [
      { num: '4',   label: 'Languages supported' },
      { num: '1',   label: 'Major platform built' },
      { num: '3+',  label: 'Months of contract' },
    ],
    tech: ['React', 'Vite', 'Node.js', 'MongoDB', 'Firebase Auth', 'JWT', 'i18n', 'Axios'],
    bullets: [
      { icon: '🌍', text: 'Developed a multi-language (EN, FR, ES, Haitian Creole) tutoring marketplace for Haiti using i18n localization.' },
      { icon: '🛡️', text: 'Designed RESTful APIs with secure JWT + Firebase dual-auth, protecting all sensitive user routes.' },
      { icon: '📐', text: 'Implemented full client-server architecture, admin dashboards, and booking management for Leson Paw.' },
    ],
  },
]

function CardGraphic({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'absolute', right: 0, top: 0, width: 240, height: '100%', overflow: 'hidden', pointerEvents: 'none', opacity: 0.3 }}>
      <svg width="240" height="100%" viewBox="0 0 240 340" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice">
        <circle cx="240" cy="60" r="100" stroke={accent} strokeWidth="1" strokeDasharray="6 10" opacity="0.5" />
        <circle cx="240" cy="60" r="150" stroke={accent} strokeWidth="0.5" strokeDasharray="4 12" opacity="0.3" />
        <circle cx="240" cy="60" r="200" stroke={accent} strokeWidth="0.5" strokeDasharray="3 14" opacity="0.18" />
        <circle cx="172" cy="44"  r="3.5" fill={accent} opacity="0.6" />
        <circle cx="200" cy="96"  r="2.5" fill={accent} opacity="0.45" />
        <circle cx="152" cy="118" r="4.5" fill={accent} opacity="0.3" />
        <circle cx="216" cy="140" r="3"   fill={accent} opacity="0.5" />
        <line x1="172" y1="44"  x2="200" y2="96"  stroke={accent} strokeWidth="0.6" opacity="0.3" />
        <line x1="200" y1="96"  x2="152" y2="118" stroke={accent} strokeWidth="0.6" opacity="0.3" />
        <line x1="152" y1="118" x2="216" y2="140" stroke={accent} strokeWidth="0.6" opacity="0.3" />
      </svg>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg2)' }}>
      <div style={{ padding: '0 clamp(20px, 4vw, 72px)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div className="sec-tag">Experience</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="sec-h" style={{ marginBottom: 0 }}>
              Where I&apos;ve <span style={{ color: 'var(--accent)' }}>worked</span>
            </h2>
            <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 420, paddingBottom: 4 }}>
              Real work, real teams, real impact — building production-grade software that serves actual users.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2.5vw, 28px)' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                borderColor: exp.accentBorder,
                boxShadow: `0 28px 72px rgba(0,0,0,0.32), 0 0 0 1px ${exp.accentBorder}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                transition: { duration: 0.3 },
              }}
              style={{
                position: 'relative',
                borderRadius: 32,
                overflow: 'hidden',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 28px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.05)',
                cursor: 'default',
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${exp.accent}, ${exp.accent}66, transparent 70%)`,
                boxShadow: `0 0 14px ${exp.accent}55`,
              }} />

              {/* Corner ambient glow */}
              <div style={{
                position: 'absolute', bottom: -80, right: -80,
                width: 320, height: 320, borderRadius: '50%',
                background: `radial-gradient(circle, ${exp.accentGlow} 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Decorative SVG — desktop only */}
              <div className="hidden lg:block">
                <CardGraphic accent={exp.accent} />
              </div>

              {/* Card body */}
              <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(28px, 4vw, 52px)' }}>

                {/* ── Top row: logo + company + badge ── */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 36 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
                    {/* Logo box */}
                    <div style={{
                      width: 72, height: 72, borderRadius: 20, flexShrink: 0,
                      background: exp.accentBg, border: `1px solid ${exp.accentBorder}`,
                      overflow: 'hidden',
                      boxShadow: `0 0 0 6px ${exp.accentGlow}, 0 8px 24px ${exp.accentBg}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img src={exp.logo} alt={`${exp.company} logo`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {/* Company name + link */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                        <span style={{
                          fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, letterSpacing: '-0.6px',
                          color: 'var(--text)', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
                        }}>
                          {exp.company}
                        </span>
                        {exp.url && (
                          <a
                            href={exp.url} target="_blank" rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '5px 14px', borderRadius: 99,
                              fontSize: 12, fontWeight: 700,
                              color: exp.accent, background: exp.accentBg, border: `1px solid ${exp.accentBorder}`,
                              transition: 'opacity 0.2s',
                            }}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            Website
                          </a>
                        )}
                      </div>

                      {/* Location + year */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 13.5, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {exp.location}
                        </span>
                        <span style={{ color: 'var(--border2)' }}>·</span>
                        <span style={{ fontSize: 13.5, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5 }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          {exp.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '8px 18px', borderRadius: 99,
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: exp.accent, background: exp.accentBg, border: `1px solid ${exp.accentBorder}`,
                    boxShadow: `0 0 0 4px ${exp.accentGlow}`,
                    flexShrink: 0,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: exp.accent, display: 'inline-block', boxShadow: `0 0 6px ${exp.accent}` }} />
                    {exp.badge}
                  </span>
                </div>

                {/* ── Role + tagline ── */}
                <div style={{ marginBottom: 36 }}>
                  <h4 style={{
                    fontSize: 'clamp(20px, 2.8vw, 28px)', fontWeight: 800, letterSpacing: '-0.5px',
                    color: 'var(--text)', marginBottom: 8,
                    fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
                  }}>
                    {exp.role}
                  </h4>
                  <div style={{ fontSize: 16, color: exp.accent, opacity: 0.85, fontStyle: 'italic' }}>
                    {exp.tagline}
                  </div>
                </div>

                {/* ── Stats row ── */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
                  {exp.stats.map(s => (
                    <div
                      key={s.label}
                      style={{
                        flex: '1 1 120px',
                        padding: 'clamp(16px, 2vw, 24px)',
                        borderRadius: 20,
                        background: exp.accentBg,
                        border: `1px solid ${exp.accentBorder}`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
                        transition: 'transform 0.25s',
                      }}
                    >
                      <div style={{
                        fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 900,
                        color: exp.accent, letterSpacing: '-1px', lineHeight: 1,
                        fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
                        marginBottom: 8,
                      }}>
                        {s.num}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text2)', opacity: 0.7, fontFamily: "var(--font-m), 'DM Mono', monospace" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Bullet points ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                  {exp.bullets.map((b, bi) => (
                    <motion.div
                      key={bi}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.42, delay: bi * 0.07 + 0.2 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}
                    >
                      <span style={{
                        width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18,
                        background: exp.accentBg,
                        border: `1px solid ${exp.accentBorder}`,
                        boxShadow: `0 0 0 4px ${exp.accentGlow}`,
                      }}>
                        {b.icon}
                      </span>
                      <p style={{ fontSize: 'clamp(14px, 1.6vw, 16.5px)', color: 'var(--text2)', lineHeight: 1.8, paddingTop: 10 }}>
                        {b.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* ── Tech stack chips ── */}
                <div style={{
                  paddingTop: 28,
                  borderTop: '1px solid var(--border)',
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10,
                }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'var(--text3)', marginRight: 6,
                    fontFamily: "var(--font-m), 'DM Mono', monospace",
                  }}>
                    Stack:
                  </span>
                  {exp.tech.map((t, ti) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.32, delay: ti * 0.04 }}
                      whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 9,
                        padding: '9px 16px', borderRadius: 12,
                        fontSize: 13.5, fontWeight: 500,
                        color: 'var(--text2)',
                        background: 'var(--surface2)',
                        border: '1px solid var(--border2)',
                        cursor: 'default',
                        letterSpacing: '0.01em',
                      }}
                    >
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                        background: exp.accent,
                        display: 'inline-block',
                        boxShadow: `0 0 7px ${exp.accent}99`,
                      }} />
                      {t}
                    </motion.span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
