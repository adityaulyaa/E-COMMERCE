import apiClient from './apiClient'
import type { CartResponse } from '../types/cart'

class ShoppingCartService {
  async getCart(): Promise<CartResponse> {
    try {
      const response = await apiClient.get<CartResponse>('/cart')
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Please login to view your cart')
      }

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }

      if (error.message) {
        throw new Error(error.message)
      }

      throw new Error('Failed to load shopping cart. Please try again.')
    }
  }

  async addToCart(productId: number, quantity: number): Promise<CartResponse> {
    try {
      const response = await apiClient.post<CartResponse>('/cart/items', { productId, quantity })
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Please login to add items to your cart')
      }

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }

      if (error.message) {
        throw new Error(error.message)
      }

      throw new Error('Failed to add item to cart. Please try again.')
    }
  }

  async updateCartItem(cartItemId: number, quantity: number): Promise<CartResponse> {
    try {
      const response = await apiClient.put<CartResponse>(`/cart/items/${cartItemId}`, { quantity })
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Please login to update your cart')
      }

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }

      if (error.message) {
        throw new Error(error.message)
      }

      throw new Error('Failed to update cart item. Please try again.')
    }
  }
}

export default new ShoppingCartService()
