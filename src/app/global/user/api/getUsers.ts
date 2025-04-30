import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const GetUsers = async () => {
    const res = await axios.get('http://localhost:3000/user')
    return res.data
}

export const UseGetUsers = () => {
    return useQuery ({
        queryKey : ['user'],
        queryFn : () => {
            try {
                return GetUsers()
            } catch (error) {
                console.log("We could not got the users Amr and here is the error ", error)
                throw error
            }
        },
        retry: false,
    })
}