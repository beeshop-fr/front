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
import ListeMiels from '~/components/ListeMiels.vue'
import FormMiel from '~/components/FormMiels.vue'

const miels = ref([
  { id: 1, nom: 'Miel de lavande', prix: 7.5, stock: 12, image: '/images/lavande.jpg', type: 'Fleurs', date: '2024' },
  { id: 2, nom: 'Miel d’acacia', prix: 6.0, stock: 8, image: '/images/acacia.jpg', type: 'Boisé', date: '2024' },
])

const formVisible = ref(false)
const mielEnCours = ref<any>(null)

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

function enregistrer(miel: any) {
  const index = miels.value.findIndex(m => m.id === miel.id)
  if (index !== -1) {
    miels.value[index] = miel
  } else {
    miels.value.push({ ...miel, id: Date.now() })
  }
  fermerFormulaire()
}

function supprimerMiel(id: number) {
  miels.value = miels.value.filter(m => m.id !== id)
}
</script>
