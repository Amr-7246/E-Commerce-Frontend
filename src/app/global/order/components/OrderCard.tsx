// import React from 'react'

// const OrderCard = ({product , customer , seller , status} : any ) => {
//     const imageUrl = product?.images?.[0]?.secure_url ?? '/fallback.png'
//     const price = product?.price ?? 0
//     const discount = product?.discount ?? 0
// return (
//     <div>
//         {/* Order inputs card */}
//         < div className=" p-3 flex flex-col mb-10 gap-4 w-[90%] md:w-[90%] mx-auto rounded-lg border border-amber-500/20 bg-stone-800/50 ">
//                 <div className="flex flex-col md:flex-row gap-6 items-center">
//                 {product?.images?.map((imag : any , index : any ) => (
//                     <img key={index} src={imag.secure_url || '' }  alt="Product" className={`  ${imag.secure_url == '' ? 'hidden' : 'block' } w-[150px] h-[150px] object-cover rounded-lg `} />
//                 ))}
//                     <div className="flex flex-col text-white gap-1">
//                         <h2 className="text-xl font-bold">{product?.name || 'No name 🫠'}</h2>
//                         <p className="text-sm text-gray-300">{product?.shortDesc || 'No description'}</p>
//                         <div className="flex items-center gap-2 mt-1">
//                             <span className="text-green-300 font-semibold">${price.toFixed(2) || '' }</span>
//                             {discount > 0 && (
//                                 <span className="text-red-400 line-through text-sm">
//                                     $ {(price + discount).toFixed(2) || '' }
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className='bg-stone-900 rounded-lg border-stone-600 p-5 flex-center flex-col gap-5' >
//                     <input
//                         className="input"
//                         type="text"
//                         placeholder="Customer Name"
//                         value={customer}
//                         onChange={(e) => setCustomer(e.target.value)}
//                     />
//                     <input
//                         className="input"
//                         type="text"
//                         placeholder="Seller Name"
//                         value={seller}
//                         onChange={(e) => setSeller(e.target.value)}
//                     />
//                     <input
//                         className="input"
//                         type="number"
//                         placeholder="Total Amount"
//                         value={orderCtx?.currentOrder?.totalAmount || 0}
//                         disabled
//                     />
//                     <input
//                         className="input"
//                         type="text"
//                         placeholder="Order Status"
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                     />
//                 </div>
//                 <button onClick={() => makeOrder(currentOrder)}  className='btn w-full'>Make Order</button>
//             </div>
//         {/* Order inputs card */}
//     </div>
//   )
// }

// export default OrderCard