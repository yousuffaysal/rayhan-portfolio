'use client'

import { useEffect, useRef, useState } from 'react'
import { personalInfo, roles } from '@/data/portfolio'

function useTyping(words: string[]) {
  const [text, setText] = useState('')
  const state = useRef({ ri: 0, ci: 0, deleting: false })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    function tick() {
      const { ri, ci, deleting } = state.current
      const word = words[ri]
      if (!deleting) {
        const next = ci + 1
        setText(word.slice(0, next))
        if (next === word.length) {
          state.current.deleting = true
          timer = setTimeout(tick, 1800)
        } else {
          state.current.ci = next
          timer = setTimeout(tick, 75)
        }
      } else {
        const next = ci - 1
        setText(word.slice(0, next))
        if (next === 0) {
          state.current.deleting = false
          state.current.ri = (ri + 1) % words.length
          state.current.ci = 0
        } else {
          state.current.ci = next
        }
        timer = setTimeout(tick, 38)
      }
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [words])

  return text
}

function useCounter(target: number, trigger: boolean, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = target / (duration / 16)
    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(interval)
  }, [trigger, target, duration])
  return count
}

export default function Hero() {
  const typed = useTyping(roles)
  const [badgeVisible, setBadgeVisible] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)
  const yearsCount = useCounter(2, badgeVisible)

  useEffect(() => {
    const el = badgeRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBadgeVisible(true) },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="hero">
      <div className="hero-left">
        <div className="hero-avail rv">
          <span className="dot" />
          Available for new opportunities
        </div>
        <h1 className="hero-name">
          <span className="rv d1" style={{ display: 'block' }}>Rayhan</span>
          <span className="rv d2" style={{ display: 'block' }}>
            <span className="blue">Ahmed</span>
          </span>
          <span className="rv d3" style={{ display: 'block', color: 'var(--text3)' }}>Developer</span>
        </h1>
        <div className="hero-role rv d3">
          <span>{typed}</span>
          <span className="cursor" />
        </div>
        <p className="hero-desc rv d4">
          I build fast, beautiful, and accessible web applications — from pixel-perfect UIs to
          robust backends. Based in <strong style={{ color: 'var(--text)' }}>Dhaka, Bangladesh</strong> 🇧🇩
        </p>
        <div className="rv d4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <a href="#projects" className="btn btn-fill">
            View Projects{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="/Rayhan-CV.pdf" download className="btn btn-ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Resume
          </a>
        </div>
        <div className="hero-socials rv d5">
          <a href={personalInfo.github} className="hs-link" title="GitHub" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </a>
          <a href={personalInfo.linkedin} className="hs-link" title="LinkedIn" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href={personalInfo.twitter} className="hs-link" title="Twitter / X" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href={personalInfo.whatsapp} className="hs-link" title="WhatsApp" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-img-wrap" ref={badgeRef}>
          <div className="hero-photo-bg" />
          <div className="hero-photo-card rv d2">
            <div className="hero-photo-inner">
              <div className="photo-placeholder">
                <div className="photo-initials">RA</div>
                <div className="photo-label">rayhan ahmed</div>
              </div>
            </div>
          </div>
          <div className="hero-badge-float rv d4">
            <div className="hbf-num">{yearsCount}+</div>
            <div className="hbf-label">Years Exp.</div>
          </div>
          <div className="hero-badge-float2 rv d5">
            <div className="hbf2-icon">🚀</div>
            <div>
              <div className="hbf2-t">7+ Projects</div>
              <div className="hbf2-s">Shipped to production</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
