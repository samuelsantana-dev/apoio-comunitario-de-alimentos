<script setup lang="ts">
const metrics = [
  { value: "0", label: "Doações concluídas" },
  { value: "0 kg", label: "Alimentos destinados" },
  { value: "0", label: "Pessoas impactadas" },
];
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
      <p class="text-sm font-semibold text-terracotta-600">Cada gesto conta</p>
      <h1 class="mt-1 font-display text-4xl font-semibold">
        Impacto na comunidade
      </h1>
      <p class="mt-2 max-w-2xl text-stone-500">
        Veja como suas doações ajudam a reduzir o desperdício e fortalecer a
        comunidade.
      </p>
      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <article
          v-for="metric in metrics"
          :key="metric.label"
          class="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <span
            class="grid size-11 place-items-center rounded-xl bg-forest-50 text-xl"
            aria-hidden="true"
            >♥</span
          >
          <p class="mt-5 font-display text-4xl font-semibold">
            {{ metric.value }}
          </p>
          <p class="mt-2 text-sm text-stone-500">{{ metric.label }}</p>
        </article>
      </div>
      <div class="mt-6 rounded-2xl border border-forest-100 bg-forest-50 p-6">
        <h2 class="font-semibold text-forest-700">
          Seu impacto começa com a primeira doação.
        </h2>
        <p class="mt-2 text-sm leading-6 text-forest-700">
          Quando uma doação for retirada e entregue, os resultados aparecerão
          aqui.
        </p>
        <RouterLink
          to="/doacoes/nova"
          class="mt-4 inline-flex text-sm font-semibold text-terracotta-700 hover:underline"
          >Cadastrar uma doação →</RouterLink
        >
      </div>
    </section>
  </main>
</template>
