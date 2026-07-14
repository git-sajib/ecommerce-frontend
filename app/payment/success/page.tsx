"use client"

import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
        <div className="w-full rounded-3xl border bg-white p-10 text-center shadow-xl">
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-600" />

          <h1 className="mt-6 text-4xl font-bold">Payment Successful</h1>

          <p className="mt-4 text-muted-foreground">
            Thank you for your purchase.
            <br />
            Your payment has been received successfully.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/orders">
              <Button size="lg">View My Orders</Button>
            </Link>

            <Link href="/products">
              <Button size="lg" variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
