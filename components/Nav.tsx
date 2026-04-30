'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [stuck, setStuck] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
          rayhan<em>.</em>dev
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a
          href="/Rayhan-CV.pdf"
          download
          className="nav-resume"
        >
          Download CV ↓
        </a>
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
        <a href="/Rayhan-CV.pdf" download className="btn btn-fill" onClick={closeMob}>
          Download CV
        </a>
      </div>
    </>
  )
}
