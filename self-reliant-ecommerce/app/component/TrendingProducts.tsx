"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Zap, Crown } from "lucide-react";
import ProductCard from "./ProductCard";
import MandalaPattern from "./MandalaPatterns";
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
  created_at?: string;
}

export default function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      const isoDate = fiveDaysAgo.toISOString();

      const { data: orderItems, error: orderError } = await supabase
        .from("order_items")
        .select("product_id, quantity, created_at")
        .gte("created_at", isoDate);

      if (orderError || !orderItems) {
        console.error("❌ Failed to fetch order_items:", orderError?.message);
        return;
      }

      const salesMap: Record<string, number> = {};
      orderItems.forEach((item) => {
        const id = String(item.product_id);
        salesMap[id] = (salesMap[id] || 0) + item.quantity;
      });

const topProductIds = Object.entries(salesMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([id]) => id)
  .filter((id) => !!id && id !== "null"); // 🧼 Filter invalid IDs

      if (topProductIds.length === 0) return;

      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("*")
        .in("id", topProductIds);

      if (inventoryError || !inventoryData) {
        console.error("❌ Error fetching inventory:", inventoryError?.message);
        return;
      }

      const sorted = topProductIds
        .map((id) => inventoryData.find((p) => p.id === id))
        .filter(Boolean) as Product[];

      setProducts(sorted);
    };

    fetchTrendingProducts();
  }, []);

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

      {/* Mandala Art */}
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
      <div className="absolute top-1/3 left-8 opacity-10">
        <div className="w-16 h-16 border-2 border-white">
          <div className="w-8 h-8 border-2 border-white m-auto mt-3"></div>
        </div>
      </div>

      {/* Section Content */}
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
            Stay ahead with our most sought-after artisan creations from the
            last 5 days.
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
