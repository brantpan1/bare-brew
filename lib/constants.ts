export const APP_NAME = 'BOBA'
export const APP_DESCRIPTION = 'Premium packaged bubble tea delivered fresh'
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const CATEGORIES = [
  { id: 'milk-tea', name: 'Milk Tea', slug: 'milk-tea' },
  { id: 'fruit-tea', name: 'Fruit Tea', slug: 'fruit-tea' },
  { id: 'specialty', name: 'Specialty', slug: 'specialty' },
  { id: 'coffee', name: 'Coffee', slug: 'coffee' },
  { id: 'smoothie', name: 'Smoothies', slug: 'smoothie' },
] as const

export const SIZE_OPTIONS = [
  { value: 'regular', label: 'Regular', price: 0 },
  { value: 'large', label: 'Large', price: 1 },
] as const

export const ICE_LEVELS = [
  { value: 'no-ice', label: 'No Ice' },
  { value: 'less-ice', label: 'Less Ice' },
  { value: 'regular', label: 'Regular Ice' },
  { value: 'extra-ice', label: 'Extra Ice' },
] as const

export const SUGAR_LEVELS = [
  { value: '0', label: '0%' },
  { value: '30', label: '30%' },
  { value: '50', label: '50%' },
  { value: '70', label: '70%' },
  { value: '100', label: '100%' },
] as const

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest First' },
] as const
