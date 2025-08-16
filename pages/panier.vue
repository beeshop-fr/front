<template>
  <div class="relative w-screen min-h-screen bg-cover bg-center font-sans" style="background-image: url('/images/acceuilBackground.jpg');">
    <div class="absolute inset-0 bg-black/10 backdrop-blur-sm bg-white/5"></div>

    <div class="relative z-10 p-6 text-fontColor flex flex-col gap-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-jauneMiel mb-4">Votre panier</h1>

      <div v-if="panier && panier.length > 0" class="space-y-4">
        <div v-for="item in panier" :key="item.id" class="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md p-4 rounded shadow">
          <div>
            <h2 class="text-lg font-semibold text-white">{{ item.nom }}</h2>
            <p v-if="item.type || item.date" class="text-sm text-gray-300">
              <span v-if="item.type">{{ item.type }}</span>
              <span v-if="item.type && item.date"> – </span>
              <span v-if="item.date">{{ item.date }}</span>
            </p>
            <p class="text-sm text-jauneMiel font-bold">{{ item.prix.toFixed(2) }} €</p>
          </div>
          <div class="flex items-center gap-2">
            <input v-model.number="item.quantite" type="number" min="1" class="w-16 px-2 py-1 border rounded text-black bg-white" />
            <button @click="retirer(item.id)" class="text-red-500 text-sm hover:underline">Retirer</button>
          </div>
        </div>

        <div class="text-right text-lg font-semibold mt-6 text-white">
          Total : {{ totalPanier.toFixed(2) }} €
        </div>

        <div class="text-right">
          <button
            class="bg-buttonColor text-white px-6 py-2 rounded shadow hover:bg-jauneMiel transition disabled:opacity-60"
            :disabled="!panier.length || loading"
            @click="formVisible = true">
            Passer la commande
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-300 text-lg">
        Votre panier est vide…
      </div>
    </div>

    <!-- MODALE -->
    <div v-if="formVisible" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white text-gray-900 rounded-lg shadow p-6 w-full max-w-lg font-sans relative">
        <button class="absolute top-2 right-3 text-xl text-gray-500 hover:text-black" @click="fermer">×</button>

        <h2 class="text-xl font-bold mb-4 text-jauneMiel">Confirmer la commande</h2>

        <form @submit.prevent="envoyerCommande" class="space-y-4">
          <input v-model="infos.nom" type="text" placeholder="Nom complet" class="w-full p-2 border rounded bg-white" required />
          <input v-model="infos.email" type="email" placeholder="Adresse e-mail" class="w-full p-2 border rounded bg-white" required />
          <input v-model="infos.telephone" type="tel" placeholder="Téléphone (facultatif)" class="w-full p-2 border rounded bg-white" />
          <textarea v-model="infos.message" placeholder="Message ou précision (facultatif)" class="w-full p-2 border rounded bg-white"></textarea>

          <div class="border-t pt-4">
            <h3 class="font-semibold mb-2">Résumé :</h3>
            <ul class="text-sm space-y-1">
              <li v-for="item in panier" :key="item.id">
                {{ item.quantite }} × {{ item.nom }} – {{ (item.quantite * item.prix).toFixed(2) }} €
              </li>
            </ul>
            <p class="text-right font-bold mt-2">Total : {{ totalPanier.toFixed(2) }} €</p>
          </div>

          <div v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</div>

          <button type="submit"
                  :disabled="loading || !infos.email"
                  class="w-full bg-buttonColor text-white py-2 rounded hover:bg-jauneMiel transition disabled:opacity-60">
            <span v-if="!loading">Valider la commande</span>
            <span v-else>Envoi…</span>
          </button>
        </form>

        <div v-if="envoye" class="mt-4 p-4 bg-green-100 text-green-800 text-sm rounded flex flex-col gap-2 items-start">
          <p>✅ Commande envoyée à l’apiculteur. Vous recevrez un e-mail quand elle sera prête à être récupérée !</p>
          <button @click="router.push('/boutique')" class="mt-2 bg-buttonColor text-white px-4 py-2 rounded hover:bg-jauneMiel transition">
            Retourner à la boutique
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'

definePageMeta({ middleware: 'auth' })

type PanierItem = {
  id: string     // mielId côté back
  nom: string
  prix: number
  quantite: number
  type?: string
  date?: string
}

const router = useRouter()
const config = useRuntimeConfig()
const cart = useCartStore()

const panier = computed<PanierItem[]>(() => cart.items)
const totalPanier = computed(() => cart.total)

const infos = reactive({
  nom: '',
  email: '',
  telephone: '',
  message: ''
})

const formVisible = ref(false)
const envoye = ref(false)
const loading = ref(false)
const errorMsg = ref<string | null>(null)

// --- Helpers ---
function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}
function clampQty(item: PanierItem) {
  if (!item.quantite || item.quantite < 1) item.quantite = 1
  item.quantite = Math.floor(item.quantite)
}
function retirer(id: string) {
  cart.remove(id)
}
function fermer() {
  formVisible.value = false
  envoye.value = false
  errorMsg.value = null
}

function buildCheckoutPayload() {
  return {
    userEmail: infos.email,
    // si tu veux inclure nom/téléphone/message, ajoute-les aussi dans le body et gère-les côté back
    lignes: panier.value.map(i => ({
      mielId: i.id,
      quantite: Math.max(1, Math.floor(i.quantite || 1))
    }))
  }
}

// --- Envoi en 1 seul appel ---
async function envoyerCommande() {
  errorMsg.value = null
  loading.value = true
  try {
    if (!isValidEmail(infos.email)) throw new Error('Email invalide')
    if (!panier.value.length) throw new Error('Panier vide')

    const payload = buildCheckoutPayload()

    await $fetch(`${config.public.apiBase}/api/main/Checkout`, {
      method: 'POST',
      body: payload
    })

    envoye.value = true
    // Option : vider le panier après succès
    // cart.clear()
  } catch (err: any) {
    errorMsg.value = err?.data?.message ?? err?.message ?? 'Erreur lors de l’envoi'
  } finally {
    loading.value = false
  }
}
</script>