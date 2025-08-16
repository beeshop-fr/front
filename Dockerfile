# ---- Deps cache (lockfile first) ----
FROM node:18-alpine AS deps
WORKDIR /app
RUN npm i -g pnpm@8 && apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml ./
# Pré-fetch EXACT d'après le lockfile → build reproductible
RUN pnpm fetch --frozen-lockfile

# ---- Build ----
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm i -g pnpm@8 && apk add --no-cache libc6-compat
COPY --from=deps /root/.pnpm-store /root/.pnpm-store
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
# (debug) imprime la version de vue utilisée au build
RUN node -e "console.log('Vue version:', require('./node_modules/vue/package.json').version)"
RUN pnpm build

# ---- Runtime (slim) ----
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
