'use client';

import { useState } from "react";
import { UseCreateEntitiy } from "@/app/APIs/CreateEntitiy";
import { UploadAssets } from "@/app/utils/uploadOnCloudinary";
import { FiPlus } from "react-icons/fi";
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
return (
    <div className="admin-page  ">
        <form onSubmit={(e) => { e.preventDefault(); CreateCategory(); }} className="max-w-md h-fit text-white p-4 space-y-4 border border-stone-600 rounded-xl bg-black/50 shadow">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200/50 via-orange-900 to-amber-200/50">
                Create Category
            </h2>
            <input
                type="text"
                name="name"
                value={CatigroyData.name}
                onChange={handleChange}
                placeholder="Category Name"
                className="input"
            />

            <input
                type="text"
                name="slug"
                value={CatigroyData.slug}
                onChange={handleChange}
                placeholder="Slug"
                className="input"
            />

            <textarea
                name="description"
                value={CatigroyData.description}
                onChange={handleChange}
                placeholder="Description"
                className="input"
            />

            <label className="w-[70px] h-[70px] flex items-center justify-center rounded-full !bg-gradient-to-br from-amber-600 via-orange-950 to-stone-800  cursor-pointer text-white/50 shadow-lg  hover:scale-105 transition-transform">
                <span className="text-xl bg-transparent "><FiPlus className="text-2xl font-black text-stone-900 " /></span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </label>

            {uploading && <p className="text-sm text-amber-200 animate-pulse">Uploading image...</p>}
            {CatigroyData.image && (
                <div className='w-[100px] h-[100px] border-stone-700 rounded-lg overflow-hidden'>
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
                    className="accent-orange-900 w-4 h-4"
                />
                <label htmlFor="isActive" className="text-stone-300">Active</label>
            </div>

            <button
                type="submit"
                disabled={uploading}
                className="btn w-full transition"
            >
                {uploading ? "Wait..." : "Create Category"}
            </button>
        </form>
        <ErrorHandler UserError={UserError} />

    </div>
);
}
