'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaCode, FaShoppingBag, FaFlask, FaGraduationCap, FaBriefcase,
  FaLeaf, FaLayerGroup, FaEdit, FaTrash, FaExternalLinkAlt,
  FaPlus, FaDownload, FaStar, FaHashtag,
} from 'react-icons/fa'

interface AdminProject {
  id: string
  name: string
  emoji: string
  tags: string[]
  desc: string
  fullDesc: string
  tech: string[]
  liveUrl: string
  ghClientUrl: string
  ghServerUrl: string
  screenshot: string
  challenges: string[]
  order: number
  featured: boolean
  createdAt: string
}

const emptyForm = {
  name: '', emoji: '🚀', tags: '', desc: '', fullDesc: '',
  tech: '', liveUrl: '#', ghClientUrl: '#', ghServerUrl: '#',
  screenshot: '', challenges: '', order: 0, featured: false,
}

const ACCENTS = [
  { color: '#20b0f8', glow: 'rgba(32,176,248,0.18)', bg: 'rgba(32,176,248,0.08)' },
  { color: '#a78bfa', glow: 'rgba(167,139,250,0.18)', bg: 'rgba(167,139,250,0.08)' },
  { color: '#34d399', glow: 'rgba(52,211,153,0.18)', bg: 'rgba(52,211,153,0.08)' },
  { color: '#fb923c', glow: 'rgba(251,146,60,0.18)', bg: 'rgba(251,146,60,0.08)' },
  { color: '#f472b6', glow: 'rgba(244,114,182,0.18)', bg: 'rgba(244,114,182,0.08)' },
  { color: '#fbbf24', glow: 'rgba(251,191,36,0.18)', bg: 'rgba(251,191,36,0.08)' },
]

function getIcon(tags: string[], size = 18) {
  const t = tags.map(x => x.toLowerCase()).join(' ')
  if (t.includes('research') || t.includes('ai')) return <FaFlask size={size} />
  if (t.includes('ecommerce') || t.includes('e-commerce') || t.includes('organic') || t.includes('shop')) return <FaShoppingBag size={size} />
  if (t.includes('education') || t.includes('tutor') || t.includes('learn')) return <FaGraduationCap size={size} />
  if (t.includes('business') || t.includes('crm') || t.includes('org')) return <FaBriefcase size={size} />
  if (t.includes('leaf') || t.includes('organic')) return <FaLeaf size={size} />
  if (t.includes('marketplace') || t.includes('platform')) return <FaLayerGroup size={size} />
  return <FaCode size={size} />
}

function NavBar({ onLogout }: { onLogout: () => void }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 clamp(16px, 3vw, 48px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <a href="/" style={{
          fontSize: 12.5, color: 'var(--text3)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.01em',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>
          </svg>
          Portfolio
        </a>
        <div style={{ width: 1, height: 16, background: 'var(--border2)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, color: '#07080f',
            fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
            boxShadow: '0 0 16px rgba(32,176,248,0.35)',
          }}>RA</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", letterSpacing: '-0.2px' }}>
            Admin
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {[{ label: 'Messages', href: '/admin/messages' }, { label: 'Projects', href: '/admin/projects', active: true }].map(tab => (
          <a key={tab.label} href={tab.href} style={{
            padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.2s', letterSpacing: '0.01em',
            color: tab.active ? 'var(--accent)' : 'var(--text2)',
            background: tab.active ? 'rgba(32,176,248,0.1)' : 'transparent',
            border: tab.active ? '1px solid rgba(32,176,248,0.25)' : '1px solid transparent',
          }}>{tab.label}</a>
        ))}
        <button onClick={onLogout} style={{
          padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: 'transparent', border: '1px solid var(--border2)',
          color: 'var(--text2)', cursor: 'pointer', marginLeft: 4,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>Logout</button>
      </div>
    </div>
  )
}

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<AdminProject[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editProject, setEditProject] = useState<AdminProject | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [seeding, setSeeding] = useState(false)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const checkAuth = useCallback(async () => {
    const res = await fetch('/api/admin/me')
    if (!res.ok) { router.replace('/admin/login'); return false }
    return true
  }, [router])

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/projects')
      if (res.ok) setProjects(await res.json())
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    checkAuth().then(ok => { if (ok) fetchProjects() })
  }, [checkAuth, fetchProjects])

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  function openAdd() {
    setEditProject(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(p: AdminProject) {
    setEditProject(p)
    setForm({
      name: p.name, emoji: p.emoji,
      tags: p.tags.join(', '),
      desc: p.desc, fullDesc: p.fullDesc,
      tech: p.tech.join(', '),
      liveUrl: p.liveUrl, ghClientUrl: p.ghClientUrl, ghServerUrl: p.ghServerUrl,
      screenshot: p.screenshot,
      challenges: p.challenges.join('\n'),
      order: p.order, featured: p.featured,
    })
    setShowForm(true)
  }

  async function handleScreenshotUpload(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) setForm(f => ({ ...f, screenshot: data.url }))
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      const body = {
        name: form.name.trim(),
        emoji: form.emoji.trim() || '🚀',
        tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
        desc: form.desc.trim(),
        fullDesc: form.fullDesc.trim(),
        tech: form.tech.split(',').map(s => s.trim()).filter(Boolean),
        liveUrl: form.liveUrl.trim() || '#',
        ghClientUrl: form.ghClientUrl.trim() || '#',
        ghServerUrl: form.ghServerUrl.trim() || '#',
        screenshot: form.screenshot.trim(),
        challenges: form.challenges.split('\n').map(s => s.trim()).filter(Boolean),
        order: Number(form.order),
        featured: form.featured,
      }
      const url = editProject ? `/api/admin/projects/${editProject.id}` : '/api/admin/projects'
      const method = editProject ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (res.ok) { setShowForm(false); fetchProjects() }
    } finally { setSaving(false) }
  }

  async function handleSeed() {
    setSeeding(true)
    try {
      await fetch('/api/admin/seed', { method: 'POST' })
      fetchProjects()
    } finally { setSeeding(false) }
  }

  async function handleDelete(id: string) {
    setDeleteId(id)
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    setDeleteId(null)
    fetchProjects()
  }

  const inp: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
    borderRadius: 10, padding: '11px 14px', width: '100%',
    fontSize: 14, color: 'var(--text)', outline: 'none',
    fontFamily: "var(--font-b), 'Instrument Sans', sans-serif",
    boxSizing: 'border-box', caretColor: 'var(--accent)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }
  const lbl: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, color: 'var(--text3)',
    letterSpacing: '0.06em', textTransform: 'uppercase',
    fontFamily: "var(--font-m), 'DM Mono', monospace",
    marginBottom: 7, display: 'block',
  }

  const featuredCount = projects.filter(p => p.featured).length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar onLogout={handleLogout} />

      <div style={{ padding: 'clamp(28px, 4vw, 56px) clamp(16px, 3vw, 48px)', maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 40, gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <h1 style={{
                fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, letterSpacing: '-0.8px',
                color: 'var(--text)', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
              }}>Projects</h1>
              <div style={{
                padding: '4px 12px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                background: 'rgba(32,176,248,0.1)', color: 'var(--accent)',
                border: '1px solid rgba(32,176,248,0.2)',
                fontFamily: "var(--font-m), 'DM Mono', monospace",
              }}>{projects.length}</div>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { label: 'Total', val: projects.length },
                { label: 'Featured', val: featuredCount },
                { label: 'Live', val: projects.filter(p => p.liveUrl !== '#').length },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif" }}>{s.val}</span>
                  <span style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: '0.02em' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button onClick={handleSeed} disabled={seeding} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600,
              background: 'rgba(255,255,255,0.04)', color: 'var(--text2)',
              border: '1px solid var(--border2)', cursor: seeding ? 'not-allowed' : 'pointer',
              fontFamily: "var(--font-b), 'Instrument Sans', sans-serif",
              opacity: seeding ? 0.5 : 1, letterSpacing: '0.01em',
            }}>
              <FaDownload size={12} />
              {seeding ? 'Importing…' : 'Import Portfolio'}
            </button>
            <button onClick={openAdd} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 22px', borderRadius: 12, fontSize: 14, fontWeight: 700,
              background: 'var(--accent)', color: '#07080f', border: 'none', cursor: 'pointer',
              fontFamily: "var(--font-b), 'Instrument Sans', sans-serif",
              boxShadow: '0 4px 24px rgba(32,176,248,0.35)',
              letterSpacing: '0.01em',
            }}>
              <FaPlus size={13} />
              Add Project
            </button>
          </div>
        </div>

        {/* Project list */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: 120, borderRadius: 20,
                background: 'linear-gradient(90deg, var(--surface) 0%, rgba(255,255,255,0.02) 50%, var(--surface) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                border: '1px solid var(--border)',
              }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            borderRadius: 24, border: '1px dashed var(--border2)',
            background: 'rgba(255,255,255,0.015)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18, margin: '0 auto 20px',
              background: 'rgba(32,176,248,0.1)', border: '1px solid rgba(32,176,248,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)',
            }}>
              <FaLayerGroup size={24} />
            </div>
            <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: 17, marginBottom: 8, fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif" }}>No projects yet</p>
            <p style={{ color: 'var(--text3)', fontSize: 14 }}>Click &ldquo;Import Portfolio&rdquo; to seed from static data, or add one manually.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {projects.map((p, i) => {
              const accent = ACCENTS[i % ACCENTS.length]
              const isHovered = hoverId === p.id
              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoverId(p.id)}
                  onMouseLeave={() => setHoverId(null)}
                  style={{
                    position: 'relative', borderRadius: 20,
                    background: isHovered ? 'rgba(255,255,255,0.03)' : 'var(--surface)',
                    border: `1px solid ${isHovered ? accent.color + '40' : 'var(--border)'}`,
                    boxShadow: isHovered
                      ? `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px ${accent.color}20, inset 0 1px 0 rgba(255,255,255,0.06)`
                      : '0 2px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
                    transition: 'all 0.25s ease',
                    overflow: 'hidden',
                  }}
                >
                  {/* Left accent strip */}
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
                    background: `linear-gradient(180deg, ${accent.color}, ${accent.color}60)`,
                    borderRadius: '20px 0 0 20px',
                  }} />

                  {/* Ambient corner glow */}
                  <div style={{
                    position: 'absolute', top: -40, right: -40, width: 140, height: 140,
                    borderRadius: '50%', background: accent.glow,
                    filter: 'blur(40px)', pointerEvents: 'none',
                    opacity: isHovered ? 1 : 0.5, transition: 'opacity 0.3s',
                  }} />

                  <div style={{ padding: '20px 24px 20px 28px', display: 'flex', alignItems: 'flex-start', gap: 20, position: 'relative' }}>
                    {/* Icon box */}
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                      background: accent.bg,
                      border: `1px solid ${accent.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: accent.color,
                      boxShadow: `0 0 0 4px ${accent.color}10`,
                    }}>
                      {getIcon(p.tags, 18)}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: 15.5, fontWeight: 750, color: 'var(--text)',
                          fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
                          letterSpacing: '-0.2px',
                        }}>{p.name}</span>
                        {p.featured && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99,
                            background: 'rgba(251,191,36,0.12)', color: '#fbbf24',
                            border: '1px solid rgba(251,191,36,0.25)',
                            textTransform: 'uppercase', letterSpacing: '0.07em',
                          }}>
                            <FaStar size={8} /> Featured
                          </span>
                        )}
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 3,
                          fontSize: 11, color: 'var(--text3)',
                          fontFamily: "var(--font-m), 'DM Mono', monospace",
                        }}>
                          <FaHashtag size={9} />{String(p.order + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.55, marginBottom: 10, maxWidth: 600 }}>
                        {p.desc}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {p.tags.map(t => (
                          <span key={t} style={{
                            fontSize: 11, padding: '3px 10px', borderRadius: 99,
                            background: accent.bg, border: `1px solid ${accent.color}25`,
                            color: accent.color, fontWeight: 600,
                            fontFamily: "var(--font-m), 'DM Mono', monospace",
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 7, flexShrink: 0, alignItems: 'center' }}>
                      {p.liveUrl !== '#' && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '8px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 600,
                            background: 'transparent', border: '1px solid var(--border2)',
                            color: 'var(--text2)', textDecoration: 'none', letterSpacing: '0.01em',
                            transition: 'all 0.15s',
                          }}
                        >
                          <FaExternalLinkAlt size={10} /> Live
                        </a>
                      )}
                      <button
                        onClick={() => openEdit(p)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '8px 16px', borderRadius: 10, fontSize: 12.5, fontWeight: 600,
                          background: accent.bg, border: `1px solid ${accent.color}35`,
                          color: accent.color, cursor: 'pointer', letterSpacing: '0.01em',
                          transition: 'all 0.15s',
                        }}
                      >
                        <FaEdit size={11} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deleteId === p.id}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '8px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 600,
                          background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)',
                          color: '#f87171', cursor: deleteId === p.id ? 'not-allowed' : 'pointer',
                          opacity: deleteId === p.id ? 0.5 : 1, letterSpacing: '0.01em',
                        }}
                      >
                        <FaTrash size={10} />{deleteId === p.id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </div>

                  {/* Tech strip */}
                  {p.tech.length > 0 && (
                    <div style={{
                      padding: '10px 28px 14px',
                      borderTop: '1px solid rgba(255,255,255,0.04)',
                      display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
                    }}>
                      <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: "var(--font-m), 'DM Mono', monospace", letterSpacing: '0.04em', marginRight: 4 }}>TECH</span>
                      {p.tech.slice(0, 8).map(t => (
                        <span key={t} style={{
                          fontSize: 11, padding: '2px 9px', borderRadius: 6,
                          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                          color: 'var(--text3)', fontFamily: "var(--font-m), 'DM Mono', monospace",
                        }}>{t}</span>
                      ))}
                      {p.tech.length > 8 && (
                        <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "var(--font-m), 'DM Mono', monospace" }}>+{p.tech.length - 8} more</span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal — landscape two-column layout */}
      {showForm && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(14px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px 24px', overflowY: 'auto',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false) }}
        >
          <div style={{
            width: '100%', maxWidth: 1080, borderRadius: 24,
            background: 'var(--bg)', border: '1px solid var(--border2)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Top accent bar */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, var(--accent), rgba(167,139,250,0.9), rgba(52,211,153,0.5))', borderRadius: '24px 24px 0 0', flexShrink: 0 }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px 0' }}>
              <div>
                <h2 style={{
                  fontSize: 20, fontWeight: 800, color: 'var(--text)',
                  fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif",
                  letterSpacing: '-0.5px', marginBottom: 2,
                }}>
                  {editProject ? 'Edit Project' : 'New Project'}
                </h2>
                <p style={{ fontSize: 12, color: 'var(--text3)' }}>
                  {editProject ? `Editing "${editProject.name}"` : 'Fill in the details for the new project'}
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border2)',
                  color: 'var(--text2)', cursor: 'pointer', fontSize: 13,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>
            </div>

            {/* Two-column body */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: '20px 28px' }}>

              {/* LEFT COLUMN — identity & meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingRight: 24, borderRight: '1px solid var(--border)' }}>

                {/* Name + Emoji */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: 10 }}>
                  <div>
                    <span style={lbl}>Project Name *</span>
                    <input style={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="My Awesome Project" />
                  </div>
                  <div>
                    <span style={lbl}>Emoji</span>
                    <input style={{ ...inp, textAlign: 'center', fontSize: 20 }} value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} />
                  </div>
                </div>

                {/* Tags + Order */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 10 }}>
                  <div>
                    <span style={lbl}>Tags (comma separated)</span>
                    <input style={inp} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Full-Stack, React, PostgreSQL" />
                  </div>
                  <div>
                    <span style={lbl}>Order</span>
                    <input style={inp} type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} />
                  </div>
                </div>

                {/* Featured toggle */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                  borderRadius: 10, background: form.featured ? 'rgba(251,191,36,0.06)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${form.featured ? 'rgba(251,191,36,0.25)' : 'var(--border)'}`,
                  transition: 'all 0.2s',
                }}>
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    style={{ width: 15, height: 15, accentColor: '#fbbf24', cursor: 'pointer' }}
                  />
                  <label htmlFor="featured" style={{ fontSize: 12.5, color: form.featured ? '#fbbf24' : 'var(--text2)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <FaStar size={11} /> Featured — shown prominently on the portfolio
                  </label>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--border)' }} />

                {/* Links */}
                <div>
                  <span style={lbl}>Links</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div>
                      <span style={{ ...lbl, fontSize: 10, color: 'var(--text3)', marginBottom: 4 }}>Live URL</span>
                      <input style={inp} value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} placeholder="https://…" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div>
                        <span style={{ ...lbl, fontSize: 10, color: 'var(--text3)', marginBottom: 4 }}>Frontend GitHub</span>
                        <input style={inp} value={form.ghClientUrl} onChange={e => setForm(f => ({ ...f, ghClientUrl: e.target.value }))} placeholder="github.com/…" />
                      </div>
                      <div>
                        <span style={{ ...lbl, fontSize: 10, color: 'var(--text3)', marginBottom: 4 }}>Backend GitHub</span>
                        <input style={inp} value={form.ghServerUrl} onChange={e => setForm(f => ({ ...f, ghServerUrl: e.target.value }))} placeholder="github.com/…" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screenshot */}
                <div>
                  <span style={lbl}>Screenshot</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                    style={{ display: 'none' }}
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleScreenshotUpload(f) }}
                  />
                  {/* Preview */}
                  {form.screenshot && (
                    <div style={{
                      position: 'relative', marginBottom: 8, borderRadius: 10, overflow: 'hidden',
                      border: '1px solid var(--border2)', height: 90,
                    }}>
                      <img
                        src={form.screenshot}
                        alt="screenshot preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      <button
                        onClick={() => setForm(f => ({ ...f, screenshot: '' }))}
                        style={{
                          position: 'absolute', top: 6, right: 6,
                          width: 22, height: 22, borderRadius: '50%',
                          background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                          color: '#fff', fontSize: 10, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >✕</button>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      style={{
                        padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                        background: uploading ? 'rgba(32,176,248,0.15)' : 'rgba(32,176,248,0.12)',
                        border: '1px solid rgba(32,176,248,0.3)',
                        color: uploading ? 'var(--text3)' : 'var(--accent)',
                        cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {uploading ? 'Uploading…' : '↑ Upload'}
                    </button>
                    <input
                      style={{ ...inp, marginBottom: 0, flex: 1 }}
                      value={form.screenshot}
                      onChange={e => setForm(f => ({ ...f, screenshot: e.target.value }))}
                      placeholder="/projects/myproject.png or https://…"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 24 }}>
                <div>
                  <span style={lbl}>Short Description *</span>
                  <textarea style={{ ...inp, resize: 'vertical', minHeight: 68 }} value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Brief description shown on the project card…" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={lbl}>Full Description *</span>
                  <textarea style={{ ...inp, resize: 'vertical', minHeight: 120 }} value={form.fullDesc} onChange={e => setForm(f => ({ ...f, fullDesc: e.target.value }))} placeholder="Detailed description shown in the modal…" />
                </div>
                <div>
                  <span style={lbl}>Tech Stack (comma separated)</span>
                  <input style={inp} value={form.tech} onChange={e => setForm(f => ({ ...f, tech: e.target.value }))} placeholder="React, Node.js, PostgreSQL, Prisma…" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={lbl}>Challenges (one per line)</span>
                  <textarea
                    style={{ ...inp, resize: 'vertical', minHeight: 90 }}
                    value={form.challenges}
                    onChange={e => setForm(f => ({ ...f, challenges: e.target.value }))}
                    placeholder={'Integrating Stripe payments securely.\nBuilding a real-time booking system.'}
                  />
                </div>
              </div>
            </div>

            {/* Footer actions — full width */}
            <div style={{ display: 'flex', gap: 12, padding: '0 28px 24px', borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                style={{
                  flex: 1, padding: '13px 0', borderRadius: 12, fontSize: 14, fontWeight: 700,
                  background: saving || !form.name.trim() ? 'rgba(32,176,248,0.35)' : 'var(--accent)',
                  color: '#07080f', border: 'none',
                  cursor: saving || !form.name.trim() ? 'not-allowed' : 'pointer',
                  fontFamily: "var(--font-b), 'Instrument Sans', sans-serif",
                  boxShadow: saving || !form.name.trim() ? 'none' : '0 4px 20px rgba(32,176,248,0.3)',
                  transition: 'all 0.2s', letterSpacing: '0.01em',
                }}
              >
                {saving ? 'Saving…' : editProject ? 'Save Changes' : 'Add Project'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: '13px 32px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border2)',
                  color: 'var(--text2)', cursor: 'pointer', letterSpacing: '0.01em',
                }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
        textarea, input { caret-color: var(--accent) !important; }
        textarea:focus, input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px rgba(32,176,248,0.12) !important;
        }
      `}</style>
    </div>
  )
}
