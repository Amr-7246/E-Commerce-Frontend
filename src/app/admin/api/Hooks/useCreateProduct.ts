"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { IProduct , createProduct } from '../services/createProducts'

export function useCreateProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (payload: IProduct) => createProduct(payload), // ~ The Brain
        onSuccess: () => {
            toast.success('Product created! . . . Done')
            queryClient.invalidateQueries({ queryKey: ['products'] })
            console.log("We added the product ")
        },
        onError: () => {
            toast.error('Failed to create product . . . You can try again')
            console.log("We did not added the product ")
        }
    })
}
