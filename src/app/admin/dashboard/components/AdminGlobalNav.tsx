"use client"
import GlobalNavBar from '@/app/components/GlobalNavBar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const GlobalNav = () => {
    const curentPath = usePathname()
    const options = [
        {
        name: 'Home',
        href: '/',
        },
        {
        name: 'Cart',
        href: '/global/cart',
        },
        {
        name: 'store',
        href: '/global/store',
        },
        {
        name: 'Admin',
        href: '/admin',
        },
        
    ]
return (
    <div className='bg-stone-900 flex flex-center gap-3 p-3 text-stone-300 h-fit sticky w-full  border-b border-stone-600 '>
        <GlobalNavBar/>
    </div>
        // <div className='bg-stone-900 flex flex-center gap-3 p-3 text-stone-300 h-fit sticky w-full  border-b border-stone-600 '>
    //     <nav className=' flex gap-5 '>
    //         {options.map((option, idx) => (
    //             <Link className={`${curentPath == option.href ? '!text-sky-400' : 'text-stone-400 '}  hover:!text-stone-200 duration-500 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
    //         ))}
    //     </nav>
    // </div>
)
}

export default GlobalNav