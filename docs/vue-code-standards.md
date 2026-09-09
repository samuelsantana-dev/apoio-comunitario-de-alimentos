# Padrões de código Vue

## Objetivo

Manter uma aplicação Vue consistente, reutilizável e fácil de evoluir. Páginas devem compor componentes existentes; não devem recriar estruturas globais de interface.

## Layout global único

- Deve existir apenas um layout autenticado principal: `AppLayout.vue`.
- O `AppLayout` é responsável por renderizar a estrutura compartilhada da área autenticada:
  - `AppSidebar` / navegação principal;
  - cabeçalho global, quando aplicável;
  - área principal de conteúdo;
  - rodapé global, quando aplicável.
- Páginas autenticadas devem renderizar somente o conteúdo específico da rota dentro do layout. Não devem criar uma nova barra lateral, `header`, `main` global ou `footer`.
- Páginas públicas, como login e cadastro, usam somente `AuthLayout.vue`.

Estrutura esperada:

```text
App.vue
├── AuthLayout.vue       # login e cadastro
└── AppLayout.vue        # todas as rotas autenticadas
    ├── AppSidebar.vue
    ├── AppHeader.vue
    ├── RouterView        # conteúdo específico da página
    └── AppFooter.vue
```

## Reutilização obrigatória

- Não criar vários `main`, `header`, `footer`, navbars ou sidebars para cada página.
- Não duplicar marca, links de navegação, botão de menu mobile ou informações da sessão em views diferentes.
- Criar ou reutilizar componentes compartilhados em `src/components` ou `src/layouts`.
- Componentes específicos de um domínio ficam em `src/features/nome-da-feature/components`.
- Views em `src/features/*/views` devem focar em montar o conteúdo da rota e chamar componentes da feature.
- Títulos, parágrafos, subtítulos, textos de apoio, cabeçalhos de página, badges de status e outros elementos de conteúdo recorrentes devem ser componentes globais reutilizáveis.
- Não repetir classes de tipografia, espaçamento e cores diretamente em cada view quando já existir um componente global que representa esse padrão.

## Componentes de layout

Use componentes com responsabilidades claras:

```text
src/
  layouts/
    AppLayout.vue
    AuthLayout.vue
  components/
    navigation/
      AppSidebar.vue
      AppHeader.vue
    layout/
      AppFooter.vue
      PageHeader.vue
      PageTitle.vue
      PageDescription.vue
      SectionTitle.vue
      AppText.vue
    ui/
      BaseButton.vue
      BaseInput.vue
      BaseSelect.vue
```

## Regras para views

- Uma view não deve importar nem renderizar `AppSidebar`, `AppHeader` ou `AppFooter` diretamente.
- Uma view não deve declarar a marca da aplicação novamente.
- Uma view pode usar elementos semânticos internos, como `section`, `article` e `div`, para o conteúdo específico da página.
- Quando for necessário um título de página, criar/reutilizar um componente como `PageHeader.vue`, em vez de repetir a mesma estrutura visual em cada view.
- Usar `PageTitle.vue`, `PageDescription.vue`, `SectionTitle.vue` e componentes globais equivalentes para textos estruturais recorrentes.
- Usar texto HTML simples (`p`, `span`, `small`) somente para conteúdo pontual e exclusivo daquela interface. Caso o padrão se repita em duas ou mais telas, criar um componente global.
- Links como “Voltar ao painel” devem ser padronizados em um componente reutilizável, caso sejam mantidos.

## Separação de lógica e template

- Toda view ou componente de uma feature deve ter um arquivo `.vue` para o template e um arquivo `.ts` correspondente para a lógica.
- O arquivo `.vue` deve conter somente o template, os imports necessários para a renderização e a ligação com a lógica externa.
- O arquivo `.ts` deve concentrar estado reativo, `computed`, funções, chamadas de serviços, mutations, queries, regras de permissão e tipos específicos da tela.
- Não deixar regras de negócio, chamadas de API ou lógica extensa dentro de `<script setup>`.
- Para arquivos com mais de uma palavra, usar o mesmo nome-base em ambos os arquivos e manter o padrão PascalCase já usado pelas views.

Exemplo de estrutura:

```text
features/
  impact/
    views/
      ImpactView.vue
      ImpactView.ts
  donations/
    views/
      DonationsListView.vue
      DonationsListView.ts
    components/
      DonationCard.vue
      DonationCard.ts
```

Exemplo de uso:

```ts
// ImpactView.ts
import { computed } from "vue";

export function useImpactView() {
  const totalDonations = computed(() => 0);

  return { totalDonations };
}
```

```vue
<!-- ImpactView.vue -->
<script setup lang="ts">
import { useImpactView } from "./ImpactView";

const { totalDonations } = useImpactView();
</script>

<template>
  <section>
    <p>{{ totalDonations }}</p>
  </section>
</template>
```

## Tipos e persistência local

- Cada feature deve manter seus tipos em `src/features/nome-da-feature/types`.
- Use `entity.type.ts` para entidades do domínio; `payload.type.ts` para dados de formulários e mutations; `response-api.type.ts` para respostas da API; e `service.type.ts` para contratos específicos de serviços.
- Não fragmentar features pequenas sem necessidade: quando houver poucos tipos relacionados, um único arquivo de tipos com nome claro é preferível a arquivos vazios.
- Views e componentes não devem declarar tipos de domínio ou payloads internamente; devem importá-los da feature.
- Acesso a `localStorage` e `sessionStorage` deve ficar em services dedicados. Esses services devem tratar ambiente sem armazenamento disponível, dados inválidos e erros de leitura/gravação.
- Persistir datas em ISO 8601 (`new Date().toISOString()`). Formatar a data para o usuário somente na view ou em um formatador de apresentação.

## Navegação e permissões

- A navbar/side bar deve existir apenas em `AppSidebar.vue`.
- Itens do menu devem ser gerados a partir do perfil e das permissões centralizadas.
- Não espalhar verificações de perfil pela navegação de cada view.
- Guards de rota continuam centralizados em `src/router/index.ts`.

## Exemplo correto

```vue
<!-- features/donations/views/DonationsListView.vue -->
<template>
  <section class="mx-auto max-w-6xl px-5 py-10">
    <PageHeader>
      <PageTitle>Doações de alimentos</PageTitle>
      <PageDescription>Encontre alimentos na comunidade.</PageDescription>
    </PageHeader>
    <DonationFilters />
    <DonationList />
  </section>
</template>
```

## Exemplo incorreto

```vue
<!-- Não repetir a estrutura global em cada view -->
<template>
  <main>
    <header>...</header>
    <aside>...</aside>
    <nav>...</nav>
    <section>Conteúdo da página</section>
    <footer>...</footer>
  </main>
</template>
```

## Checklist antes de criar código

1. Já existe um componente de layout ou UI que atende a necessidade?
2. O componente será usado em mais de uma feature? Se sim, ele deve ser compartilhado.
3. A view está adicionando apenas conteúdo próprio da rota?
4. A navegação e as permissões estão centralizadas?
5. O código foi formatado com Prettier e validado pelo ESLint?
