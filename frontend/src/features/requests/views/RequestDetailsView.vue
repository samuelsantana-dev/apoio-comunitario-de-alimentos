<script setup lang="ts">
import { useRoute } from "vue-router";
import Button from "../../../components/ui/BaseButton.vue";
import { useSessionStore } from "../../auth/stores/session.store";
import { useRequestQuery } from "../composables/useRequests";
const route = useRoute();
const session = useSessionStore();
const { data: request, isPending } = useRequestQuery(String(route.params.id));
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-3xl px-5 py-4">
        <RouterLink
          to="/solicitacoes"
          class="text-sm font-semibold text-forest-700"
          >← Voltar para solicitações</RouterLink
        >
      </div>
    </header>
    <section class="mx-auto max-w-3xl px-5 py-10">
      <p v-if="isPending">Carregando solicitação...</p>
      <article
        v-else-if="request"
        class="rounded-3xl border bg-white p-6 shadow-sm sm:p-9"
      >
        <p class="text-sm font-semibold text-terracotta-600">
          Detalhes da solicitação
        </p>
        <h1 class="mt-1 font-display text-4xl font-semibold">
          {{ request.foodName }}
        </h1>
        <dl class="mt-8 grid gap-6 border-y py-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-stone-500">Quem solicitou</dt>
            <dd class="mt-1 font-semibold">{{ request.requester }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Quantidade</dt>
            <dd class="mt-1 font-semibold">{{ request.quantity }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Status</dt>
            <dd class="mt-1 font-semibold">{{ request.status }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Solicitada em</dt>
            <dd class="mt-1 font-semibold">{{ request.createdAt }}</dd>
          </div>
        </dl>
        <div
          v-if="
            session.user?.role === 'donor' || session.user?.role === 'admin'
          "
          class="mt-6 flex gap-3"
        >
          <Button>Aprovar solicitação</Button
          ><Button variant="outline">Recusar</Button>
        </div>
      </article>
      <p v-else>Solicitação não encontrada.</p>
    </section>
  </main>
</template>
