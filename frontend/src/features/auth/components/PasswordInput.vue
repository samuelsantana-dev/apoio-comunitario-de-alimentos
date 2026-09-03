<script setup lang="ts">
import { ref } from "vue";
import Input from "../../../components/ui/BaseInput.vue";
defineOptions({ inheritAttrs: false });
defineProps<{ modelValue?: string; invalid?: boolean }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const visible = ref(false);
</script>
<template>
  <div class="relative">
    <Input
      v-bind="$attrs"
      :model-value="modelValue"
      :invalid="invalid"
      :type="visible ? 'text' : 'password'"
      class="pr-12"
      @update:model-value="emit('update:modelValue', $event)"
    /><button
      type="button"
      class="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-xl text-stone-500 hover:text-stone-800"
      :aria-label="visible ? 'Ocultar senha' : 'Mostrar senha'"
      :aria-pressed="visible"
      @click="visible = !visible"
    >
      <svg
        v-if="!visible"
        viewBox="0 0 24 24"
        class="size-5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" /></svg
      ><svg
        v-else
        viewBox="0 0 24 24"
        class="size-5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path
          d="m3 3 18 18M10.6 10.7A2 2 0 0 0 13.3 13.4M9.9 5.9A10 10 0 0 1 12 5.7c6 0 9.5 6.3 9.5 6.3a17 17 0 0 1-2.4 3.2M6.2 6.3C3.8 8 2.5 12 2.5 12s3.5 6.3 9.5 6.3a9 9 0 0 0 3-.5"
        />
      </svg>
    </button>
  </div>
</template>
