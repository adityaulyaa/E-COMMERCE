import type { OrderStatus, PaymentMethod, PaymentStatus } from './checkout'

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

export interface OrderItemDetail {
  productNameSnapshot: string
  unitPriceSnapshot: number
  quantity: number
  subtotal: number
}

export interface PaymentDetail {
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentDate: string
}

export interface OrderDetailResponse {
  orderId: number
  orderDate: string
  items: OrderItemDetail[]
  totalAmount: number
  paymentDetail: PaymentDetail
  orderStatus: OrderStatus
}
