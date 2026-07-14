"use client"

import { useQuery } from "@tanstack/react-query"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProtectedRoute from "@/components/auth/protected-route"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { getPayments, Payment } from "@/services/payment"

export default function PaymentsPage() {
  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  })

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-bold">Payment History</h1>

        {isLoading && (
          <div className="py-20 text-center">Loading payments...</div>
        )}

        {isError && (
          <div className="py-20 text-center text-red-600">
            Failed to load payments.
          </div>
        )}

        {payments?.length === 0 && (
          <Card className="p-10 text-center">No payment history found.</Card>
        )}

        <div className="space-y-5">
          {payments?.map((payment: Payment) => (
            <Card key={payment.id} className="rounded-2xl p-6">
              <div className="grid gap-5 md:grid-cols-4 md:items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>

                  <h2 className="text-xl font-bold">#{payment.id}</h2>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Provider</p>

                  <p className="font-medium capitalize">{payment.provider}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>

                  <p className="text-xl font-bold text-blue-600">
                    ${Number(payment.amount).toFixed(2)}
                  </p>
                </div>

                <div className="text-right">
                  <Badge>{payment.status}</Badge>

                  <p className="mt-3 text-xs break-all text-muted-foreground">
                    {payment.transaction_id}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(payment.created_at).toLocaleString()}
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
