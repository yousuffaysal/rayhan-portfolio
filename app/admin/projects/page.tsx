'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

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

function NavBar({ onLogout }: { onLogout: () => void }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'color-mix(in srgb, var(--bg) 90%, transparent)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 clamp(16px, 3vw, 40px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <a href="/" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
          Portfolio
        </a>
        <span style={{ color: 'var(--border2)' }}>·</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif" }}>
          Admin Panel
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {[{ label: 'Messages', href: '/admin/messages' }, { label: 'Projects', href: '/admin/projects', active: true }].map(tab => (
          <a key={tab.label} href={tab.href} style={{
            padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.2s',
            color: tab.active ? 'var(--accent)' : 'var(--text2)',
            background: tab.active ? 'rgba(32,176,248,0.1)' : 'transparent',
            border: tab.active ? '1px solid rgba(32,176,248,0.25)' : '1px solid transparent',
          }}>{tab.label}</a>
        ))}
        <button onClick={onLogout} style={{
          padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          background: 'transparent', border: '1px solid var(--border2)',
          color: 'var(--text2)', cursor: 'pointer', transition: 'all 0.2s', marginLeft: 4,
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
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 10, padding: '11px 14px', width: '100%',
    fontSize: 14, color: 'var(--text)', outline: 'none',
    fontFamily: "var(--font-b), 'Instrument Sans', sans-serif",
    boxSizing: 'border-box',
  }
  const label: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: 'var(--text2)',
    letterSpacing: '0.04em', textTransform: 'uppercase',
    fontFamily: "var(--font-m), 'DM Mono', monospace", marginBottom: 6, display: 'block',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar onLogout={handleLogout} />

      <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 40px)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text)', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", marginBottom: 4 }}>
              Projects
            </h1>
            <p style={{ fontSize: 13.5, color: 'var(--text2)' }}>{projects.length} total projects</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSeed} disabled={seeding} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700,
              background: 'transparent', color: 'var(--text2)',
              border: '1px solid var(--border2)', cursor: seeding ? 'not-allowed' : 'pointer',
              fontFamily: "var(--font-b), 'Instrument Sans', sans-serif",
              opacity: seeding ? 0.6 : 1,
            }}>
              {seeding ? '…' : '⬇ Import Portfolio'}
            </button>
            <button onClick={openAdd} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 22px', borderRadius: 12, fontSize: 14, fontWeight: 700,
              background: 'var(--accent)', color: '#07080f', border: 'none', cursor: 'pointer',
              fontFamily: "var(--font-b), 'Instrument Sans', sans-serif",
              boxShadow: '0 4px 20px rgba(32,176,248,0.3)',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Add Project
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text3)' }}>Loading projects…</div>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <p style={{ color: 'var(--text2)', fontSize: 15 }}>No projects yet. Add your first one!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {projects.map(p => (
              <div key={p.id} style={{
                position: 'relative', borderRadius: 18, overflow: 'hidden',
                background: 'var(--surface)', border: '1px solid var(--border)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.04)',
                padding: 'clamp(16px, 2vw, 24px)',
                display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
                <span style={{ fontSize: 28, flexShrink: 0 }}>{p.emoji}</span>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif" }}>{p.name}</span>
                    {p.featured && (
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: 'rgba(32,176,248,0.1)', color: 'var(--accent)', border: '1px solid rgba(32,176,248,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Featured</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 8, lineHeight: 1.5 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: 11, padding: '2px 10px', borderRadius: 99, background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text2)' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {p.liveUrl !== '#' && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ padding: '7px 14px', borderRadius: 9, fontSize: 13, fontWeight: 600, background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)', textDecoration: 'none' }}>Live ↗</a>
                  )}
                  <button onClick={() => openEdit(p)} style={{ padding: '7px 14px', borderRadius: 9, fontSize: 13, fontWeight: 600, background: 'rgba(32,176,248,0.1)', border: '1px solid rgba(32,176,248,0.25)', color: 'var(--accent)', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} disabled={deleteId === p.id} style={{ padding: '7px 14px', borderRadius: 9, fontSize: 13, fontWeight: 600, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', cursor: 'pointer' }}>
                    {deleteId === p.id ? '…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '24px 16px', overflowY: 'auto',
        }} onClick={e => { if (e.target === e.currentTarget) setShowForm(false) }}>
          <div style={{
            width: '100%', maxWidth: 720, borderRadius: 24,
            background: 'var(--bg2)', border: '1px solid var(--border2)',
            position: 'relative',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
            <div style={{ height: 3, background: 'linear-gradient(90deg, var(--accent), rgba(167,139,250,0.8), transparent)', borderRadius: '24px 24px 0 0' }} />
            <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', fontFamily: "var(--font-d), 'Bricolage Grotesque', sans-serif", letterSpacing: '-0.4px' }}>
                  {editProject ? 'Edit Project' : 'Add Project'}
                </h2>
                <button onClick={() => setShowForm(false)} style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text2)', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Row 1: Name + Emoji */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 12 }}>
                  <div><span style={label}>Project Name *</span><input style={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="My Awesome Project" /></div>
                  <div><span style={label}>Emoji</span><input style={{ ...inp, textAlign: 'center', fontSize: 20 }} value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} /></div>
                </div>

                {/* Tags + Order + Featured */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 12 }}>
                  <div><span style={label}>Tags (comma separated)</span><input style={inp} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Full-Stack, React, PostgreSQL" /></div>
                  <div><span style={label}>Order</span><input style={inp} type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} /></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} style={{ width: 16, height: 16, accentColor: 'var(--accent)', cursor: 'pointer' }} />
                  <label htmlFor="featured" style={{ fontSize: 14, color: 'var(--text2)', cursor: 'pointer' }}>Featured project</label>
                </div>

                {/* Short Description */}
                <div>
                  <span style={label}>Short Description *</span>
                  <textarea style={{ ...inp, resize: 'vertical', minHeight: 70 }} value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Brief description shown on the project card…" />
                </div>

                {/* Full Description */}
                <div>
                  <span style={label}>Full Description *</span>
                  <textarea style={{ ...inp, resize: 'vertical', minHeight: 110 }} value={form.fullDesc} onChange={e => setForm(f => ({ ...f, fullDesc: e.target.value }))} placeholder="Detailed description shown in the modal…" />
                </div>

                {/* Tech Stack */}
                <div>
                  <span style={label}>Tech Stack (comma separated)</span>
                  <input style={inp} value={form.tech} onChange={e => setForm(f => ({ ...f, tech: e.target.value }))} placeholder="React, Node.js, PostgreSQL, Prisma…" />
                </div>

                {/* URLs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div><span style={label}>Live URL</span><input style={inp} value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} placeholder="https://…" /></div>
                  <div><span style={label}>Frontend GitHub</span><input style={inp} value={form.ghClientUrl} onChange={e => setForm(f => ({ ...f, ghClientUrl: e.target.value }))} placeholder="https://github.com/…" /></div>
                  <div><span style={label}>Backend GitHub</span><input style={inp} value={form.ghServerUrl} onChange={e => setForm(f => ({ ...f, ghServerUrl: e.target.value }))} placeholder="https://github.com/…" /></div>
                </div>

                {/* Screenshot */}
                <div>
                  <span style={label}>Screenshot URL</span>
                  <input style={inp} value={form.screenshot} onChange={e => setForm(f => ({ ...f, screenshot: e.target.value }))} placeholder="/projects/myproject.png or https://…" />
                </div>

                {/* Challenges */}
                <div>
                  <span style={label}>Challenges (one per line)</span>
                  <textarea style={{ ...inp, resize: 'vertical', minHeight: 100 }} value={form.challenges} onChange={e => setForm(f => ({ ...f, challenges: e.target.value }))} placeholder={'Integrating Stripe payments securely.\nBuilding a real-time booking system.'} />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                  <button onClick={handleSave} disabled={saving || !form.name.trim()} style={{
                    flex: 1, padding: '13px 0', borderRadius: 12, fontSize: 15, fontWeight: 700,
                    background: saving || !form.name.trim() ? 'rgba(32,176,248,0.4)' : 'var(--accent)',
                    color: '#07080f', border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                    fontFamily: "var(--font-b), 'Instrument Sans', sans-serif",
                  }}>
                    {saving ? 'Saving…' : editProject ? 'Save Changes' : 'Add Project'}
                  </button>
                  <button onClick={() => setShowForm(false)} style={{
                    padding: '13px 24px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                    background: 'transparent', border: '1px solid var(--border2)',
                    color: 'var(--text2)', cursor: 'pointer',
                  }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
