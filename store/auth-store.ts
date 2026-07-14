"use client"

import { create } from "zustand"

import { me } from "@/services/auth"

export interface User {
  id: number
  name: string
  email: string
  role?: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean

  login: (user: User, token: string) => void
  logout: () => void
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  loading: true,

  login(user, token) {
    localStorage.setItem("token", token)

    set({
      user,
      token,
    })
  },

  logout() {
    localStorage.removeItem("token")

    set({
      user: null,
      token: null,
    })
  },

  async loadUser() {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null

    if (!token) {
      set({
        loading: false,
      })

      return
    }

    try {
      const response = await me()

      set({
        user: response.data,
        token,
        loading: false,
      })
    } catch {
      localStorage.removeItem("token")

      set({
        user: null,
        token: null,
        loading: false,
      })
    }
  },
}))
