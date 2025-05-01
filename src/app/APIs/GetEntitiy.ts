import { useQuery } from "@tanstack/react-query"
import { useAxiosInterceptor } from "../global/user/api/refreshTokens"

const FetchEntities = async (MyAxios: any, Route: string) => {
    const res = await MyAxios.get(`${Route}`)
    return res.data
}
export const UseGetEntities = (Route: string) => {
    const MyAxios = useAxiosInterceptor()
    return useQuery({
        queryKey: [Route],
        queryFn: () => FetchEntities(MyAxios , Route),
        retry: 1 ,
    })
}
