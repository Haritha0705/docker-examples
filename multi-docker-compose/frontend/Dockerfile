# Use Node.js
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of files
COPY . .

# Expose frontend port
EXPOSE 3000

# Run frontend dev server
CMD ["npm", "run", "dev"]
