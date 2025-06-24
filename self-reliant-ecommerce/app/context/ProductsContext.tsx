"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
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
  const [popularProducts, setPopularProductsState] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProductsState] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: inventoryData, error } = await supabase.from("inventory").select("*");

      if (error) {
        console.error("❌ Error fetching products:", error.message);
        return;
      }

      setAllProducts(inventoryData || []);

      // Shuffle and pick 10 random products for "popular"
      const shuffled = [...(inventoryData || [])].sort(() => 0.5 - Math.random());
      setPopularProductsState(shuffled.slice(0, 10));
    };

    fetchProducts();
  }, []);

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setAllProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setAllProducts((prev) =>
      prev.map((product) => (product.id === id ? { ...product, ...updates } : product))
    );
  };

  const deleteProduct = (id: string) => {
    setAllProducts((prev) => prev.filter((product) => product.id !== id));
    setPopularProductsState((prev) => prev.filter((product) => product.id !== id));
    setTrendingProductsState((prev) => prev.filter((product) => product.id !== id));
  };

  const setPopularProducts = (productIds: string[]) => {
    const matched = allProducts.filter((p) => productIds.includes(String(p.id)));
    setPopularProductsState(matched);
  };

  const setTrendingProducts = (productIds: string[]) => {
    const matched = allProducts.filter((p) => productIds.includes(String(p.id)));
    setTrendingProductsState(matched);
  };

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
