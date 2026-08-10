import { CreditCard, QrCode, Wallet } from 'lucide-react'

export type PaymentMethodType = 'BANK_TRANSFER' | 'QRIS' | 'E_WALLET'

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType | null
  onSelect: (method: PaymentMethodType) => void
}

const PAYMENT_METHODS: Array<{
  id: PaymentMethodType
  name: string
  description: string
  icon: React.ReactNode
}> = [
  {
    id: 'BANK_TRANSFER',
    name: 'Bank Transfer',
    description: 'Transfer via bank',
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    id: 'QRIS',
    name: 'QRIS',
    description: 'Quick Response Code',
    icon: <QrCode className="w-6 h-6" />,
  },
  {
    id: 'E_WALLET',
    name: 'E-Wallet',
    description: 'Digital wallet payment',
    icon: <Wallet className="w-6 h-6" />,
  },
]

export default function PaymentMethodSelector({
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      {PAYMENT_METHODS.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`w-full p-4 rounded-lg border-2 transition-all flex items-start gap-3 text-left ${
            selectedMethod === method.id
              ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-amber-300'
          }`}
        >
          <div
            className={`mt-1 ${
              selectedMethod === method.id
                ? 'text-amber-600'
                : 'text-gray-400'
            }`}
          >
            {method.icon}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-white">
              {method.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {method.description}
            </p>
          </div>
          <input
            type="radio"
            checked={selectedMethod === method.id}
            onChange={() => onSelect(method.id)}
            className="mt-1 cursor-pointer"
            aria-label={`Select ${method.name}`}
          />
        </button>
      ))}
    </div>
  )
}
