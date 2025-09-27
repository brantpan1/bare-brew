'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product, ProductVariant } from '@/types/product'
import { CartItem } from '@/types/cart'
import { toast } from 'sonner'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number,
  ) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
  getTotal: () => number
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variant = {}, quantity = 1) => {
        set((state) => {
          const variantKey = JSON.stringify(variant)
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              JSON.stringify(item.variant) === variantKey,
          )

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
            toast.success(`Updated ${product.name} quantity`)
            return { items: updatedItems }
          }

          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product,
            variant,
            quantity,
          }

          toast.success(`Added ${product.name} to cart`)
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (itemId) => {
        set((state) => {
          const item = state.items.find((i) => i.id === itemId)
          if (item) {
            toast.success(`Removed ${item.product.name} from cart`)
          }
          return { items: state.items.filter((item) => item.id !== itemId) }
        })
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item,
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
        toast.success('Cart cleared')
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          let price = item.product.price
          if (item.variant?.size === 'large') {
            price += 1 // Large size adds $1
          }
          return total + price * item.quantity
        }, 0)
      },

      getTax: () => {
        const subtotal = get().getSubtotal()
        return subtotal * 0.08 // 8% tax
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal > 30 ? 0 : 5 // Free shipping over $30
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping()
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'boba-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items
    },
  ),
)
