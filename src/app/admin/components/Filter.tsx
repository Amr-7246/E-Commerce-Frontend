"use client"
// components/ProductList.tsx
import { useState } from "react";
import { useFilterProducts } from "../api/Hooks/useFilterProducts";
import { IProduct } from "../api/types/productsType";

const ProductList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    search: "",
    sort: "price",
  });

  const { data, isLoading } = useFilterProducts({
    page: filters.page,
    limit: filters.limit,
    sort: filters.sort,
    name: filters.search, // search by name (your backend will use `filter()` on it)
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, sort: e.target.value });
  };

  const handleNextPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const handlePrevPage = () => {
    setFilters((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      {/* 🔍 Search + Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="price">Price ↑</option>
          <option value="-price">Price ↓</option>
          <option value="name">Name A-Z</option>
          <option value="-name">Name Z-A</option>
          <option value="-createdAt">Newest</option>
        </select>
      </div>

      {/* 🌀 Loading State */}
      {isLoading ? (
        <div className="text-center py-12 text-blue-500">Loading... 🔄</div>
      ) : (
        <>
          {/* 🧱 Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data?.data?.docs.map((product : IProduct) => (
              <div key={product._id} className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">${product.price}</p>
              </div>
            ))}
          </div>

          {/* 📄 Pagination */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={filters.page === 1}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
            >
              ⬅️ Prev
            </button>
            <span className="text-sm text-gray-700">Page {filters.page}</span>
            <button
              onClick={handleNextPage}
              disabled={filters.page >= data?.totalPages}
              className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
