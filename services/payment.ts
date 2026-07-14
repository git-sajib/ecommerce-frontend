import { api } from "./api"

export interface Payment {
  id: number
  order_id: number
  provider: string
  amount: number
  transaction_id: string
  status: string
  created_at: string
}

export interface CreatePaymentRequest {
  order_id: number
  provider: "stripe" | "bkash"
}

export interface PaymentResponse {
  payment: Payment

  client_secret: string

  payment_intent_id: string
}

export async function createPayment(
  data: CreatePaymentRequest
): Promise<PaymentResponse> {
  const response = await api.post("/payments", data)

  return response.data.data
}

export async function getPayments(): Promise<Payment[]> {
  const response = await api.get("/payments")

  return response.data.data
}
