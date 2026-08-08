export interface CartItem {
  cartItemId: number
  productId: number
  productName: string
  productPrice: number
  productImageUrl?: string | null
  quantity: number
  subtotal: number
}

export interface CartResponse {
  cartId: number
  items: CartItem[]
  totalAmount: number
  totalItems: number
  totalQuantity: number
}
