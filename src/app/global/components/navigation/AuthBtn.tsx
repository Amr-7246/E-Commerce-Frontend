"use client"
import { useLogOut } from '@/app/Auth/Auth/logOut'
import { useUserInfoContext } from '@/app/Auth/context/userInfoContext'
import { AuthButton } from '@/app/Data/NavOptions'
import LanguageSwitcher from '@/tools/MultipleLangSupport/LanguageSwitcher'
import Link from 'next/link'
import React from 'react'

const AuthBtn = () => {
      const { UserInfo : user } = useUserInfoContext()
      const { mutate : logOut } = useLogOut()
  return (
    <div>
      {/* Auth Buttons */}
              {
                user == null ? 
                  <div className='flex-center flex-row gap-2'>
                  <Link href={AuthButton.logIn} className=' btn'>log In</Link>
                  <Link href={AuthButton.signIn} className='btn  hover:!via-black  hover:from-amber-300/30 hover:to-amber-300/30  from-amber-200/30 via-black to-amber-200/30 '>Sign Up</Link>
                  <LanguageSwitcher/>
                  </div> 
                : 
                  <div className='flex-center flex-row gap-2'>
                      <div className='h-[50px] w-[50px] rounded-full bg-amber-200'></div>
                      <button onClick= {() => logOut() }  className=' btn'>Sign out</button>
                      <LanguageSwitcher/>
                  </div> 
              }
        {/* Auth Buttons */}
    </div>
  )
}

export default AuthBtn



// {
//                       user == null ? 
//                       <div className='flex-center mt-10 !justify-around '>
//                           <Link onClick={() => setIsOpend(false)} href={AuthButton.logIn} className=' btn w-[40%]'>log In</Link>
//                           <Link onClick={() => setIsOpend(false)} href={AuthButton.signIn} className='btn w-[40%]  hover:!via-black  hover:from-amber-300/30 hover:to-amber-300/30  from-amber-200/30 via-black to-amber-200/30 '>Sign Up</Link>
//                       </div> 
//                       :
//                       <div className='flex-center mt-10 !justify-around '>
//                           <button onClick= {() => logOut() }   className=' btn w-[40%]'>Sign out</button>
//                       </div>
//                   }