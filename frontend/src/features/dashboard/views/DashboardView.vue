<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "../../../components/ui/BaseButton.vue";
import BrandMark from "../../auth/components/BrandMark.vue";
import { useSessionStore } from "../../auth/stores/session.store";
import { userRoleLabels } from "../../auth/types/auth";
const router = useRouter();
const session = useSessionStore();
function logout() {
  session.logout();
  void router.push("/login");
}
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
      >
        <BrandMark /><Button variant="ghost" @click="logout">Sair</Button>
      </div>
    </header>
    <section class="mx-auto max-w-6xl px-5 py-12">
      <div class="rounded-3xl border bg-white p-7 shadow-sm sm:p-10">
        <span
          class="inline-flex rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700"
          >{{ session.user ? userRoleLabels[session.user.role] : "" }}</span
        >
        <h1 class="mt-5 font-display text-3xl font-semibold sm:text-4xl">
          Olá, {{ session.user?.name }}!
        </h1>
        <p class="mt-3 max-w-2xl leading-7 text-stone-500">
          Seu acesso foi realizado com sucesso. Este é o início do dashboard da
          plataforma.
        </p>
        <RouterLink to="/doacoes" class="mt-7 inline-flex text-sm font-semibold text-terracotta-700 hover:underline">Explorar doações de alimentos →</RouterLink>
        <div class="mt-9 grid gap-4 sm:grid-cols-3">
          <RouterLink
            v-for="item in [
              { label: 'Doações disponíveis', to: '/doacoes', subtitle: 'Encontre alimentos na sua região' },
              { label: 'Conexões realizadas', to: '/conexoes', subtitle: 'Acompanhe sua rede de apoio' },
              { label: 'Impacto na comunidade', to: '/impacto', subtitle: 'Veja a diferença que você gera' },
            ]"
            :key="item.label"
            :to="item.to"
            class="rounded-2xl border bg-stone-50 p-5 transition hover:border-terracotta-200 hover:bg-white hover:shadow-sm"
          >
            <div class="mb-5 size-9 rounded-xl bg-terracotta-100"></div>
            <p class="font-semibold">{{ item.label }}</p>
            <p class="mt-1 text-sm text-stone-500">{{ item.subtitle }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
