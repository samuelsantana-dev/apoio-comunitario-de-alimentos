<template>
  <main class="min-h-screen bg-cream">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-3xl px-5 py-4">
        <RouterLink
          to="/dashboard"
          class="text-sm font-semibold text-forest-700"
          >← Voltar ao painel</RouterLink
        >
      </div>
    </header>
    <section class="mx-auto max-w-3xl px-5 py-10">
      <p class="text-sm font-semibold text-terracotta-600">
        Dados institucionais
      </p>
      <h1 class="mt-1 font-display text-4xl font-semibold">
        Perfil da instituição
      </h1>
      <article class="mt-8 rounded-3xl border bg-white p-6 shadow-sm sm:p-9">
        <dl class="grid gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-stone-500">Nome</dt>
            <dd class="mt-1 font-semibold">Instituto Mesa Cheia</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">CNPJ</dt>
            <dd class="mt-1 font-semibold">12.345.678/0001-90</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Endereço</dt>
            <dd class="mt-1 font-semibold">
              Rua das Flores, 120 · São Paulo, SP
            </dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Responsável</dt>
            <dd class="mt-1 font-semibold">Mariana Costa</dd>
          </div>
          <div>
            <dt class="text-sm text-stone-500">Pessoas atendidas</dt>
            <dd class="mt-1 font-semibold">180 pessoas por mês</dd>
          </div>
        </dl>
      </article>
    </section>
  </main>
</template>
