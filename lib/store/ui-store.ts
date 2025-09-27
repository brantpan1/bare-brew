'use client'

import { create } from 'zustand'

interface UIStore {
  // Modals
  authModalOpen: boolean
  searchModalOpen: boolean
  quickViewProduct: any | null

  // Sidebar
  mobileMenuOpen: boolean
  cartOpen: boolean

  // UI State
  isScrolled: boolean

  // Actions
  openAuthModal: (tab?: 'login' | 'register') => void
  closeAuthModal: () => void
  openSearchModal: () => void
  closeSearchModal: () => void
  openQuickView: (product: any) => void
  closeQuickView: () => void
  toggleMobileMenu: () => void
  toggleCart: () => void
  setScrolled: (scrolled: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  authModalOpen: false,
  searchModalOpen: false,
  quickViewProduct: null,
  mobileMenuOpen: false,
  cartOpen: false,
  isScrolled: false,

  openAuthModal: (tab) => set({ authModalOpen: true }),
  closeAuthModal: () => set({ authModalOpen: false }),
  openSearchModal: () => set({ searchModalOpen: true }),
  closeSearchModal: () => set({ searchModalOpen: false }),
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),
}))
