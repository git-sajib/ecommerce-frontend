import { api } from "./api"
import { Product } from "@/types/product"

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get("/products")

  return data.data
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`)

  return data.data
}
