import React, { useState, useEffect } from 'react'
import logoJTV from '../../assets/images/logo/logo_jtv.svg'

const AVATAR_COLORS = [
  '#6b2da0', '#2177e7', '#e07b00', '#188038',
  '#c62828', '#00838f', '#ad1457', '#4527a0',
]
function randomColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
}

// ── QR COUNTDOWN ─────────────────────────────────────────────────────────────
function useCountdown(seconds) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    setLeft(seconds)
    const t = setInterval(() => setLeft(s => s > 0 ? s - 1 : 0), 1000)
    return () => clearInterval(t)
  }, [seconds])
  const m = String(Math.floor(left / 60)).padStart(2, '0')
  const s = String(left % 60).padStart(2, '0')
  return `${m}:${s}`
}

// ── TAB SWITCHER ──────────────────────────────────────────────────────────────
function TabSwitcher({ active, onSwitch }) {
  return (
    <div style={{ 
      display: 'inline-flex',
      background: '#FFE4CC',
      borderRadius: 8,
      padding: 6,
      gap: 4
    }}>
      <div
        onClick={() => onSwitch('qr')}
        style={{ padding: '6px 14px', borderRadius: 6, background: active === 'qr' ? 'white' : 'transparent', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', boxShadow: active === 'qr' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={active === 'qr' ? '#FF5D13' : '#888'} strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          <rect x="14" y="14" width="3" height="3"/><rect x="18" y="14" width="3" height="3"/><rect x="14" y="18" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/>
        </svg>
        <span style={{ fontSize: 13, fontWeight: 600, color: active === 'qr' ? '#1E1E1E' : '#888', whiteSpace: 'nowrap' }}>QR Code Login</span>
      </div>
      <div
        onClick={() => onSwitch('email')}
        style={{ padding: '6px 14px', borderRadius: 6, background: active === 'email' ? 'white' : 'transparent', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', boxShadow: active === 'email' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={active === 'email' ? '#FF5D13' : '#888'} strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
        </svg>
        <span style={{ fontSize: 13, fontWeight: 600, color: active === 'email' ? '#1E1E1E' : '#888', whiteSpace: 'nowrap' }}>Email & Password</span>
      </div>
    </div>
  )
}

// ── QR CONTENT ────────────────────────────────────────────────────────────────
function QrContent() {
  const countdown = useCountdown(234)
  return (
    <>
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          <><span>Buka </span><strong>Aplikasi JTVHub</strong><span> di smartphone Anda</span></>,
          <><span>Pilih icon </span><strong>QR Code</strong></>,
          <span>Arahkan kamera ke QR Code dibawah ini</span>,
        ].map((text, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid #1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <p style={{ fontSize: 13, color: '#1E1E1E', margin: 0, lineHeight: 1.5 }}>{text}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24, gap: 10 }}>
        <div style={{ width: 200, height: 200, background: '#f3f3f3', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="50" height="50" rx="4" fill="none" stroke="#000" strokeWidth="5"/>
            <rect x="22" y="22" width="26" height="26" rx="2" fill="#000"/>
            <rect x="100" y="10" width="50" height="50" rx="4" fill="none" stroke="#000" strokeWidth="5"/>
            <rect x="112" y="22" width="26" height="26" rx="2" fill="#000"/>
            <rect x="10" y="100" width="50" height="50" rx="4" fill="none" stroke="#000" strokeWidth="5"/>
            <rect x="22" y="112" width="26" height="26" rx="2" fill="#000"/>
            {[[70,70],[78,70],[86,70],[94,70],[70,78],[86,78],[94,78],[70,86],[78,86],[94,86],[78,94],[86,94],[70,102],[94,102],[78,110],[86,110],[70,118],[94,118]].map(([x,y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#000"/>
            ))}
            {[[10,70],[18,70],[26,70],[34,70],[42,70],[50,70],[10,78],[26,78],[42,78],[50,78],[18,86],[34,86],[10,94],[18,94],[42,94],[26,102],[34,102],[50,102],[10,110],[18,110],[42,110],[50,110],[26,118],[34,118],[10,126],[50,126],[18,134],[26,134],[42,134]].map(([x,y]) => (
              <rect key={`d${x}-${y}`} x={x} y={y} width="6" height="6" fill="#000"/>
            ))}
            {[[100,70],[108,70],[116,70],[124,70],[132,70],[140,70],[100,78],[116,78],[132,78],[108,86],[124,86],[140,86],[100,94],[108,94],[124,94],[116,102],[132,102],[140,102],[100,110],[124,110],[108,118],[116,118],[140,118],[100,126],[108,126],[132,126],[116,134],[124,134],[140,134]].map(([x,y]) => (
              <rect key={`e${x}-${y}`} x={x} y={y} width="6" height="6" fill="#000"/>
            ))}
          </svg>
        </div>
        <p style={{ fontSize: 13, color: '#888', margin: 0 }}>Menunggu Scan...</p>
        <p style={{ fontSize: 13, color: '#888', margin: 0 }}>Kadaluwarsa dalam {countdown}</p>
      </div>
    </>
  )
}

// ── EMAIL CONTENT ─────────────────────────────────────────────────────────────
function EmailContent({ onClose, onLoginSuccess }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = () => {
    setError('')
    if (!email || !password) { setError('Email dan password wajib diisi.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const displayName = email.split('@')[0]
      onLoginSuccess({ name: displayName, initial: displayName.charAt(0).toUpperCase(), color: randomColor() })
      onClose()
    }, 1000)
  }

  return (
    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Email */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 15, fontWeight: 600, color: '#1E1E1E' }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="nama@email.com"
          style={{ height: 42, borderRadius: 10, border: '0.5px solid #aaa', padding: '0 14px', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }}
          onFocus={e => e.target.style.borderColor = '#FF5D13'}
          onBlur={e => e.target.style.borderColor = '#aaa'}
        />
      </div>

      {/* Password */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 15, fontWeight: 600, color: '#1E1E1E' }}>Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Masukkan password"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{ width: '100%', height: 42, borderRadius: 10, border: '0.5px solid #aaa', padding: '0 40px 0 14px', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#FF5D13'}
            onBlur={e => e.target.style.borderColor = '#aaa'}
          />
          <button onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#888' }}>
            {showPass
              ? <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              : <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            }
          </button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button style={{ background: 'none', border: 'none', color: '#FF5D13', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Lupa Password?</button>
        </div>
      </div>

      {error && <p style={{ fontSize: 12, color: '#e53e3e', background: '#fff5f5', padding: '8px 12px', borderRadius: 8, margin: 0 }}>{error}</p>}

      {/* ✅ marginTop dikurangi dari 60 → 28 */}
      <div style={{ marginTop: 28 }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', height: 44, borderRadius: 10, background: loading ? '#94a3b8' : '#1a56e8', border: 'none', color: 'white', fontSize: 17, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif' }}
        >
          {loading ? 'Memproses...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

// ── MAIN MODAL ────────────────────────────────────────────────────────────────
export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState('qr')

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Reset ke tab qr setiap kali modal dibuka
  useEffect(() => { if (isOpen) setTab('qr') }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', fontFamily: 'Inter, sans-serif' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* ✅ alignItems diubah dari 'center' → 'stretch', textAlign dihapus */}
      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: 12,
          padding: '32px',
          width: 420,

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}
      >

        {/* Tombol close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 32,
            background: 'none',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            color: '#888',
            lineHeight: 1
          }}
        >
          ×
        </button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          <img
            src={logoJTV}
            alt="JTV"
            style={{ height: 38, objectFit: 'contain' }}
            onError={e => e.target.style.display='none'}
          />
        </div>

        {/* Title */}
        <p style={{ fontSize: 22, fontWeight: 700, color: '#1E1E1E', margin: '0 0 4px' }}>Masuk ke Akun JTVhub</p>
        <p style={{ fontSize: 12, color: '#555', margin: '0 0 20px' }}>Pilih metode login yang diinginkan</p>

        {/* ✅ TabSwitcher dibungkus div dengan justifyContent: 'center' */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <TabSwitcher active={tab} onSwitch={setTab} />
        </div>

        {/* Konten berdasarkan tab */}
        {tab === 'qr'
          ? <QrContent />
          : <EmailContent onClose={onClose} onLoginSuccess={onLoginSuccess} />
        }
      </div>
    </div>
  )
}