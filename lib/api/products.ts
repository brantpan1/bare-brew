import { apiClient } from './client'
import { Product } from '@/types/product'

interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
  search?: string
}

export const productsApi = {
  async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
    const { data } = await apiClient.get('/products', { params: filters })
    return data
  },

  async getProduct(id: string): Promise<Product> {
    const { data } = await apiClient.get(`/products/${id}`)
    return data
  },

  async searchProducts(query: string): Promise<ProductsResponse> {
    const { data } = await apiClient.get('/products/search', {
      params: { q: query },
    })
    return data
  },

  async getFeatured(): Promise<Product[]> {
    const { data } = await apiClient.get('/products/featured')
    return data
  },

  async getFavorites(): Promise<Product[]> {
    const { data } = await apiClient.get('/products/favorites')
    return data
  },

  async addFavorite(productId: string): Promise<void> {
    await apiClient.post(`/products/${productId}/favorite`)
  },

  async removeFavorite(productId: string): Promise<void> {
    await apiClient.delete(`/products/${productId}/favorite`)
  },
}
