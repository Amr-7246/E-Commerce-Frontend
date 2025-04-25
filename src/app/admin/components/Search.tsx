"use client"

import React, { useState } from 'react';
import { useSearchProducts } from '../api/Hooks/useSearchProducts';

const Search = () => {
    const [query, setQuery] = useState('');
    const { data: products, isLoading, isError } = useSearchProducts(query);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value); 
};

return (
    <div className="p-6 rounded-lg bg-stone-800 w-[90%] min-h-screen text-white">
        <input type="text" placeholder="Search for products..." value={query} onChange={handleInputChange} className="mb-6 p-2 rounded text-black"/>
        {isLoading && (
            <p className="text-green-400 font-bold animate-pulse">Searching for products...</p>
        )}
        {isError && (
            <p className="text-red-400 font-semibold">Error searching products</p>
        )}

        {products && !isLoading && !isError && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; shortDesc: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: number; discount: number; }, idx: React.Key | null | undefined) => (
                <div key={idx} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg p-4 space-y-2 hover:scale-105 transition-all duration-300" >
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-sm text-gray-400">{product.shortDesc}</p>
                    <p className="text-sm text-gray-300">{product.description}</p>
                
                    <div className="flex items-center gap-2">
                        <span className="text-green-400 font-semibold">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-red-400 text-sm line-through">
                                ${(product.price + product.discount).toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
                ))}
            </div>
            ) : (
                !isLoading && !isError && <p className="text-yellow-400 text-lg">No products found</p>
            )}
    </div>
);
};

export default Search;
