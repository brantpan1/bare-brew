import { apiClient } from './client'
import { User, LoginCredentials, RegisterData } from '@/types/user'

interface AuthResponse {
  user: User
  token: string
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/register', userData)
    return data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  async getMe(): Promise<User> {
    const { data } = await apiClient.get('/auth/me')
    return data
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const { data } = await apiClient.patch('/auth/profile', updates)
    return data
  },

  async changePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    await apiClient.post('/auth/change-password', { oldPassword, newPassword })
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email })
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, password })
  },
}
