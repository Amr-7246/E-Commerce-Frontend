'use client'

import { UseGetEntities } from "@/APIs/GetEntitiy";
import { UseDeleteEntity } from "@/APIs/DeleteEntitiy";
import { UsePatchEntity } from "@/APIs/PatchEntitiy";
import { useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiImage, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Loading from "@/app/components/Loading";
import content from '@/AppContent.json'

export default function Page() {
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
    const admin = content.admin
    return (
        <div className="admin-page ">
            {isLoading ? (<Loading/>) : isError ? (
                <div className="admin-status-error text-center">{admin.getAllCategories?.error || 'حدث خطأ أثناء تحميل الفئات'}</div>
            ) : ( <div className="w-[90%]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {Categories.map((cat: any) => (
                        <div key={cat._id} className="flex flex-col gap-3 !text-[var(--text-primary)] min-h-[260px] shadow-md hover:shadow-lg transition-shadow duration-300 border rounded-lg p-4 border-stone-800 bg-black/50" >
                            {editId === cat._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedCategory.name}
                                        onChange={handleChange}
                                        placeholder={admin.getAllCategories?.name || 'اسم الفئة'}
                                        className="input"
                                    />
                                    <input
                                        type="text"
                                        name="slug"
                                        value={editedCategory.slug}
                                        onChange={handleChange}
                                        placeholder={admin.getAllCategories?.slug || 'المُعرف'}
                                        className="input"
                                    />
                                    <textarea
                                        name="description"
                                        value={editedCategory.description}
                                        onChange={handleChange}
                                        placeholder={admin.getAllCategories?.description || 'الوصف'}
                                        className="input"
                                    />
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={editedCategory.isActive}
                                            onChange={handleChange}
                                            className="accent-[var(--admin-sidebar-active)]"
                                        />
                                        <span>{admin.getAllCategories?.active || 'نشط'}</span>
                                    </label>
                                    <button
                                        onClick={() => handleSave(cat._id)}
                                        className="btn flex items-center justify-center gap-2 w-full"
                                    >
                                        <FiSave /> {admin.getAllCategories?.save || 'حفظ'}
                                    </button>
                                </>
                            ) : (
                                <div className="font-bold flex flex-col gap-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.getAllCategories?.nameLabel || 'الاسم:'}</span>
                                        <span className="text-lg">{cat.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.getAllCategories?.slugLabel || 'المُعرف:'}</span>
                                        <span>{cat.slug}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.getAllCategories?.descriptionLabel || 'الوصف:'}</span>
                                        <span>{cat.description}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.getAllCategories?.statusLabel || 'الحالة:'}</span>
                                        {cat.isActive ? (
                                            <span className="flex items-center gap-1 text-[var(--color-success)]"><FiCheckCircle />{admin.getAllCategories?.active || 'نشط'}</span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[var(--color-error)]"><FiXCircle />{admin.getAllCategories?.inactive || 'غير نشط'}</span>
                                        )}
                                    </div>
                                    {cat.image && (
                                        <div className='w-[100px] h-[100px] border border-[var(--admin-card-border)] rounded-lg overflow-hidden mx-auto flex items-center justify-center bg-[var(--admin-bg-light)]'>
                                            <FiImage className="text-[var(--admin-sidebar-active)] text-2xl absolute" />
                                            <img src={cat.image} alt="Uploaded Preview" className="object-cover w-full h-full relative z-10" />
                                        </div>
                                    )}
                                    <div className="flex justify-start mt-5 mr-[70%] w-fit bg-black/50 rounded-md p-2   ">
                                        <button onClick={() => handleEdit(cat)} className="text-[var(--color-info)] cursor-pointer hover:text-sky-400 px-4 border-l border-stone-500 transition-colors" >
                                            <FiEdit size={18} />
                                        </button>
                                        <button onClick={() => deleteCategory({ id: cat._id, Route: "categories" })} className="text-[var(--color-error)] px-4 hover:text-red-800 transition-colors cursor-pointer " >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div >
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
