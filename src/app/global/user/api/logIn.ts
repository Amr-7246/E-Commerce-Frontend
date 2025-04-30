import axios from "axios"

const LogIn = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
    } , { withCredentials: true })
    return res.data
}
export const useLogIn = () => {
    return {
        mutate: (email: string, password: string) => LogIn(email, password),
        onSuccess: (data : any ) => {
            const { token } = data
            localStorage.setItem("accessToken", token)
            console.log("Login successful amr ")
        },
        onError: () => {
            console.log("sorry amr there is Error logging in ")
        },
    }
}