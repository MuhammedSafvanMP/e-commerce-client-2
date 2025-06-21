import React from 'react'
import { AuthProvider } from './context/Auth-context'
import { CartProvider } from './context/Cart-context'
import { WishlistProvider } from './context/Wishlist-context'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './home/Home'
import AppRoutes from './routes/App-route'

export default function App() {
  return (
    <>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <AppRoutes />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
    </>
  )
}
