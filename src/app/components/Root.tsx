import React from 'react'
import content from '../AppContent.json'
import Link from 'next/link'
import Image from 'next/image'
import { FaYoutube, FaFacebook, FaTiktok, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa'

const socialIconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  YouTube:   { icon: <FaYoutube />, color: '#FF0000' },
  Facebook:  { icon: <FaFacebook />, color: '#1877F3' },
  TikTok:    { icon: <FaTiktok />, color: '#010101' },
  Instagram: { icon: <FaInstagram />, color: '#E1306C' },
  LinkedIn:  { icon: <FaLinkedin />, color: '#0077B5' },
  Telegram:  { icon: <FaTelegram />, color: '#229ED9' },
  WhatsApp:  { icon: <FaWhatsapp />, color: '#25D366' },
}

const Root = () => {
  const rootText = content.rootPage
  return (
    <div >
      <div className='mt-[-50px] md:mt-[-150px]' >
        <Image src="/SVG/Cloudy (1).svg" alt="Root Clouds" height={100} width={800} className='w-full h-[10%] z-20 ' />
      </div>
      {/* <main className=" min-h-[50vh] w-full flex flex-col items-center justify-center px-4 py-16 bg-[var(--surface)]" style={{background: 'linear-gradient(135deg, #3c97ff 0%, #1e3a8a 100%)'}}> */}
      <main className=" min-h-[50vh] w-full flex flex-col items-center justify-center px-4 py-16 bg-[var(--surface)]" style={{background: 'linear-gradient(135deg, #3c97ff 0%,  #3c97ff 100%)'}}>
        <div className=" page flex flex-col md:flex-row items-center justify-center gap-10 ">
          {/* Logo and Social Icons */}
            <div className="flex-1 flex flex-col items-center gap-6">
              <Image
                src="/assets/Logo.png"
                alt="App Logo"
                width={160}
                height={160}
                className=""
                priority
              />
              <div className="w-full flex flex-col items-center gap-2">
                <h3 className="text-xl font-bold text-[var(--black)] mb-2">{rootText.socialTitle}</h3>
                <div className="flex flex-wrap gap-6 py-2 justify-center">
                  {rootText.socialLinks.map((soc: any, idx: number) => {
                    const iconData = socialIconMap[soc.platform] || { icon: null, color: '#888' }
                    return (
                      <Link key={idx} href={soc.href} target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center group"
                        style={{ color: iconData.color }}
                      >
                        <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300">
                          {iconData.icon}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          {/* Text and Quick Links */}
            <div className="flex-1 flex flex-col items-end justify-end gap-6">
              <div className="w-full flex flex-col items-center justify-center gap-2 mt-4">
                <h1 className="text-xl font-bold text-[var(--black)] mb-2">{rootText.quickLinksTitle}</h1>
                <div className="flex flex-col gap-2">
                  {rootText.quickLinks.map((link: any, idx: number) => (
                    <Link key={idx} href={link.href} className=" w-full md:w-fit hover:underline text-[var(--inactive-text)] text-center">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

        </div>
      </main>
    </div>
  )
}

export default Root