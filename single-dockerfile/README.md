<div align="center">

# Single Dockerfile Application

A containerized Node.js application demonstrating Docker fundamentals with a simple, single-container setup. Perfect for beginners learning Docker basics.

[![Docker](https://img.shields.io/badge/Docker-20.10+-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18_Alpine-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](../LICENSE)

[Getting Started](#getting-started) · [Usage](#usage) · [Dockerfile Explained](#dockerfile-explained) · [Troubleshooting](#troubleshooting)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Dockerfile Explained](#dockerfile-explained)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This example demonstrates fundamental Docker concepts through a practical Node.js application:

| Feature | Description |
|---------|-------------|
| **Basic Dockerfile** | Learn essential Dockerfile instructions |
| **Multi-stage Builds** | Optimize image size with build stages |
| **Image Building** | Build production-ready Docker images |
| **Port Mapping** | Expose container ports to host machine |
| **Container Lifecycle** | Manage container start, stop, and removal |

---

## Architecture

```
┌────────────────────────────────────┐
│          Docker Container          │
│  ┌──────────────────────────────┐  │
│  │       Node.js Application    │  │
│  │                              │  │
│  │    Express Server (Port 3000)│  │
│  └──────────────────────────────┘  │
│                                    │
│  Base Image: node:18-alpine        │
└────────────────────────────────────┘
              │
              ▼
      Host Port: 3000
```

---

## Prerequisites

Ensure you have Docker installed on your system:

| Tool | Minimum Version | Installation |
|------|-----------------|--------------|
| Docker | 20.10+ | [Get Docker](https://docs.docker.com/get-docker/) |

Verify your installation:

```bash
docker --version
```

---

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/docker-examples.git
cd docker-examples/single-dockerfile
```

### Step 2: Build the Docker Image

```bash
docker build -t single-docker-app .
```

| Flag | Description |
|------|-------------|
| `-t single-docker-app` | Tags the image with a name |
| `.` | Uses current directory as build context |

### Step 3: Run the Container

```bash
docker run -p 3000:3000 single-docker-app
```

| Flag | Description |
|------|-------------|
| `-p 3000:3000` | Maps host port 3000 to container port 3000 |

### Step 4: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

## Usage

### Running Containers

| Command | Description |
|---------|-------------|
| `docker run -p 3000:3000 single-docker-app` | Run in foreground |
| `docker run -d -p 3000:3000 --name my-app single-docker-app` | Run in background |
| `docker run -p 8080:3000 single-docker-app` | Map to different host port |

### Managing Containers

| Command | Description |
|---------|-------------|
| `docker ps` | List running containers |
| `docker stop my-app` | Stop the container |
| `docker start my-app` | Start a stopped container |
| `docker restart my-app` | Restart the container |
| `docker rm my-app` | Remove the container |
| `docker rm -f my-app` | Force remove running container |

### Viewing Logs

| Command | Description |
|---------|-------------|
| `docker logs my-app` | View container logs |
| `docker logs -f my-app` | Follow logs in real-time |
| `docker logs --tail 50 my-app` | View last 50 lines |
| `docker logs -t my-app` | View logs with timestamps |

### Accessing Container Shell

```bash
# Open an interactive shell
docker exec -it my-app sh

# Run a single command
docker exec my-app ls -la
```

---

## Dockerfile Explained

```dockerfile
# Build stage - Install dependencies
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Runtime stage - Minimal production image
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["node", "index.js"]
```

### Stage Breakdown

| Stage | Purpose |
|-------|---------|
| **Builder** | Installs dependencies and prepares the application |
| **Runtime** | Creates a minimal production image with only necessary files |

### Key Instructions

| Instruction | Description |
|-------------|-------------|
| `FROM` | Sets the base image (Node.js on Alpine Linux) |
| `WORKDIR` | Sets the working directory inside the container |
| `COPY` | Copies files from host to container |
| `RUN` | Executes commands during build |
| `EXPOSE` | Documents which port the container listens on |
| `CMD` | Specifies the command to run when container starts |

---

## Configuration

### Environment Variables

| Method | Command |
|--------|---------|
| Single variable | `docker run -p 3000:3000 -e NODE_ENV=production single-docker-app` |
| Multiple variables | `docker run -p 3000:3000 -e NODE_ENV=production -e PORT=3000 single-docker-app` |
| Using env file | `docker run -p 3000:3000 --env-file .env single-docker-app` |

### Volume Mounting

| Use Case | Command |
|----------|---------|
| Mount directory | `docker run -p 3000:3000 -v $(pwd)/data:/app/data single-docker-app` |
| Mount single file | `docker run -p 3000:3000 -v $(pwd)/config.json:/app/config.json single-docker-app` |

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Port already in use | Use a different port: `docker run -p 8080:3000 single-docker-app` |
| Container exits immediately | Check logs: `docker logs <container_id>` |
| Image build fails | Rebuild without cache: `docker build --no-cache -t single-docker-app .` |
| Cannot access application | Verify container is running: `docker ps` |

### Finding Processes Using a Port

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Debugging Commands

| Command | Description |
|---------|-------------|
| `docker inspect my-app` | Inspect container details |
| `docker stats my-app` | View resource usage |
| `docker top my-app` | Check container processes |

---

## Best Practices

This example implements several Docker best practices:

| Practice | Implementation |
|----------|----------------|
| **Multi-Stage Builds** | Separates build and runtime environments for smaller images |
| **Alpine-Based Images** | Uses `node:18-alpine` for minimal footprint (~50MB vs ~350MB) |
| **Layer Optimization** | Copies `package*.json` before source code for better caching |
| **Production Dependencies** | Uses `npm install --production` to exclude dev dependencies |
| **Port Documentation** | Uses `EXPOSE` to document application port |

### Image Size Comparison

| Approach | Approximate Size |
|----------|------------------|
| `node:18` (full) | ~350 MB |
| `node:18-alpine` | ~50 MB |
| Multi-stage with Alpine | ~40 MB |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

---

<div align="center">

**[⬆ Back to Top](#single-dockerfile-application)**

**Next Steps:** Check out the [Multi-Container Example](../multi-docker-compose/) to learn Docker Compose!

</div>
