# Prompt de regras do frontend

```text
Regras obrigatórias para o frontend — Apoio Comunitário de Alimentos

1. Usar Vue 3, TypeScript, Composition API e `<script setup lang="ts">`.
2. Organizar o projeto por funcionalidades em `src/features/nome-da-feature`.
3. Cada feature pode conter `components`, `views`, `services`, `stores`, `schemas`, `types` e `composables`.
4. Componentes reutilizáveis e sem regra de domínio devem ficar em `src/components/ui`.
5. Views representam páginas; elas devem compor componentes menores e não concentrar toda a lógica.
6. Layouts compartilhados devem ficar em `src/layouts`.
7. Toda comunicação com a API deve ocorrer em `services`; nunca chamar `fetch` diretamente em views ou componentes.
8. Usar TanStack Vue Query para buscar, criar, atualizar ou excluir dados remotos.
9. Usar Pinia somente para estado global do cliente, como sessão, preferências e estados compartilhados.
10. Criar tipos TypeScript explícitos para entidades, payloads e respostas da API em `types`.
11. Usar VeeValidate + Zod em todos os formulários; schemas devem ficar em `schemas`.
12. Validar formulários antes de enviar dados e apresentar erros acessíveis junto aos campos.
13. Rotas autenticadas devem usar `meta.requiresAuth`; páginas de login/cadastro devem usar `meta.guestOnly`.
14. Manter guards de rota centralizados em `src/router/index.ts`.
15. Usar Tailwind CSS para estilização e reutilizar os tokens já definidos: `terracotta`, `forest`, `cream` e `ink`.
16. Usar `font-display` em títulos institucionais e `font-sans` no conteúdo geral.
17. Para classes condicionais, usar a função `cn()` de `src/lib/utils.ts`.
18. Todo componente deve tratar estados de carregamento, erro, vazio e sucesso quando aplicável.
19. Manter responsividade mobile-first e acessibilidade: labels, foco visível, `aria-*`, contraste e navegação por teclado.
20. Não duplicar componentes ou lógica; extrair itens reutilizáveis para componentes, composables ou serviços.
21. Não adicionar bibliotecas sem necessidade clara e sem manter consistência com a stack atual.
22. Criar testes com Vitest para schemas, serviços e lógicas importantes.
23. Todo código adicionado ou alterado deve seguir a configuração do ESLint e do Prettier do projeto.
24. Formatar os arquivos modificados com Prettier antes da entrega e corrigir todos os erros reportados pelo ESLint.
25. Antes de finalizar qualquer funcionalidade, executar `npm run lint`, `npm run test` e `npm run build`.
26. Preservar o padrão visual acolhedor, comunitário e confiável já existente na aplicação.
27. Cada feature deve concentrar seus tipos em `types/`. Usar `entity.type.ts` para entidades de domínio, `payload.type.ts` para dados enviados por formulários, `response-api.type.ts` para respostas da API e `service.type.ts` para contratos específicos de serviços. Não criar arquivos vazios: em features pequenas, agrupar os tipos em um único arquivo nomeado de forma clara.
28. Todo acesso a `localStorage` ou `sessionStorage` deve ocorrer em um serviço dedicado, nunca diretamente em views ou componentes. A leitura e a gravação devem tratar indisponibilidade do armazenamento e exceções sem interromper a interface.
29. Datas persistidas ou enviadas à API devem usar ISO 8601 (`new Date().toISOString()`). A formatação local, como `pt-BR`, deve ocorrer apenas na camada de apresentação.
```
