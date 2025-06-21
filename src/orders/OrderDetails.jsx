"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  MessageSquare,
  Download,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { useToast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"
import { useCart } from "@/context/Cart-context"

// Mock order data - in real app, this would come from API based on order ID
const mockOrderDetails = {
  id: "ORD-2024-001",
  date: "2024-01-15",
  status: "delivered",
  total: 299.97,
  subtotal: 279.97,
  shipping: 0,
  tax: 20.0,
  items: [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 89.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      size: "M",
      color: "Black",
      reviewed: false,
    },
    {
      id: 2,
      name: "Designer Denim Jacket",
      price: 199.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      size: "L",
      color: "Blue",
      reviewed: true,
    },
  ],
  tracking: {
    number: "TRK123456789",
    carrier: "Express Shipping",
    steps: [
      {
        status: "ordered",
        date: "2024-01-15",
        time: "10:30 AM",
        completed: true,
        description: "Order confirmed and payment processed",
      },
      {
        status: "processing",
        date: "2024-01-16",
        time: "2:15 PM",
        completed: true,
        description: "Items picked and packed for shipping",
      },
      {
        status: "shipped",
        date: "2024-01-17",
        time: "9:45 AM",
        completed: true,
        description: "Package dispatched from warehouse",
      },
      {
        status: "delivered",
        date: "2024-01-20",
        time: "3:20 PM",
        completed: true,
        description: "Package delivered successfully",
      },
    ],
  },
  shippingAddress: {
    name: "John Doe",
    street: "123 Fashion Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "+1 (555) 123-4567",
  },
  billingAddress: {
    name: "John Doe",
    street: "123 Fashion Street",
    city: "New York",
    state: "NY",
    zip: "10001",
  },
}

const getStatusIcon = (status) => {
  switch (status) {
    case "ordered":
      return <Clock className="h-5 w-5" />
    case "processing":
      return <Package className="h-5 w-5" />
    case "shipped":
      return <Truck className="h-5 w-5" />
    case "delivered":
      return <CheckCircle className="h-5 w-5" />
    default:
      return <Clock className="h-5 w-5" />
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "ordered":
      return "bg-blue-500"
    case "processing":
      return "bg-yellow-500"
    case "shipped":
      return "bg-purple-500"
    case "delivered":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useNavigate()
  const { addItem } = useCart()
//   const { toast } = useToast()
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: "",
    comment: "",
    recommend: true,
  })
  const [isReordering, setIsReordering] = useState(false)

  const handleReviewSubmit = () => {
    // Handle review submission
    console.log("Review submitted:", reviewData)
    // toast({
    //   title: "Review Submitted!",
    //   description: "Thank you for your feedback. Your review has been submitted successfully.",
    // })
    setReviewDialogOpen(false)
    setReviewData({ rating: 5, title: "", comment: "", recommend: true })
  }

  const handleReorder = async () => {
    setIsReordering(true)

    try {
      // Add all items from the order to cart
      mockOrderDetails.items.forEach((item) => {
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })
      })

    //   toast({
    //     title: "Items Added to Cart!",
    //     description: `${mockOrderDetails.items.length} items from order ${mockOrderDetails.id} have been added to your cart.`,
    //   })

      // Redirect to cart after a short delay
      setTimeout(() => {
        router("/cart")
      }, 1500)
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to add items to cart. Please try again.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsReordering(false)
    }
  }

  const handleContactSupport = () => {
    // Navigate to support page with order info pre-filled
    router(`/support?order=${mockOrderDetails.id}`)
  }

  const handleDownloadInvoice = () => {
    // Simulate invoice download
    // toast({
    //   title: "Invoice Downloaded",
    //   description: `Invoice for order ${mockOrderDetails.id} has been downloaded.`,
    // })
  }

  const openReviewDialog = (product) => {
    setSelectedProduct(product)
    setReviewDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order #{mockOrderDetails.id}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Items</span>
                  <Badge
                    className={`${getStatusColor(mockOrderDetails.status)} hover:${getStatusColor(mockOrderDetails.status)}`}
                  >
                    {mockOrderDetails.status.charAt(0).toUpperCase() + mockOrderDetails.status.slice(1)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockOrderDetails.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600">
                          Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                        </p>
                        <p className="text-lg font-semibold text-purple-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Review Button for Delivered Orders */}
                      {mockOrderDetails.status === "delivered" && (
                        <div className="flex flex-col gap-2">
                          {item.reviewed ? (
                            <Badge variant="secondary" className="text-green-600">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Reviewed
                            </Badge>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openReviewDialog(item)}
                              className="hover:bg-purple-50 hover:border-purple-300"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Write Review
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tracking Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Tracking Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-sm text-gray-600">Tracking Number</p>
                  <p className="font-semibold text-lg">{mockOrderDetails.tracking.number}</p>
                  <p className="text-sm text-gray-600">Carrier: {mockOrderDetails.tracking.carrier}</p>
                </div>

                <div className="space-y-6">
                  {mockOrderDetails.tracking.steps.map((step, index) => (
                    <div key={step.status} className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                          step.completed ? getStatusColor(step.status) : "bg-gray-300"
                        }`}
                      >
                        {getStatusIcon(step.status)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                            {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                          </h4>
                          {step.completed && (
                            <div className="text-right">
                              <p className="text-sm font-medium">{step.date}</p>
                              <p className="text-xs text-gray-500">{step.time}</p>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${mockOrderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{mockOrderDetails.shipping === 0 ? "Free" : `$${mockOrderDetails.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${mockOrderDetails.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${mockOrderDetails.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{mockOrderDetails.shippingAddress.name}</p>
                  <p className="text-gray-600">{mockOrderDetails.shippingAddress.street}</p>
                  <p className="text-gray-600">
                    {mockOrderDetails.shippingAddress.city}, {mockOrderDetails.shippingAddress.state}{" "}
                    {mockOrderDetails.shippingAddress.zip}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{mockOrderDetails.shippingAddress.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Order Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={handleDownloadInvoice}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleContactSupport}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                {mockOrderDetails.status === "delivered" && (
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleReorder}
                    disabled={isReordering}
                  >
                    {isReordering ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Reorder Items
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="flex gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedProduct.size} • {selectedProduct.color}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setReviewData({ ...reviewData, rating: star })} className="p-1">
                      <Star
                        className={`h-8 w-8 ${
                          star <= reviewData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <Label htmlFor="review-title" className="text-base font-semibold">
                  Review Title
                </Label>
                <input
                  id="review-title"
                  type="text"
                  placeholder="Summarize your experience"
                  value={reviewData.title}
                  onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Review Comment */}
              <div>
                <Label htmlFor="review-comment" className="text-base font-semibold">
                  Your Review
                </Label>
                <Textarea
                  id="review-comment"
                  placeholder="Share your thoughts about this product..."
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="mt-2 min-h-[100px]"
                />
              </div>

              {/* Recommend */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="recommend"
                  checked={reviewData.recommend}
                  onChange={(e) => setReviewData({ ...reviewData, recommend: e.target.checked })}
                  className="w-4 h-4 text-purple-600"
                />
                <Label htmlFor="recommend">I would recommend this product</Label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleReviewSubmit}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Submit Review
                </Button>
                <Button variant="outline" onClick={() => setReviewDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
