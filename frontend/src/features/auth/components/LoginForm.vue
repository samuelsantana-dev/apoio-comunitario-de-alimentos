<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import Button from "../../../components/ui/BaseButton.vue";
import Input from "../../../components/ui/BaseInput.vue";
import Spinner from "../../../components/ui/BaseSpinner.vue";
import { loginSchema } from "../schemas/auth.schemas";
import { useSessionStore } from "../stores/session.store";
import FormField from "./FormField.vue";
import PasswordInput from "./PasswordInput.vue";
const router = useRouter();
const session = useSessionStore();
const { defineField, errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: { email: "", password: "" },
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const submit = handleSubmit(async (values) => {
  await session.login(values);
  await router.push("/dashboard");
});
</script>
<template>
  <form class="space-y-5" novalidate @submit="submit">
    <FormField
      id="email"
      label="E-mail"
      :error="errors.email"
      v-slot="{ describedby }"
      ><Input
        id="email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        autocomplete="email"
        placeholder="voce@exemplo.com"
        :invalid="!!errors.email"
        :aria-describedby="describedby" /></FormField
    ><FormField
      id="password"
      label="Senha"
      :error="errors.password"
      v-slot="{ describedby }"
      ><PasswordInput
        id="password"
        v-model="password"
        v-bind="passwordAttrs"
        autocomplete="current-password"
        placeholder="Digite sua senha"
        :invalid="!!errors.password"
        :aria-describedby="describedby" /></FormField
    ><Button type="submit" class="w-full" :disabled="isSubmitting"
      ><Spinner v-if="isSubmitting" />{{
        isSubmitting ? "Entrando..." : "Entrar"
      }}</Button
    >
  </form>
</template>
