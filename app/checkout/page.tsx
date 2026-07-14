"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProtectedRoute from "@/components/auth/protected-route"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { useCartStore } from "@/store/cart-store"

import { createOrder } from "@/services/order"
import { createPayment } from "@/services/payment"

import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()

  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total)
  const clearCart = useCartStore((state) => state.clearCart)

  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    if (items.length === 0) {
      toast.error("Your cart is empty.")
      return
    }

    try {
      setLoading(true)

      // Create Order
      const orderResponse = await createOrder({
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      })

      const order = orderResponse.data

      // Create Payment Intent
      const payment = await createPayment({
        order_id: order.id,
        provider: "stripe",
      })

      clearCart()

      router.push(
        `/payment?client_secret=${encodeURIComponent(payment.client_secret)}`
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Unable to complete checkout."
        )
      } else {
        toast.error("Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Card className="rounded-2xl p-6">
            <h2 className="mb-6 text-2xl font-bold">Review Order</h2>

            <p className="mb-8 text-muted-foreground">
              Click the button below to create your order and continue to the
              secure Stripe payment page.
            </p>

            <Button
              className="h-12 w-full"
              size="lg"
              disabled={loading}
              onClick={handleCheckout}
            >
              {loading ? "Preparing Payment..." : "Continue to Payment"}
            </Button>
          </Card>

          <Card className="h-fit rounded-2xl p-6">
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span>${total().toFixed(2)}</span>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  )
}
