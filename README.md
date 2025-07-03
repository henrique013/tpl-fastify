# 🚀 Template de API Fastify

Template bootstrap para uma API Fastify com TypeScript.

## 🌐 Acesso Online

Acesse a versão online do projeto [aqui](http://localhost:3000).

## 🔎 Sobre o Projeto

Template bootstrap para desenvolvimento de APIs RESTful utilizando Fastify e TypeScript. O projeto oferece uma estrutura inicial com gerenciamento de usuários, sistema de migrações com Drizzle ORM, testes automatizados com Vitest, versionamento semântico, suporte a Docker e integração com lefthook para garantir qualidade e padronização do código.

## ✨ Recursos e Diferenciais

Principais recursos e diferenciais do projeto:

- Fastify como framework web de alta performance
- TypeScript para tipagem estática e melhor DX
- Drizzle ORM para gerenciamento de banco de dados
- Testes automatizados com Vitest
- Versionamento semântico automatizado
- Rate limiting para proteção contra abusos

## 🛠️ Tecnologias e Bibliotecas

Principais tecnologias e bibliotecas utilizadas:

- [Fastify](https://www.fastify.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [TSX](https://tsx.is/)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Lefthook](https://github.com/evilmartians/lefthook)
- [Sentry](https://sentry.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

## 📋 Pré-requisitos

Para executar o projeto, você precisa ter instalado:

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)

## ⚙️ Instalação

Siga estes passos para configurar o ambiente:

1. Clone o repositório

   ```bash
   git clone git@github.com:henrique013/tpl-fastify.git
   ```

2. Navegue até o diretório do projeto

   ```bash
   cd tpl-fastify
   ```

3. Instale as dependências
   ```bash
   npm install
   ```

## 🔐 Configuração de Ambiente

Para que a aplicação funcione corretamente, configure as variáveis de ambiente:

```bash
cp .env.example .env
```

## ▶️ Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 🔌 Endpoints

Endpoints disponíveis na API:

- `GET /`: Endpoint raiz

  - Resposta: Lista todos os endpoints disponíveis na API

  ```json
  {
    "message": "Template API - Lista de Endpoints Disponíveis",
    "endpoints": [
      {
        "method": "GET",
        "path": "/",
        "description": "Lista todos os endpoints disponíveis na API"
      },
      {
        "method": "GET",
        "path": "/health",
        "description": "Verificação de saúde da aplicação. Parâmetro opcional: ?uptime=true"
      },
      {
        "method": "GET",
        "path": "/users",
        "description": "Lista todos os usuários cadastrados"
      },
      {
        "method": "GET",
        "path": "/users/:id",
        "description": "Obtém um usuário específico pelo ID"
      },
      {
        "method": "POST",
        "path": "/users",
        "description": "Cria um novo usuário"
      },
      {
        "method": "PUT",
        "path": "/users/:id",
        "description": "Atualiza um usuário existente"
      },
      {
        "method": "DELETE",
        "path": "/users/:id",
        "description": "Remove um usuário pelo ID"
      }
    ]
  }
  ```

- `GET /health`: Verificação de saúde da aplicação

  - Parâmetro opcional: `?uptime=true` para incluir informações de uptime
  - Resposta:

  ```json
  {
    "message": "OK",
    "timestamp": "2024-03-21T12:00:00.000Z",
    "uptime": 123
  }
  ```

- `GET /users`: Lista todos os usuários

  - Resposta:

  ```json
  [
    {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
  ```

- `GET /users/:id`: Obtém um usuário específico

  - Resposta:

  ```json
  {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

- `POST /users`: Cria um novo usuário

  - Corpo da requisição:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

  - Resposta (201 Created):

  ```json
  {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

- `PUT /users/:id`: Atualiza um usuário existente

  - Corpo da requisição:

  ```json
  {
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
  }
  ```

  - Resposta:

  ```json
  {
    "id": 123,
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
  }
  ```

- `DELETE /users/:id`: Remove um usuário
  - Resposta:
  ```json
  {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

## ⌨️ Comandos Disponíveis

Comandos principais do projeto:

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm start`: Inicia o servidor em modo de produção _(requer variáveis de ambiente configuradas no sistema operacional)_
- `npm run tag -- <patch|minor|major>`: Cria uma tag para o projeto seguindo o padrão SemVer (MAJOR.MINOR.PATCH)
  - Dica: Para resetar a versão para 1.0.0, edite manualmente o campo "version" no package.json
- `npm run migrate:gen <nome>`: Gera um novo arquivo de migração do banco de dados
  - Exemplo: `npm run migrate:gen add-users-table`
- `npm run migrate:gen:custom <nome>`: Gera um novo arquivo de migração do banco de dados com SQL customizado
  - Exemplo: `npm run migrate:gen:custom seed-users-table`
- `npm run migrate:drop`: Desfaz uma migração do banco de dados
- `npm run migrate`: Executa todas as migrações pendentes do banco de dados
- `npm run compile`: Verifica se o código compila sem erros
- `npm run lint`: Executa a verificação de linting no código
- `npm run format`: Formata o código usando o Prettier
- `npm test`: Executa todos os testes uma vez
- `npm run coverage`: Executa os testes e gera relatório de cobertura
- `npm run postinstall`: Executa scripts de pós-instalação

## 📁 Estrutura do Projeto

Principais diretórios e arquivos:

```
ddd-api/
├── src/                  # Código fonte
│   ├── domain/           # Regras de negócio e entidades
│   │   ├── entities/     # Entidades
│   │   ├── errors/       # Erros personalizados
│   │   ├── repos/        # Interfaces dos repositórios
│   │   ├── services/     # Serviços de domínio
│   │   ├── tests/        # Testes
│   │   ├── values/       # Value Objects
│   │   ├── errors.ts     # Componentes comuns entre os erros personalizados
│   │   └── values.ts     # Componentes comuns entre os value objects
│   └── infra/            # Infraestrutura
│       ├── container/    # Injeção de dependências
│       ├── orm/          # Configuração do ORM
│       ├── repos/        # Implementações dos repositórios
│       ├── scripts/      # Scripts de inicialização e configuração
│       ├── services/     # Serviços de infraestrutura
│       ├── web-server/   # Configuração do servidor web
│       ├── env.ts        # Configuração do ambiente
│       └── main.ts       # Ponto de entrada principal
└── ...                   # Arquivos de configuração
```

## 📧 Contato

Entre em contato através das redes sociais:

- LinkedIn: [Henrique Alves](https://www.linkedin.com/in/henrique-alves-a44b99135)
- GitHub: [henrique013](https://github.com/henrique013)
