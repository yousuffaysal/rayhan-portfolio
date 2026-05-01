'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { personalInfo } from '@/data/portfolio'

export default function Footer() {
  return (
    <motion.footer variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <span>
        © 2026 Rayhan Ahmed. Crafted with focus &amp;{' '}
        <span style={{ color: 'var(--accent)' }}>passion</span> in Dhaka 🇧🇩
      </span>
      <span>
        Designed &amp; built by{' '}
        <a href={personalInfo.github} target="_blank" rel="noreferrer">
          Rayhan Ahmed
        </a>
      </span>
    </motion.footer>
  )
}
