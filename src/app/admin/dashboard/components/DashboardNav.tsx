"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const DashboardNav = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const [IsOpend, setIsOpend] = useState(false)
    const curentPath = usePathname()
    const options = [
        {
        name: 'Show All Products',
        href: '/admin/dashboard/ShowProducts',
        },
        {
        name: 'Create New Product',
        href: '/admin/dashboard/CreateProduct',
        },
        {
        name: 'Show All Categories',
        href: '/admin/dashboard/GetAllCategorys',
        },
        {
        name: 'Create New Category',
        href: '/admin/dashboard/CreateCategory',
        },
        {
        name: 'Show All Users',
        href: '/admin/dashboard/users',
        }
        
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
        <div ref={navRef}  className='bg-stone-900  md:flex min-w-[250px] overflow-y-auto h-full text-stone-300 sticky w-[25%] border-r border-stone-600 hidden'>
            <nav className='flex flex-wrap h-fit '>
                {options.map((option, idx) => (
                    <Link className={`${curentPath == option.href ? '!text-orange-900' : 'text-stone-500'} hover:!text-stone-300 font-black font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                ))}
            </nav>
        </div>
        {/* mobile nav bar */}
        <nav  className=" md:hidden absolute overflow-hidden top-26 border border-amber-200/50 bg-orange-900/50 p-2 rounded-full h-[50px] w-[50px] left-5 ">
            <div onClick={() => {setIsOpend(true); navRef.current?.scrollIntoView({ behavior: "smooth" });}}  className=" h-full w-full flex-center group items-end flex-col gap-2 cursor-pointer">
                <span className={` ${IsOpend ? 'w-full  group-hover:w-1/2 ' : ' w-1/2 group-hover:w-full' } block  h-[1px] bg-amber-200/50 transition-all duration-800 ease-in-out `}></span>
                <span className="block w-full h-[1px] bg-amber-200/50 transition-all duration-300 ease-in-out"></span>
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

export default DashboardNav