## Use official Node.js LTS image
#FROM node:22
#
## Set working directory inside container
#WORKDIR /app
#
## Copy package.json and package-lock.json (if exists)
#COPY package*.json ./
#
## Install dependencies
#RUN npm install
#
## Copy all other files to the container
#COPY . .
#
## Expose the port the app runs on
#EXPOSE 3000
#
## Start the app
#CMD ["npm", "start"]

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Runtime stage
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3000
CMD ["node", "index.js"]
