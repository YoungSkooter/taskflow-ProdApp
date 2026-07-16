# Base image
FROM node:22-alpine

# Working directory
WORKDIR /app

LABEL maintainer="Skooter"
LABEL application="taskflow"
LABEL service="backend"

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy application
COPY . .

# Expose API port
EXPOSE 3000

# Start application
CMD ["npm", "start"]