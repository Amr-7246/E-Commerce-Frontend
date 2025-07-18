import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import content from '@/AppContent.json'

const Hero = () => {
  const hero = content.hero;
  return (
    <section className="w-full flex flex-col-reverse h-fit md:flex-row items-center justify-between  pb-10 gap-8 md:gap-0">
      {/* Left: Text and Buttons */}
      <div className="flex-1 flex flex-col items-start justify-center gap-6 md:pl-12">
        <h1
          className="text-2xl py-2 md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] bg-clip-text text-transparent animate-pulse-smooth"
          style={{
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {hero.heroSection.headline}
        </h1>
        <p  className="text-lg md:text-xl text-[var(--text-invert)] font-bold">
          {hero.heroSection.subheadline}
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/store" className="btn">
            {hero.buttons.explorOurMarket}
          </Link>
          <Link href="/about" className="btn">
            {hero.buttons.learnMore}
          </Link>
        </div>
      </div>
      {/* Right: SVG Illustration */}
      <div className="flex-1 flex items-center justify-center w-full h-full">
        <Image
          src="/SVG/Ecommerce web page-bro.svg"
          alt={hero.animationAlt}
          width={500}
          height={400}
          className="w-full max-w-[500px] h-auto"
          priority
        />
      </div>
      <style jsx global>{`
        @keyframes pulse-smooth {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.25); }
        }
        .animate-pulse-smooth {
          animation: pulse-smooth 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default Hero
