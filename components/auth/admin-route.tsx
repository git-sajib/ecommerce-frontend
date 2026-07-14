"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/auth-store"

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login")
      return
    }

    if (!loading && user?.role !== "admin") {
      router.replace("/")
    }
  }, [loading, token, user, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!token || user?.role !== "admin") {
    return null
  }

  return <>{children}</>
}
