import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoJtv from '../../assets/images/logo/logo_jtv.svg'

const PROGRAM_CATEGORIES = [
  {
    id: 'news',
    label: 'News',
    count: 4,
    desc: 'Program Berita',
    iconName: 'icon_news.png',
    programs: ['Jatim Awan', 'Pojok Arena', 'Pojok Pitu', 'Pojok Kampung'],
  },
  {
    id: 'komedi',
    label: 'Komedi',
    count: 2,
    desc: 'Program Hiburan',
    iconName: 'icon_komedi.png',
    programs: ['Ndoro Bei', 'Semar Mesem'],   // fix: hapus koma di 'Ndoro Bei,'
  },
  {
    id: 'musik',
    label: 'Musik',
    count: 1,
    desc: 'Program Musik',
    iconName: 'icon_musik.png',
    programs: ['Stasiun Dangdut'],
  },
  {
    id: 'religi',
    label: 'Religi',
    count: 6,
    desc: 'Program Religi',
    iconName: 'icon_religi.png',
    programs: ['Ngaji Blusukan', 'Padhange Ati', 'Ramadhan Ceria', 'Kultim', 'Mutiara Ramadhan', 'Mutiara Hati'],
    
  },
  {
    id: 'talkshow',
    label: 'Talkshow',
    count: 5,
    desc: 'Program Obrolan',
    iconName: 'icon_talkshow.png',
    programs: ['Jatim Joss', 'Hukum di Tengah Kita', 'Jatim Gaspol', 'Gak Cuman Cangkrukan', 'Ruang Karir'],

  },
  {
    id: 'olahraga',
    label: 'Olahraga',
    count: 2,
    desc: 'Program Olahraga',
    iconName: 'icon_sport.png',
    programs: ['Mancing Mbois', 'Voliga'],
  },
]

const NAV_ITEMS = [
  { label: 'Event',   path: '/event' },
  { label: 'Karir',   path: '/karir' },
  { label: 'Tentang', path: '/tentang' },
]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [programOpen,    setProgramOpen]    = useState(false)
  const [activeCategory, setActiveCategory] = useState(PROGRAM_CATEGORIES[0])
  const [menuOpen,       setMenuOpen]       = useState(false)

  const dropdownRef = useRef(null)
  const navigate    = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProgramOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const goToProgram = (name) => {
    navigate(`/program/${name.toLowerCase().replace(/\s+/g, '-')}`)
    setProgramOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-5 flex items-center h-[68px]">

        {/* ── Logo (kiri) ── */}
        <Link
          to="/"
          onClick={() => setProgramOpen(false)}
          className="flex items-center shrink-0 mr-auto"
        >
          <img
            src={logoJtv}
            alt="JTV"
            className="h-10 w-auto object-contain"
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
          />
          <span className="items-center gap-1" style={{ display: 'none' }}>
            <span className="text-[#FF5D13] text-2xl font-black tracking-tight">jtv</span>
            <span className="bg-[#FF5D13] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded -translate-y-2 inline-block">
              REK!
            </span>
          </span>
        </Link>

        {/* ── Nav Links (tengah) ── */}
        <nav className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">

          {/* Program + Mega Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProgramOpen(o => !o)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer border-0 bg-transparent
                ${programOpen ? 'text-[#FF5D13] bg-orange-50' : 'text-gray-700 hover:text-[#FF5D13] hover:bg-orange-50'}`}
            >
              Program
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${programOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Mega dropdown */}
            {programOpen && (
              <div
                className="absolute top-[calc(100%+10px)] left-0 flex bg-white rounded-2xl z-50 min-w-[560px] overflow-hidden"
                style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.13)' }}
              >
                {/* Kiri — Kategori */}
                <div className="w-60 shrink-0 border-r border-gray-100 pb-3">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-4 pb-2">
                    Kategori Program
                  </p>
                  {PROGRAM_CATEGORIES.map(cat => {
                    const isActive = activeCategory.id === cat.id
                    return (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left border-0 cursor-pointer transition-colors duration-150
                          ${isActive ? 'bg-orange-50' : 'bg-transparent hover:bg-orange-50'}`}
                      >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150
                          ${isActive ? 'bg-orange-100' : 'bg-gray-100'}`}
                        >
                          <img
                            src={new URL(`../../assets/icons/${cat.iconName}`, import.meta.url).href}
                            alt={cat.label}
                            width="20"
                            height="20"
                            className="object-contain"
                            onError={e => { e.currentTarget.style.display = 'none' }}
                          />
                        </span>

                        <span className="flex-1 flex flex-col">
                          <span className={`text-sm font-semibold ${isActive ? 'text-[#FF5D13]' : 'text-gray-800'}`}>
                            {cat.label}
                          </span>
                          <span className="text-[11px] text-gray-400">{cat.count} {cat.desc}</span>
                        </span>

                        <svg
                          className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#FF5D13]' : 'text-gray-300'}`}
                          viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    )
                  })}
                </div>

                {/* Kanan — Daftar Program */}
                <div className="flex-1 pb-3 min-w-[220px]">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-5 pt-4 pb-2">
                    {activeCategory.label}
                  </p>
                  {activeCategory.programs.map(prog => (
                    <button
                      key={prog}
                      onClick={() => goToProgram(prog)}
                      className="w-full block px-5 py-2.5 text-left text-sm font-semibold text-gray-700 bg-transparent border-0 cursor-pointer
                        hover:text-[#FF5D13] hover:bg-orange-50 hover:pl-7 transition-all duration-150"
                    >
                      {prog}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Event, Karir, Tentang */}
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setProgramOpen(false)}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                ${isActive
                  ? 'text-[#FF5D13] bg-orange-50'
                  : 'text-gray-700 hover:text-[#FF5D13] hover:bg-orange-50'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Live Streaming (kanan) — FIX: <Link> bukan <a> ── */}
        <Link
          to="/live"
          onClick={() => setProgramOpen(false)}
          className="flex items-center gap-2 bg-[#FF5D13] hover:bg-[#d94e0e] text-white text-sm font-bold px-5 py-2.5 rounded-lg ml-auto
            transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 whitespace-nowrap shrink-0"
        >
          <span
            className="w-2 h-2 bg-white rounded-full shrink-0"
            style={{ animation: 'livePulse 1.6s ease-in-out infinite' }}
          />
          Live Streaming
        </Link>

      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
      `}</style>
    </header>
  )
}