'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { CartItem, Product, ProductVariant } from '@/types'

interface CartContextType {
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
  toggleCart: () => void
  setIsOpen: (open: boolean) => void
  getItemCount: () => number
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'boba-cart'
const TAX_RATE = 0.0875 // 8.75% tax
const SHIPPING_THRESHOLD = 50 // Free shipping over $50
const SHIPPING_COST = 5.99

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setisOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Failed to save cart:', error)
      }
    }
  }, [items, isHydrated])

  const addItem = (
    product: Product,
    variant?: ProductVariant,
    quantity = 1,
  ) => {
    setItems((currentItems) => {
      // Check if item already exists with same variant
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.variant) === JSON.stringify(variant),
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += quantity
        toast.success(`Updated ${product.name} quantity`)
        return updatedItems
      }

      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        variant: variant || {},
        quantity,
      }

      toast.success(`Added ${product.name} to cart`)
      return [...currentItems, newItem]
    })

    // Open cart sidebar briefly to show addition
    setIsOpen(true)
    setTimeout(() => setIsOpen(false), 2000)
  }

  const removeItem = (itemId: string) => {
    setItems((currentItems) => {
      const item = currentItems.find((i) => i.id === itemId)
      if (item) {
        toast.success(`Removed ${item.product.name} from cart`)
      }
      return currentItems.filter((i) => i.id !== itemId)
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
    toast.success('Cart cleared')
  }

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  const setIsOpen = (open: boolean) => {
    setisOpen(open)
  }

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    )
  }

  const getTax = () => {
    return getSubtotal() * TAX_RATE
  }

  const getShipping = () => {
    const subtotal = getSubtotal()
    return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  }

  const getTotal = () => {
    return getSubtotal() + getTax() + getShipping()
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setIsOpen,
        getItemCount,
        getSubtotal,
        getTax,
        getShipping,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
