FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --if-present \
  || npx ng build --configuration production --output-path=dist/app

# ---------- Runtime (Nginx) ----------
FROM nginx:1.27-alpine AS runtime
# Nginx para single-page apps: redirige 404 a index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia los artefactos del build
COPY --from=builder /app/dist/app/ /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ || exit 1
