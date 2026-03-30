import React from "react"
import JTVPortal from '../../assets/images/logo/logo_portal.png'
import JTVHub from '../../assets/images/logo/logo_jtvHub.png'
import JTVGame from '../../assets/images/logo/logo_jtvGame.png'

const DULUR_DIGITAL = [
  { id: 1, name: "Portal JTV", image: JTVPortal, link: "https://portaljtv.com" },
  { id: 2, name: "JTV Hub", image: JTVHub, link: "https://play.google.com/store/apps/details?id=com.jtvplusplus.jtv_plus_plus&pcampaignid=web_share" },
  { id: 3, name: "JTV Game", image: JTVGame, link: "https://play.google.com/store/apps/details?id=com.jtv.jtvgame&pcampaignid=web_share" },
]

export default function DulurDigitalSection() {
  return (
    <section className="flex justify-center">

      {/* Container putih */}
      <div className="w-[1105px] bg-white rounded-tl-[20px] rounded-tr-[20px] py-10 px-8 text-center">

        {/* Title */}
        <h2 className="text-xl font-extrabold text-black mb-10">
          DULUR DIGITAL JTV
        </h2>

        {/* Logo */}
        <div className="flex items-center justify-center gap-14">

          {DULUR_DIGITAL.map((d) => (
            <a
              key={d.id}
              href={d.link}
              target="_blank"
              rel="noreferrer"
              className="transition-transform duration-200 hover:scale-105"
            >
              <img
                src={d.image}
                alt={d.name}
                className="h-16 object-contain"
              />
            </a>
          ))}

        </div>

      </div>

    </section>
  )
}