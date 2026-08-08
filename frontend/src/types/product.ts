export interface Product {
  productId: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrls: string[]
  rating: number
  reviewCount: number
  soldCount: number
}

export interface Review {
  reviewId: number
  authorName: string
  rating: number
  comment: string
  createdAt: string // ISO date string
}

export interface ProductListResponse {
  products: Product[]
}
