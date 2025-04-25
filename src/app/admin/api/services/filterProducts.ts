import axios from "axios";

export const filterProducts = async (params : Record<string, any>) => {
    const res = await axios.get(`http://localhost:3000/products` , {params});
    return res.data;
}