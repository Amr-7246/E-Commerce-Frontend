"use client"
import { UseGetEntities } from '@/APIs/GetEntitiy';
import React, { useState } from 'react'
import { FaTags } from 'react-icons/fa'
import content from '@/AppContent.json'
type Category = {
    _id: string;
    name: string;
};

const SelectCategory = ({onCategorySelect} : { onCategorySelect : (id: string) => void} ) => {
    const admin = content.admin
    const { data , isLoading } = UseGetEntities('/categories');
    const categories = data?.data.docs as Category[] || []
    const [selectedId, setSelectedId] = useState<string>('');

    const handleSelect = (id: string) => {
        setSelectedId(id);
        onCategorySelect(id)
    };
return (
    <div className="p-4 admin-card  !text-[var(--text-inverted)]">
    <h2 className="flex items-center gap-2 text-lg font-semibold  mb-3">
        <FaTags className="text-[var(--admin-highlight)]" />
        {content.admin.createProduct.selectCategory}
    </h2>
    <div className="grid lg:grid-cols-1 grid-cols-2 max-h-[200px] lg:max-h-[400px] overflow-auto gap-2">
        { isLoading ? <p className="text-sm ">{content.admin.createProduct.loadingCategories}</p> :
        categories?.map((cat : any ) => (
        <label key={cat._id} className={`flex items-center gap-2 p-2 border-[1px] border-[var(--white)]/20 rounded cursor-pointer transition ${ selectedId === cat._id ? 'bg-[var(--admin-bg-dark)] border-[var(--admin-sidebar-active)]' : 'bg-[var(--admin-card-bg)]' }`} >
            <input
            type="checkbox"
            checked={selectedId === cat._id}
            onChange={() => handleSelect(cat._id)}
            className="accent-[var(--admin-sidebar-active)]"/>
            <span className="capitalize text-[var(--text-inverted)] text-sm">{cat.name}</span>
        </label>
        ))}
    </div>
</div>
)
}

export default SelectCategory
