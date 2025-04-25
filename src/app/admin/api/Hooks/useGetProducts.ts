"use client"
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../services/createProducts";
import { getProducts } from "../services/getProducts";
import { toast } from "react-hot-toast";

export function useGetProducts(enabled: boolean = false) {
    return useQuery<IProduct[],Error>({
        queryKey : ['products'],
        queryFn: async () => {
            try {
                return await getProducts() 
            } catch (error) {
                toast.error('Failed to fetch products ')
                console.log("We could not got the products Amr ", error)
                throw error
            }
        },
        retry: false,
        enabled
    });
}