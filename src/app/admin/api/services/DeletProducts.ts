import axios from "axios"

export const DeletProduct = async (id : string) => {
    const res = await axios.delete(`http://localhost:3000/products/${id}`)
    console.log("We Deleted the product Amr ")
    return res.data
}