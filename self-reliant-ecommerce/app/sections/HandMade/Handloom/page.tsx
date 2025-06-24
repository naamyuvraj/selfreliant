"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/app/component/ProductCard";
import type { Product } from "@/app/context/CartContext";

export default function Handloom() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTraditionalArtworks = async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .eq("subcategory", "textiles");

      if (error) {
        console.error("Error fetching traditional artworks:", error.message);
      } else {
        const formatted = data.map((item) => ({
          ...item,
          image: item.image_urls?.[0] || "/placeholder.svg",
          artisan: item.artisan || "Unknown Artisan",
        }));

        setProducts(formatted);
      }

      setLoading(false);
    };

    fetchTraditionalArtworks();
  }, []);

  return (
    <div className="bg-[#d69264] min-h-screen pt-[70px]">
      <Navbar />

      {loading ? (
        <div className="text-white text-center mt-10">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-white text-center mt-10">
          No traditional artworks found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
