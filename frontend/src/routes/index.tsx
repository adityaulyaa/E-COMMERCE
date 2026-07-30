import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page (Coming Soon)</div>,
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
