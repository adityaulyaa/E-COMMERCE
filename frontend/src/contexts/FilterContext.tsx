import { createContext, useContext, useState, ReactNode } from 'react'

interface FilterContextType {
  category: string
  minPriceUSD: number
  maxPriceUSD: number
  minRating: number
  sortBy: string
  setCategory: (category: string) => void
  setPriceRange: (minUSD: number, maxUSD: number) => void
  setRating: (rating: number) => void
  setSortBy: (sortBy: string) => void
  resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within FilterProvider')
  }
  return context
}

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  // Default max price: 1000 USD (reasonable for most products)
  // Will be overridden by actual product max price when products load
  const DEFAULT_MAX_USD = 1000
  
  const [category, setCategory] = useState<string>('All Categories')
  const [minPriceUSD, setMinPriceUSD] = useState<number>(0)
  const [maxPriceUSD, setMaxPriceUSD] = useState<number>(DEFAULT_MAX_USD)
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>('latest')

  const setPriceRange = (minUSD: number, maxUSD: number) => {
    setMinPriceUSD(minUSD)
    setMaxPriceUSD(maxUSD)
  }

  const setRating = (rating: number) => {
    setMinRating(rating)
  }

  const resetFilters = () => {
    setCategory('All Categories')
    setMinPriceUSD(0)
    setMaxPriceUSD(DEFAULT_MAX_USD)
    setMinRating(0)
    setSortBy('latest')
  }

  return (
    <FilterContext.Provider
      value={{
        category,
        minPriceUSD,
        maxPriceUSD,
        minRating,
        sortBy,
        setCategory,
        setPriceRange,
        setRating,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
