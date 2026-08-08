import apiClient from './apiClient'
import type { Review } from '../types/product'

class ReviewService {
  async getReviewsByProduct(productId: number): Promise<Review[]> {
    try {
      const response = await apiClient.get<Review[]>(`/products/${productId}/reviews`)
      return response.data
    } catch (error: any) {
      console.error('Error fetching reviews:', error)
      return [] // Return empty list instead of throwing to avoid breaking UI
    }
  }
}

export default new ReviewService()
