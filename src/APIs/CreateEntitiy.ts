import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAxiosInterceptor } from "./Auth/refreshTokens"
import toast from "react-hot-toast"
import axios from "axios"

const CreateEntitiy = async <T>( MyAxios : any , Data: T , Route : string ) => {
    const res = await MyAxios.post(`/${Route}`, Data)
    return res.data
}
export const UseCreateEntitiy = () => {
    const MyAxios = useAxiosInterceptor()
    const ClaerCash = useQueryClient()
    return useMutation({
        mutationFn: ({ Data, Route }: { Data: any; Route: string }) => CreateEntitiy( MyAxios ,Data, Route ),
        onSuccess: (_, variables) => {
            toast.success(` ${variables.Route} created successfully!`);
            console.log(`We created ${variables.Route} Entity successfully amr`)
            ClaerCash.invalidateQueries({ queryKey: [variables.Route] })
        },
        onError: (err: unknown, _ , context?: { Data: any; Route: string }) => {
            if (axios.isAxiosError(err)) {
                toast.error(` Failed to create ${context?.Route || "it "} Please try again `);
                console.error("Axios error:", err.response?.data);
            } else {
                toast.error(` There is somthing wrong Pleas try again `);
                console.error("Unknown error:", err, "Context:", context);
            }
        }
    })
}
