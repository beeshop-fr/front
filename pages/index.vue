<template>
  <div class="relative w-screen h-screen bg-cover bg-center" style="background-image: url('/images/acceuilBackground.jpg');">
    <div class="absolute inset-0 bg-black/10 backdrop-blur-sm"></div> <!-- Assombrir si besoin -->

    <!-- Particules en gouttes de miel -->
    <div v-for="n in 30" :key="n" class="honey-particle"></div>

    <div class="relative flex items-center justify-center h-full text-white text-3xl font-bold">

      <AccueilForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AccueilForm from '~/components/AccueilForm.vue';
</script>

<style>
@keyframes floating {
  0% { transform: translateY(0) scale(1); opacity: 0; } /* Départ invisible */
  20% { opacity: 0.9; } /* Devient visible rapidement */
  50% { transform: translateY(-50px) scale(1.2); opacity: 0.7; } /* Flottement */
  100% { transform: translateY(-100px) scale(1); opacity: 0; } /* Disparition */
}


.honey-particle {
  position: absolute;
  width: 10px; /* Taille des particules */
  height: 10px;
  background-color: #FFC107; /* Couleur miel */
  border-radius: 50%;
  opacity: 0.8;
  animation: floating 8s infinite ease-in-out;
}

/* Répartition aléatoire des particules sur tout l'écran */
.honey-particle:nth-child(1) { top: 5%; left: 10%; animation-duration: 7s; }
.honey-particle:nth-child(2) { top: 15%; left: 80%; animation-duration: 9s; }
.honey-particle:nth-child(3) { top: 25%; left: 50%; animation-duration: 6s; }
.honey-particle:nth-child(4) { top: 35%; left: 30%; animation-duration: 8s; }
.honey-particle:nth-child(5) { top: 45%; left: 60%; animation-duration: 10s; }
.honey-particle:nth-child(6) { top: 55%; left: 20%; animation-duration: 7s; }
.honey-particle:nth-child(7) { top: 65%; left: 90%; animation-duration: 9s; }
.honey-particle:nth-child(8) { top: 75%; left: 40%; animation-duration: 6s; }
.honey-particle:nth-child(9) { top: 85%; left: 70%; animation-duration: 8s; }
.honey-particle:nth-child(10) { top: 95%; left: 10%; animation-duration: 7s; }

/* Ajoute plus de particules avec différentes positions */
.honey-particle:nth-child(11) { top: 50%; left: 10%; animation-duration: 7s; }
.honey-particle:nth-child(12) { top: 20%; left: 25%; animation-duration: 5s; }
.honey-particle:nth-child(13) { top: 80%; left: 85%; animation-duration: 9s; }
.honey-particle:nth-child(14) { top: 60%; left: 40%; animation-duration: 6s; }
.honey-particle:nth-child(15) { top: 30%; left: 70%; animation-duration: 8s; }
.honey-particle:nth-child(16) { top: 10%; left: 90%; animation-duration: 10s; }
.honey-particle:nth-child(17) { top: 70%; left: 20%; animation-duration: 7s; }
.honey-particle:nth-child(18) { top: 40%; left: 80%; animation-duration: 9s; }
.honey-particle:nth-child(19) { top: 90%; left: 50%; animation-duration: 6s; }
.honey-particle:nth-child(20) { top: 15%; left: 5%; animation-duration: 8s; }

</style>