import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { formatToRupiah } from '../utils/formatCurrency'
import type { CartItem } from '../types/cart'

interface CartItemRowProps {
  cartItem: CartItem
  onRemove: (cartItemId: number) => void
  onUpdateQuantity: (cartItemId: number, quantity: number) => void
}

export default function CartItemRow({ cartItem, onRemove }: CartItemRowProps) {
  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[96px_1fr_auto] gap-4">
        <Link
          to={`/products/${cartItem.productId}`}
          className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
        >
          {cartItem.productImageUrl ? (
            <img
              src={cartItem.productImageUrl}
              alt={cartItem.productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
              No image
            </div>
          )}
        </Link>

        <div className="min-w-0">
          <Link
            to={`/products/${cartItem.productId}`}
            className="block font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
          >
            {cartItem.productName}
          </Link>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {formatToRupiah(cartItem.productPrice)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center justify-center min-w-[3rem] h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              x{cartItem.quantity}
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatToRupiah(cartItem.subtotal)}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled
          onClick={() => onRemove(cartItem.cartItemId)}
          className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
          title="Remove item"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </article>
  )
}
