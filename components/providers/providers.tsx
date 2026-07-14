"use client"

import { ReactNode, useEffect } from "react"

import QueryProvider from "./query-provider"

import { Toaster } from "@/components/ui/sonner"

import { useAuthStore } from "@/store/auth-store"

export default function Providers({ children }: { children: ReactNode }) {
  const loadUser = useAuthStore((state) => state.loadUser)

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <QueryProvider>
      {children}

      <Toaster richColors position="top-right" closeButton />
    </QueryProvider>
  )
}
