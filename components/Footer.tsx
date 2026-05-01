'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/data/portfolio'
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp, FaFileAlt } from 'react-icons/fa'

const year = new Date().getFullYear()

const navLinks = [
  { label: 'About',       href: '#about'       },
  { label: 'Skills',      href: '#skills'       },
  { label: 'Experience',  href: '#experience'   },
  { label: 'Projects',    href: '#projects'     },
  { label: 'Certificates',href: '#certificates' },
  { label: 'Contact',     href: '#contact'      },
]

const socials = [
  { label: 'GitHub',    href: personalInfo.github,    accent: '#e6edf3', Icon: FaGithub    },
  { label: 'LinkedIn',  href: personalInfo.linkedin,  accent: '#0a66c2', Icon: FaLinkedin  },
  { label: 'Facebook',  href: personalInfo.facebook,  accent: '#1877f2', Icon: FaFacebook  },
  { label: 'WhatsApp',  href: personalInfo.whatsapp,  accent: '#25d366', Icon: FaWhatsapp  },
]

const techStack = [
  { name: 'Next.js 15',  accent: '#20b0f8' },
  { name: 'TypeScript',  accent: '#a78bfa' },
  { name: 'Node.js',     accent: '#34d399' },
  { name: 'PostgreSQL',  accent: '#fbbf24' },
  { name: 'Prisma',      accent: '#a78bfa' },
  { name: 'Docker',      accent: '#20b0f8' },
  { name: 'Golang',      accent: '#34d399' },
  { name: 'Tailwind',    accent: '#60a5fa' },
]

export default function Footer() {
  return (
    <footer style={{ position: 'relative', background: 'var(--bg2)', overflow: 'hidden' }}>

      {/* Ambient background orbs */}
      <div style={{ position: 'absolute', top: -120, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,176,248,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, right: -60, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── CTA banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 1,
          margin: '0 clamp(20px, 4vw, 72px)',
          borderRadius: 28,
          padding: 'clamp(40px, 6vw, 72px) clamp(28px, 5vw, 64px)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'hidden',
          marginTop: 'clamp(60px, 8vw, 100px)',
        }}
      >
        {/* CTA top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #20b0f8, #a78bfa, transparent 70%)', boxShadow: '0 0 16px rgba(32,176,248,0.5)' }} />
        {/* CTA corner glow */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,176,248,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: '30%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 36 }}>
          <div style={{ maxWidth: 560 }}>
            {/* Availability badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80', animation: 'blink 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "var(--font-m),'DM Mono',monospace" }}>Available for new projects</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-1.5px', color: 'var(--text)', marginBottom: 16,
              fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif",
            }}>
              Let&rsquo;s build something <span style={{ color: 'var(--accent)' }}>remarkable</span> together.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8 }}>
              Have a project in mind? Drop me a message and let&rsquo;s turn your idea into a production-ready product.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flexShrink: 0 }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 32px', borderRadius: 14,
                fontSize: 15, fontWeight: 700,
                color: '#07080f', background: '#20b0f8',
                border: 'none', textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(32,176,248,0.4)',
                fontFamily: "var(--font-b),'Instrument Sans',sans-serif",
                letterSpacing: '0.01em',
              }}
            >
              Start a Conversation
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 14,
                fontSize: 14, fontWeight: 600,
                color: 'var(--text2)', background: 'var(--surface2)',
                border: '1px solid var(--border2)', textDecoration: 'none',
                letterSpacing: '0.01em', textAlign: 'center', justifyContent: 'center',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {personalInfo.email}
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Main footer grid ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(56px,7vw,96px) clamp(20px,4vw,72px) 0' }}>
        <div className="footer-grid">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <a href="#hero" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif",
                fontSize: 16, fontWeight: 800, color: '#07080f', letterSpacing: '-0.5px',
                boxShadow: '0 0 20px rgba(32,176,248,0.3)',
                flexShrink: 0,
              }}>RA</div>
              <span style={{ fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--text)', letterSpacing: '-0.5px' }}>
                Rayhan<span style={{ color: 'var(--accent)' }}>.</span>dev
              </span>
            </a>

            <p style={{ fontSize: 14.5, color: 'var(--text2)', lineHeight: 1.8, margin: 0, maxWidth: 280 }}>
              Full-Stack Engineer crafting scalable digital products from Dhaka, Bangladesh. Co-Founder at Foxmen Studio.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: personalInfo.location, href: null },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: '+880 1645-991970', href: `tel:${personalInfo.phone}` },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--accent)', opacity: 0.8, flexShrink: 0 }}>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: 13.5, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
                    >{item.label}</a>
                  ) : (
                    <span style={{ fontSize: 13.5, color: 'var(--text2)' }}>{item.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href} target="_blank" rel="noreferrer"
                  title={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: 11,
                    background: 'var(--surface2)', border: '1px solid var(--border2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text2)', transition: 'all 0.25s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = s.accent
                    el.style.color = s.accent
                    el.style.background = `${s.accent}14`
                    el.style.boxShadow = `0 0 12px ${s.accent}44`
                    el.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'var(--border2)'
                    el.style.color = 'var(--text2)'
                    el.style.background = 'var(--surface2)'
                    el.style.boxShadow = 'none'
                    el.style.transform = 'none'
                  }}
                >
                  <s.Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--accent)', fontFamily: "var(--font-m),'DM Mono',monospace", marginBottom: 4 }}>
              Navigate
            </div>
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontSize: 15, color: 'var(--text2)', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'var(--text)'
                  el.style.paddingLeft = '6px'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'var(--text2)'
                  el.style.paddingLeft = '0px'
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', opacity: 0.5 }} />
                {l.label}
              </a>
            ))}
          </motion.div>

          {/* Connect column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.13 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#a78bfa', fontFamily: "var(--font-m),'DM Mono',monospace", marginBottom: 4 }}>
              Connect
            </div>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href} target="_blank" rel="noreferrer"
                style={{ fontSize: 15, color: 'var(--text2)', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 10 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = s.accent
                  el.style.paddingLeft = '4px'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'var(--text2)'
                  el.style.paddingLeft = '0px'
                }}
              >
                <span style={{ color: s.accent, opacity: 0.8, display: 'flex' }}><s.Icon size={17} /></span>
                {s.label}
              </a>
            ))}
            <a
              href={personalInfo.cvLink} target="_blank" rel="noreferrer"
              style={{ fontSize: 15, color: 'var(--text2)', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 4 }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#34d399' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text2)' }}
            >
              <span style={{ color: '#34d399', opacity: 0.8, display: 'flex' }}><FaFileAlt size={17} /></span>
              Download CV
            </a>
          </motion.div>

          {/* Tech stack column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.18 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#34d399', fontFamily: "var(--font-m),'DM Mono',monospace", marginBottom: 4 }}>
              Current Stack
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {techStack.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.accent, display: 'inline-block', flexShrink: 0, boxShadow: `0 0 7px ${t.accent}99` }} />
                  <span style={{ fontSize: 14, color: 'var(--text2)', fontWeight: 500 }}>{t.name}</span>
                </div>
              ))}
            </div>

            {/* Studio card */}
            <div style={{
              marginTop: 8, padding: '16px 20px', borderRadius: 16,
              background: 'var(--surface)', border: '1px solid var(--border)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text3)', marginBottom: 8, fontFamily: "var(--font-m),'DM Mono',monospace" }}>
                Co-Founder at
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: "var(--font-d),'Bricolage Grotesque',sans-serif", letterSpacing: '-0.3px', marginBottom: 4 }}>
                Foxmen Studio
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                Building digital products for clients worldwide.
              </div>
              <a
                href="https://foxmen.studio" target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  marginTop: 12, fontSize: 12.5, fontWeight: 600,
                  color: 'var(--accent)', textDecoration: 'none', transition: 'opacity 0.2s',
                }}
              >
                Visit Studio ↗
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: 'relative', zIndex: 1,
          margin: 'clamp(48px,6vw,80px) clamp(20px,4vw,72px) 0',
          paddingTop: 24, paddingBottom: 36,
          borderTop: '1px solid var(--border)',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 13.5, color: 'var(--text3)', fontWeight: 500 }}>
            © {year} Rayhan Ahmed. All rights reserved.
          </span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border2)', display: 'inline-block' }} />
          <span style={{ fontSize: 13.5, color: 'var(--text3)', fontWeight: 500 }}>
            Crafted with passion in Dhaka&nbsp;🇧🇩
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12.5, color: 'var(--text3)', fontFamily: "var(--font-m),'DM Mono',monospace" }}>
            Built with
          </span>
          {['Next.js', 'Framer Motion', 'Tailwind'].map((t, i) => (
            <span key={t} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 8,
              fontSize: 11.5, fontWeight: 600,
              color: 'var(--text3)', background: 'var(--surface)', border: '1px solid var(--border)',
              fontFamily: "var(--font-m),'DM Mono',monospace",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: ['#20b0f8','#a78bfa','#60a5fa'][i], display: 'inline-block' }} />
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
          gap: clamp(32px, 5vw, 72px);
        }
        @media (max-width: 1100px) {
          .footer-grid { grid-template-columns: 1fr 1fr }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr }
        }
      `}</style>
    </footer>
  )
}
