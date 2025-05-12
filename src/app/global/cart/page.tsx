"use client"

import { useCartContext } from '@/app/context/cart/CartContext'
import React from 'react'

const page = () => {
  const { CartProducts } = useCartContext()

  return (
    <div className="page flex-center !justify-start flex-col gap-5">
      {CartProducts.products.length > 0 ? (
        <div className="w-[80%] flex flex-col gap-6">
          {/* Cart Header */}
            <div className="bg-black rounded-lg border border-amber-200/50 p-6 flex items-center justify-between">
              <h2 className="text-[22px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-900 to-amber-200">
                🛒 Your Cart - {CartProducts.totalQuantity} {CartProducts.totalQuantity === 1 ? 'item' : 'items'}
              </h2>
            </div>
          {/* Cart Header */}
          {/* Loop over products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CartProducts.products.map((product, index) => (
                <div key={index} className="bg-stone-900 border border-amber-100/20 rounded-2xl p-5 shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center gap-3" >
                  {/* Optional Image */}
                    {product.images?.[0]?.secure_url && (
                      <img
                        src={product.images[0].secure_url}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg border border-stone-700"
                      />
                    )}
                  {/* Optional Image */}
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-500 to-orange-300">{product.name}</h3>
                  <p className="text-amber-200/80"> Price: ${product.price}</p>
                </div>
              ))}
            </div>
          {/* Loop over products */}
        </div>
      ) : (
        <div className="bg-black min-h-[200px]  rounded-lg border border-amber-200/50 w-full p-5 flex-center">
          <span className="text-[20px] text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200/50 via-orange-900 to-amber-200/50">
            💤 Your cart is empty... go add some goodies!
          </span>
        </div>
      )}
    </div>
  )
}

export default page
