<script setup lang="ts">
import Select from "../../../components/ui/BaseSelect.vue";
import {
  donationCategories,
  donationConditions,
  donationStatuses,
} from "../types/donation";
const filters = defineModel<{
  category: string;
  condition: string;
  region: string;
  validity: string;
  status: string;
}>({ required: true });
</script>
<template>
  <div
    class="grid gap-3 rounded-2xl border bg-white p-4 sm:grid-cols-2 lg:grid-cols-5"
  >
    <Select v-model="filters.category" aria-label="Filtrar por categoria"
      ><option value="">Categoria</option>
      <option v-for="item in donationCategories" :key="item" :value="item">
        {{ item }}
      </option></Select
    >
    <Select v-model="filters.condition" aria-label="Filtrar por condição"
      ><option value="">Perecível / não perecível</option>
      <option v-for="item in donationConditions" :key="item" :value="item">
        {{ item }}
      </option></Select
    >
    <input
      v-model="filters.region"
      class="h-11 rounded-xl border px-3.5 text-sm"
      placeholder="Região"
      aria-label="Filtrar por região"
    />
    <Select v-model="filters.validity" aria-label="Filtrar por validade"
      ><option value="">Validade</option>
      <option value="week">Próximos 7 dias</option>
      <option value="month">Próximo mês</option></Select
    >
    <Select v-model="filters.status" aria-label="Filtrar por status"
      ><option value="">Status</option>
      <option v-for="item in donationStatuses" :key="item" :value="item">
        {{ item }}
      </option></Select
    >
  </div>
</template>
