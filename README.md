# SyntaxWear 

Frontend da SyntaxWear, uma aplicação de e-commerce de calçados construída com React e TypeScript. A interface consome a API da plataforma para disponibilizar catálogo, autenticação, carrinho, checkout e acompanhamento de pedidos.

## Funcionalidades

- Catálogo de produtos com listagem por categoria e página de detalhes;
- carrinho de compras persistido durante a navegação;
- cadastro, login, logout e autenticação com Google;
- rotas protegidas para checkout, pedidos e confirmação da compra;
- checkout com validação de endereço, consulta de CEP e cálculo de frete;
- criação e histórico de pedidos;
- newsletter e páginas institucionais;
- layout responsivo para dispositivos móveis e desktop.

## Tecnologias

- [React 19](https://react.dev/) e [TypeScript](https://www.typescriptlang.org/);
- [Vite](https://vite.dev/) para desenvolvimento e build;
- [TanStack Router](https://tanstack.com/router) para roteamento baseado em arquivos e type-safe;
- [Tailwind CSS 4](https://tailwindcss.com/) para estilização;
- [React Hook Form](https://react-hook-form.com/) e [Zod](https://zod.dev/) para formulários e validação;
- [Vitest](https://vitest.dev/) e Testing Library para testes;
- [React OAuth Google](https://www.npmjs.com/package/@react-oauth/google) para login social.

## Pré-requisitos

- Node.js compatível com o Vite 8;
- npm;
- API da Syntax Wear em execução.

## Instalação

```bash
git clone https://github.com/andre-arcanjo/syntax-wear-app.git
cd syntax-wear-app
npm install
```

Crie o arquivo de ambiente a partir do exemplo:

```bash
cp .env.example .env
```

No PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Configure as variáveis:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=
```

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `VITE_API_URL` | Sim | URL base da API, sem barra no final. |
| `VITE_GOOGLE_CLIENT_ID` | Para login Google | Client ID OAuth 2.0 criado no Google Cloud. |

Em seguida, inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173`.

> A autenticação utiliza cookies. A API precisa permitir a origem do frontend e estar configurada para receber credenciais.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Verifica o TypeScript e gera o build de produção em `dist/`. |
| `npm run preview` | Serve localmente o build de produção. |
| `npm run lint` | Executa a análise estática com ESLint. |
| `npm test` | Executa os testes em modo interativo. |
| `npm run test:run` | Executa toda a suíte de testes uma vez. |

## Estrutura do projeto

```text
src/
├── assets/       # Fontes, imagens e ícones
├── components/   # Componentes de interface e fluxos da aplicação
├── config/       # Configuração da API
├── context/      # Estados globais de autenticação e carrinho
├── mocks/        # Dados auxiliares usados na interface
├── pages/        # Rotas baseadas em arquivos do TanStack Router
├── schemas/      # Esquemas de validação Zod
├── services/     # Comunicação com os endpoints da API
├── styles/       # Estilos globais
├── test/         # Configuração do ambiente de testes
├── types/        # Tipos e interfaces TypeScript
└── utils/        # Validadores, formatadores e helpers
```

As rotas públicas incluem a página inicial, catálogo, detalhes de produtos, páginas institucionais, login e cadastro. Checkout, histórico de pedidos e confirmação da compra exigem autenticação.

## Build e deploy

Gere a versão de produção com:

```bash
npm run build
```

O projeto inclui `vercel.json` com rewrite para `index.html`, necessário para que as rotas da SPA funcionem ao acessar uma URL diretamente na Vercel. No ambiente de hospedagem, configure também `VITE_API_URL` e, caso o login social seja utilizado, `VITE_GOOGLE_CLIENT_ID`.
