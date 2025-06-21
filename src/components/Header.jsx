"use client"

import { useState } from "react"
import { Search, ShoppingBag, Heart, Menu, X, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../context/Cart-context"
import { useWishlist } from "../context/Wishlist-context"
import { useAuth } from "../context/Auth-context"
import AuthModal from "./Auth-modal"
import UserProfileModal from "./User-profile"
import { Link } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, isAuthenticated } = useAuth()

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 w-full gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                LUXE
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex grow max-w-md mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for products, brands, categories..."
                  className="pl-12 pr-4 h-12 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-full"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded">⌘K</kbd>
                </div>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {isAuthenticated && user ? (
                <Button
                  onClick={() => setShowProfileModal(true)}
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex relative group hover:bg-purple-50 transition-colors w-10 h-10 rounded-full p-0"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold text-sm hover:scale-105 transition-transform">
                    {getInitials(user.name)}
                  </div>
                </Button>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex relative group hover:bg-purple-50 transition-colors"
                >
                  <User className="h-6 w-6 group-hover:text-purple-600 transition-colors" />
                </Button>
              )}

              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative group hover:bg-pink-50 transition-colors">
                  <Heart className="h-6 w-6 group-hover:text-pink-600 transition-colors" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-pink-500 to-red-500 animate-pulse">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative group hover:bg-purple-50 transition-colors">
                  <ShoppingBag className="h-6 w-6 group-hover:text-purple-600 transition-colors" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-purple-50 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex justify-center space-x-8 mt-2">
            {["All Products", "Men", "Women", "Accessories", "Orders"].map((label) => {
              const path =
                label === "All Products"
                  ? "/products"
                  : label === "Orders"
                  ? "/orders"
                  : `/products?category=${label.toLowerCase()}`
              return (
                <Link
                  key={label}
                  to={path}
                  className="relative group text-gray-700 hover:text-purple-600 transition-colors font-medium"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-6 border-t bg-white/95 backdrop-blur-md animate-in slide-in-from-top-2">
              <div className="flex flex-col space-y-6 text-sm">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input placeholder="Search products..." className="pl-12 h-12 rounded-full" />
                </div>

                {isAuthenticated && user ? (
                  <div
                    onClick={() => setShowProfileModal(true)}
                    className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Sign In
                  </Button>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Link to="/products" className="text-gray-700 hover:text-purple-600 transition-colors py-3 px-4 rounded-lg hover:bg-purple-50 font-medium">
                    All Products
                  </Link>
                  <Link to="/products?category=men" className="text-gray-700 hover:text-purple-600 transition-colors py-3 px-4 rounded-lg hover:bg-purple-50 font-medium">
                    Men
                  </Link>
                  <Link to="/products?category=women" className="text-gray-700 hover:text-purple-600 transition-colors py-3 px-4 rounded-lg hover:bg-purple-50 font-medium">
                    Women
                  </Link>
                  <Link to="/products?category=accessories" className="text-gray-700 hover:text-purple-600 transition-colors py-3 px-4 rounded-lg hover:bg-purple-50 font-medium">
                    Accessories
                  </Link>
                </div>

                <Link
                  to="/orders"
                  className="text-sm text-gray-700 hover:text-purple-600 transition-colors py-3 px-4 rounded-lg hover:bg-purple-50 font-medium"
                >
                  My Orders
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </>
  )
}
