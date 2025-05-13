import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAxiosInterceptor } from "../global/user/Auth/refreshTokens"
import toast from "react-hot-toast"
import axios from "axios"

const PatchEntity = async <T>(MyAxios: any, data: T, id: string, Route: string) => {
    const res = await MyAxios.patch(`/${Route}/${id}`, data)
    return res.data
}

export const UsePatchEntity = <T>() => {
    const MyAxios = useAxiosInterceptor()
    const ClaerCash = useQueryClient()
    return useMutation({
        mutationFn: ({ data, id, Route }: { data: T; id: string; Route: string }) => PatchEntity(MyAxios, data, id, Route),
        onSuccess: (_, variables) => {
            toast.success(` ${variables.Route} patched successfully!`);
            console.log(`We patched ${variables.Route} Entity successfully`)
            ClaerCash.invalidateQueries({ queryKey: [variables.Route] })
        },
        onError: (err: unknown, _ , context?: { data: T; id: string; Route: string }) => {
            if (axios.isAxiosError(err)) {
                toast.error(` Failed to patch ${context?.Route || "it"} Please try again `);
                console.error("Axios error:", err.response?.data);
            } else {
                toast.error(` There is somthing wrong Please try again `);
                console.error("Unknown error:", err, "Context:", context);
            }
        }
    })
}
