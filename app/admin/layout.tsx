import '../globals.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="dark" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {children}
    </div>
  )
}
