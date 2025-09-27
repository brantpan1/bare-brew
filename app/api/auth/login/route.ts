import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { LoginRequest, User } from '@/types/user'

// Mock user data - replace with your actual database logic
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Mock password validation - replace with your actual password hashing logic
const validatePassword = (email: string, password: string): User | null => {
  // For demo purposes, accept any password for the mock user
  if (email === 'john@example.com' && password.length >= 6) {
    return mockUsers[0]
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate credentials
    const user = validatePassword(email, password)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session token (in a real app, use JWT or similar)
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Set session cookie
    const cookieStore = cookies()
    cookieStore.set('session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({
      user,
      message: 'Login successful',
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}