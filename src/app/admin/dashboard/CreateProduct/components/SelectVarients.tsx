"use client"
import { IProduct } from '@/types/productsType';
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineInventory2, MdPriceChange } from 'react-icons/md';
import { BsImages } from 'react-icons/bs';
import toast from 'react-hot-toast';
import content from '@/AppContent.json';
// ? ################# Types
    export type VariantType = {
        options: { name: string; value: string }[];
        images: { secure_url: string; publicId: string }[];
        price: null | number ;
        inventory: null | number;
    };
    type Props = {
        VarientImages: any
        ServerVarsError: any
        Variants:  VariantType;
        setVariants: React.Dispatch<React.SetStateAction<VariantType>>;
        ProductData:  IProduct ;
        setProductData: React.Dispatch<React.SetStateAction< IProduct >>;
        handleImageUpload: (e: any) => void;
    };
// ? ################# Types
const SelectVarients = ( { ProductData, setProductData ,ServerVarsError, Variants, setVariants , handleImageUpload , VarientImages }: Props ) => {
    const [FeildVariants, setFeildVariants] = useState<VariantType>({
        options: [{ name: '' , value: '' }],
        images : [{ secure_url: '' , publicId: '' }],
        price: null ,
        inventory: null
    })
    const [IsVarintes, setIsVarintes] = useState(false)
    const [KeyNumber, setKeyNumber] = useState(1)

    // & handle the product varintes if exist
        const HandelVarintSubmit = () => {
            if(ServerVarsError){toast.error(content.admin.createProduct.variants.errorGeneral) ; return }
            if( !FeildVariants.options[0].name || !FeildVariants.options[0].value || !FeildVariants.price || !FeildVariants.inventory ) {
                toast.error(content.admin.createProduct.variants.errorRequired)
                return
            } else {
                setProductData((prev : any ) => ({
                    ...prev,
                    variants: [...prev.variants,
                        FeildVariants
                    ]
                }))
                setFeildVariants({
                    options: [{ name: '' , value: '' }],
                    images : [{ secure_url: '' , publicId: '' }],
                    price: null ,
                    inventory: null
                })
                toast.success(content.admin.createProduct.variants.successAdd)
            }
        }
    // & handle the product varintes if exist
    // & handle Multiy Options
        useEffect(() => {
            setFeildVariants((prev: any) => {
                const newOptions = [...prev.options];
                while (newOptions.length < KeyNumber) {
                    newOptions.push({ name: '', value: '' });
                }
                return { ...prev, options: newOptions };
            });
        }, [KeyNumber]);
        useEffect(() => {
                console.log(Variants.options , KeyNumber)
                console.log(Variants , KeyNumber)
        }, [Variants])
        useEffect(() => {
            setFeildVariants((prev: VariantType) => ({
                ...prev,
                images: [ ...prev.images , VarientImages]
            }));
        }, [VarientImages])
    // & handle Multiy Options
return (
    <>
        <button className={`btn w-fit `} type='button' onClick={() => setIsVarintes(!IsVarintes)} >{IsVarintes ? content.admin.createProduct.variants.close : content.admin.createProduct.variants.open }</button>
        {   IsVarintes &&
            <>
                <div  className='flex flex-col gap-3 lg:w-full w-[85%] p-5 bg-stone-800/50 rounded-lg border border-amber-200/20 !text-amber-200/50 mx-auto ' >
                    {/* Options inputs */}
                    <div className={` max-h-[150px] ${Variants.options.length > 3 ? 'border-orange-900/20 p-3 bg-black/20' : 'border-transparent' } border flex flex-col gap-2 rounded-xl overflow-auto duration-1000 `}>
                        {FeildVariants.options.map((option , index) => (
                            <div key={index} className='flex justify-between w-full text-amber-200/50 '>
                              <input className='input w-[40%]' type="text" placeholder={content.admin.createProduct.variants.placeholders.optionName} value={option.name}
                              onChange={(e) =>
                                  setFeildVariants((prev: any) => {
                                      const newOptions = [...prev.options];
                                      newOptions[index] = {
                                          ...newOptions[index],
                                          name: e.target.value,
                                  };
                                  return { ...prev, options: newOptions };
                              })}/>
                              <input className='input w-[40%]' type="text" placeholder={content.admin.createProduct.variants.placeholders.optionValue} value={option.value}
                              onChange={(e) =>
                                  setFeildVariants((prev: any) => {
                                      const newOptions = [...prev.options];
                                      newOptions[index] = {
                                          ...newOptions[index],
                                          value: e.target.value,
                                  };
                                  return { ...prev, options: newOptions };
                              })}/>
                            </div>
                        ))}
                    </div>
                    {/* Options inputs */}
                        <div className='flex justify-between w-full '>
                            <input type="number" name="price" value={FeildVariants.price ?? ''}  placeholder={content.admin.createProduct.variants.placeholders.price}  onChange={(e) => setFeildVariants( ( pre : any ) => ({...pre , price: Number(e.target.value)}))}  className="input w-[40%]" />
                            <input type="number" name="inventory" value={FeildVariants.inventory ?? ''}  placeholder={content.admin.createProduct.variants.placeholders.inventory} onChange={(e) => setFeildVariants( ( pre : any ) => ({...pre , inventory: Number(e.target.value)}))}  className="input w-[40%]" />
                        </div>
                        <div className='flex justify-between'>
                            <button type='button'  className={`btn`} onClick={() => setKeyNumber( KeyNumber + 1 )} >{content.admin.createProduct.variants.addKey}</button>
                            <button type='button'  onClick={() => { if( FeildVariants.options.length > 1) {FeildVariants.options.pop() ; setKeyNumber( KeyNumber - 1 )} }  } className={`btn ${FeildVariants.options.length > 1 ? 'opacity-[1]' : 'opacity-0'} !duration-1000`} >{content.admin.createProduct.variants.removeKey}</button>
                        </div>
                    {/* Vars Products images */}
                        <div className='bg-black/20 p-3 flex flex-col gap-2 rounded-xl'>
                            <label className="w-[70px] h-[70px] flex items-center justify-center rounded-full !bg-gradient-to-br  from-[var(--gradient-from)] via-[var(--white)]/50 to-[var(--gradient-to)] cursor-pointer text-white/50 shadow-lg  hover:scale-105 transition-transform">
                                <span className="text-xl bg-transparent "><FiPlus className="text-2xl font-black text-stone-900 " /></span>
                                <input  type="file"  accept="image/*"  multiple  onChange={(e) => handleImageUpload( e )} className="hidden"  />
                            </label>
                            <div className ={`  rounded-xl p-3 flex gap-2 `} >
                                { FeildVariants.images.map((image, index) => (
                                    <div className={`' ${ image.secure_url ? 'block': "hidden"} w-[100px] h-[100px] border-stone-700 rounded-lg overflow-hidden  '`} key={index} >
                                        <img className='' src={image.secure_url || undefined } />
                                    </div>
                                ))}
                            </div>
                        </div>
                    {/* Vars Products images */}
                    <button  onClick={HandelVarintSubmit} type='button'  className={`btn`} >{content.admin.createProduct.variants.create}</button>
                </div >
            </>
        }
    </>
)
}

export default SelectVarients
