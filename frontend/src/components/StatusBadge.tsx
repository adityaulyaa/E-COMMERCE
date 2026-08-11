import type { OrderStatus, PaymentStatus } from '../types/checkout'

interface StatusBadgeProps {
  type: 'payment' | 'order'
  status: OrderStatus | PaymentStatus
}

export default function StatusBadge({ type, status }: StatusBadgeProps) {
  const isSuccess = status === 'SUCCESS' || status === 'COMPLETED'
  const isFailed = status === 'FAILED' || status === 'CANCELLED'
  const isPending = status === 'PENDING' || status === 'PROCESSING'

  const badgeClass = isSuccess
    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
    : isFailed
    ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
    : isPending
    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'

  const label = type === 'payment'
    ? paymentStatusLabel(status as PaymentStatus)
    : orderStatusLabel(status as OrderStatus)

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
      {label}
    </span>
  )
}

export function paymentStatusLabel(status: PaymentStatus): string {
  switch (status) {
    case 'SUCCESS':
      return 'Paid'
    case 'FAILED':
      return 'Payment Failed'
    case 'PENDING':
      return 'Payment Pending'
    default:
      return status
  }
}

export function orderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case 'COMPLETED':
      return 'Completed'
    case 'PROCESSING':
      return 'Processing'
    case 'PENDING':
      return 'Pending'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}
