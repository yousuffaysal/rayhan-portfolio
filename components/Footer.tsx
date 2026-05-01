'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { personalInfo } from '@/data/portfolio'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-main">
        
        {/* Brand Section */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="footer-brand">
          <a href="#hero" className="footer-logo">
            <div className="logo-mark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 12 4 L 4 20" />
                <path d="M 12 4 L 12 20" />
                <path d="M 12 4 H 17 C 20 4 20 12 17 12 H 12" />
                <path d="M 15 12 L 20 20" />
                <path d="M 8 13 H 12" />
              </svg>
            </div>
            <span className="logo-text">
              Rayhan<em>.</em>Ahmed
            </span>
          </a>
          <p className="footer-desc">
            Crafting premium digital experiences through modern web technologies. Focused on performance, accessibility, and high-end design.
          </p>
        </motion.div>

        {/* Links Section */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="footer-links-wrap">
          <div className="footer-link-group">
            <h4>Navigation</h4>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
          </div>
          
          <div className="footer-link-group">
            <h4>Connect</h4>
            <a href={`mailto:${personalInfo.email}`}>Email</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </motion.div>

      </div>

      {/* Bottom Bar */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="footer-bottom">
        <span className="copyright">
          © {currentYear} Rayhan Ahmed. All rights reserved.
        </span>
        <span className="made-with">
          Crafted with <span>passion</span> in Dhaka 🇧🇩
        </span>
      </motion.div>

      <style jsx>{`
        .footer-container {
          position: relative;
          background: var(--bg2);
          border-top: 1px solid var(--border);
          padding: 80px clamp(24px, 5vw, 80px) 40px;
          display: flex;
          flex-direction: column;
          gap: 60px;
          z-index: 1;
        }

        .footer-main {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 60px;
        }

        .footer-brand {
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-text {
          font-family: var(--font-d), 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: var(--text);
          letter-spacing: -0.5px;
        }

        .logo-text em {
          color: var(--accent);
          font-style: normal;
        }

        .footer-desc {
          color: var(--text2);
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
        }

        .footer-links-wrap {
          display: flex;
          gap: 80px;
          flex-wrap: wrap;
        }

        .footer-link-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-link-group h4 {
          color: var(--text);
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 4px 0;
          font-family: var(--font-d), 'Bricolage Grotesque', sans-serif;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .footer-link-group a {
          color: var(--text2);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .footer-link-group a:hover {
          color: var(--accent);
          transform: translateX(4px);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: 30px;
          border-top: 1px solid var(--border);
        }

        .copyright, .made-with {
          color: var(--text3);
          font-size: 14px;
          font-weight: 500;
        }

        .made-with span {
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 60px 24px 30px;
            gap: 40px;
          }
          .footer-links-wrap {
            gap: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  )
}
