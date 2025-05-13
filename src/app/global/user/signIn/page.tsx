"use client";

import { useState } from "react";
import { useSignUp } from "../Auth/signUp";
import toast from "react-hot-toast";

export interface Iuse {
    name : string  , 
    email : string , 
    password : string , 
}
export default function Page() {
    const { mutate, status , isError } = useSignUp();
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
        if(isError) {
            toast.error("There is some thing wrong . . try again ");
        }else{
            toast.success("Sign up successful");
            setFormData({
                name : '' , 
                email: "",
                password: ""
            });
        }
    };

return (
    <div className="page">
        <form onSubmit={handleSubmit} className="text-orange-900 p-8 rounded-lg w-full max-w-[700px] flex-center flex-col bg-gradient-to-r from-black/50 via-amber-200/20 to-black/50"> 
            <h2 className="text-3xl font-bold text-center mb-8 text-[35px]  text-transparent bg-clip-text bg-gradient-to-r from-amber-200/50 via-orange-950 to-amber-200/50 ">Sign In</h2>
            <div className="mb-6 ">
                <label className="block  mb-2" htmlFor="email">
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
                <label className="block  mb-2" htmlFor="email">
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
                <label className="block  mb-2" htmlFor="password">
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
                <button type="submit" disabled={isLoading} className={`btn text-amber-200/50 hover:!text-amber-300/50 !border-transparent !from-stone-950 !via-orange-950 !to-stone-950 w-[70%] `} >
                    {isLoading ? "Signing In..." : "Sign In "}
                </button>
            </div>
        </form>
    </div>
);
}
