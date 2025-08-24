<template>
  <div class="h-[80vh] w-full bg-componentBackground/90 border border-grisClair rounded-lg p-4 z-10 overflow-y-auto">
    <div class="grid [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))] gap-6">
      <Miels
        v-for="(miel, index) in miels"
        :key="miel.id || index"
        class="h-full"
        :image="miel.image"
        :title="miel.nom"
        :type="miel.typeMiel"
        :date="miel.date"
        :price="miel.prix"
        :description="miel.description"
        :stock="miel.quantite"
        @add-to-cart="emit('add-to-cart', miel)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Miels from './MielsCard.vue';
import { ref } from 'vue';

const props = defineProps<{ miels: any[] }>()
const emit = defineEmits<{ (e:'add-to-cart', miel:any): void }>()

</script>