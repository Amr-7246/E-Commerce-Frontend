import { useUserInfoContext } from "@/app/context/users/userInfoContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const LogIn = async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/login`, {
        email,
        password,
    } , { withCredentials: true })
    return res.data
}
export const useLogIn = () => {
        const router = useRouter()
        const { login } = useUserInfoContext()
        const cashQurey = useQueryClient()
    return useMutation ({
        mutationFn: ({ email, password }: { email: string; password: string }) => LogIn({email, password}),
        onSuccess: (data : any ) => {
            const { token , data : { user } } = data
            login({
                password: user.password,
                name: user.name,
                email: user.email,
                _id: user._id,
            }, token );
            cashQurey.invalidateQueries({queryKey : ['user']}) ;
            toast.success(` Welcom back ${user.name} . . Here is your portfolio `)
            router.push('/global/user/portfolio');
        },
        onError: () => {
            toast.success('sorry beasty . . But there is somthing wrong ')
        },
    })
}