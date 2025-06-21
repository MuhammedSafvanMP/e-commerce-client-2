"use client"

import { useState } from "react"
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Link, useParams } from "react-router-dom"
import { useCart } from "@/context/Cart-context"
import { useWishlist } from "@/context/Wishlist-context"


// Mock product data - in real app, this would come from API
const productData = {
  id: 1,
  name: "Premium Cotton T-Shirt",
  price: 89.99,
  originalPrice: 120.0,
  images: [
    "/g1.jpg",
    "/g2.jpg",
    "/g3.jpg",
    "/g4.jpg",
  ],
  category: "men",
  rating: 4.8,
  reviews: 124,
  colors: [
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#ffffff" },
    { name: "navy", hex: "#1e3a8a" },
  ],
  sizes: ["S", "M", "L", "XL"],
  description:
    "Crafted from premium organic cotton, this t-shirt offers unparalleled comfort and style. The perfect blend of casual elegance and modern sophistication.",
  features: ["100% Organic Cotton", "Pre-shrunk fabric", "Reinforced seams", "Eco-friendly dyes", "Machine washable"],
  inStock: true,
  stockCount: 15,
}

const mockReviews = [
  {
    id: 1,
    user: "Sarah M.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-15",
    comment: "Absolutely love this t-shirt! The quality is exceptional and the fit is perfect. Highly recommend!",
    verified: true,
  },
  {
    id: 2,
    user: "Mike R.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-01-10",
    comment: "Great quality shirt, very comfortable. The color is exactly as shown in the pictures.",
    verified: true,
  },
  {
    id: 3,
    user: "Emma L.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-08",
    comment: "This is my third purchase from this brand. Consistently high quality and great customer service!",
    verified: true,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(productData.colors[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    if (!selectedColor) {
      alert("Please select a color")
      return
    }

    addItem({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor.name,
    })

    // Show success message
    alert(`Added ${quantity} ${productData.name} (${selectedColor.name}, ${selectedSize}) to cart!`)
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(productData.id)) {
      removeFromWishlist(productData.id)
    } else {
      addToWishlist({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.images[0],
        category: productData.category,
      })
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productData.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productData.images.length) % productData.images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-purple-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-purple-600">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{productData.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl">
              <img
                src={productData.images[selectedImage] || "/placeholder.svg"}
                alt={productData.name}
                fill
                className="object-cover"
              />

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {productData.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedImage ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                    index === selectedImage ? "ring-2 ring-purple-500 shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${productData.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({productData.reviews} reviews)</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{productData.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">${productData.price}</span>
                {productData.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${productData.originalPrice}</span>
                )}
                {productData.originalPrice && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    Save ${(productData.originalPrice - productData.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">{productData.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Color: <span className="text-purple-600 capitalize">{selectedColor.name}</span>
              </Label>
              <div className="flex gap-3">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor.name === color.name
                        ? "border-purple-500 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                    title={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Size</Label>
              <div className="grid grid-cols-4 gap-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
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

            {/* Quantity */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(productData.stockCount, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 ml-4">{productData.stockCount} items left</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="py-4" onClick={handleWishlistToggle}>
                <Heart className={`h-5 w-5 ${isInWishlist(productData.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over $100</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-gray-600">100% protected</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({mockReviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-8">
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Product Details</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Features</h4>
                  <ul className="space-y-2">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Care Instructions</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Machine wash cold with like colors</li>
                    <li>• Do not bleach</li>
                    <li>• Tumble dry low</li>
                    <li>• Iron on low heat if needed</li>
                    <li>• Do not dry clean</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="bg-white rounded-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Customer Reviews</h3>
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Write a Review
                </Button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold mb-4">Write Your Review</h4>
                  <div className="space-y-4">
                    <div>
                      <Label>Rating</Label>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => setNewReview({ ...newReview, rating: star })}>
                            <Star
                              className={`h-6 w-6 ${
                                star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review-comment">Your Review</Label>
                      <Textarea
                        id="review-comment"
                        placeholder="Share your thoughts about this product..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button>Submit Review</Button>
                      <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold">{review.user}</h5>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-8">
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Shipping Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Delivery Options</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Standard Shipping</p>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                      </div>
                      <span className="font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Express Shipping</p>
                        <p className="text-sm text-gray-600">2-3 business days</p>
                      </div>
                      <span className="font-semibold">$9.99</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Next Day Delivery</p>
                        <p className="text-sm text-gray-600">1 business day</p>
                      </div>
                      <span className="font-semibold">$19.99</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Return Policy</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 30-day return window</li>
                    <li>• Items must be unworn and with tags</li>
                    <li>• Free return shipping</li>
                    <li>• Refund processed within 5-7 business days</li>
                    <li>• Exchange available for different size/color</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
