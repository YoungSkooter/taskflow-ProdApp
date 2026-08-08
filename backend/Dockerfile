# --- Stage 1: Build Environment ---
FROM node:22-alpine AS builder

WORKDIR /app

# Upgrade NPM to ensure modern dependency tree overriding features are available
RUN npm install -g npm@latest

# Copy your dependency files into the build layer
COPY package*.json ./

# Inject package overrides via native npm configuration before running installation.
# This forces npm to fetch safe versions of brace-expansion and ip-address.
RUN npm config set overrides '{"brace-expansion": "^5.0.9", "ip-address": "^10.3.1"}' && \
    npm ci

# Copy the rest of your application code
COPY . .

# Run your build step if present (creates production assets like a dist/ folder)
RUN npm run build --if-present


# --- Stage 2: Clean Production Runtime ---
FROM node:22-alpine AS runner

WORKDIR /app

RUN npm install -g npm@latest

# Copy dependency configs into the final runner image
COPY package*.json ./

# Enforce the exact same secure overrides for your isolated production node_modules
RUN npm config set overrides '{"brace-expansion": "^5.0.9", "ip-address": "^10.3.1"}' && \
    npm ci --omit=dev

# Copy ONLY compiled assets and critical files from the builder stage.
# DO NOT copy the builder's entire /app directory, as it will overwrite your production modules.
COPY --from=builder /app ./
COPY --from=builder /app/package*.json ./

# Optional: Add other source folders if your framework relies on them at runtime
# COPY --from=builder /app/public ./public

EXPOSE 3000

# Drop privileges from root to the built-in non-root 'node' user for security
USER node

CMD ["npm", "start"]
