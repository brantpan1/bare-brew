'use client'

import { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import type { User } from '@/types/user'

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, loading, isAuthenticated, login, register, logout, checkAuth } = useAuthStore()

  // Check for stored session on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const signIn = async (email: string, password: string) => {
    try {
      await login(email, password)
      // Redirect to intended page or account
      const redirectTo =
        new URLSearchParams(window.location.search).get('from') || '/account'
      router.push(redirectTo)
    } catch (error) {
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await register(name, email, password)
      router.push('/account')
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const updateUser = (updatedUser: User) => {
    // Update user in store if needed
    useAuthStore.setState({ user: updatedUser })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
