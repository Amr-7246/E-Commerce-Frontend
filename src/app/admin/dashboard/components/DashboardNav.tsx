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
return (
    <div className='bg-stone-900 md:flex min-w-[250px] overflow-y-auto h-full text-stone-300 sticky w-[25%] border-r border-stone-600 hidden'>
        <nav className='flex flex-wrap h-fit '>
            {options.map((option, idx) => (
                <Link className={`${curentPath == option.href ? '!text-orange-900' : 'text-stone-500'} hover:!text-stone-300 font-black font-mono duration-500 py-5 px-3 w-full border-b border-stone-600 cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
            ))}
        </nav>
    </div>
)
}

export default DashboardNav