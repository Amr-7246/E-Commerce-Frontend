
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getReviews = async () => {
    const res = await axios.get('http://localhost:3000/Review')
    return res.data
}
export const useGetReviews = () => {
    return useQuery({
        queryKey: ['Review'],
        queryFn: async () => {
            try {
                return getReviews()
            } catch (error) {
                console.log("We could not got the Reviews Amr and here is the error ", error)
                throw error
            }
        },
        retry: false,
    })
}