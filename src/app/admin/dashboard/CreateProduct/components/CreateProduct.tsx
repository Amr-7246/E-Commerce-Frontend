'use client'

import { IProduct } from '@/types/productsType'
import { useEffect, useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { UseCreateEntitiy } from '@/APIs/CreateEntitiy'
import { UsePatchEntity } from '@/APIs/PatchEntitiy'
import { UploadAssets } from '@/utils/uploadOnCloudinary';
import SelectCategory from './SelectCategory';
import SelectVarients, { VariantType } from './SelectVarients';
import toast from 'react-hot-toast';
import content from '@/AppContent.json'

interface FormProps {
    existingProduct?: IProduct
}

export default function CreateProduct({ existingProduct }: FormProps) {

// ~ ############################# Hooks
    const admin = content.admin
    const [IsVarintes, setIsVarintes] = useState(false)
    const isEditMode = !!existingProduct
    const { mutate: createMutate, isError : CreationError , isPending: isCreating } = UseCreateEntitiy()
    const { mutate: editMutate, isError : EditingError,isPending: isEditing } = UsePatchEntity()
    const [VarientImages, setVarientImages] = useState<any>({ secure_url: '' , publicId: '' })

    const [Variants, setVariants] = useState<VariantType>({
        options: [{ name: '' , value: '' }],
        images : [{ secure_url: '' , publicId: '' }],
        price: null ,
        inventory: null
    })
    const [ProductData, setProductData] = useState<IProduct>({
        name: '',
        price: null ,
        description: '',
        recommended: false ,
        inventory: null ,
        images: [{ secure_url: '' , publicId: '' }],
        variants: [
          {
            options: [{ name:'' , value: '' }],
            images: [ { secure_url: '', publicId: '' } ],
            price: null ,
            inventory: null
          }
        ],
        discount: null,
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
                        setVarientImages({ secure_url: data.ImageURL, publicId: data.ImageId })
                        console.log( ' We uploaded the image amr and here is its data : ' + data)
                    }

                } catch (err) {
                    console.error('Sory Amr but Image upload failed becaus of that error :', err)
                }
            }
        }
    // & handle Image Upload to cloudinary
    // & handle Form Submit
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            if(CreationError || EditingError) {
                toast.error(admin.createProduct.errorGeneral)
                return
            }
            if (!ProductData.name.trim() || !ProductData.price || !ProductData.category || !ProductData.shortDesc) {
                toast.error(admin.createProduct.errorRequiredFields )
                return
            }

            if (isEditMode && existingProduct?._id) {
                editMutate({ data: ProductData , id: existingProduct._id , Route: 'products' })
                toast.success(admin.createProduct.successEdit)
            } else {
                createMutate({ Data: ProductData, Route: 'products' })
                toast.success(admin.createProduct.successCreate)
            }
            if (!isEditMode) {
            setProductData({
                variants: [
                    {
                        options: [{ name:'' , value: '' }],
                        images: [ { secure_url: '', publicId: '' } ],
                        price: null ,
                        inventory: null
                    }
                ],
                name: '',
                price: null ,
                recommended: false ,
                inventory: null  ,
                description: '',
                images: [],
                discount: null ,
                category: '',
                shortDesc: ''
            })
            }
        }
    // & handle Form Submit
// ~ ############################# Logic
return (
    <div className={` ${isEditMode ? '!from-transparent !via-transparent !to-transparent md:!h-fit ' : '' } admin-page  `} >
            <form onSubmit={handleSubmit} className="!w-[95%] flex flex-col lg:flex-col gap-3 h-fit admin-card space-y-4">
                <div className='lg:w-full hi-fit  flex-center  ' >
                    <h2 className="text-2xl font-bold w-fit text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradient-from)] via-[var(--white)] to-[var(--gradient-to)] ">
                        {isEditMode ? <span>{admin.createProduct.editTitle}</span> : <span>{admin.createProduct.createTitle}</span>}
                    </h2>
                </div>
                <div className={` ${isEditMode ? 'lg:!flex-col' : ''}  lg:flex-row flex-col gap-5 flex`}>
                    <div className='flex flex-col flex-1 gap-5 ' >
                        <input type="text" name="name" value={ProductData.name} onChange={handleChange} placeholder={admin.createProduct.placeholders.name} className="input" />
                        <input type="number" name="price" value={ProductData.price??  ''} onChange={handleChange} placeholder={admin.createProduct.placeholders.price} className="input" />
                        <input type="number" name="discount" value={ProductData.discount??  ''} onChange={handleChange} placeholder={admin.createProduct.placeholders.discount} className="input" />
                        <input type="number" name="inventory" value={ProductData.inventory??  ''} onChange={handleChange} placeholder={admin.createProduct.placeholders.inventory} className="input" />
                        <label  className={`flex items-center gap-2 p-2 border-[1px] border-[var(--white)]/20 rounded cursor-pointer transition ${ ProductData.recommended ? 'bg-[var(--admin-bg-dark)] border-[var(--admin-sidebar-active)]' : 'bg-[var(--admin-card-bg)]' }`} >
                            <input
                                type="checkbox"
                                checked={ProductData.recommended}
                                onChange={() => setProductData((prev) => ({ ...prev, recommended: !prev.recommended }))}
                                className="accent-[var(--admin-sidebar-active)]"/>
                            <span className="capitalize text-[var(--text-inverted)] text-sm">{admin.createProduct.recommendedLabel}</span>
                        </label>
                        {/* Cate  */}
                            <SelectCategory onCategorySelect={(id : string) => setProductData((prev) => ({ ...prev, category: id }))} />
                        {/* Cate  */}
                    </div>
                    <div className='flex flex-col flex-1 gap-5'>
                        <textarea name="shortDesc" value={ProductData.shortDesc} onChange={handleChange} placeholder={admin.createProduct.placeholders.shortDesc} className="input" />
                        <textarea name="description" value={ProductData.description} onChange={handleChange} placeholder={admin.createProduct.placeholders.description} className="input" />
                        {/* Products images */}
                            <div className='bg-[var(--admin-bg-dark)] p-3 flex flex-col gap-2 rounded-xl'>
                                <label className="w-[70px] h-[70px] flex items-center justify-center rounded-full !bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)]  cursor-pointer text-[var(--admin-sidebar-text)]/50 shadow-lg  hover:scale-105 transition-transform">
                                    <span className="text-xl bg-transparent "><FiPlus className="text-2xl font-black text-[var(--admin-sidebar-bg)] " /></span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleImageUpload( e , 'Product')}
                                        className="hidden"
                                    />
                                </label>
                                <div className ={` ${ProductData.images.length > 0 ? '' : '' } p-3 flex rounded-xl overflow-auto gap-2 `} >
                                    { ProductData.images.map((image, index) => (
                                        <div className={`' ${ image.secure_url ? 'block': "hidden"} min-w-[100px] w-[150px] min-h-[100px] h-[100px] border-[var(--admin-card-border)] rounded-lg overflow-hidden  '`} key={index} >
                                            <img className='' src={image.secure_url || undefined } />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        {/* Products images */}
                        {/* Varintes */}
                            <SelectVarients VarientImages={VarientImages} ServerVarsError={CreationError} Variants={Variants}  ProductData={ProductData} setProductData={setProductData} setVariants={setVariants} handleImageUpload={(e) => handleImageUpload( e , 'Varintes')} />
                        {/* Varintes */}
                    </div>
                </div>
                <button type="submit" disabled={isCreating || isEditing} className="btn w-full ">
                    {isEditMode ? (isEditing ? admin.createProduct.button.editing : admin.createProduct.button.edit) : (isCreating ? admin.createProduct.button.creating : admin.createProduct.button.create)}
                </button>
            </form>
    </div>
)
}

