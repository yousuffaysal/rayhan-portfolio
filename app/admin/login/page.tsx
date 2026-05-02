'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch('/api/admin/me')
      .then((r) => {
        if (r.ok) router.replace('/admin/messages')
        else setChecking(false)
      })
      .catch(() => setChecking(false))
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push('/admin/messages')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Invalid credentials. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: '3px solid var(--border2)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ambient orbs */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'rgba(32,176,248,0.04)',
          filter: 'blur(100px)',
          top: '-15%',
          right: '-10%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(124,58,237,0.04)',
          filter: 'blur(100px)',
          bottom: '-10%',
          left: '-8%',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--surface)',
          border: '1px solid var(--border2)',
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* top accent bar */}
        <div
          style={{
            height: 3,
            background: 'linear-gradient(90deg, var(--accent), rgba(124,58,237,0.8))',
          }}
        />

        <div style={{ padding: '40px 40px 44px' }}>
          {/* Logo mark */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div
              style={{
                width: 52,
                height: 52,
                background: 'var(--accent)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-d), Bricolage Grotesque, sans-serif',
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#07080f',
                boxShadow: '0 0 28px rgba(32,176,248,0.3)',
              }}
            >
              RA
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1
              style={{
                fontFamily: 'var(--font-d), Bricolage Grotesque, sans-serif',
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: '-0.6px',
                color: 'var(--text)',
                marginBottom: 6,
              }}
            >
              Admin Panel
            </h1>
            <p
              style={{
                fontSize: 13.5,
                color: 'var(--text2)',
                fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
              }}
            >
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="fg">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                style={{ width: '100%' }}
              />
            </div>

            <div className="fg">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ width: '100%' }}
              />
            </div>

            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: 10,
                  fontSize: 13,
                  color: '#f87171',
                  fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 6,
                width: '100%',
                padding: '13px 0',
                background: loading ? 'rgba(32,176,248,0.6)' : 'var(--accent)',
                color: '#07080f',
                fontFamily: 'var(--font-b), Instrument Sans, sans-serif',
                fontSize: 15,
                fontWeight: 700,
                border: 'none',
                borderRadius: 12,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                letterSpacing: '0.02em',
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid rgba(7,8,15,0.3)',
                      borderTopColor: '#07080f',
                      borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        .fg { display: flex; flex-direction: column; gap: 7px; }
        .fg label { font-size: 12.5px; font-weight: 600; color: var(--text2); letter-spacing: 0.03em; font-family: var(--font-b), Instrument Sans, sans-serif; }
        .fg input { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 13px 16px; font-family: var(--font-b), Instrument Sans, sans-serif; font-size: 14.5px; color: var(--text); caret-color: var(--accent); outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .fg input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(32,176,248,0.15); }
        .fg input::placeholder { color: var(--text3); }
      `}</style>
    </div>
  )
}
