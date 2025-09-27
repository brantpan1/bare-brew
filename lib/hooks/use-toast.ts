'use client'

import { toast as sonnerToast } from 'sonner'

export const toast = {
  success: (message: string) =>
    sonnerToast.success(message, {
      className: 'bg-[#1a1a1a] border-green-800 text-white',
      duration: 3000,
    }),

  error: (message: string) =>
    sonnerToast.error(message, {
      className: 'bg-[#1a1a1a] border-red-800 text-white',
      duration: 4000,
    }),

  info: (message: string) =>
    sonnerToast.info(message, {
      className: 'bg-[#1a1a1a] border-blue-800 text-white',
      duration: 3000,
    }),

  loading: (message: string) =>
    sonnerToast.loading(message, {
      className: 'bg-[#1a1a1a] border-purple-800 text-white',
    }),

  promise: <T>(
    promise: Promise<T>,
    opts: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    },
  ) => sonnerToast.promise(promise, opts),
}
