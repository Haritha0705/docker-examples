# Use Node.js LTS
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose backend port
EXPOSE 2000

# Run backend
CMD ["npm", "start"]
