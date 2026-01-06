<div align="center">

# Multi-Container Application with Docker Compose

A full-stack containerized application demonstrating microservices architecture with Docker Compose. This example showcases a React frontend, Node.js backend, and MongoDB database working together in separate containers.

[![Docker](https://img.shields.io/badge/Docker-20.10+-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2.0+-2496ED?style=flat&logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](../LICENSE)

[Getting Started](#getting-started) · [Services](#services) · [Configuration](#configuration) · [Troubleshooting](#troubleshooting)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Services](#services)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This example demonstrates advanced Docker concepts through a production-ready microservices application:

| Feature | Description |
|---------|-------------|
| **Docker Compose** | Orchestrate multiple containers with a single command |
| **Service Networking** | Inter-container communication via Docker networks |
| **Volume Persistence** | Persistent data storage with Docker volumes |
| **Health Checks** | Container health monitoring and dependencies |
| **Multi-stage Builds** | Optimized production images for all services |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Docker Network                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │   Frontend  │    │   Backend   │    │      MongoDB        │  │
│  │   (React)   │───▶│  (Node.js)  │───▶│    (Database)       │  │
│  │  Port 3000  │    │  Port 2000  │    │    Port 27017       │  │
│  └─────────────┘    └─────────────┘    └─────────────────────┘  │
│       nginx              express              mongo:7            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Nginx Alpine | Production Server |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js 22 | Runtime Environment |
| Express.js | Web Framework |
| Mongoose | MongoDB ODM |

### Database

| Technology | Purpose |
|------------|---------|
| MongoDB 6 | NoSQL Database |
| Docker Volume | Data Persistence |

---

## Prerequisites

Ensure you have the following installed on your system:

| Tool | Minimum Version | Installation |
|------|-----------------|--------------|
| Docker | 20.10+ | [Get Docker](https://docs.docker.com/get-docker/) |
| Docker Compose | 2.0+ | [Get Docker Compose](https://docs.docker.com/compose/install/) |

Verify your installation:

```bash
docker --version
docker compose version
```

---

## Getting Started

### Quick Start

Clone the repository and start all services with a single command:

```bash
# Navigate to the project directory
cd multi-docker-compose

# Build and start all services
docker compose up --build
```

### Accessing the Application

Once all containers are running and healthy:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:2000 |
| MongoDB | mongodb://localhost:27017 |

---

## Services

### Frontend Service

| Aspect | Details |
|--------|---------|
| **Technology** | React 18 with Vite |
| **Server** | Nginx Alpine (production) |
| **Port** | 3000 |

**Features:**
- Multi-stage build for optimized image size
- Gzip compression enabled
- Pre-compressed static assets
- SPA routing configuration
- Aggressive caching for static assets

### Backend Service

| Aspect | Details |
|--------|---------|
| **Technology** | Node.js 22 with Express |
| **Port** | 2000 |

**Features:**
- Multi-stage build for minimal image size
- Non-root user for security
- Health check endpoint
- MongoDB connection with retry logic
- RESTful API architecture

### MongoDB Service

| Aspect | Details |
|--------|---------|
| **Image** | Official MongoDB 7 |
| **Port** | 27017 |

**Features:**
- Persistent data storage with Docker volumes
- Health check configuration
- Automatic restart policy

---

## Usage

### Starting Services

| Command | Description |
|---------|-------------|
| `docker compose up` | Start all services in foreground |
| `docker compose up -d` | Start all services in background |
| `docker compose up --build` | Build and start (after code changes) |
| `docker compose up frontend` | Start specific service |

### Stopping Services

| Command | Description |
|---------|-------------|
| `docker compose down` | Stop all services |
| `docker compose down -v` | Stop and remove volumes (deletes data) |
| `docker compose stop backend` | Stop specific service |

### Viewing Logs

| Command | Description |
|---------|-------------|
| `docker compose logs` | View all service logs |
| `docker compose logs backend` | View logs for specific service |
| `docker compose logs -f` | Follow logs in real-time |
| `docker compose logs --tail 100` | View last 100 lines |

### Service Management

| Command | Description |
|---------|-------------|
| `docker compose ps` | View running containers |
| `docker compose up -d --scale backend=3` | Scale backend instances |
| `docker inspect --format='{{.State.Health.Status}}' backend` | Check health status |

---

## Configuration

### Environment Variables

#### Backend Service

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URL` | `mongodb://mongo:27017/usersdb` | MongoDB connection string |
| `PORT` | `2000` | Backend server port |
| `NODE_ENV` | `production` | Node environment |

#### Frontend Service

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:2000` | Backend API URL |

### Creating Environment File

Create a `.env` file in the project root:

```env
# Backend Configuration
MONGODB_URL=mongodb://mongo:27017/mydb
PORT=2000
NODE_ENV=production

# Frontend Configuration
VITE_API_URL=http://localhost:2000
```

### Using Different Environments

| Environment | Command |
|-------------|---------|
| Development | `docker compose -f docker-compose.yml -f docker-compose.dev.yml up` |
| Production | `docker compose -f docker-compose.yml -f docker-compose.prod.yml up` |

---

## Development

### Hot Reloading Setup

For development with hot reloading, create a `docker-compose.override.yml`:

```yaml
services:
  backend:
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev

  frontend:
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev
```

### Running Tests

| Command | Description |
|---------|-------------|
| `docker compose exec backend npm test` | Run backend tests |
| `docker compose exec frontend npm test` | Run frontend tests |

### Accessing Container Shell

| Command | Description |
|---------|-------------|
| `docker compose exec backend sh` | Access backend container |
| `docker compose exec mongo mongosh` | Access MongoDB shell |

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Services not starting | Check status: `docker compose ps` and logs: `docker compose logs --tail 50 <service>` |
| MongoDB connection failed | Verify MongoDB health: `docker compose exec mongo mongosh --eval "db.adminCommand('ping')"` |
| Port already in use | Find process: `lsof -i :3000` or change port mapping in docker-compose.yml |
| Changes not reflected | Rebuild: `docker compose build --no-cache` |

### Cleanup Commands

| Command | Description |
|---------|-------------|
| `docker compose down -v --rmi all` | Remove containers, networks, volumes, and images |
| `docker system prune -a` | Prune unused Docker resources |

### Health Check Debugging

```bash
# View health check logs
docker inspect --format='{{json .State.Health}}' <container-name> | jq
```

---

## Best Practices

This example demonstrates several Docker best practices:

### Security

| Practice | Implementation |
|----------|----------------|
| Non-root user | Containers run as non-root user |
| Minimal images | Multi-stage builds reduce attack surface |
| No secrets in Dockerfiles | Environment variables for sensitive data |

### Performance

| Practice | Implementation |
|----------|----------------|
| Alpine-based images | Smaller image sizes |
| Layer caching | Optimized Dockerfile instruction order |
| Gzip compression | Compressed static assets |

### Reliability

| Practice | Implementation |
|----------|----------------|
| Health checks | All services have health checks |
| Restart policies | Automatic restart on failure |
| Dependency management | `depends_on` for service ordering |

### Maintainability

| Practice | Implementation |
|----------|----------------|
| Service separation | Clear microservices architecture |
| Environment configuration | Configurable via environment variables |
| Persistent volumes | Data survives container restarts |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

---

<div align="center">

**[⬆ Back to Top](#multi-container-application-with-docker-compose)**

Need Help? Open an issue in the repository for questions or support.

</div>
