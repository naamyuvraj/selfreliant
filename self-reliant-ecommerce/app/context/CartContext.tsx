"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "./UserContext"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  artisan: string
  description: string
  story: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        return {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      }

    case "REMOVE_FROM_CART":
      const filteredItems = state.items.filter(item => item.id !== action.payload)
      return {
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }

    case "UPDATE_QUANTITY":
      const updatedItems = state.items
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter(item => item.quantity > 0)
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }

    case "CLEAR_CART":
      return { items: [], total: 0 }

    case "LOAD_CART":
      return {
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })
  const { user } = useAuth()
  const [cartLoaded, setCartLoaded] = useState(false) // 🔥 new

  // ✅ Load from Supabase once
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) return

      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)

      if (error) {
        console.error("❌ Failed to fetch cart:", error.message)
      } else if (data) {
        const transformed = data.map(item => ({
          id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          artisan: item.artisan,
          description: item.description,
          story: item.story,
          quantity: item.quantity,
        }))
        dispatch({ type: "LOAD_CART", payload: transformed })
        setCartLoaded(true) // ✅ only then allow sync
      }
    }

    fetchCart()
  }, [user?.id])

  // ✅ Sync when cart changes, but only after it's first loaded
  useEffect(() => {
    const syncCart = async () => {
      if (!user?.id || !cartLoaded) return

      await supabase.from("cart_items").delete().eq("user_id", user.id)

      if (state.items.length === 0) return

      const insertPayload = state.items.map(item => ({
        user_id: user.id,
        product_id: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        artisan: item.artisan,
        description: item.description,
        story: item.story,
      }))

      const { error } = await supabase.from("cart_items").insert(insertPayload)
      if (error) console.error("❌ Failed to sync cart:", error.message)
    }

    syncCart()
  }, [state.items, user?.id, cartLoaded]) // 🔥 watch cartLoaded

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
