# 🚀 Fastify API Template

This is a basic template for an Fastify API with TypeScript, configured for development using Docker.

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js (v22.0.0 or higher)

## ⚙️ Installation and Execution

1. Clone the repository:

```bash
git clone git@github.com:henrique013/tpl-fastify.git
cd tpl-fastify
```

2. Copy the environment variables example file:

```bash
cp .env.example .env
```

3. Navigate to the docker directory:

```bash
cd docker/dev
```

4. Run the startup script:

```bash
./up.sh
```

5. Execute the development server:

```bash
cd ../..
npm run dev
```

6. The application will be available at `http://localhost:8080`

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
