<template>
  <div class="min-h-screen bg-componentBackground flex items-center justify-center font-sans">
    <div class="bg-white w-full max-w-md rounded-lg shadow-md p-6 border border-gray-200 relative">

      <h1 class="text-2xl font-bold text-jauneMiel mb-6 text-center">Mon compte</h1>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-600">Nom :</label>
          <input v-model="user.nom" type="text" class="w-full p-2 border rounded bg-gray-50 text-gray-800" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600">Email :</label>
          <input v-model="user.email" type="email" class="w-full p-2 border rounded bg-gray-50 text-gray-800" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-600">Mot de passe :</label>
          <div class="relative">
            <input
              :type="afficherMdp ? 'text' : 'password'"
              v-model="user.mdp"
              class="w-full p-2 border rounded bg-gray-50 text-gray-800 pr-10"
            />
            <button type="button" @click="afficherMdp = !afficherMdp"
              class="absolute top-1/2 right-2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700">
              {{ afficherMdp ? 'Cacher' : 'Afficher' }}
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <!-- Bouton retour -->
        <button @click="router.push('/boutique')" class="bg-componentBackground text-gray-500 px-4 py-2 rounded border border-gray-300 hover:bg-gray-300 transition">
          ← Retour
        </button>

        <!-- Bouton sauvegarder -->
        <button @click="sauvegarder" class="bg-jauneMiel text-white px-4 py-2 rounded hover:bg-yellow-500 transition">
          Sauvegarder
        </button>
      </div>

      <!-- Message de confirmation -->
      <div v-if="confirmationVisible" class="mt-4 text-green-600 text-sm text-center">
        ✅ Informations sauvegardées avec succès.
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ middleware: 'auth' }) //protection de la page

const router = useRouter()

const user = reactive({
  nom: '',
  email: '',
  mdp: ''
})

const afficherMdp = ref(false)
const confirmationVisible = ref(false)
const runtimeConfig = useRuntimeConfig()

const chargerUtilisateur = async () => {
  const token = localStorage.getItem('access_token')
  
  if (!token) {
    console.warn("Aucun token trouvé dans localStorage.")
    return
  }

  try {
    const data = await $fetch(`${runtimeConfig.public.apiBase}/api/Auth/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log("Données utilisateur :", data)

    user.nom = data.username ?? ''
    user.email = data.email ?? ''
  } catch (e) {
    console.error('Erreur lors du chargement des infos utilisateur', e)
  }
}

onMounted(() => {
  chargerUtilisateur()
})

function sauvegarder() {
  // Ici, tu pourrais aussi faire appel à une API ou stocker localement
  confirmationVisible.value = true
  setTimeout(() => {
    confirmationVisible.value = false
  }, 3000)
}
</script>
