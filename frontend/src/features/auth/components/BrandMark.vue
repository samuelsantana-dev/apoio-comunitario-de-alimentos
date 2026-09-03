<template>
  <RouterLink
    to="/login"
    class="inline-flex items-center gap-3 rounded-lg"
    aria-label="Apoio Comunitário — início"
  >
    <span
      class="grid size-10 place-items-center rounded-xl bg-terracotta-600 text-white shadow-sm"
      ><svg
        viewBox="0 0 24 24"
        class="size-6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path
          d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z"
        />
        <path
          d="M9 13c1.8 0 3-1 3-3 0 2 1.2 3 3 3-1.8 0-3 1-3 3 0-2-1.2-3-3-3Z"
        /></svg
    ></span>
    <span class="text-left leading-tight"
      ><strong class="block text-sm text-ink">Apoio Comunitário</strong
      ><span class="text-xs text-stone-500">de Alimentos</span></span
    >
  </RouterLink>
</template>
