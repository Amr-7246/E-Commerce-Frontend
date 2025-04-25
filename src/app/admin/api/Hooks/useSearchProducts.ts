import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../services/searchProducts";

export function useSearchProducts(query: string) {
    return useQuery({
        queryKey: ['searchProducts', query],
        queryFn: async () => {
            if (!query) {
                throw new Error('Query string is required');
            }

            try {
                const data = await searchProducts(query);
                return data; 
            } catch (error) {
                throw new Error('Failed to fetch products');
            }
        },
        enabled: !!query,  
    });
}
