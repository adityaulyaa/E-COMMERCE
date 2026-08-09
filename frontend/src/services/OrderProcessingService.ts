import apiClient from './apiClient'
import type { OrderSummaryResponse } from '../types/checkout'

class OrderProcessingService {
  async checkout(productId?: number, quantity?: number): Promise<OrderSummaryResponse> {
    try {
      const params = new URLSearchParams()
      if (productId) {
        params.append('productId', productId.toString())
      }
      if (quantity) {
        params.append('quantity', quantity.toString())
      }

      const url = `/checkout?${params.toString()}`

      const response = await apiClient.post<OrderSummaryResponse>(url)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Please login to proceed with checkout')
      }

      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Your cart is empty or invalid')
      }

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }

      if (error.message) {
        throw new Error(error.message)
      }

      throw new Error('Failed to process checkout. Please try again.')
    }
  }
}

export default new OrderProcessingService()
