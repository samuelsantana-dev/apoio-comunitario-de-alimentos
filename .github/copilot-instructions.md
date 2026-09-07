# Instruções de revisão — Apoio Comunitário de Alimentos

Revise cada pull request contra os padrões deste repositório. Priorize problemas concretos, introduzidos ou agravados pela alteração. Não aprove um PR que tenha erro de compilação, regressão funcional, falha de autorização, vulnerabilidade, quebra de acessibilidade ou descumprimento relevante dos padrões abaixo.

## Fonte de verdade

- Frontend: `docs/frontend-rules-prompt.md` e `docs/vue-code-standards.md`.
- Siga a configuração existente de ESLint, Prettier, TypeScript e testes. Não proponha novas dependências sem uma necessidade clara.

## Arquitetura Vue

- Use Vue 3, TypeScript, Composition API e `<script setup lang="ts">`.
- Preserve a organização por feature em `frontend/src/features/<feature>`. Componentes genéricos ficam em `src/components/ui`; layouts, em `src/layouts`.
- Views devem compor componentes menores. Lógica de negócio, estado extenso, queries, mutations e funções devem ficar em composables ou arquivos TypeScript correspondentes, não concentrados no `.vue`.
- Não recrie layout global, marca, menu, barra lateral ou cabeçalho em views autenticadas. `AppLayout.vue` e `AppSidebar.vue` são os únicos responsáveis pela estrutura compartilhada.
- Extraia componentes, textos estruturais e lógica que se repetem em duas ou mais telas.

## Dados, segurança e permissões

- Toda comunicação com API deve estar em `services`; não aceite `fetch` diretamente em views ou componentes.
- Para dados remotos, use TanStack Vue Query. Use Pinia apenas para estado global do cliente.
- Exija tipos TypeScript explícitos para entidades, payloads e respostas da API. Evite `any`, coerções inseguras e valores sem validação.
- Rotas e permissões devem ficar centralizadas: guards em `frontend/src/router/index.ts` e permissões em `features/auth/lib/permissions.ts`. Identifique acessos indevidos entre os perfis doador, beneficiário, instituição, voluntário e administrador.
- Não exponha segredos, tokens, dados pessoais ou informações privadas em código, logs ou respostas de API.

## Interface, formulários e acessibilidade

- Use Tailwind e os tokens existentes: `terracotta`, `forest`, `cream` e `ink`; títulos usam `font-display`.
- A interface deve ser mobile-first, responsiva e acessível: labels vinculados aos campos, foco visível, contraste suficiente, semântica HTML, `aria-*` quando necessário e navegação por teclado.
- Formulários devem usar VeeValidate + Zod, exibir erros acessíveis e validar antes do envio.
- Para fluxos de dados, verifique os estados de carregamento, erro, vazio e sucesso.

## Qualidade exigida

- Cobertura com Vitest é esperada para schemas, serviços e lógica relevante.
- Todo código deve passar em `npm run lint`, `npm run test` e `npm run build` dentro de `frontend`.
- Peça alterações em comentários objetivos: explique o impacto, a condição que causa o problema e proponha uma correção. Priorize bugs, segurança, autorização, acessibilidade e manutenção; não comente apenas preferência estética.
