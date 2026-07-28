import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'

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
    element: <div>Login Page (Coming Soon - UC-02)</div>,
  },
])

export default router
