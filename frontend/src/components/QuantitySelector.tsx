import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  maxQuantity: number
  onQuantityChange: (quantity: number) => void
  initialQuantity?: number
}

export default function QuantitySelector({
  maxQuantity,
  onQuantityChange,
  initialQuantity = 1,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onQuantityChange(newQuantity)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onQuantityChange(newQuantity)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value)
      onQuantityChange(value)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Quantity:
      </label>
      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min="1"
          max={maxQuantity}
          className="w-12 text-center border-l border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1"
        />

        <button
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Max: {maxQuantity}
      </span>
    </div>
  )
}
