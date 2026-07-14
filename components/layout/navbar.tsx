"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, ShoppingCart, Store, User } from "lucide-react"

import { Button } from "@/components/ui/button"

import { logout as logoutApi } from "@/services/auth"
import { useAuthStore } from "@/store/auth-store"
import { useCartStore } from "@/store/cart-store"

export default function Navbar() {
  const router = useRouter()

  const cartCount = useCartStore((state) => state.getItemCount())

  const user = useAuthStore((state) => state.user)
  const logoutStore = useAuthStore((state) => state.logout)

  async function handleLogout() {
    try {
      await logoutApi()
    } catch {
      // Ignore logout API errors
    }

    logoutStore()

    router.replace("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow">
            <Store className="h-5 w-5" />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-bold">Ecommerce</h1>
            <p className="-mt-1 text-xs text-muted-foreground">
              Ordering & Payment
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="font-medium transition hover:text-blue-600">
            Home
          </Link>

          <Link
            href="/categories"
            className="font-medium transition hover:text-blue-600"
          >
            Categories
          </Link>

          <Link
            href="/products"
            className="font-medium transition hover:text-blue-600"
          >
            Products
          </Link>

          <Link
            href="/orders"
            className="font-medium transition hover:text-blue-600"
          >
            Orders
          </Link>
          <Link href="/payments" className="font-medium hover:text-blue-600">
            Payments
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right lg:block">
                <p className="text-sm font-semibold">{user.name}</p>

                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>

              {user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="secondary">Admin</Button>
                </Link>
              )}

              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button>
                <User className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
