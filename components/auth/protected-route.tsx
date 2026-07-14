"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/auth-store"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const token = useAuthStore((state) => state.token)
  const loading = useAuthStore((state) => state.loading)

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login")
    }
  }, [loading, token, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    )
  }

  if (!token) return null

  return <>{children}</>
}
