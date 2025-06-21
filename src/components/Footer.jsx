import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LUXE
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Premium fashion for the modern lifestyle. Discover quality, style, and elegance in every piece we curate
                for you.
              </p>
              <div className="flex space-x-4">
                <Link
               to="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group"
                >
                  <Facebook className="h-5 w-5 text-gray-600 group-hover:text-purple-600" />
                </Link>
                <Link
               to="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group"
                >
                  <Instagram className="h-5 w-5 text-gray-600 group-hover:text-purple-600" />
                </Link>
                <Link
               to="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group"
                >
                  <Twitter className="h-5 w-5 text-gray-600 group-hover:text-purple-600" />
                </Link>
                <Link
               to="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors group"
                >
                  <Youtube className="h-5 w-5 text-gray-600 group-hover:text-purple-600" />
                </Link>
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900">Shop</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/products" className="text-gray-600 hover:text-purple-600 transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=men" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Men's Collection
                  </Link>
                </li>
                <li>
                  <Link
                 to="/products?category=women"
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Women's Collection
                  </Link>
                </li>
                <li>
                  <Link
                 to="/products?category=accessories"
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/products?sale=true" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Sale Items
                  </Link>
                </li>
                <li>
                  <Link href="/products?new=true" className="text-gray-600 hover:text-purple-600 transition-colors">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900">Customer Service</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-purple-600 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us</p>
                    <p className="text-gray-900 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email us</p>
                    <p className="text-gray-900 font-medium">hello@luxe.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Visit us</p>
                    <p className="text-gray-900 font-medium">123 Fashion St, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2024 LUXE. All rights reserved.</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-purple-600 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-gray-600 hover:text-purple-600 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
