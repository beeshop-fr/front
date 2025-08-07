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

const miels = ref<any[]>([])
const formVisible = ref(false)
const mielEnCours = ref<any>(null)
const config = useRuntimeConfig()

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

async function enregistrer(formData: FormData) {
  const id = formData.get('id')

  if (id) {
    const updatedMiel = {
      nom: formData.get('Nom'),
      prix: parseFloat(formData.get('Prix') as string),
      poids: parseInt(formData.get('Poids') as string),
      typeMiel: formData.get('TypeMiel'),
      date: formData.get('Date'),
      description: formData.get('Description'),
    }

    const response = await fetch(`${config.public.apiBase}/api/main/Miel/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMiel)
    })

    if (response.ok) {
      const result = await response.json()
      const index = miels.value.findIndex(m => m.id === result.id)
      if (index !== -1) miels.value[index] = result
    } else {
      console.error('Erreur mise à jour')
    }

  } else {
    const response = await fetch(`${config.public.apiBase}/api/main/Miel`, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const result = await response.json()
      miels.value.push(result)
    } else {
      console.error('Erreur création miel')
    }
  }

  fermerFormulaire()
}
</script>