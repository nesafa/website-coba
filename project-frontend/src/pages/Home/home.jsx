import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ── DATA ─────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  { id: 1, image: '/assets/images/banner/banner_1.jpg' },
  { id: 2, image: '/assets/images/banner/banner_2.jpg' },
  { id: 3, image: '/assets/images/banner/banner_3.jpg' },
  { id: 4, image: '/assets/images/banner/banner_4.jpg' },
]

const PROGRAM_PILIHAN = [
  { id: 1, title: 'Jatim Awan',    image: '/assets/images/program/jatim_awan.jpg',    slug: 'jatim-awan' },
  { id: 2, title: 'Pojok Pitu',    image: '/assets/images/program/pojok_pitu.jpg',    slug: 'pojok-pitu' },
  { id: 3, title: 'Pojok Kampung', image: '/assets/images/program/pojok_kampung.jpg', slug: 'pojok-kampung' },
  { id: 4, title: 'Pojok Jatim',   image: '/assets/images/program/pojok_jatim.jpg',   slug: 'pojok-jatim' },
  { id: 5, title: 'Pojok Arena',   image: '/assets/images/program/pojok_arena.jpg',   slug: 'pojok-arena' },
]

const PROGRAM_TERBARU = [
  { id: 1, title: 'Ngaji Blusukan',        image: '/assets/images/program/ngaji_blusukan.jpg',   slug: 'ngaji-blusukan' },
  { id: 2, title: 'Padhange Ati',          image: '/assets/images/program/padhange_ati.jpg',     slug: 'padhange-ati' },
  { id: 3, title: 'Ceria Ramadhan',        image: '/assets/images/program/ceria_ramadhan.jpg',   slug: 'ceria-ramadhan' },
  { id: 4, title: 'Kultum',                image: '/assets/images/program/kultum.jpg',           slug: 'kultum' },
  { id: 5, title: 'Sahur Bareng JTV',      image: '/assets/images/program/sahur_bareng.jpg',     slug: 'sahur-bareng-jtv' },
]

const PROGRAM_POPULER = [
  { id: 1, title: 'Stasiun Dangdut', image: '/assets/images/program/stasiun_dangdut.jpg', slug: 'stasiun-dangdut' },
  { id: 2, title: 'Ndoro Bei',       image: '/assets/images/program/ndoro_bei.jpg',       slug: 'ndoro-bei' },
  { id: 3, title: 'Semar Mesem',     image: '/assets/images/program/semar_mesem.jpg',     slug: 'semar-mesem' },
  { id: 4, title: 'Padhange Ati',    image: '/assets/images/program/padhange_ati.jpg',    slug: 'padhange-ati-2' },
  { id: 5, title: 'Jatim Siang',     image: '/assets/images/program/jatim_siang.jpg',     slug: 'jatim-siang' },
]

const EVENTS = [
  { id: 1, image: '/assets/images/event/event_1.jpg', slug: 'event-1', link: '/event/event-1' },
  { id: 2, image: '/assets/images/event/event_2.jpg', slug: 'event-2', link: '/event/event-2' },
  { id: 3, image: '/assets/images/event/event_3.jpg', slug: 'event-3', link: '/event/event-3' },
  { id: 4, image: '/assets/images/event/event_4.jpg', slug: 'event-4', link: '/event/event-4' },
  { id: 5, image: '/assets/images/event/event_5.jpg', slug: 'event-5', link: '/event/event-5' },
]

const DULUR_DIGITAL = [
  { id: 1, name: 'Portal JTV', image: '/assets/images/dulur/portal_jtv.png',  link: 'https://portal.jtv.co.id' },
  { id: 2, name: 'JTV Hub',    image: '/assets/images/dulur/jtv_hub.png',     link: 'https://hub.jtv.co.id' },
  { id: 3, name: 'JTV Game',   image: '/assets/images/dulur/jtv_game.png',    link: 'https://game.jtv.co.id' },
]

// ── HERO SLIDER ───────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % HERO_SLIDES.length)
    }, 4000)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (idx) => {
    clearInterval(timerRef.current)
    setCurrent(idx)
    startTimer()
  }

  return (
    <div className="relative w-full overflow-hidden bg-gray-900" style={{ aspectRatio: '16/6' }}>
      {/* Slides */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(${s.image})`, opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Prev / Next */}
      <button
        onClick={() => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-[#FF5D13] text-white text-xl flex items-center justify-center border-0 cursor-pointer transition-colors duration-200"
      >‹</button>
      <button
        onClick={() => goTo((current + 1) % HERO_SLIDES.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-[#FF5D13] text-white text-xl flex items-center justify-center border-0 cursor-pointer transition-colors duration-200"
      >›</button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="border-0 cursor-pointer p-0 rounded-full transition-all duration-300"
            style={{
              width: i === current ? 28 : 10,
              height: 10,
              background: i === current ? '#FF5D13' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── PROGRAM CARD ──────────────────────────────────────────────────────────────
function ProgramCard({ item }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => navigate(`/program/${item.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 cursor-pointer"
      style={{ width: 200 }}
    >
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden bg-gray-200" style={{ aspectRatio: '16/9' }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.background = '#ddd' }}
        />
        {/* Play overlay */}
        
      </div>
      {/* Title */}
      <p className="mt-2 text-sm font-medium text-gray-800 truncate">{item.title}</p>
    </div>
  )
}

// ── HORIZONTAL SCROLL SECTION ─────────────────────────────────────────────────
function ProgramSection({ title, items, onSeeAll }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 440, behavior: 'smooth' })
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 max-w-[1200px] mx-auto">
        <h2 className="text-base font-black uppercase tracking-wide text-gray-900 border-l-4 border-[#FF5D13] pl-3">
          {title}
        </h2>
        <button
          onClick={onSeeAll}
          className="text-xs font-semibold text-[#FF5D13] border border-[#FF5D13] px-3 py-1 rounded-full hover:bg-[#FF5D13] hover:text-white transition-all duration-200 cursor-pointer bg-transparent"
        >
          Lihat Semua
        </button>
      </div>

      {/* Scroll row with buttons */}
      <div className="relative max-w-[1200px] mx-auto">
        <button
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-6 z-10 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center text-gray-600 hover:text-[#FF5D13] border-0 cursor-pointer -translate-x-4"
        >‹</button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 px-4 md:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map(item => <ProgramCard key={item.id} item={item} />)}
        </div>

        <button
          onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-6 z-10 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center text-gray-600 hover:text-[#FF5D13] border-0 cursor-pointer translate-x-4"
        >›</button>
      </div>
    </div>
  )
}

// ── EVENT SECTION ─────────────────────────────────────────────────────────────
function EventSection() {
  const navigate  = useNavigate()
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 500, behavior: 'smooth' })
  }

  return (
    <div className="py-8 bg-white">
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 max-w-[1200px] mx-auto">
        <h2 className="text-base font-black uppercase tracking-wide text-gray-900 border-l-4 border-[#FF5D13] pl-3">
          Event Terbaru
        </h2>
        <button
          onClick={() => navigate('/event')}
          className="text-xs font-semibold text-[#FF5D13] border border-[#FF5D13] px-3 py-1 rounded-full hover:bg-[#FF5D13] hover:text-white transition-all duration-200 cursor-pointer bg-transparent"
        >
          Lihat Semua
        </button>
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        <button
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center text-gray-600 hover:text-[#FF5D13] border-0 cursor-pointer -translate-x-4"
        >‹</button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 px-4 md:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {EVENTS.map(ev => (
            <a
              key={ev.id}
              href={ev.link}
              className="shrink-0 rounded-xl overflow-hidden block"
              style={{ width: 260 }}
            >
              <div className="bg-gray-200 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={ev.image}
                  alt={`Event ${ev.id}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md items-center justify-center text-gray-600 hover:text-[#FF5D13] border-0 cursor-pointer translate-x-4"
        >›</button>
      </div>
    </div>
  )
}

// ── JTV HUB SECTION ───────────────────────────────────────────────────────────
function JtvHubSection() {
  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center shadow-sm">

          {/* Kiri: teks */}
          <div className="flex-1">
            {/* Logo JTV Hub — kosongi, user isi sendiri */}
            <div className="mb-4 w-32 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">
              logo jtv hub
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              JTV Digital menghadirkan cara baru menikmati tayangan dan layanan JTV langsung
              dari genggaman Anda. Melalui aplikasi JTV Hub, semua konten favorit mulai dari
              video, live streaming, event spesial, hingga portal berita bisa diakses dengan mudah,
              kapan saja dan di mana saja. Satu aplikasi untuk semua kebutuhan hiburan dan
              informasi khas Jawa Timur.
            </p>

            <p className="text-sm font-bold text-gray-800 mb-2">Benefit</p>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal pl-5 mb-6">
              {[
                'Akses Praktis & Cepat',
                'Live Streaming & Video On-Demand',
                'Event Eksklusif',
                'Portal Berita Terpercaya',
                'Interaktif',
                'Fleksibel',
              ].map((b, i) => <li key={i}>{b}</li>)}
            </ol>

            <p className="text-sm font-bold text-[#FF5D13] mb-4">
              Download Sekarang & Nikmati Hiburan Tanpa Batas!
            </p>

            {/* Store buttons */}
            <div className="flex gap-3">
              <a
                href="https://play.google.com/store"
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 hover:border-[#FF5D13] transition-colors duration-200"
              >
                {/* Logo Google Play — kosongi, user isi sendiri */}
                <div className="w-5 h-5 bg-gray-200 rounded shrink-0" title="logo google play" />
                <div>
                  <p className="text-[9px] text-gray-500 leading-none">GET IT ON</p>
                  <p className="text-xs font-bold text-gray-800 leading-tight">Google Play</p>
                </div>
              </a>

              <a
                href="https://apps.apple.com"
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 hover:border-[#FF5D13] transition-colors duration-200"
              >
                {/* Logo App Store — kosongi, user isi sendiri */}
                <div className="w-5 h-5 bg-gray-200 rounded shrink-0" title="logo app store" />
                <div>
                  <p className="text-[9px] text-gray-500 leading-none">Download on the</p>
                  <p className="text-xs font-bold text-gray-800 leading-tight">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Kanan: mockup gambar — kosongi, user isi sendiri */}
          <div className="shrink-0 flex items-center justify-center">
            <div
              className="bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300 text-xs text-center"
              style={{ width: 280, height: 320 }}
            >
              gambar mockup<br />jtv hub app
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── DULUR DIGITAL SECTION ─────────────────────────────────────────────────────
function DulurDigitalSection() {
  return (
    <div className="py-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
        <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">
          Dulur Digital JTV
        </h2>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {DULUR_DIGITAL.map(d => (
            <a
              key={d.id}
              href={d.link}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
            >
              {/* Gambar logo dulur digital — kosongi, user isi sendiri */}
              <div
                className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-xs"
                style={{ width: 100, height: 44 }}
              >
                {d.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Hero Slider */}
      <HeroSlider />

      {/* Program Pilihan */}
      <div className="bg-white">
        <ProgramSection
          title="Program Pilihan"
          items={PROGRAM_PILIHAN}
          onSeeAll={() => navigate('/program?filter=pilihan')}
        />
      </div>

      {/* Program Terbaru */}
      <div className="bg-gray-50">
        <ProgramSection
          title="Program Terbaru"
          items={PROGRAM_TERBARU}
          onSeeAll={() => navigate('/program?filter=terbaru')}
        />
      </div>

      {/* Program Populer */}
      <div className="bg-white">
        <ProgramSection
          title="Program Populer"
          items={PROGRAM_POPULER}
          onSeeAll={() => navigate('/program?filter=populer')}
        />
      </div>

      {/* Event Terbaru */}
      <EventSection />

      {/* JTV Hub */}
      <JtvHubSection />

      {/* Dulur Digital JTV */}
      <DulurDigitalSection />

    </main>
  )
}