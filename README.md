# Syntax Wear 👟

Syntax Wear é uma plataforma de e-commerce moderna e performática especializada em calçados, desenvolvida com as tecnologias mais recentes do ecossistema React.

## 🚀 Tecnologias

Este projeto foi construído utilizando:

- **React 19**: Biblioteca principal para construção da interface.
- **Vite**: Build tool extremamente rápida para o desenvolvimento frontend.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **TanStack Router**: Roteamento baseado em arquivos com segurança de tipos (Type-safe).
- **Tailwind CSS 4**: Framework utilitário para estilização rápida e responsiva.
- **React Hook Form & Zod**: Gerenciamento de formulários e validação de dados.
- **React Icons**: Conjunto de ícones populares para React.

## ✨ Funcionalidades

- [x] **Navegação Intuitiva**: Sistema de rotas robusto com TanStack Router.
- [x] **Carrinho de Compras**: Gerenciamento de estado global para produtos no carrinho.
- [x] **Catálogo de Produtos**: Listagem dinâmica de produtos e categorias.
- [x] **Detalhes do Produto**: Visualização detalhada de cada item.
- [x] **Autenticação**: Telas de login e registro prontas para integração.
- [x] **Responsividade**: Interface adaptável para dispositivos móveis e desktop.
- [x] **Validação de Formulários**: Feedback em tempo real para o usuário usando Zod.

## 📦 Como começar

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/syntax-wear-app.git
   ```

2. Entre no diretório do projeto:
   ```bash
   cd syntax-wear-app
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

### Build

Para gerar a versão de produção:
```bash
npm run build
```

## 📂 Estrutura de Pastas

```text
src/
├── assets/         # Imagens, fontes e ícones
├── components/     # Componentes reutilizáveis (Button, Header, etc.)
├── context/        # Contextos da aplicação (CartContext)
├── interfaces/     # Definições de tipos TypeScript
├── mocks/          # Dados fictícios para desenvolvimento
├── pages/          # Estrutura de rotas (TanStack Router)
├── styles/         # Arquivos de estilo global
└── utils/          # Funções utilitárias e validadores
```

