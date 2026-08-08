# --- Stage 1: Build Environment ---
FROM node:22-alpine AS builder

WORKDIR /app

# Upgrade NPM and install jq (a lightweight command-line JSON processor)
RUN npm install -g npm@latest && apk add --no-cache jq

# Copy dependency configs
COPY package*.json ./

# Safe fix: Use jq to inject the overrides block cleanly into package.json before running npm install
RUN jq '.overrides = {"brace-expansion": "^5.0.9", "ip-address": "^10.3.1"}' package.json > package.json.tmp && \
    mv package.json.tmp package.json && \
    npm install

# Copy the rest of your application code
COPY . .

# Run your build step if present
RUN npm run build --if-present


# --- Stage 2: Clean Production Runtime ---
FROM node:22-alpine AS runner

WORKDIR /app

RUN npm install -g npm@latest && apk add --no-cache jq

# Copy dependency configs into the final runner image
COPY package*.json ./

# Apply identical secure overrides configuration block to production manifest
RUN jq '.overrides = {"brace-expansion": "^5.0.9", "ip-address": "^10.3.1"}' package.json > package.json.tmp && \
    mv package.json.tmp package.json && \
    npm install --omit=dev

# Copy ONLY compiled assets and critical files from the builder stage.
COPY --from=builder /app ./
COPY --from=builder /app/package*.json ./

EXPOSE 3000

# Drop privileges to the built-in non-root 'node' user
USER node

CMD ["npm", "start"]
