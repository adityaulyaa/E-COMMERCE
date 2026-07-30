export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export interface RegisterResponse {
  userId: number
  fullName: string
  email: string
  message: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  userId: number
  fullName: string
  email: string
  token: string
  message: string
}

export interface User {
  userId: number
  fullName: string
  email: string
}

export interface ErrorResponse {
  status: number
  message: string
  timestamp: string
  errors?: Record<string, string> | null
}
