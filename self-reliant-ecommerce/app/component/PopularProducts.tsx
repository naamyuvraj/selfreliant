"use client";

import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductsContext";
import { Sparkles, Heart, Star } from "lucide-react";
import MandalaPattern from "./MandalaPatterns";

export default function PopularProducts() {
  const { products } = useProducts();

  return (
    <section className="py-20 relative" style={{ backgroundColor: "#d69264" }}>
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-white strokeWidth={5}" />
          </div>
        </div>
      </div>
      <div className="absolute top-16 right-16 opacity-10">
        <Sparkles className="h-16 w-16 text-white" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-10">
        <div className="w-20 h-20 border-3 border-white transform rotate-45">
          <div className="w-10 h-10 border-2 border-white m-auto mt-4 transform -rotate-45">
            <Star className="h-5 w-5 text-white m-auto mt-2" />
          </div>
        </div>
      </div>

      {/* Enhanced Mandala and Lippan Art Elements */}
      <div className="absolute top-1/4 right-12">
        <MandalaPattern type="mandala3" size="xl" opacity={0.6} />
      </div>
      <div className="absolute bottom-1/3 left-16">
        <MandalaPattern type="lippan2" size="lg" opacity={0.45} />
      </div>
      <div className="absolute top-1/2 left-8">
        <MandalaPattern type="mandala1" size="md" opacity={0.12} />
      </div>
      <div className="absolute bottom-1/4 right-20">
        <MandalaPattern type="lippan1" size="lg" opacity={0.15} />
      </div>
      <div className="absolute top-16 left-1/3">
        <MandalaPattern type="mandala2" size="sm" opacity={0.1} />
      </div>
      <div className="absolute bottom-16 right-1/3">
        <MandalaPattern type="lippan2" size="md" opacity={0.12} />
      </div>

      {/* Traditional Border Pattern */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-white/40"></div>
            <Sparkles className="h-6 w-6 text-white/60 mx-4" />
            <div className="w-12 h-0.5 bg-white/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Popular Products
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover our most loved handcrafted items, each telling a unique
            story of artisan skill and creativity.
          </p>
        </div>
        <div className="overflow-x-auto scroll-smooth whitespace-nowrap px-4 py-6">
          <div className="flex gap-6">
            {products.popularProducts.map((product) => (
              <div key={product.id} className="min-w-[280px] max-w-[280px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
