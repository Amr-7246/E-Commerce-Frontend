import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const createOrder = async (orderData: any) => {
    const res = await axios.post('http://localhost:3000/orders', orderData)
    return res.data
}
export const UseCreateOrder = () => {
    return useMutation({
        mutationFn: (orderData: any) => createOrder(orderData),
        onSuccess: () => {
            console.log('Order created successfully amr')
        },
        onError: () => {
            console.log('Failed to create order amr ')
        }
    })
}