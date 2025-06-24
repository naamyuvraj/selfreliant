"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { IndianRupee } from "lucide-react";
import { useAuth } from "../context/UserContext";
import { supabase } from "@/lib/supabaseClient";
import MandalaPattern from "../component/MandalaPatterns";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (id, newQty) => {
    if (newQty === 0) dispatch({ type: "REMOVE_FROM_CART", payload: id });
    else
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQty } });
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    if (!user) {
      alert("Please log in to checkout");
      return setIsCheckingOut(false);
    }

    const totalAmount = Number((state.total * 1.08).toFixed(2));

    const { data: orderInsertRes, error } = await supabase
      .from("orders")
      .insert({
        customer_id: user.id,
        total: totalAmount,
        status: "Paid",
      })
      .select()
      .maybeSingle();

    console.log("✅ Insert response:", orderInsertRes);
    console.log("❌ Insert error:", error);

    const order = orderInsertRes;

    const orderItems = state.items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemErr } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemErr) {
      console.error("Failed to insert order items:", itemErr.message);
      alert("Error saving items");
      return setIsCheckingOut(false);
    }

    alert("✅ Order placed successfully!");
    dispatch({ type: "CLEAR_CART" });
    setIsCheckingOut(false);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#d69264] pt-16">
        {" "}
        <Navbar />
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
        
        
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center bg-white rounded-2xl p-12 shadow-xl">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-primary-dark mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                Discover our beautiful handcrafted products and add them to your
                cart.
              </p>
              <Link
                href="/"
                className="inline-flex items-center bg-primary-gold hover:bg-primary-gold/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
      <div className="min-h-screen flex flex-col bg-[#d69264] pt-16">
      <Navbar />
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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-white hover:text-primary-gold transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-primary-dark mb-8">
              Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-primary-dark mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2 font-medium">
                          by {item.artisan}
                        </p>
                        <p className="text-xl font-bold text-primary-gold">
                          <IndianRupee className="inline-block mr-1" />
                          {item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 rounded-full hover:bg-white transition-colors border border-gray-200"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 rounded-full hover:bg-white transition-colors border border-gray-200"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-6 h-fit">
                <h2 className="text-xl font-semibold text-primary-dark mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      <IndianRupee className="inline-block mr-1" />
                      {state.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {state.total > 500
                        ? "Free"
                        : `${(
                            <IndianRupee className="inline-block mr-1" />
                          )}100`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">
                      <IndianRupee className="inline-block mr-1" />
                      {(state.total * 0.08).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary-gold">
                        <IndianRupee className="inline-block mr-1" />
                        {(
                          state.total +
                          (state.total > 50 ? 0 : 9.99) +
                          state.total * 0.08
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {state.total < 50 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800 font-medium">
                      Add ${(50 - state.total).toFixed(2)} more for free
                      shipping!
                    </p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isCheckingOut
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-accent-green hover:bg-accent-green/90 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    🔒 Secure checkout powered by SSL encryption
                  </p>
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
