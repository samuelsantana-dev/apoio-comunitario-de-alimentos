<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "../../../components/ui/BaseButton.vue";
import Input from "../../../components/ui/BaseInput.vue";
import DonationCard from "../components/DonationCard.vue";
import DonationFilters from "../components/DonationFilters.vue";
import { useDonationsQuery } from "../composables/useDonations";
import { useSessionStore } from "../../auth/stores/session.store";
import { hasPermission } from "../../auth/lib/permissions";
const search = ref("");
const filters = ref({
  category: "",
  condition: "",
  region: "",
  validity: "",
  status: "",
});
const { data: donations, isPending, isError } = useDonationsQuery();
const session = useSessionStore();
const page = computed(() => {
  switch (session.user?.role) {
    case "donor":
      return {
        eyebrow: "Suas contribuições",
        title: "Minhas doações",
        description: "Cadastre, acompanhe e gerencie suas doações.",
        action: "Gerenciar doação",
        tabs: "Disponíveis · Reservadas · Entregues · Expiradas",
      };
    case "institution":
      return {
        eyebrow: "Rede de apoio",
        title: "Doações disponíveis",
        description:
          "Solicite doações em maior quantidade e acompanhe as necessidades da sua instituição.",
        action: "Solicitar doação",
        tabs: "Minhas solicitações · Necessidades da instituição",
      };
    case "beneficiary":
      return {
        eyebrow: "Rede de apoio",
        title: "Doações disponíveis",
        description: "Encontre alimentos disponíveis perto de você.",
        action: "Solicitar doação",
        tabs: "Solicitações e recebimentos",
      };
    case "volunteer":
      return {
        eyebrow: "Logística solidária",
        title: "Entregas disponíveis",
        description: "Encontre coletas e entregas que precisam da sua ajuda.",
        action: "Aceitar entrega",
        tabs: "Origem · Destino · Quantidade · Tipo de alimento",
      };
    case "admin":
      return {
        eyebrow: "Gestão da plataforma",
        title: "Gestão de doações",
        description: "Visualize e modere todos os registros da plataforma.",
        action: "Moderar",
        tabs: "Todas · Disponíveis · Reservadas · Entregues · Expiradas",
      };
    default:
      return {
        eyebrow: "Rede de apoio",
        title: "Doações de alimentos",
        description: "Encontre alimentos disponíveis na sua comunidade.",
        action: "Ver detalhes",
        tabs: "",
      };
  }
});
const filteredDonations = computed(() =>
  (donations.value ?? []).filter((donation) => {
    const term = search.value.toLocaleLowerCase();
    const inValidity =
      !filters.value.validity ||
      (filters.value.validity === "week"
        ? new Date(donation.expirationDate) <=
          new Date(Date.now() + 7 * 86400000)
        : new Date(donation.expirationDate) <=
          new Date(Date.now() + 31 * 86400000));
    return (
      donation.name.toLocaleLowerCase().includes(term) &&
      (!filters.value.category ||
        donation.category === filters.value.category) &&
      (!filters.value.condition ||
        donation.condition === filters.value.condition) &&
      (!filters.value.region ||
        donation.pickupLocation
          .toLocaleLowerCase()
          .includes(filters.value.region.toLocaleLowerCase())) &&
      (!filters.value.status || donation.status === filters.value.status) &&
      inValidity
    );
  }),
);
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
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
    <section class="mx-auto max-w-6xl px-5 py-10">
      <div
        class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p class="text-sm font-semibold text-terracotta-600">
            {{ page.eyebrow }}
          </p>
          <h1 class="mt-1 font-display text-4xl font-semibold text-ink">
            {{ page.title }}
          </h1>
          <p class="mt-2 text-stone-500">{{ page.description }}</p>
        </div>
        <RouterLink
          v-if="hasPermission(session.user?.role, 'createDonation')"
          to="/doacoes/nova"
          ><Button>+ Nova doação</Button></RouterLink
        >
      </div>
      <p v-if="page.tabs" class="mt-7 text-sm font-semibold text-forest-700">
        {{ page.tabs }}
      </p>
      <div class="mt-5 max-w-xl">
        <Input
          v-model="search"
          type="search"
          placeholder="Buscar por nome do alimento"
          aria-label="Buscar por nome do alimento"
        />
      </div>
      <div class="mt-4"><DonationFilters v-model="filters" /></div>
      <p class="mt-6 text-sm text-stone-500">
        {{ filteredDonations.length }} doação(ões) encontrada(s)
      </p>
      <div
        v-if="isPending"
        class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="item in 3"
          :key="item"
          class="h-96 animate-pulse rounded-2xl bg-stone-200"
        ></div>
      </div>
      <p v-else-if="isError" class="mt-5 rounded-xl bg-red-50 p-4 text-red-700">
        Não foi possível carregar as doações.
      </p>
      <div
        v-else-if="filteredDonations.length"
        class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <DonationCard
          v-for="donation in filteredDonations"
          :key="donation.id"
          :donation="donation"
          :action-label="page.action"
        />
      </div>
      <div
        v-else
        class="mt-5 rounded-2xl border border-dashed bg-white p-10 text-center"
      >
        <p class="font-semibold">Nenhuma doação encontrada</p>
        <p class="mt-1 text-sm text-stone-500">
          Ajuste os filtros ou publique uma nova doação.
        </p>
      </div>
    </section>
  </main>
</template>
