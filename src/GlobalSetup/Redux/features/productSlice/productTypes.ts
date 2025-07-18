export interface ProductFormData {
    name: string;
    price: number;
    description: string;
  }
  
  export interface ProductState {
    formData: ProductFormData;
    loading: boolean;
    error: string | null;
  }
  