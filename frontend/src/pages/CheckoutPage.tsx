import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, AlertCircle, ShoppingCart, User, MapPin, Package } from 'lucide-react'
import Header from '../components/Header'
import OrderProcessingService from '../services/OrderProcessingService'
import addressService from '../services/addressService'
import AddressManagerModal from '../components/AddressManagerModal'
import { useAuth } from '../contexts/AuthContext'
import type { OrderSummaryResponse } from '../types/checkout'
import { Address } from '../types/address'
import { formatToRupiah } from '../utils/formatCurrency'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [orderSummary, setOrderSummary] = useState<OrderSummaryResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      
      const buyNowProductId = searchParams.get('productId')
      const buyNowQuantity = searchParams.get('quantity')

      const [summary, addrList] = await Promise.all([
        OrderProcessingService.checkout(
          buyNowProductId ? parseInt(buyNowProductId, 10) : undefined,
          buyNowQuantity ? parseInt(buyNowQuantity, 10) : undefined
        ),
        addressService.getAddresses()
      ])
      setOrderSummary(summary)
      setAddresses(addrList)
      if (addrList.length > 0) {
        setSelectedAddress(addrList.find(a => a.isDefault) || addrList[0])
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadData()
  }, [])

  const handleBackToCart = () => {
    navigate('/cart')
  }

  const handleContinueToPayment = () => {
    navigate('/payment', { state: { orderSummary } })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Review your order before payment
          </p>
        </div>

        {loading ? (
          <CheckoutLoadingState />
        ) : error ? (
          <CheckoutErrorState error={error} onBackToCart={handleBackToCart} />
        ) : orderSummary ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Stepper */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white font-semibold">1</div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Information</span>
                </div>
                <div className="h-1 w-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 font-semibold">2</div>
                  <span className="text-sm font-medium">Payment</span>
                </div>
                <div className="h-1 w-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 font-semibold">3</div>
                  <span className="text-sm font-medium">Confirm</span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-amber-600" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Customer Information
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-amber-600 text-sm font-semibold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Please confirm your details are correct
                </p>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-bold uppercase tracking-wider">Full Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user?.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-bold uppercase tracking-wider">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-bold uppercase tracking-wider">Shipping Address</p>
                        {selectedAddress ? (
                          <>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                                {selectedAddress.label}
                              </span>
                              <p className="font-bold text-gray-900 dark:text-white">{selectedAddress.recipientName}</p>
                              <span className="text-gray-400">•</span>
                              <p className="text-gray-600 dark:text-gray-300">{selectedAddress.phoneNumber}</p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                              {selectedAddress.streetAddress}, {selectedAddress.city}, {selectedAddress.province}, {selectedAddress.postalCode}
                            </p>
                          </>
                        ) : (
                          <p className="text-red-500 text-sm italic">No address selected. Please add or select an address.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Modal */}
            <AddressManagerModal 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              addresses={addresses}
              selectedAddressId={selectedAddress?.addressId || null}
              onSelect={(id) => {
                const addr = addresses.find(a => a.addressId === id)
                if (addr) setSelectedAddress(addr)
                setIsModalOpen(false)
              }}
              onUpdate={loadData}
            />

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sticky top-20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-600" />
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  {orderSummary.items.map((item) => (
                    <div key={item.productId} className="flex gap-4 text-sm">
                      <div className="h-16 w-16 shrink-0 rounded-md bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        {item.productImageUrl ? (
                          <img src={item.productImageUrl} alt={item.productName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <Package className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.productName}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">x{item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatToRupiah(item.subtotal)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatToRupiah(orderSummary.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium text-gray-900 dark:text-white">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {formatToRupiah(orderSummary.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleBackToCart}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-3 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleContinueToPayment}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

function CheckoutLoadingState() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-pulse">
        <div className="h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-700 mb-4" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="h-96 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse" />
    </div>
  )
}

function CheckoutErrorState({ error, onBackToCart }: { error: string; onBackToCart: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg p-8 text-center">
      <AlertCircle className="w-12 h-12 mx-auto text-red-600 dark:text-red-400 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Checkout Failed
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
      <button
        type="button"
        onClick={onBackToCart}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </button>
    </div>
  )
}
