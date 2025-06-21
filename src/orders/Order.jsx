"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"

const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.97,
    items: [
      {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 89.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
        size: "M",
        color: "Black",
      },
      {
        id: 2,
        name: "Designer Denim Jacket",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        size: "L",
        color: "Blue",
      },
    ],
    tracking: {
      number: "TRK123456789",
      steps: [
        { status: "ordered", date: "2024-01-15", completed: true },
        { status: "processing", date: "2024-01-16", completed: true },
        { status: "shipped", date: "2024-01-17", completed: true },
        { status: "delivered", date: "2024-01-20", completed: true },
      ],
    },
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 149.99,
    items: [
      {
        id: 3,
        name: "Luxury Sneakers",
        price: 149.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        size: "9",
        color: "White",
      },
    ],
    tracking: {
      number: "TRK987654321",
      steps: [
        { status: "ordered", date: "2024-01-20", completed: true },
        { status: "processing", date: "2024-01-21", completed: true },
        { status: "shipped", date: "2024-01-22", completed: true },
        { status: "delivered", date: "", completed: false },
      ],
    },
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-22",
    status: "processing",
    total: 89.99,
    items: [
      {
        id: 4,
        name: "Silk Blend Dress",
        price: 89.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        size: "S",
        color: "Red",
      },
    ],
    tracking: {
      number: "TRK456789123",
      steps: [
        { status: "ordered", date: "2024-01-22", completed: true },
        { status: "processing", date: "2024-01-23", completed: true },
        { status: "shipped", date: "", completed: false },
        { status: "delivered", date: "", completed: false },
      ],
    },
  },
]

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

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  const OrderCard = ({ order }) => (
    <Card className="mb-6 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <p className="text-gray-600">Ordered on {order.date}</p>
          </div>
          <div className="text-right">
            <Badge className={`${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
            <p className="text-lg font-semibold mt-2">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm sm:text-base">{item.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Responsive Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4 border-t">
            <Link to={`/orders/${order.id}`} className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-sm px-3 py-2"
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-sm px-3 py-2"
              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
            >
              <Package className="h-4 w-4 mr-2" />
              {selectedOrder === order.id ? "Hide" : "Track"}
            </Button>
            {order.status === "delivered" && (
              <Button className="w-full sm:w-auto text-sm px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Reorder
              </Button>
            )}
          </div>

          {/* Tracking Info */}
          {selectedOrder === order.id && (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg animate-in slide-in-from-top-2">
              <h4 className="font-semibold mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Tracking: {order.tracking.number}
              </h4>
              <div className="space-y-4">
                {order.tracking.steps.map((step) => (
                  <div key={step.status} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        step.completed ? getStatusColor(step.status) : "bg-gray-300"
                      }`}
                    >
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                        {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                      </p>
                      {step.date && <p className="text-sm text-gray-600">{step.date}</p>}
                    </div>
                    {step.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const activeOrders = mockOrders.filter((order) => order.status !== "delivered")
  const completedOrders = mockOrders.filter((order) => order.status === "delivered")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Order History ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeOrders.length > 0 ? (
              <div>
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No active orders</h3>
                <p className="text-gray-600 mb-8">You don't have any active orders at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedOrders.length > 0 ? (
              <div>
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <CheckCircle className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No completed orders</h3>
                <p className="text-gray-600">Your completed orders will appear here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
