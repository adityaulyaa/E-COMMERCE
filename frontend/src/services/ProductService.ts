import apiClient from './apiClient'
import type { Product, ProductListResponse } from '../types/product'

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<ProductListResponse>('/products')
      return response.data.products
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      } else if (error.message) {
        throw new Error(error.message)
      } else {
        throw new Error('Failed to fetch products. Please try again.')
      }
    }
  }

  async searchProducts(keyword: string): Promise<Product[]> {
    try {
      const response = await apiClient.get<ProductListResponse>(
        `/products/search?keyword=${encodeURIComponent(keyword)}`
      )
      return response.data.products
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      } else if (error.message) {
        throw new Error(error.message)
      } else {
        throw new Error('Failed to search products. Please try again.')
      }
    }
  }
}

export default new ProductService()
