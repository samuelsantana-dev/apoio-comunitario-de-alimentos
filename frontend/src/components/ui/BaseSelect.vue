<script setup lang="ts">
import { cn } from "../../lib/utils";
defineOptions({ inheritAttrs: false });
const props = defineProps<{
  modelValue?: string;
  invalid?: boolean;
  class?: string;
}>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>
<template>
  <select
    v-bind="$attrs"
    :value="modelValue"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        'h-11 w-full appearance-none rounded-xl border bg-white px-3.5 text-sm shadow-xs focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-100',
        invalid && 'border-red-500',
        props.class,
      )
    "
    @change="
      emit('update:modelValue', ($event.target as HTMLSelectElement).value)
    "
  >
    <slot />
  </select>
</template>
