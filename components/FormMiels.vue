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
        <label class="block text-sm">Poids (g)</label>
        <input type="number" v-model.number="form.poids" class="w-full border rounded p-2" required />
      </div>

      <div class="mb-3">
        <label class="block text-sm">Type de miel</label>
        <select v-model="form.typeMiel" class="w-full border rounded p-2" required>
          <option disabled value="">Sélectionner un type</option>
          <option
            v-for="type in typesMielDisponibles"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="block text-sm">Date</label>
        <input type="date" v-model="form.date" class="w-full border rounded p-2" />
      </div>

      <div class="mb-3">
        <label class="block text-sm">Description</label>
        <textarea v-model="form.description" class="w-full border rounded p-2" rows="3"></textarea>
      </div>

      <div class="mb-3">
        <label class="block text-sm">Image</label>
        <input type="file" @change="handleFileChange" class="w-full border rounded p-2" />
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
    poids: number
    typeMiel: string
    date: string
    description?: string
    image: string
  }
}>()

const emit = defineEmits(['submit', 'cancel'])

const typesMielDisponibles = [
  { value: 'PrintempsCremeux', label: 'Miel de fleurs cremeux' },
  { value: 'PrintempsLiquide', label: 'Miel de fleurs liquide' },
  { value: 'EteLiquide', label: 'Miel d\'été' },
]

const form = reactive({
  nom: props.miel?.nom ?? '',
  prix: props.miel?.prix ?? 0,
  poids: props.miel?.poids ?? 0,
  typeMiel: props.miel?.typeMiel ?? '',
  date: props.miel?.date ?? '',
  description: props.miel?.description ?? '',
  image: props.miel?.image ?? ''
})

const imageFile = ref<File | null>(null)

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0]
  }
}

function valider() {
  const data = new FormData()
  data.append('Nom', form.nom)
  data.append('Prix', String(form.prix))
  data.append('Poids', String(form.poids))
  data.append('Type', form.typeMiel)
  data.append('Date', form.date)
  data.append('Description', form.description)

  if (imageFile.value) {
    data.append('Image', imageFile.value)
  }

  if (props.miel?.id) {
    data.append('id', String(props.miel.id))
  }

  emit('submit', data)
}
</script>