<script setup lang="ts">
import { computed, ref } from "vue";
const selected = ref<"Disponíveis" | "Aceitas" | "Histórico">("Disponíveis");
const deliveries = [
  {
    id: "1",
    food: "Bananas maduras",
    origin: "Vila Madalena",
    destination: "Instituto Mesa Cheia",
    quantity: "12 kg",
    state: "Disponíveis",
  },
  {
    id: "2",
    food: "Cestas básicas",
    origin: "Centro",
    destination: "Família Oliveira",
    quantity: "3 cestas",
    state: "Aceitas",
  },
];
const visibleDeliveries = computed(() =>
  selected.value === "Histórico"
    ? []
    : deliveries.filter((delivery) => delivery.state === selected.value),
);
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div
        class="mx-auto flex max-w-5xl items-center justify-between px-5 py-4"
      >
        <RouterLink
          to="/dashboard"
          class="font-display text-xl font-semibold text-forest-700"
          >Apoio Comunitário</RouterLink
        ><RouterLink
          to="/dashboard"
          class="text-sm font-semibold text-stone-600"
          >Voltar ao painel</RouterLink
        >
      </div>
    </header>
    <section class="mx-auto max-w-5xl px-5 py-10">
      <p class="text-sm font-semibold text-terracotta-600">
        Logística solidária
      </p>
      <h1 class="mt-1 font-display text-4xl font-semibold">Entregas</h1>
      <p class="mt-2 text-stone-500">
        Aceite coletas e acompanhe todas as entregas da comunidade.
      </p>
      <div class="mt-7 flex gap-2">
        <button
          v-for="tab in ['Disponíveis', 'Aceitas', 'Histórico'] as const"
          :key="tab"
          :class="[
            'rounded-full border px-3 py-1.5 text-sm font-semibold',
            selected === tab
              ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-700'
              : 'bg-white text-stone-600',
          ]"
          @click="selected = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div v-if="visibleDeliveries.length" class="mt-6 grid gap-4">
        <RouterLink
          v-for="delivery in visibleDeliveries"
          :key="delivery.id"
          :to="`/entregas/${delivery.id}`"
          class="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          ><div class="flex flex-col justify-between gap-5 sm:flex-row">
            <div>
              <p class="text-lg font-semibold">{{ delivery.food }}</p>
              <dl class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt class="text-stone-400">Origem</dt>
                  <dd class="font-medium">{{ delivery.origin }}</dd>
                </div>
                <div>
                  <dt class="text-stone-400">Destino</dt>
                  <dd class="font-medium">{{ delivery.destination }}</dd>
                </div>
                <div>
                  <dt class="text-stone-400">Quantidade</dt>
                  <dd class="font-medium">{{ delivery.quantity }}</dd>
                </div>
              </dl>
            </div>
            <span
              v-if="selected === 'Disponíveis'"
              class="inline-flex h-11 items-center rounded-xl bg-terracotta-600 px-4 text-sm font-semibold text-white"
              >Aceitar entrega</span
            ><span v-else class="text-sm font-semibold text-forest-700"
              >Em andamento</span
            >
          </div></RouterLink
        >
      </div>
      <div
        v-else
        class="mt-6 rounded-2xl border border-dashed bg-white p-10 text-center text-stone-500"
      >
        Nenhuma entrega neste momento.
      </div>
    </section>
  </main>
</template>
