import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletProduct } from "../services/DeletProducts";
import { UseMutationResult } from "@tanstack/react-query";

export function useDeletProduct (): UseMutationResult<any, unknown, string, unknown> {
    const cashCleaner = useQueryClient()
    return useMutation({
        mutationFn: (id : string ) => DeletProduct(id),
        onSuccess: (data) => {
            cashCleaner.invalidateQueries({ queryKey: ["products"] }) ;
            console.log("We Deleted the product Amr . . And here is the new data without it : ", data);
        },
        onError: (error) => {
            console.error("sorry amr , But We could not delete the Product and here is the error : ", error);
        }
    })
}