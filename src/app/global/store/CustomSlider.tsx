'use client'

import React, { use, useRef ,useState  } from 'react'
import Loading from '@/app/components/Loading'
import { useOrder } from '@/app/context/order/OrdersContext'
import { redirect } from 'next/navigation'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import { UseGetEntities } from '@/app/APIs/GetEntitiy'
import { useGlobalContext } from '@/app/context/Global/GlobalContext'
import { ICart, useCartContext } from '@/app/context/cart/CartContext'
import Image from 'next/image'

const CustomSlider = ({ title , category }: { title: string , category : string }) => {
// ~ ########## Data & Hooks
    const {setWhichCatigory} = useGlobalContext()
    const { createOrder, clearOrder } = useOrder()
    const {setCartProducts} = useCartContext()
    const [AddedToCart, setAddedToCart] = useState<string[]>([])
    const EndPoint = category == 'recommended' ? 'products?limit=6&recommended=true' : `products?category=${category}&limit=6`
    const { data , isError, isLoading } = UseGetEntities(EndPoint)
    const products = data?.data.docs
    const sliderRef = useRef<HTMLDivElement>(null)
// ~ ########## Data & Hooks
// ~ ########## Logics
    const scrollByWidth = (dir: 'left' | 'right') => {
        if (!sliderRef.current) return
        const { offsetWidth } = sliderRef.current
        sliderRef.current.scrollBy({
            left: dir === 'right' ? offsetWidth : -offsetWidth,
            behavior: 'smooth',
        })
    }
// ~ ########## Logics
    const Slider_Btn =  'absolute cursor-pointer top-1/2 -translate-y-1/2 md:bg-black/50 bg-orange-900 p-2  rounded-full text-amber-200 md:hover:text-orange-900 hover:text-black transition z-10'
    return (
    <div className=" w-full flex-center flex-col gap-3 ">
        {/* Slider Header */}
            <div className='w-full md:w-[90%] max-w-[550px] md:text-[19px] text-[17px]  flex-center gap-2'>
                <div className=' hidden md:flex md:flex-1 bg-black/50 border-amber-200/20 flex-center rounded-xl p-5 border-[1px]'>
                    <span  className="text-[18px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200/50 via-orange-900 to-amber-200/50" >{title}</span>
                </div>
                <Link onClick={() => setWhichCatigory(category) } href={'/global/store/AllProducts'}  className='md:w-fit w-[100%] cursor-pointer hover:bg-transparent duration-800 bg-black/50 border-amber-200/20 flex-center rounded-xl p-5  border-[1px]'>
                    <span  className=" font-black  text-transparent bg-clip-text bg-gradient-to-r from-amber-200/50 via-orange-900 to-amber-200/50" >Go to {title} section </span>
                </Link>
            </div>
        {/* Slider Header */}
        {/* Slider itself */}
            <div className=" flex-center w-full mx-auto p-4 relative">
                {isLoading ? ( <div className="grid col-span-3"> <Loading /> </div> ) : isError ? ( <div className="grid col-span-3"> <p className="text-orange-600 font-black text-xl"> Sorry bro, something went wrong </p> </div> ) : (
                    <>
                        <div ref={sliderRef} className="flex  rounded-xl md:w-[88%] w-[95%] overflow-x-hidden scroll-smooth snap-x snap-mandatory space-x-4 pb-6" >
                            {products?.map((product : any , idx : any ) => (
                                <div key={idx} className="snap-center flex-shrink-0 w-[280px] bg-black/50 rounded-2xl overflow-hidden shadow-lg p-4 space-y-3 hover:shadow-amber-200/20 transition-all duration-300" >
                                    {/* Product Deets */}
                                        <Image 
                                            src={ product.images?.[1]?.secure_url || product.images?.[0]?.secure_url }
                                            alt={product.name} 
                                            width={280}
                                            height={192}
                                            className="w-full h-48 object-cover rounded-lg border border-orange-900" />
                                        <h2 className="text-xl font-semibold text-amber-200"> {product.name} </h2>
                                        <p className="text-orange-900 text-sm"> {product.description} </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-400 font-bold text-base"> ${product.price.toFixed(2)} </span>
                                            {product.discount > 0 && (
                                                <span className="text-red-400 text-sm line-through">
                                                    $ {( product.price + product.discount ).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-amber-200 italic"> Category: {title} </p>
                                        <p className="text-xs text-amber-200 italic"> variants Number : {product.variants.length} </p>
                                    {/* Product Deets */}
                                    {/* Add to cart button */}
                                        <div className='flex justify-between'>
                                            <button
                                                className={` ${AddedToCart.includes(product._id) ? 'bg-orange-900/50 text-amber-200 border/50 border-amber-200/50 ' : 'bg-orange-900 text-amber-200 '} duration-700 cursor-pointer py-2 px-4 font-semibold rounded-xl hover:bg-amber-200 hover:text-orange-900 transition`}
                                                onClick={() => {
                                                    setAddedToCart((prev) => [...prev, product._id]);
                                                    setCartProducts((prev: ICart) => ({
                                                        ...prev,
                                                        products: [...prev.products, product],
                                                        totalPrice: prev.totalPrice + product.price,
                                                        totalQuantity: prev.totalQuantity + 1,
                                                    }));
                                                }}
                                            >
                                                {AddedToCart.includes(product._id) ? 'Added . . Go to cart ?' : 'Add to Cart'}
                                            </button>
                                            { !AddedToCart.includes(product._id) &&
                                                <Link 
                                                    className=" cursor-pointer py-2 px-4 text-orange-900 bg-amber-200 font-semibold rounded-xl hover:bg-orange-900 hover:text-amber-200 duration-700 transition"
                                                    href={`/global/order`} 
                                                    onClick={() => {
                                                        createOrder(product , '')
                                                    }}
                                                >
                                                    Buy Now
                                                </Link>
                                            }

                                        </div>
                                    {/* Add to cart button */}
                                </div>
                            ))}
                        </div>
                        {/* ARROW BUTTONS */}
                            <button className={`${Slider_Btn}  left-[0] md:left-[2] `} onClick={() => scrollByWidth('left')} >
                                <FaChevronLeft size={20} />
                            </button>
                            <button className={`${Slider_Btn} !right-[0] md:!right-[2] `} onClick={() => scrollByWidth('right')} >
                                <FaChevronRight size={20} />
                            </button>
                        {/* ARROW BUTTONS */}
                    </>
                )}
            </div>
        {/* Slider itself */}
    </div>
    )
}

export default CustomSlider
