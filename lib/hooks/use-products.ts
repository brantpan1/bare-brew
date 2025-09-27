'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '@/types/product'
import { productsApi } from '@/lib/api/products'
import { toast } from 'sonner'

export function useProducts(category?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => productsApi.getProducts({ category }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    products: data?.products || [],
    isLoading,
    error,
  }
}

export function useProduct(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
  })

  return {
    product: data,
    isLoading,
    error,
  }
}

export function useProductSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'search', debouncedQuery],
    queryFn: () => productsApi.searchProducts(debouncedQuery),
    enabled: debouncedQuery.length > 1,
  })

  return {
    results: data?.products || [],
    isLoading,
  }
}

export function useFavorites() {
  const queryClient = useQueryClient()

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: productsApi.getFavorites,
  })

  const addFavorite = useMutation({
    mutationFn: (productId: string) => productsApi.addFavorite(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      toast.success('Added to favorites')
    },
  })

  const removeFavorite = useMutation({
    mutationFn: (productId: string) => productsApi.removeFavorite(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      toast.success('Removed from favorites')
    },
  })

  return {
    favorites,
    addFavorite: addFavorite.mutate,
    removeFavorite: removeFavorite.mutate,
    isFavorite: (productId: string) =>
      favorites.some((f: any) => f.id === productId),
  }
}
