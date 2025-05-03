interface IVariantOption {
    name: string; //color :red
    value: string; //size:lg
}
interface IVariant {
    options: IVariantOption[];
    images: { secure_url: string | undefined; publicId: string }[];
    price: number;
    inventory: number;
}

export interface IProduct  {
    _id?: string ;
    name: string;
    description: string;
    images: { secure_url: string | undefined ; publicId: string }[];
    variants: IVariant[];
    price: number;
    discount: number;
    category: string | number; 
    shortDesc: string;
}