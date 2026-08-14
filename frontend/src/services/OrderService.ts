import apiClient from './apiClient'
import type { OrderDetailResponse, OrderHistoryResponse } from '../types/order'

class OrderService {
  async getOrderHistory(): Promise<OrderHistoryResponse> {
    try {
      const response = await apiClient.get<OrderHistoryResponse>('/orders')
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Please login to view your orders')
      }

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }

      if (error.message) {
        throw new Error(error.message)
      }

      throw new Error('Failed to load order history. Please try again.')
    }
  }

  async getOrderDetail(orderId: number): Promise<OrderDetailResponse> {
    try {
      const response = await apiClient.get<OrderDetailResponse>(`/orders/${orderId}`)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Please login to view order details')
      }

      if (error.response?.status === 403) {
        throw new Error('You are not authorized to view this order')
      }

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }

      if (error.message) {
        throw new Error(error.message)
      }

      throw new Error('Failed to load order details. Please try again.')
    }
  }
}

export default new OrderService()
