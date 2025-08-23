import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"
import { useAuth } from "../components/useAuth"

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated.value) {
    return navigateTo('/') // ou vers /login
  }
})
