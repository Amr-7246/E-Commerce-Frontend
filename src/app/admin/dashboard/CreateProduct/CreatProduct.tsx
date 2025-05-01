'use client'

import { useCreateProduct } from '@/app/admin/api/Hooks/useCreateProduct'
import { IProduct } from '@/app/admin/api/types/productsType'
import { useEffect, useState } from 'react'
import { useEditProducts } from '../../api/Hooks/useEditProducts'
import { Options } from '../../style/AdminStyle'
import { UploadAssets } from '../../utils/uploadOnCloudinary'
import { FiPlus } from "react-icons/fi";
import { UseCreateEntitiy } from '@/app/APIs/CreateEntitiy'

interface FormProps {
    existingProduct?: IProduct
}

export default function CreatProduct({ existingProduct }: FormProps) {
// ~ ############################# Hooks
    const [IsVarintes, setIsVarintes] = useState(false)
    const isEditMode = !!existingProduct
    const { mutate: createMutate, isPending: isCreating } = UseCreateEntitiy()
    const { mutate: editMutate, isPending: isEditing } = useEditProducts()
    
    const [Variants, setVariants] = useState({
        name: '' ,
        value: '' ,
        images : [{ secure_url: '' , publicId: '' }],
        price: 0 , 
        inventory: 0
    })
    const [ProductData, setProductData] = useState<IProduct>({
        name: '',
        price: 0,
        description: 'hi',
        images: [{ secure_url: '' , publicId: '' }],
        variants: [
            {
                options: [{ name:'' , value: '' }],
                images: [ { secure_url: '', publicId: '' } ],
                price: 0 ,
                inventory: 0
            }
        ],
        discount: 0,
        category: '',
        shortDesc: ''
    })
// ~ ############################# Hooks
// ~ ############################# Logic
    // & Pre-fill when Editing
        useEffect(() => {
            if (existingProduct) {
                setProductData(existingProduct)
            }
        }, [existingProduct])
    // & Pre-fill when Editing
    // & Gulb Data from its fields
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target
            setProductData(prev => ({
                ...prev,
                [name]: name === 'price' || name === 'discount' ? Number(value) : value
            }))
        }
    // & Gulb Data from its fields
    // & handle Image Upload to cloudinary
        const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement> , Who : string) => {
            const files = e.target.files
            console.log( files )
            if (!files || files.length === 0) return

            for (const file of files ) {
                try {
                    const data = await UploadAssets(file) // ~ the most important line 

                    if ( Who == 'Product'){
                        setProductData((prv) => ({
                            ...prv,
                            images: [...prv.images, { secure_url: data.ImageURL, publicId: data.ImageId }]
                        }))
                        console.log( ' We uploaded the image amr and here is its data : ' + data)
                    }else{
                        setVariants((prv) => ({
                            ...prv,
                            images: [...prv.images, { secure_url: data.ImageURL, publicId: data.ImageId }]
                        }))
                        console.log( ' We uploaded the image amr and here is its data : ' + data)
                    }

                } catch (err) {
                    console.error('Sory Amr but Image upload failed becaus of that error :', err)
                }
            }
        }
    // & handle Image Upload to cloudinary
    // & handle the product varintes if exist
        const HandelVarintSubmit = () => {
            setProductData((prev) => ({
                ...prev, 
                variants: [...prev.variants, 
                    {
                    options: [{ name: Variants.name, value: Variants.value }],
                    images: [ { secure_url: Variants.images[0].secure_url, publicId: Variants.images[0].publicId } ],
                    price: Variants.price,
                    inventory: Variants.inventory
                }
                ]
            }))
            console.log('We created the varient Amr and here is it : ' + JSON.stringify(Variants)  )
        }
    // & handle the product varintes if exist
    // & handle Form Submit
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            if (!ProductData.name.trim()) return

            if (isEditMode && existingProduct?._id) {
                editMutate({ id: existingProduct._id, data: ProductData })
            } else {
                createMutate({ Data: ProductData, Route: 'products' })
            }
            console.log('We Sent the Product Data to the backend Amr . .  and here is it : ' + JSON.stringify(ProductData) )
            if (!isEditMode) {
            setProductData({
                name: '',
                price: 0,
                description: 'hi',
                images: [],
                variants: [],
                discount: 0,
                category: '',
                shortDesc: ''
            })
            }
        }
    // & handle Form Submit
// ~ ############################# Logic
return (
    <div className={`${Options} flex-center  bg-gradient-to-tr from-black via-amber-200/30 to-black `}>
        <form onSubmit={handleSubmit} className="max-w-md text-white p-4 space-y-4 border border-stone-600 rounded-xl bg-black/50 shadow">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200/50 via-orange-900 to-amber-200/50 ">
            {isEditMode ? 'Edit Product ' : 'Create Product '}
            </h2>
    
            <input type="text" name="name" value={ProductData.name} onChange={handleChange} placeholder="Product Name" className="input" />
    
            <input type="number" name="price" value={ProductData.price} onChange={handleChange} placeholder="Price" className="input" />
    
            <input type="number" name="discount" value={ProductData.discount} onChange={handleChange} placeholder="Discount (%)" className="input" />
    
            <input type="text" name="category" value={ProductData.category} onChange={handleChange} placeholder="Category" className="input" />
    
            <textarea name="shortDesc" value={ProductData.shortDesc} onChange={handleChange} placeholder="Short Description" className="input" />
    
            <textarea name="description" value={ProductData.description} onChange={handleChange} placeholder="Full Description (optional)" className="input" />
            <label className="w-[70px] h-[70px] flex items-center justify-center rounded-full !bg-gradient-to-br from-amber-600 via-orange-950 to-stone-800  cursor-pointer text-white/50 shadow-lg  hover:scale-105 transition-transform">
                <span className="text-xl bg-transparent "><FiPlus className="text-2xl font-black text-stone-900 " /></span>
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={(e) => handleImageUpload( e , 'Product')} 
                    className="hidden" 
                />
            </label>

            { ProductData.images.length > 0 && ProductData.images.map((image, index) => (
                <div className='w-[100px] h-[100px] border-stone-700 rounded-lg overflow-hidden  ' key={index} >
                    <img className='' src={image.secure_url || undefined } />
                </div>
            ))}
            {/* Varintes */}
                <button className='btn' type='button' onClick={() => setIsVarintes(true)} >If there is a varintes add it now </button>
                {   IsVarintes && 
                    <>
                        <div  className='flex flex-col gap-3 w-[85%] p-5 bg-stone-800 rounded-lg border border-stone-600 mx-auto ' >
                            <div className='flex justify-between w-full '>
                                <input className='input w-[40%]' type="text" placeholder='name' value={Variants.name} onChange={(e) => setVariants( pre => ({...pre , name: e.target.value}))}  />
                                <input className='input w-[40%]' type="text" placeholder='value' value={Variants.value} onChange={(e) => setVariants( pre => ({...pre , value: e.target.value}))} />
                            </div>
                            <div>
                                <label className="w-[70px] h-[70px] flex items-center justify-center rounded-full !bg-gradient-to-tr from-green-400 to-sky-500 cursor-pointer text-white/50 shadow-lg  hover:scale-105 transition-transform">
                                    <span className="text-xl bg-transparent "><FiPlus className="text-2xl font-black text-stone-900 " /></span>
                                    <input  type="file"  accept="image/*"  multiple onChange={(e) => handleImageUpload( e , 'Varintes')}   className="hidden"  />
                                </label>
                                { Variants.images.length > 0 && Variants.images.map((image, index) => (
                                    <div className='w-[100px] h-[100px] border-stone-700 rounded-lg overflow-hidden  ' key={index} >
                                        <img className='' src={image.secure_url || undefined } />
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-between w-full '>
                                <input type="number" name="price" value={Variants.price}  placeholder="Price"  onChange={(e) => setVariants( pre => ({...pre , price: Number(e.target.value)}))}  className="input w-[40%]" />
                                <input type="number" name="inventory" value={Variants.inventory}  placeholder="inventory" onChange={(e) => setVariants( pre => ({...pre , inventory: Number(e.target.value)}))}  className="input w-[40%]" />
                            </div>
                            <button  onClick={HandelVarintSubmit} type='button'  className='btn w-full'>Create the colliction</button>
                        </div >
                    </>
                }
            {/* Varintes */}
            <button type="submit" disabled={isCreating || isEditing} className="btn w-full transition">
            {isEditMode ? (isEditing ? 'Editing...' : 'Edit Product') : (isCreating ? 'Creating...' : 'Create Product')}
            </button>
        </form>
    </div>
)
}
