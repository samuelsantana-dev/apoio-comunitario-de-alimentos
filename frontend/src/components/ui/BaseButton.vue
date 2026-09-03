<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../lib/utils";
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "outline" | "ghost";
    disabled?: boolean;
    class?: string;
  }>(),
  { type: "button", variant: "primary" },
);
const styles = computed(() =>
  cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60",
    props.variant === "primary" &&
      "bg-terracotta-600 text-white shadow-sm hover:bg-terracotta-700",
    props.variant === "outline" && "border bg-white text-ink hover:bg-stone-50",
    props.variant === "ghost" && "text-stone-600 hover:bg-stone-100",
    props.class,
  ),
);
</script>
<template>
  <button :type="type" :class="styles" :disabled="disabled"><slot /></button>
</template>
