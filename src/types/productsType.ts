interface IVariantOption {
    name: string; //color :red
    value: string; //size:lg
}
interface IVariant {
    options: IVariantOption[];
    images: { secure_url: string ; publicId: string }[];
    price: number | null ;
    inventory: number | null ;
}

export interface IProduct  {
    _id?: string ;
    name: string;
    recommended: boolean;
    inventory: number | null ;
    description: string;
    images: { secure_url: string | null ; publicId: string }[];
    variants: IVariant[];
    price: number | null ;
    discount: number | null ;
    category: string | number | null ; 
    shortDesc: string;
}