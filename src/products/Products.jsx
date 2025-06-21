"use client";

import { useState, useMemo } from "react";
import { Heart, ShoppingBag, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "../context/Cart-context";
import { useWishlist } from "../context/Wishlist-context";
import { Link } from "react-router-dom";


const allProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 89.99,
    originalPrice: 120.0,
    image: "/g1.jpg",
    category: "women",
    gender: "women",
    rating: 4.8,
    reviews: 124,
    colors: ["black", "white", "navy"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
  },
   {
    id: 2,
    name: "Designer Denim Jacket",
    price: 199.99,
    image: "/bo6.jpg",
    category: "men",
    gender: "men",
    rating: 4.9,
    reviews: 89,
    colors: ["blue", "black"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Designer Denim Jacket",
    price: 199.99,
    image: "/g2.jpg",
    category: "women",
    gender: "women",
    rating: 4.9,
    reviews: 89,
    colors: ["blue", "black"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isSale: false,
  },
  {
    id: 4,
    name: "Luxury Sneakers",
    price: 299.99,
    originalPrice: 350.0,
    image: "/s1.jpg",
    category: "shoes",
    gender: "unisex",
    rating: 4.7,
    reviews: 203,
    colors: ["white", "black", "gray"],
    sizes: ["7", "8", "9", "10", "11"],
    isNew: false,
    isSale: true,
  },
  {
    id: 5,
    name: "Silk Blend Dress",
    price: 249.99,
    image: "/g4.jpg",
    category: "women",
    gender: "women",
    rating: 4.9,
    reviews: 67,
    colors: ["red", "black", "navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
  },
  {
    id: 6,
    name: "Classic Polo Shirt",
    price: 79.99,
    image: "/g5.jpg",
    category: "women",
    gender: "women",
    rating: 4.6,
    reviews: 156,
    colors: ["white", "navy", "green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
  },
  {
    id: 7,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/g6.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
   {
    id: 8,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/bo5.jpg",
    category: "men",
    gender: "men",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
  {
    id: 9,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/g8.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },

    {
    id: 10,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/g7.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
    {
    id: 11,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/s3.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
  {
    id: 12,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/b2.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
  {
   id: 13,
   name: "Leather Handbag",
   price: 399.99,
   originalPrice: 450.0,
   image: "/bo4.jpg",
   category: "men",
   gender: "men",
   rating: 4.8,
   reviews: 92,
   colors: ["black", "brown", "tan"],
   sizes: ["One Size"],
   isNew: false,
   isSale: true,
 },
    {
    id: 14,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/s5.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
    {
    id: 15,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/s6.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
    {
    id: 16,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/b1.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: true,
    isSale: false,
  },
   {
    id: 17,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/bo2.jpg",
    category: "men",
    gender: "men",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: true,
    isSale: false,
  },
    {
    id: 18,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/s8.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: true,
    isSale: false,
  },
    {
    id: 19,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/s9.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: true,
    isSale: false,
  },
    {
    id: 20,
    name: "Leather Handbag",
    price: 399.99,
    originalPrice: 450.0,
    image: "/g9.jpg",
    category: "accessories",
    gender: "women",
    rating: 4.8,
    reviews: 92,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
];

export default function ProductsPage() {
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    sizes: [],
    gender: [],
    priceRange: [0, 500],
  });

  const [sortBy, setSortBy] = useState("featured");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Color filter
      if (
        filters.colors.length > 0 &&
        !product.colors.some((color) => filters.colors.includes(color))
      ) {
        return false;
      }

      // Size filter
      if (
        filters.sizes.length > 0 &&
        !product.sizes.some((size) => filters.sizes.includes(size))
      ) {
        return false;
      }

      // Gender filter
      if (
        filters.gender.length > 0 &&
        !filters.gender.includes(product.gender) &&
        product.gender !== "unisex"
      ) {
        return false;
      }

      // Price filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const handleFilterChange = (type, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [type]: checked
        ? [...prev[type], value]
        : prev[type].filter((item) => item !== value),
    }));
  };

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
    });
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, priceRange: value }))
          }
          max={500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {["men", "women", "shoes", "accessories"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) =>
                  handleFilterChange("categories", category, checked)
                }
              />
              <Label htmlFor={category} className="capitalize">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <h3 className="font-semibold mb-4">Gender</h3>
        <div className="space-y-2">
          {["men", "women", "unisex"].map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={gender}
                checked={filters.gender.includes(gender)}
                onCheckedChange={(checked) =>
                  handleFilterChange("gender", gender, checked)
                }
              />
              <Label htmlFor={gender} className="capitalize">
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold mb-4">Colors</h3>
        <div className="space-y-2">
          {[
            "black",
            "white",
            "navy",
            "blue",
            "red",
            "gray",
            "brown",
            "green",
            "tan",
          ].map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={filters.colors.includes(color)}
                onCheckedChange={(checked) =>
                  handleFilterChange("colors", color, checked)
                }
              />
              <Label htmlFor={color} className="capitalize flex items-center">
                <div
                  className="w-4 h-4 rounded-full border mr-2"
                  style={{
                    backgroundColor: color === "navy" ? "#1e3a8a" : color,
                  }}
                />
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-4">Sizes</h3>
        <div className="space-y-2">
          {[
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL",
            "7",
            "8",
            "9",
            "10",
            "11",
            "One Size",
          ].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={filters.sizes.includes(size)}
                onCheckedChange={(checked) =>
                  handleFilterChange("sizes", size, checked)
                }
              />
              <Label htmlFor={size}>{size}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Products
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0 ">
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              {/* <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent> */}
              <SheetContent side="left" className="w-80 p-0 flex flex-col ">
                <div className="p-6 border-b">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                </div>
                <div className="overflow-y-auto px-6 py-4 flex-1">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 bg-white rounded-lg p-6 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setFilters({
                    categories: [],
                    colors: [],
                    sizes: [],
                    gender: [],
                    priceRange: [0, 500],
                  })
                }
              >
                Clear All
              </Button>
            </div>
            <FilterContent />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          New
                        </Badge>
                      )}
                      {product.isSale && (
                        <Badge className="bg-red-500 hover:bg-red-600">
                          Sale
                        </Badge>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-4 right-4 bg-white/80 hover:bg-white transition-all duration-200 ${
                        hoveredProduct === product.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>

                    {/* Quick Add to Cart */}
                    <div
                      className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <Button
                        className="w-full bg-black hover:bg-gray-800 text-white"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>

                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Color Options */}
                    <div className="flex items-center gap-2">
                      {product.colors.slice(0, 3).map((color) => (
                        <div
                          key={color}
                          className={`w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors`}
                          style={{
                            backgroundColor:
                              color === "navy" ? "#1e3a8a" : color,
                          }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-sm text-gray-500">
                          +{product.colors.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500 mb-4">
                  No products found matching your filters
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      categories: [],
                      colors: [],
                      sizes: [],
                      gender: [],
                      priceRange: [0, 500],
                    })
                  }
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
