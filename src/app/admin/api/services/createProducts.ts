import axios from "axios";
import { IProduct } from "../types/productsType";

export const createProduct = async (payload: IProduct ) => {
    const res = await axios.post( 'http://localhost:3000/products', payload)
    return res.data
}

export type { IProduct };
