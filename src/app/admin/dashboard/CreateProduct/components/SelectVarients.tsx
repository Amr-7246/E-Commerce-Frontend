"use client"
import { IProduct } from '@/app/types/productsType';
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineInventory2, MdPriceChange } from 'react-icons/md';
import { BsImages } from 'react-icons/bs';
// ? ################# Types
    type VariantType = {
        options: { name: string; value: string }[];
        images: { secure_url: string; publicId: string }[];
        price: number;
        inventory: number;
    };
    type Props = {
        Variants:  VariantType;
        setVariants: React.Dispatch<React.SetStateAction< VariantType>>;
        ProductData:  IProduct ;
        setProductData: React.Dispatch<React.SetStateAction< IProduct >>;
        handleImageUpload: (e: any) => void;
    };
// ? ################# Types
const SelectVarients = ( { ProductData, setProductData , Variants, setVariants , handleImageUpload }: Props ) => {

    const [IsVarintes, setIsVarintes] = useState(false)
    const [KeyNumber, setKeyNumber] = useState(1)

    // & handle the product varintes if exist
        const HandelVarintSubmit = () => {
            setProductData((prev : any ) => ({
                ...prev, 
                variants: [...prev.variants, 
                    {
                    options: Variants.options ,
                    images: [ { secure_url: Variants.images[0].secure_url, publicId: Variants.images[0].publicId } ],
                    price: Variants.price,
                    inventory: Variants.inventory
                }
                ]
            }))
            console.log('We created the varient Amr and here is it : ' + JSON.stringify(Variants)  )
        }
    // & handle the product varintes if exist
    // & handle Multiy Options
    useEffect(() => {
        setVariants((prev: any) => {
            const newOptions = [...prev.options];
            while (newOptions.length < KeyNumber) {
                newOptions.push({ name: '', value: '' });
            }
            return { ...prev, options: newOptions };
        });
    }, [KeyNumber]);
    // & handle Multiy Options

return (
    <>
        <button className='btn' type='button' onClick={() => setIsVarintes(true)} >Add a vareint </button>
        {   IsVarintes && 
            <>
                <div  className='flex flex-col gap-3 w-[85%] p-5 bg-stone-800/50 rounded-lg border border-amber-200/50 !text-amber-200/50 mx-auto ' >
                    {
                        Array.from({ length: KeyNumber }, (_, index) => (
                            <div key={index} className='flex justify-between w-full text-amber-200/50 '>
                                <input className='input w-[40%]' type="text" placeholder='name' value={Variants.options[KeyNumber - 1 ]?.name} 
                                onChange={(e) =>
                                    setVariants((prev: any) => {
                                        const newOptions = [...prev.options];
                                        newOptions[index] = {
                                            ...newOptions[index],
                                            name: e.target.value,
                                    };
                                    return { ...prev, options: newOptions };
                                })}/>
                                <input className='input w-[40%]' type="text" placeholder='value' value={Variants.options[KeyNumber - 1 ]?.value} 
                                onChange={(e) =>
                                    setVariants((prev: any) => {
                                        const newOptions = [...prev.options];
                                        newOptions[index] = {
                                            ...newOptions[index],
                                            value: e.target.value,
                                    };
                                    return { ...prev, options: newOptions };
                                })}/>
                            </div>
                        ))
                    }
                    <button className='btn' onClick={() => setKeyNumber( KeyNumber + 1 )} >Add new Key</button>
                    <div className=''>
                        <label className="w-[70px] h-[70px] flex items-center justify-center rounded-full !bg-gradient-to-br from-amber-600 via-orange-950 to-stone-800 cursor-pointer text-white/50 shadow-lg  hover:scale-105 transition-transform">
                            <span className="text-xl bg-transparent "><FiPlus className="text-2xl font-black text-stone-900 " /></span>
                            <input  type="file"  accept="image/*"  multiple onChange={(e) => handleImageUpload( e )}   className="hidden"  />
                        </label>
                        { Variants.images[0].secure_url  && Variants.images.map((image : any , index : any ) => (
                            <div className='w-[100px] h-[100px] border border-amber-200/20 rounded-lg overflow-hidden  ' key={index} >
                                <img className='' src={image.secure_url || undefined }  />
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between w-full '>
                        <input type="number" name="price" value={Variants.price}  placeholder="Price"  onChange={(e) => setVariants( ( pre : any ) => ({...pre , price: Number(e.target.value)}))}  className="input w-[40%]" />
                        <input type="number" name="inventory" value={Variants.inventory}  placeholder="inventory" onChange={(e) => setVariants( ( pre : any ) => ({...pre , inventory: Number(e.target.value)}))}  className="input w-[40%]" />
                    </div>
                    <button  onClick={HandelVarintSubmit} type='button'  className='btn w-full'>Create the colliction</button>
                </div >
            </>
        }
    </>
)
}

export default SelectVarients