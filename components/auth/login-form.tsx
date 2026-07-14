"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { login } from "@/services/auth"
import { useAuthStore } from "@/store/auth-store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Loader2, Mail, Lock } from "lucide-react"
import { toast } from "sonner"

type LoginFormData = {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()

  const loginStore = useAuthStore((state) => state.login)

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await login(form)

      loginStore(response.data.user, response.data.token)

      toast.success("Welcome back!")

      if (response.data.user.role === "admin") {
        router.replace("/admin")
      } else {
        router.replace("/")
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors

        if (errors) {
          Object.values(errors)
            .flat()
            .forEach((message) => toast.error(String(message)))
        } else {
          toast.error(
            error.response?.data?.message ?? "Invalid email or password."
          )
        }
      } else {
        toast.error("Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>

        <div className="relative">
          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            className="h-11 pl-10"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className="h-11 pl-10"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      <Button type="submit" className="h-11 w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  )
}
