import apiClient from './apiClient'
import type { Product, ProductListResponse } from '../types/product'

interface FilterParams {
  category?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sortBy?: string
}

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

  // UC-06: Filter Products
  async filterProducts(params: FilterParams): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams()
      
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
      const url = queryString ? `/products/filter?${queryString}` : '/products/filter'
      
      const response = await apiClient.get<ProductListResponse>(url)
      return response.data.products
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      } else if (error.message) {
        throw new Error(error.message)
      } else {
        throw new Error('Failed to filter products. Please try again.')
      }
    }
  }
}

export default new ProductService()
