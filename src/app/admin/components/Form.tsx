'use client'

import { useState } from 'react'
import { useCreateProduct } from '../api/Hooks/useCreateProduct'
import { IProduct } from '../api/types/productsType'

export default function Form() {
// ~ ############## Hooks
    const { mutate, isPending } = useCreateProduct()
    const [ProductData, setProductData] = useState<IProduct>({
        name: '',
        price: 0,
        description: '',
        images: [],
        variants: [],
        discount: 0,
        category: '',
        shortDesc: ''
    })
// ~ ############## Hooks
// ~ ############## Logic
    // & handleChange
        const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
            const { name, value } = e.target
                setProductData(prev => ({
                    ...prev,
                    [name]: name === 'price' || name === 'discount' ? Number(value) : value 
                })
            )
            }
    // & handleChange
    // & handle Image upload
        const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

          const uploadedUrls: string[] = []

          for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'YOUR_UPLOAD_PRESET') // 🔐 from Cloudinary

            try {
              const res = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
                method: 'POST',
                body: formData,
              })

              const data = await res.json()
              uploadedUrls.push(data.secure_url)
            } catch (err) {
              console.error('Image upload failed:', err)
            }
          }

          // Save uploaded URLs to state (like how you did with handleArrayChange)
          handleArrayChange('images', uploadedUrls)
        }
    // & handle Image upload
    // & handleArrayChange
        const handleArrayChange = (name: 'images' | 'variants', value: string | string[]) => {
            setProductData(prev => ({
                ...prev,
                [name]: Array.isArray(value) ? value : value.split(',').map(item => item.trim())
            }))
        }
    // & handleArrayChange
    // & handleSubmit
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            if (!ProductData.name.trim()) return
            mutate(ProductData)
            console.log(ProductData)
            setProductData({
                name: '',
                price: 0,
                description: '',
                images: [],
                variants: [],
                discount: 0,
                category: '',
                shortDesc: ''
        })
        }
    // & handleSubmit
// ~ ############## Logic
// ~ ############## Elementes
    return (
        <form onSubmit={handleSubmit} className="max-w-md text-white p-4 space-y-4 border rounded-xl bg-stone-800 shadow">
            <h2 className="text-2xl font-bold text-pink-600">Create Product</h2>
            <input
                type="text"
                name="name"
                value={ProductData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-2 border rounded"
        />
    
            <input
                type="number"
                name="price"
                value={ProductData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 border rounded"
            />
    
            <input
                type="number"
                name="discount"
                value={ProductData.discount}
                onChange={handleChange}
                placeholder="Discount (%)"
                className="w-full p-2 border rounded"
        />
    
            <input
                type="text"
                name="category"
                value={ProductData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border rounded"
        />
    
            <textarea
                name="shortDesc"
                value={ProductData.shortDesc}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full p-2 border rounded"
            />
    
            <textarea
                name="description"
                value={ProductData.description}
                onChange={handleChange}
                placeholder="Full Description (optional)"
                className="w-full p-2 border rounded"
        />    
    
    <input
            type="file"
            accept="image/*"
            multiple // allow multiple images
            onChange={(e) => handleImageUpload(e)}
            className="w-[100px] h-[100px] text-center  p-2 border rounded-full cursor-pointer text-white"
/>

    
        <input
                type="text"
                name="variants"
                onChange={e => handleArrayChange('variants', e.target.value)}
                placeholder="Variants (comma separated)"
                className="w-full p-2 border rounded"
        />
    
            <button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
                {isPending ? 'Creating...' : 'Create Product'}
            </button>
        </form>
    )
// ~ ############## Elementes

}
