"use client"

import { useGetProducts } from '@/app/admin/api/Hooks/useGetProducts'
import Loading from '@/app/components/Loading'
import { useOrder } from '@/app/context/order/OrdersContext'
import { redirect } from 'next/navigation'
import React from 'react'

const Store = () => {
  const { createOrder , clearOrder } = useOrder();
  const { data: products, isError, isLoading } = useGetProducts(true)

  return (
    <div className="w-[80%] md:w-auto max-w-[700px] min-w-[300px] grid mx-auto grid-cols-1 md:grid-cols-3 gap-6 items-start justify-center p-4">
      { isLoading ? (
        <div className='grid col-span-3'>
          <Loading />
        </div>
      ) : isError ? (
        <div className='grid col-span-3'>
          <p className="text-orange-600 font-black text-xl">Sorry bro, something went wrong</p>
        </div>
      ) : (
        products?.map((product, index) => (
          <div
            key={index}
            className="bg-stone-800 col-span-1 w-full rounded-2xl overflow-hidden shadow-lg p-4 space-y-3 hover:shadow-orange-300/20 transition-all duration-300"
          >
          {/* Product Image */}
            <img
                src={product.images?.[1]?.secure_url || product.images?.[0]?.secure_url  }
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg border border-stone-700"
              />
          {/* Product Image */}
          {/* Product Deets */}
            <h2 className="text-xl font-semibold text-white">{product.name}</h2>
            <p className="text-gray-400 text-sm">{product.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-bold text-base">
                ${product.price.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-red-400 text-sm line-through">
                  ${(product.price + product.discount).toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 italic">Category: {product.category}</p>
          {/* Product Deets */}
          {/* Add to card bottun */}
            <button className='btn w-full ' onClick={() =>{ clearOrder() ; createOrder(product) ; redirect('/global/order') }} >add to cart</button>
          {/* Add to card bottun */}
          </div>
        )))}
    </div>
  )
}

export default Store
