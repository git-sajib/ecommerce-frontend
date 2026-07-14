"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

import { Elements } from "@stripe/react-stripe-js"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProtectedRoute from "@/components/auth/protected-route"
import PaymentElementForm from "@/components/payment/payment-element"

import { stripePromise } from "@/lib/stripe"

function PaymentContent() {
  const searchParams = useSearchParams()

  const clientSecret = searchParams.get("client_secret")

  if (!clientSecret) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Invalid Payment</h1>

          <p className="mt-3 text-muted-foreground">
            Missing payment information.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Secure Payment</h1>

        <p className="mt-3 text-muted-foreground">
          Complete your payment securely with Stripe.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-lg">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
        >
          <PaymentElementForm />
        </Elements>
      </div>
    </main>
  )
}

export default function PaymentPage() {
  return (
    <ProtectedRoute>
      <Navbar />

      <Suspense
        fallback={
          <main className="flex min-h-[60vh] items-center justify-center">
            Loading payment...
          </main>
        }
      >
        <PaymentContent />
      </Suspense>

      <Footer />
    </ProtectedRoute>
  )
}
