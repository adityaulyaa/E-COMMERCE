import type { OrderStatus, PaymentStatus } from './checkout'

export interface OrderSummary {
  orderId: number
  orderDate: string
  totalAmount: number
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
}

export interface OrderHistoryResponse {
  orders: OrderSummary[]
}
