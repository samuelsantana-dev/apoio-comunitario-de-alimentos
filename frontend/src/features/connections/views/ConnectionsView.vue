<script setup lang="ts">
const connections = [
  {
    name: "Instituto Mesa Cheia",
    detail: "Aguardando uma nova conexão",
    status: "Em andamento",
    tone: "bg-amber-50 text-amber-700",
  },
  {
    name: "Rede Solidária Pinheiros",
    detail: "Receberá atualizações sobre suas doações",
    status: "Ativa",
    tone: "bg-forest-50 text-forest-700",
  },
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
      <p class="text-sm font-semibold text-terracotta-600">Sua rede de apoio</p>
      <h1 class="mt-1 font-display text-4xl font-semibold">
        Conexões realizadas
      </h1>
      <p class="mt-2 max-w-2xl text-stone-500">
        Acompanhe as instituições e voluntários conectados às suas doações.
      </p>
      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <article
          v-for="connection in connections"
          :key="connection.name"
          class="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3">
            <span
              class="grid size-11 place-items-center rounded-xl bg-terracotta-50 text-xl"
              aria-hidden="true"
              >🤝</span
            ><span
              :class="[
                'rounded-full px-2.5 py-1 text-xs font-semibold',
                connection.tone,
              ]"
              >{{ connection.status }}</span
            >
          </div>
          <h2 class="mt-5 text-lg font-semibold">{{ connection.name }}</h2>
          <p class="mt-1 text-sm leading-6 text-stone-500">
            {{ connection.detail }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
