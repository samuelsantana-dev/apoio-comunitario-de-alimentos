<script setup lang="ts">
import Button from "../../../components/ui/BaseButton.vue";
import Input from "../../../components/ui/BaseInput.vue";
import { useSustainableDestinationView } from "./SustainableDestinationView";

const {
  destinations,
  records,
  material,
  weight,
  destination,
  feedback,
  totalWeight,
  organicWeight,
  recycledWeight,
  registerDestination,
  formatDate,
} = useSustainableDestinationView();
</script>

<template>
  <main class="min-h-screen bg-cream">
    <section class="mx-auto max-w-6xl px-5 py-8 sm:py-12">
      <p class="text-sm font-semibold text-terracotta-600">Ciclo responsável</p>
      <h1 class="mt-1 font-display text-4xl font-semibold text-ink">
        Destino sustentável
      </h1>
      <p class="mt-2 max-w-2xl text-stone-500">
        Registre alimentos impróprios para consumo e embalagens, direcionando-os
        para o melhor aproveitamento possível.
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <article class="rounded-2xl border bg-white p-5 shadow-sm">
          <p class="text-sm text-stone-500">Resíduos direcionados</p>
          <p class="mt-2 font-display text-3xl font-semibold text-forest-700">
            {{ totalWeight.toLocaleString("pt-BR") }} kg
          </p>
        </article>
        <article class="rounded-2xl border bg-white p-5 shadow-sm">
          <p class="text-sm text-stone-500">Orgânicos aproveitados</p>
          <p class="mt-2 font-display text-3xl font-semibold text-forest-700">
            {{ organicWeight.toLocaleString("pt-BR") }} kg
          </p>
        </article>
        <article class="rounded-2xl border bg-white p-5 shadow-sm">
          <p class="text-sm text-stone-500">Embalagens recicladas</p>
          <p class="mt-2 font-display text-3xl font-semibold text-forest-700">
            {{ recycledWeight.toLocaleString("pt-BR") }} kg
          </p>
        </article>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section class="rounded-3xl border bg-white p-6 shadow-sm sm:p-7">
          <h2 class="font-display text-2xl font-semibold">Registrar destino</h2>
          <p class="mt-1 text-sm text-stone-500">
            Registre somente itens que não podem mais ser destinados ao consumo
            humano.
          </p>
          <form class="mt-6 space-y-5" @submit.prevent="registerDestination">
            <label class="block text-sm font-semibold text-ink">
              Material
              <Input
                v-model="material"
                class="mt-2"
                placeholder="Ex.: frutas maduras ou embalagens plásticas"
              />
            </label>
            <label class="block text-sm font-semibold text-ink">
              Peso (kg)
              <Input
                v-model="weight"
                class="mt-2"
                inputmode="decimal"
                placeholder="Ex.: 12,5"
              />
            </label>
            <fieldset>
              <legend class="text-sm font-semibold text-ink">Destino</legend>
              <div class="mt-2 space-y-2">
                <label
                  v-for="(option, key) in destinations"
                  :key="key"
                  class="flex cursor-pointer gap-3 rounded-xl border p-3 hover:border-forest-300"
                >
                  <input
                    v-model="destination"
                    type="radio"
                    :value="key"
                    class="mt-1 accent-forest-700"
                  />
                  <span
                    ><span class="block font-semibold">{{ option.label }}</span
                    ><span class="mt-1 block text-sm text-stone-500">{{
                      option.description
                    }}</span></span
                  >
                </label>
              </div>
            </fieldset>
            <p v-if="feedback" class="text-sm font-medium text-forest-700">
              {{ feedback }}
            </p>
            <Button type="submit">Registrar destino</Button>
          </form>
        </section>

        <section class="rounded-3xl border bg-white p-6 shadow-sm sm:p-7">
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="font-display text-2xl font-semibold">
                Registros recentes
              </h2>
              <p class="mt-1 text-sm text-stone-500">
                Histórico salvo neste dispositivo.
              </p>
            </div>
            <span
              class="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700"
              >{{ records.length }} registros</span
            >
          </div>
          <div v-if="records.length" class="mt-6 divide-y">
            <article
              v-for="record in records"
              :key="record.id"
              class="flex items-center justify-between gap-4 py-4 first:pt-0"
            >
              <div>
                <p class="font-semibold text-ink">{{ record.material }}</p>
                <p class="mt-1 text-sm text-stone-500">
                  {{ destinations[record.destination].label }} ·
                  {{ formatDate(record.date) }}
                </p>
              </div>
              <span class="font-semibold text-forest-700"
                >{{ record.weight.toLocaleString("pt-BR") }} kg</span
              >
            </article>
          </div>
          <div
            v-else
            class="mt-6 rounded-2xl border border-dashed bg-forest-50 p-8 text-center"
          >
            <p class="font-semibold text-forest-700">
              Nenhum descarte registrado
            </p>
            <p class="mt-1 text-sm text-forest-700">
              Os registros aparecerão aqui e ajudarão a medir o impacto
              ambiental.
            </p>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
