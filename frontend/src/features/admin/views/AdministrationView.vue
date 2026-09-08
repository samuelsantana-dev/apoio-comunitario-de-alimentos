<script setup lang="ts">
import { ref } from "vue";
const selectedArea = ref("Pendências");
const areas = [
  {
    title: "Pendências",
    count: "7",
    description: "Itens aguardando análise",
    icon: "⚑",
  },
  {
    title: "Usuários",
    count: "1.248",
    description: "Contas na plataforma",
    icon: "◉",
  },
  {
    title: "Doações",
    count: "42",
    description: "Aguardando moderação",
    icon: "□",
  },
  {
    title: "Instituições",
    count: "9",
    description: "Validações pendentes",
    icon: "⌂",
  },
];
const queue = [
  {
    type: "Instituição",
    title: "Associação Recomeçar",
    detail: "Documentação enviada há 2 horas",
    priority: "Validar cadastro",
  },
  {
    type: "Doação",
    title: "20 cestas básicas",
    detail: "Publicada por Mercado Bom Preço",
    priority: "Revisar publicação",
  },
  {
    type: "Denúncia",
    title: "Solicitação #184",
    detail: "Conteúdo reportado por um usuário",
    priority: "Prioridade alta",
  },
  {
    type: "Usuário",
    title: "Conta com dados incompletos",
    detail: "Cadastro iniciado há 7 dias",
    priority: "Notificar usuário",
  },
];
</script>

<template>
  <main class="min-h-screen bg-cream">
    <section class="mx-auto max-w-6xl px-5 py-8 sm:py-12">
      <div
        class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p class="text-sm font-semibold text-terracotta-600">
            Controle da plataforma
          </p>
          <h1 class="mt-1 font-display text-4xl font-semibold text-ink">
            Administração
          </h1>
          <p class="mt-2 max-w-2xl text-stone-500">
            Acompanhe a saúde da comunidade, valide cadastros e mantenha a
            operação segura.
          </p>
        </div>
        <RouterLink
          to="/doacoes"
          class="rounded-xl bg-terracotta-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-terracotta-700"
          >Moderar doações</RouterLink
        >
      </div>
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          v-for="area in areas"
          :key="area.title"
          :class="[
            'rounded-2xl border p-5 text-left transition',
            selectedArea === area.title
              ? 'border-terracotta-300 bg-terracotta-50 shadow-sm'
              : 'bg-white hover:border-terracotta-200',
          ]"
          @click="selectedArea = area.title"
        >
          <span class="text-lg text-terracotta-700">{{ area.icon }}</span>
          <p class="mt-4 text-2xl font-semibold">{{ area.count }}</p>
          <p class="mt-1 font-semibold">{{ area.title }}</p>
          <p class="mt-1 text-sm text-stone-500">{{ area.description }}</p>
        </button>
      </div>
      <div class="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <section class="rounded-3xl border bg-white p-6 shadow-sm sm:p-7">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-terracotta-600">
                {{ selectedArea }}
              </p>
              <h2 class="mt-1 font-display text-2xl font-semibold">
                Fila de ações
              </h2>
            </div>
            <span
              class="rounded-full bg-terracotta-50 px-3 py-1 text-xs font-semibold text-terracotta-700"
              >{{ queue.length }} itens</span
            >
          </div>
          <div class="mt-6 divide-y">
            <article
              v-for="item in queue"
              :key="item.title"
              class="flex flex-col gap-4 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span
                  class="rounded-full bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-700"
                  >{{ item.type }}</span
                >
                <h3 class="mt-3 font-semibold">{{ item.title }}</h3>
                <p class="mt-1 text-sm text-stone-500">{{ item.detail }}</p>
              </div>
              <button
                class="rounded-xl border px-3 py-2 text-sm font-semibold text-terracotta-700 transition hover:bg-terracotta-50"
              >
                {{ item.priority }}
              </button>
            </article>
          </div>
        </section>
        <aside
          class="rounded-3xl bg-forest-700 p-6 text-white shadow-sm sm:p-7"
        >
          <p class="text-sm font-semibold text-forest-100">Resumo de impacto</p>
          <h2 class="mt-2 font-display text-2xl font-semibold">Esta semana</h2>
          <dl class="mt-7 space-y-5">
            <div class="border-b border-white/15 pb-4">
              <dt class="text-sm text-forest-100">Alimentos redistribuídos</dt>
              <dd class="mt-1 text-3xl font-semibold">1.284 kg</dd>
            </div>
            <div class="border-b border-white/15 pb-4">
              <dt class="text-sm text-forest-100">Entregas concluídas</dt>
              <dd class="mt-1 text-3xl font-semibold">86</dd>
            </div>
            <div>
              <dt class="text-sm text-forest-100">Pessoas alcançadas</dt>
              <dd class="mt-1 text-3xl font-semibold">417</dd>
            </div>
          </dl>
          <RouterLink
            to="/impacto"
            class="mt-7 inline-flex text-sm font-semibold text-white underline underline-offset-4"
            >Abrir relatório de impacto →</RouterLink
          >
        </aside>
      </div>
    </section>
  </main>
</template>
