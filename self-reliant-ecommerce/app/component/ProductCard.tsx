"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart, type Product } from "../context/CartContext"
import { IndianRupee } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.quantity === 0) return // Safety check
    dispatch({ type: "ADD_TO_CART", payload: product })
    setIsAdded(true)
  }

  const isOutOfStock = product.quantity === 0

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100 pb-4 flex flex-col justify-between">
      <Link href={`/product/${product.id}`} className="block flex-grow">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-primary-dark mb-2 line-clamp-2 group-hover:text-primary-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">by {product.artisan}</p>
          <p className="text-2xl font-bold text-primary-gold mb-4">
            <IndianRupee className="inline-block mr-1" strokeWidth={2.5} />
            {product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      {/* Button Area */}
      <div className="px-6 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
            isOutOfStock
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : isAdded
              ? "bg-accent-green text-white shadow-lg"
              : "bg-primary-dark hover:bg-primary-dark/90 text-white hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : isAdded ? "Added!" : "Add to Cart"}
        </button>

        {!isOutOfStock && isAdded && (
          <Link
            href="/cart"
            className="block w-full mt-3 py-3 px-4 bg-primary-gold text-white text-center rounded-lg font-semibold hover:bg-primary-gold/90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Go to Cart
          </Link>
        )}
      </div>
    </div>
  )
}
