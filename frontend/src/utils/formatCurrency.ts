// Exchange rate USD to IDR (1 USD ≈ Rp 15,700)
const USD_TO_IDR_RATE = 15700

/**
 * Convert USD to IDR
 * @param usdAmount - Amount in USD
 * @returns Amount in IDR
 */
export const convertUsdToIdr = (usdAmount: number): number => {
  return usdAmount * USD_TO_IDR_RATE
}

/**
 * Convert IDR to USD
 * @param idrAmount - Amount in IDR
 * @returns Amount in USD
 */
export const convertIdrToUsd = (idrAmount: number): number => {
  return idrAmount / USD_TO_IDR_RATE
}

/**
 * Round price to nearest step
 * @param price - Price to round
 * @param step - Step size
 * @returns Rounded price
 * @example roundPriceToStep(550000, 500000) => 500000
 */
export const roundPriceToStep = (price: number, step: number): number => {
  return Math.round(price / step) * step
}

/**
 * Round UP price to nearest step (for max boundaries)
 * @param price - Price to round up
 * @param step - Step size
 * @returns Rounded up price
 * @example roundUpToStep(550000, 500000) => 1000000
 */
export const roundUpToStep = (price: number, step: number): number => {
  return Math.ceil(price / step) * step
}

/**
 * Format number to Indonesian Rupiah (Rp)
 * Converts USD to IDR automatically
 * @param amount - Amount in USD to format
 * @returns Formatted string with Rp prefix
 * @example formatToRupiah(349.00) => "Rp 5.478.300"
 */
export const formatToRupiah = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (isNaN(numAmount)) {
    return 'Rp 0'
  }

  // Convert USD to IDR
  const idrAmount = convertUsdToIdr(numAmount)

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(idrAmount)
}

/**
 * Format number to Indonesian Rupiah with decimal places
 * Converts USD to IDR automatically
 * @param amount - Amount in USD to format
 * @param decimals - Number of decimal places (default 2)
 * @returns Formatted string with Rp prefix
 * @example formatToRupiahWithDecimals(349.50, 2) => "Rp 5.486.150,00"
 */
export const formatToRupiahWithDecimals = (
  amount: number | string,
  decimals: number = 2
): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (isNaN(numAmount)) {
    return 'Rp 0'
  }

  // Convert USD to IDR
  const idrAmount = convertUsdToIdr(numAmount)

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(idrAmount)
}

/**
 * Format IDR amount directly (NO USD conversion)
 * Use this when amount is already in IDR
 * @param idrAmount - Amount already in IDR
 * @returns Formatted string with Rp prefix
 * @example formatIdrCurrency(12000000) => "Rp 12.000.000"
 */
export const formatIdrCurrency = (idrAmount: number | string): string => {
  const numAmount = typeof idrAmount === 'string' ? parseFloat(idrAmount) : idrAmount
  
  if (isNaN(numAmount)) {
    return 'Rp 0'
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount)
}
