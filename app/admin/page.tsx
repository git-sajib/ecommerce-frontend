"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/products">
          <Card className="cursor-pointer rounded-2xl p-8 transition hover:shadow-lg">
            <h2 className="text-2xl font-bold">Products</h2>

            <p className="mt-2 text-muted-foreground">Manage products</p>
          </Card>
        </Link>

        <Link href="/admin/categories">
          <Card className="cursor-pointer rounded-2xl p-8 transition hover:shadow-lg">
            <h2 className="text-2xl font-bold">Categories</h2>

            <p className="mt-2 text-muted-foreground">Manage categories</p>
          </Card>
        </Link>

        <Link href="/admin/orders">
          <Card className="cursor-pointer rounded-2xl p-8 transition hover:shadow-lg">
            <h2 className="text-2xl font-bold">Orders</h2>

            <p className="mt-2 text-muted-foreground">View all orders</p>
          </Card>
        </Link>

        <Link href="/admin/payments">
          <Card className="cursor-pointer rounded-2xl p-8 transition hover:shadow-lg">
            <h2 className="text-2xl font-bold">Payments</h2>

            <p className="mt-2 text-muted-foreground">View payments</p>
          </Card>
        </Link>
      </div>
    </main>
  )
}
