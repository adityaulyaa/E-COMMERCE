import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Truck, RotateCcw, ShieldCheck, Lock, Star } from 'lucide-react'
import Header from '../components/Header'
import ProductImageGallery from '../components/ProductImageGallery'
import QuantitySelector from '../components/QuantitySelector'
import ProductService from '../services/ProductService'
import ReviewService from '../services/ReviewService'
import { formatToRupiah } from '../utils/formatCurrency'
import type { Product, Review } from '../types/product'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (!id) {
      setError('Invalid product ID')
      setLoading(false)
      return
    }

    const productId = parseInt(id, 10)

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [productData, reviewsData] = await Promise.all([
          ProductService.getProductDetail(productId),
          ReviewService.getReviewsByProduct(productId)
        ])
        
        setProduct(productData)
        setReviews(reviewsData)
      } catch (err: any) {
        setError(err.message || 'Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const discountPercentage = 15

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 animate-fade-in">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-gray-900 dark:hover:text-white transition-colors">Shop</Link>
          <span>›</span>
          <span className="text-gray-900 dark:text-white">{product.category}</span>
          <span>›</span>
          <span className="text-gray-900 dark:text-white truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="animate-fade-in">
            <ProductImageGallery
              images={product.imageUrls}
              productName={product.name}
              discountPercentage={discountPercentage}
            />
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'fill-none text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">| {product.soldCount}+ bought</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatToRupiah(product.price)}</span>
                <span className="text-xl line-through text-gray-400 dark:text-gray-600">
                  {formatToRupiah(product.price * 1.18)}
                </span>
                <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 text-xs font-semibold px-2 py-1 rounded">
                  -{discountPercentage}%
                </span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">
                You save {formatToRupiah(product.price * 0.18)} ({discountPercentage}%)
              </p>
            </div>

            <div className="py-4 border-t border-b border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Industry-leading noise canceling with exceptional sound quality. Up to 30-hour battery life and comfortable all-day fit.
              </p>
            </div>

            <QuantitySelector maxQuantity={product.stock} onQuantityChange={setQuantity} />

            <div className="flex gap-3">
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                disabled
                className="flex-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 font-semibold py-3 px-6 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button
                disabled
                className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Heart className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'Orders over $50' },
                { icon: RotateCcw, title: '30-Day Returns', desc: 'Easy returns' },
                { icon: ShieldCheck, title: '2-Year Warranty', desc: 'Full coverage' },
                { icon: Lock, title: 'Secure Checkout', desc: 'Protected payment' },
              ].map((feature, idx) => (
                <div key={idx} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <feature.icon className="w-6 h-6 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{feature.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <nav className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            {['description', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-orange-500 text-orange-600 dark:text-orange-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="prose dark:prose-invert max-w-none">
            {activeTab === 'description' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Product Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Experience premium quality and exceptional performance with the {product.name}. 
                    Designed for comfort and durability, it's the perfect choice for your daily needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="font-semibold w-32">Category</span>
                      <span>{product.category}</span>
                    </li>
                    <li className="flex border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="font-semibold w-32">Availability</span>
                      <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                      </span>
                    </li>
                    <li className="flex border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="font-semibold w-32">Condition</span>
                      <span>Brand New</span>
                    </li>
                    <li className="flex border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="font-semibold w-32">Rating</span>
                      <span>{product.rating.toFixed(1)} / 5.0</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">
                    {product.rating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-none text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Based on {reviews.length} reviews</p>
                  </div>
                </div>

                {reviews.length > 0 ? (
                  <div className="grid gap-6">
                    {reviews.map((review) => (
                      <div key={review.reviewId} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white">{review.authorName}</p>
                            <div className="flex text-yellow-400 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-none text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                          "{review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">No reviews yet for this product.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
