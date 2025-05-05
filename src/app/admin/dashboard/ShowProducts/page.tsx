"use client"

import React , {useState} from 'react'
import CreatProduct from '../CreateProduct/components/CreateProduct'
import Loading from '@/app/components/Loading'
import { UseGetEntities } from '@/app/APIs/GetEntitiy'
import { UseDeleteEntity } from '@/app/APIs/DeleteEntitiy'
import VarintesCard from './VarintesCard'

export default function Page() {
// ~ ############ Hooks
    const [WhoEditing , setWhoEditing ] = useState('')
    const [IsOpenVars , setIsOpenVars ] = useState('')
    const { data , isLoading, isFetching, isError } = UseGetEntities('products')
    const { mutate: DeletProduct , isPending } = UseDeleteEntity()
    const products = data?.data.docs
// ~ ############ Hooks
// ~ ############ Logic
    const HandelDelet = (id: any ) => {
            DeletProduct({ id , Route: 'products' })
        }
// ~ ############ Logic
// ~ ############ Elementes
    return (
    <div className={`admin-page `} >
        <div className={``}>
                {isLoading || isFetching ? ( <div> <Loading/> </div> ) : isError || (products ?? []).length < 0 ?  ( <p className="text-red-400 font-semibold"> Error loading products : </p> ) : (
                  !isLoading && !isFetching && (products ?? []).length > 0 && (
                      // & {/* Products card */}
                        <div className=" flex-center flex-col gap-5">
                            {products?.map((product: any, idx : any) => (
                              <>
                                <div key={idx}  className='flex gap-5 lg:flex-row flex-col '>
                                    <div  className=" flex gap-3  bg-black/50 border border-amber-200/20 rounded-2xl min-h-[210px] min-w-[350px] overflow-hidden shadow-lg p-4 space-y-2 transition-all duration-300" >
                                        {/* start Products all deets */}
                                            <div className='h-full flex-center ' >
                                                <span className='w-[120px] h-full border-stone-700 rounded-lg overflow-hidden  '>
                                                    <img src={product.images?.[1]?.secure_url || undefined } alt={product.name} className="w-full h-40 object-cover rounded-md" />
                                                </span>
                                            </div>
                                            <div className='h-full flex flex-col justify-end '>
                                                <h2 className="text-xl font-bold">{product.name}</h2>
                                                <p className="text-sm text-gray-400">{product.shortDesc}</p>
                                                <p className="text-sm text-gray-300">{product.description}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-400 font-semibold">
                                                        ${product.price.toFixed(2)}
                                                    </span>
                                                    {product.discount > 0 && (
                                                        <span className="text-red-400 text-sm line-through">
                                                            ${(product.price + product.discount).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400">
                                                    Category: <span className="italic">{product.name}</span>
                                                </p>
                                                <div className='flex gap-3'>
                                                  <p className="text-xs text-gray-400">
                                                      It have : <span className="italic">{product.variants?.length} vars </span>
                                                  </p>
                                                  <button className='btn h-fit mt-2' onClick={() => { IsOpenVars === idx ? setIsOpenVars('') : setIsOpenVars(idx) } } >
                                                      {IsOpenVars === idx ? 'Hide Variants' : 'Show Variants'}
                                                  </button>
                                                </div>
                                            </div>
                                        {/* End Products all deets */}
                                    </div>
                                    {/* Config buttons */}
                                        <div className=' flex items-end justify-end gap-3 p-4' >
                                            <button className='btn h-fit !from-orange-950 via-amber-200/20 !to-orange-950 hover:border-[1px] hover:border-orange-400  border-transparent hover:text-orange-400 hover:!from-transparent hover:!via-transparent hover:!to-transparent ' onClick={() => HandelDelet(product._id)} >Delet Product</button>
                                            <button className='btn h-fit '  onClick={() => setWhoEditing(product._id)} >Edit Product</button>
                                        </div>
                                    {/* Config buttons */}
                                    {/* Edittor form */}
                                        <div className={`${WhoEditing == product._id ?  'block' : 'hidden'}`}>
                                            <CreatProduct existingProduct = {product} />
                                        </div>
                                    {/* Edittor form */}
                                </div>
                                <div className={` ${ IsOpenVars === idx ? ' block ' : 'hidden'} w-full `}>
                                  <VarintesCard product={product} />
                                </div>
                              </>
                            ))}
                        </div>
                  // & {/* Products card */}
                    )
                )}
        </div>
      </div>
    )
}
// ~ ############ Elementes