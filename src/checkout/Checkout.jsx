"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  Shield,
  CheckCircle,
  Lock,
  MapPin,
  Eye,
  EyeOff,
  QrCode,
  Copy,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/Cart-context"
import { Link, useNavigate } from "react-router-dom"

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
    popular: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    description: "Pay with your PayPal account",
    popular: false,
  },
  {
    id: "apple",
    name: "Apple Pay",
    icon: Smartphone,
    description: "Touch ID or Face ID",
    popular: false,
  },
  {
    id: "google",
    name: "Google Pay",
    icon: Smartphone,
    description: "Pay with Google",
    popular: false,
  },
  {
    id: "phone",
    name: "Phone Pay",
    icon: Smartphone,
    description: "UPI and mobile payments",
    popular: false,
  },
]

export default function CheckoutPage() {
  const router = useNavigate()
  const { items, total, clearCart } = useCart()
//   const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [paymentProgress, setPaymentProgress] = useState(0)
  const [paymentStatus, setPaymentStatus] = useState("")
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrCodeCopied, setQrCodeCopied] = useState(false)
  const [upiId, setUpiId] = useState("")

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [saveInfo, setSaveInfo] = useState(false)

  // Find the icon component for the currently-selected payment method
  const SelectedPaymentIcon = paymentMethods.find((m) => m.id === selectedPayment)?.icon

  useEffect(() => {
    if (items.length === 0) {
      router("/cart")
    }
  }, [items, router])

  useEffect(() => {
    if (sameAsShipping) {
      setBillingInfo({
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        apartment: shippingInfo.apartment,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country,
      })
    }
  }, [sameAsShipping, shippingInfo])

  // Auto-redirect after showing success dialog
  useEffect(() => {
    if (!showSuccess) return

    const timer = setTimeout(() => {
      handleSuccessClose()
    }, 8000)

    return () => clearTimeout(timer)
  }, [showSuccess])

  const handleShippingChange = (field, value) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleBillingChange = (field, value) => {
    setBillingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleCardChange = (field, value) => {
    let formattedValue = value

    if (field === "number") {
      // Format card number with spaces
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    } else if (field === "expiry") {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5)
    } else if (field === "cvv") {
      // Limit CVV to 4 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setCardInfo((prev) => ({ ...prev, [field]: formattedValue }))
  }

  const validateStep1 = () => {
    return (
      shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.email &&
      shippingInfo.phone &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zipCode
    )
  }

  const validateStep2 = () => {
    if (selectedPayment === "card") {
      return cardInfo.number && cardInfo.expiry && cardInfo.cvv && cardInfo.name
    } else if (selectedPayment === "phone" && !upiId) {
      return false
    }
    return true
  }

  const copyUPIId = () => {
    const upiString = `luxe@paytm`
    navigator.clipboard.writeText(upiString)
    setQrCodeCopied(true)
    // toast({
    //   title: "UPI ID Copied!",
    //   description: "UPI ID has been copied to clipboard",
    // })
    setTimeout(() => setQrCodeCopied(false), 2000)
  }

  const processPayment = async () => {
    setIsProcessing(true)
    setPaymentProgress(0)

    // Generate order number
    const newOrderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    setOrderNumber(newOrderNumber)

    try {
      // Different payment flows based on selected method
      if (selectedPayment === "card") {
        await processCardPayment()
      } else if (selectedPayment === "paypal") {
        await processPayPalPayment()
      } else if (selectedPayment === "apple") {
        await processApplePayPayment()
      } else if (selectedPayment === "google") {
        await processGooglePayPayment()
      } else if (selectedPayment === "phone") {
        await processPhonePayPayment()
      }

      // Add final success step
      setPaymentStatus("Payment successful! 🎉")
      setPaymentProgress(100)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear cart and show success
      clearCart()
      setIsProcessing(false)
      setShowSuccess(true)

      // Show success toast
    //   toast({
    //     title: "🎉 Payment Successful!",
    //     description: `Order ${newOrderNumber} has been confirmed successfully!`,
    //   })
    } catch (error) {
      console.error("Payment failed:", error)
    //   toast({
    //     title: "Payment Failed",
    //     description: "There was an error processing your payment. Please try again.",
    //     variant: "destructive",
    //   })
      setIsProcessing(false)
      setPaymentProgress(0)
      setPaymentStatus("")
    }
  }

  const processCardPayment = async () => {
    const steps = [
      { status: "Validating card details...", delay: 1500 },
      { status: "Contacting bank...", delay: 2000 },
      { status: "Processing payment...", delay: 2500 },
      { status: "Confirming transaction...", delay: 1500 },
    ]

    for (let i = 0; i < steps.length; i++) {
      setPaymentStatus(steps[i].status)
      setPaymentProgress(((i + 1) / steps.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, steps[i].delay))
    }
  }

  const processPayPalPayment = async () => {
    const steps = [
      { status: "Redirecting to PayPal...", delay: 1000 },
      { status: "Authenticating with PayPal...", delay: 2000 },
      { status: "Processing PayPal payment...", delay: 2500 },
      { status: "Confirming transaction...", delay: 1500 },
    ]

    for (let i = 0; i < steps.length; i++) {
      setPaymentStatus(steps[i].status)
      setPaymentProgress(((i + 1) / steps.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, steps[i].delay))
    }
  }

  const processApplePayPayment = async () => {
    const steps = [
      { status: "Requesting Touch ID/Face ID...", delay: 1500 },
      { status: "Authenticating with Apple Pay...", delay: 2000 },
      { status: "Processing secure payment...", delay: 2000 },
      { status: "Confirming transaction...", delay: 1500 },
    ]

    for (let i = 0; i < steps.length; i++) {
      setPaymentStatus(steps[i].status)
      setPaymentProgress(((i + 1) / steps.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, steps[i].delay))
    }
  }

  const processGooglePayPayment = async () => {
    const steps = [
      { status: "Opening Google Pay...", delay: 1000 },
      { status: "Authenticating with Google...", delay: 2000 },
      { status: "Processing Google Pay payment...", delay: 2500 },
      { status: "Confirming transaction...", delay: 1500 },
    ]

    for (let i = 0; i < steps.length; i++) {
      setPaymentStatus(steps[i].status)
      setPaymentProgress(((i + 1) / steps.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, steps[i].delay))
    }
  }

  const processPhonePayPayment = async () => {
    const steps = [
      { status: "Generating UPI request...", delay: 1500 },
      { status: "Waiting for UPI confirmation...", delay: 3000 },
      { status: "Processing UPI payment...", delay: 2500 },
      { status: "Confirming transaction...", delay: 1500 },
    ]

    for (let i = 0; i < steps.length; i++) {
      setPaymentStatus(steps[i].status)
      setPaymentProgress(((i + 1) / steps.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, steps[i].delay))
    }
  }

  const handleSuccessClose = () => {
    // Add a small delay before closing to let user see the success
    setTimeout(() => {
      setShowSuccess(false)
      // Add another delay before navigation
      setTimeout(() => {
        router("/orders")
      }, 500)
    }, 300)
  }

  const handleStepTransition = async (nextStep) => {
    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    setCurrentStep(nextStep)
  }

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link to="/products">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Complete your purchase</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? "text-purple-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div
              className={`w-16 h-0.5 transition-all duration-500 ${currentStep >= 2 ? "bg-purple-600" : "bg-gray-300"}`}
            />
            <div className={`flex items-center ${currentStep >= 2 ? "text-purple-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div
              className={`w-16 h-0.5 transition-all duration-500 ${currentStep >= 3 ? "bg-purple-600" : "bg-gray-300"}`}
            />
            <div className={`flex items-center ${currentStep >= 3 ? "text-purple-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  currentStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                3
              </div>
              <span className="ml-2 font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card className="animate-in slide-in-from-right-5 duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleShippingChange("firstName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleShippingChange("lastName", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleShippingChange("email", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleShippingChange("phone", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange("address", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (Optional)</Label>
                    <Input
                      id="apartment"
                      value={shippingInfo.apartment}
                      onChange={(e) => handleShippingChange("apartment", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleShippingChange("city", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleShippingChange("state", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleShippingChange("zipCode", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="saveInfo" checked={saveInfo} onCheckedChange={setSaveInfo} />
                    <Label htmlFor="saveInfo">Save this information for next time</Label>
                  </div>

                  <Button
                    onClick={() => handleStepTransition(2)}
                    disabled={!validateStep1()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-500">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedPayment === method.id
                              ? "border-purple-500 bg-purple-50 scale-[1.02]"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                                selectedPayment === method.id ? "border-purple-500 bg-purple-500" : "border-gray-300"
                              }`}
                            >
                              {selectedPayment === method.id && (
                                <div className="w-full h-full rounded-full bg-white scale-50" />
                              )}
                            </div>
                            <method.icon className="h-6 w-6 text-gray-600" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{method.name}</span>
                                {method.popular && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">Popular</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Card Details */}
                {selectedPayment === "card" && (
                  <Card className="animate-in slide-in-from-bottom-5 duration-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Card Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          value={cardInfo.name}
                          onChange={(e) => handleCardChange("name", e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.number}
                          onChange={(e) => handleCardChange("number", e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={(e) => handleCardChange("expiry", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              type={showCardDetails ? "text" : "password"}
                              placeholder="123"
                              value={cardInfo.cvv}
                              onChange={(e) => handleCardChange("cvv", e.target.value)}
                              className="mt-2 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-2 h-8 w-8"
                              onClick={() => setShowCardDetails(!showCardDetails)}
                            >
                              {showCardDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Google Pay Details */}
                {selectedPayment === "google" && (
                  <Card className="animate-in slide-in-from-bottom-5 duration-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Google Pay
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Pay with Google Pay</h3>
                      <p className="text-gray-600 mb-4">
                        You'll be redirected to Google Pay to complete your payment securely.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          ✓ Secure payment with Google's advanced security
                          <br />✓ No need to enter card details
                          <br />✓ Quick and convenient checkout
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Phone Pay Details */}
                {selectedPayment === "phone" && (
                  <Card className="animate-in slide-in-from-bottom-5 duration-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        Phone Pay / UPI
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <div className="text-center">
                            <QrCode className="h-24 w-24 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">QR Code for Payment</p>
                            <p className="text-xs text-gray-500">Scan with any UPI app</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-600 mb-2">UPI ID:</p>
                          <div className="flex items-center justify-center gap-2">
                            <code className="bg-white px-3 py-1 rounded border">luxe@paytm</code>
                            <Button variant="outline" size="sm" onClick={copyUPIId} className="h-8">
                              {qrCodeCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="text-left">
                          <Label htmlFor="upiId">Your UPI ID (Optional)</Label>
                          <Input
                            id="upiId"
                            placeholder="yourname@paytm"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="mt-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">Enter your UPI ID for faster future payments</p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4">
                          <p className="text-sm text-purple-800">
                            ✓ Scan QR code with any UPI app
                            <br />✓ Or copy UPI ID and pay manually
                            <br />✓ Instant payment confirmation
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Apple Pay Details */}
                {selectedPayment === "apple" && (
                  <Card className="animate-in slide-in-from-bottom-5 duration-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Apple Pay
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Pay with Apple Pay</h3>
                      <p className="text-gray-600 mb-4">Use Touch ID or Face ID to complete your payment securely.</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-800">
                          ✓ Secure payment with biometric authentication
                          <br />✓ No card details stored on device
                          <br />✓ Quick and secure checkout
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* PayPal Details */}
                {selectedPayment === "paypal" && (
                  <Card className="animate-in slide-in-from-bottom-5 duration-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5" />
                        PayPal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wallet className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Pay with PayPal</h3>
                      <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your payment.</p>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          ✓ Buyer protection included
                          <br />✓ Pay with PayPal balance or linked cards
                          <br />✓ Secure and trusted payment method
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sameAsShipping" checked={sameAsShipping} onCheckedChange={setSameAsShipping} />
                      <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                    </div>

                    {!sameAsShipping && (
                      <div className="space-y-4 animate-in slide-in-from-top-5 duration-500">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingFirstName">First Name *</Label>
                            <Input
                              id="billingFirstName"
                              value={billingInfo.firstName}
                              onChange={(e) => handleBillingChange("firstName", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingLastName">Last Name *</Label>
                            <Input
                              id="billingLastName"
                              value={billingInfo.lastName}
                              onChange={(e) => handleBillingChange("lastName", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="billingAddress">Address *</Label>
                          <Input
                            id="billingAddress"
                            value={billingInfo.address}
                            onChange={(e) => handleBillingChange("address", e.target.value)}
                            className="mt-2"
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="billingCity">City *</Label>
                            <Input
                              id="billingCity"
                              value={billingInfo.city}
                              onChange={(e) => handleBillingChange("city", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingState">State *</Label>
                            <Input
                              id="billingState"
                              value={billingInfo.state}
                              onChange={(e) => handleBillingChange("state", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingZipCode">ZIP Code *</Label>
                            <Input
                              id="billingZipCode"
                              value={billingInfo.zipCode}
                              onChange={(e) => handleBillingChange("zipCode", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => handleStepTransition(1)} className="flex-1">
                    Back to Shipping
                  </Button>
                  <Button
                    onClick={() => handleStepTransition(3)}
                    disabled={!validateStep2()}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-5 duration-500">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <div className="text-sm text-gray-600">
                        <p>
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p>{shippingInfo.address}</p>
                        {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                        <p>
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        </p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <div className="flex items-center gap-2">
                        {SelectedPaymentIcon && <SelectedPaymentIcon className="h-5 w-5" />}
                        <span>{paymentMethods.find((m) => m.id === selectedPayment)?.name}</span>
                        {selectedPayment === "card" && cardInfo.number && (
                          <span className="text-sm text-gray-600">ending in {cardInfo.number.slice(-4)}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => handleStepTransition(2)} className="flex-1">
                    Back to Payment
                  </Button>
                  <Button
                    onClick={processPayment}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {paymentStatus || "Processing Payment..."}
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Complete Payment
                      </>
                    )}
                  </Button>
                </div>

                {/* Payment Progress */}
                {isProcessing && (
                  <Card className="animate-in slide-in-from-bottom-5 duration-500">
                    <CardContent className="py-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Processing Your Payment</h3>
                        <p className="text-sm text-gray-600 mb-4">{paymentStatus}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${paymentProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{Math.round(paymentProgress)}% Complete</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={() => {}}>
        <DialogContent className="max-w-lg">
          <div className="text-center py-8">
            {/* Celebration Animation */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-in zoom-in-50 duration-700">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              {/* Confetti Effect */}
              <div
                className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="absolute -top-1 -right-3 w-4 h-4 bg-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
              <div
                className="absolute -bottom-1 -left-3 w-5 h-5 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.6s" }}
              />
              <div
                className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.8s" }}
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">🎉 Payment Successful!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Congratulations! Your order has been confirmed and is being processed.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm font-medium text-gray-700">Order Confirmed</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="font-bold text-2xl text-gray-900 mb-3">{orderNumber}</p>
              <p className="text-sm text-gray-600">Total Amount: ${(total * 1.08).toFixed(2)}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>✅ Email confirmation sent to {shippingInfo.email}</p>
                <p>📦 Order will be packed within 24 hours</p>
                <p>🚚 Tracking details will be shared soon</p>
                <p>📱 SMS updates on {shippingInfo.phone}</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-8">
              Thank you for choosing LUXE! We appreciate your business and hope you love your purchase.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccess(false)
                  setTimeout(() => router.push("/products"), 300)
                }}
                className="flex-1"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={handleSuccessClose}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              >
                View My Orders
              </Button>
            </div>

            {/* Auto-close timer */}
            <p className="text-xs text-gray-400 mt-4">
              This dialog will automatically redirect you in a few seconds...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
