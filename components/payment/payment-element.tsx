"use client"

import { useMemo, useState } from "react"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { Button } from "@/components/ui/button"

import { CreditCard, Loader2, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

export default function PaymentElementForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)

  const returnUrl = useMemo(() => {
    if (typeof window === "undefined") return ""

    return `${window.location.origin}/payment/success`
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!stripe || !elements) {
      toast.error("Stripe has not finished loading.")
      return
    }

    try {
      setLoading(true)

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      })

      if (error) {
        toast.error(error.message ?? "Payment failed.")
        return
      }

      // Stripe redirects automatically after successful confirmation.
    } catch {
      toast.error("Unable to process payment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        <ShieldCheck className="h-4 w-4 text-green-600" />
        Secure payment powered by Stripe
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full text-base font-semibold"
        disabled={!stripe || !elements || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Pay Securely
          </>
        )}
      </Button>
    </form>
  )
}
