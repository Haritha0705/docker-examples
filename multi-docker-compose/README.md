# Multi-Container Application with Docker Compose

A full-stack containerized application demonstrating microservices architecture with Docker Compose. This example showcases a React frontend, Node.js backend, and MongoDB database working together in separate containers.

## Table of Contents

- [Architecture Overview](#architecture-overview)
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

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Docker Network                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │   Frontend  │    │   Backend   │    │      MongoDB        │  │
│  │   (React)   │───▶│  (Node.js)  │───▶│    (Database)       │  │
│  │  Port 3000  │    │  Port 2000  │    │    Port 27017       │  │
│  └─────────────┘    └─────────────┘    └─────────────────────┘  │
│       nginx              express              mongo:6            │
└─────────────────────────────────────────────────────────────────┘
```

| Service   | Technology       | Port  | Description                    |
|-----------|------------------|-------|--------------------------------|
| Frontend  | React + Vite     | 3000  | User interface served by Nginx |
| Backend   | Node.js + Express| 2000  | REST API server                |
| MongoDB   | MongoDB 6        | 27017 | NoSQL database                 |

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker**: Version 20.10 or higher ([Installation Guide](https://docs.docker.com/get-docker/))
- **Docker Compose**: Version 2.0 or higher ([Installation Guide](https://docs.docker.com/compose/install/))

To verify your installation:

```bash
docker --version
docker compose version
```

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

| Service   | URL                          |
|-----------|------------------------------|
| Frontend  | http://localhost:3000        |
| Backend   | http://localhost:2000        |
| MongoDB   | mongodb://localhost:27017    |

## Services

### Frontend Service

- **Technology**: React 18 with Vite
- **Server**: Nginx Alpine (production)
- **Features**:
  - Multi-stage build for optimized image size
  - Gzip compression enabled
  - Pre-compressed static assets
  - SPA routing configuration
  - Aggressive caching for static assets

### Backend Service

- **Technology**: Node.js 22 with Express
- **Features**:
  - Multi-stage build for minimal image size
  - Non-root user for security
  - Health check endpoint
  - MongoDB connection with retry logic
  - RESTful API architecture

### MongoDB Service

- **Image**: Official MongoDB 6
- **Features**:
  - Persistent data storage with Docker volumes
  - Health check configuration
  - Automatic restart policy

## Usage

### Starting Services

```bash
# Start all services in foreground
docker compose up

# Start all services in background (detached mode)
docker compose up -d

# Build and start (after code changes)
docker compose up --build

# Start specific service
docker compose up frontend
```

### Stopping Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (WARNING: deletes database data)
docker compose down -v

# Stop specific service
docker compose stop backend
```

### Viewing Logs

```bash
# View all service logs
docker compose logs

# View logs for specific service
docker compose logs backend

# Follow logs in real-time
docker compose logs -f

# View last 100 lines
docker compose logs --tail 100
```

### Checking Service Health

```bash
# View running containers and their status
docker compose ps

# Check health status
docker inspect --format='{{.State.Health.Status}}' backend
```

### Scaling Services

```bash
# Scale backend to 3 instances (requires load balancer setup)
docker compose up -d --scale backend=3
```

## Configuration

### Environment Variables

#### Backend Service

| Variable      | Default                          | Description              |
|---------------|----------------------------------|--------------------------|
| `MONGODB_URL` | `mongodb://mongo:27017/usersdb` | MongoDB connection string|
| `PORT`        | `2000`                           | Backend server port      |
| `NODE_ENV`    | `production`                     | Node environment         |

#### Frontend Service

| Variable       | Default                  | Description          |
|----------------|--------------------------|----------------------|
| `VITE_API_URL` | `http://localhost:2000`  | Backend API URL      |

### Customizing Configuration

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

```bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## Development

### Hot Reloading (Development Mode)

For development with hot reloading, you can mount source code as volumes:

```yaml
# docker-compose.override.yml
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

```bash
# Run backend tests
docker compose exec backend npm test

# Run frontend tests
docker compose exec frontend npm test
```

### Accessing Container Shell

```bash
# Access backend container
docker compose exec backend sh

# Access MongoDB shell
docker compose exec mongo mongosh
```

## Troubleshooting

### Common Issues

#### Services Not Starting

```bash
# Check service status
docker compose ps

# View detailed logs
docker compose logs --tail 50 <service-name>
```

#### MongoDB Connection Failed

Ensure MongoDB is healthy before backend starts:

```bash
# Check MongoDB health
docker compose exec mongo mongosh --eval "db.adminCommand('ping')"
```

#### Port Already in Use

```bash
# Find process using the port
lsof -i :3000

# Use different ports in docker-compose.yml
ports:
  - "8080:3000"  # Map to port 8080 instead
```

#### Rebuilding After Changes

```bash
# Rebuild without cache
docker compose build --no-cache

# Rebuild specific service
docker compose build --no-cache backend
```

#### Cleaning Up

```bash
# Remove all containers, networks, and volumes
docker compose down -v --rmi all

# Prune unused Docker resources
docker system prune -a
```

### Health Check Debugging

```bash
# View health check logs
docker inspect --format='{{json .State.Health}}' <container-name> | jq
```

## Best Practices

This example demonstrates several Docker best practices:

### Security
- ✅ Non-root user in containers
- ✅ Multi-stage builds to minimize attack surface
- ✅ No secrets in Dockerfiles

### Performance
- ✅ Alpine-based images for smaller size
- ✅ Layer caching optimization
- ✅ Gzip compression for static assets

### Reliability
- ✅ Health checks for all services
- ✅ Automatic restart policies
- ✅ Dependency management with `depends_on`

### Maintainability
- ✅ Clear service separation
- ✅ Environment variable configuration
- ✅ Persistent volumes for data

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

<p align="center">
  <strong>Need Help?</strong><br>
  Open an issue in the repository for questions or support.
</p>

