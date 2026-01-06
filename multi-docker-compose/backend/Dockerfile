# Stage 1: Build dependencies
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies and clean cache
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force && \
    # Remove unnecessary files from node_modules
    rm -rf node_modules/*/.git \
           node_modules/*/.github \
           node_modules/*/test \
           node_modules/*/tests \
           node_modules/*/*.md \
           node_modules/*/.npmignore \
           node_modules/*/CHANGELOG* \
           node_modules/*/LICENSE* \
           node_modules/*/.travis.yml

# Stage 2: Production image (using slim alpine)
FROM node:22-alpine AS production

# Remove unnecessary packages and set NODE_ENV
ENV NODE_ENV=production

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    # Remove package manager to reduce size
    rm -rf /var/cache/apk/* /tmp/*

WORKDIR /app

# Copy only production dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy only necessary application files
COPY --chown=nodejs:nodejs package.json ./
COPY --chown=nodejs:nodejs index.js ./
COPY --chown=nodejs:nodejs User.js ./

# Switch to non-root user
USER nodejs

# Expose backend port
EXPOSE 2000

# Run backend with node directly
CMD ["node", "index.js"]
