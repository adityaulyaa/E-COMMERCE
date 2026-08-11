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

export type PaymentMethod = 'BANK_TRANSFER' | 'QRIS' | 'E_WALLET'

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED'

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'

export interface PaymentResponse {
  orderId: number | null
  paymentId?: number | null
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus | null
  message: string
  totalAmount: number
}
