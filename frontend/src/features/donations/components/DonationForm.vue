<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { ref } from "vue";
import Button from "../../../components/ui/BaseButton.vue";
import Input from "../../../components/ui/BaseInput.vue";
import Select from "../../../components/ui/BaseSelect.vue";
import { donationSchema } from "../schemas/donation.schemas";
import {
  donationCategories,
  donationConditions,
  donationUnits,
  type DonationFormData,
} from "../types/donation";
const emit = defineEmits<{ submit: [data: DonationFormData] }>();
const photoDataUrl = ref("");
const { defineField, errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(donationSchema),
  initialValues: {
    name: "",
    category: undefined,
    quantity: undefined,
    unit: undefined,
    expirationDate: "",
    condition: undefined,
    pickupLocation: "",
    deliveryAvailable: "false",
    pickupDeadline: "",
    photoUrl: "",
    description: "",
  },
});
const [name, nameAttrs] = defineField("name");
const [category, categoryAttrs] = defineField("category");
const [quantity, quantityAttrs] = defineField("quantity");
const [unit, unitAttrs] = defineField("unit");
const [expirationDate, expirationDateAttrs] = defineField("expirationDate");
const [condition, conditionAttrs] = defineField("condition");
const [pickupLocation, pickupLocationAttrs] = defineField("pickupLocation");
const [deliveryAvailable, deliveryAvailableAttrs] =
  defineField("deliveryAvailable");
const [pickupDeadline, pickupDeadlineAttrs] = defineField("pickupDeadline");
const [description, descriptionAttrs] = defineField("description");
function readPhoto(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    photoDataUrl.value = String(reader.result);
  });
  reader.readAsDataURL(file);
}
const submit = handleSubmit((values) =>
  emit("submit", {
    ...values,
    photoUrl: photoDataUrl.value || values.photoUrl,
    deliveryAvailable: values.deliveryAvailable === "true",
  } as DonationFormData),
);
</script>
<template>
  <form class="grid gap-5 sm:grid-cols-2" novalidate @submit="submit">
    <label class="grid gap-1.5 text-sm font-medium sm:col-span-2"
      >Nome do alimento<Input
        v-model="name"
        v-bind="nameAttrs"
        :invalid="!!errors.name"
        placeholder="Ex.: Bananas maduras"
      /><span v-if="errors.name" class="text-xs text-red-600">{{
        errors.name
      }}</span></label
    >
    <label class="grid gap-1.5 text-sm font-medium"
      >Categoria<Select
        v-model="category"
        v-bind="categoryAttrs"
        :invalid="!!errors.category"
        ><option value="">Selecione</option>
        <option v-for="item in donationCategories" :key="item" :value="item">
          {{ item }}
        </option></Select
      ><span v-if="errors.category" class="text-xs text-red-600">{{
        errors.category
      }}</span></label
    >
    <div class="grid grid-cols-2 gap-3">
      <label class="grid gap-1.5 text-sm font-medium"
        >Quantidade<input
          v-model.number="quantity"
          v-bind="quantityAttrs"
          :aria-invalid="!!errors.quantity"
          class="h-11 w-full rounded-xl border bg-white px-3.5 text-sm shadow-xs focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-100"
          type="number"
          min="1" /></label
      ><label class="grid gap-1.5 text-sm font-medium"
        >Unidade<Select
          v-model="unit"
          v-bind="unitAttrs"
          :invalid="!!errors.unit"
          ><option value="">Selecione</option>
          <option v-for="item in donationUnits" :key="item" :value="item">
            {{ item }}
          </option></Select
        ></label
      >
    </div>
    <label class="grid gap-1.5 text-sm font-medium"
      >Data de validade<Input
        v-model="expirationDate"
        v-bind="expirationDateAttrs"
        :invalid="!!errors.expirationDate"
        type="date"
      /><span v-if="errors.expirationDate" class="text-xs text-red-600">{{
        errors.expirationDate
      }}</span></label
    >
    <label class="grid gap-1.5 text-sm font-medium"
      >Condição<Select
        v-model="condition"
        v-bind="conditionAttrs"
        :invalid="!!errors.condition"
        ><option value="">Selecione</option>
        <option v-for="item in donationConditions" :key="item" :value="item">
          {{ item }}
        </option></Select
      ></label
    >
    <label class="grid gap-1.5 text-sm font-medium"
      >Local de retirada<Input
        v-model="pickupLocation"
        v-bind="pickupLocationAttrs"
        :invalid="!!errors.pickupLocation"
        placeholder="Bairro, cidade"
      /><span v-if="errors.pickupLocation" class="text-xs text-red-600">{{
        errors.pickupLocation
      }}</span></label
    >
    <label class="grid gap-1.5 text-sm font-medium"
      >Disponível para entrega<Select
        v-model="deliveryAvailable"
        v-bind="deliveryAvailableAttrs"
        ><option value="false">Não</option>
        <option value="true">Sim</option></Select
      ></label
    >
    <label class="grid gap-1.5 text-sm font-medium"
      >Data limite para retirada<Input
        v-model="pickupDeadline"
        v-bind="pickupDeadlineAttrs"
        :invalid="!!errors.pickupDeadline"
        type="date"
    /></label>
    <label class="grid gap-1.5 text-sm font-medium"
      >Foto<input
        class="h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-terracotta-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-terracotta-700"
        type="file"
        accept="image/*"
        @change="readPhoto"
    /></label>
    <label class="grid gap-1.5 text-sm font-medium sm:col-span-2"
      >Descrição ou observações<textarea
        v-model="description"
        v-bind="descriptionAttrs"
        rows="4"
        class="rounded-xl border px-3.5 py-3 text-sm"
        placeholder="Informações úteis para a retirada..."
      ></textarea>
    </label>
    <div class="flex justify-end gap-3 sm:col-span-2">
      <RouterLink
        to="/doacoes"
        class="inline-flex h-11 items-center px-4 text-sm font-semibold text-stone-600"
        >Cancelar</RouterLink
      ><Button type="submit" :disabled="isSubmitting">{{
        isSubmitting ? "Publicando..." : "Publicar doação"
      }}</Button>
    </div>
  </form>
</template>
