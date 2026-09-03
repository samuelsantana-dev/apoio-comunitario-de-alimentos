<script setup lang="ts">
import { useRoute } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
const route = useRoute();
</script>
<template>
  <div class="w-full">
    <p class="mb-2 text-sm font-semibold text-terracotta-600">
      Bem-vindo de volta
    </p>
    <h2
      class="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
    >
      Entre na sua conta
    </h2>
    <p class="mt-3 text-sm leading-6 text-stone-500">
      Acesse sua conta e continue fazendo a diferença na sua comunidade.
    </p>
    <div
      v-if="route.query.registered === '1'"
      class="mt-6 rounded-xl border border-forest-100 bg-forest-50 px-4 py-3 text-sm text-forest-700"
      role="status"
    >
      Conta criada com sucesso. Agora você já pode entrar.
    </div>
    <div class="mt-7"><LoginForm /></div>
    <p class="mt-7 text-center text-sm text-stone-500">
      Ainda não tem uma conta?
      <RouterLink
        to="/cadastro"
        class="rounded font-semibold text-terracotta-700 hover:underline"
        >Cadastre-se gratuitamente</RouterLink
      >
    </p>
  </div>
</template>
