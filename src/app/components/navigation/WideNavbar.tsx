"use client"

import { NavOptions } from '@/app/Data/NavOptions'
import { ThemeToggle } from '@/tools/Themes/themeToggle'
import Link from 'next/link'
import React from 'react'
import { useUserInfoContext } from '@/app/Auth/context/userInfoContext'
import { usePathname } from 'next/navigation'
import AuthBtn from './AuthBtn'
import Image from 'next/image'

const WideNavbar = () => {
  const { UserInfo : user } = useUserInfoContext()
  const curentPath = usePathname()
  return (
    <div className={'border-b-[1px] sticky w-full z-50 border-[var(--main)] shadow-black/20 shadow-xl'}>
      {/* Wide nav bar */}
        <nav  className=' !mt-1 hidden !p-3 lg:px-[50px] rounded-md  md:!flex !justify-between gap-3 h-fit sticky w-[85%] !mx-auto '>
            {/* Logo & Theme button */}
              <div className=' flex-center flex-row gap-3 '>
                  <Link href={"/global/home"} >
                      <Image className='w-[60px] cursor-pointer h-[60px] rounded-lg ' width={200} height={200} src="/assets/E-logo-1.png" alt="logo" />
                  </Link>
                  <ThemeToggle/>
              </div>
            {/* Logo & Theme button */}
            {/* Nav Links */}
              <div className='flex-center lg:gap-8 gap-4 text-[var(--text)] '>
                  {NavOptions.map((option, idx) => (
                      option.name == 'Portfolio' && user == null  ?
                      <Link  className={` hidden ${curentPath.includes(option.fake_href) ? '!text-[var(--second-text)]' : ''} hover:!text-[var(--second-text)] duration-500 cursor-pointer`} key={idx}  href={option.href}> {option.name} </Link>
                      :
                      <Link  className={`${curentPath.includes(option.fake_href) ? '!text-[var(--second-text)]' : ''} hover:!text-[var(--second-text)] duration-500 cursor-pointer`} key={idx}  href={option.href}> {option.name} </Link>
                  ))}
              </div>
            {/* Nav Links */}
            {/* Auth Buttons */}
              <AuthBtn/>
            {/* Auth Buttons */}
        </nav >
    {/* Wide nav bar */}
    </div>
  )
}

export default WideNavbar
