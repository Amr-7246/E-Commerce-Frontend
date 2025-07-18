"use client"
import { motion } from 'framer-motion';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useCartContext } from '../../context/cart/CartContext';
import { useUserInfoContext } from '../../context/users/userInfoContext';
import { useLogOut } from '@/APIs/Auth/logOut';
import toast from 'react-hot-toast';
import content from '../AppContent.json'

const GlobalNav = () => {
    const { mutate : logOut } = useLogOut()
    const { UserInfo : user } = useUserInfoContext()
    const navRef = useRef<HTMLDivElement>(null);
    const {CartProducts} = useCartContext()
    const ProductsOfCart = CartProducts?.products 
    const [IsOpend, setIsOpend] = useState(false)
    const curentPath = usePathname()
    const navBar = content.navBar
    let options = [...navBar.options]

    // Hide "حسابي" if user is not logged in
    if(user == null) {
      options = options.filter(opt => opt.name !== "حسابي")
    }

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
        <nav  className='hidden md:flex !justify-between flex-center gap-3 h-fit fixed w-full px-5 py-3 bg-[var(--main)] border-b border-[var(--border)] shadow-lg' style={{boxShadow: '0 4px 24px 0 var(--shadow-color)', zIndex: 20}}>
            <div className=''>
                <Link href={"/global/home"} >
                    <img className='w-[60px] cursor-pointer h-[60px] ' src="/assets/Logo.png" alt="logo" />
                </Link>
            </div>
            <div className='flex-center lg:gap-8 gap-4 text-[var(--text-secondary)] '>
                {options.map((option, idx) => (
                    option.name === 'السلة' && ProductsOfCart.length > 0 ? 
                    <div className='flex justify-between items-center gap-2' key={idx}>
                        <Link 
                            className={`${curentPath.includes(option.fake_href) ? '!text-[var(--text-primary)]' : ''} hover:!text-[var(--text-primary)] duration-500 cursor-pointer`} key={idx} 
                            href={option.href}>
                            {option.name}
                        </Link>
                        <span className='bg-[var(--btn-I)] w-[25px] flex-center text-[11px] duration-700 h-[25px] text-[var(--text-inverted)] border border-[var(--border)] p-3 '> {ProductsOfCart.length}</span>
                    </div>
                    :
                    <Link 
                        className={`${curentPath.includes(option.fake_href) ? '!text-[var(--text-primary)]' : ''} hover:!text-[var(--text-primary)] duration-500 cursor-pointer`} key={idx} 
                        href={option.href}>
                        {option.name}
                    </Link> 
                ))}
            </div>
            {
                user == null ? 
                    <div className='flex-center gap-2'>
                    <Link href={"/global/user/logIn"} className=' btn'>{navBar.login}</Link>
                    <Link href={"/global/user/signIn"} className='btn  hover:!via-[var(--main)]  hover:from-[var(--gradient-from)] hover:to-[var(--gradient-to)]  from-[var(--gradient-from)] via-[var(--main)] to-[var(--gradient-to)] '>{navBar.signup}</Link>
                    </div> 
                :
                    <div className='flex-center gap-2'>
                        <div className='h-[50px] w-[50px] rounded-full bg-[var(--btn-I)]'></div>
                        <button onClick= {() => logOut() }  className=' btn'>{navBar.signout}</button>
                    </div> 
            }
        </nav >
    {/* Wide nav bar */}
    {/* mobile nav bar */}
        <nav ref={navRef}  className="px-2 flex-center fixed md:hidden !justify-between text-[var(--text-secondary)] h-fit w-full bg-[var(--main)] border-b  border-[var(--border)] shadow-lg" style={{boxShadow: '0 4px 24px 0 var(--shadow-color)', zIndex: 20}}>
            <Link href={"/global/home"} >
                <img className='md:w-[60px] md:h-[60px] h-[50px] w-[50px] cursor-pointer rounded-lg ' src="/assets/Logo.png" alt="logo" />
            </Link>
            <div onClick={() => {setIsOpend(true); navRef.current?.scrollIntoView({ behavior: "smooth" });}}  className="flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer">
                <span className={` ${IsOpend ? 'w-full  group-hover:w-1/2 ' : ' w-1/2 group-hover:w-full' } block  h-[1px] bg-[var(--border)] transition-all duration-800 ease-in-out `}></span>
                <span className="block w-full h-[1px] bg-[var(--border)] transition-all duration-300 ease-in-out"></span>
            </div>
        </nav>
        {/* Sid Bar */}
            <nav className={` z-20 absolute ${IsOpend ? "translate-x-[0%]" : "translate-x-[-100%]" } left-0 top-0 md:hidden z-20 flex h-screen duration-1000 transition-all w-full `}>
                <div className=' text-[var(--text-primary)] bg-[var(--main)] w-[70%] border-r border-[var(--border)] shadow-lg' style={{boxShadow: '0 4px 24px 0 var(--shadow-color)', borderRadius: 16}}>
                    <div className='border-b flex justify-end border-[var(--border)] px-5 '>
                        <div onClick={() => setIsOpend(false)}  className={`flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer`}>
                            <span className={` text-[var(--btn-I)] text-[30px] hover:scale-125 hover:rotate-15 hover:text-[var(--color-discount)] duration-700 `}><IoCloseOutline/></span>
                        </div>
                    </div>
                    <div  className='flex flex-wrap h-fit '>
                        {options.map((option, idx) => (
                            <Link onClick={() => setIsOpend(false)}  className={`${curentPath == option.href ? '!text-[var(--text-primary)]' : 'text-[var(--inactive-text)]'} hover:!text-[var(--btn-I)] font-black font-mono duration-500 py-5 px-3 w-full border-b border-[var(--border)] cursor-pointer`} key={idx} href={option.href}>{option.name}</Link>
                        ))}
                    </div>
                    {
                        user == null ? 
                        <div className='flex-center mt-10 !justify-around '>
                            <Link onClick={() => setIsOpend(false)} href={"/global/user/logIn"} className=' btn w-[40%]'>{navBar.login}</Link>
                            <Link onClick={() => setIsOpend(false)} href={"/global/user/signIn"} className='btn w-[40%]  hover:!via-[var(--main)]  hover:from-[var(--gradient-from)] hover:to-[var(--gradient-to)]  from-[var(--gradient-from)] via-[var(--main)] to-[var(--gradient-to)] '>{navBar.signup}</Link>
                        </div> 
                        :
                        <div className='flex-center mt-10 !justify-around '>
                            <button onClick= {() => logOut() }   className=' btn w-[40%]'>{navBar.signout}</button>
            </div>
                    }
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