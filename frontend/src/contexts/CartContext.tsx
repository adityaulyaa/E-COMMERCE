import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import ShoppingCartService from '../services/ShoppingCartService'
import type { CartResponse } from '../types/cart'
import { useAuth } from './AuthContext'

interface CartContextType {
  cart: CartResponse | null
  loading: boolean
  error: string | null
  loadCart: () => Promise<CartResponse | null>
  addToCart: (productId: number, quantity: number) => Promise<void>
  removeFromCart: (cartItemId: number) => Promise<void>
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_MUTATION_UNAVAILABLE = 'Cart updates are not available yet'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [cart, setCart] = useState<CartResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadCart = useCallback(async (): Promise<CartResponse | null> => {
    if (!isAuthenticated) {
      setCart(null)
      setError(null)
      setLoading(false)
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const cartData = await ShoppingCartService.getCart()
      setCart(cartData)
      return cartData
    } catch (err: any) {
      const message = err.message || 'Failed to load shopping cart'
      setError(message)
      setCart(null)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (isAuthenticated) {
      void loadCart().catch(() => undefined)
      return
    }

    setCart(null)
    setError(null)
    setLoading(false)
  }, [authLoading, isAuthenticated, loadCart])

const addToCart = useCallback(async (productId: number, quantity: number): Promise<void> => {
  if (!isAuthenticated) {
    throw new Error('Please login to add items to your cart')
  }

  setLoading(true)
  setError(null)

  try {
    const updatedCart = await ShoppingCartService.addToCart(productId, quantity)
    setCart(updatedCart)
  } catch (err: any) {
    const message = err.message || 'Failed to add item to cart'
    setError(message)
    throw new Error(message)
  } finally {
    setLoading(false)
  }
}, [isAuthenticated])

const unavailableMutation = async (): Promise<void> => {
  throw new Error(CART_MUTATION_UNAVAILABLE)
}

const value: CartContextType = {
  cart,
  loading,
  error,
  loadCart,
  addToCart,
  removeFromCart: unavailableMutation,
  updateQuantity: unavailableMutation,
  clearCart: unavailableMutation,
}

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
