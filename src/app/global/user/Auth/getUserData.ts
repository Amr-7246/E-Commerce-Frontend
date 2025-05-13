import { useQuery } from "@tanstack/react-query"
import { useAxiosInterceptor } from "./refreshTokens"

const GetUserData = async (userId : any) => {
    const CustomeAxios = useAxiosInterceptor()
    const res = await CustomeAxios.get(`/user/${userId}`)
    return res.data
} 
export const useGetUserData = () => {
    return useQuery({
        queryKey: ['userData'],
        queryFn: () => GetUserData("680d546fd80516fbc503e53e"),
        refetchOnWindowFocus: false,
        retry: 1,
    })
}