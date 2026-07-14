"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Package,
  ShoppingCart,
  Truck,
  ShieldCheck,
} from "lucide-react"

import { useQuery } from "@tanstack/react-query"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { getProduct } from "@/services/product"
import { useCartStore } from "@/store/cart-store"

import { toast } from "sonner"

export default function ProductDetailsPage() {
  const params = useParams()

  const id = Number(params.id)

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  })

  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    if (!product) return

    addToCart(product)

    toast.success(`${product.name} added to cart.`)
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-24 text-center">
          Loading...
        </main>
        <Footer />
      </>
    )
  }

  if (isError || !product) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-24 text-center">
          Product not found.
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}

          <div className="flex aspect-square items-center justify-center rounded-3xl bg-linear-to-br from-slate-100 via-slate-50 to-slate-200">
            <Package className="h-40 w-40 text-slate-400" />
          </div>

          {/* Details */}

          <div>
            <Badge className="mb-4">{product.category?.name}</Badge>

            <h1 className="text-4xl font-bold lg:text-5xl">{product.name}</h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <h2 className="text-5xl font-extrabold text-blue-600">
                ${Number(product.price).toFixed(2)}
              </h2>

              <Badge variant="secondary">{product.stock} In Stock</Badge>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button size="lg" variant="outline">
                Buy Now
              </Button>
            </div>

            <div className="mt-10 rounded-2xl border p-6">
              <h3 className="mb-5 text-lg font-semibold">
                Product Information
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>SKU</span>
                  <span>{product.sku}</span>
                </div>

                <div className="flex justify-between">
                  <span>Category</span>
                  <span>{product.category?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Available</span>
                  <span>{product.stock}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <Truck className="mb-2 h-6 w-6 text-blue-600" />
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  Delivery within 2–5 business days.
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <ShieldCheck className="mb-2 h-6 w-6 text-green-600" />
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-muted-foreground">
                  Protected by Stripe payment gateway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
