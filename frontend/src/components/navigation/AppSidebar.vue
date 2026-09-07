<script setup lang="ts">
import { computed, ref } from "vue";
import { useSessionStore } from "../../features/auth/stores/session.store";
import { userRoleLabels } from "../../features/auth/types/auth";
const session = useSessionStore();
const mobileOpen = ref(false);
const primaryItems = computed(() => {
  const role = session.user?.role;
  const items = [
    { to: "/dashboard", label: "Início", icon: "⌂" },
    {
      to: "/doacoes",
      label:
        role === "donor"
          ? "Minhas doações"
          : role === "volunteer"
            ? "Entregas disponíveis"
            : "Doações",
      icon: "□",
    },
  ];
  if (
    role === "beneficiary" ||
    role === "institution" ||
    role === "donor" ||
    role === "admin"
  )
    items.push({ to: "/solicitacoes", label: "Solicitações", icon: "↗" });
  if (role === "volunteer")
    items.push({ to: "/entregas", label: "Entregas", icon: "▣" });
  if (role === "institution")
    items.push({ to: "/instituicao/perfil", label: "Instituição", icon: "⌂" });
  if (role === "admin")
    items.push({ to: "/administracao", label: "Administração", icon: "⚙" });
  return items;
});
const secondaryItems = [
  { to: "/notificacoes", label: "Notificações", icon: "●" },
  { to: "/historico", label: "Histórico", icon: "◷" },
  { to: "/perfil", label: "Meu perfil", icon: "◉" },
];
function closeMenu() {
  mobileOpen.value = false;
}
</script>
<template>
  <header
    class="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-5 lg:hidden"
  >
    <RouterLink
      to="/dashboard"
      class="font-display text-lg font-semibold text-forest-700"
      >Apoio Comunitário</RouterLink
    ><button
      class="grid size-10 place-items-center rounded-xl border text-lg text-ink"
      aria-label="Abrir menu"
      :aria-expanded="mobileOpen"
      @click="mobileOpen = !mobileOpen"
    >
      ☰
    </button>
  </header>
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-40 bg-ink/30 lg:hidden"
    @click="closeMenu"
  ></div>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-white p-5 transition-transform lg:translate-x-0',
      mobileOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <RouterLink
      to="/dashboard"
      class="flex items-center gap-3 px-2 text-forest-700"
      @click="closeMenu"
      ><span
        class="grid size-10 place-items-center rounded-xl bg-forest-700 text-lg text-white"
        >♥</span
      ><span class="font-display text-lg font-semibold"
        >Apoio Comunitário</span
      ></RouterLink
    >
    <div class="mt-8 px-2">
      <p class="truncate font-semibold text-ink">{{ session.user?.name }}</p>
      <p class="mt-1 text-xs text-stone-500">
        {{ session.user ? userRoleLabels[session.user.role] : "" }}
      </p>
    </div>
    <nav class="mt-7 space-y-1">
      <RouterLink
        v-for="item in primaryItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-forest-50 hover:text-forest-700"
        active-class="!bg-forest-50 !text-forest-700"
        @click="closeMenu"
        ><span aria-hidden="true">{{ item.icon }}</span
        >{{ item.label }}</RouterLink
      >
    </nav>
    <nav class="mt-auto space-y-1 border-t pt-5">
      <RouterLink
        v-for="item in secondaryItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
        active-class="!bg-stone-100 !text-ink"
        @click="closeMenu"
        ><span aria-hidden="true">{{ item.icon }}</span
        >{{ item.label }}</RouterLink
      >
    </nav>
  </aside>
</template>
