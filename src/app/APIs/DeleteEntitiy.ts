import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAxiosInterceptor } from "../global/user/Auth/refreshTokens"
import toast from "react-hot-toast"
import axios from "axios"

const DeleteEntity = async (MyAxios: any, id: string , Route: string) => {
    const res = await MyAxios.delete(`/${Route}/${id}`)
    return res.data
}

export const UseDeleteEntity = () => {
    const MyAxios = useAxiosInterceptor()
    const ClaerCash = useQueryClient()
    return useMutation({
        mutationFn: ({ id, Route }: { id: string; Route: string }) => DeleteEntity(MyAxios, id, Route),
        onSuccess: (_, variables) => {
            toast.success(` ${variables.Route} deleted successfully!`);
            console.log(`We deleted ${variables.Route} Entity successfully`)
            ClaerCash.invalidateQueries({ queryKey: [variables.Route] })
        },
        onError: (err: unknown, _ , context?: { id: string; Route: string }) => {
            if (axios.isAxiosError(err)) {
                toast.error(` Failed to delete ${context?.Route || "it"} Please try again `);
                console.error("Axios error:", err.response?.data);
            } else {
                toast.error(` There is somthing wrong Please try again `);
                console.error("Unknown error:", err, "Context:", context);
            }
        }
    })
}
