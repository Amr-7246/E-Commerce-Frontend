"use client";

import { useState } from "react";
import { useSignUp } from "../api/signUp";

export interface Iuse {
    name : string  , 
    email : string , 
    password : string , 
}
export default function Page() {
    const { mutate, status } = useSignUp();
    const isLoading = status === "pending" ;
    const [formData, setFormData] = useState<Iuse>({
    name : '' , 
    email: "",
    password: ""
});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    };

return (
    <div className="page">
        <form onSubmit={handleSubmit} className=" p-8 rounded-lg shadow-2xl md:w-[70%] max-w-[500px] flex-center flex-col bg-gradient-to-r from-black via-amber-200/30 to-black text-stone-400"> 
            <h2 className="text-3xl font-bold text-center mb-8 text-stone-900">Sign In</h2>
            <div className="mb-6">
                <label className="block text-sky-500 mb-2" htmlFor="email">
                    Name
                </label>
                <input
                    type="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sky-500 mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sky-500 mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input"
                />
            </div>
            <div className='w-full flex-center gap-5'>
                <button type="submit" disabled={isLoading} className={`btn w-[70%] `} >
                    {isLoading ? "Signing In..." : "Sign In "}
                </button>
            </div>
        </form>
    </div>
);
}
