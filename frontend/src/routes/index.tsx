import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ProductListPage from '../pages/ProductListPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import PaymentPage from '../pages/PaymentPage'
import OrderHistoryPage from '../pages/OrderHistoryPage'
import OrderDetailPage from '../pages/OrderDetailPage'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductListPage />,
  },
  {
    path: '/products',
    element: <ProductListPage />,
  },
  {
    path: '/products/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/cart',
    element: (
      <ProtectedRoute
        title="Login Required"
        message="Please login to view your shopping cart."
      >
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/checkout',
    element: (
      <ProtectedRoute
        title="Login Required"
        message="Please login to continue to checkout."
      >
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/payment',
    element: (
      <ProtectedRoute
        title="Login Required"
        message="Please login to continue with payment."
      >
        <PaymentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute
        title="Login Required"
        message="Please login to view your order history."
      >
        <OrderHistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/orders/:id',
    element: (
      <ProtectedRoute
        title="Login Required"
        message="Please login to view order details."
      >
        <OrderDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

export default router
