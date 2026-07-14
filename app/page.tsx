import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  ArrowRight,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react"

const features = [
  {
    title: "Modern Shopping",
    description: "Browse products with a clean and responsive experience.",
    icon: ShoppingBag,
  },
  {
    title: "Secure Payment",
    description: "Pay securely with Stripe integration.",
    icon: CreditCard,
  },
  {
    title: "Fast Delivery",
    description: "Simple ordering and order tracking.",
    icon: Truck,
  },
  {
    title: "Protected API",
    description: "Laravel Sanctum authentication and secure APIs.",
    icon: ShieldCheck,
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Laravel • Next.js • Stripe • Redis • Docker
          </span>

          <h1 className="mt-8 text-5xl leading-tight font-black tracking-tight md:text-7xl">
            Modern Ecommerce
            <br />
            Ordering &
            <br />
            Payment Platform
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Production-ready ecommerce application built for the Backend
            Engineer Technical Assessment.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/products">
              <Button size="lg">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/register">
              <Button size="lg" variant="outline">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <Card
                key={feature.title}
                className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="space-y-5 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>

                  <h2 className="text-xl font-bold">{feature.title}</h2>

                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <Footer />
    </>
  )
}
