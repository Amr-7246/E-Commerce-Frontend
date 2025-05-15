"use client"
import React from 'react'
import { useOrder } from '@/app/context/order/OrdersContext'
import OrderCard from './components/OrderCard'
import Image from 'next/image'

export default function Page() {

// ~ ######## Hooks
    const {currentOrder} = useOrder()
    const product = currentOrder?.items?.[0]
    const price = product?.price ?? 0
    const discount = product?.discount ?? 0
// ~ ######## Hooks
// ~ ######## Elementes
return (
    <>
    <div className='page flex py-5 flex-col gap-5'>
        {/* currentOrder?.items */}
            <div className="flex flex-col md:flex-row gap-8 p-6 rounded-xl ">
                <div className="w-full md:w-1/2 rounded-xl overflow-hidden">
                    {product?.images?.map((imag , index) => (
                        <Image key={index} src={imag.secure_url || '' } alt="Product Image" width={400} height={400} className={` ${imag.secure_url == '' ? 'hidden' : 'block' } w-full object-cover rounded-xl`} style={{objectFit:'cover', width:'100%', height:'auto'}} />
                    ))}
                </div>
                <div className="flex text-amber-200/50 flex-col gap-3 w-full md:w-1/2">
                    <h2 className="text-2xl font-bold">{product?.name || 'No name'}</h2>
                    <p className="text-sm text-gray-400">{product?.shortDesc || 'No short description'}</p>
                    <p className="text-sm text-gray-300">{product?.description || 'No description'}</p>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-green-400 font-semibold text-lg">${price.toFixed(2)}</span>
                        {discount > 0 && (
                            <span className="text-red-400 text-sm line-through">
                                ${(price + discount).toFixed(2)}
                            </span>
                        )}
                    </div>
                    {/* ################ variants */}
                        <div className="mt-4  w-full flex-center flex-col gap-3 overflow-auto py-3 bg-black/50 rounded-xl ">
                            <div className=' border-b text-center pb-3 flex-center border-amber-400/10 w-full  '>
                                <h1 className=' bg-clip-text text-transparent bg-gradient-to-r from-amber-200/50 via-orange-900 to-amber-200/50 w-fit ' >
                                    All Varintes
                                </h1>
                            </div>
                            {(product?.variants ?? []).length > 0 && (
                                <div className="text-sm flex-row flex gap-2 space-y-4">
                                    {product?.variants.map((variant: any, i: number) => (
                                        <div key={i}
                                            className="border h-[250px] w-[200px] border-amber-400/10 p-4 rounded-xl text-amber-200/50 shadow-md">
                                          {/* 🏷️ Options */}
                                            <div className="mb-2">
                                                <span className="font-semibold text-orange-900 mb-4">Options:</span>
                                                <ul className=" text-sm">
                                                    {variant.options?.map((opt: any, index: number) => (
                                                    <li key={index}>
                                                        <span className='font-semibold text-green-400/50' >{opt.name}</span> : {opt.value}
                                                    </li>
                                                    ))}
                                                </ul>
                                            </div>
                                          {/* 💸 Price + 🧮 Inventory */}
                                            <p className="mb-1">
                                                <span className="font-semibold text-green-400/50">Price:</span> ${variant.price}
                                            </p>
                                            <p className="mb-2">
                                                <span className="font-semibold text-green-400/50">Inventory:</span> {variant.inventory}
                                            </p>
                                          {/* 🖼️ Images */}
                                            <div className="flex gap-2 flex-wrap">
                                                {variant.images?.map((img: any, index: number) => (
                                                    <img key={index} src={img.secure_url} 
                                                    className={` ${img.secure_url == '' ? 'hidden' : 'block' } w-14 h-14 object-cover rounded-md border border-gray-500`}/>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    {/* ################ variants */}
                </div>
                </div>
            </div>
        {/* currentOrder?.items */}
            <OrderCard/>
    </>
)
// ~ ######## Elementes
}
