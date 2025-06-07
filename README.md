# 🚀 Template de API Fastify

Este é um template básico para uma API Fastify com TypeScript, configurado para desenvolvimento usando Docker.

## 📋 Pré-requisitos

- Node 20+

## ⚙️ Instalação e Execução

1. Clone o repositório e navegue até o diretório do projeto:

   ```bash
   git clone git@github.com:henrique013/tpl-fastify.git
   cd tpl-fastify
   ```

2. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   nano .env
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute as migrações do banco de dados:

   ```bash
   npm run migrate
   ```

5. Inicie a aplicação:

   ```bash
   npm run dev
   ```

6. Acesse a aplicação:
   - A API estará disponível em `http://localhost:${API_PORT}`
   - Você pode testar os endpoints usando a documentação abaixo

## 🌐 Endpoints

Nos endpoints abaixo, substitua a porta `3000` pela porta configurada no arquivo `.env`.

### Endpoints do Sistema

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

### Gerenciamento de Usuários

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

## 🔑 Comandos Importantes

Dentro do `package.json` você encontra os seguintes comandos:

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento
- `npm start`: Inicia a aplicação em modo de produção
  - Importante: Em produção, a aplicação espera que as variáveis de ambiente já existam no sistema operacional, portanto, não é necessário configurar o arquivo `.env`
- `npm run tag -- <patch|minor|major>`: Cria uma tag para o projeto seguindo o padrão SemVer (MAJOR.MINOR.PATCH)
  - Exemplo: `npm run tag -- patch` (para incrementar a versão de patch)
  - Exemplo: `npm run tag -- minor` (para incrementar a versão minor)
  - Exemplo: `npm run tag -- major` (para incrementar a versão major)
  - Dica: Se quiser resetar a versão para 1.0.0, você pode editar manualmente o campo "version" no package.json
- `npm run migrate:gen -- <nome>`: Gera um novo arquivo de migração do banco de dados
  - Exemplo: `npm run migrate:gen -- create-users-table`
- `npm run migrate`: Executa todas as migrações pendentes do banco de dados
- `npm postinstall`: Configura o lefthook para executar os hooks de commit e push
  - Este comando é executado automaticamente após a instalação das dependências do projeto
- `npm test`: Executa todos os testes uma vez
- `npm run test:watch`: Executa os testes em modo de observação (watch mode)
- `npm run coverage`: Executa os testes e gera um relatório de cobertura de código
- `npm run compile`: Verifica se há erros de compilação TypeScript sem gerar arquivos
- `npm run lint`: Executa o ESLint para verificar a qualidade do código
- `npm run format`: Formata o código usando o Prettier
