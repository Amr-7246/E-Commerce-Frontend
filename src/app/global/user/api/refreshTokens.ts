import axios from "axios"
import { useEffect } from "react"

// ~ ######## Refresh Function for backend
    export const useRefresh = () => {
        const refresh = async () => {
            // const res = await axios.get('https://e-commerce-backend-production-c023.up.railway.app/auth/refresh' , { withCredentials : true} )
            if (!process.env.NEXT_PUBLIC_BACK_END_URL) {
                throw new Error("NEXT_PUBLIC_BACK_END_URL is not defined");
            }
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/refresh` , { withCredentials: true });
            const { token }= res.data.accessToken
            localStorage.setItem('accessToken' , token )
            console.log("Good amr we refreshed now ")
            return token
        }
        return refresh
    }
// ~ ######## Refresh Function for backend
// ~ ######## Custom slice from Axios liberary
    const CustomAxios = axios.create({
        baseURL : process.env.NEXT_PUBLIC_BACK_END_URL ,
        withCredentials : true
    })
// ~ ######## Custom slice from Axios liberary
// ~ ######## Req/Res interceptor from Axios lib 
    export const useAxiosInterceptor = () => {
        const Refresh = useRefresh()
        useEffect(() => {
            // * ###### Req interceptor F 
                const ReqInterceptor = CustomAxios.interceptors.request.use(
                    (config) => {
                        const Token = localStorage.getItem('accessToken')
                        if (Token) {
                            config.headers.Authorization = `Bearer ${Token}`
                        }
                        return config
                    },
                    (error) => {
                        Promise.reject(error)
                    }
                )
            // * ###### Req interceptor F 
            // * ###### Res interceptor F 
                const ResInterceptor = CustomAxios.interceptors.response.use(
                    response => response ,
                    async (error) => {
                        const PreviousReq = error?.config
                        if (error?.response?.status === 401 && !PreviousReq?.sent) {
                            PreviousReq.sent = true
                            const NewToken = await Refresh()
                            PreviousReq.headers.Authorization = `Bearer ${NewToken}`
                            return CustomAxios(PreviousReq)
                        }
                        return Promise.reject(error)
                    }
                )
            // * ###### Res interceptor F 
            // * ###### Run the tow F
            return () => {
                CustomAxios.interceptors.request.eject(ReqInterceptor)
                CustomAxios.interceptors.response.eject(ResInterceptor)
            }
            // * ###### Run the tow F 
        }, [Refresh])
        return CustomAxios
    }
// ~ ######## Req/Res interceptor from Axios lib 
