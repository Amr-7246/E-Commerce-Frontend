"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { AiFillHome } from 'react-icons/ai'
import { FiShoppingCart, FiShoppingBag } from 'react-icons/fi'
import { MdDashboard, MdAddBox, MdCategory } from 'react-icons/md'
import { BsBoxSeam } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import content from '@/AppContent.json'

const iconMap: { [key: string]: React.ReactNode } = {
    'الرئيسية': <AiFillHome className="inline mr-2 text-lg" />,
    'السلة': <FiShoppingCart className="inline mr-2 text-lg" />,
    'المتجر': <FiShoppingBag className="inline mr-2 text-lg" />,
    'لوحة التحكم': <MdDashboard className="inline mr-2 text-lg" />,
    'عرض كل المنتجات': <BsBoxSeam className="inline mr-2 text-lg" />,
    'إضافة منتج جديد': <MdAddBox className="inline mr-2 text-lg" />,
    'عرض كل الفئات': <BiCategory className="inline mr-2 text-lg" />,
    'إضافة فئة جديدة': <MdCategory className="inline mr-2 text-lg" />,
    'عرض كل المستخدمين': <FaUsers className="inline mr-2 text-lg" />
}

const DashboardNav = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const [IsOpend, setIsOpend] = useState(false)
    const curentPath = usePathname()
    const navBar = content.navBar
    const admin = content.admin
    // Combine navBar options (excluding Auth) and admin dashboard options
    let mainOptions = [...navBar.options].filter(opt => ![navBar.login, navBar.signup, navBar.signout, "حسابي"].includes(opt.name))
    // Add fake_href fallback for navBar options
    mainOptions = mainOptions.map(opt => ({...opt, fake_href: opt.fake_href || opt.href}))
    const adminOptions = [
        {
            name: admin.sidebar.showAllProducts,
            href: '/admin/dashboard/ShowProducts',
        },
        {
            name: admin.sidebar.createNewProduct,
            href: '/admin/dashboard/CreateProduct',
        },
        {
            name: admin.sidebar.showAllCategories,
            href: '/admin/dashboard/GetAllCategorys',
        },
        {
            name: admin.sidebar.createNewCategory,
            href: '/admin/dashboard/CreateCategory',
        },
        {
            name: admin.sidebar.showAllUsers,
            href: '/admin/dashboard/users',
        }
    ]
    const options = [
        ...mainOptions,
        ...adminOptions
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
        <div ref={navRef}  className='admin-sidebar !bg-black md:flex !flex-col min-w-[250px] overflow-y-auto h-[100%] sticky w-[25%] hidden'>
            <div className='flex flex-col border-b border-white h-fit items-end '>
                <Link href="/global/home">
                    <img className='w-[60px] h-[60px] cursor-pointer' src="/assets/Logo.png" alt="logo" />
                </Link>
            </div>
            <nav className='flex flex-col flex-wrap h-fit '>
                {options.map((option, idx) => (
                    <Link className={` flex flex-row gap-3 border-b border-white hover:text-teal-400 font-bold px-4 py-4 transition-colors duration-300 ${curentPath == option.href ? 'admin-sidebar-link-active !text-teal-400' : ''}`} key={idx} href={option.href}>
                        <span >{iconMap[option.name] || null}</span>{option.name}
                    </Link>
                ))}
            </nav>
        </div>
        {/* mobile nav bar */}
        <nav  className="z-2 md:hidden absolute overflow-hidden top-26 border border-[var(--admin-highlight)] bg-[var(--admin-sidebar-active)]/50 p-2 rounded-full h-[50px] w-[50px] left-5 ">
            <div onClick={() => {setIsOpend(true); navRef.current?.scrollIntoView({ behavior: "smooth" });}}  className=" h-full w-full flex-center group items-end flex-col gap-2 cursor-pointer">
                <span className={` ${IsOpend ? 'w-full  group-hover:w-1/2 ' : ' w-1/2 group-hover:w-full' } block  h-[1px] bg-[var(--admin-highlight)]/50 transition-all duration-800 ease-in-out `}></span>
                <span className="block w-full h-[1px] bg-[var(--admin-highlight)]/50 transition-all duration-300 ease-in-out"></span>
            </div>
        </nav>
        {/* Sid Bar */}
            <nav className={`  absolute ${IsOpend ? "translate-x-[0%]" : "translate-x-[-100%]" } left-0 top-0 md:hidden z-20 flex h-screen duration-1000 transition-all w-full `}>
                <div className='admin-sidebar w-[70%] flex flex-col'>
                    <div className='flex flex-col items-center py-6'>
                        <Link href="/global/home">
                            <img className='w-[60px] h-[60px] mb-4 cursor-pointer' src="/assets/Logo.png" alt="logo" />
                        </Link>
                    </div>
                    <div className='border-b flex justify-end border-black px-5 '>
                        <div onClick={() => setIsOpend(false)}  className={`flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer`}>
                            <span className={` text-[var(--admin-highlight)] text-[30px] hover:scale-125 hover:rotate-15 hover:text-[var(--admin-sidebar-active)] duration-700 `}><IoCloseOutline/></span>
                        </div>
                    </div>
                    <div  className='flex flex-wrap h-fit '>
                        {options.map((option, idx) => (
                            <Link onClick={() => setIsOpend(false)}  className={`  flex flex-row gap-3  admin-sidebar-link ${curentPath == option.href ? 'admin-sidebar-link-active' : ''}`} key={idx} href={option.href}>
                                {iconMap[option.name] || null}{option.name}
                            </Link>
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
