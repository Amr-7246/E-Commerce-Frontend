"use client"

import { motion } from 'framer-motion';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import { ThemeToggle } from '../../../tools/Themes/themeToggle';
import { useLogOut } from '../../../tools/Auth/Auth/logOut';
import LanguageSwitcher from '../../../tools/MultipleLangSupport/LanguageSwitcher';
import {NavOptions,AuthButton} from '../../Data/NavOptions' 
import { useUserInfoContext } from '../../Auth/context/userInfoContext';
import AuthBtn from './AuthBtn';

const MobileNavbar = () => {
  const { mutate : logOut } = useLogOut()
      // const { mutate : DeleteUser } = useSignOut()
      const { UserInfo : user } = useUserInfoContext()
      const curentPath = usePathname()
      const navRef = useRef<HTMLDivElement>(null);
      const [IsOpend, setIsOpend] = useState(false)
  
      useEffect(() => {
          const handleResize = () => {
              const IsSmall = !!( window.innerWidth < 768 )
              if (IsOpend  && IsSmall ) {
                  document.body.style.overflow = "hidden"
              } else {
                  document.body.style.overflow = "auto"
              }
          }
          handleResize()
          window.addEventListener("resize", handleResize);
          return () => {
              window.removeEventListener("resize", handleResize);
              document.body.style.overflow = "auto"
          } 
      }, [IsOpend])

  return (
    <div>
      {/* mobile nav bar */}
        <nav ref={navRef}  className="flex-center  md:!hidden mb-[-50] !justify-between text-stone-400 h-fit w-[90%] pt-4  mx-auto ">

          <Link href={"/global/home"} >
              <img className='md:w-[60px] md:h-[60px] h-[50px] w-[50px] cursor-pointer rounded-lg border-[1px] border-amber-200 ' src="/assets/photo_2_2025-04-28_02-57-24.jpg" alt="logo" />
          </Link>
          <div className='flex flex-row gap-3'>
            <ThemeToggle/>
            <div onClick={() => {setIsOpend(true); navRef.current?.scrollIntoView({ behavior: "smooth" });}}  className="flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer">
                <span className={` ${IsOpend ? 'w-full  group-hover:w-1/2 ' : ' w-1/2 group-hover:w-full' } block  h-[1px] bg-amber-200 transition-all duration-800 ease-in-out `}></span>
                <span className="block w-full h-[1px] bg-amber-200 transition-all duration-300 ease-in-out"></span>
            </div>
          </div>

        </nav>

      {/* Sid Bar */}
        <nav className={` z-20 absolute ${IsOpend ? "translate-x-[0%]" : "translate-x-[-100%]" } left-0 top-0 md:hidden z-20 flex h-screen duration-1000 transition-all w-full `}>

            <div className=' text-stone-300 bg-stone-900 w-[70%] border-r border-stone-600 '>

                <div className='border-b flex flex-row  justify-between border-black px-5 '>
                    <div onClick={() => setIsOpend(false)}  className={`flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer`}>
                        <span className={` text-[var(--text)] text-[30px] hover:scale-125 hover:rotate-15 hover:text-[var(--second-text)] duration-700 `}><IoCloseOutline/></span>
                    </div>
                    <LanguageSwitcher/>
                </div>

                <div  className='flex flex-wrap h-fit '>
                    {NavOptions.map((option, idx) => (
                        option.name == 'Portfolio' && user == null  ?
                            <Link onClick={() => setIsOpend(false)}  className={`${curentPath == option.href ? '!text-[var(--second-text)]' : 'text-[var(--text)]'} hidden hover:!text-stone-300 font-black font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                        :   <Link onClick={() => setIsOpend(false)}  className={`${curentPath == option.href ? '!text-[var(--second-text)]' : 'text-[var(--text)]'} hover:!text-stone-300 font-black font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                    ))}
                </div>
                {/* Auth Buttons */}
                  <AuthBtn/>
                {/* Auth Buttons */}
            </div>

            {
            IsOpend &&
            <motion.div
                initial={{ opacity: 0 }}
                animate={{opacity : 0.5 }}
                transition={{
                    duration: 0.3 ,
                    delay: 0.8 ,
                    ease: "easeInOut"
                }}
                onClick={() => setIsOpend(false)} className={` h-full flex-1 bg-black   `} />
            }

        </nav>
      {/* Sid Bar */}
    {/* mobile nav bar */}
    </div>
  )
}

export default MobileNavbar