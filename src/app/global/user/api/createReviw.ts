import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const createReview = async (review : any) => {
    const res = await axios.post('http://localhost:3000/review', review )
    return res.data
}
export const UseCreateReview = () => {
    return useMutation({
        mutationFn: (review : any) => createReview(review ),
        onSuccess: () => {
            console.log('review created successfully amr')
        },
        onError: () => {
            console.log('Failed to create review amr ')
        }
    })
}