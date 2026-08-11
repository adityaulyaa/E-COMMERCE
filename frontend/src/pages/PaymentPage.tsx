import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertCircle, ShoppingCart, CreditCard, MapPin, User, Package, CheckCircle2, XCircle } from 'lucide-react'
import Header from '../components/Header'
import PaymentMethodSelector, { PaymentMethodType } from '../components/PaymentMethodSelector'
import OrderProcessingService from '../services/OrderProcessingService'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import type { OrderSummaryResponse } from '../types/checkout'
import type { Address } from '../types/address'
import { formatToRupiah } from '../utils/formatCurrency'

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { clearCart } = useCart()
  
  const [orderSummary, setOrderSummary] = useState<OrderSummaryResponse | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [buyNowProductId, setBuyNowProductId] = useState<number | undefined>(undefined)
  const [buyNowQuantity, setBuyNowQuantity] = useState<number | undefined>(undefined)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [failedPaymentId, setFailedPaymentId] = useState<number | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState<{ orderId: number; totalAmount: number } | null>(null)
  const [paymentFailed, setPaymentFailed] = useState<{ orderId: number; totalAmount: number; message: string } | null>(null)

  useEffect(() => {
    const state = location.state as { 
      orderSummary?: OrderSummaryResponse; 
      selectedAddress?: Address;
      buyNowProductId?: number;
      buyNowQuantity?: number;
    }
    
    if (!state?.orderSummary || !state?.selectedAddress) {
      setError('Invalid checkout data. Please start from cart.')
      return
    }

    setOrderSummary(state.orderSummary)
    setSelectedAddress(state.selectedAddress)
    setBuyNowProductId(state.buyNowProductId)
    setBuyNowQuantity(state.buyNowQuantity)
  }, [location.state])

  const handleBackToCheckout = () => {
    navigate('/checkout')
  }

  const handleProceedToPayment = async () => {
    if (!selectedPaymentMethod) {
      setError('Please select a payment method before proceeding.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const paymentResponse = await OrderProcessingService.processPayment(
        selectedPaymentMethod,
        buyNowProductId,
        buyNowQuantity
      )

      if (paymentResponse.paymentStatus === 'SUCCESS') {
        await clearCart()
        
        setPaymentSuccess({
          orderId: paymentResponse.orderId!,
          totalAmount: paymentResponse.totalAmount
        })
      } else {
        setFailedPaymentId(paymentResponse.paymentId || null)
        setPaymentFailed({
          orderId: paymentResponse.orderId!,
          totalAmount: paymentResponse.totalAmount,
          message: paymentResponse.message || 'Payment failed. Please try again.'
        })
        setError(null)
      }
    } catch (err: any) {
      setPaymentFailed({
        orderId: 0,
        totalAmount: orderSummary?.totalAmount || 0,
        message: err.message || 'Payment processing failed. Please try again.'
      })
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  const handleRetryPayment = async () => {
    if (!failedPaymentId) {
      setError('No failed payment to retry.')
      return
    }

    if (!selectedPaymentMethod) {
      setError('Please select a payment method before retrying.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const paymentResponse = await OrderProcessingService.retryPayment(
        failedPaymentId,
        selectedPaymentMethod
      )

      if (paymentResponse.paymentStatus === 'SUCCESS') {
        await clearCart()
        
        setPaymentSuccess({
          orderId: paymentResponse.orderId!,
          totalAmount: paymentResponse.totalAmount
        })
      } else {
        setPaymentFailed({
          orderId: paymentResponse.orderId!,
          totalAmount: paymentResponse.totalAmount,
          message: paymentResponse.message || 'Payment retry failed. Please try again.'
        })
        setError(null)
      }
    } catch (err: any) {
      setPaymentFailed({
        orderId: 0,
        totalAmount: orderSummary?.totalAmount || 0,
        message: err.message || 'Payment retry failed. Please try again.'
      })
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Payment Method
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose your preferred payment method
          </p>
        </div>

        {error && !orderSummary ? (
          <PaymentErrorState error={error} onBackToCheckout={handleBackToCheckout} />
        ) : paymentSuccess ? (
          <PaymentSuccessModal orderId={paymentSuccess.orderId} totalAmount={paymentSuccess.totalAmount} onViewOrders={() => navigate('/orders')} />
        ) : paymentFailed ? (
          <PaymentFailedModal orderId={paymentFailed.orderId} totalAmount={paymentFailed.totalAmount} message={paymentFailed.message} onRetryPayment={() => navigate('/checkout')} />
        ) : orderSummary && selectedAddress ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Stepper */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white font-semibold">✓</div>
                  <span className="text-sm font-medium">Information</span>
                </div>
                <div className="h-1 w-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white font-semibold">2</div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Payment</span>
                </div>
                <div className="h-1 w-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 font-semibold">3</div>
                  <span className="text-sm font-medium">Confirm</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Select Payment Method
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Choose how you want to pay for your order
                </p>

                <PaymentMethodSelector
                  selectedMethod={selectedPaymentMethod}
                  onSelect={setSelectedPaymentMethod}
                />

                {error && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}
              </div>

              {/* Shipping Address Preview */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Shipping Address
                  </h2>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
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
                </div>
              </div>

              {/* Customer Info Preview */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-amber-600" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Customer Information
                  </h2>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
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
                </div>
              </div>
            </div>

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
                    onClick={handleBackToCheckout}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-3 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Checkout
                  </button>
                  <button
                    type="button"
                    onClick={failedPaymentId ? handleRetryPayment : handleProceedToPayment}
                    disabled={!selectedPaymentMethod || loading}
                    className={`w-full flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold text-white transition-colors ${
                      selectedPaymentMethod && !loading
                        ? failedPaymentId
                          ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                          : 'bg-amber-600 hover:bg-amber-700 cursor-pointer'
                        : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {loading ? 'Processing...' : failedPaymentId ? 'Retry Payment' : 'Pay Now'}
                  </button>
                  {!selectedPaymentMethod && !loading && (
                    <p className="text-xs text-red-500 dark:text-red-400 text-center">
                      Please select a payment method first
                    </p>
                  )}
                  {loading && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                      {failedPaymentId ? 'Retrying your payment, please wait...' : 'Processing your payment, please wait...'}
                    </p>
                  )}
                  {error && orderSummary && (
                    <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

function PaymentErrorState({ error, onBackToCheckout }: { error: string; onBackToCheckout: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg p-8 text-center">
      <AlertCircle className="w-12 h-12 mx-auto text-red-600 dark:text-red-400 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Payment Method Selection Failed
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
      <button
        type="button"
        onClick={onBackToCheckout}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Checkout
      </button>
    </div>
  )
}

function PaymentSuccessModal({ orderId, totalAmount, onViewOrders }: { orderId: number; totalAmount: number; onViewOrders: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <svg className="absolute inset-0 w-24 h-24 -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="44"
                fill="none"
                stroke="url(#greenGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="276.46"
                strokeDashoffset="276.46"
                style={{
                  animation: 'drawCircle 2s ease-in-out infinite'
                }}
              />
              <defs>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
          </div>
          <style>{`
            @keyframes drawCircle {
              0% {
                stroke-dashoffset: 276.46;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Your order has been placed successfully
        </p>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-800">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Order ID</span>
              <span className="font-semibold text-gray-900 dark:text-white">#{orderId}</span>
            </div>
            <div className="w-full h-px bg-green-200 dark:bg-green-800"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount</span>
              <span className="font-bold text-lg text-green-600 dark:text-green-400">{formatToRupiah(totalAmount || 0)}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewOrders}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          View My Orders
        </button>
      </div>
    </div>
  )
}

function PaymentFailedModal({ orderId, totalAmount, message, onRetryPayment }: { orderId: number; totalAmount: number; message: string; onRetryPayment: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <svg className="absolute inset-0 w-24 h-24 -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="44"
                fill="none"
                stroke="url(#redGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="276.46"
                strokeDashoffset="276.46"
                style={{
                  animation: 'drawCircle 2s ease-in-out infinite'
                }}
              />
              <defs>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Payment Failed
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>

        <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-lg p-4 mb-6 border border-red-200 dark:border-red-800">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Order ID</span>
              <span className="font-semibold text-gray-900 dark:text-white">#{orderId}</span>
            </div>
            <div className="w-full h-px bg-red-200 dark:bg-red-800"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount</span>
              <span className="font-bold text-lg text-red-600 dark:text-red-400">{formatToRupiah(totalAmount || 0)}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onRetryPayment}
          className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Retry Payment
        </button>
      </div>
    </div>
  )
}
