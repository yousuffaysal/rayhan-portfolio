'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo, roles } from '@/data/portfolio'
import { ease } from '@/lib/animations'

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
          timer = setTimeout(tick, 72)
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
        timer = setTimeout(tick, 36)
      }
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [words])
  return text
}

function useCounter(target: number, trigger: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let n = 0
    const step = target / 40
    const interval = setInterval(() => {
      n += step
      if (n >= target) { setCount(target); clearInterval(interval) }
      else setCount(Math.floor(n))
    }, 35)
    return () => clearInterval(interval)
  }, [trigger, target])
  return count
}

const nameVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}
const wordVariant = {
  hidden: { opacity: 0, y: 80, skewY: 4 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease } },
}

export default function Hero() {
  const typed = useTyping(roles)
  const [started, setStarted] = useState(false)
  const years = useCounter(2, started)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero">
      {/* ambient orbs */}
      <div className="hero-bg-orb hero-bg-orb-1" />
      <div className="hero-bg-orb hero-bg-orb-2" />
      <div className="hero-bg-orb hero-bg-orb-3" />

      <div className="hero-left">
        <motion.div
          className="hero-avail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="dot" />
          Available for new opportunities
        </motion.div>

        <motion.h1
          className="hero-name"
          variants={nameVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={wordVariant} style={{ display: 'block', overflow: 'hidden' }}>
            Rayhan
          </motion.span>
          <motion.span variants={wordVariant} style={{ display: 'block', overflow: 'hidden' }}>
            <span className="blue">Ahmed</span>
          </motion.span>
          <motion.span variants={wordVariant} style={{ display: 'block', color: 'var(--text3)', overflow: 'hidden' }}>
            Developer
          </motion.span>
        </motion.h1>

        <motion.div
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span>{typed}</span>
          <span className="cursor" />
        </motion.div>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease }}
        >
          I build fast, beautiful, and accessible web applications — from pixel-perfect UIs to
          robust backends. Based in{' '}
          <strong style={{ color: 'var(--text)' }}>Dhaka, Bangladesh</strong> 🇧🇩
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease }}
        >
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
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <a href={personalInfo.github} className="hs-link" title="GitHub" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </a>
          <a href={personalInfo.linkedin} className="hs-link" title="LinkedIn" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href={personalInfo.facebook} className="hs-link" title="Facebook" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href={personalInfo.whatsapp} className="hs-link" title="WhatsApp" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </a>
        </motion.div>
      </div>

      <div className="hero-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/2lax2ytm2/rayhan%20(1).png"
          alt="Rayhan Ahmed"
          className="hero-photo-img"
        />
        <div className="hero-overlay" />

        <motion.div
          className="hero-badge-float"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6, ease }}
        >
          <div className="hbf-num">{years}+</div>
          <div className="hbf-label">Years Exp.</div>
        </motion.div>

        <motion.div
          className="hero-badge-float2"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6, ease }}
        >
          <div className="hbf2-icon">🚀</div>
          <div>
            <div className="hbf2-t">7+ Projects</div>
            <div className="hbf2-s">Shipped to production</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
