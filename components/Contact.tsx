'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight } from '@/lib/animations'
import { personalInfo } from '@/data/portfolio'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          subject: form.subject || undefined,
          message: form.message,
        }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact">
      <div className="wrap">
        <motion.div className="sec-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Contact
        </motion.div>
        <motion.h2 className="sec-h" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Let&rsquo;s build<br />
          <span style={{ color: 'var(--accent)' }}>something great</span>
        </motion.h2>

        <div className="contact-wrap">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="contact-info-title">Got a project in mind?</div>
            <div className="contact-body">
              Whether it&rsquo;s a new product, freelance work, or just a chat about tech — my inbox is
              always open. I respond within 24 hours.
            </div>
            <div className="contact-detail-list">
              <a href={`mailto:${personalInfo.email}`} className="cdl-item">
                <div className="cdl-icon">✉️</div>
                <div>
                  <div className="cdl-label">Email</div>
                  <div className="cdl-value">{personalInfo.email}</div>
                </div>
              </a>
              <a href={`tel:${personalInfo.phone}`} className="cdl-item">
                <div className="cdl-icon">📞</div>
                <div>
                  <div className="cdl-label">Phone</div>
                  <div className="cdl-value">{personalInfo.phone}</div>
                </div>
              </a>
              <a href={personalInfo.whatsapp} className="cdl-item" target="_blank" rel="noreferrer">
                <div className="cdl-icon">💬</div>
                <div>
                  <div className="cdl-label">WhatsApp</div>
                  <div className="cdl-value">{personalInfo.phone}</div>
                </div>
              </a>
              <div className="cdl-item">
                <div className="cdl-icon">📍</div>
                <div>
                  <div className="cdl-label">Location</div>
                  <div className="cdl-value">{personalInfo.location} · Remote OK</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {sent ? (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="form-success-icon">🎉</span>
                <div className="form-success-h">Message Sent!</div>
                Thanks for reaching out. I&rsquo;ll get back to you within 24 hours.
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="fg">
                    <label>First Name</label>
                    <input type="text" name="firstName" placeholder="Arif" required value={form.firstName} onChange={handleChange} />
                  </div>
                  <div className="fg">
                    <label>Last Name</label>
                    <input type="text" name="lastName" placeholder="Hossain" required value={form.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div className="fg">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="arif@company.com" required value={form.email} onChange={handleChange} />
                </div>
                <div className="fg">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="Project / Collaboration / Other" value={form.subject} onChange={handleChange} />
                </div>
                <div className="fg">
                  <label>Message</label>
                  <textarea rows={5} name="message" placeholder="Tell me about your project, deadline, and budget..." value={form.message} onChange={handleChange} />
                </div>
                {error && (
                  <div style={{
                    padding: '10px 14px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: 10,
                    fontSize: 13,
                    color: '#f87171',
                  }}>
                    {error}
                  </div>
                )}
                <button type="submit" className="form-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? (
                    <>
                      <div style={{ width: 16, height: 16, border: '2px solid rgba(7,8,15,0.3)', borderTopColor: '#07080f', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
