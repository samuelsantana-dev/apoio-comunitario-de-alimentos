<script setup lang="ts">
import BrandMark from "../features/auth/components/BrandMark.vue";
</script>
<template>
  <main
    class="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(480px,0.8fr)]"
  >
    <section
      class="relative hidden overflow-hidden bg-forest-700 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16"
    >
      <div
        class="absolute -right-28 -top-28 size-96 rounded-full border border-white/10"
      ></div>
      <div
        class="absolute -bottom-32 -left-24 size-96 rounded-full bg-terracotta-500/25 blur-3xl"
      ></div>
      <div class="relative inline-flex items-center gap-3">
        <span class="grid size-11 place-items-center rounded-xl bg-white/15"
          ><svg
            viewBox="0 0 24 24"
            class="size-6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z"
            /></svg></span
        ><span class="font-semibold">Apoio Comunitário</span>
      </div>
      <div class="relative max-w-xl">
        <span
          class="mb-5 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-forest-100"
          >Conexões que alimentam</span
        >
        <h1 class="font-display text-4xl leading-tight xl:text-5xl">
          Juntos, transformamos excedentes em esperança.
        </h1>
        <p class="mt-6 max-w-lg text-base leading-7 text-forest-100">
          Conectamos doadores, instituições e voluntários para que alimentos
          cheguem a quem mais precisa.
        </p>
      </div>
      <p class="relative text-xs text-white/55">
        Uma rede local. Um impacto que se multiplica.
      </p>
    </section>
    <section
      class="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14 xl:px-20"
    >
      <div class="lg:hidden"><BrandMark /></div>
      <div class="mx-auto flex w-full max-w-md flex-1 items-center py-10">
        <RouterView />
      </div>
      <p class="text-center text-xs text-stone-400">
        © 2026 Apoio Comunitário de Alimentos
      </p>
    </section>
  </main>
</template>
