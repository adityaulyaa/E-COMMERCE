import apiClient from './apiClient'
import type { Product, ProductListResponse } from '../types/product'

interface FilterParams {
  keyword?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sortBy?: string
}

class ProductService {
  // Unified method to fetch products with any combination of filters/search/sort
  async getProducts(params: FilterParams = {}): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams()

      if (params.keyword && params.keyword.trim()) {
        queryParams.append('keyword', params.keyword.trim())
      }

      if (params.category && params.category !== 'All Categories') {
        queryParams.append('category', params.category)
      }

      if (params.minPrice !== undefined && params.minPrice > 0) {
        queryParams.append('minPrice', params.minPrice.toFixed(2))
      }

      if (params.maxPrice !== undefined && params.maxPrice > 0) {
        queryParams.append('maxPrice', params.maxPrice.toFixed(2))
      }

      if (params.minRating !== undefined && params.minRating > 0) {
        queryParams.append('minRating', params.minRating.toFixed(1))
      }

      if (params.sortBy) {
        queryParams.append('sortBy', params.sortBy)
      }

      const queryString = queryParams.toString()
      const url = queryString ? `/products?${queryString}` : '/products'

      const response = await apiClient.get<ProductListResponse>(url)
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

  // Legacy methods kept for backward compatibility, now using getProducts
  async getAllProducts(): Promise<Product[]> {
    return this.getProducts()
  }

  async searchProducts(keyword: string): Promise<Product[]> {
    return this.getProducts({ keyword })
  }

  // UC-06: Filter Products
  async filterProducts(params: FilterParams): Promise<Product[]> {
    return this.getProducts(params)
  }
}

export default new ProductService()
