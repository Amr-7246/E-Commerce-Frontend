"use client"
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { IProduct } from "@/app/admin/api/types/productsType";

export const getUsers = async () => {
    const res = await axios.get( 'http://localhost:3000/user')
    return res.data
}

export function useGetUsers() {
    return useQuery<IProduct[],Error>({
        queryKey : ['user'],
        queryFn: async () => {
            try {
                return getUsers() 
            } catch (error) {
                toast.error('Failed to fetch users ')
                console.log("We could not got the users Amr ", error)
                throw error
            }
        },
        retry: false,
    });
}
export type { IProduct };