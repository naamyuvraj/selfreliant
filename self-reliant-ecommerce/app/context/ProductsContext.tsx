"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient"; // adjust path as needed
import type { Product } from "./CartContext";

interface ProductsState {
  allProducts: Product[];
  popularProducts: Product[];
  trendingProducts: Product[];
}

interface ProductsContextType {
  products: ProductsState;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setPopularProducts: (productIds: string[]) => void;
  setTrendingProducts: (productIds: string[]) => void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [popularProductIds, setPopularProductIds] = useState<string[]>([]);
  const [trendingProductIds, setTrendingProductIds] = useState<string[]>([]);
  const [artisians, setArtisans] = useState<string[]>([]);

  // 🔥 Fetch from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("inventory").select("*");
      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setAllProducts(data);
      }
    };

    fetchProducts();
  }, []);
  
  

  // console.log("All Products:", allProducts);

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(), // Replace with UUID if needed
    };
    setAllProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setAllProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setAllProducts((prev) => prev.filter((product) => product.id !== id));
    setPopularProductIds((prev) => prev.filter((pid) => pid !== id));
    setTrendingProductIds((prev) => prev.filter((pid) => pid !== id));
  };

  const setPopularProducts = (productIds: string[]) => {
    setPopularProductIds(productIds);
  };

  const setTrendingProducts = (productIds: string[]) => {
    setTrendingProductIds(productIds);
  };

  const popularProducts = allProducts.filter((product) =>
    popularProductIds.includes(product.id)
  );

  const trendingProducts = allProducts.filter((product) =>
    trendingProductIds.includes(product.id)
  );

  const products: ProductsState = {
    allProducts,
    popularProducts,
    trendingProducts,
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        setPopularProducts,
        setTrendingProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
