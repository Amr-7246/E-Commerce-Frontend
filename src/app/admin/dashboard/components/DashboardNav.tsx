"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const DashboardNav = () => {
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
        name: 'Show All orders',
        href: '/admin/dashboard/Orders',
        },
        {
        name: 'Show All Reviews',
        href: '/admin/dashboard/Reviews',
        }
        
    ]
return (
    <div className='bg-stone-800 md:flex p-3 text-stone-300 sticky w-[25%] border-r border-stone-600 hidden'>
        <nav className='flex gap-5 flex-wrap h-fit '>
            {options.map((option, idx) => (
                <Link className={`${curentPath == option.href ? '!text-sky-400' : 'text-stone-500'} hover:!text-stone-300 font-black font-mono duration-500 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
            ))}
        </nav>
    </div>
)
}

export default DashboardNav