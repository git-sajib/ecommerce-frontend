"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  CreditCard,
  LogOut,
} from "lucide-react"

import AdminRoute from "@/components/auth/admin-route"

import { Button } from "@/components/ui/button"

import { useAuthStore } from "@/store/auth-store"
import { logout as logoutApi } from "@/services/auth"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const user = useAuthStore((state) => state.user)
  const logoutStore = useAuthStore((state) => state.logout)

  async function handleLogout() {
    try {
      await logoutApi()
    } catch {
      // Ignore API errors
    }

    logoutStore()

    router.replace("/login")
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-slate-100">
        <div className="flex">
          {/* Sidebar */}

          <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white shadow-xl">
            <div className="border-b border-slate-700 p-6">
              <h1 className="text-2xl font-bold">Ecommerce Admin</h1>

              <p className="mt-1 text-sm text-slate-400">Management Panel</p>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-4">
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>

              <Link
                href="/admin/categories"
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
              >
                <FolderTree className="h-5 w-5" />
                Categories
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
              >
                <ShoppingBag className="h-5 w-5" />
                Orders
              </Link>

              <Link
                href="/admin/payments"
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
              >
                <CreditCard className="h-5 w-5" />
                Payments
              </Link>
            </nav>
          </aside>

          {/* Content */}

          <div className="flex flex-1 flex-col">
            <header className="flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">
              <div>
                <h2 className="text-3xl font-bold">Admin Dashboard</h2>

                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.name}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold">{user?.name}</p>

                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>

                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </header>

            <main className="flex-1 p-8">{children}</main>
          </div>
        </div>
      </div>
    </AdminRoute>
  )
}
