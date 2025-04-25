import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EditProducts } from "../services/EditProducts"

export function useEditProducts() {
    const cleaner = useQueryClient()   
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => EditProducts(id, data),
        onSuccess: (data) => {
            cleaner.invalidateQueries({queryKey: ["products"]})
            console.log("We Edited the product Amr . . And here is the new data with it : ", data);
        },
        onError: (error) => {
            console.error("sorry amr , But We could not Edit the Product and here is the error : ", error);
        }
    })
}