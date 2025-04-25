import { useQuery } from "@tanstack/react-query";
import { filterProducts } from "../services/filterProducts";

import { UseQueryResult } from "@tanstack/react-query";

export function useFilterProducts (params: Record<string , any>): UseQueryResult<any, Error> {
    return useQuery({
        queryKey: ['filterProducts', params],
        queryFn: async () => {
            if (!params) {
                throw new Error('Filter string is required');
            }
            try {
                const data = await filterProducts(params);
                return data; 
            } catch (error) {
                throw new Error('Failed to fetch products');
            }
        },
        enabled: !!params,  
        staleTime: 5000, // Keeps previous data for 5 seconds
    });
}