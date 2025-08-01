<template>
  <div class="relative w-screen min-h-screen bg-cover bg-center font-sans" style="background-image: url('/images/acceuilBackground.jpg');">
    <div class="absolute inset-0 bg-black/10 backdrop-blur-sm bg-white/5"></div>

    <div class="relative z-10 p-6 text-fontColor flex flex-col gap-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-jauneMiel mb-4">Votre panier</h1>

      <div v-if="panier && panier.length > 0" class="space-y-4">
        <div v-for="item in panier" :key="item.id" class="flex items-center justify-between bg-white bg-opacity-10 backdrop-blur-md p-4 rounded shadow">
          <div>
            <h2 class="text-lg font-semibold text-white">{{ item.nom }}</h2>
            <p class="text-sm text-gray-300">{{ item.type }} – {{ item.date }}</p>
            <p class="text-sm text-jauneMiel font-bold">{{ item.prix }} €</p>
          </div>
          <div class="flex items-center gap-2">
            <input v-model.number="item.quantite" type="number" min="1" class="w-16 px-2 py-1 border rounded text-black bg-white" />
            <button @click="retirer(item.id)" class="text-red-500 text-sm hover:underline">Retirer</button>
          </div>
        </div>

        <div class="text-right text-lg font-semibold mt-6 text-white">
          Total : {{ totalPanier }} €
        </div>

        <div class="text-right">
          <button class="bg-buttonColor text-white px-6 py-2 rounded shadow hover:bg-jauneMiel transition" @click="formVisible = true">
            Passer la commande
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-300 text-lg">
        Votre panier est vide 🍯
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
            <p class="text-right font-bold mt-2">Total : {{ totalPanier }} €</p>
          </div>

          <button type="submit" class="w-full bg-buttonColor text-white py-2 rounded hover:bg-jauneMiel transition">
            Valider la commande
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

const router = useRouter()

const panier = ref([
  { id: 1, nom: 'Miel de lavande', prix: 7.5, quantite: 2, type: 'Fleurs', date: '2024' },
  { id: 2, nom: 'Miel d’acacia', prix: 6.0, quantite: 1, type: 'Boisé', date: '2024' },
])

const infos = reactive({
  nom: '',
  email: '',
  telephone: '',
  message: ''
})

const formVisible = ref(false)
const envoye = ref(false)

function retirer(id: number) {
  panier.value = panier.value.filter(p => p.id !== id)
}

function envoyerCommande() {
  console.log('Infos :', infos)
  console.log('Commande :', panier.value)
  envoye.value = true
}

function fermer() {
  formVisible.value = false
  envoye.value = false
}
const totalPanier = computed(() =>
  panier.value.reduce((t, i) => t + i.quantite * i.prix, 0).toFixed(2)
)
</script>
