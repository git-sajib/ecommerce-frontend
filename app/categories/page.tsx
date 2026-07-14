"use client"

import { useQuery } from "@tanstack/react-query"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CategoryTree from "@/components/category/category-tree"

import {
  getCategories,
  getCategoryTree,
  getCategoryDFS,
  Category,
} from "@/services/category"

export default function CategoriesPage() {
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const { data: tree, isLoading: loadingTree } = useQuery({
    queryKey: ["category-tree"],
    queryFn: getCategoryTree,
  })

  const { data: dfs, isLoading: loadingDFS } = useQuery({
    queryKey: ["category-dfs"],
    queryFn: getCategoryDFS,
  })

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-bold">Categories</h1>

        <Tabs defaultValue="categories">
          <TabsList className="mb-8">
            <TabsTrigger value="categories">Categories</TabsTrigger>

            <TabsTrigger value="tree">Category Tree</TabsTrigger>

            <TabsTrigger value="dfs">DFS Traversal</TabsTrigger>
          </TabsList>

          {/* Categories */}

          <TabsContent value="categories">
            {loadingCategories ? (
              <div>Loading...</div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {categories?.map((category: Category) => (
                  <Card key={category.id} className="rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{category.name}</h2>

                        <p className="text-sm text-muted-foreground">
                          {category.slug}
                        </p>
                      </div>

                      <Badge>{category.status ? "Active" : "Inactive"}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tree */}

          <TabsContent value="tree">
            {loadingTree ? (
              <div>Loading...</div>
            ) : (
              <Card className="rounded-2xl p-6">
                <CategoryTree categories={tree ?? []} />
              </Card>
            )}
          </TabsContent>

          {/* DFS */}

          <TabsContent value="dfs">
            {loadingDFS ? (
              <div>Loading...</div>
            ) : (
              <div className="space-y-4">
                {dfs?.map((category: Category, index: number) => (
                  <Card key={category.id} className="rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-bold">
                          {index + 1}. {category.name}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                          {category.slug}
                        </p>
                      </div>

                      <Badge>DFS</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </>
  )
}
