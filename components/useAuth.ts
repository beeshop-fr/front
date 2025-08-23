// composables/useAuth.ts
import { computed } from 'vue'

function parseJwt(token?: string|null) {
  if (!token) return null
  try {
    const base64 = token.split('.')[1]
    const json = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    )
    return JSON.parse(json)
  } catch { return null }
}

export function useAuth() {
  // cookies SSR-safe
  const token = useCookie<string | undefined>('access_token')
  const rolesCookie = useCookie<string | undefined>('roles')

  const roles = computed<string[]>(() => {
    const payload = parseJwt(token.value)

    // Récupère les rôles quelle que soit la forme
    const realm = payload?.realm_access?.roles ?? []
    const clientRoles = Object.values(payload?.resource_access ?? {})
      .flatMap((r: any) => Array.isArray(r?.roles) ? r.roles : [])

    const inline =
      (Array.isArray(payload?.roles) ? payload?.roles : []) // roles: []
      ?? []

    const permissions =
      (Array.isArray(payload?.permissions) ? payload?.permissions : []) // permissions: []
      ?? []

    // Fallback cookie si rien dans le token
    let cookieRoles: string[] = []
    if (rolesCookie.value) {
      try { cookieRoles = JSON.parse(rolesCookie.value) } catch { /* ignore */ }
    }

    // Normalise (lowercase)
    const all = [...realm, ...clientRoles, ...inline, ...permissions, ...cookieRoles]
      .filter(Boolean)
      .map(r => String(r).toLowerCase())

    // unique
    return Array.from(new Set(all))
  })

  const isAdmin = computed(() => {
    // couvre 'admin', 'role_admin', 'administrator'...
    return roles.value.includes('admin')
  })

  const isAuthenticated = computed(() => {
    const t = token.value
    if (!t) return false
    const p = parseJwt(t)
    return !p?.exp || Date.now() < p.exp * 1000
  })

  return { token, roles, isAdmin, isAuthenticated }
}
