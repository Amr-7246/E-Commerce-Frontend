import axios from "axios";

export const searchProducts = async (query: string) => {
    const res = await axios.get(`http://localhost:3000/products?search=${query}`);
    return res.data.data.docs;
}