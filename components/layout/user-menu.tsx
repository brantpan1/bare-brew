'use client'

import Link from 'next/link'
import {
  User,
  Package,
  LogOut,
  Settings,
  MapPin,
  CreditCard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useModalStore } from '@/lib/store/modal-store'

import { AnnouncementBar } from './announcement-bar'

interface UserMenuProps {
  user: any
  onLogout: () => void
}

function UserMenu({ user, onLogout }: UserMenuProps) {
  const { openAuth } = useModalStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-white/10">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-[#1a1a1a] border-gray-800"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />

        <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
          <Link href="/account" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            My Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
          <Link href="/account/orders" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Orders
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
          <Link href="/account/addresses" className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Addresses
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
          <Link href="/account/payment" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Methods
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
          <Link href="/account/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-800" />

        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer hover:bg-white/5 text-red-400 focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
