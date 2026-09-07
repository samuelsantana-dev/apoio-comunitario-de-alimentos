<script setup lang="ts">
const notifications = [
  {
    title: "Nova solicitação",
    description: "Instituto Mesa Cheia solicitou 3 cestas básicas.",
    time: "Agora",
  },
  {
    title: "Doação aprovada",
    description: "Sua solicitação de bananas maduras foi aprovada.",
    time: "Há 2 horas",
  },
  {
    title: "Entrega aceita",
    description: "Ana Souza aceitou realizar a entrega da sua doação.",
    time: "Ontem",
  },
  {
    title: "Alteração de status",
    description: "A entrega foi atualizada para Em transporte.",
    time: "Ontem",
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
      <p class="text-sm font-semibold text-terracotta-600">
        Acompanhe sua rede
      </p>
      <h1 class="mt-1 font-display text-4xl font-semibold">Notificações</h1>
      <div class="mt-8 divide-y overflow-hidden rounded-2xl border bg-white">
        <article
          v-for="notification in notifications"
          :key="notification.title"
          class="flex gap-4 p-5"
        >
          <span
            class="grid size-10 shrink-0 place-items-center rounded-full bg-terracotta-50 text-terracotta-700"
            aria-hidden="true"
            >●</span
          >
          <div>
            <div class="flex gap-3">
              <h2 class="font-semibold">{{ notification.title }}</h2>
              <time class="text-sm text-stone-400">{{
                notification.time
              }}</time>
            </div>
            <p class="mt-1 text-sm leading-6 text-stone-500">
              {{ notification.description }}
            </p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
