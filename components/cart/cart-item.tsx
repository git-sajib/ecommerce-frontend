"use client"

import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { CartItem as Item, useCartStore } from "@/store/cart-store"

type Props = {
  item: Item
}

export default function CartItem({ item }: Props) {
  const increase = useCartStore((s) => s.increase)
  const decrease = useCartStore((s) => s.decrease)
  const remove = useCartStore((s) => s.removeFromCart)

  return (
    <Card className="flex flex-col gap-5 rounded-2xl p-5 sm:flex-row sm:items-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-slate-100 text-4xl">
        📦
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>

        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {item.description}
        </p>

        <p className="mt-3 text-xl font-bold text-blue-600">
          ${Number(item.price).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => decrease(item.id)}>
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-8 text-center font-bold">{item.quantity}</span>

        <Button variant="outline" size="icon" onClick={() => increase(item.id)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button variant="destructive" size="icon" onClick={() => remove(item.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </Card>
  )
}
