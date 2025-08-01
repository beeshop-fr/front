<template>
  <div class="w-44 bg-white rounded-lg shadow-md p-4 flex flex-col items-center border border-gray-300 font-sans">
    
    <!-- Image -->
    <img :src="image" :alt="title" class="w-full h-32 object-cover rounded-lg mb-2">

    <!-- Infos -->
    <h3 class="text-lg font-semibold text-center">{{ title }}</h3>
    <hr class="w-full border-gray-300 my-1">
    <p class="text-sm text-gray-600">{{ type }}</p>
    <p class="text-sm text-gray-600">{{ date }}</p>
    <p class="text-sm font-bold text-black">Prix : {{ price }} €</p>

    <!-- Slot ou mode : actions contextuelles -->
    <div class="mt-3 w-full flex flex-col gap-1 items-center">
      <slot>
        <button 
          class="bg-jauneMiel text-black text-sm font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition w-full"
          @click="addToCart"
        >
          Ajouter au panier
        </button>
      </slot>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: String,
  title: String,
  type: String,
  date: String,
  price: Number
})

const emit = defineEmits(["addToCart"])
function addToCart() {
  emit("addToCart")
}
</script>

<style scoped>

.shadow-md {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
