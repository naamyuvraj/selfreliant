"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MandalaPattern from "../../component/MandalaPatterns";
import {
  ArrowLeft,
  // Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  // Star
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductsContext";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import { IndianRupee } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { dispatch } = useCart();
  const { products } = useProducts();

  const product = products.allProducts.find((p) => p.id === productId);
console.log("Product:", product?.artisian);
if (!product) {
  return (
    <div className="min-h-screen bg-[#d69264] flex items-center justify-center">
      <div className="text-center bg-white rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-primary-dark mb-4">
          Product Not Found
        </h1>
        <Link
          href="/"
          className="text-primary-gold hover:underline font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

// ✅ Now it's safe to access product.quantity
const isOutOfStock = product.quantity === 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  // Mock additional images for gallery
  const basePlaceholder = "/placeholder.svg?height=600&width=600";

  const productImages =
    product.image_urls && product.image_urls.length > 0
      ? product.image_urls
      : [
          `${basePlaceholder}&text=Main+Image`,
          `${basePlaceholder}&text=Angle+1`,
          `${basePlaceholder}&text=Angle+2`,
          `${basePlaceholder}&text=Close+Up`,
        ];

  return (
    <div className="min-h-screen bg-[#d69264]">
      <div className="absolute top-1/4 right-12">
        <MandalaPattern type="mandala3" size="xl" opacity={0.6} />
      </div>
      <div className="absolute top-1/4 right-19">
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
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-white hover:text-primary-gold transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 shadow-lg">
                <Image
                  src={productImages[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "ring-2 ring-primary-gold"
                        : "hover:opacity-80"
                    } transition-all`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-3">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-600 mb-4">
                  Artisian {" "}
                  <span className="font-semibold text-primary-gold">
                    {product.artisian}
                  </span>
                </p>
                {/* <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div> */}
                <p className="text-4xl font-bold text-primary-gold">
                  <IndianRupee className="inline-block mr-1" strokeWidth={3} />
                  {product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-4">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                 { product.quantity>0?(<div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-primary-dark hover:bg-gray-50 transition-colors font-medium"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x-2 border-gray-200 font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-primary-dark hover:bg-gray-50 transition-colors font-medium"
                    >
                      +
                    </button>
                  </div>):("")}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      isOutOfStock
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : isAdded
                        ? "bg-accent-green text-white shadow-lg"
                        : "bg-primary-dark hover:bg-primary-dark/90 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : isAdded
                      ? "Added to Cart!"
                      : "Add to Cart"}
                  </button>

                  {/* <button
                    className="p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    disabled={isOutOfStock}
                  > */}
                    {/* <Heart className="h-6 w-6 text-gray-600" /> */}
                  {/* </button> */}
                  {/* <button className="p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Share2 className="h-6 w-6 text-gray-600" />
                  </button> */}
                </div>

                {!isOutOfStock && isAdded && (
                  <Link
                    href="/cart"
                    className="block w-full py-4 px-6 bg-accent-green text-white text-center rounded-xl font-semibold hover:bg-accent-green/90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Go to Cart
                  </Link>
                )}
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-primary-gold" />
                  <div>
                    <p className="font-semibold text-primary-dark">
                      Free Shipping
                    </p>
                    <p className="text-sm text-gray-600">On orders over 500</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-primary-gold" />
                  <div>
                    <p className="font-semibold text-primary-dark">Authentic</p>
                    <p className="text-sm text-gray-600">
                      Handcrafted guarantee
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <RotateCcw className="h-6 w-6 text-primary-gold" />
                  <div>
                    <p className="font-semibold text-primary-dark">
                      30-Day Returns
                    </p>
                    <p className="text-sm text-gray-600">Easy returns policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Artisan Story Section */}
          <div className="border-t border-gray-200 p-8 lg:p-12 bg-gray-50">
            <h3 className="text-2xl font-semibold text-primary-dark mb-6">
              Artisan Story
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.story}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">
                      {product.artisan
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "??"}
                    </span>
                  </div>
                  <h4 className="font-semibold text-primary-dark text-lg">
                    {product.artisan}
                  </h4>
                  <p className="text-gray-600 capitalize">
                    {product.category} Artisan
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Specialization:</span>{" "}
                      Traditional {product.category}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Experience:</span> 20+
                      years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
