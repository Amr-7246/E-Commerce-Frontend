import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Iuse } from "../signIn/page"
import { useUserInfoContext } from "@/app/context/users/userInfoContext"
import {  useRouter } from "next/navigation"

const SignUp = async (payload : Iuse ) => {
    const res = await axios.post( `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/signup`, payload ,  { withCredentials: true } )
    return res.data
}
export const useSignUp = () => {
    const router = useRouter()
    const { setUserInfo } = useUserInfoContext()
    const cashQurey = useQueryClient()
    return useMutation ({
        mutationFn : (payload : Iuse ) => SignUp(payload),
        onSuccess : (data) => { 
            const { token , data : { user } } = data
            localStorage.setItem('accessToken' , token )
            setUserInfo({
                id: user._id,
                name: user.name,
                email: user.email,
            });
            cashQurey.invalidateQueries({queryKey : ['user']}) ;
            console.log('Ok Amr, we created the user')
            router.push('/global/user/portfolio');
        },
        onError : () => console.log('Sory amr but we couldnt create the user ')
    })
}