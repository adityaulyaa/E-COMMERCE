import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ProductListPage from '../pages/ProductListPage'

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
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

export default router
