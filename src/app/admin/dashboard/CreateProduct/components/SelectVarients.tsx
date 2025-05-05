"use client"
import { IProduct } from '@/app/types/productsType';
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineInventory2, MdPriceChange } from 'react-icons/md';
import { BsImages } from 'react-icons/bs';
import toast from 'react-hot-toast';
// ? ################# Types
    export type VariantType = {
        options: { name: string; value: string }[];
        images: { secure_url: string; publicId: string }[];
        price: null | number ;
        inventory: null | number;
    };
    type Props = {
        ServerVarsError: any
        Variants:  VariantType;
        setVariants: React.Dispatch<React.SetStateAction<VariantType>>;
        ProductData:  IProduct ;
        setProductData: React.Dispatch<React.SetStateAction< IProduct >>;
        handleImageUpload: (e: any) => void;
    };
// ? ################# Types
const SelectVarients = ( { ProductData, setProductData ,ServerVarsError, Variants, setVariants , handleImageUpload }: Props ) => {

    const [IsVarintes, setIsVarintes] = useState(false)
    const [KeyNumber, setKeyNumber] = useState(1)

    // & handle the product varintes if exist
        const HandelVarintSubmit = () => {
            if(ServerVarsError){toast.error('Sorry some thing bad happend you can tray again later') ; return }
            if( !Variants.options[0].name || !Variants.options[0].value || !Variants.price || !Variants.inventory ) {
                toast.error('Please add the required feild')
                return
            } else {
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
                toast.success('The variant has been added . . You can add another variant if you need')
            }
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
    useEffect(() => {
            console.log(Variants.options , KeyNumber)
            console.log(Variants , KeyNumber)
    }, [Variants])
    // & handle Multiy Options
const FormButn = ' p-3 cursor-pointer rounded-lg w-fit duration-500 hover:border-amber-200/50 text-amber-200/50 bg-transparent border border-transparent'
return (
    <>
        <button className={`${FormButn}`} type='button' onClick={() => setIsVarintes(!IsVarintes)} >{IsVarintes ? 'close' : 'Add a vareint' }</button>
        {   IsVarintes && 
            <>
                <div  className='flex flex-col gap-3 w-[85%] p-5 bg-stone-800/50 rounded-lg border border-amber-200/20 !text-amber-200/50 mx-auto ' >
                    {/* Options inputs */}
                    <div className={` max-h-[150px] ${Variants.options.length > 3 ? 'border-orange-900/20 p-3 bg-black/20' : 'border-transparent' } border flex flex-col gap-2 rounded-xl overflow-auto duration-1000 `}>
                        {Variants.options.map((option , index) => (
                            <div key={index} className='flex justify-between w-full text-amber-200/50 '>
                                        <input className='input w-[40%]' type="text" placeholder='name' value={option.name} 
                                        onChange={(e) =>
                                            setVariants((prev: any) => {
                                                const newOptions = [...prev.options];
                                                newOptions[index] = {
                                                    ...newOptions[index],
                                                    name: e.target.value,
                                            };
                                            return { ...prev, options: newOptions };
                                        })}/>
                                        <input className='input w-[40%]' type="text" placeholder='value' value={option.value} 
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
                        ))}
                    </div>
                    {/* Options inputs */}
                    <div className='flex justify-between w-full '>
                        <input type="number" name="price" value={Variants.price ?? ''}  placeholder="Price"  onChange={(e) => setVariants( ( pre : any ) => ({...pre , price: Number(e.target.value)}))}  className="input w-[40%]" />
                        <input type="number" name="inventory" value={Variants.inventory ?? ''}  placeholder="inventory" onChange={(e) => setVariants( ( pre : any ) => ({...pre , inventory: Number(e.target.value)}))}  className="input w-[40%]" />
                    </div>
                    <div className='flex justify-between'>
                        <button type='button'  className={`${FormButn}`} onClick={() => setKeyNumber( KeyNumber + 1 )} >Add new Key</button>
                        <button type='button'  onClick={() => { if( Variants.options.length > 1) {Variants.options.pop() ; setKeyNumber( KeyNumber - 1 )} }  } className={`${FormButn} ${Variants.options.length > 1 ? 'opacity-[1]' : 'opacity-0'} !duration-1000`} >Remove the Key</button>
                    </div>
                    {/* Vars Products images */}
                        <div className='bg-amber-950/20 p-3 flex flex-col gap-2 rounded-xl'>
                            <label className="w-[70px] h-[70px] flex items-center justify-center rounded-full !bg-gradient-to-br from-amber-600 via-orange-950 to-stone-800  cursor-pointer text-white/50 shadow-lg  hover:scale-105 transition-transform">
                                <span className="text-xl bg-transparent "><FiPlus className="text-2xl font-black text-stone-900 " /></span>
                                <input  type="file"  accept="image/*"  multiple  onChange={(e) => handleImageUpload( e )} className="hidden"  />
                            </label>
                            <div className ={`  rounded-xl p-3 flex gap-2 `} >
                                { Variants.images.map((image, index) => (
                                    <div className={`' ${ image.secure_url ? 'block': "hidden"} w-[100px] h-[100px] border-stone-700 rounded-lg overflow-hidden  '`} key={index} >
                                        <img className='' src={image.secure_url || undefined } />
                                    </div>
                                ))}
                            </div>
                        </div>
                    {/* Vars Products images */}
                    <button  onClick={HandelVarintSubmit} type='button'  className={`${FormButn}`} >Create the colliction</button>
                </div >
            </>
        }
    </>
)
}

export default SelectVarients