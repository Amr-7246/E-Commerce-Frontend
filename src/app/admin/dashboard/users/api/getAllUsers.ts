"use client"
import axios from "axios";
import { useQuery } from '@tanstack/react-query'
import { IProduct } from "@/app/admin/api/types/productsType";

export const getUsers = async () => {
    const res = await axios.get('http://localhost:3000/user')
    // console.log("Here is all users amr : " + JSON.stringify(res.data.data.docs) )
    return res.data.data.docs
}

export const useGetUsers = () => {
    return useQuery<IProduct[],Error>({
        queryKey : ['user'],
        queryFn : getUsers,
        refetchOnWindowFocus: false,
        retry: 1,
    });
}
export type { IProduct };
