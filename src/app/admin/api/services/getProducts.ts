import axios from "axios"

export const getProducts = async () => {
    const res = await axios.get('http://localhost:3000/products') 
    console.log("We got the products Amr ")
    return res.data.data.docs;
}