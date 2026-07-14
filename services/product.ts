import { api } from "./api"
import { Product } from "@/types/product"

export async function getProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get("/products")

    console.log("API Response:", data)

    return data.data
  } catch (error) {
    console.error("Axios Error:", error)
    throw error
  }
}
