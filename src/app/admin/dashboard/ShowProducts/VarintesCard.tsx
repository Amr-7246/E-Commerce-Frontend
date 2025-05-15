import React from 'react'
import Image from 'next/image'

const VarintesCard = ({product} : any) => {
return (
    <div className=" w-full  ">
        {product.variants?.length > 0 && (
            <div className="flex flex-row gap-2 overflow-auto p-4 bg-stone-900/50 rounded-xl ">
                {product.variants.map((variant: any, i: number) => (
                    <div key={i} className="border min-w-[230px] min-h-[250px] border-amber-200/20 bg-zinc-800/50 p-4 rounded-xl text-gray-200 shadow-md" >
                        {/* 🏷️ Options */}
                        <div className="mb-2">
                            <span className="font-semibold text-amber-200">Options</span>
                            <ul className="list-disc ml-5 text-sm">
                                {variant.options?.map((opt: any, index: number) => (
                                    <li key={index}>
                                        {opt.name} : {opt.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                            
                        {/* 💸 Price + 🧮 Inventory */}
                        <p className="mb-1">
                            <span className="font-semibold text-green-400">Price:</span> ${variant.price}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold text-purple-300">Inventory:</span> {variant.inventory}
                        </p>
                          {/* 🖼️ Images */}
                        <div className="flex gap-2 flex-wrap">
                            {variant.images?.map((img: any, index: number) => (
                                <Image
                                    key={index}
                                    src={img.secure_url}
                                    alt="Variant Img"
                                    width={56}
                                    height={56}
                                    className="w-14 h-14 object-cover rounded-md border border-gray-500"
                                    style={{objectFit:'cover', width:'3.5rem', height:'3.5rem'}}
                                />
                            ))}
                        </div>
                    </div>  
                ))} 
            </div>
        )}
    </div>
)
}

export default VarintesCard