# ---------- Build (Angular) ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# Build a una ruta fija y aplanar /browser si existe (Angular 17)
RUN npx ng build --configuration production --output-path=dist/www \
  && if [ -d dist/www/browser ]; then \
       mv dist/www/browser/* dist/www/ && rmdir dist/www/browser; \
     fi

# ---------- Runtime (Nginx) ----------
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/www/ /usr/share/nginx/html/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ || exit 1


