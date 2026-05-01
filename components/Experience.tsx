'use client'

import { motion } from 'framer-motion'

// ─── Enriched experience data ───────────────────────────────────────────────
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
    stats: [
      { num: '5+', label: 'Products launched' },
      { num: '8+', label: 'Clients served' },
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
    accentBg: 'rgba(124,58,237,0.08)',
    accentBorder: 'rgba(124,58,237,0.2)',
    stats: [
      { num: '4', label: 'Languages supported' },
      { num: '1', label: 'Major platform built' },
      { num: '3+', label: 'Months of contract' },
    ],
    tech: ['React', 'Vite', 'Node.js', 'MongoDB', 'Firebase Auth', 'JWT', 'i18n', 'Axios'],
    bullets: [
      { icon: '🌍', text: 'Developed a multi-language (EN, FR, ES, Haitian Creole) tutoring marketplace for Haiti using i18n localization.' },
      { icon: '🛡️', text: 'Designed RESTful APIs with secure JWT + Firebase dual-auth, protecting all sensitive user routes.' },
      { icon: '📐', text: 'Implemented full client-server architecture, admin dashboards, and booking management for Leson Paw.' },
    ],
  },
]

// ─── Decorative SVG graphic inside card ─────────────────────────────────────
function CardGraphic({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'absolute', right: 0, top: 0, width: 220, height: '100%', overflow: 'hidden', pointerEvents: 'none', opacity: 0.35 }}>
      <svg width="220" height="100%" viewBox="0 0 220 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice">
        {/* Concentric arc rings */}
        <circle cx="220" cy="60" r="90" stroke={accent} strokeWidth="1" strokeDasharray="6 10" opacity="0.5" />
        <circle cx="220" cy="60" r="130" stroke={accent} strokeWidth="0.5" strokeDasharray="4 12" opacity="0.3" />
        <circle cx="220" cy="60" r="170" stroke={accent} strokeWidth="0.5" strokeDasharray="3 14" opacity="0.2" />
        {/* Corner glow blob */}
        <radialGradient id={`grad-${accent.replace('#','')}`} cx="90%" cy="20%" r="60%" fx="90%" fy="20%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <rect width="220" height="320" fill={`url(#grad-${accent.replace('#','')})`} />
        {/* Small floating nodes */}
        <circle cx="160" cy="40" r="3" fill={accent} opacity="0.6" />
        <circle cx="185" cy="90" r="2" fill={accent} opacity="0.4" />
        <circle cx="140" cy="110" r="4" fill={accent} opacity="0.3" />
        <circle cx="200" cy="130" r="2.5" fill={accent} opacity="0.5" />
        {/* Connector lines */}
        <line x1="160" y1="40" x2="185" y2="90" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <line x1="185" y1="90" x2="140" y2="110" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <line x1="140" y1="110" x2="200" y2="130" stroke={accent} strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg2)' }}>
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div className="sec-tag">Experience</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="sec-h" style={{ marginBottom: 0 }}>
              Where I&apos;ve <span style={{ color: 'var(--accent)' }}>worked</span>
            </h2>
            <p style={{ fontSize: 16.5, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 420, paddingBottom: 4 }}>
              Real work, real teams, real impact — building production-grade software that serves actual users.
            </p>
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
              }}
            >
              {/* Top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${exp.accent}, ${exp.accent}55, transparent)` }} />

              {/* Decorative SVG graphic */}
              <CardGraphic accent={exp.accent} />

              <div style={{ position: 'relative', zIndex: 1, padding: '52px 56px' }}>

                {/* ─ Top row: company + badge + link ─ */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    {/* Company logo */}
                    <div style={{
                      width: 68, height: 68, borderRadius: 18, flexShrink: 0,
                      background: exp.accentBg, border: `2px solid ${exp.accentBorder}`,
                      overflow: 'hidden',
                      boxShadow: `0 0 32px ${exp.accentBg}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                        <span style={{
                          fontSize: 26, fontWeight: 800, color: 'rgba(255,255,255,0.95)',
                          fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
                          letterSpacing: '-0.5px',
                        }}>
                          {exp.company}
                        </span>
                        {exp.url && (
                          <a
                            href={exp.url} target="_blank" rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 5,
                              fontSize: 11.5, fontWeight: 600, color: exp.accent,
                              padding: '3px 10px', borderRadius: 99,
                              background: exp.accentBg, border: `1px solid ${exp.accentBorder}`,
                              textDecoration: 'none', letterSpacing: '0.04em',
                              transition: 'opacity 0.2s',
                            }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            foxmen.studio
                          </a>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          {exp.location}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                        <span style={{ fontSize: 14, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          {exp.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <span style={{
                    padding: '8px 20px', borderRadius: 99,
                    fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: exp.badgeType === 'full' ? '#20b0f8' : '#a78bfa',
                    background: exp.badgeType === 'full' ? 'rgba(32,176,248,0.1)' : 'rgba(124,58,237,0.1)',
                    border: exp.badgeType === 'full' ? '1px solid rgba(32,176,248,0.25)' : '1px solid rgba(124,58,237,0.25)',
                  }}>
                    {exp.badge}
                  </span>
                </div>

                {/* Role + tagline */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{
                    fontSize: 24, fontWeight: 800, color: 'rgba(255,255,255,0.92)', marginBottom: 8,
                    fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", letterSpacing: '-0.4px',
                  }}>
                    {exp.role}
                  </div>
                  <div style={{ fontSize: 15, color: exp.accent, fontStyle: 'italic', opacity: 0.85 }}>
                    {exp.tagline}
                  </div>
                </div>

                {/* ─ Stats row ─ */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                  {exp.stats.map(s => (
                    <div
                      key={s.label}
                      style={{
                        padding: '16px 28px', borderRadius: 14, flexShrink: 0,
                        background: exp.accentBg, border: `1px solid ${exp.accentBorder}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                      }}
                    >
                      <span style={{
                        fontSize: 28, fontWeight: 900, color: exp.accent,
                        fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", lineHeight: 1,
                      }}>
                        {s.num}
                      </span>
                      <span style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ─ Bullet points ─ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                  {exp.bullets.map((b, bi) => (
                    <motion.div
                      key={bi}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: bi * 0.07 + 0.2 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}
                    >
                      <span style={{
                        fontSize: 19, flexShrink: 0,
                        width: 40, height: 40, borderRadius: 12,
                        background: exp.accentBg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {b.icon}
                      </span>
                      <p style={{ fontSize: 15.5, color: 'var(--text2)', lineHeight: 1.8, margin: 0, paddingTop: 8 }}>
                        {b.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* ─ Tech stack chips ─ */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginRight: 4 }}>
                    Stack:
                  </span>
                  {exp.tech.map(t => (
                    <span
                      key={t}
                      style={{
                        padding: '7px 16px', borderRadius: 10, fontSize: 13.5, fontWeight: 500,
                        color: 'rgba(255,255,255,0.65)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {t}
                    </span>
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
