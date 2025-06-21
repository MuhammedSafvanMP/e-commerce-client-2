"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../context/Cart-context";
import { useWishlist } from "../context/Wishlist-context";
import { useAuth } from "../context/Auth-context";
// import { useToast } from "@/hooks/use-toast"
import AuthModal from "./Auth-modal";
import { Link, useNavigate } from "react-router-dom";

const newArrivalImages = [
  {
    id: 1,
    image: "/s8.jpg",
    name: "Silk Evening Dress",
    category: "women",
    price: 1999.99,
  },
  {
    id: 2,
    image: "/g6.jpg",
    name: "Premium Leather Jacket",
    category: "men",
    price: 999.99,
  },
  {
    id: 3,
    image: "/b2.jpg",
    name: "Designer Handbag",
    category: "accessories",
    price: 899.99,
  },
  {
    id: 4,
    image: "/s9.jpg",
    name: "Casual Sneakers",
    category: "shoes",
    price: 599.99,
  },
  {
    id: 5,
    image: "/g9.jpg",
    name: "Wool Coat",
    category: "outerwear",
    price: 449.99,
  },
  {
    id: 6,
    image: "/s1.jpg",
    name: "Summer Blouse",
    category: "women",
    price: 199.99,
  },
  {
    id: 7,
    image: "/s6.jpg",
    name: "Denim Jeans",
    category: "men",
    price: 399.99,
  },
  {
    id: 8,
    image: "/bo5.jpg",
    name: "Statement Necklace",
    category: "jewelry",
    price: 599.99,
  },
  {
    id: 9,
    image: "/g2.jpg",
    name: "Athletic Wear",
    category: "sports",
    price: 449.99,
  },
  {
    id: 10,
    image: "/g4.jpg",
    name: "Formal Shirt",
    category: "men",
    price: 299.99,
  },
];

export default function NewArrivals() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const router = useNavigate();

  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const { isAuthenticated } = useAuth();
  //   const { toast } = useToast()

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      setPendingAction({ type: "cart", product });
      setShowAuthModal(true);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: "M",
      color: "black",
    });

    // toast({
    //   title: "Added to Cart! 🛒",
    //   description: `${product.name} has been added to your cart.`,
    //   duration: 3000,
    // })
  };

  const handleWishlistToggle = (product, event) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      setPendingAction({ type: "wishlist", product });
      setShowAuthModal(true);
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      //   toast({
      //     title: "Removed from Wishlist 💔",
      //     description: `${product.name} has been removed from your wishlist.`,
      //     duration: 3000,
      //   })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      //   toast({
      //     title: "Added to Wishlist! ❤️",
      //     description: `${product.name} has been saved to your wishlist.`,
      //     duration: 3000,
      //   })
    }
  };

  const handleAuthSuccess = () => {
    if (pendingAction) {
      if (pendingAction.type === "cart") {
        addItem({
          id: pendingAction.product.id,
          name: pendingAction.product.name,
          price: pendingAction.product.price,
          image: pendingAction.product.image,
          quantity: 1,
          size: "M",
          color: "black",
        });
        // toast({
        //   title: "Added to Cart! 🛒",
        //   description: `${pendingAction.product.name} has been added to your cart.`,
        //   duration: 3000,
        // })
      } else if (pendingAction.type === "wishlist") {
        addToWishlist({
          id: pendingAction.product.id,
          name: pendingAction.product.name,
          price: pendingAction.product.price,
          image: pendingAction.product.image,
          category: pendingAction.product.category,
        });
        // toast({
        //   title: "Added to Wishlist! ❤️",
        //   description: `${pendingAction.product.name} has been saved to your wishlist.`,
        //   duration: 3000,
        // })
      }
      setPendingAction(null);
    }
    setShowAuthModal(false);
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
    setPendingAction(null);
  };

  // Split products into two rows of 4 each
  const topRowProducts = newArrivalImages.slice(0, 4);
  const bottomRowProducts = newArrivalImages.slice(4, 8);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 text-lg font-medium mb-6">
              <Sparkles className="h-5 w-5 mr-2" />
              Latest Collection
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Fresh
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Arrivals
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our newest fashion pieces in a stunning visual display.
            </p>
          </div>

          {/* Two-Row Product Display */}
          <div className="space-y-8">
            {/* Top Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRowProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => handleProductClick(product.id)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Animated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Floating Action Buttons */}
                    <div
                      className={`absolute top-4 right-4 transition-all duration-300 z-10 ${
                        hoveredProduct === product.id
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-75 -translate-y-2"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white shadow-lg animate-bounce"
                          onClick={(e) => handleWishlistToggle(product, e)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isAuthenticated && isInWishlist(product.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white shadow-lg animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div
                      className={`absolute bottom-4 left-4 right-4 text-white transition-all duration-500 ${
                        hoveredProduct === product.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-white/30 capitalize">
                        {product.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-xl font-semibold">${product.price}</p>
                    </div>

                    {/* Animated Border */}
                    <div
                      className={`absolute inset-0 rounded-3xl border-2 transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "border-white/50"
                          : "border-transparent"
                      }`}
                    />

                    {/* New Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse">
                        <Sparkles className="h-3 w-3 mr-1" />
                        NEW
                      </Badge>
                    </div>

                    {/* Click to View Overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
                        Click to View Details
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bottomRowProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => handleProductClick(product.id)}
                  style={{
                    animationDelay: `${(index + 4) * 100}ms`,
                  }}
                >
                  <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Animated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Floating Action Buttons */}
                    <div
                      className={`absolute top-4 right-4 transition-all duration-300 z-10 ${
                        hoveredProduct === product.id
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-75 -translate-y-2"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white shadow-lg animate-bounce"
                          onClick={(e) => handleWishlistToggle(product, e)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isAuthenticated && isInWishlist(product.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white shadow-lg animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div
                      className={`absolute bottom-4 left-4 right-4 text-white transition-all duration-500 ${
                        hoveredProduct === product.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-white/30 capitalize">
                        {product.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-xl font-semibold">${product.price}</p>
                    </div>

                    {/* Animated Border */}
                    <div
                      className={`absolute inset-0 rounded-3xl border-2 transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "border-white/50"
                          : "border-transparent"
                      }`}
                    />

                    {/* New Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse">
                        <Sparkles className="h-3 w-3 mr-1" />
                        NEW
                      </Badge>
                    </div>

                    {/* Click to View Overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
                        Click to View Details
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link to="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group rounded-full"
              >
                Explore All Products
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={handleAuthClose}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}

// "use client";

// import { useState } from "react";
// import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Link } from "react-router-dom";

// const newArrivalImages = [
//   {
//     id: 1,
//     image: "/s8.jpg",
//     name: "Silk Evening Dress",
//     category: "women",
//   },
//   {
//     id: 2,
//     image: "/g6.jpg",
//     name: "Premium Leather Jacket",
//     category: "men",
//   },
//   {
//     id: 3,
//     image: "/b2.jpg",
//     name: "Designer Handbag",
//     category: "accessories",
//   },
//   {
//     id: 4,
//     image: "/s9.jpg",
//     name: "Casual Sneakers",
//     category: "shoes",
//   },
//   {
//     id: 5,
//     image: "/g3.jpg",
//     name: "Wool Coat",
//     category: "outerwear",
//   },
//   {
//     id: 6,
//     image: "/s3.jpg",
//     name: "Summer Blouse",
//     category: "women",
//   },
//   {
//     id: 7,
//     image: "/s5.jpg",
//     name: "Denim Jeans",
//     category: "men",
//   },
//   {
//     id: 8,
//     image: "/b1.jpg",
//     name: "Statement Necklace",
//     category: "jewelry",
//   },
//   {
//     id: 9,
//     image: "/g2.jpg",
//     name: "Athletic Wear",
//     category: "sports",
//   },
//   {
//     id: 10,
//     image: "/g4.jpg",
//     name: "Formal Shirt",
//     category: "men",
//   },
// ];

// export default function NewArrivals() {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [hoveredItem, setHoveredItem] = useState(null);

//   const scrollLeft = () => {
//     setScrollPosition(Math.max(0, scrollPosition - 300));
//   };

//   const scrollRight = () => {
//     const maxScroll = (newArrivalImages.length - 4) * 300;
//     setScrollPosition(Math.min(maxScroll, scrollPosition + 300));
//   };

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 text-lg font-medium mb-6">
//             <Sparkles className="h-5 w-5 mr-2" />
//             New Arrivals
//           </Badge>
//           <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
//             Latest
//             <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               {" "}
//               Collection
//             </span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Discover our newest fashion pieces, carefully curated for the modern
//             wardrobe.
//           </p>
//         </div>

//         {/* Horizontal Scrolling Images */}
//         <div className="relative">
//           {/* Navigation Buttons */}
//           <Button
//             variant="outline"
//             size="icon"
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg border-gray-200"
//             onClick={scrollLeft}
//             disabled={scrollPosition === 0}
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </Button>

//           <Button
//             variant="outline"
//             size="icon"
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg border-gray-200"
//             onClick={scrollRight}
//             disabled={scrollPosition >= (newArrivalImages.length - 4) * 300}
//           >
//             <ChevronRight className="h-5 w-5" />
//           </Button>

//           {/* Scrollable Container */}
//           <div className="overflow-hidden rounded-2xl bg-gray-50 p-8">
//             <div
//               className="flex gap-6 transition-transform duration-500 ease-out"
//               style={{
//                 transform: `translateX(-${scrollPosition}px)`,
//               }}
//             >
//               {newArrivalImages.map((item, index) => (
//                 <div
//                   key={item.id}
//                   className="flex-shrink-0 w-72 group cursor-pointer"
//                   onMouseEnter={() => setHoveredItem(item.id)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                 >
//                   <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//                     <img
//                       src={item.image || "/placeholder.svg"}
//                       alt={item.name}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />

//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                     {/* Category Badge */}
//                     <div
//                       className={`absolute top-4 left-4 transition-all duration-300 ${
//                         hoveredItem === item.id
//                           ? "opacity-100 translate-y-0"
//                           : "opacity-0 -translate-y-2"
//                       }`}
//                     >
//                       <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm capitalize">
//                         {item.category}
//                       </Badge>
//                     </div>

//                     {/* Product Name */}
//                     <div
//                       className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
//                         hoveredItem === item.id
//                           ? "opacity-100 translate-y-0"
//                           : "opacity-0 translate-y-4"
//                       }`}
//                     >
//                       <h3 className="text-white font-bold text-lg">
//                         {item.name}
//                       </h3>
//                     </div>

//                     {/* Hover Border Effect */}
//                     <div
//                       className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
//                         hoveredItem === item.id
//                           ? "border-purple-400 shadow-lg shadow-purple-400/25"
//                           : "border-transparent"
//                       }`}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Scroll Indicators */}
//           <div className="flex justify-center mt-6 space-x-2">
//             {Array.from({ length: Math.ceil(newArrivalImages.length / 4) }).map(
//               (_, index) => (
//                 <div
//                   key={index}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     Math.floor(scrollPosition / 1200) === index
//                       ? "bg-gradient-to-r from-purple-600 to-pink-600 scale-125"
//                       : "bg-gray-300"
//                   }`}
//                 />
//               )
//             )}
//           </div>
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-12">
//           <Link to="/products">
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
//             >
//               View All Products
//               <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
