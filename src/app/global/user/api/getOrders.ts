import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getOrders = async () => {
    const res = await axios.get('http://localhost:3000/orders')
    return res.data
}
export const useGetOrders = () => {
    return useQuery({
        queryKey: ['order'],
        queryFn: async () => {
            try {
                return getOrders()
            } catch (error) {
                console.log("We could not got the orders Amr and here is the error ", error)
                throw error
            }
        },
        retry: false,
    })
}