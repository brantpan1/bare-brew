'use client'

import { useEffect } from 'react'
import { useModalStore } from '@/lib/store/modal-store'

import { AuthModal } from '@/components/modals/auth-modal'
import { SearchModal } from '@/components/modals/search-modal'
import { CartModal } from '@/components/modals/cart-modal'
import { ConfirmationModal } from '@/components/modals/confirmation-modal'

export function ModalProvider() {
  const { isOpen, closeModal, getData } = useModalStore()

  useEffect(() => {
    return () => {
      useModalStore.getState().closeAllModals()
    }
  }, [])

  useEffect(() => {
    const hasOpenModal = Array.from(
      useModalStore.getState().modals.values(),
    ).some(Boolean)

    if (hasOpenModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Auth Modal */}
      <AuthModal
        open={isOpen('auth')}
        onClose={() => closeModal('auth')}
        defaultTab={getData('auth')?.authDefaultTab}
      />
      {/* Search Modal */}
      <SearchModal
        open={isOpen('search')}
        onClose={() => closeModal('search')}
      />
      {/* Cart Modal */}
      <CartModal open={isOpen('cart')} onClose={() => closeModal('cart')} />
      {/* Confirmation Modal */}
      <ConfirmationModal
        open={isOpen('confirmDelete')}
        onClose={() => closeModal('confirmDelete')}
        title={getData('confirmDelete')?.confirmTitle || 'Confirm'}
        message={getData('confirmDelete')?.confirmMessage || 'Are you sure?'}
        onConfirm={getData('confirmDelete')?.confirmAction || (() => {})}
        confirmButtonText={getData('confirmDelete')?.confirmButtonText}
        confirmButtonVariant={getData('confirmDelete')?.confirmButtonVariant}
      />
    </>
  )
}
