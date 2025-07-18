'use client';

import { useState } from "react";
import { UseCreateEntitiy } from "@/APIs/CreateEntitiy";
import { UploadAssets } from "@/utils/uploadOnCloudinary";
import { FiPlus } from "react-icons/fi";
import content from '@/AppContent.json'
import ErrorHandler from "@/app/components/ErrorHandler";

export default function Page() {
// ~ ################### Hooks
const [UserError, setUserError] = useState({
    content: '' ,
    state: ''
});
const [CatigroyData, setCatigroyData] = useState({
        name: "",
        slug: "",
        description: "",
        image: "",
        isActive: true,
    });
    const [uploading, setUploading] = useState(false);
    const { mutate , isError } = UseCreateEntitiy();
// ~ ################### Hooks
// ~ ################### Logics
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setCatigroyData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { ImageURL } = await UploadAssets(file);
            setCatigroyData((prev) => ({
                ...prev,
                image: ImageURL
            }));
        } catch (error) {
        } finally {
            setUploading(false);
        }
    };

    const CreateCategory = () => {
        if(!CatigroyData.name || !CatigroyData.slug || !CatigroyData.description) {
            setUserError({ content: 'Please fill all the inputs' , state: "Warning" })
            setTimeout(() => { setUserError({ content: '' , state: ""}) }, 2000);
            return;
        } else {
            mutate({ Data: CatigroyData, Route: "categories" });
        }
        if(!isError) {
            setCatigroyData({
                name: "",
                slug: "",
                description: "",
                image: "",
                isActive: true,
            });
            setUserError({ content: 'Done pro' , state: "success" })
            setTimeout(() => { setUserError({ content: '' , state: ""}) }, 2000);
        } else {
            setUserError({ content: 'Sorry bro, there is something wrong' , state: "Server Error" })
            setTimeout(() => { setUserError({ content: '' , state: ""}) }, 2000);
        }
    };
// ~ ################### Logics
const admin = content.admin
return (
    <div className="admin-page  ">
        <form onSubmit={(e) => { e.preventDefault(); CreateCategory(); }} className=" h-fit admin-card space-y-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--admin-highlight)] via-[var(--admin-sidebar-active)] to-[var(--admin-highlight)]">
                {admin.createCategory?.title || 'إضافة فئة جديدة'}
            </h2>
            <input
                type="text"
                name="name"
                value={CatigroyData.name}
                onChange={handleChange}
                placeholder={admin.createCategory?.name || 'اسم الفئة'}
                className="input"
            />

            <input
                type="text"
                name="slug"
                value={CatigroyData.slug}
                onChange={handleChange}
                placeholder={admin.createCategory?.slug || 'المُعرف'}
                className="input"
            />

            <textarea
                name="description"
                value={CatigroyData.description}
                onChange={handleChange}
                placeholder={admin.createCategory?.description || 'الوصف'}
                className="input"
            />

            <label className="w-[70px] h-[70px] flex items-center justify-center rounded-full !bg-gradient-to-br from-[var(--admin-highlight)] via-[var(--admin-sidebar-active)] to-[var(--admin-bg-dark)] cursor-pointer text-[var(--admin-sidebar-text)]/50 shadow-lg hover:scale-105 transition-transform">
                <span className="text-xl bg-transparent "><FiPlus className="text-2xl font-black text-[var(--admin-sidebar-bg)] " /></span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </label>

            {uploading && <p className="text-sm text-[var(--admin-highlight)] animate-pulse">{admin.createCategory?.uploading || 'جاري رفع الصورة...'}</p>}
            {CatigroyData.image && (
                <div className='w-[100px] h-[100px] border-[var(--admin-card-border)] rounded-lg overflow-hidden'>
                    <img src={CatigroyData.image} alt="Uploaded Preview" className="object-cover w-full h-full" />
                </div>
            )}

            <div className="flex items-center gap-2">
                <input
                    id="isActive"
                    type="checkbox"
                    name="isActive"
                    checked={CatigroyData.isActive}
                    onChange={handleChange}
                    className="accent-[var(--admin-sidebar-active)] w-4 h-4"
                />
                <label htmlFor="isActive" className="text-[var(--admin-sidebar-text)]">{admin.createCategory?.active || 'نشط'}</label>
            </div>

            <button
                type="submit"
                disabled={uploading}
                className="btn w-full transition"
            >
                {uploading ? (admin.createCategory?.wait || 'انتظر...') : (admin.createCategory?.createBtn || 'إضافة الفئة')}
            </button>
        </form>
        <ErrorHandler UserError={UserError} />

    </div>
);
}
