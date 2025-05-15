'use client';

import { createContext, useContext, useState, ReactNode } from "react";
import { Types } from "mongoose";
import { IProduct } from "@/app/types/productsType";
import { IOrder, IOrdersContext } from "./OrdersContextType";

// ? Context initialization
  const OrderContext = createContext<IOrdersContext | undefined>(undefined);
  export const OrderProvider = ({ children }: { children: ReactNode }) => {
    // ~ ################## Real Data
        const [currentOrder, setCurrentOrder] = useState<IOrder | null>({
          customer: {
              name: "",
              email: "",
              phone: 0,
              address: "",
          },
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
            recommended: false,
            inventory: 0,
          }],
          totalAmount: 0,
          status: "pending",
          paymentStatus: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    // ~ ################## Real Data
    // ~ ################## create Order Function
    const createOrder = (products: IProduct[] | IProduct , customerD : any ) => {
        let newItem: IProduct[] = [];
        if(Array.isArray(products)) {
          products.forEach((product: any) => {
            const item: IProduct = {
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
              shortDesc: product.shortDesc,
              recommended: product.recommended ?? false,
              inventory: product.inventory ?? 0
            };
            newItem.push(item);
          }
        )}else{
          let item: IProduct = {
            _id: products._id,
            name: products.name,
            description: products.description,
            images: products.images?.map((img: any) => ({
              secure_url: img.secure_url,
              publicId: img.publicId
            })) ?? [],
            variants: products.variants?.map((variant: any) => ({
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
            price: products.price,
            discount: products.discount,
            category: products.category,
            shortDesc: products.shortDesc,
            recommended: products.recommended ?? false,
            inventory: products.inventory ?? 0
          };
          newItem.push(item);
        }
        setCurrentOrder((prev) => ({
          ...prev!,
          customer: {
              name: customerD.name,
              email: customerD.email,
              phone: customerD.phone,
              address: customerD.address,
          },
          paymentStatus : 'pending' ,
          seller: "",
          items: newItem,
          totalAmount: (customerD.totalAmount || 0) ,
          updatedAt: new Date(),
        }));
      };
    // ~ ################## create Order Function
    // ~ ################## clear Order Function
      const clearOrder = () => {
        setCurrentOrder({
          customer: {
              name: "",
              email: "",
              phone: 0,
              address: "",
          },
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
            recommended: false,
            inventory: 0
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