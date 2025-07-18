"use client"
import React from 'react'
import CustomSlider from './components/CustomSlider'
import { UseGetEntities } from '@/APIs/GetEntitiy'
import Cards from './components/Cards'

const page = () => {
    const {data} = UseGetEntities("categories")
    const Categories = data?.data.docs
return (
    <div className={`page`}>
        { Categories?.map((category : any , idx : number) => (
          <div className=' border-b border-[var(--border)] py-10  '>
            <Cards category= {category._id} discription={category.description} limit={10}  isAll= { false }  />
          </div>
          ))
        }
        { Categories?.map((category : any , idx : number) => (
            <CustomSlider key={idx} title={category.name} category={category._id} />
          ))
        }
    </div>
)
}

export default page
