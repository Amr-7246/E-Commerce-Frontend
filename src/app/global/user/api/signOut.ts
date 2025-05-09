import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const SignOut = async (userId : any ) => {
    const res = await axios.delete( `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/${userId}`)
    return res.data
}
export const useSignOut = () => {
    const clearCash = useQueryClient()
    return useMutation({
        mutationFn : (userId : any ) =>SignOut(userId),
        onSuccess : () => {
            clearCash.invalidateQueries({queryKey : ['user']}) ;
            console.log('Ok Amr, we deleted the user')
        },
        onError : () => console.log('Sory amr but we couldnt delete the user ')
    })
}