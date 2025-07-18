"use client"
import React, { useState } from 'react'
import Loading from '@/app/components/Loading'
import { UseGetEntities } from '@/APIs/GetEntitiy'
import { UseDeleteEntity } from '@/APIs/DeleteEntitiy'
import { UsePatchEntity } from '@/APIs/PatchEntitiy'
import Image from 'next/image'
import content from '@/AppContent.json'
import { FiEdit, FiTrash2, FiSave, FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi"

export default function Page() {
    const admin = content.admin
    const { data, isLoading, isError } = UseGetEntities('user')
    const { mutate: deleteUser } = UseDeleteEntity()
    const { mutate: patchUser } = UsePatchEntity()
    const users = data?.data.docs
    
    const [editId, setEditId] = useState<string | null>(null)
    const [editedUser, setEditedUser] = useState({
        name: "",
        email: "",
        password: "",
        isActive: true,
    })

    const handleEdit = (user: any) => {
        setEditId(user._id)
        setEditedUser({
            name: user.name,
            email: user.email,
            password: user.password,
            isActive: user.isActive || true,
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setEditedUser((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSave = (id: string) => {
        patchUser({ data: editedUser, id, Route: "user" })
        setEditId(null)
    }

    return (
        <div className="admin-page">
            {isLoading ? (
                <Loading />
            ) : isError || (users ?? []).length === 0 ? (
                <p className="admin-status-error font-semibold">{admin.users?.error || 'حدث خطأ أثناء تحميل المستخدمين'}</p>
            ) : (
                <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {users?.map((user: any) => (
                        <div key={user._id} className="flex flex-col gap-3 !text-[var(--text-primary)] min-h-[260px] shadow-md hover:shadow-lg transition-shadow duration-300 border rounded-lg p-4 border-stone-800 bg-black/50">
                            {editId === user._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedUser.name}
                                        onChange={handleChange}
                                        placeholder={admin.users?.name || 'الاسم'}
                                        className="input"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={editedUser.email}
                                        onChange={handleChange}
                                        placeholder={admin.users?.email || 'البريد الإلكتروني'}
                                        className="input"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={editedUser.password}
                                        onChange={handleChange}
                                        placeholder={admin.users?.password || 'كلمة المرور'}
                                        className="input"
                                    />
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={editedUser.isActive}
                                            onChange={handleChange}
                                            className="accent-[var(--admin-sidebar-active)]"
                                        />
                                        <span>{admin.users?.active || 'نشط'}</span>
                                    </label>
                                    <button
                                        onClick={() => handleSave(user._id)}
                                        className="btn flex items-center justify-center gap-2 w-full"
                                    >
                                        <FiSave /> {admin.users?.save || 'حفظ'}
                                    </button>
                                </>
                            ) : (
                                <div className="font-bold flex flex-col gap-2">
                                    <div className="flex items-center justify-center mb-2">
                                        <div className="w-[100px] h-[100px] border border-[var(--admin-card-border)] rounded-lg overflow-hidden flex items-center justify-center bg-[var(--admin-bg-light)]">
                                            {user.images?.[1]?.secure_url ? (
                                                <Image 
                                                    src={user.images[1].secure_url} 
                                                    alt={user.name} 
                                                    width={100} 
                                                    height={100} 
                                                    className="object-cover w-full h-full" 
                                                />
                                            ) : (
                                                <FiUser className="text-[var(--admin-sidebar-active)] text-3xl" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.users?.nameLabel || 'الاسم:'}</span>
                                        <span className="text-lg">{user.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.users?.emailLabel || 'البريد الإلكتروني:'}</span>
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.users?.passwordLabel || 'كلمة المرور:'}</span>
                                        <span className="text-sm text-[var(--inactive-text)]">••••••••</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.users?.idLabel || 'المعرف:'}</span>
                                        <span className="text-sm text-[var(--inactive-text)]">{user._id}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[var(--text-inverted)] text-[15px]">{admin.users?.statusLabel || 'الحالة:'}</span>
                                        {user.isActive !== false ? (
                                            <span className="flex items-center gap-1 text-[var(--color-success)]">
                                                <FiCheckCircle />{admin.users?.active || 'نشط'}
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[var(--color-error)]">
                                                <FiXCircle />{admin.users?.inactive || 'غير نشط'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-start mt-5 mr-[70%] w-fit bg-black/50 rounded-md p-2">
                                        <button 
                                            onClick={() => handleEdit(user)} 
                                            className="text-[var(--color-info)] cursor-pointer hover:text-sky-400 px-4 border-l border-stone-500 transition-colors"
                                        >
                                            <FiEdit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => deleteUser({ id: user._id, Route: "user" })} 
                                            className="text-[var(--color-error)] px-4 hover:text-red-800 transition-colors cursor-pointer"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
