'use client'

import { UseGetEntities } from "@/app/APIs/GetEntitiy";
import { UseDeleteEntity } from "@/app/APIs/DeleteEntitiy";
import { UsePatchEntity } from "@/app/APIs/PatchEntitiy";
import { useState } from "react";
import { FiEdit, FiTrash2, FiSave } from "react-icons/fi";
import Loading from "@/app/components/Loading";

export default function Page() {
// ~ ################### Hooks
    const { data , isLoading , isError } = UseGetEntities("categories");
    const Categories = data?.data.docs
    const { mutate: deleteCategory } = UseDeleteEntity();
    const { mutate: patchCategory } = UsePatchEntity();
    const [editId, setEditId] = useState<string | null>(null);
    const [editedCategory, setEditedCategory] = useState({
        name: "",
        slug: "",
        description: "",
        isActive: true,
    });
    // console.log( 'Here is my All cate' + JSON.stringify(data) )
    // console.log( 'No Here is my real cate' + JSON.stringify(Categories) )
// ~ ################### Hooks
// ~ ################### logics
    const handleEdit = (category: any) => {
        setEditId(category._id);
        setEditedCategory({
            name: category.name,
            slug: category.slug,
            description: category.description,
            isActive: category.isActive,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setEditedCategory((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = (id: string) => {
        patchCategory({ data: editedCategory, id, Route: "categories" });
        setEditId(null);
    };
// ~ ################### logics
    return (
        <div className="admin-page ">
            {isLoading ? (<Loading/>) : isError ? (<div className="text-red-500 text-center">Sorry bro, there is something wrong  </div>) : 
            <div className=" md:w-[70%] max-w-[600px] w-[90%] flex-col flex gap-3 ">
                {Categories.map((cat: any) => (
                    <div
                        key={cat._id}
                        className="p-4 rounded-lg bg-black/50 shadow flex flex-col gap-3 border border-amber-200/20 text-amber-200/50 "
                    >
                        {editId === cat._id ? (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedCategory.name}
                                    onChange={handleChange}
                                    placeholder="Category Name"
                                    className="w-full px-4 py-2 rounded-xl border border-amber-300/20 bg-orange-900/20"
                                />
                                <input
                                    type="text"
                                    name="slug"
                                    value={editedCategory.slug}
                                    onChange={handleChange}
                                    placeholder="Slug"
                                    className="w-full px-4 py-2 rounded-xl border border-amber-300/20 bg-orange-900/20"
                                />
                                <textarea
                                    name="description"
                                    value={editedCategory.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className="w-full px-4 py-2 rounded-xl border border-amber-300/20 bg-orange-900/20"
                                />
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={editedCategory.isActive}
                                        onChange={handleChange}
                                        className="accent-orange-900"
                                    />
                                    <span>Active</span>
                                </label>
                                <button
                                    onClick={() => handleSave(cat._id)}
                                    className="w-full py-3 cursor-pointer border border-amber-400/20 bg-black text-amber-400/50 rounded-lg font-semibold hover:bg-transparent transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <FiSave /> Save
                                </button>
                            </>
                        ) : (
                            <div className="font-light text-amber-200/50 ">
                                <p><span className="font-bold text-orange-900 text-[15px] ">Name:</span> {cat.name}</p>
                                <p><span className="font-bold text-orange-900 text-[15px] ">Slug:</span> {cat.slug}</p>
                                <p><span className="font-bold text-orange-900 text-[15px] ">Description:</span> {cat.description}</p>
                                <p><span className="font-bold text-orange-900 text-[15px] ">Status:</span> {cat.isActive ? " Active" : " Inactive"}</p>
                                {cat.image && (
                                    <div className='w-[100px] h-[100px] border-stone-700 rounded-lg overflow-hidden'>
                                        <img src={cat.image} alt="Uploaded Preview" className="object-cover w-full h-full" />
                                    </div>
                                )}
                                <div className="flex justify-end gap-4 mt-2">
                                    <button onClick={() => handleEdit(cat)} className="text-sky-600 cursor-pointer hover:text-sky-400" >
                                        <FiEdit size={18} />
                                    </button>
                                    <button onClick={() => deleteCategory({ id: cat._id, Route: "categories" })} className="text-red-600 cursor-pointer hover:text-red-800" >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div >
                        )}
                    </div>
                ))}
            </div>
            }
        </div>
    );
}
