export interface Product {
  productId: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrls: string[]
  rating: number
}

export interface ProductListResponse {
  products: Product[]
}
