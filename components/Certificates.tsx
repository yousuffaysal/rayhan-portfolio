'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { certificatesData } from '@/data/portfolio'

// ─── Shiny Ribbon Graphic ───────────────────────────────────────────────────
function RibbonGraphic({ color }: { color: string }) {
  return (
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ position: 'absolute', top: -10, right: -10, opacity: 0.4 }}>
      <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      <path d="M50 10 L50 30 M90 50 L70 50 M50 90 L50 70 M10 50 L30 50" stroke={color} strokeWidth="1" />
      <path d="M25 25 L40 40 M75 25 L60 40 M75 75 L60 60 M25 75 L40 60" stroke={color} strokeWidth="1" />
    </svg>
  )
}

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────
function CertCard({ cert, index }: { cert: any; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / width) - 0.5
    const yPct = (mouseY / height) - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="cert-card-3d"
      >
        <div className="cert-card-inner">
          <RibbonGraphic color="var(--accent)" />
          
          <div className="cert-header">
            <div className="cert-icon-wrap" style={{ background: cert.iconBg }}>
              <span className="cert-emoji">{cert.icon}</span>
              <div className="cert-icon-glow" style={{ background: cert.iconBg }} />
            </div>
            <div className="cert-issuer-info">
              <span className="cert-official">Official Certification</span>
              <h4 className="cert-issuer">{cert.issuer}</h4>
            </div>
          </div>

          <h3 className="cert-title">{cert.name}</h3>
          
          <div className="cert-divider" />
          
          <div className="cert-footer">
            <div className="cert-meta">
              <span className="cert-label">Issued In</span>
              <span className="cert-value">{cert.year}</span>
            </div>
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="cert-verify-btn">
              Verify Credential
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          {/* Decorative light reflection overlay */}
          <div className="cert-shimmer" />
        </div>
      </motion.div>

      <style jsx>{`
        .cert-card-3d {
          position: relative;
          width: 100%;
          min-height: 280px;
          cursor: pointer;
        }
        .cert-card-inner {
          position: relative;
          height: 100%;
          padding: 40px;
          background: var(--surface);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid var(--border);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 24px;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .cert-card-inner:hover {
          border-color: rgba(32, 176, 248, 0.4);
          background: var(--surface2);
        }
        .cert-header {
          display: flex;
          align-items: center;
          gap: 20px;
          transform: translateZ(20px);
        }
        .cert-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .cert-emoji {
          font-size: 32px;
          z-index: 2;
        }
        .cert-icon-glow {
          position: absolute;
          inset: 0;
          filter: blur(15px);
          opacity: 0.4;
          border-radius: inherit;
        }
        .cert-issuer-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cert-official {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          opacity: 0.8;
        }
        .cert-issuer {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .cert-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text);
          line-height: 1.3;
          margin: 0;
          font-family: var(--font-d);
          transform: translateZ(40px);
        }
        .cert-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--border2), transparent);
          margin-top: auto;
        }
        .cert-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          transform: translateZ(30px);
        }
        .cert-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cert-label {
          font-size: 11px;
          color: var(--text3);
          font-weight: 600;
          text-transform: uppercase;
        }
        .cert-value {
          font-size: 15px;
          color: var(--text);
          font-weight: 700;
        }
        .cert-verify-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: var(--surface2);
          border: 1px solid var(--border2);
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .cert-verify-btn:hover {
          background: var(--accent);
          color: #000;
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .cert-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%);
          background-size: 200% 200%;
          animation: shimmer 8s infinite linear;
          pointer-events: none;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0%; }
          100% { background-position: -200% 0%; }
        }
      `}</style>
    </motion.div>
  )
}

export default function Certificates() {
  return (
    <section id="certificates" style={{ background: 'var(--bg)', paddingTop: 120, paddingBottom: 120 }}>
      <div style={{ padding: '0 clamp(24px, 5vw, 80px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <div className="sec-tag">Credentials</div>
          <h2 className="sec-h">Certificates & <span style={{ color: 'var(--accent)' }}>Recognition</span></h2>
          <p style={{ color: 'var(--text2)', maxWidth: 600, fontSize: 16, lineHeight: 1.6, marginTop: 16 }}>
            Validating technical expertise and industry standards through professional certifications and academic honors.
          </p>
        </motion.div>

        <div className="cert-grid-custom">
          {certificatesData.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .cert-grid-custom {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
          gap: 24px;
        }
        @media (max-width: 768px) {
          .cert-grid-custom {
            gap: 16px;
          }
        }
      `}</style>
    </section>
  )
}
