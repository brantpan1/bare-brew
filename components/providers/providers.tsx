'use client'

import { ThemeProvider } from './theme-provider'
import { QueryProvider } from './query-provider'
import { AuthProvider } from './auth-provider'
import { CartProvider } from './cart-provider'
import { ModalProvider } from './modal-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryProvider>
        <AuthProvider>
          <CartProvider>
            <ModalProvider />
            {children}
          </CartProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
