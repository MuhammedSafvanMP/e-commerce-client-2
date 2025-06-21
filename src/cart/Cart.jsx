"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useCart } from "../context/Cart-context"
import { Link } from "react-router-dom"

// Mock product data for color/size options
const productOptions = {
  colors: [
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#ffffff" },
    { name: "navy", hex: "#1e3a8a" },
    { name: "gray", hex: "#6b7280" },
    { name: "red", hex: "#dc2626" },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
}

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart, updateItem } = useCart()
  const [editingItem, setEditingItem] = useState(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  const openEditDialog = (item) => {
    setEditingItem(item)
    setSelectedColor(item.color)
    setSelectedSize(item.size)
  }

  const saveChanges = () => {
    if (editingItem && updateItem) {
      updateItem(editingItem.id, editingItem.size, editingItem.color, {
        color: selectedColor,
        size: selectedSize,
      })
      setEditingItem(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Size:</span>
                        <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded capitalize">
                          {item.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Color:</span>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{
                              backgroundColor: productOptions.colors.find((c) => c.name === item.color)?.hex || "#000",
                            }}
                          />
                          <span className="text-sm font-medium capitalize">{item.color}</span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(item)}
                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edit Item Options</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Color Selection */}
                            <div>
                              <Label className="text-base font-semibold mb-3 block">
                                Color: <span className="text-purple-600 capitalize">{selectedColor}</span>
                              </Label>
                              <div className="flex gap-3 flex-wrap">
                                {productOptions.colors.map((color) => (
                                  <button
                                    key={color.name}
                                    className={`w-10 h-10 rounded-full border-3 transition-all ${
                                      selectedColor === color.name
                                        ? "border-purple-500 scale-110 shadow-lg"
                                        : "border-gray-300 hover:border-gray-400"
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => setSelectedColor(color.name)}
                                    title={`Select ${color.name}`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                              <Label className="text-base font-semibold mb-3 block">Size</Label>
                              <div className="grid grid-cols-3 gap-2">
                                {productOptions.sizes.map((size) => (
                                  <button
                                    key={size}
                                    className={`py-2 px-3 border-2 rounded-lg font-medium transition-all ${
                                      selectedSize === size
                                        ? "border-purple-500 bg-purple-50 text-purple-700"
                                        : "border-gray-300 hover:border-gray-400"
                                    }`}
                                    onClick={() => setSelectedSize(size)}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button onClick={saveChanges} className="flex-1">
                                Save Changes
                              </Button>
                              <Button variant="outline" onClick={() => setEditingItem(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>${(total * 1.08).toFixed(2)}</span>
            </div>

            <Link to="/checkout">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white mb-4">
                Proceed to Checkout
              </Button>
            </Link>

            <Link to="/products">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
