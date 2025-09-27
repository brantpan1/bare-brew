'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag, Heart, Minus, Plus, Star, TrendingUp } from 'lucide-react'
import { useCart } from '@/lib/hooks/use-cart'
import { Product, ProductVariant } from '@/types/product'
import { formatPrice } from '@/lib/utils/format'
import { toast } from 'sonner'

interface ProductQuickViewModalProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

export function ProductQuickViewModal({
  product,
  open,
  onClose,
}: ProductQuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>({
    size: 'regular',
    iceLevel: 'regular',
    sugarLevel: '100%',
  })
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart()

  if (!product) return null

  const images = [
    product.image,
    product.image,
    product.image,
  ]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant)
    }
    toast.success(`Added ${quantity} ${product.name} to cart`)
    onClose()
  }

  const incrementQuantity = () => setQuantity((q) => q + 1)
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#1a1a1a] border-gray-800 p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Product Quick View - {product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6">
            <Badge className="absolute top-4 left-4 bg-purple-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                toast.success('Added to wishlist')
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>

            {/* Main Image */}
            <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    activeImage === idx
                      ? 'border-purple-500'
                      : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">(127 reviews)</span>
              </div>
              <p className="text-gray-300 mb-4">{product.description}</p>
              <p className="text-3xl font-bold text-white">
                {formatPrice(product.price)}
              </p>
            </div>

            <Separator className="bg-gray-800" />

            {/* Options */}
            <div className="space-y-4">
              {/* Size Option */}
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Size</Label>
                <RadioGroup
                  value={selectedVariant.size}
                  onValueChange={(value) =>
                    setSelectedVariant({ ...selectedVariant, size: value })
                  }
                  className="flex gap-3"
                >
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="regular"
                      id="size-regular"
                      className="border-gray-600 text-purple-500"
                    />
                    <Label
                      htmlFor="size-regular"
                      className="ml-2 cursor-pointer"
                    >
                      Regular
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="large"
                      id="size-large"
                      className="border-gray-600 text-purple-500"
                    />
                    <Label htmlFor="size-large" className="ml-2 cursor-pointer">
                      Large (+$1.00)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Ice Level */}
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">
                  Ice Level
                </Label>
                <div className="flex gap-2">
                  {['No Ice', 'Less Ice', 'Regular', 'Extra Ice'].map(
                    (level) => (
                      <Button
                        key={level}
                        variant={
                          selectedVariant.iceLevel ===
                          level.toLowerCase().replace(' ', '-')
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() =>
                          setSelectedVariant({
                            ...selectedVariant,
                            iceLevel: level.toLowerCase().replace(' ', '-'),
                          })
                        }
                        className={
                          selectedVariant.iceLevel ===
                          level.toLowerCase().replace(' ', '-')
                            ? 'bg-purple-600 hover:bg-purple-700'
                            : 'border-gray-700 hover:bg-gray-800'
                        }
                      >
                        {level}
                      </Button>
                    ),
                  )}
                </div>
              </div>

              {/* Sugar Level */}
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">
                  Sugar Level
                </Label>
                <div className="flex gap-2">
                  {['0%', '30%', '50%', '70%', '100%'].map((level) => (
                    <Button
                      key={level}
                      variant={
                        selectedVariant.sugarLevel === level
                          ? 'default'
                          : 'outline'
                      }
                      size="sm"
                      onClick={() =>
                        setSelectedVariant({
                          ...selectedVariant,
                          sugarLevel: level,
                        })
                      }
                      className={
                        selectedVariant.sugarLevel === level
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'border-gray-700 hover:bg-gray-800'
                      }
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-gray-700 rounded-lg">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={decrementQuantity}
                  className="hover:bg-gray-800"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[50px] text-center">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={incrementQuantity}
                  className="hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Product Info */}
            <div className="text-xs text-gray-400 space-y-1">
              <p>✓ Free delivery on orders over $30</p>
              <p>✓ Made fresh daily with premium ingredients</p>
              <p>✓ Customizable to your taste preferences</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
