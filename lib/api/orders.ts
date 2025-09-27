import { apiClient } from './client'
import { Order } from '@/types/order'

interface OrdersResponse {
  orders: Order[]
  total: number
  page: number
  limit: number
}

interface CheckoutData {
  shippingAddress: any
  billingAddress?: any
  paymentMethod: string
  paymentDetails?: any
}

export const ordersApi = {
  async getOrders(page = 1, limit = 10): Promise<OrdersResponse> {
    const { data } = await apiClient.get('/orders', { params: { page, limit } })
    return data
  },

  async getOrder(id: string): Promise<Order> {
    const { data } = await apiClient.get(`/orders/${id}`)
    return data
  },

  async createOrder(checkoutData: CheckoutData): Promise<Order> {
    const { data } = await apiClient.post('/orders', checkoutData)
    return data
  },

  async cancelOrder(id: string): Promise<Order> {
    const { data } = await apiClient.post(`/orders/${id}/cancel`)
    return data
  },

  async trackOrder(id: string): Promise<any> {
    const { data } = await apiClient.get(`/orders/${id}/tracking`)
    return data
  },
}
