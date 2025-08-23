<template>
  <div class="flex flex-col items-center justify-center bg-componentBackground bg-opacity-90 h-auto w-64 border-4 border-jauneMiel rounded-lg p-5 space-y-4">
    <!-- Titre -->
    <p class="text-center font-sans font-light text-lg">Bienvenue sur Beeshop !</p>

    <div class="flex flex-col w-full p-2 space-y-4">
      <button @click="showLoginModal = true" class="w-full bg-jauneMiel text-black font-sans font-light text-lg py-2 px-4 rounded-md transition hover:bg-grisClair hover:scale-105">
        Se connecter
      </button>

      <button
        @click="showRegisterModal = true"
        class="w-full bg-jauneMiel text-black font-sans font-light text-lg py-2 px-4 rounded-md transition hover:bg-grisClair hover:scale-105"
      >
        S'inscrire
      </button>
    </div>
  </div>

  <!-- Modale de connexion -->
  <div v-if="showLoginModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-96 shadow-lg relative">
      <button @click="showLoginModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>
      <h2 class="text-xl font-bold text-center mb-4">Connexion</h2>

      <form class="space-y-4" @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Identifiant" class="font-light font-sans text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-jauneMiel">
        <input v-model="password" type="password" placeholder="Mot de passe" class="font-light font-sans text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-jauneMiel">
        <button type="submit" class="font-base font-sans w-full bg-jauneMiel text-white py-2 rounded-md hover:bg-gray-500 transition">Valider</button>
      </form>

      <p class="text-center font-sans text-black mt-4 text-sm">
        Pas encore de compte ?
        <a href="#" @click.prevent="showLoginModal = false; showRegisterModal = true" class="text-jauneMiel hover:underline">Créer un compte</a>
      </p>
    </div>
  </div>

  <!-- Modale d’inscription -->
  <div v-if="showRegisterModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-96 shadow-lg relative">
      <button @click="showRegisterModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>

      <h2 class="text-xl font-bold text-center mb-4">Inscription</h2>

      <form class="space-y-4" @submit.prevent="register">
        <input v-model="username" type="text" placeholder="Nom d’utilisateur" class="w-full px-4 py-2 border text-black rounded-md focus:ring-jauneMiel">
        <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border text-black rounded-md focus:ring-jauneMiel">
        <input v-model="password" type="password" placeholder="Mot de passe" class="w-full px-4 py-2 border text-black rounded-md focus:ring-jauneMiel">

        <button type="submit" class="w-full bg-jauneMiel text-white py-2 rounded-md hover:bg-gray-500 transition">
          Valider l’inscription
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navigateTo, useCookie, useFetch, useRuntimeConfig } from 'nuxt/app'
import { ref } from 'vue'

const showLoginModal = ref(false)
const showRegisterModal = ref(false)

// Formulaires
const username = ref('')
const email = ref('')
const password = ref('')

const runtimeConfig = useRuntimeConfig()

function parseJwt(token: string) {
  try {
    const base64 = token.split('.')[1]
    const json = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

const saveSession = (token: string) => {
  console.log("saveSession appelé avec token:", token) // debug

  const payload = parseJwt(token)
  console.log("Payload JWT:", payload) // debug

  const roles = payload?.realm_access?.roles || payload?.roles || []

  // Cookies
  useCookie('access_token', { sameSite: 'lax' }).value = token
  useCookie('roles', { sameSite: 'lax' }).value = JSON.stringify(roles)

  // LocalStorage
  if (process.client) {
    localStorage.setItem('access_token', token)
    localStorage.setItem('roles', JSON.stringify(roles))
  }
}

const login = async () => {
  try {
    const tokenResponse = await $fetch(`${runtimeConfig.public.apiAuthUrl}/api/Auth/login`, {
      method: 'POST',
      body: { username: username.value, password: password.value },
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("Réponse login:", tokenResponse)
    saveSession(tokenResponse.token)
    showLoginModal.value = false
    await navigateTo('/boutique')
  } catch (e) {
    console.error('Erreur lors de la connexion', e)
    alert('Échec de la connexion. Vérifiez vos identifiants.')
  }
}

const register = async () => {
  try {
    const { error } = await useFetch(`${runtimeConfig.public.apiAuthUrl}/api/Auth/register`, {
      method: 'POST',
      body: { username: username.value, email: email.value, password: password.value }
    })

    if (error.value) {
      console.error('Erreur d’inscription', error.value)
      return
    }

    // Auto-login après inscription
    const tokenResponse = await $fetch(`${runtimeConfig.public.apiAuthUrl}/api/Auth/login`, {
      method: 'POST',
      body: { username: username.value, password: password.value },
      headers: { 'Content-Type': 'application/json' }
    })

    saveSession(tokenResponse.token)
    alert('Inscription réussie !')
    showRegisterModal.value = false
    await navigateTo('/boutique')
  } catch (e) {
    console.error('Erreur inattendue', e)
  }
}

</script>
