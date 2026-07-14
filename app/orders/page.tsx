"use client"

import { useQuery } from "@tanstack/react-query"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProtectedRoute from "@/components/auth/protected-route"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { api } from "@/services/api"

type Order = {
  id: number
  status: string
  subtotal: number
  total: number
  created_at: string
}

async function getOrders() {
  const response = await api.get("/orders")

  return response.data.data
}

export default function OrdersPage() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  })

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

        {isLoading && (
          <div className="py-20 text-center">Loading orders...</div>
        )}

        {isError && (
          <div className="py-20 text-center text-red-600">
            Failed to load orders.
          </div>
        )}

        {orders?.length === 0 && (
          <Card className="p-10 text-center">
            <h2 className="text-2xl font-semibold">No orders yet</h2>

            <p className="mt-3 text-muted-foreground">
              Your placed orders will appear here.
            </p>
          </Card>
        )}

        <div className="space-y-5">
          {orders?.map((order: Order) => (
            <Card key={order.id} className="rounded-2xl p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold">Order #{order.id}</h2>

                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <Badge>{order.status}</Badge>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>

                  <p className="text-2xl font-bold text-blue-600">
                    ${parseFloat(String(order.total)).toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  )
}
