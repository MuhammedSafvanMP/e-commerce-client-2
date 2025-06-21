
import CategorySection from "@/components/Category-section"
import NewArrivals from "@/components/Featured-products"
import Hero3D from "@/components/Hero-3d"
import Newsletter from "@/components/Newsletter"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero3D />
      <NewArrivals />
      <CategorySection />
      <Newsletter />
    </main>
  )
}
