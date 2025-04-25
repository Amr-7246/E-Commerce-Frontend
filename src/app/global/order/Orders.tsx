"use client"
import React, { useContext, useEffect, useState } from 'react'
import Store from '../store/Store'
import { useOrder } from '@/app/context/order/OrdersContext'
import { UseCreateOrder } from '../user/api/CreateOrder'

const Orders = () => {
// ~ ######## Hooks
    const {mutate : makeOrder} = UseCreateOrder()
    const {currentOrder} = useOrder()
    const product = currentOrder?.items?.[0]
    const imageUrl = product?.images?.[0]?.secure_url ?? '/fallback.png'
    const price = product?.price ?? 0
    const discount = product?.discount ?? 0
// ~ ######## Hooks
// ~ ######## Logics
    const orderCtx = useOrder() ;

    const [customer, setCustomer] = useState("");
    const [seller, setSeller] = useState("");
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        if (orderCtx?.currentOrder) {
            setCustomer(orderCtx.currentOrder.customer);
            setSeller(orderCtx.currentOrder.seller);
            setStatus(orderCtx.currentOrder.status);
        }
    }, [orderCtx?.currentOrder]);

//   const handleInputChange = () => {
//     // Optional: if you want to sync user input live into context
//     orderCtx?.setCurrentOrder?.((prev) => ({
//       ...prev!,
//       customer,
//       seller,
//       status,
//     }));
//   };
// ~ ######## Logics
// ~ ######## Elementes
return (
    <div className='flex-center flex-col gap-5'>
        {/* currentOrder?.items */}
            <div className="flex flex-col md:flex-row gap-8 items-center p-6 rounded-xl ">
                <div className="w-full md:w-1/2 rounded-xl overflow-hidden">
                {product?.images?.map((imag , index) => (
                    <img key={index} src={imag.secure_url || '' } alt="Product Image" className="w-full object-cover rounded-xl" />
                ))}
                </div>
                <div className="flex flex-col gap-3 w-full md:w-1/2">
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
                </div>
            </div>
        {/* currentOrder?.items */}
        {/* Order inputs card */}
            < div className=" p-3 flex flex-col gap-4 w-full md:w-[70%] mx-auto rounded-lg border border-stone-600 bg-stone-500 ">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                {product?.images?.map((imag , index) => (
                    <img key={index} src={imag.secure_url || '' }  alt="Product" className="w-[150px] h-[150px] object-cover rounded-lg" />
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
                <div className='bg-stone-900 rounded-lg border-stone-600 p-5 flex-center flex-col gap-5' >
                    <input
                        className="input"
                        type="text"
                        placeholder="Customer Name"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        // onBlur={handleInputChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Seller Name"
                        value={seller}
                        onChange={(e) => setSeller(e.target.value)}
                        // onBlur={handleInputChange}
                    />
                    <input
                        className="input"
                        type="number"
                        placeholder="Total Amount"
                        value={orderCtx?.currentOrder?.totalAmount || 0}
                        disabled
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Order Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        // onBlur={handleInputChange}
                    />
                </div>
                <button onClick={() => makeOrder(currentOrder)}  className='btn w-full'>Make Order</button>
            </div>
        {/* Order inputs card */}
        {/* cards */}
            <div>
                <Store/>
            </div>
        {/* cards */}
    </div>
)
// ~ ######## Elementes
}

export default Orders