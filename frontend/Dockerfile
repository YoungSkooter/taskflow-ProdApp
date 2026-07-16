# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Capture the build arg from docker-compose
ARG VITE_API_URL
# Assign it so Vite can see it during build
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# ---------- Production Stage ----------
FROM nginx:alpine

LABEL maintainer="skooter"
LABEL application="taskflow"
LABEL service="frontend"

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
