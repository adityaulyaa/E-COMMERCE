import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import { formatToRupiah } from '../utils/formatCurrency'
import type { CartItem } from '../types/cart'

interface CartItemRowProps {
  cartItem: CartItem
  onRemove: (cartItemId: number) => Promise<void> | void
  onUpdateQuantity: (cartItemId: number, quantity: number) => Promise<void> | void
}

const UPDATE_DEBOUNCE_MS = 400

export default function CartItemRow({ cartItem, onRemove, onUpdateQuantity }: CartItemRowProps) {
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const [updating, setUpdating] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const [itemError, setItemError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setQuantity(cartItem.quantity)
  }, [cartItem.quantity])

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  const commitUpdate = useCallback(
    async (newQuantity: number) => {
      setUpdating(true)
      setItemError(null)

      try {
        await onUpdateQuantity(cartItem.cartItemId, newQuantity)
      } catch (err: any) {
        setItemError(err.message || 'Failed to update quantity')
        setQuantity(cartItem.quantity)
      } finally {
        setUpdating(false)
      }
    },
    [cartItem.cartItemId, cartItem.quantity, onUpdateQuantity],
  )

  const scheduleUpdate = (newQuantity: number) => {
    setQuantity(newQuantity)
    setItemError(null)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      void commitUpdate(newQuantity)
    }, UPDATE_DEBOUNCE_MS)
  }

  const handleIncrement = () => {
    scheduleUpdate(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      scheduleUpdate(quantity - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value >= 1) {
      scheduleUpdate(value)
    }
  }

  const handleRemove = useCallback(async () => {
    setConfirmingRemove(false)
    setRemoving(true)
    setItemError(null)

    try {
      await onRemove(cartItem.cartItemId)
    } catch (err: any) {
      setItemError(err.message || 'Failed to remove item')
      setQuantity(cartItem.quantity)
    } finally {
      setRemoving(false)
    }
  }, [cartItem.cartItemId, cartItem.quantity, onRemove])

  return (
    <article className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
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
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={updating || quantity <= 1}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                disabled={updating}
                className="w-12 text-center border-l border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1"
                aria-label="Quantity"
              />

              <button
                type="button"
                onClick={handleIncrement}
                disabled={updating}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {updating && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}

            <span className="font-semibold text-gray-900 dark:text-white">
              {formatToRupiah(cartItem.subtotal)}
            </span>
          </div>

          {itemError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{itemError}</p>
          )}
        </div>

        <button
          type="button"
          disabled={removing}
          onClick={() => setConfirmingRemove(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-600 hover:border-red-300 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Remove item"
          aria-label="Remove item"
        >
          {removing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
        </button>
      </div>

      {confirmingRemove && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Remove this item from your cart?
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConfirmingRemove(false)}
              disabled={removing}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleRemove()}
              disabled={removing}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
