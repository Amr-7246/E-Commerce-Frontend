"use client"
import { UseCreateEntitiy } from '@/app/APIs/CreateEntitiy'
import { useOrder } from '@/app/context/order/OrdersContext'
import { IOrder } from '@/app/context/order/OrdersContextType'
import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'

const OrderCard = () => {
// ~ ######## Hooks
    const {mutate : makeOrder , isError } = UseCreateEntitiy()
    const {currentOrder , setCurrentOrder , createOrder } = useOrder()
    const product = currentOrder?.items?.[0]
    const price = product?.price ?? 0
    const discount = product?.discount ?? 0
// ~ ######## Hooks
// ~ ######## Logics
    // * Make an order 
      const handelCustomerData = ( e: React.ChangeEvent<HTMLInputElement>, field: keyof IOrder["customer"] ) => {
        if (!setCurrentOrder) return;
        const value = field === "phone" ? Number(e.target.value) : e.target.value;
        setCurrentOrder( (prev) =>
          prev ? { ...prev, customer: { ...prev.customer, [field]: value } } : prev
        );
    };
      const handelMakeAnOrder = () => {
        console.log(currentOrder || 'There is no orders Amr')
        makeOrder({ Data: currentOrder , Route:  'orders' })
        if(isError){
          toast.error('There is some thing wrong . . try again ')
        }else{
          toast.success('Order created successfully . . Our admin will contact you later')
          createOrder
        }
      }
    // * Make an order 
// ~ ######## Logics
return (
    < div className=" p-3 flex flex-col mb-10 gap-4 w-[90%] md:w-[90%] mx-auto rounded-lg border border-amber-500/20 bg-stone-800/50 ">
        <div className="flex flex-col md:flex-row gap-6 items-center">
        {product?.images?.map((imag : any , index : any) => (
            <Image key={index} src={imag.secure_url || '' }  alt="Product" width={150} height={150} className={`  ${imag.secure_url == '' ? 'hidden' : 'block' } w-[150px] h-[150px] object-cover rounded-lg `} style={{objectFit:'cover', width:'150px', height:'150px'}} />
        ))}
            <div className="flex flex-col text-white gap-1">
                <h2 className="text-xl font-bold">{product?.name || 'No name 🫠'}</h2>
                <p className="text-sm text-gray-300">{product?.shortDesc || 'No description'}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-green-300 font-semibold">${price.toFixed(2) || '' }</span>
                    {discount > 0 && (
                        <span className="text-red-400 line-through text-sm">
                            $ {(price + discount).toFixed(2) || '' }
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div className='bg-stone-900 rounded-lg border-stone-600 p-5 flex-center flex-col gap-5'>
          <input className="input" type="text" placeholder="Customer Name" value={currentOrder?.customer?.name || ""}
                      onChange={(e) => handelCustomerData(e , 'name')}
          />
          <input className="input" type="email" placeholder="Customer Email" value={currentOrder?.customer?.email || ""}
                      onChange={(e) => handelCustomerData(e, 'email')}
          />
          <input className="input" type="number" placeholder="Phone Number" value={currentOrder?.customer?.phone || ""}
                      onChange={(e) => handelCustomerData(e, 'phone')}
          />
          <input className="input" type="text" placeholder="Address" value={currentOrder?.customer?.address || ""}
                      onChange={(e) => handelCustomerData(e, 'address')}
          />
        </div>
        <button
            onClick={handelMakeAnOrder}  
            className='btn w-full'
        >
            Make An Order
        </button>
    </div>
  )
}

export default OrderCard