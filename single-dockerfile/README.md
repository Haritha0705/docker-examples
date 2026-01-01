# Docker Application

A containerized application built with Docker, designed for easy deployment and consistent runtime environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker**: Version 20.10 or higher ([Installation Guide](https://docs.docker.com/get-docker/))
- **Docker Compose** (optional): Version 2.0 or higher

To verify your Docker installation, run:

```bash
docker --version
```

## Getting Started

Follow these steps to build and run the application locally.

### Building the Docker Image

Clone the repository and navigate to the project directory, then build the Docker image:

```bash
docker build -t single-docker-app .
```

This command creates a Docker image tagged as `single-docker-app` using the Dockerfile in the current directory.

### Running the Container

Start the container with the following command:

```bash
docker run -p 3000:3000 single-docker-app
```

The `-p 3000:3000` flag maps port 3000 from the container to port 3000 on your host machine.

### Accessing the Application

Once the container is running, open your web browser and navigate to:

```
http://localhost:3000
```

## Usage

### Running in Detached Mode

To run the container in the background (detached mode), add the `-d` flag:

```bash
docker run -d -p 3000:3000 --name my-app single-docker-app
```

### Stopping the Container

To stop a running container:

```bash
docker stop my-app
```

### Viewing Logs

To view container logs:

```bash
docker logs my-app
```

For real-time log streaming:

```bash
docker logs -f my-app
```

### Removing the Container

To remove a stopped container:

```bash
docker rm my-app
```

## Configuration

### Environment Variables

You can pass environment variables to the container using the `-e` flag:

```bash
docker run -p 3000:3000 -e NODE_ENV=production single-docker-app
```

### Volume Mounting

To persist data or mount local files, use the `-v` flag:

```bash
docker run -p 3000:3000 -v $(pwd)/data:/app/data single-docker-app
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can map to a different port:

```bash
docker run -p 8080:3000 single-docker-app
```

Then access the application at `http://localhost:8080`

### Container Fails to Start

Check the container logs for error messages:

```bash
docker logs <container_id>
```

### Rebuilding After Changes

If you've made changes to the application, rebuild the image without cache:

```bash
docker build --no-cache -t single-docker-app .
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

For questions or support, please open an issue in the repository.