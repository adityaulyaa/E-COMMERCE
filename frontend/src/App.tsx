import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { FilterProvider } from './contexts/FilterContext'

function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <RouterProvider router={router} />
      </FilterProvider>
    </AuthProvider>
  )
}

export default App
