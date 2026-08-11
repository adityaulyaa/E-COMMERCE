import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatToRupiah } from '../utils/formatCurrency'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.productId}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:scale-105 cursor-pointer">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {product.imageUrls && product.imageUrls.length > 0 ? (
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-600 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Category */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {product.category}
        </p>

        {/* Price */}
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
          {formatToRupiah(product.price)}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span className="text-yellow-500">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 >= 0.5 ? '★' : ''}
            {'☆'.repeat(5 - Math.ceil(product.rating))}
          </span>
          <span className="font-medium">({product.rating.toFixed(1)})</span>
        </div>
      </div>
      </div>
    </Link>
  )
}
