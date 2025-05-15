import { IProduct } from "@/app/types/productsType";

// ? Type definitions matching your backend schema

export type IOrder = {
    customer: {
        name: string;
        email: string;
        phone: number;
        address: string;
    },
    seller: string;
    items: IProduct[];
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed";
    createdAt?: Date;
    updatedAt?: Date;
};

export type IOrdersContext = {
    currentOrder: IOrder | null;
    createOrder: (product: IProduct[] | IProduct  , customerD : any ) => void;
    clearOrder: () => void;
    setCurrentOrder?: React.Dispatch<React.SetStateAction<IOrder | null>>;
};
// ? Type definitions matching your backend schema