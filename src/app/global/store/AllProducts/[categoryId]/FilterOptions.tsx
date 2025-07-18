import React from 'react'
import { FaSortAmountDown, FaSortAmountUp, FaStar, FaMoneyBillWave } from 'react-icons/fa'
import content from '@/AppContent.json'

const filterOptions = [
  { id: 'sortLow', label: content.allProducts.lowestPrice, icon: <FaSortAmountDown />, sort: 'price' },
  { id: 'sortHigh', label: content.allProducts.highestPrice, icon: <FaSortAmountUp />, sort: '-price' },
  { id: 'recommended', label: content.allProducts.recommended, icon: <FaStar />, recommended: true },
]

const FilterOptions = ({ filter, setFilter }: {
  filter: any,
  setFilter: (f: any) => void
}) => {
  // Handlers
  const handleOptionClick = (option: any) => {
    if (option.sort) {
      setFilter((prev: any) => ({ ...prev, sort: prev.sort === option.sort ? undefined : option.sort }))
    } else if (option.recommended) {
      setFilter((prev: any) => ({ ...prev, recommended: !prev.recommended }))
    }
  }

  // Price range handlers (for demo, static values)
  const handlePriceRange = (min: number, max: number) => {
    setFilter((prev: any) => ({ ...prev, priceGte: min, priceLte: max }))
  }

  return (
    <nav className="w-full flex flex-row items-center justify-center gap-4 mb-6 border-b border-[var(--border)] pb-6 ">
      {filterOptions.map((option : any ) => (
        <button
          key={option.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold cursor-pointer text-[var(--text-primary)] border border-[var(--border)] transition-all duration-300 ${
            (option.sort && filter.sort === option.sort) || (option.recommended && filter.recommended)
              ? 'bg-[var(--btn-I)] text-[var(--text-inverted)]' : 'bg-transparent'
          }`}
          onClick={() => handleOptionClick(option)}
          type="button"
        >
          <span className="text-lg">{option.icon}</span>
          <span className="text-base">{option.label}</span>
        </button>
      ))}
      {/* Example price range filter (static) */}
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold cursor-pointer text-[var(--text-primary)] border border-[var(--border)] transition-all duration-300 ${filter.priceGte === 0 && filter.priceLte === 100 ? 'bg-[var(--btn-I)] text-[var(--text-inverted)]' : 'bg-transparent'}`}
        onClick={() => handlePriceRange(0, 100)}
        type="button"
      >
        <span className="text-lg"><FaMoneyBillWave /></span>
        <span className="text-base">0-100</span>
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold cursor-pointer text-[var(--text-primary)] border border-[var(--border)] transition-all duration-300 ${filter.priceGte === 100 && filter.priceLte === 500 ? 'bg-[var(--btn-I)] text-[var(--text-inverted)]' : 'bg-transparent'}`}
        onClick={() => handlePriceRange(100, 500)}
        type="button"
      >
        <span className="text-lg"><FaMoneyBillWave /></span>
        <span className="text-base">100-500</span>
      </button>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold cursor-pointer text-[var(--text-primary)] border border-[var(--border)] transition-all duration-300 ${filter.priceGte === 500 && filter.priceLte === 10000 ? 'bg-[var(--btn-I)] text-[var(--text-inverted)]' : 'bg-transparent'}`}
        onClick={() => handlePriceRange(500, 10000)}
        type="button"
      >
        <span className="text-lg"><FaMoneyBillWave /></span>
        <span className="text-base">500+</span>
      </button>
    </nav>
  )
}

export default FilterOptions