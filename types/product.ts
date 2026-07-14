export interface Category {
  id: number
  parent_id: number | null
  name: string
  slug: string
  status: boolean
}

export interface Product {
  id: number
  category_id: number

  category: Category

  name: string

  sku: string

  description: string

  price: number

  stock: number

  status: boolean

  created_at: string
}
