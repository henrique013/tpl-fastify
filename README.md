<!-- TODO: Update endpoints -->

# 🚀 Template de API Fastify

Este é um template básico para uma API Fastify com TypeScript, configurado para desenvolvimento usando Docker.

## 📋 Pré-requisitos

- Docker e Docker Compose

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
   cp .api.env.example .api.env
   ```

3. Inicie a aplicação:

   ```bash
   ./up.sh
   ```

4. Acesse a aplicação:
   - A API estará disponível em `http://localhost:${PUBLIC_PORT}`
   - Você pode testar os endpoints usando a documentação abaixo

## 🔑 Comandos Importantes

- `./up.sh`: Inicia todos os containers necessários para desenvolvimento
- `./down.sh`: Para e remove todos os containers
- `./tag.sh`: Cria uma tag para o projeto

## 🌐 Endpoints

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
