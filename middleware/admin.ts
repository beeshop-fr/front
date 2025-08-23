import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"
import { useAuth } from "../components/useAuth"

export default defineNuxtRouteMiddleware(() => {
  const { isAdmin } = useAuth()
  if (!isAdmin.value) {
    return navigateTo('/')
  }
})