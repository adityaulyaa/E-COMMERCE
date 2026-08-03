export interface Product {
  productId: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrl: string | null
}

export interface ProductListResponse {
  products: Product[]
}
