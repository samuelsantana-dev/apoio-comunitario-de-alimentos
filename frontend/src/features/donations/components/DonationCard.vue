<script setup lang="ts">
import type { Donation } from "../types/donation";
withDefaults(defineProps<{ donation: Donation; actionLabel?: string }>(), { actionLabel: "Ver detalhes" });
const statusStyles: Record<Donation["status"], string> = {
  Disponível: "bg-forest-50 text-forest-700", Reservado: "bg-amber-50 text-amber-700", Retirado: "bg-sky-50 text-sky-700", Entregue: "bg-stone-100 text-stone-600", Expirado: "bg-red-50 text-red-700", Cancelado: "bg-stone-100 text-stone-500",
};
function formatDate(date: string) { return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(`${date}T12:00:00`)); }
</script>
<template>
  <article class="overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md">
    <img v-if="donation.photoUrl" :src="donation.photoUrl" :alt="donation.name" class="h-32 w-full object-cover" /><div v-else class="flex h-32 items-center justify-center bg-terracotta-50 text-5xl" aria-hidden="true">🥕</div>
    <div class="p-5">
      <div class="flex items-start justify-between gap-3"><div><p class="text-xs font-semibold uppercase tracking-wide text-terracotta-600">{{ donation.category }}</p><h2 class="mt-1 text-lg font-semibold text-ink">{{ donation.name }}</h2></div><span :class="['shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold', statusStyles[donation.status]]">{{ donation.status }}</span></div>
      <dl class="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
        <div><dt class="text-xs text-stone-400">Quantidade</dt><dd class="mt-1 font-semibold text-ink">{{ donation.quantity }} {{ donation.unit }}</dd></div>
        <div><dt class="text-xs text-stone-400">Validade</dt><dd class="mt-1 font-medium text-ink">{{ formatDate(donation.expirationDate) }}</dd></div>
        <div class="col-span-2"><dt class="text-xs text-stone-400">Local de retirada</dt><dd class="mt-1 flex items-center gap-1.5 font-medium text-ink"><span aria-hidden="true">⌖</span>{{ donation.pickupLocation }}</dd></div>
      </dl>
      <div class="mt-5 flex items-center justify-between border-t pt-4 text-xs text-stone-500"><span>{{ donation.condition }}</span><span>{{ donation.deliveryAvailable ? "Entrega disponível" : "Retirada no local" }}</span></div>
      <RouterLink :to="`/doacoes/${donation.id}`" class="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border text-sm font-semibold text-ink transition-colors hover:bg-stone-50">{{ actionLabel }}</RouterLink>
    </div>
  </article>
</template>
