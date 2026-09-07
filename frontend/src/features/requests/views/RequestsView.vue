<script setup lang="ts">
import { computed, ref } from "vue";
import { useSessionStore } from "../../auth/stores/session.store";
import { useRequestsQuery } from "../composables/useRequests";
import { requestStatuses, type RequestStatus } from "../types/request";
const session = useSessionStore();
const selected = ref<RequestStatus | "">("");
const { data: requests, isPending } = useRequestsQuery();
const filtered = computed(() =>
  (requests.value ?? []).filter(
    (request) => !selected.value || request.status === selected.value,
  ),
);
const isDonor = computed(
  () => session.user?.role === "donor" || session.user?.role === "admin",
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
        {{ isDonor ? "Demandas recebidas" : "Acompanhamento" }}
      </p>
      <h1 class="mt-1 font-display text-4xl font-semibold">
        {{ isDonor ? "Solicitações recebidas" : "Minhas solicitações" }}
      </h1>
      <p class="mt-2 text-stone-500">
        {{
          isDonor
            ? "Avalie os pedidos de alimentos feitos à sua doação."
            : "Acompanhe cada pedido de doação e seu recebimento."
        }}
      </p>
      <div class="mt-7 flex flex-wrap gap-2">
        <button
          v-for="status in requestStatuses"
          :key="status"
          :class="[
            'rounded-full border px-3 py-1.5 text-sm font-semibold',
            selected === status
              ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-700'
              : 'bg-white text-stone-600',
          ]"
          @click="selected = selected === status ? '' : status"
        >
          {{ status }}
        </button>
      </div>
      <div v-if="isPending" class="mt-6 text-stone-500">
        Carregando solicitações...
      </div>
      <div v-else class="mt-6 grid gap-4">
        <RouterLink
          v-for="request in filtered"
          :key="request.id"
          :to="`/solicitacoes/${request.id}`"
          class="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
          ><div>
            <p class="font-semibold">{{ request.foodName }}</p>
            <p class="mt-1 text-sm text-stone-500">
              {{ request.requester }} · {{ request.quantity }}
            </p>
          </div>
          <span
            class="rounded-full bg-forest-50 px-3 py-1 text-sm font-semibold text-forest-700"
            >{{ request.status }}</span
          ></RouterLink
        >
      </div>
    </section>
  </main>
</template>
