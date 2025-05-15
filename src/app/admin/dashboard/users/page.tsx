"use client"
import React from 'react'
import Loading from '@/app/components/Loading'
import { useSignOut } from '@/app/global/user/Auth/signOut'
import { UseGetEntities } from '@/app/APIs/GetEntitiy'
import { UseDeleteEntity } from '@/app/APIs/DeleteEntitiy'
import Image from 'next/image'

export default function Page() {
    const {data , isLoading , isError } = UseGetEntities('user')
    const { mutate: DeletProduct , isPending } = UseDeleteEntity()
    const users = data?.data.docs
    const {mutate : deleteUser} = useSignOut()

return (
    <div className={` admin-page `} >
            {/* users card */}
                {isLoading ? (
                    <div>
                        <Loading/>
                    </div>
                ) : isError || (users ?? []).length < 0 ?  (
                    <p className="text-red-400 font-semibold"> Error loading users</p>
                ) : (
                    !isLoading && (users ?? []).length > 0 && (
                        <div className=" flex-center flex-col w-[90%] mx-auto gap-10">
                            {users?.map((user: any, idx : any) => (
                                <div className=' lg:flex-row flex-col w-full flex gap-5 '>
                                    <div key={idx} className=" flex gap-3 flex-1 bg-black/50 border border-orange-950 rounded-2xl min-h-[210px] overflow-hidden shadow-lg p-4 space-y-2 transition-all duration-300" >
                                        {/* start users all deets */}
                                            <div className='h-full text-stone-400 flex-center ' >
                                                <span className='w-[120px] h-full border-stone-700 rounded-lg overflow-hidden  '>
                                                    <Image src={user.images?.[1]?.secure_url || undefined } alt={user.name} width={160} height={160} className="w-full h-40 object-cover rounded-md" style={{objectFit:'cover', width:'100%', height:'10rem'}} />
                                                </span>
                                            </div>
                                            <div className='h-full flex flex-col justify-end  text-stone-400 '>
                                                <h2 className="text-xl font-bold">name : {user.name}</h2>
                                                <p className="text-sm text-gray-400">email : {user.email}</p>
                                                <p className="text-sm text-gray-300">password : {user.password}</p>
                                                <h2 className="text-xl font-bold">Id : {user._id}</h2>
                                            </div>
                                        {/* End users all deets */}
                                    </div>
                                    {/* Config buttons */}
                                        <div className=' flex items-end flex-1 lg:justify-end justify-between gap-3 ' >
                                            <button className='btn h-fit w-full shadow-lg shadow-orange-950/50 !text-amber-300/50 !from-stone-950 via-orange-950 !to-stone-950 hover:border-[1px] hover:border-orange-400  border-transparent hover:text-orange-400 hover:!from-transparent hover:!via-transparent hover:!to-transparent ' onClick={() => DeletProduct({ id : user._id , Route : 'user'} )} >Delet user</button>
                                            <button className='btn h-fit w-full '  >Edit user</button>
                                        </div>
                                    {/* Config buttons */}
                                </div>
                            ))}
                        </div>
                    )
                )}
            {/* users card */}
    </div>
)
}
