<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "../../../components/ui/BaseButton.vue";
import BrandMark from "../../auth/components/BrandMark.vue";
import { useSessionStore } from "../../auth/stores/session.store";
const router = useRouter();
const session = useSessionStore();
const roleLabels = {
  donor: "Doador",
  institution: "Instituição / ONG",
  volunteer: "Voluntário",
};
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
          >{{ session.user ? roleLabels[session.user.role] : "" }}</span
        >
        <h1 class="mt-5 font-display text-3xl font-semibold sm:text-4xl">
          Olá, {{ session.user?.name }}!
        </h1>
        <p class="mt-3 max-w-2xl leading-7 text-stone-500">
          Seu acesso foi realizado com sucesso. Este é o início do dashboard da
          plataforma.
        </p>
        <div class="mt-9 grid gap-4 sm:grid-cols-3">
          <div
            v-for="item in [
              'Doações disponíveis',
              'Conexões realizadas',
              'Impacto na comunidade',
            ]"
            :key="item"
            class="rounded-2xl border bg-stone-50 p-5"
          >
            <div class="mb-5 size-9 rounded-xl bg-terracotta-100"></div>
            <p class="font-semibold">{{ item }}</p>
            <p class="mt-1 text-sm text-stone-400">Em breve</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
