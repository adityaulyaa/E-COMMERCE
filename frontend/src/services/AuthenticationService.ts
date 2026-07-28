import apiClient from './apiClient'
import type { RegisterRequest, RegisterResponse } from '../types/auth'

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
class AuthenticationService {
  /**
   * Register a new customer account
   * 
   * @param registerData - Registration form data
   * @returns Promise with RegisterResponse
   * @throws Error if registration fails
   */
  async register(registerData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(
        '/auth/register',
        registerData
      )
      return response.data
    } catch (error: any) {
      // Re-throw with formatted error message
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors
        const errorMessages = Object.values(validationErrors).join(', ')
        throw new Error(errorMessages)
      } else if (error.message) {
        throw new Error(error.message)
      } else {
        throw new Error('Registration failed. Please try again.')
      }
    }
  }
}

export default new AuthenticationService()
