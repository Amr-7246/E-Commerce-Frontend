'use client';

import { createContext, useContext, useState, ReactNode } from "react";
import { Types } from "mongoose";
import { IProduct } from "@/app/admin/api/types/productsType";
import { IOrder, IOrdersContext } from "./OrdersContextType";

// ? Context initialization
  const OrderContext = createContext<IOrdersContext | undefined>(undefined);
  export const OrderProvider = ({ children }: { children: ReactNode }) => {
    // ~ ################## Real Data
        const [currentOrder, setCurrentOrder] = useState<IOrder | null>({
          customer: "",
          seller: "",
          items: [{
            _id: '' ,
            name: '',
            description: '',
            images: [{ secure_url: '' , publicId: '' }],
            variants: [{
              options: [{ name: '' , value: '' }],
              images: [{ secure_url: '', publicId: '' }],
              price: 0,
              inventory: 0 ,
            }],
            price: 0,
            discount: 0,
            category: '', 
            shortDesc: '',
          }],
          totalAmount: 0,
          status: "pending",
          paymentStatus: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    // ~ ################## Real Data
    // ~ ################## create Order Function
      const createOrder = (product: IProduct) => {
        const firstVariant = product.variants?.[0];
      
        // if (!firstVariant) return console.warn("Product has no variants");
      
        const newItem: IProduct  = {
          _id: product._id,
          name: product.name,
          description: product.description,
          images: product.images?.map((img: any) => ({
            secure_url: img.secure_url,
            publicId: img.publicId
          })) ?? [],
          variants: product.variants?.map((variant: any) => ({
            options: variant.options?.map((opt: any) => ({
              name: opt.name,
              value: opt.value
            })) ?? [],
            images: variant.images?.map((img: any) => ({
              secure_url: img.secure_url,
              publicId: img.publicId
            })) ?? [],
            price: variant.price,
            inventory: variant.inventory
          })) ?? [],
          price: product.price,
          discount: product.discount,
          category: product.category,
          shortDesc: product.shortDesc
        };
        console.log('We added the product amr and here is it ' + JSON.stringify(newItem))
        
        setCurrentOrder((prev) => ({
          ...prev!,
          items: [newItem],
          totalAmount: (prev?.totalAmount || 0) ,
          updatedAt: new Date(),
        }));
      };
      console.log('and now here is the order ' + JSON.stringify(currentOrder) )
    // ~ ################## create Order Function
    // ~ ################## clear Order Function
      const clearOrder = () => {
        setCurrentOrder({
          customer: "",
          seller: "",
          items: [{
            _id: '' ,
            name: '',
            description: '',
            images: [{ secure_url: '' , publicId: '' }],
            variants: [{
              options: [{ name: '' , value: '' }],
              images: [{ secure_url: '', publicId: '' }],
              price: 0,
              inventory: 0 ,
            }],
            price: 0,
            discount: 0,
            category: '', 
            shortDesc: '',
          }],
          totalAmount: 0,
          status: "pending",
          paymentStatus: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      };
    // ~ ################## clear Order Function
    
        return (
          <OrderContext.Provider value={{ currentOrder, createOrder, clearOrder , setCurrentOrder }}>
            {children}
          </OrderContext.Provider>
        );
  };
// ? Context initialization
// ? 🔥 Custom hook for accessing order context
  export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrder must be used inside OrderProvider");
    return context;
  };
  // ? 🔥 Custom hook for accessing order context