import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronDown, Grid3x3, List, X } from 'lucide-react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import PriceRangeSlider from '../components/PriceRangeSlider'
import ProductService from '../services/ProductService'
import type { Product } from '../types/product'

export default function ProductListPage() {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchProducts()
  }, [keyword])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = keyword.trim()
        ? await ProductService.searchProducts(keyword.trim())
        : await ProductService.getAllProducts()
      setProducts(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    fetchProducts()
  }

  // Calculate dynamic min and max prices from products (in IDR)
  const getPriceRange = () => {
    if (products.length === 0) {
      return { min: 0, max: 10000000 } // Default: Rp 0 - Rp 10M
    }

    // Convert all USD prices to IDR
    const USD_TO_IDR = 15700
    const pricesIDR = products.map(p => p.price * USD_TO_IDR)
    const maxPriceIDR = Math.max(...pricesIDR)

    // Round UP to nearest Rp 500,000
    const PRICE_STEP = 500000
    const maxRounded = Math.ceil(maxPriceIDR / PRICE_STEP) * PRICE_STEP

    return { 
      min: 0, // Always start from Rp 0
      max: maxRounded 
    }
  }

  const priceRange = getPriceRange()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 mb-6 animate-fade-in">
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-2xl">
          <img
            src="/src/assets/heroSectionproductlistpage.png"
            alt="Hero Section"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-colors duration-300" />
          
          {/* Breadcrumb inside hero - top left */}
          <nav className="absolute top-4 left-6 flex items-center gap-2 text-sm text-black">
            <a href="/" className="hover:text-gray-800 transition-colors">
              Home
            </a>
            <span>›</span>
            <span>Shop</span>
          </nav>

          <div className="absolute inset-0 flex flex-col justify-center pl-6 sm:pl-12">
            <div className="max-w-md">
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white leading-tight animate-slide-up">
                All Products
              </h1>
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Discover our best picks<br />
                and shop what you love.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Left Column */}
          <aside className="lg:col-span-1">
            {/* Sidebar Card Wrapper */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300 animate-fade-in">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                    🔲 All Categories <span className="float-right text-gray-500">12</span>
                  </button>
                </li>
                {[
                  { icon: '📱', name: 'Electronics', count: 3 },
                  { icon: '🏠', name: 'Home & Living', count: 3 },
                  { icon: '👔', name: 'Fashion', count: 3 },
                  { icon: '💄', name: 'Beauty', count: 2 },
                  { icon: '⚽', name: 'Sports', count: 0 },
                  { icon: '📚', name: 'Books', count: 1 },
                  { icon: '🧸', name: 'Toys & Games', count: 0 },
                ].map((cat) => (
                  <li key={cat.name}>
                    <button
                      disabled
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors cursor-not-allowed opacity-60"
                    >
                      {cat.icon} {cat.name} <span className="float-right text-gray-500">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Price Range
              </h3>
              <PriceRangeSlider 
                minPriceIDR={priceRange.min} 
                maxPriceIDR={priceRange.max}
                stepIDR={500000}
                onPriceChange={(minIDR, maxIDR) => {
                  // Convert IDR back to USD for backend API (UC-06 filter)
                  const USD_TO_IDR = 15700
                  const minUSD = minIDR / USD_TO_IDR
                  const maxUSD = maxIDR / USD_TO_IDR
                  console.log(`Price filter (IDR): ${minIDR} - ${maxIDR}`)
                  console.log(`Price filter (USD): ${minUSD.toFixed(2)} - ${maxUSD.toFixed(2)}`)
                  // This will be connected to filter functionality in UC-06
                }}
              />
            </div>

            {/* Rating */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Rating
              </h3>
              <div className="space-y-2">
                {[
                  { stars: 5, count: 120 },
                  { stars: 4, count: 86 },
                  { stars: 3, count: 62 },
                  { stars: 2, count: 18 },
                  { stars: 1, count: 8 },
                ].map((rating) => (
                  <label key={rating.stars} className="flex items-center gap-3 cursor-not-allowed opacity-60">
                    <input
                      type="checkbox"
                      disabled
                      className="w-4 h-4 rounded cursor-not-allowed"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {'⭐'.repeat(rating.stars)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            </div>
          </aside>

          {/* Main Content - Right Column */}
          <main className="lg:col-span-3">
          {/* Render based on state */}
          {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={handleRetry} /> : products.length === 0 ? <EmptyState keyword={keyword} /> : <ProductGrid products={products} viewMode={viewMode} keyword={keyword} />}
          </main>
        </div>
      </div>
    </div>
  )
}

/* Loading State Component */
function LoadingState() {
  return (
    <div>
      {/* Category Chips Skeleton */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0" />
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ))}
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Empty State Component */
function EmptyState({ keyword }: { keyword?: string }) {
  if (keyword) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No products found for "{keyword}"
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Try different keywords or browse all products
        </p>
        <Link
          to="/products"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Clear Search
        </Link>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4">📦</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        No products available
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Start adding products to see them displayed here.
      </p>
    </div>
  )
}

/* Error State Component */
function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
        Failed to load products
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>
  )
}

/* Product Grid Component */
function ProductGrid({ products, viewMode, keyword }: { products: Product[]; viewMode: 'grid' | 'list'; keyword?: string }) {
  return (
    <div>
      {/* Search Summary */}
      {keyword && (
        <div className="mb-6 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-bold text-blue-600 dark:text-blue-400">{products.length}</span> results for "<span className="font-semibold">{keyword}</span>"
            </span>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Search
          </Link>
        </div>
      )}

      {/* Category Chips Row */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {[
          { icon: '🔲', name: 'All' },
          { icon: '📱', name: 'Electronics' },
          { icon: '🏠', name: 'Home & Living' },
          { icon: '👔', name: 'Fashion' },
          { icon: '💄', name: 'Beauty' },
          { icon: '⚽', name: 'Sports' },
          { icon: '🧸', name: 'Toys & Games' },
        ].map((cat, idx) => (
          <button
            key={idx}
            disabled
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors cursor-not-allowed opacity-60 ${
              idx === 0
                ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-wrap gap-3 mb-6 justify-between items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-wrap gap-2">
          {['Price', 'Rating', 'Brand', 'Color', 'Availability'].map((filter) => (
            <button
              key={filter}
              disabled
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-not-allowed opacity-60 flex items-center gap-1"
            >
              {filter} <ChevronDown className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <button
            disabled
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-not-allowed opacity-60 flex items-center gap-1"
          >
            Featured <ChevronDown className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => {
                // View mode toggle will be implemented in future
              }}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white dark:bg-blue-600'
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                // View mode toggle will be implemented in future
              }}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white dark:bg-blue-600'
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  )
}
