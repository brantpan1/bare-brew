'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import {
  X,
  ChevronRight,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useModalStore } from '@/lib/store/modal-store'
import { useAuth } from '@/lib/hooks/use-auth'
import { CATEGORIES } from '@/lib/constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  user: any
}

export function MobileMenu({
  isOpen,
  onClose,
  isAuthenticated,
  user,
}: MobileMenuProps) {
  const pathname = usePathname()
  const { openAuth, openCart } = useModalStore()
  const { logout } = useAuth()

  const handleLogin = () => {
    onClose()
    openAuth('login')
  }

  const handleLogout = async () => {
    await logout()
    onClose()
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[60]">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Menu Panel */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#1a1a1a] shadow-2xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <Dialog.Title className="text-lg font-semibold">
                  Menu
                </Dialog.Title>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* User Section */}
              {isAuthenticated ? (
                <div className="p-4 border-b border-gray-800">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-b border-gray-800">
                  <Button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Sign In
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                {/* Main Links */}
                <div className="space-y-1">
                  <Link
                    href="/products"
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                      pathname === '/products'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>Shop All</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  {/* Categories */}
                  <div className="mt-4 mb-2">
                    <p className="px-3 text-xs uppercase text-gray-500 font-semibold">
                      Categories
                    </p>
                  </div>
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition"
                    >
                      <span>{category.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}

                  <Separator className="my-4 bg-gray-800" />

                  {/* Other Pages */}
                  <Link
                    href="/collections"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition"
                  >
                    <span>Collections</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition"
                  >
                    <span>About</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/locations"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition"
                  >
                    <span>Locations</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  {/* Account Links */}
                  {isAuthenticated && (
                    <>
                      <Separator className="my-4 bg-gray-800" />
                      <div className="mb-2">
                        <p className="px-3 text-xs uppercase text-gray-500 font-semibold">
                          Account
                        </p>
                      </div>
                      <Link
                        href="/account/orders"
                        onClick={onClose}
                        className="flex items-center px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition"
                      >
                        <Package className="h-4 w-4 mr-3" />
                        <span>Orders</span>
                      </Link>
                      <Link
                        href="/account/wishlist"
                        onClick={onClose}
                        className="flex items-center px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition"
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        <span>Wishlist</span>
                      </Link>
                      <Link
                        href="/account/addresses"
                        onClick={onClose}
                        className="flex items-center px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition"
                      >
                        <MapPin className="h-4 w-4 mr-3" />
                        <span>Addresses</span>
                      </Link>
                      <Link
                        href="/account/settings"
                        onClick={onClose}
                        className="flex items-center px-3 py-2 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        <span>Settings</span>
                      </Link>
                    </>
                  )}
                </div>
              </nav>

              {/* Footer */}
              <div className="border-t border-gray-800 p-4">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full border-gray-800 hover:bg-white/5"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-400">
                      Don't have an account?
                    </p>
                    <Button
                      variant="link"
                      onClick={() => {
                        onClose()
                        openAuth('register')
                      }}
                      className="text-purple-400 hover:text-purple-300 p-0"
                    >
                      Sign up now
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
