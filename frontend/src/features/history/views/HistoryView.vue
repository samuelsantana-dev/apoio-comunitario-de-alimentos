<script setup lang="ts">
const history = [
  {
    label: "Doações realizadas",
    value: "8",
    description: "Compartilhadas com a comunidade",
  },
  {
    label: "Doações recebidas",
    value: "3",
    description: "Recebidas ou reservadas",
  },
  {
    label: "Entregas concluídas",
    value: "5",
    description: "Entregas realizadas com sucesso",
  },
];
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-5xl px-5 py-4">
        <RouterLink
          to="/dashboard"
          class="text-sm font-semibold text-forest-700"
          >← Voltar ao painel</RouterLink
        >
      </div>
    </header>
    <section class="mx-auto max-w-5xl px-5 py-10">
      <p class="text-sm font-semibold text-terracotta-600">Sua trajetória</p>
      <h1 class="mt-1 font-display text-4xl font-semibold">Histórico</h1>
      <p class="mt-2 text-stone-500">
        Acompanhe todas as contribuições e recebimentos da sua conta.
      </p>
      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <article
          v-for="item in history"
          :key="item.label"
          class="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <p class="font-display text-4xl font-semibold">{{ item.value }}</p>
          <h2 class="mt-3 font-semibold">{{ item.label }}</h2>
          <p class="mt-1 text-sm text-stone-500">{{ item.description }}</p>
        </article>
      </div>
    </section>
  </main>
</template>
