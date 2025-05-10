# 🚀 Fastify API Template

This is a basic template for an Fastify API with TypeScript, configured for development using Docker.

## 📋 Prerequisites

- Docker and Docker Compose

## ⚙️ Installation and Execution

1. Clone the repository:

   ```bash
   git clone git@github.com:henrique013/tpl-fastify.git
   cd tpl-fastify
   ```

2. Navigate to the docker directory:

   ```bash
   cd dev
   ```

3. Copy the environment variables example files:

   API environment variables:

   ```bash
   cp ../.env.example ../.env
   ```

   Docker Compose environment variables:

   ```bash
   cp .env.example .env
   ```

4. Run the startup script:

   ```bash
   ./up.sh
   ```

5. The application will be available at `http://localhost:8080`

## 🔑 Important Commands

- `./up.sh`: Starts all containers needed for development
- `./down.sh`: Stops and removes all containers

## 🌐 Endpoints

- `GET /`: Root endpoint
  - Response:
    - `message`: string
- `GET /system/health`: Health check endpoint
  - Query Parameters:
    - `uptime` (optional): boolean - Include uptime in response
  - Response:
    - `message`: string
    - `timestamp`: string
    - `uptime`: number (optional)
