<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <MielsCard
      v-for="miel in miels"
      :key="miel.id"
      :image="miel.image || '/images/miel1.jpg'"
      :title="miel.nom"
      :type="miel.typeMiel"
      :description="miel.description"
      :date="miel.date"
      :price="miel.prix"
    >
      <div class="flex gap-2 mt-2">
        <button class="text-sm text-blue-600 hover:underline" @click="$emit('edit', miel)">Modifier</button>
        <button class="text-sm text-red-600 hover:underline" @click="$emit('delete', miel.id)">Supprimer</button>
      </div>
    </MielsCard>
  </div>
</template>

<script setup lang="ts">
import MielsCard from './MielsCard.vue'

defineProps<{
  miels: any[]
}>()

defineEmits(['edit', 'delete'])
</script>
