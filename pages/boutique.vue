<template>
  <div class="relative w-screen h-screen bg-cover bg-center" style="background-image: url('/images/acceuilBackground.jpg');">
    <div class="absolute inset-0 bg-black/10 backdrop-blur-sm bg-white/5"></div> <!-- Assombrir si besoin -->

    <!-- Conteneur principal avec flex -->
    <div class="relative flex items-start gap-x-8 p-6">
      
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
        <div class="font-light font-sans">Le Rucher</div>

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


<script lang="ts" setup>
import Menu from '~/components/Menu.vue';
import Produits from '~/components/Produits.vue';
import Infos from '~/components/Infos.vue';

</script>