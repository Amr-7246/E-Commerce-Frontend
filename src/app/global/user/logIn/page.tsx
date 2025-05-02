"use client"
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { useLogIn } from '../api/logIn';
import Link from 'next/link';

export interface Iuse {
  email : string , 
  password : string , 
}

export default function Page() {
    const { mutate : LogIn } = useLogIn()
    const [UserData, setUserData] = useState<Iuse> ({
      email: '' ,
      password: '' 
    })
    
    const HandelSubmit = () => {
    if ( UserData.email.length < 4 || UserData.password.length < 4  ) return
  
      LogIn(UserData.email , UserData.password ) // ~ the most important F
      setUserData({
        email: '' ,
        password: '' 
      })
      // redirect("/global/home")
    }
    return (
<div  className="page">
      <div className="bg-gradient-to-r from-black via-amber-200/30 to-black text-stone-400  border border-stone-700 p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-stone-800 mb-6"> Log In</h2>
        <div className="space-y-4">
          {/* email */}
            <div>
              <label className="block text-stone-800 mb-1">Email</label>
              <input
                value={UserData.email}
                onChange={(e) => setUserData((prev) => ({ ...prev , email : e.target.value}))}
                type="email"
                placeholder="you@email.com"
                className="input"
              />
            </div>
          {/* email */}
          {/* password */}
            <div>
              <label className="block text-stone-700 mb-1">Password</label>
              <input
                value={UserData.password}
                onChange={(e) => setUserData((prev) => ({ ...prev , password : e.target.value}))}
                type="password"
                placeholder="••••••••"
                className="input"
              />
            </div>
          {/* password */}
          <div className='w-full flex-center gap-5'>
            <button className="btn"  onClick={HandelSubmit} >log in</button>
            <Link href={'/global/user/portfolio'} className="btn"> go to portfolio </Link>
          </div>
          {/* <Link href={'/global/home'}  className=" w-full font-black btn text-stone-800">
            Log In
          </Link> */}
        </div>
      </div>
    </div>
  );
};

