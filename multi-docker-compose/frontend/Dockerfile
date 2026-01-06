# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build) and clean cache
RUN npm ci --ignore-scripts && npm cache clean --force

# Copy source files
COPY . .

# Build argument for API URL (set at build time)
ARG VITE_API_URL=http://localhost:2000
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build && \
    # Compress static assets with gzip for pre-compression
    find /app/dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.svg" \) \
    -exec gzip -9 -k {} \;

# Stage 2: Production with nginx (using nginx:alpine for minimal size)
FROM nginx:alpine AS production

# Remove default nginx static assets and unnecessary files
RUN rm -rf /usr/share/nginx/html/* && \
    rm -rf /var/cache/apk/* /tmp/* && \
    # Remove default nginx config files we don't need
    rm -f /etc/nginx/conf.d/default.conf

# Copy built assets from builder (including pre-compressed .gz files)
COPY --from=builder /app/dist /usr/share/nginx/html

# Create optimized nginx config with gzip and pre-compressed file serving
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 3000;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json image/svg+xml;
    gzip_comp_level 6;

    # Serve pre-compressed files if available
    gzip_static on;

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

# Expose port
EXPOSE 3000

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
