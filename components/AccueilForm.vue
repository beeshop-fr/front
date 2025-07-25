<template>
  <div class="flex flex-col items-center justify-center bg-componentBackground bg-opacity-90 h-auto w-64 border-4 border-jauneMiel rounded-lg p-5 space-y-4">
    <!-- Titre -->
    <p class="text-center font-sans font-light text-lg ">Bienvenue au Rucher !</p>

    <div class="flex flex-col w-full p-2 space-y-4">
      <button @click="showLoginModal = true" class="w-full bg-jauneMiel text-black font-sans font-light text-lg py-2 px-4 rounded-md transition hover:bg-grisClair hover:scale-105">
        Se connecter
      </button>

      <NuxtLink to="/boutique" class="w-full">
        <button class="w-full bg-jauneMiel text-black font-sans font-light text-lg py-2 px-4 rounded-md transition hover:bg-grisClair hover:scale-105">
          Accès boutique
        </button>
      </NuxtLink>
    </div>
  </div>

  <!-- Modale de connexion -->
  <div v-if="showLoginModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-96 shadow-lg relative">
      <button 
        @click="showLoginModal = false"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ✖
      </button>

      <h2 class="text-xl font-bold text-center mb-4">Connexion</h2>

      <form class="space-y-4">
        <input type="text" placeholder="Identifiant" class=" font-light font-sans text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-jauneMiel">
        <input type="password" placeholder="Mot de passe" class="font-light font-sans text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-jauneMiel">
        
        <button type="submit" class="font-base font-sans w-full bg-jauneMiel text-white space-y-2 py-2 rounded-md hover:bg-gray-500 transition ">Valider</button>
      </form>

      <p class="text-center font-sans text-black mt-4 text-sm">
        Pas encore de compte ?
        <a href="#" class="font-sans text-jauneMiel hover:underline"> Créer un compte</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const showLoginModal = ref(false);

</script>