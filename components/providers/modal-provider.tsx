'use client'

import { useEffect, useState } from 'react'
import { AuthModal } from '@/components/modals/auth-modal'
import { SearchModal } from '@/components/modals/search-modal'
import { ProductQuickView } from '@/components/modals/product-quick-view'

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AuthModal />
      <SearchModal />
      <ProductQuickView />
    </>
  )
}
