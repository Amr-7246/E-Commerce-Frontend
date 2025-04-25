"use client"
import React, { useState } from 'react';
import { useCreateUser } from '../api/CreateUser';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export interface Iuse {
  name : string  , 
  email : string , 
  password : string , 
}

const LogIn = () => {
  const { mutate : creatUser } = useCreateUser()
  const [UserData, setUserData] = useState<Iuse> ({
    name: '' ,
    email: '' ,
    password: '' 
  })
  
  const HandelSubmit = () =>{
    // if (UserData.name.length < 2 || UserData.email.length < 4 || UserData.password.length < 4  ) return

    creatUser(UserData) // ~ the most important F
    setUserData({
      name: '' ,
      email: '' ,
      password: '' 
    })
    redirect("/global/home")
  }
  return (
    <form onSubmit={HandelSubmit}  className=" flex-center">
      <div className="bg-gradient-to-br from-sky-400 to-purple-400 border border-stone-700 p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-stone-800 mb-6"> Log In</h2>
        <div className="space-y-4">
          {/* name */}
            <div>
              <label className="block text-stone-800 mb-1">name</label>
              <input
                value={UserData.name}
                onChange={(e) => setUserData((prev) => ({ ...prev , name : e.target.value}))}
                type="name"
                placeholder="inter your name"
                className="w-full px-4 py-2 text-stone-800 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          {/* name */}
          {/* email */}
            <div>
              <label className="block text-stone-800 mb-1">Email</label>
              <input
                value={UserData.email}
                onChange={(e) => setUserData((prev) => ({ ...prev , email : e.target.value}))}
                type="email"
                placeholder="you@email.com"
                className="w-full px-4 py-2 text-stone-800 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500"
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
                className="w-full px-4 py-2 border text-stone-800 border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
          {/* password */}
          <Link href={'/global/home'}  className=" w-full font-black btn text-stone-800">
            Log In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LogIn;
