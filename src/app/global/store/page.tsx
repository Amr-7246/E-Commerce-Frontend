"use client"
import React from 'react'
import CustomSlider from './CustomSlider'
import { UseGetEntities } from '@/app/APIs/GetEntitiy'

const page = () => {
    const {data} = UseGetEntities("categories")
    const Categories = data?.data.docs
return (
    <div className={`page`}>
        {
            Categories?.map((category : any , idx : number) => (
                <CustomSlider key={idx} title={category.name} category={category._id} />
            ))
        }
    </div>
)
}

export default page