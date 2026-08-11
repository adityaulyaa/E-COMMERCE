import { Link } from 'react-router-dom'
import { Package, ChevronRight } from 'lucide-react'
import type { OrderSummary } from '../types/order'
import { formatToRupiah } from '../utils/formatCurrency'
import StatusBadge from './StatusBadge'

interface OrderListProps {
  orders: OrderSummary[]
}

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link
          key={order.orderId}
          to={`/orders/${order.orderId}`}
          className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  Order #{order.orderId}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(order.orderDate).toLocaleString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {formatToRupiah(order.totalAmount)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <StatusBadge
                  type="payment"
                  status={order.paymentStatus}
                />
                <StatusBadge
                  type="order"
                  status={order.orderStatus}
                />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
