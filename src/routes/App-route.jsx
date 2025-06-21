import CartPage from "@/cart/Cart";
import CheckoutPage from "@/checkout/Checkout";
import Home from "@/home/Home";
import OrdersPage from "@/orders/Order";
import OrderDetailsPage from "@/orders/OrderDetails";
import ProductDetailPage from "@/products/ProductDetails";
import ProductsPage from "@/products/Products";
import WishlistPage from "@/wishlist/Wishlist";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> */}
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />

      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailsPage />} />

      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<CartPage />} />

            <Route path="/checkout" element={<CheckoutPage />} />

    </Routes>
  );
}
