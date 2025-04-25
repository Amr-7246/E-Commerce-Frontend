"use client"
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
    <div className=' flex flex-center gap-3 p-3 text-stone-400 h-fit sticky w-[80%] mx-auto  rounded-lg max-w-[700px]'>
        <nav className=' flex-center gap-5  '>
            {options.map((option, idx) => (
                <Link className={`${curentPath == option.href ? '!text-sky-400' : ''} hover:!text-stone-300 duration-500 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
            ))}
            <Link href={"/global/user"} className='btn'>login</Link>
        </nav>
    </div>
)
}

export default GlobalNav