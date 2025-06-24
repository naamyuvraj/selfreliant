"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/app/component/ProductCard"; // adjust path if needed
import type { Product } from "@/app/context/CartContext"; // your product type

export default function Sculptures() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSculptures = async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .eq("subcategory", "sculptures");

      if (error) {
        console.error("Failed to fetch sculptures:", error.message);
      } else {
        // map image from image_urls[0] for display
        const formatted = data.map((item) => ({
          ...item,
          image: item.image_urls?.[0] || "/placeholder.svg",
          artisan: item.artisan || "Unknown Artisan", // fallback
        }));

        setProducts(formatted);
      }

      setLoading(false);
    };

    fetchSculptures();
  }, []);

  return (
    <div className="bg-[#d69264] min-h-screen">
      <Navbar />
      <div className="p-6 text-white text-2xl">Sculptures</div>

      {loading ? (
        <div className="text-white text-center mt-10 text-lg">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-white text-center mt-10 text-lg">No sculptures found.</div>
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
