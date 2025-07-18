"use client"
import { IProduct } from "@/app/types/productsType";
import { ReactNode, useContext, useState, createContext } from "react";

// ~ ######### User Info Context tybe
export interface ICart {
    products: IProduct[],
    totalPrice: number,
    totalQuantity: number,
}
export interface ICartContext {
    CartProducts: ICart ;
    setCartProducts: React.Dispatch<React.SetStateAction<ICart>>;
}
// ~ ######### User Info Context tybe
// ~ ######### User Info Context itself
    const CartContext = createContext< ICartContext |undefined> (undefined)
    export const CartContextProvider = ({ children }: { children: ReactNode }) => {

        const [CartProducts, setCartProducts] = useState<ICart>({
            products: [],
            totalPrice: 0,
            totalQuantity: 0,
        })

        return (
            <CartContext.Provider value={{CartProducts, setCartProducts }} >
                {children}
            </CartContext.Provider>
        )  
    }
// ~ ######### User Info Context itself
// ~ ######### Hook to use Context
    export const useCartContext = () => {
        const context = useContext(CartContext);
        if (!context) {
            throw new Error("useCartContext must be used inside a CartContextProvider");
        }
        return context;
    }
// ~ ######### Hook to use Context
