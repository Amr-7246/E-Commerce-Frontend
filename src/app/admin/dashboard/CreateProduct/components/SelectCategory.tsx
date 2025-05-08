"use client"
import { UseGetEntities } from '@/app/APIs/GetEntitiy';
import React, { useState } from 'react'
import { FaTags } from 'react-icons/fa'
type Category = {
    _id: string;
    name: string;
};

const SelectCategory = ({onCategorySelect} : { onCategorySelect : (id: string) => void} ) => {
    const { data , isLoading } = UseGetEntities('/categories');
    const categories = data?.data.docs as Category[] || []
    const [selectedId, setSelectedId] = useState<string>('');
    
    const handleSelect = (id: string) => {
        setSelectedId(id);
        onCategorySelect(id)
    };
return (
    <div className="p-4 text-amber-200/50 bg-stone-500/20 rounded-xl  shadow">
    <h2 className="flex items-center gap-2 text-lg font-semibold  mb-3">
        <FaTags className="text-orange-900" />
        Choose a Category
    </h2>
    <div className="grid lg:grid-cols-1 grid-cols-2 max-h-[200px] lg:max-h-[400px] overflow-auto gap-2">
        { isLoading ? <p className="text-sm text-gray-500">Loading categories...</p> : 
        categories?.map((cat : any ) => (
        <label key={cat._id} className={`flex items-center gap-2 p-2 border-[1px] border-amber-200/50 rounded cursor-pointer transition ${ selectedId === cat._id ? 'bg-stone-800 border-orange-900' : 'bg-black/50' }`} >
            <input
            type="checkbox"
            checked={selectedId === cat._id}
            onChange={() => handleSelect(cat._id)}
            className="accent-orange-900"/>
            <span className="capitalize text-amber-200/50 text-sm">{cat.name}</span>
        </label>
        ))}
    </div>
</div>
)
}

export default SelectCategory