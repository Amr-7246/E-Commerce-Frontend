"use client"
import Loading from '@/app/components/Loading'
import { useOrder } from '@/context/order/OrdersContext'
import { motion } from 'framer-motion'
import { redirect } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { UseGetEntities } from '@/APIs/GetEntitiy'
import { useGlobalContext } from '@/context/Global/GlobalContext'
import Link from 'next/link'

export default function Page() {
// ~ ########## Data & Hooks
    const {WhichCatigory} = useGlobalContext()
    const [IsOpend, setIsOpend] = useState(false)
    const [PageLimit, setPageLimit] = useState(10)
    const [WhoChecked, setWhoChecked] = useState([''])
    const [QueryEndPoint, setQueryEndPoint] = useState('')
    const [WhichChecked, setWhichChecked] = useState({
        price: 0 ,
        stock: false,
        sell: false,
        recommended: false,
    })
    const { createOrder , clearOrder } = useOrder();
    const { data , isError, isLoading } = UseGetEntities(`products?${QueryEndPoint}`)
    const products = data?.data.docs
    const options = [
        { id: 'price' , name: 'lowest price', },
        { id: 'price' , name: 'highest price', },
        { id: 'price' , name: 'in stock', },
        { id: 'price' , name: 'best seller', },
        { id: 'price' , name: 'Recommended', },
    ]
// ~ ########## Data & Hooks
// ~ ########## Logics
    // * filter 
        const FilterProducts = (option : any ) => {
            if(WhoChecked.includes(option.name)){
                setWhoChecked((prev) => prev.filter((item) => item !== option.name ))
            } else {
                setWhoChecked((prev) => [...prev , option.name])
            }
            setWhichChecked((prev) => ({
                ...prev,
                [option.id]: 100 ,
            }))
        }
        useEffect(() => {
            if(WhichCatigory == 'recommended') {
                setQueryEndPoint(`recommended=true`)
            }else{
                const query = new URLSearchParams();
                query.append("category", WhichCatigory || '');
                if (WhichChecked.price) {
                    query.append("price[gte]", WhichChecked.price.toString());
                    setQueryEndPoint(query.toString())
                } else {
                    setQueryEndPoint(`category=${WhichCatigory}&limit=${PageLimit}`)
                }
                // if (WhichChecked.price?.lte) query.append("price[lte]", WhichChecked.price.lte.toString());
                // if (WhichChecked.brand) query.append("brand", WhichChecked.brand);
                // if (WhichChecked.color) query.append("color", WhichChecked.color);
                // if (WhichChecked.sort) query.append("sort", WhichChecked.sort);
            }
        }, [WhichChecked , WhichCatigory ])
    // * filter 
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
// ~ ########## Logics
return (
    <div className=" w-full p-10 ">
        { isLoading ? ( <div className='grid col-span-3'> <Loading /> </div> ) : isError ? ( <div className='grid col-span-3'> <p className="text-orange-600 font-black text-xl">Sorry bro, something went wrong</p> </div> ) : (
            <div className=' lg:flex lg:flex-row-reverse lg:relative lg:gap-5 lg:w-full max-w-[1200px] mx-auto lg:h-fit'>
                {/* All products */}
                    <div className=' flex-center md:!items-start lg:h-[75vh] lg:!items-start lg:!justify-start lg:overflow-y-auto lg:flex-1 flex-col gap-3 '>
                        <button onClick={() => setIsOpend(true)} className='btn w-[80%] md:w-[100px] lg:hidden'>Filter</button>
                        <div className='w-[80%] md:w-auto max-w-[900px] min-w-[300px] grid mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 items-start justify-center p-4'>
                            {products?.map((product : any , index : any ) => (
                                <div key={index} className="bg-[var(--main)] h-[450px] align-between justify-between flex flex-col gap-3 col-span-1 w-full rounded-2xl overflow-hidden shadow-lg p-4 space-y-3 hover:shadow-[var(--btn-I)]/20 transition-all duration-300" >
                                        <div className=' w-full flex-col gap-3 flex'>
                                            <img src={product.images?.[1]?.secure_url || product.images?.[0]?.secure_url  } alt={product.name} className="w-full h-48 object-cover rounded-lg border border-[var(--border)]" />
                                            <h2 className="text-xl font-semibold text-[var(--text-secondary)]">{product.name}</h2>
                                            <p className="text-[var(--text-primary)] text-sm">{product.description}</p>
                                            <div className="flex items-center gap-2">
                                            <span className="text-[var(--color-price)] font-bold text-base"> ${product.price.toFixed(2)} </span>
                                            {product.discount > 0 && (
                                                <span className="text-[var(--color-discount)] text-sm line-through">
                                                    ${(product.price + product.discount).toFixed(2)}
                                                </span>
                                            )}
                                            </div>
                                            <p className="text-xs text-[var(--text-secondary)] italic"> variants Number : {product.variants.length} </p>
                                        </div>
                                        <div className=' w-full flex-center'>
                                            <Link href='/global/order'  className='btn !w-full ' onClick={() =>{ clearOrder() ; createOrder(product ,  '' ) }} >Buy Now</Link>
                                        </div>
                                    </div>
                            ))}
                        </div>
                    </div>
                {/* All products */}
                {/* Sid Bar filter */}
                    <nav className={` lg:overflow-hidden lg:max-w-[280px] mt-5 lg:h-[73vh] lg:overflow-y-auto lg:flex-1 lg:relative lg:translate-x-[0%] lg:rounded-lg lg:border-[1px] lg:border-amber-200/20 absolute ${IsOpend ? "translate-x-[0%]" : "translate-x-[-100%]" } left-0 top-0  z-20 flex h-screen duration-1000 transition-all w-full `}>
                        <div className=' text-stone-300 bg-stone-900 w-[60%] lg:w-full lg:border-none border-r border-stone-600 '>
                            <div className='border-b flex justify-end border-black px-5 lg:hidden '>
                                <div onClick={() => setIsOpend(false)}  className={`flex-center group items-end flex-col w-[60px] h-[60px] gap-2 cursor-pointer`}>
                                    <span className={` text-amber-200 text-[30px] hover:scale-125 hover:rotate-15 hover:text-orange-900 duration-700 `}><IoCloseOutline/></span>
                                </div>
                            </div>
                            <div  className='flex flex-col h-fit '>
                                {options.map((option, idx) => (
                                    <div onClick={() => FilterProducts(option)}
                                    className={`flex-center justify-between text-stone-500 hover:!text-stone-300 font-black font-mono duration-500 py-5 px-3 border-b border-stone-600 cursor-pointer `}>
                                        <span  className={``} key={idx} >{option.name}</span>
                                        <span >{WhoChecked.includes(option.name) ?  <IoMdCheckboxOutline/> : <MdCheckBoxOutlineBlank/> }</span>
                                    </div>
                                ))}
                            </div>
                            <div className='flex-center mt-10 !justify-around '>
                                <button onClick={() => setIsOpend(false)}  className=' btn w-[40%]'>Applay</button>
                                <button onClick={() => setWhoChecked([]) }  className='btn w-[40%]  hover:!via-black  hover:from-amber-300/30 hover:to-amber-300/30  from-amber-200/30 via-black to-amber-200/30 '>Clear</button>
                            </div>
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
                            onClick={() => setIsOpend(false)} className={` h-full flex-1 bg-black lg:hidden `} />
                        }
                    </nav>
            {/* Sid Bar filter */}
        </div>
        )}
    </div>
)
}

