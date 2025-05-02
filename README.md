# 🚀 Express API Template

This is a basic template for an Express API with TypeScript, configured for development using Docker.

## 📋 Prerequisites

- Docker and Docker Compose

## ⚙️ Installation and Execution

1. Clone the repository:

```bash
git clone git@github.com:henrique013/tpl-express.git
cd tpl-express
```

2. Navigate to the docker directory:

```bash
cd docker/dev
```

3. Copy the environment variables example file:

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

- `GET /`: Returns a "Hello World!" message
