import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Iuse } from "../components/LogIn"

const createUser = async (payload : Iuse ) => {
    const res = await axios.post( 'http://localhost:3000/user', payload )
    return res.data
}
export const useCreateUser = () => {
    const cashQurey = useQueryClient()
    return useMutation ({
        mutationFn : (payload : Iuse ) => createUser(payload),
        onSuccess : () => { 
            cashQurey.invalidateQueries({queryKey : ['user']}) ;
            console.log('Ok Amr, we created the user')
        },
        onError : () => console.log('Sory amr but we couldnt create the user ')
    })
}