import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginModal from '../pop up login/login'
import JatimAwan from '../../assets/images/program/program_jatimAwan.png'
import PojokPitu from '../../assets/images/program/program_ndoroBei.png'
import PojokKampung from '../../assets/images/program/program_pojokKampung.png'
import PojokArena from '../../assets/images/program/program_pojokArena.png'
import JatimGaspol from '../../assets/images/program/program_jatimGaspol.png'

const LIVE_URL = "https://63b2dc7196c38.streamlock.net:1937/JTVSURABAYA/_definst_/myStream/playlist.m3u8"

const PROGRAM_PILIHAN = [
  { slug: 'jatim-awan',    title: 'Jatim Awan',    image: JatimAwan },
  { slug: 'pojok-pitu',    title: 'Pojok Pitu',    image: PojokPitu },
  { slug: 'pojok-kampung', title: 'Pojok Kampung', image: PojokKampung },
  { slug: 'pojok-arena',   title: 'Pojok Arena',   image: PojokArena },
  { slug: 'jatim-siang',   title: 'Jatim Gaspol',  image: JatimGaspol },
]

const INITIAL_CHATS = [
  { id: 1, name: 'Arum S.',  initial: 'A', color: '#6B2DA0', msg: 'Halo dari Surabaya 👋', isSelf: false },
  { id: 2, name: 'Dewi S.',  initial: 'D', color: '#2177E7', msg: 'Mantap acaranya! 🔥',   isSelf: false },
  { id: 3, name: 'Budi R.',  initial: 'B', color: '#188038', msg: 'JTV selalu oke 👍',     isSelf: false },
  { id: 4, name: 'Citra W.', initial: 'C', color: '#e07b00', msg: 'Halo dari Sidoarjo 🙌', isSelf: false },
]

// ── CHAT BUBBLE ───────────────────────────────────────────────────────────────
function ChatBubble({ item }) {
  if (item.isSelf) {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#FF5D13' }}>Anda</span>
          <div style={{ background: '#FF5D13', color: 'white', fontSize: 14, padding: '8px 12px', borderRadius: '15px 15px 0 15px', maxWidth: 180 }}>
            {item.msg}
          </div>
        </div>
        <div style={{ width: 35, height: 35, borderRadius: '50%', background: '#FF5D13', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
          {item.initial}
        </div>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{ width: 35, height: 35, borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
        {item.initial}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1E1E1E' }}>{item.name}</span>
        <div style={{ background: 'white', color: '#1E1E1E', fontSize: 14, padding: '7px 12px', borderRadius: '0 15px 15px 15px', border: '0.5px solid #ddd', maxWidth: 180 }}>
          {item.msg}
        </div>
      </div>
    </div>
  )
}

// ── PROGRAM CARD ──────────────────────────────────────────────────────────────
function ProgCard({ item, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ flexShrink: 0, width: 280, cursor: 'pointer' }}>
      <div style={{ width: 280, height: 158, borderRadius: 16, overflow: 'hidden', background: '#ddd', transform: hov ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.2s' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none' }} />
      </div>
      <p style={{ marginTop: 10, fontSize: 16, fontWeight: 700, color: hov ? '#002d7a' : '#6D6969', transition: 'color 0.2s' }}>
        {item.title}
      </p>
    </div>
  )
}

// ── HLS VIDEO PLAYER ──────────────────────────────────────────────────────────
function HlsVideoPlayer({ src }) {
  const videoRef = useRef(null)
  const hlsRef   = useRef(null)
  const [ready,  setReady]  = useState(false)
  const [error,  setError]  = useState(false)
  const [muted,  setMuted]  = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!src || !videoRef.current) return
    const video = videoRef.current

    const startPlay = () => {
      video.play().then(() => setReady(true)).catch(() => setReady(true))
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      video.addEventListener('loadedmetadata', startPlay, { once: true })
      video.addEventListener('error', () => setError(true), { once: true })
      return
    }

    if (document.querySelector('script[data-hls]')) {
      initHls(video, src, setReady, setError, hlsRef)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js'
    script.setAttribute('data-hls', '1')
    script.onload  = () => initHls(video, src, setReady, setError, hlsRef)
    script.onerror = () => setError(true)
    document.head.appendChild(script)

    return () => {
      if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null }
    }
  }, [src])

  const toggleMute  = () => { videoRef.current.muted  = !muted;  setMuted(m => !m) }
  const togglePause = () => {
    if (paused) { videoRef.current.play();  setPaused(false) }
    else        { videoRef.current.pause(); setPaused(true)  }
  }

  if (error) return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#111', color: 'white', gap: 10 }}>
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#FF5D13" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1" fill="#FF5D13"/></svg>
      <p style={{ fontSize: 13, color: '#aaa', textAlign: 'center', padding: '0 24px' }}>Stream tidak dapat dimuat.<br/>Periksa koneksi atau URL stream.</p>
    </div>
  )

  return (
    <>
      <video
        ref={videoRef}
        playsInline
        controls
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
    </>
  )
}

function initHls(video, src, setReady, setError, hlsRef) {
  if (!window.Hls || !window.Hls.isSupported()) { setError(true); return }
  const hls = new window.Hls({ enableWorker: true, lowLatencyMode: true })
  hlsRef.current = hls
  hls.loadSource(src)
  hls.attachMedia(video)
  hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
    video.play().then(() => setReady(true)).catch(() => setReady(true))
  })
  hls.on(window.Hls.Events.ERROR, (_, d) => { if (d.fatal) setError(true) })
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function LiveStreaming() {
  const navigate = useNavigate()

  const [user,      setUser]      = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [chats,     setChats]     = useState(INITIAL_CHATS)
  const [inputMsg,  setInputMsg]  = useState('')
  const chatEndRef = useRef(null)

  const programScrollRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  // ── Auto scroll Netflix-style ──
  useEffect(() => {
    const el = programScrollRef.current
    if (!el) return

    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 300, behavior: 'smooth' })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // ── Manual scroll arrows ──
  const scrollProgram = (dir) => {
    if (!programScrollRef.current) return
    const scrollAmount = 320
    programScrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  const sendMessage = () => {
    const msg = inputMsg.trim()
    if (!msg || !user) return
    setChats(prev => [...prev, { id: Date.now(), name: user.name, initial: user.initial, color: user.color, msg, isSelf: true }])
    setInputMsg('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const CHAT_HEIGHT = 560

  return (
    <main style={{ minHeight: '100vh', background: '#F7F5F2', fontFamily: 'Inter, sans-serif', paddingTop: 32, paddingBottom: 60, overflowX: 'hidden' }}>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={(u) => { setUser(u); setShowLogin(false) }} />

      <div style={{ width: '100%', maxWidth: 1440, margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>

        {/* ── ROW 1: Video + Chat ── */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* VIDEO COLUMN */}
          <div style={{ flex: 1, minWidth: 0 }}>

            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#000',
              borderRadius: 12,
              overflow: 'hidden'
            }}>
              <HlsVideoPlayer src={LIVE_URL} />

              {/* LIVE badge */}
              <div style={{ position: 'absolute', top: 14, left: 12, zIndex: 10, display: 'flex', alignItems: 'center', gap: 6, background: '#E80606', borderRadius: 50, padding: '4px 12px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', animation: 'livePulse 1.4s ease-in-out infinite', display: 'inline-block' }} />
                <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>Live</span>
              </div>
            </div>

            {/* Info bar */}
            <div style={{ marginTop: 16, background: 'white', borderRadius: 12, border: '0.5px solid #e0e0e0', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#626262', letterSpacing: '0.05em' }}>SEDANG TAYANG</p>
                <p style={{ fontSize: 17, fontWeight: 700, color: '#1E1E1E', margin: 0 }}>PROGRAM BERITA: JATIM AWAN</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#626262' }}>
                  <span>JTV</span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#aaa', display: 'inline-block' }} />
                  <span>Setiap Hari</span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#aaa', display: 'inline-block' }} />
                  <span>14.00 – 14.30 WIB</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FF5D13" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3" fill="#FF5D13" stroke="none"/>
                  </svg>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#1E1E1E' }}>1.2K Menonton</span>
                </div>
                <button onClick={() => { if (navigator.share) navigator.share({ title: 'JTV Live', url: window.location.href }); else navigator.clipboard.writeText(window.location.href) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F0EDE8', border: '0.5px solid #626262', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#626262', fontFamily: 'Inter, sans-serif' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#626262" strokeWidth="2" strokeLinecap="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Bagikan
                </button>
              </div>
            </div>
          </div>

          {/* ── LIVE CHAT ── */}
          <div style={{ 
            width: 300,
            height: CHAT_HEIGHT,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            background: '#F7F5F2',
            borderRadius: 12,
            border: '0.5px solid #c8c8c8',
            overflow: 'hidden',
            marginBottom: 30
          }}>
            <div style={{ background: '#002D7A', padding: '0 18px', height: 56, display: 'flex', alignItems: 'center', gap: 8, borderRadius: '12px 12px 0 0', flexShrink: 0 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'white', animation: 'livePulse 1.4s ease-in-out infinite', display: 'inline-block' }} />
              <span style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>Live Chat</span>
              {user ? (
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11 }}>{user.initial}</div>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
                </div>
              ) : (
                <button onClick={() => setShowLogin(true)} style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', background: 'transparent', border: '1px solid rgba(255,255,255,0.35)', borderRadius: 99, padding: '2px 12px', cursor: 'pointer' }}>Masuk</button>
              )}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 14, scrollbarWidth: 'thin', cursor: !user ? 'pointer' : 'auto' }} onClick={() => { if (!user) setShowLogin(true) }}>
              {chats.map(c => <ChatBubble key={c.id} item={c} />)}
              <div ref={chatEndRef} />
            </div>
            <div style={{ height: 72, background: 'white', borderTop: '0.5px solid #e0e0e0', borderRadius: '0 0 12px 12px', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', flexShrink: 0 }}>
              {!user ? (
                <button onClick={() => setShowLogin(true)} style={{ flex: 1, height: 38, background: '#E8E8E8', border: 'none', borderRadius: 99, textAlign: 'left', paddingLeft: 14, color: '#888', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Ngobrol disini yuk!! </button>
              ) : (
                <input type="text" value={inputMsg} onChange={e => setInputMsg(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ngobrol disini yuk!!" style={{ flex: 1, height: 38, background: '#F0F0F0', border: 'none', borderRadius: 99, paddingLeft: 14, paddingRight: 14, fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif', color: '#1E1E1E' }} />
              )}
              <button onClick={sendMessage} disabled={!user || !inputMsg.trim()} style={{ width: 38, height: 38, borderRadius: '50%', background: '#002D7A', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: !user || !inputMsg.trim() ? 0.45 : 1, flexShrink: 0, transition: 'opacity 0.2s' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" stroke="white" strokeWidth="2"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Program Pilihan ── */}
        <div style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E1E1E', marginBottom: 20 }}>PROGRAM SELANJUTNYA</h2>

          <div style={{ position: 'relative' }}>

            {/* Arrow kiri */}
            <button
              onClick={() => scrollProgram('left')}
              style={{
                position: 'absolute',
                left: -20,
                top: '40%',
                zIndex: 5,
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                background: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                fontSize: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ‹
            </button>

            {/* Scroll container */}
            <div
              ref={programScrollRef}
              style={{
                display: 'flex',
                gap: 20,
                overflowX: 'auto',
                overflowY: 'hidden',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none'
              }}
            >
              {PROGRAM_PILIHAN.map(p => (
                <ProgCard
                  key={p.slug}
                  item={p}
                  onClick={() => navigate(`/program/${p.slug}`)}
                />
              ))}
            </div>

            {/* Arrow kanan */}
            <button
              onClick={() => scrollProgram('right')}
              style={{
                position: 'absolute',
                right: -20,
                top: '40%',
                zIndex: 5,
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                background: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                fontSize: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ›
            </button>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.65); }
        }
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}