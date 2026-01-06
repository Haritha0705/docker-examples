<div align="center">

# Docker Examples

A comprehensive collection of Docker examples demonstrating containerization best practices, from simple single-container applications to complex multi-service architectures.

[![Docker](https://img.shields.io/badge/Docker-20.10+-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Single Dockerfile](./single-dockerfile/) · [Multi-Container Compose](./multi-docker-compose/) · [Contributing](#contributing)

</div>

---

## Table of Contents

- [Overview](#overview)
- [What You'll Learn](#what-youll-learn)
- [Examples](#examples)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Learning Path](#learning-path)
- [Docker Cheat Sheet](#docker-cheat-sheet)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository contains practical Docker examples designed for developers who want to learn containerization from basic to advanced concepts. Each example includes detailed documentation, best practices, and production-ready configurations.

---

## What You'll Learn

| Concept | Description |
|---------|-------------|
| **Docker Images** | Building images with single and multi-stage builds |
| **Dockerfiles** | Writing optimized, production-ready Dockerfiles |
| **Networking** | Container networking and inter-service communication |
| **Docker Compose** | Orchestrating multi-container applications |
| **Security** | Implementing non-root users and minimal images |
| **Persistence** | Data persistence with Docker volumes |
| **Health Checks** | Container health monitoring and orchestration |

---

## Examples

### 1. Single Dockerfile Application

| Aspect | Details |
|--------|---------|
| **Folder** | [`single-dockerfile/`](./single-dockerfile/) |
| **Description** | Simple Node.js application running in a single container |
| **Concepts** | Basic Dockerfile, multi-stage builds, port mapping |
| **Difficulty** | Beginner |

```bash
cd single-dockerfile
docker build -t single-docker-app .
docker run -p 3000:3000 single-docker-app
```

[View Full Documentation →](./single-dockerfile/README.md)

---

### 2. Multi-Container Application with Docker Compose

| Aspect | Details |
|--------|---------|
| **Folder** | [`multi-docker-compose/`](./multi-docker-compose/) |
| **Description** | Full-stack application with React frontend, Node.js backend, and MongoDB |
| **Concepts** | Docker Compose, service orchestration, networking, volumes, health checks |
| **Difficulty** | Intermediate |

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

[View Full Documentation →](./multi-docker-compose/README.md)

---

## Prerequisites

Ensure you have the following installed before getting started:

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

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/docker-examples.git

# Navigate to the project
cd docker-examples

# Choose an example and follow its README
cd single-dockerfile    # or multi-docker-compose
```

---

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

---

## Learning Path

Follow this recommended learning path to progressively build your Docker skills:

| Step | Example | Concepts Covered |
|------|---------|------------------|
| 1 | [single-dockerfile](./single-dockerfile/) | Basic Dockerfile, Build & Run, Port Mapping, Multi-stage builds |
| 2 | [multi-docker-compose](./multi-docker-compose/) | Docker Compose, Multi-service apps, Networking, Volumes, Health Checks |

### Concepts by Example

| Concept | Single Dockerfile | Multi Docker Compose |
|---------|:-----------------:|:--------------------:|
| Basic Dockerfile | ✓ | ✓ |
| Multi-stage Builds | ✓ | ✓ |
| Port Mapping | ✓ | ✓ |
| Docker Compose | - | ✓ |
| Service Networking | - | ✓ |
| Volume Persistence | - | ✓ |
| Health Checks | - | ✓ |
| Service Dependencies | - | ✓ |

---

## Docker Cheat Sheet

### Essential Commands

| Command | Description |
|---------|-------------|
| `docker build -t <image-name> .` | Build an image |
| `docker run -p <host>:<container> <image>` | Run a container |
| `docker run -d --name <name> <image>` | Run in background |
| `docker ps` | List running containers |
| `docker stop <container>` | Stop a container |
| `docker logs <container>` | View logs |
| `docker rm <container>` | Remove a container |
| `docker rmi <image>` | Remove an image |

### Docker Compose Commands

| Command | Description |
|---------|-------------|
| `docker compose up` | Start all services |
| `docker compose up -d` | Start in background |
| `docker compose up --build` | Build and start |
| `docker compose down` | Stop all services |
| `docker compose logs` | View logs |
| `docker compose ps` | List services |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-example`)
3. Commit your changes (`git commit -m 'Add new Docker example'`)
4. Push to the branch (`git push origin feature/new-example`)
5. Open a Pull Request

### Contribution Ideas

| Priority | Feature |
|----------|---------|
| High | Docker Swarm example |
| High | Kubernetes manifests |
| Medium | CI/CD pipeline examples |
| Medium | Python/Go containerization examples |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**[⬆ Back to Top](#docker-examples)**

Made with ❤️ for the Docker community

</div>
