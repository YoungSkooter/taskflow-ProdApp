# --- Stage 1: Build Environment ---
FROM node:22-alpine AS builder

WORKDIR /app

# Upgrade NPM globally inside the build container
RUN npm install -g npm@latest

# Install ALL dependencies (including devDependencies needed for compiling code)
COPY package*.json ./
RUN npm ci

# Copy the remaining project source files and build
COPY . .
RUN npm run build --if-present

# --- Stage 2: Production Environment ---
FROM node:22-alpine AS runner

WORKDIR /app

RUN npm install -g npm@latest

# Install ONLY production dependencies securely
COPY package*.json ./
RUN npm ci --omit=dev

# Fix the bug: Copy only the built output files from the builder,
# do NOT copy the builder's node_modules folder over the runner's clean modules.
COPY --from=builder /app ./
# If you run a standard Node script instead of a framework builder, copy source code:
# COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["npm", "start"]
