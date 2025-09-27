'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { CATEGORIES } from '@/lib/constants'

const featuredProducts = [
  {
    name: 'Brown Sugar Special',
    href: '/products/brown-sugar',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400',
    price: '$7.49',
  },
  {
    name: 'Matcha Delight',
    href: '/products/matcha',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
    price: '$8.99',
  },
]

export function CategoryDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-white/5">
            <span className="flex items-center gap-1">
              Shop
              <ChevronDown className="h-3 w-3" />
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[600px] p-6 bg-[#1a1a1a] border border-gray-800">
              <div className="grid grid-cols-3 gap-6">
                {/* Categories */}
                <div className="col-span-1">
                  <h3 className="font-semibold mb-4 text-purple-400">
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/products"
                        className="text-sm text-gray-300 hover:text-white transition"
                      >
                        All Products
                      </Link>
                    </li>
                    {CATEGORIES.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/products?category=${category.slug}`}
                          className="text-sm text-gray-300 hover:text-white transition"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured Products */}
                <div className="col-span-2">
                  <h3 className="font-semibold mb-4 text-purple-400">
                    Featured
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {featuredProducts.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-sm text-purple-400">
                            {product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/products"
                    className="inline-flex items-center mt-4 text-sm text-purple-400 hover:text-purple-300 transition"
                  >
                    View all products →
                  </Link>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
