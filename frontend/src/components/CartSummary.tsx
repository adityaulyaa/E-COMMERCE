import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { formatToRupiah } from '../utils/formatCurrency'
import type { CartResponse } from '../types/cart'

interface CartSummaryProps {
  cart: CartResponse
}

export default function CartSummary({ cart }: CartSummaryProps) {
  return (
    <aside className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 h-fit lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
        Cart Summary
      </h2>

      <dl className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <dt className="text-gray-600 dark:text-gray-400">Items</dt>
          <dd className="font-medium text-gray-900 dark:text-white">{cart.totalQuantity}</dd>
        </div>
        <div className="flex items-center justify-between text-sm">
          <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
          <dd className="font-medium text-gray-900 dark:text-white">{formatToRupiah(cart.totalAmount)}</dd>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between">
          <dt className="font-semibold text-gray-900 dark:text-white">Total</dt>
          <dd className="text-xl font-bold text-gray-900 dark:text-white">{formatToRupiah(cart.totalAmount)}</dd>
        </div>
      </dl>

      <button
        type="button"
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 dark:bg-amber-600 px-4 py-3 font-semibold text-white hover:bg-amber-700 dark:hover:bg-amber-700 transition-colors"
      >
        <Link to="/checkout" className="w-full inline-flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Checkout
        </Link>
      </button>

      <Link
        to="/products"
        className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Continue Shopping
        <ArrowRight className="w-4 h-4" />
      </Link>
    </aside>
  )
}
