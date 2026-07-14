import { api } from "./api"

export interface Category {
  id: number
  parent_id: number | null
  name: string
  slug: string
  status: boolean
  created_at: string
  children: Category[]
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get("/categories")

  return response.data.data
}

export async function getCategoryTree(): Promise<Category[]> {
  const response = await api.get("/categories/tree")

  return response.data.data
}

export async function getCategoryDFS(): Promise<Category[]> {
  const response = await api.get("/categories/dfs")

  return response.data.data
}