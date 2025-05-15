"use client"

import { useCartContext } from '@/app/context/cart/CartContext'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import OrderCard from '../order/components/OrderCard'
import { useOrder } from '@/app/context/order/OrdersContext'

const page = () => {

  const { createOrder } = useOrder()
  const { CartProducts, setCartProducts } = useCartContext()
  const [showOrderCard, setShowOrderCard] = useState(false)

  // Remove product from cart
  const handleRemove = (index: number) => {
    setCartProducts((prev: any) => ({
      ...prev,
      products: prev.products.filter((_: any, i: number) => i !== index),
      totalQuantity: prev.totalQuantity - (prev.products[index].quantity ?? 1),
      totalPrice: prev.totalPrice - ((prev.products[index].price ?? 0) * (prev.products[index].quantity ?? 1)),
    }))
  }

  // Change quantity
  const handleQuantityChange = (index: number, qty: number) => {
    if (qty < 1) return
    setCartProducts((prev: any) => {
      const products = [...prev.products]
      const oldQty = products[index].quantity ?? 1
      products[index] = { ...products[index], quantity: qty }
      return {
        ...prev,
        products,
        totalQuantity: prev.totalQuantity - oldQty + qty,
        totalPrice: prev.totalPrice - (products[index].price * oldQty) + (products[index].price * qty),
      }
    })
  }

  // Change variant
  const handleVariantChange = (index: number, variantIdx: number) => {
    setCartProducts((prev: any) => {
      const products = [...prev.products]
      const variant = products[index].variants?.[variantIdx]
      if (variant) {
        products[index] = {
          ...products[index],
          ...variant,
          selectedVariant: variantIdx,
        }
      }
      return { ...prev, products }
    })
  }

  // Calculate total price
  const totalPrice = CartProducts.products.reduce(
    (sum: number, p: any) => sum + (p.price ?? 0) * (p.quantity ?? 1),
    0
  )

  return (
    <div className="page flex-center !justify-start flex-col gap-5">
      {CartProducts.products.length > 0 ? (
        <div className="w-[80%] flex flex-col gap-6">
          {/* Cart Header */}
          <div className="bg-black rounded-lg border border-amber-200/50 p-6 flex items-center justify-between">
            <h2 className="text-[22px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-900 to-amber-200">
              🛒 Your Cart - {CartProducts.totalQuantity} {CartProducts.totalQuantity === 1 ? 'item' : 'items'}
            </h2>
            <button
              className="btn bg-amber-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {setShowOrderCard(true) ; createOrder(CartProducts.products , '') }}
            >
              Checkout
            </button>
          </div>
          {/* Cart Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CartProducts.products.map((product: any, index: number) => {
              const selectedVariantIdx = product.selectedVariant ?? 0;
              const variant = product.variants?.[selectedVariantIdx] || {};
              return (
                <div
                  key={index}
                  className="bg-stone-900 border border-amber-100/20 rounded-2xl p-5 shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center gap-3"
                >
                  {/* Product Image */}
                  {variant.images?.[0]?.secure_url || product.images?.[0]?.secure_url ? (
                    <Image
                      src={variant.images?.[0]?.secure_url || product.images?.[0]?.secure_url}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded-lg border border-stone-700"
                      style={{ objectFit: 'cover', width: '6rem', height: '6rem' }}
                    />
                  ) : null}
                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-500 to-orange-300">
                    {product.name}
                  </h3>
                  <p className="text-amber-200/80">Price: ${variant.price ?? product.price}</p>
                  {/* Variant Selector */}
                  {product.variants && product.variants.length > 0 && (
                    <select
                      className="input"
                      value={selectedVariantIdx}
                      onChange={e => handleVariantChange(index, Number(e.target.value))}
                    >
                      {product.variants.map((v: any, vIdx: number) => (
                        <option key={vIdx} value={vIdx}>
                          {v.options?.map((opt: any) => `${opt.name}: ${opt.value}`).join(', ')}
                        </option>
                      ))}
                    </select>
                  )}
                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      className="btn px-2 py-1"
                      onClick={() => handleQuantityChange(index, (product.quantity ?? 1) - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      className="input w-12 text-center"
                      value={product.quantity ?? 1}
                      onChange={e => handleQuantityChange(index, Number(e.target.value))}
                    />
                    <button
                      className="btn px-2 py-1"
                      onClick={() => handleQuantityChange(index, (product.quantity ?? 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                  {/* Remove Button */}
                  <button
                    className="btn bg-red-600 text-white px-3 py-1 rounded mt-2"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          {/* Total Price */}
          <div className="flex justify-end mt-4">
            <span className="text-xl font-bold text-amber-200">Total: ${totalPrice.toFixed(2)}</span>
          </div>
          {/* Order Card Modal */}
          <AnimatePresence>
            {showOrderCard && (
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-stone-900 rounded-xl p-8 shadow-2xl w-full max-w-2xl relative"
                >
                  <button
                    className="absolute top-2 right-2 text-2xl text-amber-200 hover:text-orange-900"
                    onClick={() => setShowOrderCard(false)}
                  >
                    ×
                  </button>
                  {/* You can pass the cart products to OrderCard as needed */}
                  <OrderCard />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
