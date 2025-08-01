<template>
  <div class="relative w-screen h-screen bg-cover bg-center" style="background-image: url('/images/acceuilBackground.jpg');">
    <div class="absolute inset-0 bg-black/10 backdrop-blur-sm bg-white/5"></div>

    <!-- BOUTON DÉCONNEXION -->
    <div class="absolute top-4 left-6 z-20">
      <button
        @click="deconnexion"
        class="flex items-center gap-2 bg-componentBackground text-fontColor px-4 py-2 rounded shadow hover:bg-jauneMiel transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-fontColor" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h8.586l-2.293-2.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-semibold">Déconnexion</span>
      </button>
    </div>

    <!-- Accès compte utilisateur -->
    <div class="absolute top-4 right-6 z-20">
      <router-link to="/compte" class="flex items-center gap-2 bg-componentBackground text-fontColor px-4 py-2 rounded shadow hover:bg-jauneMiel transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-fontColor" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1a4 4 0 108 0V6a4 4 0 00-4-4zM4 14a6 6 0 1112 0v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-semibold">Compte</span>
      </router-link>
    </div>


    <!-- Conteneur principal -->
    <div class="relative flex items-start gap-x-8 p-6 pt-16">
      
      <!-- Bloc Menu + Infos -->
      <div class="flex flex-col justify-between gap-y-12 self-start w-64">
        <Menu class=""></Menu>
        <Infos class=""></Infos>
      </div>

      <div class="flex-1">
        <Produits class="w-full"></Produits>
      </div>

    </div>

  </div>
  <!-- FOOTER -->
   <footer class="fixed bottom-0 w-full bg-componentBackground p-2 text-gray-400 text-center border-t-4 border-jauneMiel">
    <div class = "container mx-auto">

      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="font-light font-sans">Beeshop</div>

        <nav class="flex space-x-4 mt-2 md:mt-0">
          <a href="#" class="font-light font-sans text-gray-400 hover:text-jauneMiel">Contact</a>
          <a href="#" class="font-light font-sans text-gray-400 hover:text-jauneMiel">Mentions légales</a>
          <a href="#" class="font-light font-sans text-gray-400 hover:text-jauneMiel">FAQ</a>
        </nav>
      </div>

    </div>

    <p class="text-center font-light font-sans text-gray-400">© 2025 - Tous droits réservés</p>
  </footer>
</template>


<script setup>
import Menu from '~/components/Menu.vue';
import Produits from '~/components/Produits.vue';
import Infos from '~/components/Infos.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

function deconnexion() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  router.push('/')
}

</script>