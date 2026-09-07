<script setup lang="ts">
import { useRouter } from "vue-router";
import DonationForm from "../components/DonationForm.vue";
import { useCreateDonationMutation } from "../composables/useDonations";
import type { DonationFormData } from "../types/donation";
const router = useRouter();
const createDonation = useCreateDonationMutation();
async function submit(data: DonationFormData) {
  await createDonation.mutateAsync(data);
  await router.push("/doacoes");
}
</script>
<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div class="mx-auto flex max-w-3xl items-center px-5 py-4">
        <RouterLink to="/doacoes" class="text-sm font-semibold text-forest-700"
          >← Voltar para doações</RouterLink
        >
      </div>
    </header>
    <section class="mx-auto max-w-3xl px-5 py-10">
      <p class="text-sm font-semibold text-terracotta-600">
        Compartilhe o que pode ajudar
      </p>
      <h1 class="mt-1 font-display text-4xl font-semibold">Nova doação</h1>
      <p class="mt-2 text-stone-500">
        Preencha os dados para que instituições e voluntários encontrem esta
        doação.
      </p>
      <div class="mt-8 rounded-2xl border bg-white p-5 shadow-sm sm:p-8">
        <DonationForm @submit="submit" />
        <p
          v-if="createDonation.isError.value"
          class="mt-4 text-sm text-red-600"
        >
          Não foi possível publicar a doação. Tente novamente.
        </p>
      </div>
    </section>
  </main>
</template>
