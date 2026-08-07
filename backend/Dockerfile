FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g npm@latest

# Patch vulnerable npm dependencies
RUN npm install -g brace-expansion@5.0.8 ip-address@10.3.1

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --if-present


FROM node:22-alpine

WORKDIR /app

RUN npm install -g npm@latest

# Patch vulnerable npm dependencies
RUN npm install -g brace-expansion@5.0.8 ip-address@10.3.1

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]