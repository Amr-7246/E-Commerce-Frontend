"use client"
import React from 'react'
import { Options, OptionsPage } from '../../style/AdminStyle'
import Loading from '@/app/components/Loading'
import { useSignOut } from '@/app/global/user/api/signOut'
import { UseGetEntities } from '@/app/APIs/GetEntitiy'
import { UseDeleteEntity } from '@/app/APIs/DeleteEntitiy'

export default function Page() {
    const {data , isLoading , isError } = UseGetEntities('user')
    const { mutate: DeletProduct , isPending } = UseDeleteEntity()
    const users = data?.data.docs
    const {mutate : deleteUser} = useSignOut()

return (
    <div className={`${OptionsPage}  md:!max-h-[90vh] !h-fit `} >
    <div className={`${Options} `}>
            {/* users card */}
                {isLoading ? (
                    <div>
                        <Loading/>
                    </div>
                ) : isError || (users ?? []).length < 0 ?  (
                    <p className="text-red-400 font-semibold"> Error loading users</p>
                ) : (
                    !isLoading && (users ?? []).length > 0 && (
                        <div className=" flex-center flex-col gap-5">
                            {users?.map((user: any, idx : any) => (
                                <div className='flex gap-5  '>
                                    <div key={idx} className=" flex gap-3  bg-gradient-to-r from-black via-amber-200/30 to-black rounded-2xl min-h-[210px] min-w-[350px] overflow-hidden shadow-lg p-4 space-y-2 transition-all duration-300" >
                                        {/* start users all deets */}
                                            <div className='h-full flex-center ' >
                                                <span className='w-[120px] h-full border-stone-700 rounded-lg overflow-hidden  '>
                                                    <img src={user.images?.[1]?.secure_url || undefined } alt={user.name} className="w-full h-40 object-cover rounded-md" />
                                                </span>
                                            </div>
                                            <div className='h-full flex flex-col justify-end '>
                                                <h2 className="text-xl font-bold">name : {user.name}</h2>
                                                <p className="text-sm text-gray-400">email : {user.email}</p>
                                                <p className="text-sm text-gray-300">password : {user.password}</p>
                                            </div>
                                        {/* End users all deets */}
                                    </div>
                                    {/* Config buttons */}
                                        <div className=' flex items-end justify-end gap-3 p-4' >
                                            <button className='btn h-fit !from-orange-950 via-amber-200/20 !to-orange-950 hover:border-[1px] hover:border-orange-400  border-transparent hover:text-orange-400 hover:!from-transparent hover:!via-transparent hover:!to-transparent ' onClick={() => DeletProduct({ id : user._id , Route : 'products'} )} >Delet user</button>
                                            <button className='btn h-fit '  >Edit user</button>
                                        </div>
                                    {/* Config buttons */}
                                </div>
                            ))}
                        </div>
                    )
                )}
            {/* users card */}
        </div>
    </div>
)
}
