export interface OrderItem {
  product_id: number
  quantity: number
}

export interface CreateOrderRequest {
  items: OrderItem[]
}
