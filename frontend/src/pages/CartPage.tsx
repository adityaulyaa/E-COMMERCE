import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, Package, RefreshCw, ShoppingCart } from 'lucide-react'
import Header from '../components/Header'
import CartItemRow from '../components/CartItemRow'
import CartSummary from '../components/CartSummary'
import { useCart } from '../contexts/CartContext'

export default function CartPage() {
  const { cart, loading, error, loadCart, removeFromCart, updateQuantity } = useCart()

  useEffect(() => {
    if (!cart && !loading) {
      void loadCart().catch(() => undefined)
    }
  }, [cart, loading, loadCart])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShoppingCart className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Shopping Cart
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Review your selected items before checkout.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <CartLoadingState />
        ) : error ? (
          <CartErrorState error={error} onRetry={loadCart} />
        ) : !cart || cart.items.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <section className="space-y-4">
              {cart.items.map((item) => (
                <CartItemRow
                  key={item.cartItemId}
                  cartItem={item}
                  onRemove={(cartItemId) => {
                    void removeFromCart(cartItemId)
                  }}
                  onUpdateQuantity={(cartItemId, quantity) => {
                    void updateQuantity(cartItemId, quantity)
                  }}
                />
              ))}
            </section>

            <CartSummary cart={cart} />
          </div>
        )}
      </main>
    </div>
  )
}

function CartLoadingState() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <section className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse">
            <div className="grid grid-cols-[96px_1fr] gap-4">
              <div className="h-24 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-3">
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-9 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </section>
      <div className="h-64 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse" />
    </div>
  )
}

function CartErrorState({ error, onRetry }: { error: string; onRetry: () => Promise<unknown> }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg p-8 text-center">
      <AlertCircle className="w-12 h-12 mx-auto text-red-600 dark:text-red-400 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Failed to load cart
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
      <button
        type="button"
        onClick={() => {
          void onRetry()
        }}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  )
}

function EmptyCartState() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-10 text-center">
      <Package className="w-14 h-14 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Shopping Cart is empty
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Browse products and find something you love.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        Go to Products
      </Link>
    </div>
  )
}
