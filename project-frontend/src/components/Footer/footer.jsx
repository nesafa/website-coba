import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoJtv from '../../assets/images/logo/logo_jtv.svg'
import olinstagram from '../../assets/icons/icon_igOutline.png'
import fillinstagram from '../../assets/icons/icon_igFill.png'
import olyoutube from '../../assets/icons/icon_ytOutline.png'
import fillyoutube from '../../assets/icons/icon_ytFill.png'
import oltiktok from '../../assets/icons/icon_tiktokOutline.png'
import filltiktok from '../../assets/icons/icon_tiktokFill.png'
import olx from '../../assets/icons/icon_xOutline.png'
import fillx from '../../assets/icons/icon_xFill.png'
import ollinkedin from '../../assets/icons/icon_linkedOutline.png'
import filllinkedin from '../../assets/icons/icon_linkedFill.png'

import googlePlayLogo from '../../assets/images/logo/googleplay.svg'
import appStoreLogo from '../../assets/images/logo/appstore.svg'

const SOCIALS = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/jtv_rek?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', iconOutline: olinstagram, iconFill: fillinstagram },
  { id: 'youtube',   label: 'YouTube',   href: 'https://youtube.com/jtv',           iconOutline: olyoutube,   iconFill: fillyoutube },
  { id: 'tiktok',    label: 'TikTok',    href: 'https://tiktok.com/@jtv',           iconOutline: oltiktok,    iconFill: filltiktok },
  { id: 'x',         label: 'X',         href: 'https://twitter.com/jtv',           iconOutline: olx,         iconFill: fillx },
  { id: 'linkedin',  label: 'LinkedIn',  href: 'https://linkedin.com/company/jtv',  iconOutline: ollinkedin,  iconFill: filllinkedin },
]

function SocialIcon({ item }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center w-8 h-8 transition-transform duration-200 hover:scale-110"
    >
      <img
        src={hovered ? item.iconFill : item.iconOutline}
        alt={item.label}
        className="w-6 h-6 object-contain"
      />
    </a>
  )
}

function HubungiKamiBtn() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to="/tentang#kontak"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-block mt-3 px-5 py-1.5 rounded-full border text-sm font-medium transition-all duration-200"
      style={{
        borderColor: 'white',
        background: hovered ? 'white' : 'transparent',
        color: hovered ? '#002d7a' : 'white',
      }}
    >
      Hubungi Kami!
    </Link>
  )
}

function StoreBtn({ href, logo, altText, topText, bottomText }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200"
      style={{
        width: 132,
        height: 42,
        borderColor: hovered ? 'white' : 'rgba(255,255,255,0.35)',
        background: hovered ? 'rgba(255,255,255,0.15)' : 'transparent',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <img
        src={logo}
        alt={altText}
        className="object-contain shrink-0"
        style={{ width: 25, height: 28 }}
        onError={e => { e.target.style.display = 'none' }}
      />
      <div>
        <p className="text-[9px] leading-none" style={{ color: 'rgba(255,255,255,0.6)' }}>{topText}</p>
        <p className="text-xs font-bold text-white leading-tight">{bottomText}</p>
      </div>
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#002d7a', fontFamily: 'Inter, sans-serif', minHeight: 209 }}>

      {/* Main content */}
      <div className="max-w-[1441px] mx-auto relative" style={{ height: 175 }}>

        {/* Logo JTV */}
        <div className="absolute" style={{ left: 66, top: 40 }}>
          <img
            src={logoJtv}
            alt="JTV"
            style={{ width: 179, height: 104, objectFit: 'contain' }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
          />
          {/* Fallback */}
          <div className="items-center gap-1" style={{ display: 'none' }}>
            <span className="text-white font-black" style={{ fontSize: 36 }}>jtv</span>
            <span className="bg-[#FF5D13] text-white font-extrabold px-1.5 py-0.5 rounded inline-block -translate-y-3" style={{ fontSize: 11 }}>REK!</span>
          </div>
        </div>

        {/* Alamat + Hubungi Kami */}
        <div className="absolute flex flex-col items-start" style={{ left: 290, top: 40, width: 187 }}>
          <address className="not-italic text-white leading-relaxed" style={{ fontSize: 14, width: 187 }}>
            Jl. Ahmad Yani No. 88,<br />
            Ketintang, Gayungan,<br />
            Surabaya, Jawa Timur.
          </address>
          <HubungiKamiBtn />
        </div>

        {/* Garis pemisah kiri */}
        <div
          className="absolute hidden md:block"
          style={{ left: 520, top: 24, width: 1, height: 127, background: 'rgba(255,255,255,0.25)' }}
        />

        {/* Ikuti Kami */}
        <div className="absolute flex flex-col items-start" style={{ left: 562, top: 40, width: 195 }}>
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)', height: 17 }}>Ikuti Kami</p>
          <div className="flex items-center gap-1" style={{ height: 25 }}>
            {SOCIALS.map(s => <SocialIcon key={s.id} item={s} />)}
          </div>
        </div>

        {/* Garis pemisah kanan */}
        <div
          className="absolute hidden md:block"
          style={{ left: 1060, top: 24, width: 1, height: 127, background: 'rgba(255,255,255,0.25)' }}
        />

        {/* Download JTVhub */}
        <div className="absolute flex flex-col items-start" style={{ left: 1110, top: 40, width: 262 }}>
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)', height: 17 }}>Download JTVhub</p>
          <div className="flex items-center gap-3">

            <a
              href="https://play.google.com/store/apps/details?id=com.jtvplusplus.jtv_plus_plus&pcampaignid=web_share"
              target="_blank"
              rel="noreferrer"
              className="transition-transform duration-200 hover:scale-105"
            >
              <img
                src={googlePlayLogo}
                alt="Download on Google Play"
                className="h-10 object-contain"
              />
            </a>

            <a
              href="https://apps.apple.com/id/app/jtvhub/id6749603982"
              target="_blank"
              rel="noreferrer"
              className="transition-transform duration-200 hover:scale-105"
            >
              <img
                src={appStoreLogo}
                alt="Download on App Store"
                className="h-10 object-contain"
              />
            </a>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div
        className="flex items-center justify-center gap-2 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.15)', height: 34 }}
      >
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
          2026 JTV. All Rights Reserved
        </p>
      </div>

    </footer>
  )
}