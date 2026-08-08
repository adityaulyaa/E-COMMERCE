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
}

export default new ShoppingCartService()
