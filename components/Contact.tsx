'use client'

import { useState, FormEvent } from 'react'
import { personalInfo } from '@/data/portfolio'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-tag rv">Contact</div>
        <h2 className="sec-h rv d1">
          Let&rsquo;s build<br />
          <span style={{ color: 'var(--accent)' }}>something great</span>
        </h2>
        <div className="contact-wrap">
          <div className="rv d1">
            <div className="contact-info-title">Got a project in mind?</div>
            <div className="contact-body">
              Whether it&rsquo;s a new product, freelance work, or just a chat about tech — my inbox
              is always open. I respond within 24 hours.
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
          </div>

          <div className="rv d2">
            {sent ? (
              <div className="form-success">
                <span className="form-success-icon">🎉</span>
                <div className="form-success-h">Message Sent!</div>
                Thanks for reaching out. I&rsquo;ll get back to you within 24 hours.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="fg">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Arif"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fg">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Hossain"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="fg">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="arif@company.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="fg">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project / Collaboration / Other"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="fg">
                  <label>Message</label>
                  <textarea
                    rows={5}
                    name="message"
                    placeholder="Tell me about your project, deadline, and budget..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="form-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
