# ---- Deps cache (lockfile first) ----
FROM node:20-alpine AS deps
WORKDIR /app
RUN npm i -g pnpm@8 && apk add --no-cache libc6-compat
# On force un chemin stable pour le store
RUN pnpm config set store-dir /pnpm/store
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch --frozen-lockfile

# ---- Build ----
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm i -g pnpm@8 && apk add --no-cache libc6-compat python3 make g++
RUN pnpm config set store-dir /pnpm/store
COPY --from=deps /pnpm/store /pnpm/store
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
ENV NUXT_PUBLIC_BASE_URL=http://51.75.140.195:7123
ENV NUXT_PUBLIC_AUTH_URL=http://51.75.140.195:8080
RUN pnpm build

# ---- Runtime (slim) ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]