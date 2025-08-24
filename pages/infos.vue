<template>
  <main class="min-h-screen w-full bg-cover bg-center text-fontColor" style="background-image:url('/images/acceuilBackground.jpg')">
    <div class="bg-black/40 backdrop-blur-[1px]">

      <!-- HERO -->
      <section class="container mx-auto px-4 pt-20 pb-12">
        <div class="inline-flex items-center gap-2 rounded-full border border-jauneMiel/40 bg-componentBackground/60 px-3 py-1 text-sm text-fontColor/80">
          <span class="i-lucide-sparkles" aria-hidden="true"></span>
          À propos de BeeShop
        </div>
        <h1 class="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">Qui sommes‑nous&nbsp;?</h1>
        <p class="mt-3 max-w-2xl text-fontColor/80">
          BeeShop, c’est une petite équipe d’apiculteurs amateurs et de proches qui
          récoltent un miel local, en quantité raisonnable, pour financer l’activité et…
          pour le plaisir de partager des pots entre ami·e·s. L’application rend la
          réservation de pots simple, ludique et transparente.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <NuxtLink to="/boutique" class="inline-flex items-center rounded bg-jauneMiel px-4 py-2 font-semibold text-black shadow hover:brightness-95 transition">
            Découvrir les miels
          </NuxtLink>
          <NuxtLink to="/compte" class="inline-flex items-center rounded border border-jauneMiel/60 bg-componentBackground px-4 py-2 font-semibold text-fontColor hover:bg-jauneMiel/10 transition">
            Mon compte
          </NuxtLink>
        </div>
      </section>

      <!-- MISSION / VISION -->
      <section class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-10">
        <article class="rounded-2xl border border-jauneMiel/20 bg-componentBackground/70 p-6 shadow">
          <h2 class="text-xl font-bold">Notre mission</h2>
          <p class="mt-2 text-fontColor/80">
            Prendre soin des abeilles, respecter les saisons et offrir un miel sincère,
            traçable et local. Les ventes servent à entretenir le matériel, planter
            des essences mellifères et pérenniser l’activité.
          </p>
          <ul class="mt-4 space-y-2 text-sm">
            <li class="flex items-start gap-2"><span class="mt-0.5">✔</span> Récoltes modestes, qualité avant quantité</li>
            <li class="flex items-start gap-2"><span class="mt-0.5">✔</span> Traçabilité par lot (date, rucher, floraison)</li>
            <li class="flex items-start gap-2"><span class="mt-0.5">✔</span> Emballages simples et réutilisables</li>
          </ul>
        </article>
        <article class="rounded-2xl border border-jauneMiel/20 bg-componentBackground/70 p-6 shadow">
          <h2 class="text-xl font-bold">Notre vision</h2>
          <p class="mt-2 text-fontColor/80">
            Une micro‑filière conviviale où l’on réserve son pot comme on réserve une
            place de ciné : en quelques clics.
          </p>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="rounded-xl border border-jauneMiel/20 bg-componentBackground p-3">
              <h3 class="font-semibold">Simplicité</h3>
              <p class="text-sm text-fontColor/80">Réserver, payer, récupérer près de chez vous.</p>
            </div>
            <div class="rounded-xl border border-jauneMiel/20 bg-componentBackground p-3">
              <h3 class="font-semibold">Proximité</h3>
              <p class="text-sm text-fontColor/80">Entre amis, voisins, collègues et famille.</p>
            </div>
            <div class="rounded-xl border border-jauneMiel/20 bg-componentBackground p-3">
              <h3 class="font-semibold">Transparence</h3>
              <p class="text-sm text-fontColor/80">Lots, dates de récolte et disponibilité en temps réel.</p>
            </div>
          </div>
        </article>
      </section>

      <!-- COMMENT ÇA MARCHE -->
      <section class="container mx-auto px-4 py-8">
        <h2 class="text-center text-xl font-bold">Comment ça marche&nbsp;?</h2>
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="rounded-2xl border border-jauneMiel/20 bg-componentBackground/70 p-6 shadow">
            <div class="text-sm uppercase tracking-wider text-fontColor/70">01</div>
            <h3 class="mt-1 font-semibold">Choisissez votre miel</h3>
            <p class="text-sm text-fontColor/80">Chaque pot indique son lot, sa floraison et le stock restant.</p>
          </div>
          <div class="rounded-2xl border border-jauneMiel/20 bg-componentBackground/70 p-6 shadow">
            <div class="text-sm uppercase tracking-wider text-fontColor/70">02</div>
            <h3 class="mt-1 font-semibold">Réservez vos pots</h3>
            <p class="text-sm text-fontColor/80">Simple et rapide</p>
          </div>
          <div class="rounded-2xl border border-jauneMiel/20 bg-componentBackground/70 p-6 shadow">
            <div class="text-sm uppercase tracking-wider text-fontColor/70">03</div>
            <h3 class="mt-1 font-semibold">Récupérez simplement</h3>
            <p class="text-sm text-fontColor/80">Directement chez votre apiculteur</p>
          </div>
        </div>
      </section>

      <!-- VALEURS -->
      <section class="container mx-auto px-4 py-8">
        <h2 class="text-xl font-bold text-center">Nos valeurs</h2>
        <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="value-card">
            <div class="text-2xl">🐝</div>
            <h3 class="font-semibold">Apiculture responsable</h3>
            <p class="text-sm text-fontColor/80">Respect des colonies, des périodes et des floraisons.</p>
          </div>
          <div class="value-card">
            <div class="text-2xl">📦</div>
            <h3 class="font-semibold">Traçabilité</h3>
            <p class="text-sm text-fontColor/80">Lot par lot, on vous dit tout.</p>
          </div>
          <div class="value-card">
            <div class="text-2xl">🤝</div>
            <h3 class="font-semibold">Juste rémunération</h3>
            <p class="text-sm text-fontColor/80">Le prix sert d’abord la pérennité de l’activité.</p>
          </div>
          <div class="value-card">
            <div class="text-2xl">🌱</div>
            <h3 class="font-semibold">Sobriété</h3>
            <p class="text-sm text-fontColor/80">Matériel durable, emballages simples, circuits courts.</p>
          </div>
        </div>
      </section>

      <!-- CHIFFRES CLÉS -->
      <section class="container mx-auto px-4 py-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="stat-card">
            <div class="stat-number"><span class="counter" data-target="120">0</span>kg+</div>
            <div class="stat-label">Miel récolté</div>
          </div>
          <div class="stat-card">
            <div class="stat-number"><span class="counter" data-target="200">0</span></div>
            <div class="stat-label">Pots déja vendus</div>
          </div>
          <div class="stat-card">
            <div class="stat-number"><span class="counter" data-target="4">0</span></div>
            <div class="stat-label">Ruches en activité</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4.9★</div>
            <div class="stat-label">Satisfaction des amis/voisins</div>
          </div>
        </div>
      </section>

      <!-- TIMELINE -->
      <section class="container mx-auto px-4 pb-16">
        <h2 class="text-xl font-bold">Notre parcours</h2>
        <ol class="mt-4 space-y-3">
          <li v-for="(step, i) in timeline" :key="i" class="flex items-start gap-3">
            <div class="mt-1 h-3 w-3 rounded-full bg-jauneMiel shadow"></div>
            <div class="rounded-xl border border-jauneMiel/20 bg-componentBackground/70 p-3">
              <div class="text-sm text-fontColor/70">{{ step.date }}</div>
              <div class="font-semibold">{{ step.title }}</div>
              <p class="text-sm text-fontColor/80">{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </section>

      <!-- CTA -->
      <section class="container mx-auto px-4 pb-20 text-center">
        <h2 class="text-2xl font-bold">Envie de réserver vos pots&nbsp;?</h2>
        <p class="mx-auto mt-2 max-w-xl text-fontColor/80">Créez votre compte et passez par la boutique pour découvrir les miels disponibles.</p>
        <div class="mt-5 flex justify-center gap-3">
          <NuxtLink to="/boutique" class="inline-flex items-center rounded bg-jauneMiel px-5 py-2.5 font-semibold text-black shadow hover:brightness-95 transition">Aller à la boutique</NuxtLink>
          <NuxtLink to="/contact" class="inline-flex items-center rounded border border-jauneMiel/60 bg-componentBackground px-5 py-2.5 font-semibold text-fontColor hover:bg-jauneMiel/10 transition">Nous contacter</NuxtLink>
        </div>
      </section>

    </div>
  </main>
</template>


<script setup lang="ts">
// definePageMeta({ middleware: 'auth' }) //protection de la page

import { onMounted } from 'vue'


const timeline = [
{ date: '2023', title: 'Premières récoltes', desc: 'Lancement amateur, partage et ventes de pots entre proches.' },
{ date: '2025', title: 'Naissance de BeeShop', desc: 'Petite boutique de réservation en ligne.' },
{ date: '2026 ?', title: 'Réservations ludiques', desc: 'App simple pour réserver des pots entre amis & voisins.' },
]


onMounted(() => {
// Compteurs animés
const counters = document.querySelectorAll('.counter')
counters.forEach((el) => animateCounter(el as HTMLElement))
})


function animateCounter(el: HTMLElement) {
const target = Number(el.getAttribute('data-target') || '0')
const dur = 900
const start = performance.now()
function step(now: number) {
const p = Math.min(1, (now - start) / dur)
el.textContent = Math.floor(p * target).toString()
if (p < 1) requestAnimationFrame(step)
}
requestAnimationFrame(step)
}
</script>


<style scoped>
.value-card { @apply rounded-2xl border border-jauneMiel/20 bg-componentBackground/70 p-4 shadow; }
.stat-card { @apply rounded-2xl border border-jauneMiel/20 bg-componentBackground/70 p-5 text-center shadow; }
.stat-number { @apply text-2xl md:text-3xl font-extrabold; }
.stat-label { @apply mt-1 text-sm text-fontColor/80; }
</style>