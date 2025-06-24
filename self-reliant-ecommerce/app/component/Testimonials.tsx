"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote, Users, Award } from "lucide-react"
import MandalaPattern from "./MandalaPatterns"

const testimonials = [
  {
    id: 1,
    name: "Emily Rodriguez",
    rating: 5,
    comment:
      "The handcrafted jewelry I ordered exceeded my expectations. The attention to detail and quality is absolutely remarkable!",
    product: "Silver Thread Embroidery",
    location: "California, USA",
    avatar: "/placeholder.svg?height=60&width=60&text=ER",
  },
  {
    id: 2,
    name: "David Thompson",
    rating: 5,
    comment:
      "Beautiful bamboo baskets that are both functional and artistic. Great quality, fast shipping, and excellent customer service.",
    product: "Handwoven Bamboo Basket",
    location: "Texas, USA",
    avatar: "/placeholder.svg?height=60&width=60&text=DT",
  },
  {
    id: 3,
    name: "Lisa Wang",
    rating: 5,
    comment:
      "The mandala art piece is absolutely stunning. It's become the centerpiece of my living room and always gets compliments.",
    product: "Intricate Mandala Art",
    location: "New York, USA",
    avatar: "/placeholder.svg?height=60&width=60&text=LW",
  },
  {
    id: 4,
    name: "James Miller",
    rating: 5,
    comment:
      "Excellent customer service and authentic handcrafted products. The artisan stories make each piece even more special.",
    product: "Wooden Photo Frame",
    location: "Florida, USA",
    avatar: "/placeholder.svg?height=60&width=60&text=JM",
  },
  {
    id: 5,
    name: "Sarah Chen",
    rating: 5,
    comment:
      "The pottery I received was even more beautiful in person. You can feel the love and craftsmanship in every piece.",
    product: "Handcrafted Ceramic Vase",
    location: "Oregon, USA",
    avatar: "/placeholder.svg?height=60&width=60&text=SC",
  },
  {
    id: 6,
    name: "Michael Kumar",
    rating: 5,
    comment:
      "Amazing quality textiles with rich colors and patterns. The story behind each piece makes them truly special.",
    product: "Traditional Handwoven Textile",
    location: "Washington, USA",
    avatar: "/placeholder.svg?height=60&width=60&text=MK",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / itemsPerView))
    }, 4000)

    return () => clearInterval(interval)
  }, [itemsPerView])

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(testimonials.length / itemsPerView)) % Math.ceil(testimonials.length / itemsPerView),
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / itemsPerView))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const totalSlides = Math.ceil(testimonials.length / itemsPerView)

  return (
    <section className="py-20 relative" style={{ backgroundColor: "#d69264" }}>
      {/* Decorative Elements */}
      <div className="absolute top-12 left-12 opacity-10">
        <div className="w-20 h-20 border-3 border-white rounded-full flex items-center justify-center">
          <Users className="h-10 w-10 text-white" />
        </div>
      </div>
      <div className="absolute top-20 right-20 opacity-10">
        <Quote className="h-16 w-16 text-white transform rotate-12" />
      </div>
      <div className="absolute bottom-16 left-16 opacity-10">
        <div className="w-18 h-18 border-2 border-white rounded-lg transform -rotate-12">
          <Award className="h-8 w-8 text-white m-auto mt-4" />
        </div>
      </div>

      {/* Enhanced Mandala and Lippan Art Elements */}
      <div className="absolute top-1/4 right-16">
        <MandalaPattern type="mandala3" size="xl" opacity={0.15} />
      </div>
      <div className="absolute bottom-1/3 left-20">
        <MandalaPattern type="lippan1" size="xl" opacity={0.15} />
      </div>
      <div className="absolute top-1/2 left-8">
        <MandalaPattern type="mandala2" size="lg" opacity={0.12} />
      </div>
      <div className="absolute bottom-1/4 right-8">
        <MandalaPattern type="lippan2" size="lg" opacity={0.12} />
      </div>
      <div className="absolute top-20 left-1/3">
        <MandalaPattern type="mandala1" size="md" opacity={0.1} />
      </div>
      <div className="absolute bottom-20 right-1/3">
        <MandalaPattern type="lippan1" size="md" opacity={0.12} />
      </div>
      <div className="absolute top-1/3 right-1/4">
        <MandalaPattern type="mandala3" size="sm" opacity={0.1} />
      </div>
      <div className="absolute bottom-1/2 left-1/4">
        <MandalaPattern type="lippan2" size="sm" opacity={0.1} />
      </div>

      {/* Traditional Pattern */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-white/40"></div>
            <Quote className="h-6 w-6 text-white/60 mx-4" />
            <div className="w-12 h-0.5 bg-white/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Customers Say</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Real feedback from our valued customers who have experienced the beauty of authentic handcrafted products.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 group"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-primary-dark group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 group"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-primary-dark group-hover:scale-110 transition-transform" />
          </button>

          {/* Testimonials Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className={`grid gap-8 ${
                      itemsPerView === 1
                        ? "grid-cols-1"
                        : itemsPerView === 2
                          ? "grid-cols-2"
                          : itemsPerView === 3
                            ? "grid-cols-3"
                            : "grid-cols-4"
                    }`}
                  >
                    {testimonials
                      .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                      .map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full"
                        >
                          <div className="flex items-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.comment}"</p>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <img
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-primary-dark">{testimonial.name}</p>
                              <p className="text-sm text-gray-500">{testimonial.location}</p>
                              <p className="text-sm text-primary-gold mt-1 font-medium">
                                Purchased: {testimonial.product}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to testimonial slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
