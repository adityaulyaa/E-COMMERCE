import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { FilterProvider } from './contexts/FilterContext'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
          <RouterProvider router={router} />
        </FilterProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
