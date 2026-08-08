FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g npm@latest

COPY package*.json ./

# Inject the overrides into package.json using clean inline shell text insertion 
RUN sed -i 's/^{\(.*\)}/{\n  "overrides": {\n    "brace-expansion": "^5.0.9",\n    "ip-address": "^10.3.1"\n  },\1/' package.json && \
    npm install

COPY . .
RUN npm run build --if-present


FROM node:22-alpine AS runner
WORKDIR /app
RUN npm install -g npm@latest

COPY package*.json ./

# Apply identical overrides formatting block for runtime modules
RUN sed -i 's/^{\(.*\)}/{\n  "overrides": {\n    "brace-expansion": "^5.0.9",\n    "ip-address": "^10.3.1"\n  },\1/' package.json && \
    npm install --omit=dev

COPY --from=builder /app ./
COPY --from=builder /app/package*.json ./

EXPOSE 3000
USER node
CMD ["npm", "start"]
