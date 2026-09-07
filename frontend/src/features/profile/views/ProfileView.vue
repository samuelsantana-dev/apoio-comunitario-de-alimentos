<script setup lang="ts">
import { computed } from "vue";
import { useSessionStore } from "../../auth/stores/session.store";
import { userRoleLabels } from "../../auth/types/auth";
const session = useSessionStore();
const profile = computed(() => ({
  name: session.user?.name ?? "Usuário",
  email: session.user?.email ?? "",
  phone: "(11) 99999-0000",
  location: "São Paulo, SP",
  role: session.user ? userRoleLabels[session.user.role] : "",
}));
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-3xl px-5 py-4">
        <RouterLink
          to="/dashboard"
          class="text-sm font-semibold text-forest-700"
          >← Voltar ao painel</RouterLink
        >
      </div>
    </header>
    <section class="mx-auto max-w-3xl px-5 py-10">
      <p class="text-sm font-semibold text-terracotta-600">Sua conta</p>
      <h1 class="mt-1 font-display text-4xl font-semibold">Meu perfil</h1>
      <article class="mt-8 rounded-3xl border bg-white p-6 shadow-sm sm:p-9">
        <div
          class="grid size-16 place-items-center rounded-full bg-forest-50 text-2xl text-forest-700"
          aria-hidden="true"
        >
          {{ profile.name.charAt(0).toUpperCase() }}
        </div>
        <dl class="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-stone-500">Nome</dt>
            <dd class="mt-1 font-semibold">{{ profile.name }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">E-mail</dt>
            <dd class="mt-1 font-semibold">{{ profile.email }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Telefone</dt>
            <dd class="mt-1 font-semibold">{{ profile.phone }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Localização</dt>
            <dd class="mt-1 font-semibold">{{ profile.location }}</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Tipo de usuário</dt>
            <dd class="mt-1 font-semibold">{{ profile.role }}</dd>
          </div>
        </dl>
      </article>
    </section>
  </main>
</template>
