"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Gift } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-orange-500 rounded-full flex items-center justify-center">
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Stay Updated with
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {" "}
                      Fashion Trends
                    </span>
                  </h2>

                  <p className="text-lg text-gray-600 mb-6">
                    Subscribe to our newsletter and get exclusive access to new collections, special offers, and style
                    tips.
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Early access to new collections</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Exclusive discounts and offers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Style tips from fashion experts</span>
                    </div>
                  </div>
                </div>

                {isSubscribed ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 animate-in fade-in-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="text-lg font-semibold text-green-800">Thank you for subscribing! 🎉</p>
                        <p className="text-green-600">You'll receive our latest updates soon.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 h-12 px-4 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 px-8 font-semibold"
                      >
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      By subscribing, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                )}
              </div>

              {/* Right Side - Visual */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse" />
                  <div
                    className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-20 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />

                  {/* Main Visual */}
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <Mail className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Join 50K+ Subscribers</h3>
                    <p className="text-gray-600">Fashion lovers worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
