import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import pojokKampungImg from '../../assets/images/program/program_pojokKampung.png'
import pojokArenaImg from '../../assets/images/program/program_pojokArena.png'
import semarMesemImg from '../../assets/images/program/program_semarMesem.png'
import stasiunDangdutImg from '../../assets/images/program/program_stasiunDangdut.png'

const PROGRAMS = {
  'jatim-awan':      { title: 'Jatim Awan',      image: '/assets/images/program/jatim_awan.jpg',      tayang: 'Setiap Hari',  pukul: '14.00 - 14.30 WIB', kategori: 'iNews',    kategoriColor: '#1d4ed8', kategoriBg: 'rgba(29,78,216,0.1)',   kategoriBorder: '#1d4ed8', deskripsi: 'Jatim Awan hadir menyajikan berita-berita faktual, update terkini, dan disampaikan dengan gaya ringan, segar, dan entertaining, renyah namun tetap tajam. Jatim Awan siap menemani waktu santai sore kamu dengan berbagai informasi penting dari seluruh penjuru Jawa Timur mulai dari kabar pemerintah, masyarakat, ekonomi, hingga peristiwa unik dan viral. Ini bukan sekadar berita, tapi juga hiburan informatif yang bikin kamu melek informasi.' },
  'pojok-pitu':      { title: 'Pojok Pitu',      image: '/assets/images/program/pojok_pitu.jpg',      tayang: 'Setiap Hari',  pukul: '19.00 - 19.30 WIB', kategori: 'iNews',    kategoriColor: '#1d4ed8', kategoriBg: 'rgba(29,78,216,0.1)',   kategoriBorder: '#1d4ed8', deskripsi: 'Pojok Pitu adalah program berita unggulan JTV yang hadir setiap malam menemani pemirsa dengan sajian berita terkini, mendalam, dan terpercaya dari seluruh penjuru Jawa Timur dan nasional.' },
  'pojok-kampung':   { title: 'Pojok Kampung',   image: pojokKampungImg,                              tayang: 'Senin, Rabu, Kamis, Jumat, Minggu', pukul: '16.00 - 16.30 WIB', kategori: 'iNews', kategoriColor: '#1d4ed8', kategoriBg: 'rgba(29,78,216,0.1)', kategoriBorder: '#1d4ed8', deskripsi: 'Pojok Kampung menghadirkan berita-berita dari pelosok Jawa Timur yang dekat dengan kehidupan masyarakat desa dan kampung. Program yang autentik, hangat, dan penuh semangat lokal.' },
  'pojok-arena':     { title: 'Pojok Arena',     image: pojokArenaImg,                                tayang: 'Setiap Hari',  pukul: '22.00 - 22.30 WIB', kategori: 'iNews',    kategoriColor: '#1d4ed8', kategoriBg: 'rgba(29,78,216,0.1)',   kategoriBorder: '#1d4ed8', deskripsi: 'Pojok Arena menyajikan berita olahraga terkini, mulai dari sepak bola, bulu tangkis, hingga olahraga tradisional Jawa Timur.' },
  'semar-mesem':     { title: 'Semar Mesem',     image: semarMesemImg,                                tayang: 'Minggu',       pukul: '19.00 - 20.00 WIB', kategori: 'Komedi',   kategoriColor: '#db2777', kategoriBg: 'rgba(219,39,119,0.1)',  kategoriBorder: '#db2777', deskripsi: 'Semar Mesem adalah program hiburan komedi yang mengangkat budaya dan tradisi Jawa dengan sentuhan humor segar.' },
  'ndoro-bei':       { title: 'Ndoro Bei',       image: '/assets/images/program/ndoro_bei.jpg',       tayang: 'Senin - Kamis', pukul: '21.00 - 22.00 WIB', kategori: 'Drama',   kategoriColor: '#16a34a', kategoriBg: 'rgba(22,163,74,0.1)',   kategoriBorder: '#16a34a', deskripsi: 'Ndoro Bei adalah serial drama yang mengisahkan kehidupan masyarakat Jawa Timur dengan balutan budaya lokal yang kental.' },
  'stasiun-dangdut': { title: 'Stasiun Dangdut', image: stasiunDangdutImg,                            tayang: 'Sabtu',        pukul: '20.00 - 22.00 WIB', kategori: 'Musik',    kategoriColor: '#ca8a04', kategoriBg: 'rgba(234,179,8,0.1)',   kategoriBorder: '#ca8a04', deskripsi: 'Stasiun Dangdut adalah panggung musik dangdut terbesar di Jawa Timur. Menghadirkan penyanyi-penyanyi berbakat lokal dan nasional.' },
  'ngaji-blusukan':  { title: 'Ngaji Blusukan',  image: '/assets/images/program/ngaji_blusukan.jpg',  tayang: 'Setiap Hari',  pukul: '04.00 - 04.30 WIB', kategori: 'Religi',   kategoriColor: '#16a34a', kategoriBg: 'rgba(22,163,74,0.1)',   kategoriBorder: '#16a34a', deskripsi: 'Ngaji Blusukan menghadirkan kajian Islam yang ringan dan mudah dipahami, disampaikan langsung dari masjid-masjid dan pesantren di penjuru Jawa Timur.' },
  'jatim-siang':     { title: 'Jatim Siang',     image: '/assets/images/program/jatim_siang.jpg',     tayang: 'Senin - Jumat', pukul: '12.00 - 12.30 WIB', kategori: 'Talkshow', kategoriColor: '#7e22ce', kategoriBg: 'rgba(126,34,206,0.1)',  kategoriBorder: '#7e22ce', deskripsi: 'Jatim Siang hadir menemani istirahat siang kamu dengan obrolan santai seputar isu terkini, budaya, dan kehidupan masyarakat Jawa Timur.' },
  'jatim-joss':      { title: 'Jatim Joss',      image: '/assets/images/program/jatim_joss.jpg',      tayang: 'Senin - Jumat', pukul: '08.00 - 09.00 WIB', kategori: 'Talkshow', kategoriColor: '#7e22ce', kategoriBg: 'rgba(126,34,206,0.1)',  kategoriBorder: '#7e22ce', deskripsi: 'Jatim Joss adalah program talkshow pagi yang membahas isu-isu hangat di Jawa Timur dengan narasumber kompeten dan informatif.' },
  'ruang-karir':     { title: 'Ruang Karir',     image: '/assets/images/program/ruang_karir.jpg',     tayang: 'Sabtu',        pukul: '15.00 - 16.00 WIB', kategori: 'Talkshow', kategoriColor: '#7e22ce', kategoriBg: 'rgba(126,34,206,0.1)',  kategoriBorder: '#7e22ce', deskripsi: 'Ruang Karir hadir untuk membantu generasi muda Jawa Timur menemukan peluang karir terbaik melalui tips, talkshow, dan kisah inspiratif.' },
  'mancing-mbois':   { title: 'Mancing Mbois',   image: '/assets/images/program/mancing_mbois.jpg',   tayang: 'Minggu',       pukul: '06.00 - 07.00 WIB', kategori: 'Olahraga', kategoriColor: '#0369a1', kategoriBg: 'rgba(3,105,161,0.1)',   kategoriBorder: '#0369a1', deskripsi: 'Mancing Mbois mengajak pemirsa menjelajahi spot-spot mancing terbaik di Jawa Timur dengan gaya yang santai dan menghibur.' },
  'voliga':          { title: 'Voliga',           image: '/assets/images/program/voliga.jpg',          tayang: 'Sabtu',        pukul: '17.00 - 18.00 WIB', kategori: 'Olahraga', kategoriColor: '#0369a1', kategoriBg: 'rgba(3,105,161,0.1)',   kategoriBorder: '#0369a1', deskripsi: 'Voliga menyajikan liputan voli pantai dan indoor terbaik dari seluruh Jawa Timur.' },
  'padhange-ati':    { title: 'Padhange Ati',    image: '/assets/images/program/padhange_ati.jpg',    tayang: 'Setiap Hari',  pukul: '05.00 - 05.30 WIB', kategori: 'Religi',   kategoriColor: '#16a34a', kategoriBg: 'rgba(22,163,74,0.1)',   kategoriBorder: '#16a34a', deskripsi: 'Padhange Ati adalah program siraman rohani pagi yang hadir dengan kajian ringan dan menyentuh hati.' },
  'kultum':          { title: 'Kultum',           image: '/assets/images/program/kultum.jpg',          tayang: 'Setiap Hari',  pukul: '17.30 - 18.00 WIB', kategori: 'Religi',   kategoriColor: '#16a34a', kategoriBg: 'rgba(22,163,74,0.1)',   kategoriBorder: '#16a34a', deskripsi: 'Kultum hadir menemani waktu menjelang Maghrib dengan ceramah singkat yang penuh hikmah.' },
}

const OTHER_PROGRAMS = [
  { slug: 'pojok-kampung',   title: 'Pojok Kampung',   image: pojokKampungImg,   kategori: 'iNews',    kategoriColor: '#1d4ed8', kategoriBg: 'rgba(29,78,216,0.1)',   kategoriBorder: '#1d4ed8' },
  { slug: 'pojok-arena',     title: 'Pojok Arena',     image: pojokArenaImg,     kategori: 'iNews',    kategoriColor: '#1d4ed8', kategoriBg: 'rgba(29,78,216,0.1)',   kategoriBorder: '#1d4ed8' },
  { slug: 'semar-mesem',     title: 'Semar Mesem',     image: semarMesemImg,     kategori: 'Komedi',   kategoriColor: '#db2777', kategoriBg: 'rgba(219,39,119,0.1)',  kategoriBorder: '#db2777' },
  { slug: 'stasiun-dangdut', title: 'Stasiun Dangdut', image: stasiunDangdutImg, kategori: 'Musik',    kategoriColor: '#ca8a04', kategoriBg: 'rgba(234,179,8,0.1)',   kategoriBorder: '#ca8a04' },
  { slug: 'pojok-pitu',      title: 'Pojok Pitu',      image: '/assets/images/program/pojok_pitu.jpg', kategori: 'iNews', kategoriColor: '#1d4ed8', kategoriBg: 'rgba(29,78,216,0.1)', kategoriBorder: '#1d4ed8' },
]

// ── BADGE — lebar pas konten ──────────────────────────────────────────────────
function Badge({ label, bg, color, border }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: 10, fontWeight: 700,
      padding: '3px 8px', borderRadius: 99,
      background: bg, color, border: `0.5px solid ${border}`,
      fontFamily: 'Inter, sans-serif',
      whiteSpace: 'nowrap',        // tidak wrap
      alignSelf: 'flex-start',     // tidak melebar penuh
    }}>
      {label}
    </span>
  )
}

// ── SIDEBAR CARD ──────────────────────────────────────────────────────────────
function SidebarCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: 8, borderRadius: 8, cursor: 'pointer',
        background: hovered ? '#f0f4ff' : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      {/* Thumbnail */}
      <div style={{ flexShrink: 0, width: 100, height: 58, borderRadius: 6, overflow: 'hidden', background: '#ddd' }}>
        <img src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.target.style.display = 'none' }}
        />
      </div>
      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
        <p style={{
          margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.3,
          fontFamily: 'Poppins, Inter, sans-serif',
          color: hovered ? '#1d4ed8' : '#1a1a1a',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {item.title}
        </p>
        <Badge label={item.kategori} bg={item.kategoriBg} color={item.kategoriColor} border={item.kategoriBorder} />
      </div>
    </div>
  )
}

// ── SKELETON ──────────────────────────────────────────────────────────────────
function Skeleton({ w = '100%', h = 20, radius = 6 }) {
  return (
    <div style={{ width: w, height: h, borderRadius: radius, background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
  )
}

// ── PROGRAM DETAIL PAGE ───────────────────────────────────────────────────────
export default function ProgramDetail() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)

  // Overview semua program jika tidak ada slug
  if (!slug) {
    const allPrograms = Object.entries(PROGRAMS).map(([s, info]) => ({ slug: s, ...info }))
    return (
      <main style={{ minHeight: '100vh', background: '#f2f0ec', fontFamily: 'Inter, sans-serif', padding: '40px 80px' }}>
        <h1 style={{ margin: '0 0 24px', fontSize: 24, fontWeight: 700 }}>Daftar Program</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 24 }}>
          {allPrograms.map(p => (
            <div key={p.slug} onClick={() => navigate(`/program/${p.slug}`)}
              style={{ cursor: 'pointer', background: 'white', borderRadius: 10, overflow: 'hidden', border: '0.5px solid #e0e0e0' }}>
              <div style={{ width: '100%', aspectRatio: '16/9', background: '#e5e7eb' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.style.display = 'none' }} />
              </div>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{p.title}</p>
                <Badge label={p.kategori} bg={p.kategoriBg} color={p.kategoriColor} border={p.kategoriBorder} />
              </div>
            </div>
          ))}
        </div>
      </main>
    )
  }

  useEffect(() => {
    setLoading(true); setError(false); setProgram(null)
    const timer = setTimeout(() => {
      const data = PROGRAMS[slug]
      if (data) { setProgram(data); setLoading(false) }
      else      { setError(true);   setLoading(false) }
    }, 300)
    return () => clearTimeout(timer)
  }, [slug])

  const others = OTHER_PROGRAMS
    .filter(p => p.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  if (error) return (
    <main style={{ minHeight: '100vh', background: '#f2f0ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#d1d5db" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1" fill="#d1d5db"/></svg>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#374151', margin: 0 }}>Program tidak ditemukan</p>
        <p style={{ fontSize: 14, color: '#9ca3af', margin: 0 }}>Slug: <code style={{ background: '#f3f4f6', padding: '2px 8px', borderRadius: 4 }}>{slug}</code></p>
        <button onClick={() => navigate(-1)} style={{ marginTop: 8, padding: '10px 24px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          ← Kembali
        </button>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#f2f0ec', fontFamily: 'Inter, sans-serif', paddingTop: 40, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* ── KONTEN UTAMA ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '0.5px solid #e0e0e0' }}>

              {/* Hero image */}
              <div style={{ width: '100%', aspectRatio: '16/9', background: '#e5e7eb', overflow: 'hidden' }}>
                {loading
                  ? <div style={{ width: '100%', height: '100%', background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
                  : <img src={program.image} alt={program.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                }
              </div>

              {/* Info bar */}
              <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '0.3px solid rgba(0,0,0,0.12)' }}>
                {[
                  { label: 'Tayang',  value: program?.tayang },
                  { label: 'Pukul',   value: program?.pukul },
                  { label: 'Program', value: program?.kategori },
                ].map((item, i, arr) => {
                  // Pukul & Program: selalu 1 baris
                  // Tayang: max 3 kata baris 1, sisanya baris 2
                  const words = (item.value || '').split(' ')
                  const isMultiLine = item.label === 'Tayang' && words.length > 3
                  const line1 = isMultiLine ? words.slice(0, 3).join(' ') : item.value
                  const line2 = isMultiLine ? words.slice(3).join(' ') : null

                  return (
                    <div key={item.label} style={{
                      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', padding: '20px 8px', gap: 5,
                      borderRight: i < arr.length - 1 ? '0.5px solid rgba(0,0,0,0.12)' : 'none',
                    }}>
                      <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#6b6b6b', textAlign: 'center' }}>{item.label}</p>
                      {loading
                        ? <Skeleton w={100} h={16} />
                        : <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{line1}</p>
                            {line2 && <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{line2}</p>}
                          </div>
                      }
                    </div>
                  )
                })}
              </div>

              {/* Deskripsi */}
              <div style={{ padding: '28px 36px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                  <div style={{ width: 3, flexShrink: 0, alignSelf: 'stretch', background: '#1d4ed8', borderRadius: 99 }} />
                  {loading
                    ? <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <Skeleton h={15} /><Skeleton h={15} /><Skeleton w="75%" h={15} />
                      </div>
                    : <p style={{ margin: 0, fontSize: 15, color: '#1a1a1a', lineHeight: 1.8, textAlign: 'justify', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 400 }}>
                        {program.deskripsi}
                      </p>
                  }
                </div>
              </div>

            </div>
          </div>

          {/* ── SIDEBAR — sticky ── */}
          <div style={{ flexShrink: 0, width: 300, position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
            <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden' }}>
              {/* Header biru */}
              <div style={{ background: '#2563eb', padding: '14px 18px' }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>Program Lainnya</h3>
              </div>
              {/* List — selalu 4 item, filter slug aktif lalu ambil 4 */}
              <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {others.map(item => (
                  <SidebarCard key={item.slug} item={item} onClick={() => navigate(`/program/${item.slug}`)} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
      `}</style>
    </main>
  )
}