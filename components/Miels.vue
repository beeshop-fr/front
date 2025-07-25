<template>
  <div class="w-44 bg-white rounded-lg shadow-md p-4 flex flex-col items-center border border-gray-300">
    
    <!-- Image du produit -->
    <img :src="image" :alt="title" class="w-full h-32 object-cover rounded-lg mb-2">

    <!-- Informations du produit -->
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <hr class="w-full border-gray-300 my-1">
    <p class="text-sm text-gray-600">{{ type }}</p>
    <p class="text-sm text-gray-600">{{ date }}</p>
    <p class="text-sm font-bold text-black">Prix : {{ price }} €</p>

    <!-- Bouton Ajouter au panier -->
    <button 
      class="mt-3 bg-jauneMiel text-black text-sm font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition"
      @click="addToCart"
    >
      Ajouter au panier
    </button>

  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Récupération des props du produit
defineProps({
  image: String,
  title: String,
  type: String,
  date: String,
  price: Number
});

// Émission d'un événement pour ajouter au panier
const emit = defineEmits(["addToCart"]);
const addToCart = () => {
  emit("addToCart");
};
</script>

<style scoped>
/* Ajout d'un effet d'ombre douce */
.shadow-md {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
