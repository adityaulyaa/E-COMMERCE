import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ProductListPage from '../pages/ProductListPage'
import ProductDetailPage from '../pages/ProductDetailPage'

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
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

export default router
