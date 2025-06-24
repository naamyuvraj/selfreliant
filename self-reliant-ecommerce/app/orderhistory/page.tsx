"use client"

import React from "react"
import { useAuth } from "../context/UserContext"
import { supabase } from "@/lib/supabaseClient"
import Navbar from "../component/Navbar"
import Image from "next/image"
import Footer from "../component/Footer"

export default function OrderHistory() {
  const { user, loading } = useAuth()
  const [orders, setOrders] = React.useState<any[]>([])
  const [orderItemsMap, setOrderItemsMap] = React.useState<Record<string, any[]>>({})
  const [loadingOrders, setLoadingOrders] = React.useState(true)

  React.useEffect(() => {
    if (!user) return

    const fetchOrdersAndItems = async () => {
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.id)
        .eq("status", "Paid")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching orders:", error.message)
        return
      }

      setOrders(orders)

      // Fetch related order items with inventory details
const { data: orderItems, error: itemsErr } = await supabase
  .from("order_items")
  .select(`
    *,
    inventory (
      name,
      image_urls,
      description
    )
  `)
  .in("order_id", orders.map((o) => o.id))
      if (itemsErr) {
        console.error("Error fetching items:", itemsErr.message)
        return
      }

      // Group order items by order_id
      const grouped = orderItems.reduce((acc, item) => {
        if (!acc[item.order_id]) acc[item.order_id] = []
        acc[item.order_id].push(item)
        return acc
      }, {})

      setOrderItemsMap(grouped)
      setLoadingOrders(false)
    }

    fetchOrdersAndItems()
  }, [user])

  if (loading || loadingOrders) {
    return <div className="text-white text-center mt-10">Loading...</div>
  }

  return (
    <div className="bg-[#d69264] min-h-screen pt-[70px]">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-4">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-white text-center mt-10">No completed orders found.</div>
        ) : (
          orders.map((order) => {
            const items = orderItemsMap[order.id] || []
            const firstItem = items[0]
            const img = firstItem?.inventory?.image_urls?.[0]

            return (
              <div key={order.id} className="bg-white rounded-xl shadow-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-semibold">Delivered</span>
                  <span className="text-sm text-gray-500">
                    On {new Date(order.created_at).toDateString()}
                  </span>
                </div>

                <div className="flex gap-4">
                  {img && (
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={img} alt="product" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-primary-dark mb-1">{firstItem?.inventory?.name}</p>
                    <p className="text-sm text-gray-600 mb-1">Qty: {firstItem?.quantity}</p>
                    <p className="text-sm text-gray-600 mb-1">₹{firstItem?.price}</p>
                    <p className="text-xs text-gray-400">
                      Exchange/Return window closed on{" "}
                      {new Date(
                        new Date(order.created_at).getTime() + 14 * 24 * 60 * 60 * 1000
                      ).toDateString()}
                    </p>

                    {/* Rating UI placeholder */}
                    <div className="mt-2 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">☆</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Rate & Review to earn store credit</p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
        <Footer />
    </div>
  )
}
