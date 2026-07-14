"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { register } from "@/services/auth"
import { useAuthStore } from "@/store/auth-store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Loader2, Mail, Lock, User } from "lucide-react"
import { toast } from "sonner"

type RegisterFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function RegisterForm() {
  const router = useRouter()

  const loginStore = useAuthStore((state) => state.login)

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await register(form)

      loginStore(response.data.user, response.data.token)

      toast.success("Account created successfully!")

      router.replace("/")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors

        if (errors) {
          Object.values(errors)
            .flat()
            .forEach((message) => toast.error(String(message)))
        } else {
          toast.error(error.response?.data?.message ?? "Registration failed.")
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
        <Label htmlFor="name">Full Name</Label>

        <div className="relative">
          <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="name"
            placeholder="John Doe"
            className="h-11 pl-10"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>

        <div className="relative">
          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
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

      <div className="space-y-2">
        <Label htmlFor="password_confirmation">Confirm Password</Label>

        <div className="relative">
          <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            id="password_confirmation"
            type="password"
            placeholder="••••••••"
            className="h-11 pl-10"
            value={form.password_confirmation}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                password_confirmation: e.target.value,
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
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  )
}
