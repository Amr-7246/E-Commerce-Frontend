'use client'

import { UseGetEntities } from '@/APIs/GetEntitiy'
import React from 'react'
import Image from 'next/image'

export default function Page() {
    const { data : currentOrder } = UseGetEntities('orders')
    if (!currentOrder) return <p className="text-red-500">No order selected 😢</p>

    return (
        <div className='admin-page'>
            <div className="p-4 space-y-4 bg-gray-100 rounded-xl shadow-md text-gray-800">
        <h2 className="text-2xl font-bold text-blue-600">🧾 Order Details</h2>

        <div className="space-y-1">
            <p><span className="font-semibold">Customer:</span> {currentOrder.customer}</p>
            <p><span className="font-semibold">Seller:</span> {currentOrder.seller}</p>
            <p><span className="font-semibold">Status:</span> {currentOrder.status} 🔄</p>
            <p><span className="font-semibold">Payment:</span> {currentOrder.paymentStatus} 💳</p>
            <p><span className="font-semibold">Total:</span> ${currentOrder.totalAmount}</p>
        </div>

        <div className="mt-4">
            <h3 className="text-xl font-semibold text-purple-600">🛍️ Items</h3>
            <ul className="space-y-2">
                {currentOrder.items.map((item : any , idx : any ) => (
                    <li key={idx} className="p-3 bg-white rounded-md shadow">
                        <p className="font-bold text-lg text-gray-700">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                            {item.images.map((img : any  , imgIdx : any ) => (
                                <Image
                                    key={imgIdx}
                                    src={img.secure_url}
                                    alt="item image"
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover rounded-md border"
                                    style={{objectFit:'cover', width:'4rem', height:'4rem'}}
                                />
                            ))}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            <p>💰 Price: ${item.price}</p>
                            <p>🔥 Discount: {item.discount}%</p>
                            <p>📦 Category: {item.category}</p>
                        </div>

                        <div className="mt-2">
                            <h4 className="text-md font-medium text-green-600">Variants:</h4>
                            {item.variants.map((variant : any  , vIdx : any  ) => (
                                <div key={vIdx} className="ml-4 text-sm">
                                    {variant.options.map((opt : any  , oIdx : any  ) => (
                                        <p key={oIdx}>🧩 {opt.name}: {opt.value}</p>
                                    ))}
                                    <p>💸 Price: ${variant.price}</p>
                                    <p>📦 Inventory: {variant.inventory}</p>
                                    <div className="flex gap-2 mt-1">
                                        {variant.images.map((img : any  , iIdx : any  ) => (
                                        <img key={iIdx} src={img.secure_url} alt="variant image" className="w-12 h-12 rounded" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
        </div>
    );
}
