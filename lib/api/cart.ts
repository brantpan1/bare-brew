import { apiClient } from './client'
import { Cart, CartItem } from '@/types/cart'

export const cartApi = {
  async getCart(): Promise<Cart> {
    const { data } = await apiClient.get('/cart')
    return data
  },

  async addToCart(
    productId: string,
    variant: any,
    quantity: number,
  ): Promise<Cart> {
    const { data } = await apiClient.post('/cart/items', {
      productId,
      variant,
      quantity,
    })
    return data
  },

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const { data } = await apiClient.patch(`/cart/items/${itemId}`, {
      quantity,
    })
    return data
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    const { data } = await apiClient.delete(`/cart/items/${itemId}`)
    return data
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/cart')
  },

  async applyCoupon(code: string): Promise<Cart> {
    const { data } = await apiClient.post('/cart/coupon', { code })
    return data
  },
}
