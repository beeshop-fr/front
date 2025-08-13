<template>
  <div class="relative w-screen h-screen bg-cover bg-center" style="background-image: url('/images/acceuilBackground.jpg');">
    <div class="absolute inset-0 bg-black/10 backdrop-blur-sm bg-white/5"></div>

    <!-- BOUTON DÉCONNEXION -->
    <div class="absolute top-4 left-6 z-20">
      <button
        @click="deconnexion"
        class="flex items-center gap-2 bg-componentBackground text-fontColor px-4 py-2 rounded shadow hover:bg-jauneMiel transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-fontColor" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h8.586l-2.293-2.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-semibold">Déconnexion</span>
      </button>
    </div>

    <!-- Accès compte utilisateur -->
    <div class="absolute top-4 right-6 z-20">
      <router-link to="/compte" class="flex items-center gap-2 bg-componentBackground text-fontColor px-4 py-2 rounded shadow hover:bg-jauneMiel transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-fontColor" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1a4 4 0 108 0V6a4 4 0 00-4-4zM4 14a6 6 0 1112 0v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-semibold">Compte</span>
      </router-link>
    </div>


    <!-- Conteneur principal -->
    <div class="relative flex items-start gap-x-8 p-6 pt-16">
      
      <!-- Bloc Menu + Infos -->
      <div class="flex flex-col justify-between gap-y-12 self-start w-64">
        <Menu class=""></Menu>
        <!-- <Infos class=""></Infos> -->
      </div>

      <div class="flex-1">
        <!-- <div v-if="pending" class="text-fontColor/80">Chargement des miels…</div>
        <div v-else-if="error" class="text-red-400">Erreur de chargement.</div> -->
        <Produits class="w-full" :miels="miels" @add-to-cart="onAddToCart" ></Produits>
      </div>

    </div>

  </div>
  <!-- FOOTER -->
   <footer class="fixed bottom-0 w-full bg-componentBackground p-2 text-gray-400 text-center border-t-4 border-jauneMiel">
    <div class = "container mx-auto">

      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="font-light font-sans">Beeshop</div>

        <nav class="flex space-x-4 mt-2 md:mt-0">
          <a href="#" class="font-light font-sans text-gray-400 hover:text-jauneMiel">Contact</a>
          <a href="#" class="font-light font-sans text-gray-400 hover:text-jauneMiel">Mentions légales</a>
          <a href="#" class="font-light font-sans text-gray-400 hover:text-jauneMiel">FAQ</a>
        </nav>
      </div>

    </div>

    <p class="text-center font-light font-sans text-gray-400">© 2025 - Tous droits réservés</p>
  </footer>
</template>


<script setup lang="ts">
import Menu from '~/components/Menu.vue'
import Produits from '~/components/Produits.vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { computed } from 'vue'
import { useLogout } from '../components/useLogout'

definePageMeta({ middleware: 'auth' }) //protection de la page

const cart = useCartStore()
const router = useRouter()
const apiBase = useRuntimeConfig().public.apiBase
const { logout } = useLogout()
const deconnexion = logout

// 1) fetch miels + stocks (comme la page admin)
const { data: rawMiels, pending: pMiels, error: eMiels } = await useAsyncData(
  'miels',
  async () => {
    const res = await $fetch<any>(`${apiBase}/api/main/Miel`)
    return Array.isArray(res) ? res : (res?.entities ?? [])
  },
  { server: false, lazy: true }
)

const { data: rawStocks, pending: pStocks, error: eStocks } = await useAsyncData(
  'stocks',
  async () => {
    const res = await $fetch<any>(`${apiBase}/api/main/Stock`)
    return Array.isArray(res) ? res : (res?.entities ?? [])
  },
  { server: false, lazy: true }
)

// 2) merge & mapping vers le format attendu par la card boutique
const miels = computed(() => {
  const m = rawMiels.value ?? []
  const s = rawStocks.value ?? []
  const sMap = new Map(s.map((st: any) => [st.mielId, st]))

  return m.map((x: any) => {
    const st = sMap.get(x.id)
    return {
      id: x.id,
      nom: x.nom ?? x.title ?? x.name ?? 'Miel',
      typeMiel: x.typeMiel ?? x.type ?? '',
      date: x.date ?? x.recolte ?? '',
      prix: x.prix ?? x.price ?? 0,
      description: x.description ?? '',
      image: x.imagePath ? `${apiBase}${x.imagePath}` : (x.image ?? '/images/miel1.jpg'),
      quantite: st?.quantite ?? x.quantite ?? 0,
      stockId: st?.id ?? null
    }
  })
})

// 3) actions
const {$notify} = useNuxtApp()

function onAddToCart(miel: any) {
  cart.add({ id: miel.id, nom: miel.nom, prix: miel.prix, type: miel.typeMiel, date: miel.date }, 1)
  // notif navigateur si plugin dispo, sinon silencieux
  $notify?.(`"${miel.nom}" a été ajouté au panier.`)
}

// function deconnexion() {
//   if (process.client) {
//     localStorage.removeItem('access_token')
//     localStorage.removeItem('refresh_token')
//   }
//   router.push('/')
// }
</script>