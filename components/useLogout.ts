import { useCookie } from "nuxt/app"
import { useRouter } from "vue-router"
import { useCartStore } from "../stores/cart"

// composables/useLogout.ts
export function useLogout() {
  const router = useRouter()
  const cart = useCartStore() // si tu as d'autres stores, importe-les et reset aussi

  return {
    async logout() {
      // Cookies (SSR-safe)
      useCookie('access_token').value = undefined
      useCookie('refresh_token').value = undefined
      useCookie('roles').value = undefined

      // localStorage (compat)
      if (process.client) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('roles')
      }

      // Pinia: vider les stores
      cart.clear()

      // Redirection
      await router.replace('/')
      // Optionnel: forcer un refresh si tu veux tout purger en RAM
      // if (process.client) location.reload()
    }
  }
}
