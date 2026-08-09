export interface OrderSummaryItem {
  productId: number
  productName: string
  productImageUrl?: string | null
  unitPrice: number
  quantity: number
  subtotal: number
}

export interface OrderSummaryResponse {
  items: OrderSummaryItem[]
  totalAmount: number
  generatedAt: string
}
