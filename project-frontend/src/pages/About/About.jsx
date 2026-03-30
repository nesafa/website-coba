import React, { useState, useRef, useEffect } from 'react'
import DulurDigitalSection from "../../components/DulurDigitalJTV/dulur_digitalJTV"
import gambarKantor from '../../assets/images/tentang/gambar_kantor.svg'
import profileJTV from '../../assets/images/tentang/profile_JTV.svg'
import teleponIcon from '../../assets/icons/telepon.svg'
import emailIcon from '../../assets/icons/email.svg'
import webIcon from '../../assets/icons/web.svg'
import lokasiIcon from '../../assets/icons/lokasi.svg'

// ── CONTACT INFO DATA ─────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    id: 'telepon',
    icon: teleponIcon,
    label: 'Telepon',
    value: '(031) 8202170',
  },
  {
    id: 'email',
    icon: emailIcon,
    label: 'Email',
    value: 'www.jtv.co.id',
  },
  {
    id: 'website',
    icon: webIcon,
    label: 'Website',
    value: 'official@jtv.co.id',
  },
  {
    id: 'lokasi',
    icon: lokasiIcon,
    label: 'Lokasi',
    value: 'Jl. Ahmad Yani No. 88, Ketintang, Gayungan, Surabaya, Jawa Timur',
  },
]

const VIDEO_ID = 'sx1m_Eobjqc'

function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 483 }}>
      <img
        src={gambarKantor}
        alt="Hero JTV"
        className="absolute inset-0 w-full h-full object-cover"
        onError={e => { e.target.style.display = 'none' }}
      />
      
    </div>
  )
}

// ── TENTANG JTV ───────────────────────────────────────────────────────────────
function TentangSection() {
  return (
    <div className="bg-stone-100 py-16">
      <div className="max-w-[1176px] mx-auto px-[132px] flex items-start gap-16">

        {/* TEXT */}
        <div className="w-[620px]">
          <h2 className="text-2xl font-extrabold text-black mb-6">
            TENTANG JTV
          </h2>

          <p className="text-[16px] text-justify leading-relaxed text-black">
            JTV (Jawa Timur Televisi) adalah stasiun televisi lokal pertama dan terbesar di
            Jawa Timur, yang telah siaran sejak tahun 2001. Dengan jangkauan siaran yang luas,
            JTV berkomitmen untuk menyediakan informasi, hiburan, dan pendidikan yang relevan
            dengan budaya dan masyarakat Jawa Timur.
          </p>

          <p className="text-[16px] text-justify leading-relaxed text-black mt-6">
            Melalui program berita, talk show, hiburan, konten budaya, dan program pendidikan,
            JTV terus berupaya menjadi stasiun televisi yang dekat dengan masyarakat, mendukung
            kreativitas pemuda, dan melestarikan kebijaksanaan lokal Jawa Timur di era digital.
          </p>
        </div>

        {/* IMAGE */}
        <div className="w-[473px] h-[381px] flex-shrink-0">
          <img
            src={profileJTV}
            alt="Profile JTV"
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </div>
  )
}

// ── PROFILE JTV (YouTube Embed) ───────────────────────────────────────────────
function ProfileSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <div style={{ background: '#f7f5f2', paddingBottom: 60 }}>
      <h2
        className="font-extrabold text-center text-gray-900 mb-6"
        style={{ fontSize: 24, paddingTop: 40 }}
      >
        PROFILE JTV
      </h2>

        <div
          className="relative mx-auto"
          style={{
            width: '100%',
            maxWidth: 860,
            borderRadius: 20,
            overflow: 'hidden',
            aspectRatio: '16 / 9'
          }}
        >
        {!playing ? (
          <>
            {/* Thumbnail YouTube */}
            <img
              src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
              alt="Profile JTV"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => {
                e.target.src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`
              }}
            />

            {/* Overlay gelap */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)' }} />

            {/* Tombol play */}
            <button
              onClick={() => setPlaying(true)}
              className="
                absolute
                top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-20 h-20
                rounded-full
                flex items-center justify-center
                border-2 border-white/70
                bg-white/20
                backdrop-blur-md
                shadow-xl
                transition-all duration-300
                hover:scale-110
                hover:bg-primary
                hover:border-primary
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 text-white ml-1"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </>
        ) : (
          /* YouTube iframe — muncul setelah play diklik */
            <iframe
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&controls=1`}
            title="Profile JTV"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}

// ── KONTAK KAMI ───────────────────────────────────────────────────────────────
function KontakSection() {
  const [form, setForm]           = useState({ nama: '', email: '', subjek: '', pesan: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ nama: '', email: '', subjek: '', pesan: '' })
  }

  return (
    <div id="kontak" style={{ background: '#f7f5f2', padding: '80px 0' }}>
      <div className="mx-auto" style={{ maxWidth: 1176, padding: '0 132px' }}>

        <h2
          className="font-extrabold text-gray-900 mb-8"
          style={{ fontSize: 24, lineHeight: '29px' }}
        >
          KONTAK KAMI
        </h2>

        <div className="flex items-start gap-16">

          <div style={{ width: 392, flexShrink: 0 }}>
            <p className="font-bold text-gray-900 mb-2" style={{ fontSize: 16 }}>
              Mari terhubung dengan JTV!
            </p>
            <p className="text-gray-600 mb-10" style={{ fontSize: 16, fontWeight: 500 }}>
              Terima kasih atas minat Anda pada JTV Surabaya.<br />
              Kami sangat ingin mendengar kabar dari Anda.
            </p>

            <div className="flex flex-col gap-6">
              {CONTACT_INFO.map(item => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="shrink-0 flex items-center justify-center w-8 h-8">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5 object-contain"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-gray-900" style={{ fontSize: 16 }}>
                      {item.label}
                    </p>
                    <p className="text-gray-700" style={{ fontSize: 16, fontWeight: 500 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white rounded-2xl shadow-sm flex-1"
            style={{ maxWidth: 500, padding: '38px 50px' }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-800" style={{ fontSize: 16 }}>
                  Nama Lengkap<span className="text-[#FF5D13]">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama kamu"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none transition-colors"
                  onFocus={e => e.target.style.borderColor = '#002d7a'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-800" style={{ fontSize: 16 }}>
                  Email<span className="text-[#FF5D13]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Masukkan email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none transition-colors"
                  onFocus={e => e.target.style.borderColor = '#002d7a'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-800" style={{ fontSize: 16 }}>
                  Subjek<span className="text-[#FF5D13]">*</span>
                </label>
                <input
                  type="text"
                  name="subjek"
                  value={form.subjek}
                  onChange={handleChange}
                  placeholder="Masukkan subjek"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none transition-colors"
                  onFocus={e => e.target.style.borderColor = '#002d7a'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-800" style={{ fontSize: 16 }}>
                  Pesan<span className="text-[#FF5D13]">*</span>
                </label>
                <textarea
                  name="pesan"
                  value={form.pesan}
                  onChange={handleChange}
                  placeholder="Ketik pertanyaan kamu..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none resize-none transition-colors"
                  onFocus={e => e.target.style.borderColor = '#002d7a'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 text-white font-medium rounded-lg border-0 cursor-pointer transition-colors duration-200"
                  style={{ background: submitted ? '#22c55e' : '#002d7a', fontSize: 15 }}
                  onMouseEnter={e => { if (!submitted) e.currentTarget.style.background = '#001f5c' }}
                  onMouseLeave={e => { if (!submitted) e.currentTarget.style.background = '#002d7a' }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  {submitted ? 'Terkirim!' : 'Kirim'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── MAP ───────────────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <div style={{ background: '#f7f5f2', paddingBottom: 80 }}>
      <div
        className="mx-auto overflow-hidden"
        style={{ maxWidth: 1105, borderRadius: 20, height: 430, margin: '0 auto 80px' }}
      >
        <a
          href="https://maps.app.goo.gl/DSvwWrJD7nwP9o1f8"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <iframe
            src="https://www.google.com/maps?q=JTV+Surabaya&output=embed"
            width="100%"
            height="430"
            className="w-full h-full border-0 pointer-events-none"
            loading="lazy"
            title="Lokasi JTV Surabaya"
          />
        </a>
      </div>
    </div>
  )
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
export default function About() {
  useEffect(() => {
    // Handle scroll to contact section if URL has #kontak hash
    if (window.location.hash === '#kontak') {
      const contactSection = document.getElementById('kontak')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <main style={{ background: '#f7f5f2', fontFamily: 'Inter, sans-serif' }}>
      <HeroSection />
      <TentangSection />
      <ProfileSection />
      <KontakSection />
      <MapSection />
      <DulurDigitalSection />
    </main>
  )
}