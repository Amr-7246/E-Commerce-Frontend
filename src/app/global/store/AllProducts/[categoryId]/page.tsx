'use client'
import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { UseGetEntities } from '@/APIs/GetEntitiy';
import Cards from '../../components/Cards';
import FilterOptions from './FilterOptions';
import content from '@/AppContent.json';

export default function Page() {
  const params = useParams();
  const { categoryId } = params as { categoryId: string };
  // Fetch category data
  const { data: catData, isLoading: catLoading, isError: catError } = UseGetEntities(`categories/${categoryId}`);
  const category = catData?.data?.doc;

  // Filter state
  const [filter, setFilter] = useState<{ sort?: string; priceGte?: number; priceLte?: number; recommended?: boolean }>({});

  // Build filter query string for Cards
  const filterQuery = useMemo(() => {
    let query = `category=${categoryId}`;
    if (filter.sort) query += `&sort=${filter.sort}`;
    if (filter.priceGte) query += `&price[gte]=${filter.priceGte}`;
    if (filter.priceLte) query += `&price[lte]=${filter.priceLte}`;
    if (filter.recommended) query += `&recommended=true`;
    return query;
  }, [categoryId, filter]);

  if (catLoading) return <div className="flex-center min-h-[40vh] text-xl font-bold text-[var(--text-secondary)]">{content.Categories.loading}</div>;
  if (catError || !category) return <div className="flex-center min-h-[40vh] text-xl font-bold text-[var(--color-error-text)]">{content.Categories.error}</div>;

  return (
    <div className="page">
      {/* <h1 className="text-2xl font-bold text-center text-[var(--text-secondary)] mb-4">{category.name}</h1>
      <p className="text-center text-[var(--inactive-text)] mb-6">{category.description}</p> */}
      <FilterOptions filter={filter} setFilter={setFilter} />
      <Cards category={categoryId} discription={category.description} limit={10} isAll={false} filterQuery={filterQuery} />
    </div>
  );
}