import axios from "axios"

export const EditProducts = async (id : string , data : any) => {
    const res = await axios.patch(`http://localhost:3000/products/${id}`, data)
    return res.data
}