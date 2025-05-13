import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Iuse } from "../signIn/page"
import { useUserInfoContext } from "@/app/context/users/userInfoContext"
import {  useRouter } from "next/navigation"
import toast from "react-hot-toast"

const SignUp = async (payload : Iuse ) => {
    const res = await axios.post( `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/signup`, payload ,  { withCredentials: true } )
    return res.data
}
export const useSignUp = () => {
    const router = useRouter()
    const { login } = useUserInfoContext()
    const cashQurey = useQueryClient()
    return useMutation ({
        mutationFn : (payload : Iuse ) => SignUp(payload),
        onSuccess : (data) => { 
            const { token , data : { user } } = data
            login({
                password: user.password,
                name: user.name,
                email: user.email,
                _id: user._id,
            }, token );
            cashQurey.invalidateQueries({queryKey : ['user']}) ;
            toast.success(` Ok ${user.name} , we created your account Now `)
            router.push('/global/user/portfolio');
        },
        onError : () => toast.error('Sorry but we could not create your account ')
    })
}