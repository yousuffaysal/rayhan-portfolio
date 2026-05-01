'use client'

import { motion } from 'framer-motion'
import { fadeUp, scaleIn, stagger } from '@/lib/animations'
import { certificatesData } from '@/data/portfolio'

export default function Certificates() {
  return (
    <section id="certificates">
      <div className="wrap">
        <motion.div className="sec-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Credentials
        </motion.div>
        <motion.h2 className="sec-h" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Certificates &amp; <span style={{ color: 'var(--accent)' }}>Recognition</span>
        </motion.h2>
        <motion.div
          className="cert-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certificatesData.map((cert, i) => (
            <motion.div key={cert.name} className="cert-card" variants={scaleIn} custom={i}>
              <div className="cert-issuer-row">
                <div className="cert-icon" style={{ background: cert.iconBg }}>{cert.icon}</div>
                <div className="cert-issuer-name">{cert.issuer}</div>
              </div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-foot">
                <span>Issued {cert.year}</span>
                <a href={cert.verifyUrl} className="cert-verify">Verify ↗</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
