'use client'

import { create } from 'zustand'
import { User } from '@/types/user'
import { LoginCredentials, RegisterData } from '@/types/user'
import { authApi } from '@/lib/api/auth'
import { toast } from 'sonner'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  updateUser: (user: Partial<User>) => void
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    try {
      set({ isLoading: true })
      const { user, token } = await authApi.login(credentials)
      localStorage.setItem('auth_token', token)
      set({ user, isAuthenticated: true })
      toast.success('Welcome back!')
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true })
      const { user, token } = await authApi.register(data)
      localStorage.setItem('auth_token', token)
      set({ user, isAuthenticated: true })
      toast.success('Account created successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    try {
      await authApi.logout()
      localStorage.removeItem('auth_token')
      set({ user: null, isAuthenticated: false })
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        set({ isLoading: false })
        return
      }

      const user = await authApi.getMe()
      set({ user, isAuthenticated: true })
    } catch (error) {
      localStorage.removeItem('auth_token')
      set({ user: null, isAuthenticated: false })
    } finally {
      set({ isLoading: false })
    }
  },

  updateUser: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }))
  },
}))

// Auto-check auth on app load
if (typeof window !== 'undefined') {
  useAuth.getState().checkAuth()
}

// ============================================
// lib/hooks/use-products.ts

