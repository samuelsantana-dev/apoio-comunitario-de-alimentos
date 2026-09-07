<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import Button from "../../../components/ui/BaseButton.vue";
import Input from "../../../components/ui/BaseInput.vue";
import Select from "../../../components/ui/BaseSelect.vue";
import Spinner from "../../../components/ui/BaseSpinner.vue";
import FormField from "./FormField.vue";
import PasswordInput from "./PasswordInput.vue";
import { registerSchema } from "../schemas/auth.schemas";
import { authService } from "../services/auth.service";
const router = useRouter();
const { defineField, errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: undefined,
  },
});
const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirmation, confirmationAttrs] = defineField(
  "passwordConfirmation",
);
const [role, roleAttrs] = defineField("role");
const submit = handleSubmit(async (values) => {
  await authService.register(values);
  await router.push({ path: "/login", query: { registered: "1" } });
});
</script>
<template>
  <form class="space-y-4" novalidate @submit="submit">
    <FormField
      id="name"
      label="Nome completo"
      :error="errors.name"
      v-slot="{ describedby }"
      ><Input
        id="name"
        v-model="name"
        v-bind="nameAttrs"
        autocomplete="name"
        placeholder="Como podemos chamar você?"
        :invalid="!!errors.name"
        :aria-describedby="describedby" /></FormField
    ><FormField
      id="register-email"
      label="E-mail"
      :error="errors.email"
      v-slot="{ describedby }"
      ><Input
        id="register-email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        autocomplete="email"
        placeholder="voce@exemplo.com"
        :invalid="!!errors.email"
        :aria-describedby="describedby"
    /></FormField>
    <div class="grid gap-4 sm:grid-cols-2">
      <FormField
        id="register-password"
        label="Senha"
        :error="errors.password"
        v-slot="{ describedby }"
        ><PasswordInput
          id="register-password"
          v-model="password"
          v-bind="passwordAttrs"
          autocomplete="new-password"
          placeholder="Mínimo 8 caracteres"
          :invalid="!!errors.password"
          :aria-describedby="describedby" /></FormField
      ><FormField
        id="password-confirmation"
        label="Confirmar senha"
        :error="errors.passwordConfirmation"
        v-slot="{ describedby }"
        ><PasswordInput
          id="password-confirmation"
          v-model="passwordConfirmation"
          v-bind="confirmationAttrs"
          autocomplete="new-password"
          placeholder="Repita a senha"
          :invalid="!!errors.passwordConfirmation"
          :aria-describedby="describedby"
      /></FormField>
    </div>
    <FormField
      id="role"
      label="Quero participar como"
      :error="errors.role"
      v-slot="{ describedby }"
      ><div class="relative">
        <Select
          id="role"
          v-model="role"
          v-bind="roleAttrs"
          :invalid="!!errors.role"
          :aria-describedby="describedby"
          ><option :value="undefined" disabled>Selecione seu perfil</option>
          <option value="donor">Doador</option>
          <option value="beneficiary">Família / Beneficiário</option>
          <option value="institution">Instituição / ONG</option>
          <option value="volunteer">Voluntário</option></Select
        ><svg
          viewBox="0 0 20 20"
          class="pointer-events-none absolute right-3 top-3 size-5 text-stone-400"
          fill="currentColor"
        >
          <path d="m6 8 4 4 4-4" />
        </svg></div></FormField
    ><Button type="submit" class="w-full" :disabled="isSubmitting"
      ><Spinner v-if="isSubmitting" />{{
        isSubmitting ? "Criando conta..." : "Criar minha conta"
      }}</Button
    >
  </form>
</template>
