<template>
  <div class="h-[80vh] w-3/4 bg-componentBackground/90 border border-grisClair rounded-lg p-4 z-10">
    <Miels  
    v-for="(miel, index) in miels" 
      :key="index" 
      :image="miel.image" 
      :title="miel.title" 
      :type="miel.type" 
      :date="miel.date" 
      :price="miel.price"
      @addToCart="ajouterAuPanier(miel)"
    />
  </div>
</template>

<script lang="ts" setup>
import Miels from './MielsCard.vue';
import { ref } from 'vue';

const miels = ref([
  { image: '/images/miel1.jpg', title: 'Miel 1', type: 'Acacia', date: '2024', price: 10 },
  // { image: '/images/miel2.jpg', title: 'Miel 2', type: 'Lavande', date: '2024', price: 12 },
]);

const ajouterAuPanier = (miel) => {
  console.log(`Ajouté au panier : ${miel.title}`);
};

</script>