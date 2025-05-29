<!-- TODO: Update endpoints -->

# 🚀 Template de API Fastify

Este é um template básico para uma API Fastify com TypeScript, configurado para desenvolvimento usando Docker.

## 📋 Pré-requisitos

- Node 22+

## ⚙️ Instalação e Execução

1. Clone o repositório e navegue até o diretório do projeto:

   ```bash
   git clone git@github.com:henrique013/tpl-fastify.git
   cd tpl-fastify
   ```

2. Configure as variáveis de ambiente:

   ```bash
   cd dev
   cp .env.example .env
   ```

3. Execute as migrações do banco de dados:

   ```bash
   ./migrate-run.sh
   ```

4. Inicie a aplicação:

   ```bash
   cd ..
   npm install
   npm run dev
   ```

5. Acesse a aplicação:
   - A API estará disponível em `http://localhost:${API_PORT}`
   - Você pode testar os endpoints usando a documentação abaixo

## 🔑 Comandos Importantes

Dentro do diretório `dev` você encontra os seguintes scripts:

- `./tag.sh`: Cria uma tag para o projeto seguindo o padrão SemVer (MAJOR.MINOR.PATCH)
  - Exemplo: `./tag.sh patch` (para incrementar a versão de patch)
  - Exemplo: `./tag.sh minor` (para incrementar a versão minor)
  - Exemplo: `./tag.sh major` (para incrementar a versão major)
  - Dica: Se quiser resetar a versão para 1.0.0, você pode editar manualmente o campo "version" no package.json
- `./migrate-gen.sh <nome>`: Gera um novo arquivo de migração do banco de dados
  - Exemplo: `./migrate-gen.sh add-users-table`
- `./migrate-run.sh`: Executa todas as migrações pendentes do banco de dados

## 🌐 Endpoints

Nos endpoints abaixo, substitua a porta `3000` pela porta configurada no arquivo `dev/.env`.

- `GET /`: Endpoint raiz

  ```bash
  curl http://localhost:3000/
  ```

- `GET /health`: Endpoint de verificação de saúde

  ```bash
  curl http://localhost:3000/health
  curl http://localhost:3000/health?uptime=true
  ```

- `GET /users`: Lista todos os usuários

  ```bash
  curl http://localhost:3000/users
  ```

- `GET /users/:id`: Obtém um usuário específico

  ```bash
  curl http://localhost:3000/users/123
  ```

- `POST /users`: Cria um novo usuário

  ```bash
  curl -X POST http://localhost:3000/users \
    -H "Content-Type: application/json" \
    -d '{"name": "John Doe", "email": "john@example.com"}'
  ```

- `PUT /users/:id`: Atualiza um usuário existente

  ```bash
  curl -X PUT http://localhost:3000/users/123 \
    -H "Content-Type: application/json" \
    -d '{"name": "John Doe Updated", "email": "john.updated@example.com"}'
  ```

- `DELETE /users/:id`: Remove um usuário
  ```bash
  curl -X DELETE http://localhost:3000/users/123
  ```
