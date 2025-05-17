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
   - A API estará disponível em `http://localhost:${API_PORT}`
   - Você pode testar os endpoints usando a documentação abaixo

## 🔑 Comandos Importantes

- `./up.sh`: Inicia todos os containers necessários para desenvolvimento
- `./down.sh`: Para e remove todos os containers
- `./tag.sh`: Cria uma tag para o projeto

## 🌐 Endpoints

- `GET /`: Endpoint raiz
  - Resposta:
    - `message`: string
- `GET /system/health`: Endpoint de verificação de saúde
  - Parâmetros de Consulta:
    - `uptime` (opcional): boolean - Inclui tempo de atividade na resposta
  - Resposta:
    - `message`: string
    - `timestamp`: string
    - `uptime`: number (opcional)
