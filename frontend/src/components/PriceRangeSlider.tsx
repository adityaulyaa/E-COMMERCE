import { useState, useEffect, useRef } from 'react'
import { formatIdrCurrency, roundPriceToStep } from '../utils/formatCurrency'

interface PriceRangeSliderProps {
  minPriceIDR: number
  maxPriceIDR: number
  stepIDR?: number
  onPriceChange?: (min: number, max: number) => void
}

/**
 * Price Range Slider Component
 * Works entirely in IDR with smooth drag + snap to nearest step
 * Visual design like Cartesian coordinates with tick marks
 * 
 * Example: Rp 0 | 500K | 1M | 1.5M | 2M | ...
 */
export default function PriceRangeSlider({
  minPriceIDR: initialMin = 0,
  maxPriceIDR: initialMax = 10000000,
  stepIDR = 500000,
  onPriceChange,
}: PriceRangeSliderProps) {
  const [minPrice, setMinPrice] = useState(initialMin)
  const [maxPrice, setMaxPrice] = useState(initialMax)
  const [isDraggingMin, setIsDraggingMin] = useState(false)
  const [isDraggingMax, setIsDraggingMax] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Update state when props change
  useEffect(() => {
    setMinPrice(initialMin)
    setMaxPrice(initialMax)
  }, [initialMin, initialMax])

  // Calculate total steps
  const totalSteps = Math.ceil((initialMax - initialMin) / stepIDR)

  // Convert price to percentage for visual positioning
  const priceToPercent = (price: number): number => {
    const range = initialMax - initialMin
    return ((price - initialMin) / range) * 100
  }

  // Convert percentage to price
  const percentToPrice = (percent: number): number => {
    const range = initialMax - initialMin
    return initialMin + (percent / 100) * range
  }

  // Snap to nearest step
  const snapToStep = (price: number): number => {
    return roundPriceToStep(price, stepIDR)
  }

  // Handle mouse/touch move for min slider
  const handleMinMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const percent = ((clientX - rect.left) / rect.width) * 100
    let newPrice = percentToPrice(Math.max(0, Math.min(100, percent)))

    // Snap to nearest step
    newPrice = snapToStep(newPrice)

    // Prevent min from exceeding max
    if (newPrice <= maxPrice) {
      setMinPrice(newPrice)
      onPriceChange?.(newPrice, maxPrice)
    }
  }

  // Handle mouse/touch move for max slider
  const handleMaxMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const percent = ((clientX - rect.left) / rect.width) * 100
    let newPrice = percentToPrice(Math.max(0, Math.min(100, percent)))

    // Snap to nearest step
    newPrice = snapToStep(newPrice)

    // Prevent max from going below min
    if (newPrice >= minPrice) {
      setMaxPrice(newPrice)
      onPriceChange?.(minPrice, newPrice)
    }
  }

  // Handle mouse/touch end
  const handleMouseUp = () => {
    setIsDraggingMin(false)
    setIsDraggingMax(false)
  }

  // Setup global listeners for drag
  useEffect(() => {
    if (isDraggingMin) {
      document.addEventListener('mousemove', handleMinMouseMove)
      document.addEventListener('touchmove', handleMinMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchend', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMinMouseMove)
        document.removeEventListener('touchmove', handleMinMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDraggingMin, minPrice, maxPrice])

  useEffect(() => {
    if (isDraggingMax) {
      document.addEventListener('mousemove', handleMaxMouseMove)
      document.addEventListener('touchmove', handleMaxMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchend', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMaxMouseMove)
        document.removeEventListener('touchmove', handleMaxMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDraggingMax, minPrice, maxPrice])

  // Reset to defaults
  const handleReset = () => {
    setMinPrice(initialMin)
    setMaxPrice(initialMax)
    onPriceChange?.(initialMin, initialMax)
  }

  // Calculate percentages for visual positioning
  const minPercent = priceToPercent(minPrice)
  const maxPercent = priceToPercent(maxPrice)

  // Generate tick marks for Cartesian-like display
  const generateTicks = (): number[] => {
    const ticks: number[] = []
    for (let i = 0; i <= totalSteps; i++) {
      ticks.push(initialMin + i * stepIDR)
    }
    return ticks
  }

  const ticks = generateTicks()

  return (
    <div className="space-y-6">
      {/* Price Range Display - Vertical Stacked */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700/50 space-y-3">
        {/* Min Price */}
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Min Price</p>
          <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 truncate">
            {formatIdrCurrency(minPrice)}
          </p>
        </div>

        {/* Range Separator */}
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Range</p>
          <p className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300">
            -
          </p>
        </div>

        {/* Max Price */}
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Max Price</p>
          <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 truncate">
            {formatIdrCurrency(maxPrice)}
          </p>
        </div>
      </div>

      {/* Slider Container with Cartesian-style grid */}
      <div className="space-y-2">
        {/* Main Slider Track */}
        <div
          ref={sliderRef}
          className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer group overflow-hidden"
          onMouseDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const percent = ((e.clientX - rect.left) / rect.width) * 100
            const clickPrice = percentToPrice(Math.max(0, Math.min(100, percent)))
            const snappedPrice = snapToStep(clickPrice)

            // Determine which thumb to move
            if (Math.abs(snappedPrice - minPrice) < Math.abs(snappedPrice - maxPrice)) {
              setMinPrice(Math.min(snappedPrice, maxPrice))
              setIsDraggingMin(true)
              onPriceChange?.(Math.min(snappedPrice, maxPrice), maxPrice)
            } else {
              setMaxPrice(Math.max(snappedPrice, minPrice))
              setIsDraggingMax(true)
              onPriceChange?.(minPrice, Math.max(snappedPrice, minPrice))
            }
          }}
        >
          {/* Tick Marks - Cartesian grid visualization */}
          <div className="absolute inset-0 flex items-center">
            {ticks.map((tick, idx) => {
              const tickPercent = priceToPercent(tick)
              return (
                <div
                  key={idx}
                  className="absolute h-3 w-0.5 bg-gray-300 dark:bg-gray-600 top-1/2 transform -translate-y-1/2 group-hover:bg-gray-400 dark:group-hover:bg-gray-500 transition-colors"
                  style={{
                    left: `${tickPercent}%`,
                  }}
                />
              )
            })}
          </div>

          {/* Background track */}
          <div className="absolute inset-0 h-2 top-3 bg-gray-300 dark:bg-gray-700 rounded-full" />

          {/* Active range (between min and max) */}
          <div
            className="absolute h-2 top-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-500 rounded-full shadow-md transition-all"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />

          {/* Min Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-700 rounded-full border-2 border-blue-500 dark:border-blue-400 shadow-lg cursor-grab active:cursor-grabbing transition-all ${
              isDraggingMin ? 'scale-125 shadow-2xl' : 'hover:scale-110'
            }`}
            style={{
              left: `${minPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseDown={() => setIsDraggingMin(true)}
            onTouchStart={() => setIsDraggingMin(true)}
          >
            <div className="absolute inset-1 bg-blue-500 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>

          {/* Max Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-700 rounded-full border-2 border-blue-500 dark:border-blue-400 shadow-lg cursor-grab active:cursor-grabbing transition-all ${
              isDraggingMax ? 'scale-125 shadow-2xl' : 'hover:scale-110'
            }`}
            style={{
              left: `${maxPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseDown={() => setIsDraggingMax(true)}
            onTouchStart={() => setIsDraggingMax(true)}
          >
            <div className="absolute inset-1 bg-blue-500 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>
        </div>

        {/* Cartesian Coordinates Labels - Mobile optimized */}
        <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
          <span>Rp 0</span>
          <span className="hidden sm:inline">Rp {(totalSteps * stepIDR / 2 / 1000000).toFixed(1)}M</span>
          <span>Rp {(totalSteps * stepIDR / 1000000).toFixed(1)}M</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200 active:scale-95"
      >
        Reset Price Range
      </button>
    </div>
  )
}
