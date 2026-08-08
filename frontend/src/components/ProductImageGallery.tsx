import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  discountPercentage?: number
}

export default function ProductImageGallery({
  images,
  productName,
  discountPercentage,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl aspect-square flex items-center justify-center">
        <span className="text-gray-400 dark:text-gray-600">No image available</span>
      </div>
    )
  }

  const mainImage = images[selectedImageIndex]

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Image Display */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden aspect-square group">
        <img
          src={mainImage}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {discountPercentage && (
          <div className="absolute top-4 left-4 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 font-bold px-3 py-1 rounded-full text-sm">
            -{discountPercentage}%
          </div>
        )}

        {/* Fullscreen Icon */}
        <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100">
          <Maximize2 className="w-5 h-5 text-gray-900 dark:text-white" />
        </button>

        {/* Navigation Arrows (if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === idx
                  ? 'border-orange-500 dark:border-orange-400'
                  : 'border-gray-300 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600'
              }`}
            >
              <img src={image} alt={`${productName} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {selectedImageIndex + 1} of {images.length}
        </p>
      )}
    </div>
  )
}
