import { useState } from "react";

// Inject Inter font
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
document.head.appendChild(link);

// ── DATA ─────────────────────────────────────────────────────────────────────
const programs = [
  {
    id: 1, branch: "kediri",
    role: "Editor", mentor: "Trias Muhammad Aldilala",
    desc: [
      "Mempelajari Editing Berita",
      "Mempelajari Standart Tayangan Berita",
      "Mengunggah Produk Berita Ke Platform Sosialmedia",
    ],
    skills: ["Memahami teknik dasar editing", "memahi adobe premier"],
    quota: 10, totalPendaftar: 4, diterima: 0,
    image: null, // user will fill
  },
  {
    id: 2, branch: "kediri",
    role: "Editor", mentor: "Tri Budi Santoso",
    desc: ["Mempelajari Editing berita", "mempelajari standar berita", "mengoperasikan peralatan editing"],
    skills: ["Memahami teknik editing", "Memahami Adobe Premiere"],
    quota: 10, totalPendaftar: 2, diterima: 0,
    image: null,
  },
  {
    id: 3, branch: "surabaya",
    role: "Editor", mentor: "Tri Budi Santoso",
    desc: ["Mempelajari Editing berita", "mempelajari standar berita", "mengoperasikan peralatan editing"],
    skills: ["Memahami teknik editing", "Memahami Adobe Premiere"],
    quota: 10, totalPendaftar: 5, diterima: 1,
    image: null,
  },
  {
    id: 4, branch: "kediri",
    role: "Editor", mentor: "Tri Budi Santoso",
    desc: ["Mempelajari Editing berita", "mempelajari standar berita", "mengoperasikan peralatan editing"],
    skills: ["Memahami teknik editing", "Memahami Adobe Premiere"],
    quota: 10, totalPendaftar: 3, diterima: 0,
    image: null,
  },
  {
    id: 5, branch: "kediri",
    role: "Editor", mentor: "Tri Budi Santoso",
    desc: ["Mempelajari Editing berita", "mempelajari standar berita", "mengoperasikan peralatan editing"],
    skills: ["Memahami teknik editing", "Memahami Adobe Premiere"],
    quota: 10, totalPendaftar: 1, diterima: 0,
    image: null,
  },
  {
    id: 6, branch: "surabaya",
    role: "Editor", mentor: "Tri Budi Santoso",
    desc: ["Mempelajari Editing berita", "mempelajari standar berita", "mengoperasikan peralatan editing"],
    skills: ["Memahami teknik editing", "Memahami Adobe Premiere"],
    quota: 10, totalPendaftar: 6, diterima: 2,
    image: null,
  },
  {
    id: 7, branch: "kediri",
    role: "Editor", mentor: "Tri Budi Santoso",
    desc: ["Mempelajari Editing berita", "mempelajari standar berita", "mengoperasikan peralatan editing"],
    skills: ["Memahami teknik editing", "Memahami Adobe Premiere"],
    quota: 10, totalPendaftar: 0, diterima: 0,
    image: null,
  },
  {
    id: 8, branch: "kediri",
    role: "Editor", mentor: "Tri Budi Santoso",
    desc: ["Mempelajari Editing berita", "mempelajari standar berita", "mengoperasikan peralatan editing"],
    skills: ["Memahami teknik editing", "Memahami Adobe Premiere"],
    quota: 10, totalPendaftar: 2, diterima: 0,
    image: null,
  },
  {
    id: 9, branch: "surabaya",
    role: "Editor", mentor: "Tri Budi Santoso",
    desc: ["Mempelajari Editing berita", "mempelajari standar berita", "mengoperasikan peralatan editing"],
    skills: ["Memahami teknik editing", "Memahami Adobe Premiere"],
    quota: 10, totalPendaftar: 4, diterima: 1,
    image: null,
  },
];

const testimonials = [
  {
    id: 1, name: "DIANA ANDRIANI", role: "DESAIN GRAFIS",
    quote: "menjadi bagian dari JTV merupakan hal yang sangat membanggakan bagi saya karena dengan begitu banyak sekali hal yang dapat saya dapatkan dan berteman baik dengan semua karywan yang ada disini.",
    photo: "https://placehold.co/220x320/f3e8ff/7c3aed?text=Diana",
  },
  {
    id: 2, name: "RYAN PRAYOGA", role: "PROGRAMMER",
    quote: "menjadi bagian dari JTV merupakan hal yang sangat membanggakan bagi saya karena dengan begitu banyak sekali hal yang dapat saya dapatkan dan berteman baik dengan semua karywan yang ada disini.",
    photo: "https://placehold.co/220x320/e0f2fe/1e40af?text=Ryan",
  },
];

// ── SHARED COMPONENTS ────────────────────────────────────────────────────────

function JtvLogoChip() {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0 shadow">
      <div className="w-full h-full bg-blue-700 flex items-center justify-center relative">
        <span className="absolute top-1 right-1 bg-red-600 text-white font-black leading-none rounded px-0.5" style={{ fontSize: "6px" }}>REKI</span>
        <span className="text-white font-black leading-none" style={{ fontSize: "11px" }}>jtv</span>
      </div>
    </div>
  );
}

// ── DETAIL PAGE ──────────────────────────────────────────────────────────────

function DetailPage({ program, onBack }) {
  const sisaKuota = program.quota - program.diterima;
  const persen = program.quota > 0 ? Math.round((program.diterima / program.quota) * 100) : 0;

  return (
    <div className="min-h-screen bg-stone-100" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Back bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-700 font-semibold text-sm hover:text-blue-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Kembali
        </button>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500 text-sm">Program Magang</span>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-8 flex gap-8">

        {/* LEFT: Main detail card */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Header card: role + mentor + daftar button */}
          <div className="bg-blue-600 rounded-2xl px-6 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-2xl leading-tight">{program.role}</h1>
              <div className="flex items-center gap-1.5 mt-1 text-blue-100 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
                </svg>
                Pembimbing: {program.mentor}
              </div>
            </div>
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
              </svg>
              + Daftar Sekarang
            </button>
          </div>

          {/* Image placeholder */}
          <div className="bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center" style={{ height: "220px" }}>
            {program.image ? (
              <img src={program.image} alt={program.role} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 16l5-5 4 4 3-3 5 5" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                </svg>
                <span className="text-sm font-medium">Tambahkan Gambar</span>
                <span className="text-xs">Gambar akan diisi oleh Anda</span>
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-3">Deskripsi</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {program.desc.map((d, i) => (
                <span key={i}>{i + 1}. {d}{i < program.desc.length - 1 ? " " : ""}</span>
              ))}
            </p>
          </div>

          {/* Skill yang Dibutuhkan */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Skill yang Dibutuhkan</h2>
            <div className="flex flex-col gap-2">
              {program.skills.map((s, i) => (
                <span key={i} className="inline-block bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-full w-fit">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Informasi Magang */}
          <div className="bg-gray-100 rounded-2xl p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Informasi Magang</h2>
            <div className="flex flex-col divide-y divide-gray-200">
              {[
                { label: "Kebutuhan", value: `${program.quota} orang`, color: "text-gray-900" },
                { label: "Total Pendaftar", value: `${program.totalPendaftar} orang`, color: "text-gray-900" },
                { label: "Yang Diterima", value: `${program.diterima} orang`, color: "text-gray-900" },
                { label: "Sisa Kuota", value: `${sisaKuota} orang`, color: "text-green-600" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-3">
                  <span className="text-gray-600 text-sm">{row.label}:</span>
                  <span className={`font-bold text-sm ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${persen}%` }}
                />
              </div>
              <p className="text-gray-400 text-xs mt-1.5">{persen}% Terisi</p>
            </div>
          </div>

        </div>

        {/* RIGHT: sidebar info */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
            <h3 className="font-bold text-gray-900 text-sm">Detail Program</h3>
            <div className="flex items-center gap-2">
              <JtvLogoChip />
              <div>
                <p className="font-bold text-blue-700 text-sm">{program.role}</p>
                <p className="text-gray-400 text-xs">{program.branch === "kediri" ? "JTV Kediri" : "JTV Surabaya"}</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Kuota</span>
                <span className="font-bold text-gray-800">{program.quota} orang</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Pendaftar</span>
                <span className="font-bold text-gray-800">{program.totalPendaftar} orang</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Sisa Kuota</span>
                <span className="font-bold text-green-600">{sisaKuota} orang</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
              Daftar Sekarang
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-3">Pembimbing</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{program.mentor}</p>
                <p className="text-gray-400 text-xs">Pembimbing Magang</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── PROGRAM CARD ─────────────────────────────────────────────────────────────

function ProgramCard({ program, onLihat }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <JtvLogoChip />
        <div className="bg-gray-200 rounded-lg w-12 h-12 flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-blue-900 font-black text-lg leading-none">{program.quota}</span>
          <span className="text-gray-400 font-bold leading-none" style={{ fontSize: "9px" }}>Butuh</span>
        </div>
      </div>
      <div className="text-blue-800 font-bold text-sm">{program.role}</div>
      <div className="flex items-center gap-1 text-gray-400" style={{ fontSize: "11px" }}>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
        </svg>
        {program.mentor}
      </div>
      <ol className="text-gray-700 list-decimal list-inside space-y-0.5" style={{ fontSize: "11px" }}>
        {program.desc.map((d, i) => <li key={i}>{d}</li>)}
      </ol>
      <div className="flex flex-col gap-1">
        {program.skills.map((s, i) => (
          <div key={i} className="bg-indigo-800 bg-opacity-40 rounded-lg px-2 py-1 text-gray-800 font-medium" style={{ fontSize: "11px" }}>
            {s}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <button
          onClick={() => onLihat(program)}
          className="flex-1 border-2 border-blue-950 text-blue-950 font-bold rounded-lg py-2 text-xs hover:bg-blue-50 transition-colors"
        >
          Lihat
        </button>
        <button className="flex-1 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-lg py-2 text-xs transition-colors">
          Daftar
        </button>
      </div>
    </div>
  );
}

// ── TESTIMONI ────────────────────────────────────────────────────────────────

function TestimoniCard({ t }) {
  return (
    <div className="relative flex-1" style={{ maxWidth: "420px" }}>
      <div className="absolute -top-3 right-6 z-10 bg-purple-300 text-blue-900 font-extrabold text-xs px-6 py-2 rounded-full shadow whitespace-nowrap tracking-wide">
        {t.role}
      </div>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden" style={{ minHeight: "180px" }}>
        <div className="flex items-stretch">
          <div className="flex-1 p-5 flex flex-col gap-2">
            <span className="text-blue-900 font-black leading-none" style={{ fontSize: "28px" }}>"</span>
            <p className="text-gray-600 leading-relaxed" style={{ fontSize: "12px" }}>{t.quote}</p>
            <p className="font-extrabold text-gray-900 tracking-wide mt-auto pt-3" style={{ fontSize: "12px" }}>{t.name}</p>
          </div>
          <div className="flex-shrink-0 flex items-end" style={{ width: "130px" }}>
            <img src={t.photo} alt={t.name} className="w-full object-cover object-top" style={{ height: "220px", objectPosition: "top center" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function JtvMagang() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [detailProgram, setDetailProgram] = useState(null);

  const handleFilter = (branch) => {
    setActiveFilter((prev) => (prev === branch ? null : branch));
  };

  // Show detail page when Lihat is clicked
  if (detailProgram) {
    return <DetailPage program={detailProgram} onBack={() => setDetailProgram(null)} />;
  }

  const filtered = activeFilter ? programs.filter((p) => p.branch === activeFilter) : programs;
  const countAll = programs.length;
  const countKediri = programs.filter((p) => p.branch === "kediri").length;
  const countSurabaya = programs.filter((p) => p.branch === "surabaya").length;

  return (
    <div className="min-h-screen bg-stone-100" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "220px" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500">
          <img src="https://placehold.co/1440x280/4a5568/4a5568" alt="" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="relative z-10 px-8 pt-8 pb-12">
          <h1 className="text-white font-extrabold leading-tight" style={{ fontSize: "28px" }}>
            Gabung dan jadi<br />bagian dari kami!
          </h1>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md text-xs transition-colors">
            Jelajahi Semua Pekerjaan
          </button>
        </div>
      </div>

      {/* ── NAV TABS ── */}
      <div className="bg-blue-700 flex items-center px-8 gap-0">
        {["Pekerjaan", "Magang", "Kunjungan"].map((tab) => (
          <button key={tab} className={`px-5 py-3 text-sm font-semibold transition-colors relative ${tab === "Magang" ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-400" : "text-blue-200 hover:text-white"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── HERO TEXT ── */}
      <div className="bg-white px-8 py-6 border-b border-gray-100">
        <span className="bg-orange-100 text-orange-600 font-bold text-xs px-3 py-1 rounded-full">
          PENDAFTARAN MAGANG 2026 TELAH DIBUKA
        </span>
        <h2 className="font-extrabold text-gray-900 leading-tight mt-3" style={{ fontSize: "26px" }}>
          Gabung dan jadi<br />bagian dari kami!
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mt-2 max-w-sm">
          Kembangkan kemampuanmu bersama media televisi terbesar di Jawa Timur. Dapatkan pengalaman langsung di industri broadcast, desain, dan teknologi media.
        </p>
        <div className="flex gap-3 mt-4">
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Jelajahi Program
          </button>
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Daftar sekarang
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="bg-stone-100 px-8 py-4 flex items-center gap-4 border-b border-gray-200">
        <button onClick={() => setActiveFilter(null)} className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${!activeFilter ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
          SEMUA <span className="text-xs font-black text-gray-800">{countAll}</span>
        </button>
        <button onClick={() => handleFilter("kediri")} className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${activeFilter === "kediri" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
          JTV Kediri <span className="text-xs font-black text-gray-800">{countKediri}</span>
        </button>
        <button onClick={() => handleFilter("surabaya")} className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${activeFilter === "surabaya" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
          JTV Surabaya <span className="text-xs font-black text-gray-800">{countSurabaya}</span>
        </button>
      </div>

      {/* ── CARDS ── */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProgramCard key={p.id} program={p} onLihat={(prog) => setDetailProgram(prog)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-20">Tidak ada program tersedia.</div>
        )}
      </div>

      {/* ── TESTIMONI ── */}
      <div className="bg-blue-700 px-8 py-10 pb-12">
        <h2 className="text-center font-extrabold text-white mb-10 tracking-widest" style={{ fontSize: "36px" }}>
          <span className="bg-yellow-400 text-blue-900 px-2 rounded-sm mr-0.5">TES</span>TIMONI
        </h2>
        <div className="flex gap-6 justify-center items-start pt-4">
          {testimonials.map((t) => (
            <TestimoniCard key={t.id} t={t} />
          ))}
        </div>
      </div>

    </div>
  );
}