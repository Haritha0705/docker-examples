# Single Dockerfile Application

A containerized Node.js application demonstrating Docker fundamentals with a simple, single-container setup. This example is perfect for beginners learning Docker basics.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Dockerfile Explained](#dockerfile-explained)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Overview

This example demonstrates:

- ✅ Writing a basic Dockerfile
- ✅ Multi-stage builds for optimized images
- ✅ Building Docker images
- ✅ Running containers with port mapping
- ✅ Container lifecycle management

### Architecture

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

## Prerequisites

Before you begin, ensure you have the following installed on your system:

| Tool | Minimum Version | Installation |
|------|-----------------|--------------|
| Docker | 20.10+ | [Get Docker](https://docs.docker.com/get-docker/) |

Verify your Docker installation:

```bash
docker --version
```

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

This command:
- Reads the `Dockerfile` in the current directory
- Builds a Docker image
- Tags it as `single-docker-app`

### Step 3: Run the Container

```bash
docker run -p 3000:3000 single-docker-app
```

This command:
- Creates a new container from the image
- Maps port 3000 on your host to port 3000 in the container
- Runs the application in the foreground

### Step 4: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

## Usage

### Running in Detached Mode

Run the container in the background:

```bash
docker run -d -p 3000:3000 --name my-app single-docker-app
```

| Flag | Description |
|------|-------------|
| `-d` | Run container in background (detached mode) |
| `-p 3000:3000` | Map host port 3000 to container port 3000 |
| `--name my-app` | Assign a name to the container |

### Managing Containers

```bash
# List running containers
docker ps

# Stop the container
docker stop my-app

# Start the container again
docker start my-app

# Restart the container
docker restart my-app

# Remove the container (must be stopped first)
docker rm my-app

# Force remove a running container
docker rm -f my-app
```

### Viewing Logs

```bash
# View container logs
docker logs my-app

# Follow logs in real-time
docker logs -f my-app

# View last 50 lines
docker logs --tail 50 my-app

# View logs with timestamps
docker logs -t my-app
```

### Accessing Container Shell

```bash
# Open an interactive shell
docker exec -it my-app sh

# Run a single command
docker exec my-app ls -la
```

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

### Stage-by-Stage Breakdown

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

## Configuration

### Environment Variables

Pass environment variables to the container:

```bash
# Single variable
docker run -p 3000:3000 -e NODE_ENV=production single-docker-app

# Multiple variables
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  single-docker-app

# Using an env file
docker run -p 3000:3000 --env-file .env single-docker-app
```

### Custom Port Mapping

Map to a different host port:

```bash
# Access at http://localhost:8080
docker run -p 8080:3000 single-docker-app
```

### Volume Mounting

Mount local files or directories:

```bash
# Mount a directory
docker run -p 3000:3000 -v $(pwd)/data:/app/data single-docker-app

# Mount a single file
docker run -p 3000:3000 -v $(pwd)/config.json:/app/config.json single-docker-app
```

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error:** `bind: address already in use`

**Solution:** Use a different port or stop the process using port 3000:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
docker run -p 8080:3000 single-docker-app
```

#### Container Exits Immediately

**Solution:** Check the logs for error messages:

```bash
docker logs <container_id>
```

#### Image Build Fails

**Solution:** Rebuild without cache:

```bash
docker build --no-cache -t single-docker-app .
```

#### Cannot Access Application

**Checklist:**
1. ✅ Container is running: `docker ps`
2. ✅ Port mapping is correct: `-p 3000:3000`
3. ✅ No firewall blocking the port
4. ✅ Application is listening on `0.0.0.0`, not `127.0.0.1`

### Debugging Commands

```bash
# Inspect container details
docker inspect my-app

# View container resource usage
docker stats my-app

# Check container processes
docker top my-app
```

## Best Practices

This example demonstrates several Docker best practices:

### ✅ Multi-Stage Builds
Reduces final image size by separating build and runtime environments.

### ✅ Alpine-Based Images
Uses `node:18-alpine` for a smaller footprint (~50MB vs ~350MB for full image).

### ✅ Layer Optimization
Copies `package*.json` before source code to leverage Docker's layer caching.

### ✅ Production Dependencies Only
Uses `npm install --production` to exclude dev dependencies.

### ✅ Explicit Port Documentation
Uses `EXPOSE` to document the application port.

## Image Size Comparison

| Approach | Approximate Size |
|----------|-----------------|
| `node:18` (full) | ~350 MB |
| `node:18-alpine` | ~50 MB |
| Multi-stage with Alpine | ~40 MB |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

<p align="center">
  <strong>Next Steps:</strong> Check out the <a href="../multi-docker-compose/">Multi-Container Example</a> to learn Docker Compose!
</p>

