<script setup lang="ts">
import RegisterForm from "../components/RegisterForm.vue";
</script>
<template>
  <div class="w-full">
    <p class="mb-2 text-sm font-semibold text-terracotta-600">
      Faça parte da rede
    </p>
    <h2
      class="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
    >
      Crie sua conta
    </h2>
    <p class="mt-3 text-sm leading-6 text-stone-500">
      Escolha como quer contribuir e comece a gerar impacto perto de você.
    </p>
    <div class="mt-7"><RegisterForm /></div>
    <p class="mt-6 text-center text-sm text-stone-500">
      Já possui uma conta?
      <RouterLink
        to="/login"
        class="rounded font-semibold text-terracotta-700 hover:underline"
        >Entrar</RouterLink
      >
    </p>
  </div>
</template>
