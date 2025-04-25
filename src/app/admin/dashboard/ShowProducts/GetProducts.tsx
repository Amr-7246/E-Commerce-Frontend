"use client"

import React , {useState} from 'react'
import { useGetProducts } from '../../api/Hooks/useGetProducts'
import { useDeletProduct } from '../../api/Hooks/useDeletProduct'
import { useEditProducts } from '../../api/Hooks/useEditProducts'
import CreatProduct from '../CreateProduct/CreatProduct'
import { Options } from '../../style/AdminStyle'
import Loading from '@/app/components/Loading'

const GetProductes = () => {
// ~ ############ Hooks
    const [IsGet , setIsGet] = useState(true)
    const [WhoEditing , setWhoEditing ] = useState('')
    const { data: products, isLoading, isFetching, isError } = useGetProducts(IsGet)
    const { mutate: DeletProduct , isPending } = useDeletProduct()
    const { mutate: EditProduct } = useEditProducts()
// ~ ############ Hooks
// ~ ############ Logic
    // & HandelDelet
        const HandelDelet = (id: string | undefined) => {
            DeletProduct(id)
            console.log(id)
        }
    // & HandelDelet
    // & HandelEdit
    const HandelEdit = (id :string , data: any) => {
        EditProduct({id , data})
    }
    // & HandelEdit
// ~ ############ Logic
// ~ ############ Elementes
    return (
        <div className={`${Options}`}>
            {/* Products card */}
                {isLoading || isFetching ? (
                    <div>
                        <Loading/>
                    </div>
                ) : isError ? (
                    <p className="text-red-400 font-semibold"> Error loading products</p>
                ) : (
                    !isLoading && !isFetching && (products ?? []).length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products?.map((product, idx) => (
                                <>
                                    <div key={idx} className=" flex gap-3 bg-gray-800 rounded-2xl min-h-[210px] min-w-[350px] overflow-hidden shadow-lg p-4 space-y-2 transition-all duration-300" >
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
                                                    Category: <span className="italic">{product.category}</span>
                                                </p>

                                                <div className="mt-2">
                                                    {product.variants?.length > 0 && (
                                                        <div className="text-sm">
                                                            <span className="font-medium text-gray-300">Variants:</span>
                                                            <ul className="list-disc pl-5 text-gray-400">
                                                                {product.variants.map((variant : any , i : any ) => (
                                                                    <li key={i}>{variant.price}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        {/* End Products all deets */}
                                    </div>
                                    {/* Config buttons */}
                                        <div className=' flex items-end justify-end gap-3 p-4' >
                                            <button className='btn h-fit !from-rose-500 !to-orange-400 hover:border-[1px] hover:border-orange-400  border-transparent hover:text-orange-400 hover:!from-transparent hover:!to-transparent ' onClick={() => HandelDelet(product._id)} >Delet Product</button>
                                            <button className='btn h-fit '  onClick={() => setWhoEditing(product._id)} >Edit Product</button>
                                        </div>
                                    {/* Config buttons */}
                                    {/* Edittor form */}
                                        <div className={`${WhoEditing == product._id ?  'block' : 'hidden'}`}>
                                            <CreatProduct existingProduct = {product} />
                                        </div>
                                    {/* Edittor form */}
                                </>
                            ))}
                        </div>
                    )
                )}
            {/* Products card */}
        </div>
    )
}
// ~ ############ Elementes

export default GetProductes
