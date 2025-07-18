import React from 'react'
import Image from 'next/image'

const LayerMask = () => {
  return (
    <div className='w-full h-full  absolute top-0 z-[-1]'>
      <Image
        src="/SVG/Colored Patterns.svg"
        alt="App Logo"
        width={460}
        height={260}
        className="absolute top-[5%] right-[1%] rotate-180 "
        priority
      />
      <Image
        src="/SVG/Colored Patterns.svg"
        alt="App Logo"
        width={460}
        height={260}
        className="absolute top-[20%] left-[1%]"
        priority
      />
      <Image
        src="/SVG/Colored Patterns.svg"
        alt="App Logo"
        width={460}
        height={260}
        className="absolute top-[60%] left-[50%]"
        priority
      />
    </div>
  )
}

export default LayerMask