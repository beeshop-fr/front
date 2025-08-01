<template>
  <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg text-gray-800 font-sans">
    <h2 class="text-xl font-bold mb-4">{{ miel ? 'Modifier' : 'Ajouter' }} un miel</h2>
    <form @submit.prevent="valider">
      <div class="mb-3">
        <label class="block text-sm">Nom</label>
        <input v-model="form.nom" class="w-full border rounded p-2" required />
      </div>
      <div class="mb-3">
        <label class="block text-sm">Prix (€)</label>
        <input type="number" v-model.number="form.prix" class="w-full border rounded p-2" required />
      </div>
      <div class="mb-3">
        <label class="block text-sm">Stock</label>
        <input type="number" v-model.number="form.stock" class="w-full border rounded p-2" required />
      </div>
      <div class="mb-3">
        <label class="block text-sm">Type</label>
        <input v-model="form.type" class="w-full border rounded p-2" />
      </div>
      <div class="mb-3">
        <label class="block text-sm">Date</label>
        <input type="date" v-model="form.date" class="w-full border rounded p-2" />
      </div>
      <div class="mb-3">
        <label class="block text-sm">Image (URL)</label>
        <input v-model="form.image" class="w-full border rounded p-2" />
      </div>

      <div class="flex justify-end gap-3 mt-4">
        <button type="button" @click="$emit('cancel')" class="px-3 py-1 bg-gray-300 rounded">Annuler</button>
        <button type="submit" class="px-3 py-1 bg-buttonColor text-white rounded">{{ miel ? 'Enregistrer' : 'Ajouter' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  miel?: {
    id: number
    nom: string
    prix: number
    stock: number
    type: string
    date: string
    image: string
  }
}>()

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  nom: props.miel?.nom ?? '',
  prix: props.miel?.prix ?? 0,
  stock: props.miel?.stock ?? 0,
  type: props.miel?.type ?? '',
  date: props.miel?.date ?? '',
  image: props.miel?.image ?? ''
})

function valider() {
  emit('submit', { ...form, id: props.miel?.id ?? Date.now() })
}
</script>
