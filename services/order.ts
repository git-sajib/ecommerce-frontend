import { api } from "./api";
import { CreateOrderRequest } from "@/types/order";

export async function createOrder(data: CreateOrderRequest) {
  const response = await api.post("/orders", data);

  return response.data;
}

export async function getOrders() {
  const response = await api.get("/orders");

  return response.data;
}