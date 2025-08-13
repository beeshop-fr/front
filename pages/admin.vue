<template>
  <div class="relative w-screen h-screen bg-cover bg-center font-sans" style="background-image: url('/images/acceuilBackground.jpg');">
    <div class="absolute inset-0 bg-black/10 backdrop-blur-sm bg-white/5"></div>

    <!-- Contenu principal -->
    <div class="relative p-6 flex flex-col gap-6 text-fontColor z-10">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-jauneMiel">Tableau de bord</h1>
        <button @click="ouvrirFormulaire()" class="bg-buttonColor text-white px-4 py-2 rounded shadow hover:bg-jauneMiel transition">
          Ajouter un miel
        </button>
      </div>

      <ListeMiels :miels="miels" @edit="editerMiel" @delete="supprimerMiel" />

      <div v-if="formVisible" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <FormMiel :miel="mielEnCours" @submit="enregistrer" @cancel="fermerFormulaire" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ListeMiels from '~/components/ListeMiels.vue'
import FormMiel from '~/components/FormMiels.vue'


definePageMeta({ middleware: 'admin' })

const miels = ref<any[]>([])
const formVisible = ref(false)
const mielEnCours = ref<any>(null)
const config = useRuntimeConfig()
const stocks = ref<any[]>([])

// Chargement initial
onMounted(async () => {
  try {
    const res = await fetch(`${config.public.apiBase}/api/main/Miel`)
    if (res.ok) {
      const result = await res.json()

      // Si backend renvoie { count, entities }
      if (result.entities) {
        miels.value = result.entities
      } else {
        miels.value = result // fallback si c’est déjà un tableau
      }
    } else {
      console.error("Erreur de récupération des miels")
    }

    // Récupération des stocks
    const resStocks = await fetch(`${config.public.apiBase}/api/main/Stock`)
    if (resStocks.ok) {
      const result = await resStocks.json()
      const stockList = result.entities 
      console.log("Stock reçu :", stockList)

      // Par exemple, si tu veux relier ça à un `ref` :
      stocks.value = stockList

      const stockMap = new Map<string, any>()
      for (const stock of stockList) {
        stockMap.set(stock.mielId, stock)
      }

      miels.value = miels.value.map(miel => {
        const stock = stockMap.get(miel.id)
        return {
          ...miel,
          stockId: stock?.id || null,
          quantite: stock?.quantite ?? 0,
        }
      })
    } else {
      console.error("Erreur de récupération du stock")
    }

  } catch (e) {
    console.error(e)
  }
})

function ouvrirFormulaire() {
  mielEnCours.value = null
  formVisible.value = true
}

function fermerFormulaire() {
  formVisible.value = false
  mielEnCours.value = null
}

function editerMiel(miel: any) {
  mielEnCours.value = { ...miel }
  formVisible.value = true
}

async function supprimerMiel(id: string) {
  const res = await fetch(`${config.public.apiBase}/api/main/Miel/${id}`, { method: 'DELETE' })
  if (res.ok) {
    miels.value = miels.value.filter(m => m.id !== id)
  } else {
    console.error("Erreur suppression miel")
  }
}

async function enregistrer({ formData, quantite, mielId, stockId }) {
  const isEditing = !!mielId
  let mielResult = null

  // Création ou modification du miel
  if (isEditing) {
    const response = await fetch(`${config.public.apiBase}/api/main/Miel/${mielId}`, {
      method: 'PUT',
      body: formData
    })
    if (!response.ok) return console.error("Erreur update miel")
    mielResult = await response.json()
    const index = miels.value.findIndex(m => m.id === mielResult.id)
    if (index !== -1) miels.value[index] = mielResult
  } else {
    const response = await fetch(`${config.public.apiBase}/api/main/Miel`, {
      method: 'POST',
      body: formData
    })
    if (!response.ok) return console.error("Erreur création miel")
    mielResult = await response.json()
    miels.value.push(mielResult)
  }

  // Gestion du stock
  const stockPayload = {
    mielId: mielResult.id,
    quantite
  }

  const stockUrl = stockId
    ? `${config.public.apiBase}/api/main/Stock/${stockId}`
    : `${config.public.apiBase}/api/main/Stock`

  const stockMethod = stockId ? 'PUT' : 'POST'

  const stockRes = await fetch(stockUrl, {
    method: stockMethod,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stockPayload)
  })

  if (!stockRes.ok) {
    console.error("Erreur stock")
  }

  fermerFormulaire()
}

</script>