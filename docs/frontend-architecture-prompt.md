# Prompt de arquitetura do frontend

```text
Você está desenvolvendo o frontend do projeto “Apoio Comunitário de Alimentos”.

Stack obrigatória:
- Vue 3 com Composition API e <script setup lang="ts">
- TypeScript
- Vite
- Vue Router
- Pinia para estado global/client-side
- TanStack Vue Query para dados remotos, cache e estados de requisição
- VeeValidate + Zod para formulários e validações
- Tailwind CSS v4 para estilos
- Vitest para testes unitários

Arquitetura por feature:

src/
  components/
    ui/                 # Componentes genéricos e reutilizáveis: BaseButton, BaseInput etc.
  layouts/              # Estruturas visuais compartilhadas entre páginas
  features/
    nome-da-feature/
      components/       # Componentes específicos da funcionalidade
      views/            # Páginas conectadas às rotas
      services/         # Comunicação com API e regras de acesso a dados
      stores/           # Estado Pinia exclusivo da feature, quando necessário
      schemas/          # Schemas Zod e testes dos schemas
      types/            # Tipos e interfaces da feature
      composables/      # Lógica reutilizável da feature, se necessária
  router/
    index.ts            # Rotas e guards globais
  lib/
    utils.ts            # Utilitários compartilhados, como cn()
  style.css             # Tokens globais, Tailwind e estilos-base
  App.vue               # Apenas o RouterView
  main.ts               # Bootstrap da aplicação e plugins

Regras de implementação:
1. Organize código por domínio/feature, nunca por tipo técnico global. Ex.: doações ficam em features/donations, instituições em features/institutions e perfil em features/profile.
2. Uma view representa uma página/rota e deve montar componentes menores. Não concentre formulário, chamadas de API e toda a interface em uma única view.
3. Componentes genéricos ficam em src/components/ui. Componentes usados somente por uma feature ficam dentro dela.
4. Use imports tipados com `import type` quando aplicável.
5. Use serviços para requisições HTTP; componentes e views não devem chamar fetch/axios diretamente.
6. Use Vue Query para consultas e mutações remotas. Pinia deve guardar apenas estado de sessão, interface ou estado cliente que precisa ser compartilhado.
7. Todo formulário deve usar VeeValidate + Zod; schemas ficam em `schemas/` e devem ter testes quando houver regras relevantes.
8. Crie tipos explícitos para payloads, entidades e respostas da API em `types/`.
9. Rotas protegidas devem usar `meta.requiresAuth`; rotas públicas exclusivas de visitantes usam `meta.guestOnly`. Preserve o guard atual de sessão.
10. Mantenha `AuthLayout` para login/cadastro. Novas áreas autenticadas devem receber layouts próprios, por exemplo `AppLayout.vue` ou `DashboardLayout.vue`.
11. Estilize exclusivamente com Tailwind e os tokens já definidos:
    - terracotta: chamadas para ação e destaque
    - forest: confiança, impacto social e estados positivos
    - cream e ink: superfícies e tipografia
    - font-display: títulos institucionais
12. Preserve responsividade, acessibilidade, estados de foco visível, labels, mensagens de erro, `aria-*`, loading, empty state e error state.
13. Para combinar classes Tailwind condicionais, use `cn()` de `src/lib/utils.ts`.
14. Todo código novo ou alterado deve ser formatado conforme a configuração do Prettier e estar sem erros no ESLint.
15. Antes de concluir, execute `npm run lint`, `npm run test` e `npm run build` dentro de `frontend`.
16. Se o arquivo .vue passar de 150 linhas, deve ser separado o arquivo .vue e arquivo .ts com a lógica de script.
17- Cada feature deve ter testes unitários para validações, serviços e lógica relevante. Componentes podem ter testes se houver lógica significativa ou interações complexas.
18- Cada feature deve ter um arquivo type.ts ou interface.ts para tipos e interfaces da feature, incluindo payloads, entidades e respostas da API. separando a logica para de cada por exemplo
  features/
  exemplo/
    types/
      entity.type.ts
      payload.type.ts
      response-api.type.ts
      service.type.ts

Fluxo para cada nova funcionalidade:
1. Definir tipos da entidade e contratos da API.
2. Criar schema de validação, caso exista formulário.
3. Criar/atualizar o service.
4. Criar composables Vue Query, se houver leitura ou mutação remota.
5. Criar store Pinia apenas se houver estado cliente compartilhado.
6. Construir componentes específicos pequenos e reutilizáveis.
7. Montar a view.
8. Adicionar rota, guard e layout adequados.
9. Criar testes para validações, serviços ou lógica relevante.
10. Formatar os arquivos alterados com Prettier e validar lint, testes e build.

Exemplo para a feature de doações:
features/donations/
  components/
    DonationCard.vue
    DonationForm.vue
    DonationFilters.vue
  views/
    DonationsListView.vue
    CreateDonationView.vue
    DonationDetailsView.vue
  services/
    donations.service.ts
  composables/
    useDonationsQuery.ts
    useCreateDonationMutation.ts
  schemas/
    donation.schemas.ts
    donation.schemas.spec.ts
  types/
    donation.ts

Ao implementar, siga os padrões visuais e de código existentes. Não introduza bibliotecas, estilos globais, abstrações ou mudanças de arquitetura sem uma necessidade clara.
```
