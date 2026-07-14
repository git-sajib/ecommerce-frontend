"use client"

import Link from "next/link"
import { Eye, ShoppingCart, Package } from "lucide-react"

import { Product } from "@/types/product"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { useCartStore } from "@/store/cart-store"
import { toast } from "sonner"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const inStock = product.stock > 0

  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart(product)

    toast.success(`${product.name} added to cart.`)
  }

  return (
    <Card className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative flex aspect-square items-center justify-center bg-linear-to-br from-slate-50 via-slate-100 to-slate-200">
        <Package className="h-20 w-20 text-slate-400 transition duration-300 group-hover:scale-110 group-hover:text-slate-600" />

        <Badge className="absolute top-4 left-4">
          {product.category?.name ?? "Product"}
        </Badge>

        <Badge
          variant={inStock ? "secondary" : "destructive"}
          className="absolute top-4 right-4"
        >
          {inStock ? "In Stock" : "Sold Out"}
        </Badge>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold">{product.name}</h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold tracking-tight text-blue-600">
            ${Number(product.price).toFixed(2)}
          </span>

          <Badge variant="outline">{product.stock} Left</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href={`/products/${product.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </Link>

          <Button
            className="w-full"
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}
