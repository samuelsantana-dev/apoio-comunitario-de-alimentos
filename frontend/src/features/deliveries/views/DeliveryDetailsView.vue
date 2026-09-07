<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const delivery = {
  id: String(route.params.id),
  food: "Bananas maduras",
  collection: "Mercado Bom Vizinho · Vila Madalena",
  destination: "Instituto Mesa Cheia · Pinheiros",
  responsible: "Ana Souza",
  status: "Em transporte",
};
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-3xl px-5 py-4">
        <RouterLink to="/entregas" class="text-sm font-semibold text-forest-700"
          >← Voltar para entregas</RouterLink
        >
      </div>
    </header>
    <section class="mx-auto max-w-3xl px-5 py-10">
      <article class="rounded-3xl border bg-white p-6 shadow-sm sm:p-9">
        <p class="text-sm font-semibold text-terracotta-600">
          Detalhes da entrega
        </p>
        <h1 class="mt-1 font-display text-4xl font-semibold">
          {{ delivery.food }}
        </h1>
        <span
          class="mt-4 inline-flex rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700"
          >{{ delivery.status }}</span
        >
        <dl class="mt-8 grid gap-6 border-y py-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-stone-500">Local de coleta</dt>
            <dd class="mt-1 font-semibold">{{ delivery.collection }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Destino</dt>
            <dd class="mt-1 font-semibold">{{ delivery.destination }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Alimentos</dt>
            <dd class="mt-1 font-semibold">{{ delivery.food }} · 12 kg</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Responsável</dt>
            <dd class="mt-1 font-semibold">{{ delivery.responsible }}</dd>
          </div>
        </dl>
      </article>
    </section>
  </main>
</template>
