"use client"
import { motion } from 'framer-motion';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

const GlobalNav = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const [IsOpend, setIsOpend] = useState(false)
    const curentPath = usePathname()
    const options = [
        {
        name: 'Home',
        href: '/global/home',
        fake_href: '/global/home',
        },
        {
        name: 'Cart',
        href: '/global/cart',
        fake_href: '/global/cart',
        },
        {
        name: 'store',
        href: '/global/store',
        fake_href: '/global/store',
        },
        {
        name: 'Admin',
        href: '/admin/dashboard/CreateProduct',
        fake_href: '/admin/dashboard/',
        },
        
    ]
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
<>
    {/* Wide nav bar */}
        <nav  className='hidden md:flex !justify-between flex-center gap-3 h-fit sticky w-[80%] pt-4 mx-auto '>
            <div className=''>
                <Link href={"/global/home"} >
                    <img className='w-[60px] cursor-pointer h-[60px] rounded-lg border-[1px] border-amber-200 ' src="/assets/photo_2_2025-04-28_02-57-24.jpg" alt="logo" />
                </Link>
            </div>
            <div className='flex-center lg:gap-8 gap-4 text-amber-200 '>
                {options.map((option, idx) => (
                    <Link className={`${curentPath.includes(option.fake_href) ? '!text-orange-900' : ''} hover:!text-orange-900 duration-500 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                ))}
            </div>
            <div className='flex-center gap-2'>
                <Link href={"/global/user/logIn"} className=' btn'>log In</Link>
                <Link href={"/global/user/signIn"} className='btn  hover:!via-black  hover:from-amber-300/30 hover:to-amber-300/30  from-amber-200/30 via-black to-amber-200/30 '>Sign In</Link>
            </div>
        </nav >
    {/* Wide nav bar */}
    {/* mobile nav bar */}
        <nav ref={navRef}  className="flex-center md:hidden mb-[-50] !justify-between text-stone-400 h-fit w-[90%] pt-4 mx-auto ">
            <Link href={"/global/home"} >
                <img className='md:w-[60px] md:h-[60px] h-[50px] w-[50px] cursor-pointer rounded-lg border-[1px] border-amber-200 ' src="/assets/photo_2_2025-04-28_02-57-24.jpg" alt="logo" />
            </Link>
            <div onClick={() => {setIsOpend(true); navRef.current?.scrollIntoView({ behavior: "smooth" });}}  className="flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer">
                <span className={` ${IsOpend ? 'w-full  group-hover:w-1/2 ' : ' w-1/2 group-hover:w-full' } block  h-[1px] bg-amber-200 transition-all duration-800 ease-in-out `}></span>
                <span className="block w-full h-[1px] bg-amber-200 transition-all duration-300 ease-in-out"></span>
            </div>
        </nav>
        {/* Sid Bar */}
            <nav className={`  absolute ${IsOpend ? "translate-x-[0%]" : "translate-x-[-100%]" } left-0 top-0 md:hidden z-20 flex h-screen duration-1000 transition-all w-full `}>
                <div className=' text-stone-300 bg-stone-900 w-[70%] border-r border-stone-600 '>
                    <div className='border-b flex justify-end border-black px-5 '>
                        <div onClick={() => setIsOpend(false)}  className={`flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer`}>
                            <span className={` text-amber-200 text-[30px] hover:scale-125 hover:rotate-15 hover:text-orange-900 duration-700 `}><IoCloseOutline/></span>
                        </div>
                    </div>
                    <div  className='flex flex-wrap h-fit '>
                        {options.map((option, idx) => (
                            <Link onClick={() => setIsOpend(false)}  className={`${curentPath == option.href ? '!text-orange-900' : 'text-stone-500'} hover:!text-stone-300 font-black font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                        ))}
                    </div>
                    <div className='flex-center mt-10 !justify-around '>
                        <Link onClick={() => setIsOpend(false)} href={"/global/user/logIn"} className=' btn w-[40%]'>log In</Link>
                        <Link onClick={() => setIsOpend(false)} href={"/global/user/signIn"} className='btn w-[40%]  hover:!via-black  hover:from-amber-300/30 hover:to-amber-300/30  from-amber-200/30 via-black to-amber-200/30 '>Sign In</Link>
                    </div>
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
</>
)
}

export default GlobalNav