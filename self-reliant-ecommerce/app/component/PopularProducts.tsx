"use client";

import { useEffect, useState } from "react";
import { Sparkles, Heart, Star } from "lucide-react";
import MandalaPattern from "./MandalaPatterns";
import ProductCard from "./ProductCard";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  image_urls: string[];
  image: string;
  price: number;
  description: string;
  quantity: number;
  artisan: string;
}

export default function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      // Step 1: Fetch all order items
      const { data: orderItems, error: orderError } = await supabase
        .from("order_items")
        .select("product_id, quantity");

      if (orderError || !orderItems) {
        console.error("❌ Error fetching order items:", orderError?.message);
        return;
      }

      // Step 2: Calculate popularity
      const salesMap: Record<string, number> = {};
      orderItems.forEach((item) => {
        const id = String(item.product_id);
        salesMap[id] = (salesMap[id] || 0) + item.quantity;
      });

      const topProductIds = Object.entries(salesMap)
        .sort((a, b) => b[1] - a[1]) // sort by quantity
        .slice(0, 10) // take top 10
        .map(([id]) => id);

      if (topProductIds.length === 0) return;

      // Step 3: Fetch details of top products
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("*")
        .in("id", topProductIds);

      if (inventoryError || !inventoryData) {
        console.error("❌ Error fetching inventory:", inventoryError?.message);
        return;
      }

      // Optional: Maintain original sort order of topProductIds
      const sortedProducts = topProductIds
        .map((id) => inventoryData.find((item) => item.id === id))
        .filter(Boolean) as Product[];

      setProducts(sortedProducts);
    };

    fetchPopularProducts();
  }, []);

  return (
    <section className="py-20 relative" style={{ backgroundColor: "#d69264" }} id="popular-products">
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

      {/* Mandala Art */}
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

      {/* Header */}
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
            Discover our most loved handcrafted items, based on real sales.
          </p>
        </div>

        {/* Product Scroll */}
        <div className="overflow-x-auto scroll-smooth whitespace-nowrap px-4 py-6">
          <div className="flex gap-6">
            {products.map((product) => (
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
