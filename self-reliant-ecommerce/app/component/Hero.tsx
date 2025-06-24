"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  const heroImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Madhubani_banner-KM4iMdMHCITqqiiNa4A656cxhHQ9wo.webp",
      alt: "Artisan hands creating intricate Madhubani art with vibrant colors and traditional patterns",
      title: "Madhubani Art",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/india-offers-wide-range-handicrafts-crafted-artisans-mainly-villages-other-rural-parts-country-each-142561596-0L3dNXgXmp1x0TxX9XtqdhiHXpsRPJ.webp",
      alt: "Collection of traditional Indian handicrafts including colorful wooden toys and decorative artifacts",
      title: "Traditional Handicrafts",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bd39862d8902e0497c4a41833b523a70-K7rUdMFH9mtVjl5KE1SGUdI1qejjul.webp",
      alt: "Elderly woman artisan in traditional sari working on traditional paintings and scrolls",
      title: "Traditional Paintings",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1459429078-612x612.jpg-eKWNvIElCDz8kjBTmSp0sdhaMDxrI9.jpeg",
      alt: "Artisan working on traditional loom, weaving textiles with geometric patterns",
      title: "Handwoven Textiles",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-458417619-612x612.jpg-R65PBkWlZx9uwZtbJu7yA2MY27OFLe.jpeg",
      alt: "Craftsman in traditional Rajasthani attire working with colorful woven carpets and textiles",
      title: "Carpet Weaving",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/360_F_313642757_74cCIizBFxVh7eL8lqvmZz666N02sOxq.jpg-1qFIlcloXT6ZjUo4p0XvrKrvXfD3GV.jpeg",
      alt: "Elderly potter in traditional dress working on pottery wheel, shaping clay vessels",
      title: "Traditional Pottery",
    },
  ]

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const goToImage = (index: number) => {
    setCurrentImage(index)
  }

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image Gallery */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-none">Self Reliant</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          Discover authentic handcrafted treasures from talented artisans around the world
        </p>

        {/* Current Image Title */}
        <div className="mb-8">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            Featured: {heroImages[currentImage].title}
          </span>
        </div>

        <button className="bg-accent-green hover:bg-accent-green/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
          Explore Collection
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-accent-green transition-all duration-300 ease-linear"
          style={{
            width: `${((currentImage + 1) / heroImages.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
