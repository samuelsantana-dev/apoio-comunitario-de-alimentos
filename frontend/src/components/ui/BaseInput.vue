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
  <input
    v-bind="$attrs"
    :value="modelValue"
    :aria-invalid="invalid || undefined"
    :class="
      cn(
        'h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink shadow-xs transition placeholder:text-stone-400 hover:border-stone-300 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-100',
        invalid && 'border-red-500 focus:border-red-500 focus:ring-red-100',
        props.class,
      )
    "
    @input="
      emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
