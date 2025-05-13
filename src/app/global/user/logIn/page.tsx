"use client"
import React, { useState } from 'react';
import { useLogIn } from '../Auth/logIn';
import toast from 'react-hot-toast';

export interface Iuse {
  email : string , 
  password : string , 
}

export default function Page() {
    const { mutate: logIn , isError } = useLogIn()
    const [UserData, setUserData] = useState<Iuse> ({
      email: '' ,
      password: '' 
    })
    
    const HandelSubmit = () => {
      if (!UserData.email || !UserData.password) {
      return toast.error("Please enter both email and password");
    }
      logIn(UserData) // ~ the most important F
      setUserData({
        email: '' ,
        password: '' 
      })
    }
    return (
<div  className="page">
      <div className="text-orange-900 p-8 rounded-lg w-full max-w-[700px] flex-center flex-col bg-gradient-to-r from-black/50 via-amber-200/20 to-black/50">
        <h2 className="text-3xl font-bold text-center mb-8 text-[35px]  text-transparent bg-clip-text bg-gradient-to-r from-amber-200/50 via-orange-950 to-amber-200/50 "> Log In</h2>
        <div className="space-y-4">
          {/* email */}
            <div>
              <label className="block mb-1">Email</label>
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
              <label className="block  mb-1">Password</label>
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
            <button className={`btn text-amber-200/50 hover:!text-amber-300/50 !border-transparent !from-stone-950 !via-orange-950 !to-stone-950 w-full `}  onClick={HandelSubmit} >
              { isError ? " loading..." : "log in "}  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

