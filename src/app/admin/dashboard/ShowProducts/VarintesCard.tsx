import React from 'react'
import Image from 'next/image'
import { FiTag, FiBox, FiImage } from 'react-icons/fi'

const VarintesCard = ({product} : any) => {
return (
    <div className="w-full">
        {product.variants?.length > 0 && (
            <div className="flex flex-row gap-4 overflow-auto p-4 admin-card bg-[var(--admin-card-bg)]">
                {product.variants.map((variant: any, i: number) => (
                    <div key={i} className="min-w-[230px] min-h-[250px] flex flex-col gap-2 admin-card bg-[var(--admin-card-bg)] text-[var(--admin-highlight)] border border-[var(--admin-card-border)] shadow-md hover:shadow-lg transition-shadow duration-300">
                        {/* 🏷️ Options */}
                        <div className="mb-2">
                            <span className="font-semibold text-[var(--admin-sidebar-active)] flex items-center gap-1"><FiTag /> Options</span>
                            <ul className="list-disc ml-5 text-sm">
                                {variant.options?.map((opt: any, index: number) => (
                                    <li key={index}>
                                        {opt.name} : {opt.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* 💸 Price + 🧮 Inventory */}
                        <p className="mb-1 flex items-center gap-1">
                            <span className="font-semibold text-[var(--color-price)] flex items-center gap-1"><FiTag /> Price:</span> ${variant.price}
                        </p>
                        <p className="mb-2 flex items-center gap-1">
                            <span className="font-semibold text-[var(--admin-highlight)] flex items-center gap-1"><FiBox /> Inventory:</span> {variant.inventory}
                        </p>
                        {/* 🖼️ Images */}
                        <div className="flex gap-2 flex-wrap items-center">
                            {variant.images?.length > 0 ? variant.images.map((img: any, index: number) => (
                                <span key={index} className="relative">
                                    <FiImage className="absolute left-1 top-1 text-[var(--admin-sidebar-active)] z-10" />
                                    <Image
                                        src={img.secure_url}
                                        alt="Variant Img"
                                        width={56}
                                        height={56}
                                        className="w-14 h-14 object-cover rounded-md border border-[var(--admin-card-border)] relative z-20"
                                        style={{objectFit:'cover', width:'3.5rem', height:'3.5rem'}}
                                    />
                                </span>
                            )) : <span className="text-xs text-[var(--inactive-text)]">No images</span>}
                        </div>
                    </div>  
                ))} 
            </div>
        )}
    </div>
)
}

export default VarintesCard