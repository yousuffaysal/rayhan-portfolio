'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { personalInfo } from '@/data/portfolio'

export default function Nav() {
  const [stuck, setStuck] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMob = () => setMobileOpen(false)

  return (
    <>
      <nav id="nav" className={stuck ? 'stuck' : ''}>
        <a href="#hero" className="nav-logo">
          <div className="logo-mark">RA</div>
          <span className="logo-text">rayhan<em>.</em>dev</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href={`mailto:${personalInfo.email}`} className="nav-email">
            Email: {personalInfo.email}
          </a>
          <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" className="nav-resume">
            Contact Me
          </a>
        </div>
        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a href="#about" onClick={closeMob}>About</a>
        <a href="#skills" onClick={closeMob}>Skills</a>
        <a href="#experience" onClick={closeMob}>Experience</a>
        <a href="#projects" onClick={closeMob}>Projects</a>
        <a href="#education" onClick={closeMob}>Education</a>
        <a href="#contact" onClick={closeMob}>Contact</a>
        <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" className="btn btn-fill" onClick={closeMob}>
          Contact Me
        </a>
      </div>
    </>
  )
}
