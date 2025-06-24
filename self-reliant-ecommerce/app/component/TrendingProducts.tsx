"use client";

import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductsContext";
import { TrendingUp, Zap, Crown } from "lucide-react";
import MandalaPattern from "./MandalaPatterns";

export default function TrendingProducts() {
  const { products } = useProducts();

  return (
    <section className="py-20 relative" style={{ backgroundColor: "#d69264" }}>
      {/* Decorative Elements */}
      <div className="absolute top-12 left-12 opacity-10">
        <div className="w-20 h-20 border-3 border-white rounded-lg transform rotate-12">
          <TrendingUp className="h-10 w-10 text-white m-auto mt-4" />
        </div>
      </div>
      <div className="absolute top-20 right-20 opacity-10">
        <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
          <Crown className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="absolute bottom-16 right-12 opacity-10">
        <Zap className="h-18 w-18 text-white" />
      </div>

      {/* Enhanced Mandala and Lippan Art Elements */}
      <div className="absolute top-1/4 left-16">
        <MandalaPattern type="mandala2" size="xl" opacity={0.15} />
      </div>
      <div className="absolute bottom-1/4 right-20">
        <MandalaPattern type="lippan1" size="xl" opacity={0.15} />
      </div>
      <div className="absolute top-1/2 right-8">
        <MandalaPattern type="mandala3" size="lg" opacity={0.12} />
      </div>
      <div className="absolute bottom-1/3 left-8">
        <MandalaPattern type="lippan2" size="md" opacity={0.12} />
      </div>
      <div className="absolute top-20 right-1/3">
        <MandalaPattern type="mandala1" size="sm" opacity={0.1} />
      </div>
      <div className="absolute bottom-20 left-1/3">
        <MandalaPattern type="lippan1" size="md" opacity={0.12} />
      </div>

      {/* Geometric Pattern */}
      <div className="absolute top-1/3 left-8 opacity-10">
        <div className="w-16 h-16 border-2 border-white">
          <div className="w-8 h-8 border-2 border-white m-auto mt-3"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-white/40"></div>
            <TrendingUp className="h-6 w-6 text-white/60 mx-4" />
            <div className="w-12 h-0.5 bg-white/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-yellow-300">Trending</span> Now
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Stay ahead with our most sought-after artisan creations that are
            making waves in the handcraft community.
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
