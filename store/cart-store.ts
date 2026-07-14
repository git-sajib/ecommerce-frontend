import { create } from "zustand"
import { Product } from "@/types/product"

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]

  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  increase: (id: number) => void
  decrease: (id: number) => void
  clearCart: () => void

  total: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart(product) {
    const existing = get().items.find((item) => item.id === product.id)

    if (existing) {
      set({
        items: get().items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      })

      return
    }

    set({
      items: [
        ...get().items,
        {
          ...product,
          quantity: 1,
        },
      ],
    })
  },

  removeFromCart(id) {
    set({
      items: get().items.filter((item) => item.id !== id),
    })
  },

  increase(id) {
    set({
      items: get().items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      ),
    })
  },

  decrease(id) {
    set({
      items: get()
        .items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    })
  },

  clearCart() {
    set({ items: [] })
  },

  total() {
    return get().items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    )
  },

  getItemCount() {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  },
}))
