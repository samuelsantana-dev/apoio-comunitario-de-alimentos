<script setup lang="ts">
import { useRoute } from "vue-router";
import AppLayout from "./layouts/AppLayout.vue";
const route = useRoute();
</script>
<template>
  <AppLayout v-if="route.meta.requiresAuth"><RouterView /></AppLayout>
  <RouterView v-else />
</template>
