'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/hooks/use-cart'
import { useModalStore } from '@/lib/store/modal-store'
import { formatPrice } from '@/lib/utils/format'
import Image from 'next/image'

interface CartModalProps {
  open: boolean
  onClose: () => void
}

export function CartModal({ open, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, clearCart } = useCart()
  const { openCheckout, openConfirm } = useModalStore()
  
  const handleCheckout = () => {
    onClose()
    openCheckout()
  }
  
  const handleClearCart = () => {
    openConfirm({
      title: 'Clear Cart',
      message: 'Are you sure you want to remove all items from your cart?',
      onConfirm: () => clearCart(),
      buttonText: 'Clear Cart',
      buttonVariant: 'destructive'
    })
  }
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1a1a1a] border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.length})
          </DialogTitle>
        </DialogHeader>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400">Your cart is empty</p>
            <Button
              onClick={onClose}
              className="mt-4"
              variant="outline"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-[#0f0f0f] rounded-lg">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-400">
                        {item.variant.size && `Size: ${item.variant.size}`}
                        {item.variant.iceLevel && ` • Ice: ${item.variant.iceLevel}`}
                        {item.variant.sugarLevel && ` • Sugar: ${item.variant.sugarLevel}`}
                      </p>
                      <p className="font-semibold mt-1">{formatPrice(item.product.price)}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-700 rounded-lg">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:text-red-400"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <Separator className="bg-gray-800" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="flex-1"
                >
                  Clear Cart
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
