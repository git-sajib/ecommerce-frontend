"use client"

import { Category } from "@/services/category"

type Props = {
  categories: Category[]
}

export default function CategoryTree({ categories }: Props) {
  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category.id}>
          <div className="rounded-lg border bg-white p-3 shadow-sm">
            {category.name}
          </div>

          {category.children.length > 0 && (
            <div className="mt-3 ml-6 border-l pl-4">
              <CategoryTree categories={category.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
