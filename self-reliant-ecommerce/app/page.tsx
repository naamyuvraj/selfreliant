import Navbar from "./component/Navbar"
import Hero from "./component/Hero"
import PopularProducts from "./component/PopularProducts"
import TrendingProducts from "./component/TrendingProducts"
import BlogSection from "./component/BlogSection"
import Testimonials from "./component/Testimonials"
import VideoSection from "./component/VideoSection"
import Footer from "./component/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary-terracotta">
      <Navbar />
      <Hero />
      <PopularProducts />
      <TrendingProducts />
      <BlogSection />
      <Testimonials />
      <VideoSection />
      <Footer />
    </div>
  )
}
