"use client"

import React, { useState } from 'react'
import CreatProduct from '../CreateProduct/components/CreateProduct'
import Loading from '@/app/components/Loading'
import { UseGetEntities } from '@/APIs/GetEntitiy'
import { UseDeleteEntity } from '@/APIs/DeleteEntitiy'
import VarintesCard from './VarintesCard'
import content from '@/AppContent.json'
import { FiEdit, FiTrash2, FiChevronDown, FiChevronUp, FiEye, FiEyeOff } from 'react-icons/fi'

export default function Page() {
    // ~ ############ Hooks
    const [WhoEditing, setWhoEditing] = useState('')
    const [IsOpenVars, setIsOpenVars] = useState('')
    const { data, isLoading, isFetching, isError } = UseGetEntities('products')
    const { mutate: DeletProduct, isPending } = UseDeleteEntity()
    const products = data?.data.docs
    // ~ ############ Hooks
    // ~ ############ Logic
    const HandelDelet = (id: any) => {
        DeletProduct({ id, Route: 'products' })
    }
    // ~ ############ Logic
    // ~ ############ Elementes
    return (
        <div className={`admin-page !min-h-screen px-4 py-8`}>
            {isLoading || isFetching ? (
                <div> <Loading /> </div>
            ) : isError || (products ?? []).length < 0 ? (
                <p className="admin-status-error font-semibold">{content.admin.showProducts?.error || 'حدث خطأ أثناء تحميل المنتجات'}</p>
            ) : (
                !isLoading && !isFetching && (products ?? []).length > 0 && (
                    // & {/* Products card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {products?.map((product: any, idx: any) => (
                            <div key={idx} className="relative flex flex-col bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                <div className="flex flex-col h-full">
                                    <div className="flex flex-col items-center p-4 gap-3">
                                        <span className="w-[120px] h-[160px] border-[var(--admin-card-border)] rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                                            <img src={product.images?.[1]?.secure_url || undefined} alt={product.name} className="w-full h-full object-cover rounded-md" />
                                        </span>
                                        <h2 className="text-lg font-bold text-center">{product.name}</h2>
                                        <p className="text-sm text-[var(--inactive-text)] text-center">{product.shortDesc}</p>
                                        <p className="text-xs text-[var(--admin-sidebar-text)] text-center">{product.description}</p>
                                        <div className="flex items-center justify-center gap-2 mt-2">
                                            <span className="text-[var(--color-price)] font-semibold text-lg">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            {product.discount > 0 && (
                                                <span className="text-[var(--color-discount)] text-sm line-through">
                                                    ${(product.price + product.discount).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-[var(--inactive-text)] mt-1">
                                            {content.admin.showProducts?.category || 'الفئة'}: <span className="italic">{product.name}</span>
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-xs text-[var(--inactive-text)]">
                                                {content.admin.showProducts?.variantsCount || 'عدد المتغيرات'}: <span className="italic">{product.variants?.length}</span>
                                            </p>
                                            <button
                                                className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs font-medium transition"
                                                onClick={() => { IsOpenVars === idx ? setIsOpenVars('') : setIsOpenVars(idx) }}
                                            >
                                                {IsOpenVars === idx ? <><FiEyeOff className="inline" /> {content.admin.showProducts?.hideVariants || 'إخفاء المتغيرات'}</> : <><FiEye className="inline" /> {content.admin.showProducts?.showVariants || 'عرض المتغيرات'}</>}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 px-4 pb-4 mt-auto">
                                        <button
                                            className="flex items-center gap-1 px-3 py-1.5 rounded bg-red-100 hover:bg-red-200 text-red-600 font-semibold text-sm transition"
                                            onClick={() => HandelDelet(product._id)}
                                        >
                                            <FiTrash2 className="inline" /> {content.admin.showProducts?.deleteBtn || 'حذف المنتج'}
                                        </button>
                                        <button
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded ${WhoEditing == product._id ? 'bg-gray-300 text-gray-700' : 'bg-blue-100 hover:bg-blue-200 text-blue-600'} font-semibold text-sm transition`}
                                            onClick={() => { if (WhoEditing == product._id) { setWhoEditing('') } else { setWhoEditing(product._id) } }}
                                        >
                                            <FiEdit className="inline" /> {WhoEditing == product._id ? (content.admin.showProducts?.closeEdit || 'إغلاق') : (content.admin.showProducts?.editBtn || 'تعديل المنتج')}
                                        </button>
                                    </div>
                                    <div className={`${WhoEditing == product._id ? 'block' : 'hidden'} px-4 pb-4`}>
                                        <CreatProduct existingProduct={product} />
                                    </div>
                                    <div className={`${IsOpenVars === idx ? 'block' : 'hidden'} w-full px-4 pb-4`}>
                                        <VarintesCard product={product} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    // & {/* Products card */}
                )
            )}
        </div>
    )
}
// ~ ############ Elementes
