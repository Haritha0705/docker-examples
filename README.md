# Docker Examples 🐳

<p align="center">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

<p align="center">
  A comprehensive collection of Docker examples demonstrating containerization best practices, from simple single-container applications to complex multi-service architectures.
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Examples](#examples)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Learning Path](#learning-path)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository contains practical Docker examples designed for developers who want to learn containerization from basic to advanced concepts. Each example includes detailed documentation, best practices, and production-ready configurations.

### What You'll Learn

- 🏗️ Building Docker images with single and multi-stage builds
- 🔧 Writing optimized Dockerfiles
- 🔗 Container networking and communication
- 📦 Docker Compose for multi-container applications
- 🔒 Security best practices (non-root users, minimal images)
- 💾 Data persistence with volumes
- ❤️ Health checks and container orchestration

## Examples

### 1. Single Dockerfile Application

| Aspect | Details |
|--------|---------|
| **Folder** | [`single-dockerfile/`](./single-dockerfile/) |
| **Description** | Simple Node.js application running in a single container |
| **Concepts** | Basic Dockerfile, multi-stage builds, port mapping |
| **Difficulty** | ⭐ Beginner |

```bash
cd single-dockerfile
docker build -t single-docker-app .
docker run -p 3000:3000 single-docker-app
```

[📖 View Full Documentation](./single-dockerfile/README.md)

---

### 2. Multi-Container Application with Docker Compose

| Aspect | Details |
|--------|---------|
| **Folder** | [`multi-docker-compose/`](./multi-docker-compose/) |
| **Description** | Full-stack application with React frontend, Node.js backend, and MongoDB |
| **Concepts** | Docker Compose, service orchestration, networking, volumes, health checks |
| **Difficulty** | ⭐⭐⭐ Intermediate |

```bash
cd multi-docker-compose
docker compose up --build
```

**Architecture:**
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   MongoDB   │
│   (React)   │     │  (Node.js)  │     │  (Database) │
│  Port 3000  │     │  Port 2000  │     │ Port 27017  │
└─────────────┘     └─────────────┘     └─────────────┘
```

[📖 View Full Documentation](./multi-docker-compose/README.md)

---

## Prerequisites

Before getting started, ensure you have the following installed:

| Tool | Minimum Version | Installation |
|------|-----------------|--------------|
| Docker | 20.10+ | [Get Docker](https://docs.docker.com/get-docker/) |
| Docker Compose | 2.0+ | [Get Docker Compose](https://docs.docker.com/compose/install/) |
| Git | 2.30+ | [Get Git](https://git-scm.com/downloads) |

Verify your installation:

```bash
docker --version
docker compose version
git --version
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/docker-examples.git

# Navigate to the project
cd docker-examples

# Choose an example and follow its README
cd single-dockerfile    # or multi-docker-compose
```

## Project Structure

```
docker-examples/
├── README.md                    # This file
├── LICENSE                      # MIT License
│
├── single-dockerfile/           # Single container example
│   ├── Dockerfile              # Multi-stage Dockerfile
│   ├── README.md               # Detailed documentation
│   ├── index.js                # Node.js application
│   └── package.json            # Dependencies
│
└── multi-docker-compose/        # Multi-container example
    ├── docker-compose.yml      # Compose configuration
    ├── README.md               # Detailed documentation
    │
    ├── backend/                # Node.js API service
    │   ├── Dockerfile          # Multi-stage Dockerfile
    │   ├── index.js            # Express server
    │   ├── User.js             # MongoDB model
    │   └── package.json        # Dependencies
    │
    └── frontend/               # React application
        ├── Dockerfile          # Multi-stage Dockerfile with Nginx
        ├── src/                # React source code
        ├── index.html          # Entry HTML
        └── package.json        # Dependencies
```

## Learning Path

Follow this recommended learning path:

```
Step 1                          Step 2
┌─────────────────────┐        ┌─────────────────────────────┐
│  single-dockerfile  │  ───▶  │   multi-docker-compose      │
│                     │        │                             │
│  • Basic Dockerfile │        │  • Docker Compose           │
│  • Build & Run      │        │  • Multi-service apps       │
│  • Port Mapping     │        │  • Networking & Volumes     │
│  • Multi-stage      │        │  • Health Checks            │
└─────────────────────┘        └─────────────────────────────┘
```

### Key Concepts by Example

| Concept | Single Dockerfile | Multi Docker Compose |
|---------|:-----------------:|:--------------------:|
| Basic Dockerfile | ✅ | ✅ |
| Multi-stage Builds | ✅ | ✅ |
| Port Mapping | ✅ | ✅ |
| Docker Compose | ❌ | ✅ |
| Service Networking | ❌ | ✅ |
| Volume Persistence | ❌ | ✅ |
| Health Checks | ❌ | ✅ |
| Dependencies | ❌ | ✅ |

## Docker Cheat Sheet

### Essential Commands

```bash
# Build an image
docker build -t <image-name> .

# Run a container
docker run -p <host-port>:<container-port> <image-name>

# Run in background
docker run -d -p <host-port>:<container-port> --name <container-name> <image-name>

# List running containers
docker ps

# Stop a container
docker stop <container-name>

# View logs
docker logs <container-name>

# Remove a container
docker rm <container-name>

# Remove an image
docker rmi <image-name>
```

### Docker Compose Commands

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Build and start
docker compose up --build

# Stop all services
docker compose down

# View logs
docker compose logs

# List services
docker compose ps
```

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/new-example`
3. **Commit** your changes: `git commit -m 'Add new Docker example'`
4. **Push** to the branch: `git push origin feature/new-example`
5. **Submit** a Pull Request

### Contribution Ideas

- [ ] Add Docker Swarm example
- [ ] Add Kubernetes manifests
- [ ] Add CI/CD pipeline examples
- [ ] Add more language examples (Python, Go, etc.)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>⭐ Star this repository if you find it helpful!</strong>
</p>

<p align="center">
  Made with ❤️ for the Docker community
</p>

