import { create } from 'zustand'
import { Product } from '@/types/product'

export type ModalType =
  | 'auth'
  | 'search'
  | 'quickView'
  | 'cart'
  | 'checkout'
  | 'orderSuccess'
  | 'addressForm'
  | 'confirmDelete'
  | 'shareProduct'
  | 'reviewForm'

interface ModalData {
  // Auth Modal
  authDefaultTab?: 'login' | 'register'
  redirectUrl?: string

  // Quick View Modal
  product?: Product

  // Confirmation Modal
  confirmTitle?: string
  confirmMessage?: string
  confirmAction?: () => void
  confirmButtonText?: string
  confirmButtonVariant?: 'default' | 'destructive'

  // Order Success Modal
  orderId?: string
  orderNumber?: string

  // Address Form Modal
  addressId?: string
  onAddressSave?: (address: any) => void

  // Review Form Modal
  productId?: string
  productName?: string

  // Share Product Modal
  shareUrl?: string
  shareTitle?: string
  shareDescription?: string
}

interface ModalStore {
  modals: Map<ModalType, boolean>
  data: Map<ModalType, ModalData>

  // Open/Close actions
  openModal: (type: ModalType, data?: ModalData) => void
  closeModal: (type: ModalType) => void
  closeAllModals: () => void

  // Check status
  isOpen: (type: ModalType) => boolean
  getData: (type: ModalType) => ModalData | undefined

  // Specific modal helpers
  openAuth: (tab?: 'login' | 'register', redirectUrl?: string) => void
  openQuickView: (product: Product) => void
  openSearch: () => void
  openCart: () => void
  openCheckout: () => void
  openConfirm: (options: {
    title: string
    message: string
    onConfirm: () => void
    buttonText?: string
    buttonVariant?: 'default' | 'destructive'
  }) => void
  openOrderSuccess: (orderId: string, orderNumber: string) => void
  openAddressForm: (addressId?: string, onSave?: (address: any) => void) => void
  openReviewForm: (productId: string, productName: string) => void
  openShare: (url: string, title: string, description?: string) => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: new Map(),
  data: new Map(),

  openModal: (type, data) => {
    set((state) => {
      const newModals = new Map(state.modals)
      const newData = new Map(state.data)

      newModals.set(type, true)
      if (data) {
        newData.set(type, data)
      }

      return { modals: newModals, data: newData }
    })
  },

  closeModal: (type) => {
    set((state) => {
      const newModals = new Map(state.modals)
      const newData = new Map(state.data)

      newModals.set(type, false)
      newData.delete(type)

      return { modals: newModals, data: newData }
    })
  },

  closeAllModals: () => {
    set({ modals: new Map(), data: new Map() })
  },

  isOpen: (type) => {
    return get().modals.get(type) || false
  },

  getData: (type) => {
    return get().data.get(type)
  },

  // Specific modal helpers
  openAuth: (tab = 'login', redirectUrl) => {
    get().openModal('auth', { authDefaultTab: tab, redirectUrl })
  },

  openQuickView: (product) => {
    get().openModal('quickView', { product })
  },

  openSearch: () => {
    get().openModal('search')
  },

  openCart: () => {
    get().openModal('cart')
  },

  openCheckout: () => {
    get().openModal('checkout')
  },

  openConfirm: ({
    title,
    message,
    onConfirm,
    buttonText = 'Confirm',
    buttonVariant = 'default',
  }) => {
    get().openModal('confirmDelete', {
      confirmTitle: title,
      confirmMessage: message,
      confirmAction: onConfirm,
      confirmButtonText: buttonText,
      confirmButtonVariant: buttonVariant,
    })
  },

  openOrderSuccess: (orderId, orderNumber) => {
    get().openModal('orderSuccess', { orderId, orderNumber })
  },

  openAddressForm: (addressId, onSave) => {
    get().openModal('addressForm', { addressId, onAddressSave: onSave })
  },

  openReviewForm: (productId, productName) => {
    get().openModal('reviewForm', { productId, productName })
  },

  openShare: (url, title, description) => {
    get().openModal('shareProduct', {
      shareUrl: url,
      shareTitle: title,
      shareDescription: description,
    })
  },
}))
