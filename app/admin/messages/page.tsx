'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Message {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  read: boolean
  replied: boolean
  replyText?: string
  repliedAt?: string
  createdAt: string
}

/* ─── Reusable inline styles ─── */
const card: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 20,
  overflow: 'hidden',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '11px 14px',
  fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
  fontSize: 14,
  color: 'var(--text)',
  outline: 'none',
  resize: 'vertical' as const,
}

function Spinner({ size = 20 }: { size?: number }) {
  return (
    <>
      <div
        style={{
          width: size,
          height: size,
          border: `2px solid var(--border2)`,
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'adminSpin 0.7s linear infinite',
          flexShrink: 0,
        }}
      />
      <style>{`@keyframes adminSpin { to { transform: rotate(360deg) } }`}</style>
    </>
  )
}

export default function AdminMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  /* ─── Auth guard ─── */
  useEffect(() => {
    fetch('/api/admin/me').then((r) => {
      if (!r.ok) router.replace('/admin/login')
    })
  }, [router])

  /* ─── Load messages ─── */
  const loadMessages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/messages')
      if (res.ok) {
        const data: Message[] = await res.json()
        setMessages(data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  /* ─── Select message (mark read) ─── */
  async function selectMessage(msg: Message) {
    setSelected(msg)
    setReplyText('')

    if (!msg.read) {
      await fetch(`/api/admin/messages/${msg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      })
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      )
      setSelected((prev) => (prev?.id === msg.id ? { ...prev, read: true } : prev))
    }
  }

  /* ─── Mark unread ─── */
  async function markUnread() {
    if (!selected) return
    await fetch(`/api/admin/messages/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: false }),
    })
    setMessages((prev) =>
      prev.map((m) => (m.id === selected.id ? { ...m, read: false } : m))
    )
    setSelected((prev) => (prev ? { ...prev, read: false } : prev))
  }

  /* ─── Delete message ─── */
  async function deleteMessage(id: string) {
    setDeletingId(id)
    try {
      await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selected?.id === id) setSelected(null)
    } finally {
      setDeletingId(null)
    }
  }

  /* ─── Send reply ─── */
  async function sendReply() {
    if (!selected || !replyText.trim()) return
    setSending(true)
    try {
      const res = await fetch(`/api/admin/messages/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replied: true, replyText: replyText.trim() }),
      })
      if (res.ok) {
        const updated: Message = await res.json()
        setMessages((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        )
        setSelected(updated)

        const subject = selected.subject ? `Re: ${selected.subject}` : 'Re: Your message'
        window.open(
          `mailto:${selected.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(replyText)}`,
          '_blank'
        )
      }
    } finally {
      setSending(false)
    }
  }

  /* ─── Logout ─── */
  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const unreadCount = messages.filter((m) => !m.read).length

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function formatDateTime(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
        color: 'var(--text)',
      }}
    >
      {/* ─── Top Nav ─── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          gap: 16,
        }}
      >
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: 'var(--text2)',
              transition: 'color 0.2s',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text2)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Portfolio
          </Link>

          <div
            style={{
              width: 1,
              height: 20,
              background: 'var(--border2)',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                background: 'var(--accent)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-d), Bricolage Grotesque, sans-serif',
                fontSize: 11,
                fontWeight: 800,
                color: '#07080f',
              }}
            >
              RA
            </div>
            <span
              style={{
                fontFamily: 'var(--font-d), Bricolage Grotesque, sans-serif',
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: '-0.3px',
              }}
            >
              Admin Panel
            </span>
          </div>
        </div>

        {/* Right — tabs + logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <NavTab href="/admin/messages" active>
            Messages
            {unreadCount > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 18,
                  height: 18,
                  background: 'var(--accent)',
                  color: '#07080f',
                  borderRadius: '50%',
                  fontSize: 10,
                  fontWeight: 700,
                  marginLeft: 4,
                }}
              >
                {unreadCount}
              </span>
            )}
          </NavTab>
          <NavTab href="/admin/projects" active={false}>
            Projects
          </NavTab>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 8,
              padding: '7px 16px',
              background: 'transparent',
              border: '1px solid var(--border2)',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text2)',
              cursor: 'pointer',
              fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)'
              e.currentTarget.style.color = '#f87171'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border2)'
              e.currentTarget.style.color = 'var(--text2)'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ─── Main content ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 340px) 1fr',
          height: 'calc(100vh - 60px)',
          gap: 0,
        }}
      >
        {/* ─── Left sidebar ─── */}
        <aside
          style={{
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Sidebar header */}
          <div
            style={{
              padding: '18px 20px 14px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-d), Bricolage Grotesque, sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '-0.3px',
                }}
              >
                Messages
              </h2>
              {unreadCount > 0 && (
                <span
                  style={{
                    padding: '2px 8px',
                    background: 'var(--accent-dim, rgba(32,176,248,0.15))',
                    border: '1px solid rgba(32,176,248,0.3)',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-m), DM Mono, monospace',
                  }}
                >
                  {unreadCount} unread
                </span>
              )}
            </div>
            <button
              onClick={loadMessages}
              style={{
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                cursor: 'pointer',
                color: 'var(--text2)',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text2)'
              }}
              title="Refresh"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
          </div>

          {/* Message list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
                <Spinner />
              </div>
            ) : messages.length === 0 ? (
              <div
                style={{
                  padding: 40,
                  textAlign: 'center',
                  color: 'var(--text3)',
                  fontSize: 13,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
                No messages yet
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => selectMessage(msg)}
                  onMouseEnter={() => setHoveredId(msg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    padding: '14px 20px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border)',
                    background:
                      selected?.id === msg.id
                        ? 'rgba(32,176,248,0.06)'
                        : hoveredId === msg.id
                        ? 'var(--surface)'
                        : 'transparent',
                    borderLeft:
                      selected?.id === msg.id
                        ? '3px solid var(--accent)'
                        : '3px solid transparent',
                    transition: 'all 0.15s',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                      {!msg.read && (
                        <div
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: 'var(--accent)',
                            boxShadow: '0 0 6px rgba(32,176,248,0.6)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: 13.5,
                          fontWeight: msg.read ? 500 : 700,
                          color: msg.read ? 'var(--text2)' : 'var(--text)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {msg.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: 10.5,
                          color: 'var(--text3)',
                          fontFamily: 'var(--font-m), DM Mono, monospace',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatDate(msg.createdAt)}
                      </span>

                      {/* Delete button (visible on hover or when it's the hovered row) */}
                      {(hoveredId === msg.id || deletingId === msg.id) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteMessage(msg.id)
                          }}
                          disabled={deletingId === msg.id}
                          style={{
                            width: 22,
                            height: 22,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            borderRadius: 6,
                            cursor: 'pointer',
                            color: '#f87171',
                            transition: 'all 0.15s',
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239,68,68,0.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
                          }}
                          title="Delete"
                        >
                          {deletingId === msg.id ? (
                            <Spinner size={12} />
                          ) : (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14H6L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4h6v2" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--text3)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: 4,
                      paddingLeft: msg.read ? 0 : 14,
                    }}
                  >
                    {msg.email}
                  </div>

                  <div
                    style={{
                      fontSize: 12.5,
                      color: 'var(--text3)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      paddingLeft: msg.read ? 0 : 14,
                    }}
                  >
                    {msg.subject || msg.message.slice(0, 60)}
                  </div>

                  {msg.replied && (
                    <div
                      style={{
                        marginTop: 6,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '2px 8px',
                        background: 'rgba(74,222,128,0.08)',
                        border: '1px solid rgba(74,222,128,0.2)',
                        borderRadius: 99,
                        fontSize: 10,
                        fontWeight: 600,
                        color: '#4ade80',
                        fontFamily: 'var(--font-m), DM Mono, monospace',
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ Replied
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ─── Right detail panel ─── */}
        <main style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {!selected ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text3)',
                gap: 12,
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p style={{ fontSize: 14 }}>Select a message to read</p>
            </div>
          ) : (
            <div style={{ padding: '28px 32px', maxWidth: 760, width: '100%' }}>
              {/* Top accent bar */}
              <div
                style={{
                  height: 3,
                  background: 'linear-gradient(90deg, var(--accent), rgba(124,58,237,0.6))',
                  borderRadius: '99px 99px 0 0',
                  marginBottom: 0,
                }}
              />

              <div style={{ ...card, marginBottom: 20 }}>
                {/* Message header */}
                <div
                  style={{
                    padding: '24px 28px 20px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                      <h2
                        style={{
                          fontFamily: 'var(--font-d), Bricolage Grotesque, sans-serif',
                          fontSize: 20,
                          fontWeight: 700,
                          letterSpacing: '-0.4px',
                        }}
                      >
                        {selected.name}
                      </h2>
                      <span
                        style={{
                          padding: '3px 10px',
                          background: 'var(--surface)',
                          border: '1px solid var(--border2)',
                          borderRadius: 99,
                          fontSize: 12,
                          color: 'var(--accent)',
                          fontFamily: 'var(--font-m), DM Mono, monospace',
                        }}
                      >
                        {selected.email}
                      </span>
                    </div>

                    {selected.subject && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--text3)',
                            fontFamily: 'var(--font-m), DM Mono, monospace',
                          }}
                        >
                          Subject
                        </span>
                        <span
                          style={{
                            padding: '2px 10px',
                            background: 'rgba(32,176,248,0.08)',
                            border: '1px solid rgba(32,176,248,0.18)',
                            borderRadius: 99,
                            fontSize: 12.5,
                            color: 'var(--text)',
                            fontWeight: 500,
                          }}
                        >
                          {selected.subject}
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--text3)',
                        fontFamily: 'var(--font-m), DM Mono, monospace',
                      }}
                    >
                      {formatDateTime(selected.createdAt)}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
                    <ActionButton
                      onClick={markUnread}
                      variant="ghost"
                    >
                      Mark Unread
                    </ActionButton>
                    <ActionButton
                      onClick={() => deleteMessage(selected.id)}
                      variant="danger"
                    >
                      Delete
                    </ActionButton>
                  </div>
                </div>

                {/* Message body */}
                <div style={{ padding: '24px 28px' }}>
                  <p
                    style={{
                      fontSize: 15,
                      color: 'var(--text)',
                      lineHeight: 1.85,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {selected.message}
                  </p>
                </div>
              </div>

              {/* Reply section */}
              {selected.replied ? (
                /* Already replied — show the reply */
                <div style={{ ...card }}>
                  <div
                    style={{
                      height: 3,
                      background: 'linear-gradient(90deg, #4ade80, rgba(74,222,128,0.4))',
                    }}
                  />
                  <div style={{ padding: '20px 28px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 14,
                      }}
                    >
                      <span
                        style={{
                          padding: '3px 10px',
                          background: 'rgba(74,222,128,0.1)',
                          border: '1px solid rgba(74,222,128,0.25)',
                          borderRadius: 99,
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#4ade80',
                          fontFamily: 'var(--font-m), DM Mono, monospace',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        ✓ Replied
                      </span>
                      {selected.repliedAt && (
                        <span
                          style={{
                            fontSize: 11.5,
                            color: 'var(--text3)',
                            fontFamily: 'var(--font-m), DM Mono, monospace',
                          }}
                        >
                          {formatDate(selected.repliedAt)}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        color: 'var(--text2)',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {selected.replyText}
                    </p>
                  </div>
                </div>
              ) : (
                /* Reply textarea */
                <div style={{ ...card }}>
                  <div style={{ padding: '20px 28px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: 'var(--text2)',
                        letterSpacing: '0.04em',
                        marginBottom: 10,
                        fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
                      }}
                    >
                      Reply to {selected.name}
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Write your reply to ${selected.email}…`}
                      rows={6}
                      style={{
                        ...inputStyle,
                        marginBottom: 14,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(32,176,248,0.12)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                    <button
                      onClick={sendReply}
                      disabled={sending || !replyText.trim()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '11px 22px',
                        background:
                          sending || !replyText.trim()
                            ? 'rgba(32,176,248,0.4)'
                            : 'var(--accent)',
                        color: '#07080f',
                        border: 'none',
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
                        cursor:
                          sending || !replyText.trim() ? 'not-allowed' : 'pointer',
                        transition: 'all 0.25s',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {sending ? (
                        <>
                          <Spinner size={14} />
                          Sending…
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                          Send Reply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes adminSpin { to { transform: rotate(360deg) } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent); }
        @media (max-width: 768px) {
          nav { padding: 0 16px !important; }
        }
      `}</style>
    </div>
  )
}

/* ─── Helper components ─── */

function NavTab({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '6px 14px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        color: active ? 'var(--accent)' : 'var(--text2)',
        background: active ? 'rgba(32,176,248,0.08)' : 'transparent',
        border: active ? '1px solid rgba(32,176,248,0.2)' : '1px solid transparent',
        transition: 'all 0.2s',
        fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  )
}

function ActionButton({
  onClick,
  variant,
  children,
}: {
  onClick: () => void
  variant: 'ghost' | 'danger'
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)

  const baseStyle: React.CSSProperties = {
    padding: '7px 14px',
    borderRadius: 9,
    fontSize: 12.5,
    fontWeight: 600,
    fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '1px solid',
  }

  const variantStyle: React.CSSProperties =
    variant === 'danger'
      ? {
          background: hovered ? 'rgba(239,68,68,0.18)' : 'rgba(239,68,68,0.08)',
          borderColor: hovered ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.2)',
          color: '#f87171',
        }
      : {
          background: hovered ? 'var(--surface)' : 'transparent',
          borderColor: hovered ? 'var(--border2)' : 'var(--border)',
          color: hovered ? 'var(--text)' : 'var(--text2)',
        }

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...variantStyle }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}
