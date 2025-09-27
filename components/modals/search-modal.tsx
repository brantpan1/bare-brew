'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, TrendingUp, Clock, X, Loader2, ArrowRight } from 'lucide-react'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils/format'
import { useDebounce } from '@/lib/hooks/use-debounce'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

const popularSearches = ['Milk Tea', 'Taro', 'Brown Sugar', 'Matcha', 'Mango']
const recentSearches = ['Classic Milk Tea', 'Thai Tea Fusion']

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const debouncedQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setSearchResults([])
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(`/api/products/search?q=${debouncedQuery}`)
        const data = await response.json()
        setSearchResults(data.products || [])
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [debouncedQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev,
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            handleProductClick(searchResults[selectedIndex])
          } else if (searchQuery) {
            handleSearch()
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, selectedIndex, searchResults, searchQuery])

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      onClose()
    }
  }

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`)
    onClose()
  }

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term)
    inputRef.current?.focus()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#1a1a1a] border-gray-800 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="p-4 border-b border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for boba drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-10 h-12 bg-[#0f0f0f] border-gray-800 focus:border-purple-500 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-4">
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400 mb-3">
                  Found {searchResults.length} results
                </p>
                {searchResults.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#0f0f0f] transition ${
                      selectedIndex === index ? 'bg-[#0f0f0f]' : ''
                    }`}
                  >
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-white">{product.name}</h4>
                      <p className="text-sm text-gray-400 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </button>
                ))}

                {searchQuery && (
                  <button
                    onClick={handleSearch}
                    className="w-full flex items-center justify-center gap-2 p-3 mt-2 text-purple-400 hover:text-purple-300 transition"
                  >
                    View all results for "{searchQuery}"
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {!isSearching && searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-2">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-sm text-gray-500">
                  Try searching for something else
                </p>
              </div>
            )}

            {/* Default State - Popular & Recent */}
            {!searchQuery && !isSearching && (
              <>
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        Recent Searches
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <Badge
                          key={term}
                          variant="secondary"
                          className="bg-[#0f0f0f] hover:bg-gray-800 cursor-pointer"
                          onClick={() => handlePopularSearch(term)}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      Popular Searches
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <Badge
                        key={term}
                        variant="secondary"
                        className="bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 cursor-pointer"
                        onClick={() => handlePopularSearch(term)}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
