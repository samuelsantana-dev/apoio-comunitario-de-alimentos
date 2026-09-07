<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Button from "../../../components/ui/BaseButton.vue";
import { useSessionStore } from "../../auth/stores/session.store";
import { useDonationQuery } from "../composables/useDonations";
const route = useRoute();
const { data: donation, isPending } = useDonationQuery(String(route.params.id));
const session = useSessionStore();
const formatDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
    new Date(`${value}T12:00:00`),
  );
const delivery = computed(() =>
  donation.value?.deliveryAvailable
    ? "Sim, disponível para entrega"
    : "Não, retirada no local",
);
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-3xl px-5 py-4">
        <RouterLink to="/doacoes" class="text-sm font-semibold text-forest-700"
          >← Voltar para doações</RouterLink
        >
      </div>
    </header>
    <section class="mx-auto max-w-3xl px-5 py-10">
      <p v-if="isPending" class="text-stone-500">Carregando doação...</p>
      <div
        v-else-if="donation"
        class="overflow-hidden rounded-3xl border bg-white shadow-sm"
      >
        <div class="grid h-48 place-items-center bg-terracotta-50 text-7xl">
          🥕
        </div>
        <div class="p-6 sm:p-9">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="text-sm font-semibold text-terracotta-600">
                {{ donation.category }}
              </p>
              <h1 class="mt-1 font-display text-4xl font-semibold">
                {{ donation.name }}
              </h1>
            </div>
            <span
              class="rounded-full bg-forest-50 px-3 py-1 text-sm font-semibold text-forest-700"
              >{{ donation.status }}</span
            >
          </div>
          <dl class="mt-8 grid gap-6 border-y py-6 sm:grid-cols-2">
            <div>
              <dt class="text-sm text-stone-500">Doador</dt>
              <dd class="mt-1 font-semibold">
                {{ donation.donorName || "Doador da comunidade" }}
              </dd>
            </div>
            <div>
              <dt class="text-sm text-stone-500">Quantidade</dt>
              <dd class="mt-1 text-xl font-semibold">
                {{ donation.quantity }} {{ donation.unit }}
              </dd>
            </div>
            <div>
              <dt class="text-sm text-stone-500">Data de validade</dt>
              <dd class="mt-1 font-semibold">
                {{ formatDate(donation.expirationDate) }}
              </dd>
            </div>
            <div>
              <dt class="text-sm text-stone-500">Local de retirada</dt>
              <dd class="mt-1 font-semibold">{{ donation.pickupLocation }}</dd>
            </div>
            <div>
              <dt class="text-sm text-stone-500">Entrega</dt>
              <dd class="mt-1 font-semibold">{{ delivery }}</dd>
            </div>
            <div>
              <dt class="text-sm text-stone-500">Condição</dt>
              <dd class="mt-1 font-semibold">{{ donation.condition }}</dd>
            </div>
            <div>
              <dt class="text-sm text-stone-500">Retirar até</dt>
              <dd class="mt-1 font-semibold">
                {{ formatDate(donation.pickupDeadline) }}
              </dd>
            </div>
          </dl>
          <p v-if="donation.description" class="mt-6 leading-7 text-stone-600">
            {{ donation.description }}
          </p>
          <div
            v-if="
              session.user?.role === 'beneficiary' ||
              session.user?.role === 'institution'
            "
            class="mt-6"
          >
            <Button>{{
              session.user.role === "institution"
                ? "Solicitar doação"
                : "Reservar doação"
            }}</Button>
          </div>
        </div>
      </div>
      <p v-else class="rounded-xl bg-white p-6 text-stone-600">
        Doação não encontrada.
      </p>
    </section>
  </main>
</template>
