# Roadmap para conclusão do Syntax Wear

## Objetivo

Finalizar o Syntax Wear como um projeto de estudos apresentável em portfólio. O objetivo não é reproduzir todas as funcionalidades de um e-commerce real, mas entregar uma aplicação coerente, estável, segura nos fluxos principais e fácil de executar e avaliar.

O projeto será considerado pronto quando um recrutador puder:

1. Criar uma conta ou entrar com um usuário de demonstração.
2. Navegar pelo catálogo e consultar um produto.
3. Adicionar e remover produtos do carrinho.
4. Informar o endereço e concluir um pedido simulado.
5. Visualizar a confirmação e o histórico dos próprios pedidos.
6. Recarregar a página sem perder a sessão ou encontrar erros graves.
7. Entender rapidamente a arquitetura e executar o projeto pelo README.

## Situação atual

### Funcionalidades existentes

- Catálogo e detalhes de produtos.
- Navegação por categorias.
- Carrinho persistido no `localStorage`.
- Cadastro, login, login com Google e sessão por cookie HTTP-only.
- Busca de endereço por CEP e cálculo simulado de frete.
- Criação de pedidos com validação de estoque no backend.
- Página de confirmação após a compra.
- Limpeza do carrinho após a criação do pedido.
- Página inicial de histórico integrada à API.
- Layout responsivo para desktop e dispositivos móveis.
- API documentada com Swagger/Scalar.
- Testes de integração no backend, embora a suíte ainda precise de estabilização.

### Decisões de escopo

- O pagamento continuará sendo simulado com PIX.
- Não será necessário integrar gateway de pagamento real.
- Seleção de tamanho continuará opcional.
- Não serão implementados nota fiscal, logística real, devolução ou cálculo tributário.
- Um painel administrativo completo é desejável, mas não obrigatório para a primeira versão do portfólio.

---

## Etapa 1 — Eliminar problemas graves

Prioridade máxima. Esta etapa deve ser concluída antes de publicar o projeto.

### 1.1 Separar pedidos pessoais e administrativos

O endpoint atual `GET /orders` retorna todos os pedidos para contas `ADMIN`. Isso não combina com a tela “Meus pedidos”.

Implementar:

- `GET /orders/me` para retornar sempre os pedidos do usuário autenticado.
- Manter `GET /orders` como rota administrativa.
- Alterar o frontend para consumir `GET /orders/me`.
- Garantir que um usuário nunca consiga consultar o pedido de outra pessoa alterando a URL.

Critérios de aceite:

- Usuários comuns veem somente seus pedidos.
- Administradores também veem somente seus próprios pedidos na página “Meus pedidos”.
- A rota administrativa continua protegida por `role: ADMIN`.

### 1.2 Proteger as rotas privadas do frontend

Proteger:

- `/checkout`
- `/orders`
- `/order-success/$orderId`

Comportamento esperado:

- Aguardar a restauração da sessão antes de renderizar a página.
- Redirecionar visitantes não autenticados para `/sign-in`.
- Depois do login, retornar ao destino original quando possível.
- Não mostrar brevemente conteúdo privado durante o carregamento.

### 1.3 Corrigir autorização de pedidos no backend

- Usar exclusivamente o ID obtido do cookie/JWT ao criar pedidos.
- Nunca confiar em `userId` recebido no body.
- Permitir que o usuário consulte e cancele apenas pedidos próprios.
- Permitir alteração de status somente para administradores ou para o fluxo simulado de pagamento.
- Validar transições de status para impedir estados incoerentes.

### 1.4 Padronizar respostas de erro

O backend não deve transformar todos os erros de negócio em `500`.

Mapeamento recomendado:

- `400`: payload inválido.
- `401`: sessão ausente ou expirada.
- `403`: acesso a recurso de outro usuário.
- `404`: produto ou pedido inexistente.
- `409`: estoque insuficiente ou conflito de estado.
- `500`: falha inesperada.

No frontend, converter erros de validação em mensagens legíveis, sem exibir o objeto completo do Zod.

### 1.5 Corrigir autenticação após cadastro

- Adicionar `credentials: 'include'` à requisição de cadastro.
- Confirmar que login, cadastro e Google Login persistem após recarregar a página.
- Adicionar `isLoadingAuth` ao contexto de autenticação.

---

## Etapa 2 — Concluir a experiência de pedidos

### 2.1 Melhorar a página “Meus pedidos”

- Mostrar número, data, total, quantidade de itens e status traduzido.
- Exibir estados de carregamento, erro e lista vazia.
- Manter paginação ou botão “Carregar mais”.
- Exibir a miniatura do primeiro produto, quando disponível.
- Adicionar botão “Ver detalhes”.

### 2.2 Criar página de detalhes do pedido

Criar a rota:

```text
/orders/$orderId
```

Exibir:

- Produtos comprados.
- Quantidade e preço registrado no momento da compra.
- Endereço de entrega.
- Forma de pagamento.
- Subtotal, frete e total.
- Data e status.
- Botão de cancelamento quando o estado permitir.

### 2.3 Melhorar a confirmação da compra

- Manter o número do pedido na página de sucesso.
- Impedir que um ID de pedido de outro usuário revele informações.
- Adicionar acesso direto aos detalhes do pedido.
- Se a página for acessada sem um pedido recém-criado, apresentar uma interface segura e coerente.

### 2.4 Validar o checkout antes do envio

Usar React Hook Form e Zod para validar:

- Carrinho não vazio.
- CEP com oito dígitos.
- Rua, número, bairro e cidade obrigatórios.
- UF com duas letras.
- Usuário autenticado.

Também:

- Manter o botão bloqueado durante o envio.
- Levar o foco ao primeiro campo inválido.
- Exibir mensagens próximas aos campos.
- Não criar pedidos duplicados por clique repetido.

### 2.5 Tornar os valores consistentes

Atualmente o frete é calculado no frontend, enquanto o backend salva o total dos produtos.

Escolher uma única fonte de verdade:

- Calcular o frete no backend.
- Salvar `subtotal`, `shippingCost` e `total` no pedido.
- Mostrar no frontend os valores retornados pela API.
- Nunca aceitar preço ou total enviado pelo navegador.

---

## Etapa 3 — Estabilidade e qualidade

### 3.1 Estabilizar os testes do backend

Priorizar testes para:

- Cadastro, login, perfil e logout.
- Criação de pedido autenticado.
- Filtro dos pedidos pelo usuário.
- Bloqueio de acesso ao pedido de outro usuário.
- Produto inexistente, inativo e sem estoque.
- Cancelamento e transições de status.
- Transação de estoque.

Corrigir o setup da suíte que atualmente pode falhar durante a preparação do usuário administrador.

### 3.2 Adicionar testes essenciais no frontend

Não é necessária cobertura total. Cobrir os fluxos que um recrutador provavelmente testará:

- Restauração da sessão após recarregar.
- Validação de carrinho vazio.
- Preenchimento do endereço após buscar CEP.
- Envio do endereço correto no checkout.
- Limpeza do carrinho após sucesso.
- Renderização do histórico vazio e com pedidos.

### 3.3 Resolver lint e build

- Fazer `npm run build` passar nos dois projetos.
- Fazer o lint do frontend passar sem erros.
- Remover variáveis e imports não utilizados.
- Ajustar a configuração do ESLint para as rotas do TanStack Router, se necessário.
- Corrigir problemas de codificação de caracteres nos textos.

### 3.4 Remover fragilidades técnicas visíveis

- Substituir URLs `http://localhost:3000` por `VITE_API_URL`.
- Criar um cliente HTTP reutilizável.
- Centralizar tratamento de respostas e erros.
- Remover usos desnecessários de `any`.
- Adicionar tipos para respostas da API.
- Adicionar página 404.
- Adicionar um Error Boundary simples.
- Configurar CORS com origens explícitas em produção.

---

## Etapa 4 — Apresentação para portfólio

### 4.1 Atualizar o README

O README deve conter:

- Descrição objetiva do problema e da solução.
- Tecnologias do frontend e backend.
- Principais funcionalidades realmente implementadas.
- Capturas de tela responsivas.
- Diagrama simples da arquitetura.
- Instruções completas para execução.
- Variáveis de ambiente necessárias.
- Link do frontend publicado.
- Link da documentação da API.
- Credenciais de demonstração, sem usar dados reais.
- Decisões técnicas e limitações conhecidas.

Remover textos de template, links fictícios e funcionalidades marcadas como prontas que ainda não estejam funcionando.

### 4.2 Preparar dados de demonstração

- Criar seed previsível com categorias, produtos, usuário comum e administrador.
- Usar imagens estáveis e otimizadas.
- Garantir estoque suficiente para demonstração.
- Incluir alguns pedidos com status diferentes.
- Não publicar senhas ou segredos reais.

### 4.3 Publicar a aplicação

Sugestão de infraestrutura:

- Frontend: Vercel, Netlify ou Cloudflare Pages.
- Backend: Render, Railway, Fly.io ou serviço equivalente.
- Banco: Supabase Postgres.
- Imagens: Supabase Storage ou URLs públicas estáveis.

Checklist de deploy:

- Variáveis de ambiente configuradas.
- Cookies funcionando entre frontend e API em produção.
- `secure`, `sameSite` e domínio do cookie revisados.
- CORS restrito ao domínio do frontend.
- Migrations executadas.
- Seed de demonstração executada.
- Health check funcionando.
- Logs sem senhas, cookies ou tokens.

### 4.4 Revisão visual e responsiva

Testar manualmente:

- Celular pequeno.
- Tablet.
- Desktop.
- Menu mobile.
- Drawer do carrinho.
- Formulários com teclado.
- Textos longos e imagens ausentes.

Corrigir:

- Elementos sobrepostos.
- Botões sem feedback de carregamento.
- Imagens sem `alt`.
- Campos sem `label`.
- Contraste insuficiente.
- Navegação sem foco visível.

---

## Etapa 5 — Melhorias opcionais

Estas tarefas agregam valor, mas não devem atrasar a publicação do portfólio.

### Bom custo-benefício

- Busca e ordenação de produtos.
- Filtros por preço e categoria.
- Página de perfil do usuário.
- Cancelamento de pedido pendente.
- Newsletter funcional.
- Skeletons de carregamento.
- Toasts de sucesso e erro.
- Tema e identidade visual mais consistentes.

### Somente se houver tempo

- Painel administrativo no frontend.
- Upload de imagens.
- Cupons.
- Favoritos.
- Persistência do carrinho no backend.
- Simulação visual de pagamento PIX.
- E-mails transacionais simulados.
- Testes end-to-end completos.

### Fora do escopo atual

- Gateway de pagamento real.
- Processamento de cartão.
- Nota fiscal.
- Transportadora real.
- Devoluções e reembolsos reais.
- Marketplace com múltiplos vendedores.
- Observabilidade e infraestrutura de nível empresarial.

---

## Ordem recomendada de execução

### Marco 1 — Aplicação segura

- [x] Criar `GET /orders/me`.
- [x] Proteger rotas privadas.
- [x] Revisar autorização de pedidos.
- [ ] Corrigir status HTTP e mensagens de erro.
- [x] Garantir persistência da sessão em todos os métodos de login.

### Marco 2 — Jornada de compra completa

- [x] Validar formulário de checkout.
- [ ] Unificar cálculo de frete e total.
- [ ] Finalizar histórico de pedidos.
- [ ] Criar detalhes do pedido.
- [ ] Implementar cancelamento seguro.

### Marco 3 — Qualidade

- [ ] Estabilizar testes do backend.
- [ ] Adicionar testes essenciais do frontend.
- [ ] Zerar erros de lint e build.
- [ ] Centralizar configuração da API.
- [ ] Corrigir codificação e acessibilidade evidente.

### Marco 4 — Portfólio

- [ ] Atualizar README.
- [ ] Adicionar screenshots.
- [ ] Preparar seed e conta de demonstração.
- [ ] Publicar frontend, backend e banco.
- [ ] Executar teste manual completo em produção.

---

## Definição de pronto para publicação

O projeto estará pronto para o portfólio quando todos os itens abaixo forem verdadeiros:

- [ ] O fluxo cadastro/login → catálogo → carrinho → checkout → confirmação funciona.
- [ ] O usuário visualiza somente os próprios pedidos.
- [ ] Rotas privadas não abrem sem autenticação.
- [ ] Recarregar a página não perde a sessão.
- [ ] Não é possível criar pedido em nome de outro usuário.
- [ ] Não existem erros de console no fluxo principal.
- [ ] Build de frontend e backend passa.
- [ ] Os testes críticos passam de forma previsível.
- [ ] Não existem segredos versionados.
- [ ] O layout funciona em celular e desktop.
- [ ] O ambiente publicado possui dados de demonstração.
- [ ] O README permite que outra pessoa entenda e execute o projeto.

## Observação final

Para um projeto de portfólio, consistência vale mais do que quantidade. É melhor apresentar catálogo, autenticação, carrinho e pedidos funcionando muito bem do que adicionar pagamento real, painel administrativo e dezenas de recursos incompletos. As etapas 1 a 4 formam uma entrega forte; a etapa 5 deve ser tratada como bônus.
