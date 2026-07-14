"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, ShoppingBag } from "lucide-react"

import RegisterForm from "@/components/auth/register-form"
import { useAuthStore } from "@/store/auth-store"

export default function RegisterPage() {
  const router = useRouter()

  const token = useAuthStore((state) => state.token)
  const loading = useAuthStore((state) => state.loading)

  useEffect(() => {
    if (!loading && token) {
      router.replace("/")
    }
  }, [loading, token, router])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition hover:scale-105"
          >
            <ShoppingBag className="h-8 w-8" />
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your account to start shopping.
          </p>
        </div>

        <RegisterForm />

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  )
}
