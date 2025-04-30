import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const LogOut = async () => {
    const res = await axios.post("http://localhost:3000/auth/logout", {} , { withCredentials: true })
    return res.data
}
export const useLogOut = () => {
    return useMutation({
        mutationFn: () => LogOut(),
        onSuccess: () => {
            localStorage.removeItem("accessToken")
            console.log("Logout successful amr ")
        },
        onError: () => {
            console.log("sorry amr there is Error logging out ")
        },
    })
}