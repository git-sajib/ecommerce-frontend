"use client"

import Link from "next/link"
import { XCircle } from "lucide-react"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
        <div className="w-full rounded-3xl border bg-white p-10 text-center shadow-xl">
          <XCircle className="mx-auto h-20 w-20 text-red-500" />

          <h1 className="mt-6 text-4xl font-bold">Payment Cancelled</h1>

          <p className="mt-4 text-muted-foreground">
            Your payment was cancelled.
            <br />
            No money has been charged.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/checkout">
              <Button size="lg">Try Again</Button>
            </Link>

            <Link href="/cart">
              <Button size="lg" variant="outline">
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
