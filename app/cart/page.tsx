"use client"

import Link from "next/link"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import CartItem from "@/components/cart/cart-item"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { useCartStore } from "@/store/cart-store"

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total)

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>

            <p className="mt-3 text-muted-foreground">
              Add some products first.
            </p>

            <Link href="/products">
              <Button className="mt-6">Browse Products</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-5">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <Card className="h-fit rounded-2xl p-6">
              <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

              <div className="mb-6 flex justify-between text-lg">
                <span>Total</span>

                <span className="font-bold text-blue-600">
                  ${total().toFixed(2)}
                </span>
              </div>

              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
