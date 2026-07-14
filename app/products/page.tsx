"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

import ProductCard from "@/components/product/product-card"

import { useProducts } from "@/hooks/use-products"

export default function ProductsPage() {
  const { data, isLoading, isError } = useProducts()

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Products</h1>

          <p className="mt-2 text-muted-foreground">
            Browse all available products.
          </p>
        </div>

        {isLoading && (
          <div className="py-20 text-center">Loading products...</div>
        )}

        {isError && (
          <div className="py-20 text-center text-red-600">
            Failed to load products.
          </div>
        )}

        {data && data.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No products found.
          </div>
        )}

        {data && data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
