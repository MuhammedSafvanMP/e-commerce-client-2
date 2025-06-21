"use client"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const categories = [
  {
    id: 1,
    name: "Men's Collection",
    description: "Sophisticated styles for the modern gentleman",
    image: "/bo1.jpg",
    link: "/products?category=men",
  },
  {
    id: 2,
    name: "Women's Collection",
    description: "Elegant fashion for every occasion",
    image: "/g3.jpg",
    link: "/products?category=women",
  },
  {
    id: 3,
    name: "Accessories",
    description: "Complete your look with premium accessories",
    image: "/b2.jpg",
    link: "/products?category=accessories",
  },
]

export default function CategorySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections designed for every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-fr">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full ${
                  index === 0 ? "aspect-video lg:h-full" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">{category.name}</h3>
                  <p className="text-lg mb-6 opacity-90">{category.description}</p>
                  <Link to={category.link}>
                    <Button
                      variant="secondary"
                      className="bg-white text-black hover:bg-gray-100 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
